# Station Risk Scoring Model — Calculation Reference

## Table of Contents

1. [Aggregation Modes](#1-aggregation-modes)
2. [Mode 1: Weighted (A×B×C)](#2-mode-1-weighted-abc)
3. [Mode 2: Sum Score (Σ)](#3-mode-2-sum-score-)
4. [Mode 3: Risk Score (OAPT+SAPT) — Bühlmann](#4-mode-3-risk-score-oaptsapt)
5. [Mode 4: SMPRI (Standardized Multi-Pillar Risk Index)](#5-mode-4-smpri)
6. [Operational Multiplier (M_op)](#6-operational-multiplier-m_op)
7. [Flight Volume Normalization](#7-flight-volume-normalization)
8. [Tier Thresholds](#8-tier-thresholds)
9. [Axis Definitions](#9-axis-definitions)
10. [Occurrence Counting Logic](#10-occurrence-counting-logic)
11. [Advanced Metrics](#11-advanced-metrics)

---

## 1. Aggregation Modes

The application supports five scoring modes, cycled via the header button.

| Mode | Key | Entry Point |
|------|-----|-------------|
| Weighted | `aggregationMode === 'weighted'` | `getCompositeScore()` → standard A×B×C |
| Sum | `aggregationMode === 'sum'` | `computeSumScore()` |
| Risk (OAPT+SAPT) | `aggregationMode === 'risk'` | `computeRiskScore()` → Bühlmann blended |
| RPI | `aggregationMode === 'rpi'` | `computeRpiScore()` → weighted pillar combination |
| SMPRI | `aggregationMode === 'smpri'` | `computeSmpriScore()` → Z-score standardized |

```js
// js/app.js
function getCompositeScore(station) {
  if (aggregationMode === 'sum') return computeSumScore(station);
  if (aggregationMode === 'risk') {
    const df = document.getElementById('map-issues-date-from')?.value || '';
    const dt = document.getElementById('map-issues-date-to')?.value || '';
    return computeRiskScore(station.iataCode || station.name, df || undefined, dt || undefined);
  }
  // ... weighted path
}
```

---

## 2. Mode 1: Weighted (A×B×C)

### Formula

```
Final Score = clamp( A_avg × B_mult × C_mult × M_op , 1, 4)
```

Where:
- **A_avg** = arithmetic mean of Part A axis scores (1–4 scale)
- **B_mult** = multiplier derived from worst Part B average
- **C_mult** = multiplier derived from Part C weighted average
- **M_op** = operational multiplier (see §5)
- Result is clamped to **[1, 4]**

### Part A: Airport Base Score

Arithmetic mean of all scored Part A axes (22 axes, each scored 1–4).

```
A_avg = Σ(score_i) / N   (for N axes where score is not empty)
```

### Part B: Service Provider Multiplier

**Step 1:** Select worst (highest-risk) Part B assessment among all service providers at a station.

```js
// js/app.js:496–506
function getWorstPartB(station) {
  // Returns the completed Part B entry with the highest calcAvg
}
```

**Step 2:** Compute average of worst Part B's scores.

```
B_avg = Σ(score_i) / N   (for 8 Part B axes)
```

**Step 3:** Map to multiplier on **[0.70 – 1.30]**.

```
B_mult = 0.70 + ((B_avg − 1) / 3) × 0.60
```

| B_avg | B_mult |
|-------|--------|
| 1.0 | 0.70 |
| 2.0 | 0.90 |
| 3.0 | 1.10 |
| 4.0 | 1.30 |

If no Part B is complete: **B_mult = 1.0** (neutral).

### Part C: Integration Multiplier

**Step 1:** Compute weighted average using risk-unit weights.

```
C_weight = Σ(SCORE_WEIGHTS[score_i]) / N   (for 14 Part C axes)
```

Where `SCORE_WEIGHTS`:
| Score | Weight |
|-------|--------|
| 1 | 18 |
| 2 | 151 |
| 3 | 521 |
| 4 | 1,260 |

**Step 2:** Map to multiplier on **[0.60 – 1.40]**.

```
C_mult = 0.60 + ((C_weight − 18) / (1260 − 18)) × 0.80
```

| C_weight | C_mult |
|----------|--------|
| 18 | 0.60 |
| 333 | 0.78 |
| 648 | 0.96 |
| 963 | 1.15 |
| 1,260 | 1.40 |

If Part C is not complete: **C_mult = 1.0** (neutral).

### Complete Example

```
Station YYC:
  Part A axes scored: avg = 2.40
  Worst Part B (Suncor): avg = 2.75 → B_mult = 0.70 + (1.75/3 × 0.60) = 1.05
  Part C complete: weighted avg = 521 → C_mult = 0.60 + (503/1242 × 0.80) = 0.92

  A×B composite = 2.40 × 1.05 = 2.52
  A×B×C = 2.52 × 0.92 = 2.32
  M_op = 1.0 (no adjustments)
  Final = clamp(2.32 × 1.0, 1, 4) = 2.32
  Tier: Medium (≤ 2.5)
```

---

## 3. Mode 2: Sum Score (Σ)

### Formula

```
Adjusted Sum = round( (A_risk + B_risk + C_risk) × M_op )
```

Where each part's risk is the **sum of risk-units** (not average).

### Risk-Unit Conversion

Each axis score maps to a risk-unit weight:

| Score | Risk Units |
|-------|------------|
| 1 | 18 |
| 2 | 151 |
| 3 | 521 |
| 4 | 1,260 |

### Per-Part Sums

```
A_risk = Σ(SCORE_WEIGHTS[score_i])   (for 22 Part A axes)
B_risk = Σ(SCORE_WEIGHTS[score_i])   (for 8 axes of worst Part B)
C_risk = Σ(SCORE_WEIGHTS[score_i])   (for 14 Part C axes)
```

Each part tracks:
- `sum` — total risk-units
- `count` — number of scored axes
- `max` — count × 1,260 (theoretical maximum)
- `min` — count × 18 (theoretical minimum)

### Sort Score (for ranking)

The raw sum is mapped to a **[1.00 – 4.00]** sort score for consistent ranking:

```
Per-axis thresholds:
  Low band:    ≤ count × 333   → sortScore in [1.00, 1.75]
  Medium band: ≤ count × 648   → sortScore in [1.75, 2.50]
  High band:   ≤ count × 963   → sortScore in [2.50, 3.25]
  Very High:   > count × 963   → sortScore in [3.25, 4.00]
```

Linear interpolation within each band.

---

## 4. Mode 3: Risk Score (OAPT+SAPT)

### Purpose

Aggregates occurrence data from CRS records (types OAPT and SAPT) with risk levels, normalized by flight volume, then applies **Bühlmann credibility weighting** so low-volume stations pull toward the network average.

### Formula (Two-Pass)

```
Pass 1:  stationRate = (avgWeightPerOcc / flightCount) × 1,000
Pass 2:  Blended Score = Z × stationRate + (1 − Z) × networkAvgRate
  where  Z = flightCount / (flightCount + K)
  and    K = mean² / variance  (Empirical Bayes, clamped 100–2000)
```

- **Z near 0** (low flight volume) → score pulls toward network average
- **Z near 1** (high flight volume) → score reflects station's own data

### Step 1: Collect Station Records

Filter CRS merged reports for:
- Type is `OAPT` or `SAPT` (from `OAPT_SAPT_TYPES` set)
- ICAO code (`r.c`) matches the station (via ICAO→IATA lookup)
- For **SAPT**: risk level (`r.rl`) must not be `Not Set` and not empty
- For **OAPT**: all records included (flat weight regardless of risk level)
- Date range filter applied if set

### Step 2: Compute Weighted Sum

Each unique occurrence (`OccNo`) contributes a weight based on its type:

| Type | Condition | Weight |
|------|-----------|--------|
| OAPT | (any) | **1** |
| SAPT | Level 1 | **50** |
| SAPT | Level 2 | **250** |
| SAPT | Level 3 | **1,250** |
| SAPT | Not Set | 0 |

```
weightSum = Σ( weight )   (for each unique OccNo per station)
  where weight = OAPT_WEIGHT (1) if type is OAPT
         else RISK_LEVEL_WEIGHTS[r.rl] if type is SAPT
```

### Step 3: Compute Raw Station Rate (Pass 1)

```
avgWeightPerOcc = weightSum / stationUniqueCount

stationRate = (avgWeightPerOcc / flightCount) × 1,000
```

Stations without flight data are excluded from Bühlmann blending.

### Step 4: Compute Network Average (Pass 1 complete)

```
networkAvgRate = Σ(stationRate) / N   (across all stations with flight data)
```

### Step 5: Apply Bühlmann Credibility (Pass 2)

```
Z = flightCount / (flightCount + K)       K = mean² / variance (Empirical Bayes)
Blended Score = Z × stationRate + (1 − Z) × networkAvgRate
```

### Concrete Example

```
Network average: networkAvgRate = 12.05

Station YYC (large):
  weightSum = 1501, stationUniqueCount = 3, flightCount = 28,776
  stationRate = (500.33 / 28,776) × 1,000 = 17.39
  Z = 28,776 / (28,776 + 1,000) = 0.966
  Blended Score = 0.966 × 17.39 + 0.034 × 12.05 = 17.21

Station YKF (small):
  weightSum = 50, stationUniqueCount = 2, flightCount = 340
  stationRate = (25.0 / 340) × 1,000 = 73.53
  Z = 340 / (340 + 1,000) = 0.254
  Blended Score = 0.254 × 73.53 + 0.746 × 12.05 = 27.63
  (pulled strongly toward network average despite high raw rate)
```

### Caching

Results are cached by date range key (`_riskScoreCache`). Call `clearRiskScoreCache()` when data changes.

### Reporting Quality Flags

After computing blended scores, stations with zero incidents are flagged:

```
expectedIncidents = networkIncidentRate × stationFlightCount
  where networkIncidentRate = totalIncidents / totalFlights
```

| Condition | Flag |
|-----------|------|
| 0 incidents AND expected ≥ 3 | **Low Reporting Confidence** |
| 0 incidents AND expected < 3 | **Insufficient Volume** |
| > 0 incidents | — (no flag) |

The threshold of 3 is chosen because below this, zero incidents is statistically plausible even for compliant stations.

**Output example:**

| Station | Risk Score | Cred. Z | Flag |
|---------|-----------|---------|------|
| Calgary | 172.05 | 0.97 | — |
| Regina | 121.30 | 0.78 | Insufficient Volume |
| Tofino | 120.50 | 0.31 | Low Reporting Confidence |

### Risk per Hazards (supplementary metric)

A non-credibility metric showing the average hazard severity per occurrence, scaled to 1,000.

```
Risk per Hazards = (weightSum / stationUniqueCount) × 1,000
```

This measures how severe each hazard occurrence is at a station, independent of flight volume or credibility weighting. A station with many SAPT Level 3 occurrences will have a higher Risk per Hazards than one with only OAPT records.

### SAPT-only Risk per Hazard (separated severity)

Separates SAPT severity from OAPT to prevent dilution. A single OAPT record no longer dilutes severe SAPT findings.

```
saptRiskPerHazard = saptWeightSum / saptUniqueCount
```

Where only SAPT records with valid risk levels contribute. This gives the conditional severity given a safety occurrence.

### Risk per Flight (supplementary metric)

Total weighted severity per 1,000 flights, without credibility blending.

```
Risk per Flight = (weightSum / flightCount) × 1,000
```

Unlike the Bühlmann-blended score, this is a raw metric — it does not regress toward the network average for low-volume stations. Stations with few flights and high-weight SAPT records will show a high Risk per Flight.

| Type | Weight |
|------|--------|
| OAPT | 1 |
| SAPT Level 1 | 50 |
| SAPT Level 2 | 250 |
| SAPT Level 3 | 1,250 |

**Example:**
- Station with 100 OAPT + 2 SAPT L1: weightSum = 100×1 + 2×50 = 200; occCount = 102
  → Risk per Hazards = (200 / 102) × 1,000 = 1,961
- Station with 10 OAPT + 5 SAPT L3: weightSum = 10×1 + 5×1,250 = 6,260; occCount = 15
  → Risk per Hazards = (6,260 / 15) × 1,000 = 417,333
- Station with weightSum = 50,000 and 28,776 flights:
  → Risk per Flight = (50,000 / 28,776) × 1,000 = 1,737

### P-Score (Outlier Detection)

Z-score–style metric showing how many standard deviations a station's raw rate is from the network mean.

```
P = (stationRawRate − networkMeanRate) / networkStdDev
```

Where:
- **stationRawRate** = `(avgWeightPerOcc / flightCount) × 1,000` (before Bühlmann blending)
- **networkMeanRate** = average of all station raw rates
- **networkStdDev** = standard deviation of all station raw rates

| P Range | Interpretation |
|---------|---------------|
| \|P\| < 1 | Within normal range |
| 1 ≤ \|P\| < 2 | Slightly elevated / low |
| 2 ≤ \|P\| < 3 | **Outlier** — flagged on map with amber ring |
| \|P\| ≥ 3 | **Extreme outlier** — flagged on map with red ring |

**Sign:** P > 0 means the station's rate is above the network average (riskier). P < 0 means below average (safer).

### Exponential Time Decay (Early Warning)

Occurrence weights are decayed exponentially so recent incidents trigger rapid alerts while older incidents fade:

```
w_time = exp(−λ × Δt_days)
```

Where:
- **λ = 0.005** (half-life ≈ 138 days)
- **Δt_days** = days since occurrence date

| Days Since Occurrence | Weight |
|----------------------|--------|
| 0 (yesterday) | 1.00 |
| 30 | 0.86 |
| 90 | 0.64 |
| 138 (half-life) | 0.50 |
| 180 (6 months) | 0.40 |
| 365 (1 year) | 0.16 |

The decayed weight replaces the raw weight in `decayedWeightSum`, which is used alongside the raw `weightSum` for time-aware risk calculations.

**Example:**
- Network mean rate = 65.53, network std dev = 42.18
- Station raw rate = 11.58 → P = (11.58 − 65.53) / 42.18 = −1.28 (below average)
- Station raw rate = 150.00 → P = (150.00 − 65.53) / 42.18 = +2.00 (outlier)

### Freeman-Tukey Poisson P-Score (Variance-Stabilizing Transform)

Replaces the raw Gaussian P-score for stations with low counts. The Freeman-Tukey transform stabilizes variance to approximately 1.0 for Poisson-distributed counts, avoiding the false normality assumption.

```
ftPScore = √k + √(k+1) − √(4·E + 1)
```

Where:
- **k** = station occurrence count
- **E** = expected count = networkIncidentRate × flightCount

| ftPScore Range | Interpretation |
|---------------|---------------|
| ftPScore < −1 | Below expected (fewer incidents than average) |
| −1 ≤ ftPScore ≤ 1 | Within normal range |
| ftPScore > 1 | Above expected (more incidents than average) |

This metric is most useful for low-count stations where the Gaussian P-score is unreliable.

### Log Transformation (ln(rate + 1))

Compresses the scale to reduce the influence of extreme values, making distributions more symmetric.

```
logRate = ln(rawRate + 1)
logBlended = ln(blendedScore + 1)
```

A separate **Log P-Score** is computed using the log-transformed network mean and standard deviation:

```
logPScore = (logRate − logNetworkMean) / logNetworkStdDev
```

The log transformation is useful when a few stations have very high raw rates that dominate the visualization, compressing the rest of the data into a small range.

**Example:**
- Raw rate = 1,737 → ln(1,737 + 1) = 7.46
- Raw rate = 10 → ln(10 + 1) = 2.40
- Raw rate = 1 → ln(1 + 1) = 0.69

---

## 5. Mode 4: SMPRI (Standardized Multi-Pillar Risk Index)

### Purpose

Converts each pillar into a standardized Z-score across the network, then takes a weighted linear combination. Unlike raw RPI (which multiplies score ratios by flight count, making it an airport-size metric), SMPRI produces a dimensionless risk index where **0 = exact network average**.

### Formula

```
SMPRI = w_A × z_A + w_B × z_B + w_C × z_C + w_R × z_R
```

Where:
- **z_A = (A_avg − μ_A) / σ_A** — Part A Z-score
- **z_B = (B_avg − μ_B) / σ_B** — Part B Z-score (worst SP)
- **z_C = (C_weighted − μ_C) / σ_C** — Part C Z-score (weighted avg)
- **z_R = logPScore** — already a standardized Z-score on the log-rate scale

### Credibility-Gated Fusion

Weights are dynamically adjusted by Bühlmann credibility Z:

```
w_R = 0.40 × Z
w_audit = 1.0 − w_R
w_A = w_audit × (base_wA / Σbase_audit)
w_B = w_audit × (base_wB / Σbase_audit)
w_C = w_audit × (base_wC / Σbase_audit)
```

- **Low-volume station (Z ≈ 0.1):** 96% weight on Audit (Parts A/B/C), 4% on occurrences
- **High-volume station (Z ≈ 0.95):** 62% weight on Audit, 38% on occurrence data

### Tier Thresholds

| SMPRI Range | Tier |
|-------------|------|
| > 1.5 | Very High |
| > 0.75 | High |
| > −0.25 | Medium |
| ≤ −0.25 | Low |

### Advantage over RPI

RPI multiplies score ratios by flight count, making high-volume hubs get massive RPI values purely because of size. SMPRI standardizes all pillars to Z-scores, so the resulting index reflects **relative risk position** rather than airport size.

---

## 6. Operational Multiplier (M_op)

Applied in both **Weighted** and **Sum** modes.

### Formula

```
M_op = 1.0 + QCI_adj + Audit_adj + Incident_adj
```

| Factor | Condition | Adjustment |
|--------|-----------|------------|
| QCI | < 50 | +0.20 |
| QCI | > 90 | −0.10 |
| Audit text | Contains "critical" or "major" | +0.25 |
| Incidents | Per occurrence | +0.05 each, capped at +0.50 total |

### Examples

```
QCI = 42  → M_op += 0.20
Audit = "major finding in fueling" → M_op += 0.25
2 incident trends → M_op += min(2 × 0.05, 0.50) = +0.10

M_op = 1.0 + 0.20 + 0.25 + 0.10 = 1.55
```

Applied as:
```
Weighted mode:  finalScore = clamp(A×B×C × M_op, 1, 4)
Sum mode:       adjustedSum = round(totalRiskUnits × M_op)
```

---

## 6. Flight Volume Normalization

### Data Source

`data/flight_counts.js` — generated from `data (11).xlsx` via `process_data.py`.

Structure:
```js
FLIGHT_COUNTS = {
  "YYC": {
    "total": 28776,
    "dates": 197,
    "from": "2026-01-01",
    "to": "2026-07-16",
    "daily": { "2026-01-01": 133, "2026-01-02": 148, ... }
  },
  ...
}
```

### Functions

**`getFlightVolume(station)`** — Returns total flight count for a station.
1. Checks `FLIGHT_COUNTS[iata].total`
2. Falls back to `station.operationalData.flightNumbers` (manually entered)

**`getFlightVolumeByDate(iata, dateFrom, dateTo)`** — Returns sum of daily flights within a date range.
1. Sums `FLIGHT_COUNTS[iata].daily` values where `dateFrom <= dt <= dateTo`
2. Empty strings for `dateFrom`/`dateTo` mean no filtering (returns total)

**Usage in Risk Score (Bühlmann):**
```js
const flightCount = getFlightVolumeByDate(iata, dateFrom || '', dateTo || '')
                 || getFlightVolume({ iataCode: iata, name: iata })
                 || 0;
// If flightCount > 0: compute stationRate, then blend with network avg
// If flightCount == 0: station excluded from map
```

---

## 7. Tier Thresholds

### Weighted Mode (A×B×C)

Applied to the final score in range [1.00 – 4.00]:

| Tier | Score Range | Color |
|------|-------------|-------|
| Low | ≤ 1.50 | #65A30D (green) |
| Medium | ≤ 2.50 | #D97706 (amber) |
| High | ≤ 3.25 | #DC2626 (red) |
| Very High | ≤ 4.00 | #9F1239 (dark red) |

### Sum Mode (Σ)

Per-part tier (risk-units / axis count):

| Tier | Threshold |
|------|-----------|
| Low | ≤ count × 333 |
| Medium | ≤ count × 648 |
| High | ≤ count × 963 |
| Very High | > count × 963 |

### Risk Score Mode (OAPT+SAPT) — Bühlmann Blended

Applied to the blended score (per 1,000 flights normalization):

| Tier | Score Range |
|------|-------------|
| Low | ≤ 10 |
| Medium | ≤ 50 |
| High | ≤ 150 |
| Very High | > 150 |

Credibility constant **K = mean² / variance** (Empirical Bayes, self-calibrating). Stations without flight data are excluded from the map. Zero-incident stations with flight data are included (score pulled to network average) and flagged if expected incidents ≥ 3.

---

## 8. Axis Definitions

### Part A: Airport Infrastructure (22 axes)

| ID | Name | Short |
|----|------|-------|
| aa-sms-governance | 2.1 Airport Authority SMS & Safety Governance | AA SMS/Gov |
| environment | 2.2.1 Environment | Environment |
| tenant-mgmt | 2.2.2 Tenant Management | Tenant Mgmt |
| emergency-response | 2.2.3 Emergency Response | Emerg Resp |
| terminal-construction | 2.3 Terminal Construction & Temporary Conditions | Term Constr |
| groundside-access | 3.0 Groundside & Airport Access | Groundside |
| checkin-layout | 4.1 Check-in Layout, Capacity & Passenger Flow | Check-in |
| baggage-induction | 4.2 Baggage Induction at Check-in | Bags Induct |
| baggage-sortation | 5.1 Baggage System — Sortation & Screening | Bag Sort |
| bag-room | 5.2 Bag Room Operations Environment | Bag Room |
| arrivals-reclaim | 5.3 Arrivals, Transfer & Baggage Reclaim | Arr/Reclaim |
| boarding-lounge | 6.1 Boarding Lounge & Gate Area | Board Lounge |
| gate-operations | 6.2 Gate & Boarding Bridge Operations | Gate Ops |
| remote-stand | 6.3 Passenger Transport / Remote Stand Ops | Remote Stand |
| stand-layout | 7.1 Stand Layout, Markings & Clearances | Stand Layout |
| parking-guidance | 7.2 Parking Guidance — Arrival & Departure | Park Guide |
| gse-staging | 7.3 Stand Services & GSE Staging | GSE Staging |
| vehicle-service-roads | 7.4 Vehicle Service Roads & Apron Traffic | Veh Svc Rd |
| potable-water | 8.1 Potable Water Servicing Infrastructure | Potable H2O |
| fueling | 8.2 Fueling Infrastructure | Fueling |
| lavatory-waste | 8.3 Lavatory & Waste Servicing Infrastructure | Lav/Waste |
| deicing | 8.4 De-icing Infrastructure & Operation Setup | De-icing |

### Part B: Service Provider (8 axes)

| ID | Name |
|----|------|
| sp-sms-governance | SP SMS & governance |
| staffing-structure | Staffing & structure |
| training-competency | Training & competency |
| procedures-alignment | Procedures & alignment |
| potable-water-sp | Potable water process |
| load-control | Load control & communications |
| emergency-response-sp | Emergency response |
| gse-management | GSE management |

### Part C: Operational Safety Integration (14 axes)

| ID | Name |
|----|------|
| environment-context | 2.0 Environment & Operating Context |
| wj-standards | 3.1 Standards, Procedures & Training (WestJet) |
| wj-operational-support | 3.2 Operational Support & Setup (WestJet) |
| wj-safety-mgmt | 3.3 Safety Management, Coordination & Oversight (WestJet) |
| sp-standards | 4.1 Standards, Procedures & Training (SP) |
| sp-safety-assurance | 4.2 Safety Management, Assurance & Risk Monitoring (SP) |
| sp-roles-coordination | 4.3 Roles, Accountability & Coordination (SP) |
| sp-staffing-equipment | 4.4 Staffing, Equipment & Capacity (SP) |
| supervisory-presence | 5.1 Supervisory Presence & Oversight |
| planning-priority | 5.2 Planning & Priority Management |
| managing-issues | 5.3 Managing Known Issues |
| communication-coordination | 6.1 Communication & Team Coordination |
| workload-pressure | 6.2 Workload & Time Pressure |
| task-performance | 7.2 Task Performance |

---

## 9. Occurrence Counting Logic

### Unique OccNo Counting

All counts throughout the app are based on **unique `OccNo` values**, not raw record counts. This prevents double-counting when a single occurrence has multiple CRS records.

```
Total occurrences = |Set of all OccNo values|
Per-station       = |Set of OccNo where ICAO matches station|
Per-type          = |Set of OccNo where type = X|
Per-city          = |Set of OccNo where city = X|
```

### OccNo Matching

OccNo values may have year suffixes (e.g., `2024-12345`). Matching uses **base OccNo** (stripping the year prefix) so that the same occurrence across different report years matches correctly.

### ICAO → IATA Conversion

CRS records store airport identifiers as ICAO codes (e.g., `CYYC`). The app converts to IATA (e.g., `YYC`) via:

1. **Direct lookup:** `ICAO_DIRECT_MAP` for international airports (e.g., `EGPH → EDI`)
2. **Prefix patterns:** `C` + IATA for Canadian airports, `K` + IATA for US airports, `TJ` + IATA for Puerto Rico
3. **Lazy initialization:** `ensureIcaoGlobal()` builds the complete lookup from `STATION_COORDS` keys

### OAPT+SAPT Risk Level Weights

Used exclusively in **Risk Score (OAPT+SAPT)** mode. Weight depends on occurrence type:

| Type | Risk Level | Weight | Rationale |
|------|------------|--------|-----------|
| OAPT | (any) | 1 | Flat weight — all OAPT occurrences treated equally |
| SAPT | Level 1 | 50 | Low severity safety occurrence |
| SAPT | Level 2 | 250 | 5× Level 1 |
| SAPT | Level 3 | 1,250 | 5× Level 2 (25× Level 1) |

---

## Summary: Which Formula When

| View | Default Mode | Notes |
|------|-------------|-------|
| Station List | Weighted (A×B×C) | Shows A avg, B mult, A×B, C mult, final |
| Station Detail | Weighted (A×B×C) | Full breakdown panel |
| Dashboard | Weighted (A×B×C) | Aggregate stats |
| Map — Risk Score | Weighted | Composite score per station |
| Map — Risk Score (OAPT+SAPT) | Risk Score | Occurrence-based, flight-normalized, Bühlmann blended |
| Map — Issues | N/A | Raw occurrence counts |
| Rankings | Weighted | Sortable by final score |
| Reporters | N/A | Per-reporter statistics |

All modes respect the global aggregation toggle in the header.

---

## 10. Date Range Filtering

### Scope

All three map modes (Weighted, Risk Score OAPT+SAPT, Issues) share a common **From / To** date range filter that defaults to the **last 7 days** on page load.

### Behavior

| Mode | How Date Filter Is Applied |
|------|---------------------------|
| Weighted (A×B×C) | Date filter not applicable — uses form data, not CRS records |
| Risk Score (OAPT+SAPT) | Filters CRS records by `r.dt` before computing `weightSum`, `stationUniqueCount`, `totalGlobal`, and `flightCount` |
| Issues | Filters CRS records by `r.dt` before counting occurrences per station |

### Implementation

The date inputs (`map-issues-date-from`, `map-issues-date-to`) are always visible in all modes. Each mode reads them independently:

- **`computeRiskScore(iata, dateFrom, dateTo)`** — date parameters filter both station records and global occurrence set
- **`getFlightVolumeByDate(iata, dateFrom, dateTo)`** — flight count is also date-filtered, so the denominator matches the occurrence window
- **`renderMapIssuesMode()`** — reads dates directly from DOM inputs

When the mode switcher changes modes, the date range is **preserved** (not cleared).

### Default Date Range

Set during `init()`:
```js
const d = new Date(); d.setDate(d.getDate() - 7);
dateFrom.value = d.toISOString().substring(0, 10);  // e.g. "2026-07-09"
dateTo.value = new Date().toISOString().substring(0, 10);  // e.g. "2026-07-16"
```

---

## 11. Advanced Metrics

### Empirical Bayes K (Self-Calibrating Credibility)

Instead of a hardcoded tuning constant, K is computed from the network's empirical variance ratio:

```
K = mean² / variance   (clamped to [100, 2000])
```

Where `mean` and `variance` are the network-wide mean and variance of station raw rates. This ensures the credibility weighting adapts to the actual spread of risk across the network.

| Network Variance | Effect on K |
|-----------------|-------------|
| Low (tight cluster) | High K → stronger shrinkage toward mean |
| High (wide spread) | Low K → stations retain more of their own data |

### Freeman-Tukey Poisson Transform

Replaces the raw Gaussian P-score for count data. Stabilizes variance to ~1.0:

```
ftPScore = √k + √(k+1) − √(4·E + 1)
```

Where `k` = station count, `E` = expected count from network rate.

### Automated Alert Triggers

Two intervention flags appear on station cards when triggered:

| Alert | Condition | Purpose |
|-------|-----------|---------|
| 🚨 Immediate Action | SMPRI ≥ 1.5 **OR** (logPScore ≥ 2.0 AND Z ≥ 0.5) | High-risk station needs immediate attention |
| ⚠️ Reporting Quality Audit | 0 incidents **AND** expected ≥ 3.0 | Possible under-reporting — audit recommended |

These flags appear in the station list and rankings views as visual indicators alongside the existing axis flags.
