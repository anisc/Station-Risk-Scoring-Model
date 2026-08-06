#!/usr/bin/env python3
"""Forecast station risk (SMPRI) using Google TimesFM 2.5.

Builds a daily SMPRI time series for each station and the whole network from the
app's own data files (crs_merged_reports.js, flight_counts.js, seed_data.js,
risk_profile.js) using the exact SMPRI formula from js/app.js, then runs TimesFM
to forecast 3, 6 and 12 months ahead.

Usage:
  python3 timesfm_forecast.py                 # full run (downloads model first time)
  python3 timesfm_forecast.py --dry-run       # compute time series only, no model
  python3 timesfm_forecast.py --window 180    # use a 180-day trailing window
  python3 timesfm_forecast.py --stations YYC,YYZ
"""
import argparse
import bisect
import json
import math
import os
import re
import sys
from datetime import date, timedelta

import numpy as np

ROOT = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(ROOT, 'data')
APP_JS = os.path.join(ROOT, 'js', 'app.js')

# ── Constants (mirror js/app.js) ─────────────────────────────────────────────
RISK_LEVEL_WEIGHTS = {'Level 1': 50, 'Level 2': 250, 'Level 3': 1250}
OAPT_WEIGHT = 1
OAPT_SAPT_TYPES = {'OAPT', 'SAPT'}
SCORE_WEIGHTS = {1: 18, 2: 151, 3: 521, 4: 1260}
RPI_BASE = {'a': 0.25, 'b': 0.25, 'c': 0.25, 'r': 0.25}

AXES = {
    'partA': [
        'aa-sms-governance', 'environment', 'tenant-mgmt', 'emergency-response',
        'terminal-construction', 'groundside-access', 'checkin-layout', 'baggage-induction',
        'baggage-sortation', 'bag-room', 'arrivals-reclaim', 'boarding-lounge',
        'gate-operations', 'remote-stand', 'stand-layout', 'parking-guidance',
        'gse-staging', 'vehicle-service-roads', 'potable-water', 'fueling',
        'lavatory-waste', 'deicing',
    ],
    'partB': [
        'sp-sms-governance', 'staffing-structure', 'training-competency',
        'procedures-alignment', 'potable-water-sp', 'load-control',
        'emergency-response-sp', 'gse-management',
    ],
    'partC': [
        'environment-context', 'wj-standards', 'wj-operational-support', 'wj-safety-mgmt',
        'sp-standards', 'sp-safety-assurance', 'sp-roles-coordination', 'sp-staffing-equipment',
        'supervisory-presence', 'planning-priority', 'managing-issues',
        'communication-coordination', 'workload-pressure', 'task-performance',
    ],
}


# ── JS data loading ──────────────────────────────────────────────────────────
def load_js_var(path, var_name):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    m = re.search(r'\bvar\s+' + re.escape(var_name) + r'\s*=\s*(.+);\s*$',
                  text, re.S)
    if not m:
        m = re.search(r'\b' + re.escape(var_name) + r'\s*=\s*(.+);\s*$',
                      text, re.S)
    if not m:
        raise RuntimeError(f'{var_name} not found in {path}')
    raw = m.group(1).strip()
    if raw.endswith(';'):
        raw = raw[:-1]
    return json.loads(raw)


def extract_station_coords():
    with open(APP_JS, 'r', encoding='utf-8') as f:
        text = f.read()
    block = re.search(r'const STATION_COORDS\s*=\s*\{(.*?)\n\};', text, re.S)
    if not block:
        raise RuntimeError('STATION_COORDS not found')
    iatas = re.findall(r'^\s*([A-Z]{3}):\s*\[', block.group(1), re.M)
    return iatas


def extract_icao_direct_map():
    with open(APP_JS, 'r', encoding='utf-8') as f:
        text = f.read()
    block = re.search(r'_ICAO_DIRECT_MAP\s*=\s*\{(.*?)\n\};', text, re.S)
    if not block:
        return {}
    return dict(re.findall(r"^\s*([A-Z]{4}):\s*'([A-Z]{3})'", block.group(1), re.M))


