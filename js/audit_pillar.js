(function (root) {
  'use strict';

  const STORE_KEY = 'stationRiskAuditData_v1';
  const AUDIT_TYPES = { ATW: 'ATW checklist audit', BTW: 'BTW checklist audit', QCI: 'QCI inspection' };
  const MARKS = {
    MF: { label: 'Major Finding', units: 100, cap: true },
    F: { label: 'Finding', units: 30, cap: true },
    OBS: { label: 'Observation', units: 5, selfCredit: 0.3, cap: false },
    COMP: { label: 'Compliant', units: 0, cap: false },
    NA: { label: 'Not Applicable', units: 0, cap: false },
    NOTOBS: { label: 'Not Observed', units: 0, cap: false }
  };
  const ROOT_CAUSES = [
    'Communication (Human Factors)',
    'External Factors',
    'Intentional Non-Compliance (Human Factors)',
    'Local Violation Factors',
    'Operational Decision (Human Factors)',
    'Organization Factors',
    'Physiological (Human Factors)',
    'Regulations',
    'Skill Based (Human Factors)'
  ];
  const EVENT_TYPES = ['OPENED', 'CAP_RECEIVED', 'CLOSED', 'EFFECTIVENESS_VERIFIED', 'REOPENED'];
  const PARAMS = {
    TAU_DAYS: 365,
    SLA_BUSINESS_DAYS: 10,
    RECURRENCE_LOOKBACK_DAYS: 365,
    SUB_WEIGHTS: { L: 0.45, T: 0.35, P: 0.20 },
    QCI_SHARE: 0.30,
    ACTIVATION_FLOOR_OBSERVED: 20,
    EFF_GRACE_DAYS: 14,
    DEFICIENT_MARKS: ['MF', 'F'],
    SELF_CORRECTED_MARKS: ['OBS']
  };

  const DAY_MS = 86400000;

  function emptyData() {
    return { audits: [], findings: [], events: [], seq: 0 };
  }

  let _memData = null;
  let _cache = { key: null, result: null };

  function hasStorage() {
    return typeof localStorage !== 'undefined';
  }

  function load() {
    if (_memData) return _memData;
    if (!hasStorage()) return emptyData();
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return emptyData();
      const parsed = JSON.parse(raw);
      return {
        audits: Array.isArray(parsed.audits) ? parsed.audits : [],
        findings: Array.isArray(parsed.findings) ? parsed.findings : [],
        events: Array.isArray(parsed.events) ? parsed.events : [],
        seq: parsed.seq || 0
      };
    } catch (_) {
      return emptyData();
    }
  }

  function persist() {
    let stored = false;
    if (hasStorage()) {
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(load()));
        stored = true;
      } catch (_) {}
    }
    if (stored) _memData = null;
    _cache = { key: null, result: null };
  }

  function setData(data) {
    _memData = {
      audits: Array.isArray(data.audits) ? data.audits : [],
      findings: Array.isArray(data.findings) ? data.findings : [],
      events: Array.isArray(data.events) ? data.events : [],
      seq: data.seq || 0
    };
    persist();
  }

  function uid(prefix) {
    const d = load();
    d.seq = (d.seq || 0) + 1;
    return prefix + '-' + String(d.seq).padStart(5, '0');
  }

  function toDateMs(iso) {
    if (!iso) return null;
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso));
    if (!m) return null;
    return Date.UTC(+m[1], +m[2] - 1, +m[3]);
  }

  function toIso(ms) {
    return new Date(ms).toISOString().slice(0, 10);
  }

  function todayIso() {
    return new Date().toISOString().slice(0, 10);
  }

  function addBusinessDays(iso, n) {
    const start = toDateMs(iso);
    if (start === null) return null;
    let remaining = n;
    let cur = start;
    while (remaining > 0) {
      cur += DAY_MS;
      const dow = new Date(cur).getUTCDay();
      if (dow !== 0 && dow !== 6) remaining--;
    }
    return toIso(cur);
  }

  function daysBetween(fromIso, toIsoArg) {
    const a = toDateMs(fromIso);
    const b = toDateMs(toIsoArg);
    if (a === null || b === null) return null;
    return Math.max(0, (b - a) / DAY_MS);
  }

  function effUnits(mark) {
    const m = MARKS[mark];
    if (!m) return 0;
    if (m.selfCredit) return m.units * m.selfCredit;
    return m.units;
  }

  function slaDueDate(auditDateIso) {
    return addBusinessDays(auditDateIso, PARAMS.SLA_BUSINESS_DAYS);
  }

  function isDeficient(mark) {
    return PARAMS.DEFICIENT_MARKS.indexOf(mark) !== -1;
  }

  function eventsFor(findingId) {
    return load().events.filter(e => e.findingId === findingId);
  }

  function addEvent(findingId, type, note) {
    const d = load();
    d.events.push({
      id: uid('EV'),
      findingId,
      type: EVENT_TYPES.indexOf(type) !== -1 ? type : 'OPENED',
      ts: todayIso(),
      note: note || ''
    });
    persist();
  }

  function setFindingFields(findingId, fields) {
    const d = load();
    const f = d.findings.find(x => x.id === findingId);
    if (!f) return;
    Object.keys(fields || {}).forEach(k => {
      if (['capSubmittedAt', 'actionDueAt', 'effDueAt', 'effVerifiedAt', 'closedAt'].indexOf(k) !== -1) {
        f[k] = fields[k] || null;
      }
    });
    persist();
  }

  function addAudit(entry) {
    const d = load();
    const auditId = uid('AUD');
    const audit = {
      id: auditId,
      station: (entry.station || '').toUpperCase(),
      type: AUDIT_TYPES[entry.type] ? entry.type : 'ATW',
      date: entry.date || todayIso(),
      auditor: entry.auditor || '',
      itemsApplicable: +entry.itemsApplicable || 0,
      itemsObserved: +entry.itemsObserved || 0,
      itemsCompliant: +entry.itemsCompliant || 0,
      createdAt: todayIso()
    };
    d.audits.push(audit);
    const rows = Array.isArray(entry.findings) ? entry.findings : [];
    rows.forEach(r => {
      const mark = MARKS[r.mark] ? r.mark : 'COMP';
      const fid = uid('FND');
      d.findings.push({
        id: fid,
        auditId,
        station: audit.station,
        auditType: audit.type,
        auditDate: audit.date,
        ref: (r.ref || '').trim(),
        title: (r.title || '').trim(),
        description: (r.description || '').trim(),
        mark,
        rcCategory: r.rcCategory || '',
        capSubmittedAt: null,
        actionDueAt: null,
        effDueAt: null,
        effVerifiedAt: null,
        closedAt: null,
        reopenedCount: 0,
        createdAt: todayIso()
      });
      d.events.push({ id: uid('EV'), findingId: fid, type: 'OPENED', ts: audit.date, note: '' });
    });
    persist();
    return auditId;
  }

  function deleteAudit(auditId) {
    const d = load();
    const fids = new Set(d.findings.filter(f => f.auditId === auditId).map(f => f.id));
    d.audits = d.audits.filter(a => a.id !== auditId);
    d.findings = d.findings.filter(f => f.auditId !== auditId);
    d.events = d.events.filter(e => !fids.has(e.findingId));
    persist();
  }

  function importJSON(text) {
    const parsed = JSON.parse(text);
    if (!parsed || !Array.isArray(parsed.audits) || !Array.isArray(parsed.findings)) {
      throw new Error('Invalid audit dataset');
    }
    setData(parsed);
  }

  function exportJSON() {
    return JSON.stringify(load(), null, 2);
  }

  function markReopened(findingId) {
    const d = load();
    const f = d.findings.find(x => x.id === findingId);
    if (f) f.reopenedCount = (f.reopenedCount || 0) + 1;
    addEvent(findingId, 'REOPENED');
  }

  function findingStatus(f) {
    const evs = eventsFor(f.id);
    const last = evs.length ? evs[evs.length - 1].type : 'OPENED';
    if (last === 'REOPENED') return 'Reopened';
    if (f.effVerifiedAt) return 'Verified';
    if (f.closedAt) return 'Closed';
    if (f.capSubmittedAt) return 'CAP Received';
    return 'Open';
  }

  function capBreached(f, nowIso) {
    if (!isDeficient(f.mark)) return false;
    const due = slaDueDate(f.auditDate);
    const now = nowIso || todayIso();
    if (f.capSubmittedAt && f.capSubmittedAt > due) return true;
    if (!f.capSubmittedAt && !f.closedAt && now > due) return true;
    if (!f.capSubmittedAt && f.closedAt && f.closedAt > due) return true;
    if (f.capSubmittedAt && !f.closedAt && f.actionDueAt && now > f.actionDueAt) return true;
    if ((f.reopenedCount || 0) > 0) return true;
    return false;
  }

  function effPassed(f) {
    if (!f.effVerifiedAt || !f.closedAt) return false;
    if (f.effDueAt) {
      const grace = toDateMs(f.effDueAt) + PARAMS.EFF_GRACE_DAYS * DAY_MS;
      return toDateMs(f.effVerifiedAt) <= grace;
    }
    return true;
  }

  function momentStats(values) {
    const valid = values.filter(v => v !== null && v !== undefined && !isNaN(v));
    if (!valid.length) return { mean: 0, std: 1, count: 0 };
    const mean = valid.reduce((a, b) => a + b, 0) / valid.length;
    const variance = valid.reduce((s, v) => s + (v - mean) ** 2, 0) / valid.length;
    return { mean, std: Math.sqrt(variance) || 1, count: valid.length };
  }

  function zscore(value, stats) {
    if (value === null || value === undefined || isNaN(value)) return 0;
    return (value - stats.mean) / stats.std;
  }

  function computeStats(endDateIso, nowIsoArg) {
    const nowIso = nowIsoArg || todayIso();
    const cacheKey = (endDateIso || '') + '|' + nowIso + '|' + load().seq;
    if (_cache.key === cacheKey && _cache.result) return _cache.result;

    const end = toDateMs(endDateIso || nowIso);
    const w0 = end - PARAMS.RECURRENCE_LOOKBACK_DAYS * DAY_MS;
    const priorStart = w0 - PARAMS.RECURRENCE_LOOKBACK_DAYS * DAY_MS;
    const midRecent = end - 182 * DAY_MS;
    const midPrior = w0 - 182 * DAY_MS;

    const data = load();
    const stations = {};

    function slot(st) {
      if (!stations[st]) {
        stations[st] = {
          station: st, observed: 0, compliant: 0, nAudits: 0, nFindings: 0,
          loadSum: 0, capsTotal: 0, capsBreached: 0, capsCompleted: 0, capsEffPassed: 0,
          refsWindow: {}, catsPrior: {},
          qciObs: 0, qciDef: 0, qciRecentObs: 0, qciRecentDef: 0, qciPriorObs: 0, qciPriorDef: 0,
          nQciAudits: 0
        };
      }
      return stations[st];
    }

    data.audits.forEach(a => {
      const t = toDateMs(a.date);
      if (t === null) return;
      const st = slot(a.station);
      if (a.type === 'QCI') {
        if (t >= w0 && t <= end) {
          st.qciObs += a.itemsObserved || 0;
          st.qciDef += (a.itemsObserved || 0) - (a.itemsCompliant || 0);
          st.nQciAudits += 1;
          if (t >= midRecent) { st.qciRecentObs += a.itemsObserved || 0; st.qciRecentDef += (a.itemsObserved || 0) - (a.itemsCompliant || 0); }
          else { st.qciPriorObs += a.itemsObserved || 0; st.qciPriorDef += (a.itemsObserved || 0) - (a.itemsCompliant || 0); }
        }
        return;
      }
      if (t >= w0 && t <= end) {
        st.observed += a.itemsObserved || 0;
        st.compliant += a.itemsCompliant || 0;
        st.nAudits += 1;
      }
    });

    data.findings.forEach(f => {
      const t = toDateMs(f.auditDate);
      if (t === null) return;
      const st = slot(f.station);
      const inWindow = t >= w0 && t <= end;
      const inPrior = t >= priorStart && t < w0;
      if (!inWindow && !inPrior) return;
      if (isDeficient(f.mark)) st.nFindings += inWindow ? 1 : 0;
      if (inPrior && isDeficient(f.mark)) {
        if (f.ref) st.catsPrior[f.ref] = f.rcCategory || '';
      }
      if (!inWindow) return;
      if (f.auditType === 'QCI') return;
      if (MARKS[f.mark] && MARKS[f.mark].units > 0) {
        const age = Math.max(0, (end - t) / DAY_MS);
        st.loadSum += effUnits(f.mark) * Math.exp(-age / PARAMS.TAU_DAYS);
      }
      if (isDeficient(f.mark)) {
        st.capsTotal += 1;
        if (capBreached(f, nowIso)) st.capsBreached += 1;
        if (f.closedAt) {
          st.capsCompleted += 1;
          if (effPassed(f)) st.capsEffPassed += 1;
        }
        if (f.ref) {
          if (!st.refsWindow[f.ref]) st.refsWindow[f.ref] = { cat: f.rcCategory || '', repeat: false, catRepeat: false };
        }
      }
    });

    const list = Object.keys(stations).map(k => {
      const st = stations[k];
      const L = st.observed > 0 ? st.loadSum / st.observed : null;
      let T = null;
      if (st.capsTotal > 0) {
        const theta = st.capsBreached / st.capsTotal;
        const nu = st.capsCompleted > 0 ? st.capsEffPassed / st.capsCompleted : 0;
        T = theta - nu;
      }
      const refs = Object.keys(st.refsWindow);
      let P = 0;
      if (refs.length > 0) {
        let y = 0, ycat = 0;
        refs.forEach(ref => {
          const entry = st.refsWindow[ref];
          if (st.catsPrior[ref] !== undefined) entry.repeat = true;
          if (entry.cat && Object.keys(st.catsPrior).some(pr => pr !== ref && st.catsPrior[pr] === entry.cat)) entry.catRepeat = true;
        });
        refs.forEach(ref => {
          const entry = st.refsWindow[ref];
          if (entry.repeat) y += 1;
          else if (entry.catRepeat) ycat += 1;
        });
        P = (y + 0.5 * ycat) / refs.length;
      }
      const kappa = st.observed > 0 ? st.compliant / st.observed : null;
      let qstat = null;
      if (st.qciObs >= PARAMS.ACTIVATION_FLOOR_OBSERVED) {
        const d = st.qciDef / st.qciObs;
        const trend = st.qciRecentObs > 0 && st.qciPriorObs > 0
          ? (st.qciRecentDef / st.qciRecentObs) - (st.qciPriorDef / st.qciPriorObs)
          : 0;
        qstat = d + Math.max(0, trend);
      }
      return {
        station: k,
        observed: st.observed, compliant: st.compliant, kappa,
        nAudits: st.nAudits, nFindings: st.nFindings, nQciAudits: st.nQciAudits,
        L, T, P, qstat,
        capsTotal: st.capsTotal, capsBreached: st.capsBreached,
        capsCompleted: st.capsCompleted, capsEffPassed: st.capsEffPassed,
        qaActive: st.observed >= PARAMS.ACTIVATION_FLOOR_OBSERVED,
        qciActive: qstat !== null
      };
    });

    const sL = momentStats(list.map(r => (r.qaActive ? r.L : null)));
    const sT = momentStats(list.map(r => (r.qaActive ? r.T : null)));
    const sP = momentStats(list.map(r => (r.qaActive ? r.P : null)));
    const sQ = momentStats(list.map(r => r.qstat));

    list.forEach(r => {
      const zL = r.qaActive ? zscore(r.L, sL) : 0;
      const zT = r.qaActive ? zscore(r.T, sT) : 0;
      const zP = r.qaActive ? zscore(r.P, sP) : 0;
      r.zL = zL; r.zT = zT; r.zP = zP;
      r.Dstar = PARAMS.SUB_WEIGHTS.L * zL + PARAMS.SUB_WEIGHTS.T * zT + PARAMS.SUB_WEIGHTS.P * zP;
      r.Qstar = zscore(r.qstat, sQ);
      const active = r.qaActive || r.qciActive;
      r.D = active ? (1 - PARAMS.QCI_SHARE) * r.Dstar + PARAMS.QCI_SHARE * r.Qstar : null;
    });

    const result = { endDate: toIso(end), now: nowIso, stations: list, params: PARAMS };
    _cache = { key: cacheKey, result };
    return result;
  }

  function getStationRow(iata, endDateIso) {
    const res = computeStats(endDateIso);
    return res.stations.find(s => s.station === String(iata).toUpperCase()) || null;
  }

  root.AuditPillar = {
    STORE_KEY, AUDIT_TYPES, MARKS, ROOT_CAUSES, EVENT_TYPES, PARAMS,
    load, setData, addAudit, deleteAudit, addEvent, setFindingFields, markReopened,
    exportJSON, importJSON,
    effUnits, slaDueDate, addBusinessDays, daysBetween,
    isDeficient, findingStatus, capBreached, effPassed,
    computeStats, getStationRow, todayIso, toDateMs, invalidate: () => { _cache = { key: null, result: null }; }
  };

})(typeof window !== 'undefined' ? window : globalThis);

if (typeof module !== 'undefined' && module.exports) {
  module.exports = (typeof window !== 'undefined' ? window : globalThis).AuditPillar;
}