def build_icao_map(station_iatas):
    m = {}
    for iata in station_iatas:
        m[iata] = iata
        m['C' + iata] = iata
        m['K' + iata] = iata
        m['TJ' + iata] = iata
    for icao, iata in extract_icao_direct_map().items():
        m[icao] = iata
    return m


# ── Audit pillars (Part A / B / C) ──────────────────────────────────────────
def calc_avg(scores, axes):
    vals = [float(v) for v in (scores.get(a) for a in axes)
            if v not in (None, '', 'null')]
    return sum(vals) / len(vals) if vals else None


def calc_weighted_c_avg(scores, axes):
    vals = [SCORE_WEIGHTS[int(v)] for v in (scores.get(a) for a in axes)
            if v not in (None, '', 'null')]
    return sum(vals) / len(vals) if vals else None


def get_part_b_list(station):
    pb = station.get('partB')
    if not pb:
        return []
    return pb if isinstance(pb, list) else [pb]


def get_worst_part_b(station):
    worst = None
    for b in get_part_b_list(station):
        if b.get('status') != 'complete':
            continue
        avg = calc_avg(b.get('scores') or {}, AXES['partB'])
        if avg is None:
            continue
        if worst is None or avg > worst['avg']:
            worst = {'avg': avg}
    return worst['avg'] if worst else None


def station_pillars(station):
    a_avg = calc_avg((station.get('partA') or {}).get('scores') or {}, AXES['partA'])
    b_avg = get_worst_part_b(station)
    part_c = station.get('partC') or {}
    c_avg = calc_weighted_c_avg(part_c.get('scores') or {}, AXES['partC']) \
        if part_c.get('status') == 'complete' else None
    return a_avg, b_avg, c_avg


def network_stats(vals):
    valid = [v for v in vals if v is not None and not (isinstance(v, float) and math.isnan(v))]
    if not valid:
        return 0.0, 1.0
    mean = sum(valid) / len(valid)
    var = sum((v - mean) ** 2 for v in valid) / len(valid)
    return mean, math.sqrt(var) or 1.0


# ── Risk data per station per day (mirror _computeAllRiskScores) ────────────
def build_risk_series(records, flight_counts, station_iatas, icao_map,
                      window_days=90):
    # date axis
    all_dates = sorted({r['dt'][:10] for r in records if r.get('dt')} |
                       {d for fc in flight_counts.values() for d in fc['daily']})
    first, last = date.fromisoformat(all_dates[0]), date.fromisoformat(all_dates[-1])
    n_days = (last - first).days + 1
    day_dates = [first + timedelta(days=i) for i in range(n_days)]
    day_str = [d.isoformat() for d in day_dates]
    day_idx = {s: i for i, s in enumerate(day_str)}

    # per-station occurrence lists (dedup by OccNo), flights
    occ = {}
    flt_cum = {}
    for iata in station_iatas:
        occ[iata] = {'days': [], 'weights': []}
        seen = set()
        for r in records:
            if r['t'] not in OAPT_SAPT_TYPES:
                continue
            if r['t'] == 'SAPT' and (r['rl'] or '') in ('Not Set', ''):
                continue
            if r['o'] in seen:
                continue
            dt = (r['dt'] or '')[:10]
            if dt not in day_idx:
                continue
            icao = r['c']
            if not icao:
                continue
            # match station
            if icao != iata and icao != 'C' + iata and icao != 'K' + iata and icao != 'TJ' + iata \
                    and icao_map.get(icao) != iata:
                continue
            seen.add(r['o'])
            w = OAPT_WEIGHT if r['t'] == 'OAPT' else RISK_LEVEL_WEIGHTS.get(r['rl'], 0)
            occ[iata]['days'].append(day_idx[dt])
            occ[iata]['weights'].append(w)
        # sort by day
        order = np.argsort(occ[iata]['days'])
        occ[iata]['days'] = np.asarray(occ[iata]['days'], dtype=np.int32)[order]
        occ[iata]['weights'] = np.asarray(occ[iata]['weights'], dtype=np.float64)[order]

        # flights cumulative over axis
        arr = np.zeros(n_days, dtype=np.float64)
        for ds, cnt in flight_counts[iata]['daily'].items():
            if ds in day_idx:
                arr[day_idx[ds]] = cnt
        flt_cum[iata] = np.concatenate([[0.0], np.cumsum(arr)])

    # static pillars from seed stations
    seed_data = load_js_var(os.path.join(DATA, 'seed_data.js'), 'SEED_DATA')
    pillars = {}
    for iata, entry in seed_data.items():
        pillars[iata] = station_pillars(entry)
    stats = {k: network_stats([p[i] for p in pillars.values()]) for i, k in
             enumerate(['A', 'B', 'C'])}
    statsA, statsB, statsC = stats['A'], stats['B'], stats['C']

    # z-scores per seed station (static)
    z_audit = {}
    for iata, (a, b, c) in pillars.items():
        z_audit[iata] = (
            (a - statsA[0]) / statsA[1] if a is not None else 0.0,
            (b - statsB[0]) / statsB[1] if b is not None else 0.0,
            (c - statsC[0]) / statsC[1] if c is not None else 0.0,
        )

    # daily computation
    smpri = {iata: np.full(n_days, np.nan) for iata in station_iatas}
    raw_rates = {iata: np.zeros(n_days) for iata in station_iatas}
    cred = {iata: np.zeros(n_days) for iata in station_iatas}
    logp = {iata: np.zeros(n_days) for iata in station_iatas}
    occ_counts = {iata: np.zeros(n_days, dtype=int) for iata in station_iatas}
    flt_counts = {iata: np.zeros(n_days) for iata in station_iatas}

    for t in range(n_days):
        lo = 0 if window_days <= 0 else max(0, t - window_days + 1)
        rates = {}
        for iata in station_iatas:
            flight_c = flt_cum[iata][t + 1] - flt_cum[iata][lo]
            flt_counts[iata][t] = flight_c
            d, w = occ[iata]['days'], occ[iata]['weights']
            l = bisect.bisect_left(d, lo)
            r = bisect.bisect_right(d, t)
            cnt = r - l
            occ_counts[iata][t] = cnt
            wsum = float(w[l:r].sum()) if cnt else 0.0
            if flight_c > 0:
                avg = wsum / cnt if cnt > 0 else 0.0
                rates[iata] = (avg / flight_c) * 1000.0
            else:
                rates[iata] = None
            raw_rates[iata][t] = rates[iata] or 0.0

        have = [iata for iata in station_iatas if rates[iata] is not None]
        if not have:
            for iata in station_iatas:
                smpri[iata][t] = np.nan
            continue

        rrs = np.array([rates[i] for i in have])
        net_mean = rrs.mean()
        net_var = rrs.var()
        k_val = round((net_mean * net_mean) / net_var) if net_var > 0 else 2000
        k_val = max(100, min(k_val, 2000))
        log_rates = np.log(rrs + 1.0)
        log_mean = log_rates.mean()
        log_std = math.sqrt(log_rates.var()) or 1.0

        for iata in station_iatas:
            fl = flt_counts[iata][t]
            if fl > 0 and iata in rates:
                z_cred = fl / (fl + k_val)
                logr = math.log(rates[iata] + 1.0)
                lp = (logr - log_mean) / log_std
            else:
                z_cred, lp = 0.0, 0.0
            cred[iata][t] = z_cred
            logp[iata][t] = lp

            w_r = 0.40 * z_cred
            w_audit = 1.0 - w_r
            base_sum = RPI_BASE['a'] + RPI_BASE['b'] + RPI_BASE['c']
            w_a = w_audit * (RPI_BASE['a'] / base_sum)
            w_b = w_audit * (RPI_BASE['b'] / base_sum)
            w_c = w_audit * (RPI_BASE['c'] / base_sum)
            za = zb = zc = 0.0
            if iata in z_audit:
                za, zb, zc = z_audit[iata]
            smpri[iata][t] = w_a * za + w_b * zb + w_c * zc + w_r * lp

    return {
        'dates': day_str,
        'smpri': smpri,
        'raw_rates': raw_rates,
        'credibility': cred,
        'log_p': logp,
        'occ_counts': occ_counts,
        'flt_counts': flt_counts,
        'pillars': {i: z_audit[i] for i in pillars},
        'network_stats': {'A': statsA, 'B': statsB, 'C': statsC},
    }


def network_series(res, station_iatas, seed_iatas):
    n = len(res['dates'])
    out = np.full(n, np.nan)
    for t in range(n):
        vals = [res['smpri'][i][t] for i in seed_iatas
                if not math.isnan(res['smpri'][i][t])]
        out[t] = sum(vals) / len(vals) if vals else np.nan
    return out


# ── TimesFM forecast ─────────────────────────────────────────────────────────
def forecast_series(series_list, horizon=365, max_context=1024, max_horizon=384):
    import timesfm
    model = timesfm.TimesFM_2p5_200M_torch.from_pretrained(
        'google/timesfm-2.5-200m-pytorch')
    model.compile(timesfm.ForecastConfig(
        max_context=max_context,
        max_horizon=max_horizon,
        normalize_inputs=True,
        use_continuous_quantile_head=False,
        force_flip_invariance=True,
        infer_is_positive=False,
        fix_quantile_crossing=True,
    ))
    inputs = [np.asarray(s, dtype=np.float32) for s in series_list]
    point, quantile = model.forecast(horizon=horizon, inputs=inputs)
    return point, quantile  # (n, horizon), (n, horizon, 10)


def smpri_tier(v):
    if v > 1.5:
        return 'Very High'
    if v > 0.75:
        return 'High'
    if v > -0.25:
        return 'Medium'
    return 'Low'


def quantile_summary(q):
    # quantile columns: [?, 10,20,30,40,50,60,70,80,90]
    return {
        'p10': float(q[1]),
        'p25': float(q[2]),
        'p50': float(q[5]),
        'p75': float(q[7]),
        'p90': float(q[9]),
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--window', type=int, default=0,
                    help='trailing window days (0 = all data up to each date, '
                         'matches the app current SMPRI)')
    ap.add_argument('--horizon', type=int, default=365, help='forecast horizon days')
    ap.add_argument('--dry-run', action='store_true', help='skip model, series only')
    ap.add_argument('--stations', type=str, default='', help='comma separated IATA subset')
    ap.add_argument('--out', default=os.path.join(ROOT, 'data', 'risk_forecast.json'))
    ap.add_argument('--trim', type=int, default=30,
                    help='drop first N days from model input (unstable early period)')
    args = ap.parse_args()

    print('Loading data...')
    records = load_js_var(os.path.join(DATA, 'crs_merged_reports.js'), 'CRS_MERGED_REPORTS')
    flight_counts = load_js_var(os.path.join(DATA, 'flight_counts.js'), 'FLIGHT_COUNTS')
    station_iatas = sorted(flight_counts.keys())
    icao_map = build_icao_map(station_iatas)
    seed_data = load_js_var(os.path.join(DATA, 'seed_data.js'), 'SEED_DATA')
    seed_iatas = [i for i in seed_data.keys() if i in station_iatas]
    print(f'  {len(records)} CRS records, {len(station_iatas)} stations, '
          f'{len(seed_iatas)} seeded stations')

    if args.stations:
        wanted = [s.strip().upper() for s in args.stations.split(',') if s.strip()]
        wanted = [s for s in wanted if s in station_iatas]
        seed_iatas = [s for s in seed_iatas if s in wanted]
        station_iatas = wanted
        if not station_iatas:
            print('No valid --stations given')
            return

    print(f'Building daily SMPRI series (window: {"all data" if args.window <= 0 else str(args.window) + "-day trailing"})...')
    res = build_risk_series(records, flight_counts, station_iatas, icao_map,
                            window_days=args.window)
    dates = res['dates']
    n_net = network_series(res, station_iatas, seed_iatas)

    # names to forecast
    forecast_targets = [('NETWORK', n_net)]
    for iata in station_iatas:
        s = res['smpri'][iata]
        if np.all(np.isnan(s)):
            continue
        forecast_targets.append((iata, s))
    names = [t[0] for t in forecast_targets]

    # weekly snapshot (for readability)
    print('  series length:', len(dates), 'days (', dates[0], '→', dates[-1], ')')

    if args.dry_run:
        print('DRY RUN — writing series only.')
        dump = {
            'meta': {'dry_run': True, 'window_days': args.window,
                     'data_from': dates[0], 'data_to': dates[-1]},
            'dates': dates,
            'network': {'history': [None if math.isnan(v) else round(float(v), 4) for v in n_net]},
            'stations': {
                iata: {'history': [None if math.isnan(v) else round(float(v), 4) for v in res['smpri'][iata]]}
                for iata in station_iatas
            },
        }
        with open(args.out, 'w') as f:
            json.dump(dump, f)
        print('wrote', args.out)
        return

    print(f'Forecasting {len(forecast_targets)} series for {args.horizon} days with TimesFM 2.5...')
    # trim unstable early days (network stats from near-empty windows) from model input
    trim = max(1, min(args.trim, len(dates) - 10))
    series_arrays = [
        np.asarray(s[trim:], dtype=np.float32) if s.ndim else s for _, s in forecast_targets
    ]
    point, quantile = forecast_series(series_arrays, horizon=args.horizon)

    last_date = date.fromisoformat(dates[-1])
    fc_dates = [(last_date + timedelta(days=d + 1)).isoformat()
                for d in range(args.horizon)]

    def summarize(pf, qf, h):
        return {
            'date': fc_dates[h - 1],
            'point': round(float(pf[h - 1]), 4),
            'tier': smpri_tier(float(pf[h - 1])),
            'p10': round(float(qf[h - 1, 1]), 4),
            'p25': round(float(qf[h - 1, 2]), 4),
            'p50': round(float(qf[h - 1, 5]), 4),
            'p75': round(float(qf[h - 1, 7]), 4),
            'p90': round(float(qf[h - 1, 9]), 4),
        }

    # network context at last date
    net_raw = np.mean([res['raw_rates'][i][-1] for i in station_iatas])
    net_occ = int(sum(res['occ_counts'][i][-1] for i in station_iatas))
    net_flt = int(sum(res['flt_counts'][i][-1] for i in station_iatas))

    out = {
        'meta': {
            'model': 'timesfm-2.5-200m',
            'window_days': args.window,
            'horizon_days': args.horizon,
            'data_from': dates[0],
            'data_to': dates[-1],
            'generated_at': date.today().isoformat(),
            'targets_days': {'3_months': 90, '6_months': 180, '1_year': 365},
        },
        'network': {
            'dates': dates,
            'history': [None if math.isnan(v) else round(float(v), 4) for v in n_net],
            'current': round(float(n_net[-1]), 4),
            'current_tier': smpri_tier(float(n_net[-1])),
            'context': {
                'mean_raw_rate_per_1000_flights': round(net_raw, 4),
                'unique_occurrences': net_occ,
                'flights': net_flt,
            },
            'forecast': {
                'dates': fc_dates,
                'point': [round(float(v), 4) for v in point[0]],
                'quantiles': [[round(float(v), 4) for v in row] for row in quantile[0]],
                '3_months': summarize(point[0], quantile[0], 90),
                '6_months': summarize(point[0], quantile[0], 180),
                '1_year': summarize(point[0], quantile[0], 365),
            },
        },
        'stations': {},
    }

    for j, (iata, _) in enumerate(forecast_targets[1:], start=1):
        za, zb, zc = res['pillars'].get(iata, (0.0, 0.0, 0.0))
        out['stations'][iata] = {
            'name': seed_data.get(iata, {}).get('name', ''),
            'audit_z': {'A': round(za, 3), 'B': round(zb, 3), 'C': round(zc, 3)},
            'history': [None if math.isnan(v) else round(float(v), 4) for v in res['smpri'][iata]],
            'current': round(float(res['smpri'][iata][-1]), 4),
            'current_tier': smpri_tier(float(res['smpri'][iata][-1])),
            'raw_rate': round(float(res['raw_rates'][iata][-1]), 4),
            'credibility': round(float(res['credibility'][iata][-1]), 4),
            'occ_count_90d': int(res['occ_counts'][iata][-1]),
            'flights_90d': int(res['flt_counts'][iata][-1]),
            'forecast': {
                'dates': fc_dates,
                'point': [round(float(v), 4) for v in point[j]],
                '3_months': summarize(point[j], quantile[j], 90),
                '6_months': summarize(point[j], quantile[j], 180),
                '1_year': summarize(point[j], quantile[j], 365),
            },
        }

    with open(args.out, 'w') as f:
        json.dump(out, f, indent=1)

    # console summary
    net = out['network']
    print('\n==== NETWORK-WIDE SMPRI FORECAST ====')
    print(f"  current (as of {dates[-1]}): {net['current']} [{net['current_tier']}]  "
          f"occurrences={net['context']['unique_occurrences']}, "
          f"mean raw rate={net['context']['mean_raw_rate_per_1000_flights']}/1000 flt")
    for k in ('3_months', '6_months', '1_year'):
        s = net['forecast'][k]
        print(f"  {k:8s} {s['date']}  point={s['point']:+.3f} [{s['tier']}]  "
              f"90% CI [{s['p10']:+.3f}, {s['p90']:+.3f}]")

    rows = []
    for iata, st in out['stations'].items():
        d = st['forecast']['3_months']
        rows.append((iata, st['name'], st['current'], d['point'],
                     d['point'] - st['current']))
    rows.sort(key=lambda r: r[4], reverse=True)
    print('\n==== PER-STATION 3-MONTH SMPRI FORECAST (top movers) ====')
    print(f"  {'IATA':6s} {'Station':18s} {'Now':>7s} {'3mo':>7s} {'Δ':>7s}  {'Now tier':10s} {'3mo tier':10s}")
    for iata, name, cur, p, delta in rows[:12]:
        ct = out['stations'][iata]['current_tier']
        pt = out['stations'][iata]['forecast']['3_months']['tier']
        print(f"  {iata:6s} {name[:18]:18s} {cur:7.3f} {p:7.3f} {delta:+7.3f}  {ct:10s} {pt:10s}")
    print('\n  ... full results in', args.out)

    # chart
    try:
        import matplotlib
        matplotlib.use('Agg')
        import matplotlib.pyplot as plt
        fig, ax = plt.subplots(figsize=(12, 5))
        dates_dt = [date.fromisoformat(d) for d in dates]
        fc_dt = [date.fromisoformat(d) for d in fc_dates]
        nvals = [v for v in out['network']['history'] if v is not None]
        ax.plot(dates_dt, nvals, color='#2563EB', lw=1.5, label='Historical SMPRI')
        p = out['network']['forecast']['point']
        q = out['network']['forecast']['quantiles']
        ax.plot(fc_dt, p, color='#DC2626', lw=1.5, ls='--', label='TimesFM forecast')
        ax.fill_between(fc_dt, [r[1] for r in q], [r[9] for r in q],
                        color='#DC2626', alpha=0.12, label='10–90% interval')
        ax.axhline(0, color='#94A3B8', lw=0.8)
        ax.axhline(0.75, color='#DC2626', lw=0.6, ls=':')
        ax.axhline(-0.25, color='#65A30D', lw=0.6, ls=':')
        ax.set_title('Network SMPRI — historical & 12-month TimesFM forecast')
        ax.legend(loc='upper left', fontsize=8)
        ax.grid(alpha=0.3)
        png = os.path.join(ROOT, 'risk_forecast.png')
        fig.autofmt_xdate()
        fig.savefig(png, dpi=110, bbox_inches='tight')
        print('\nchart saved:', png)
    except Exception as e:
        print('\nchart skipped:', e)


if __name__ == '__main__':
    main()
