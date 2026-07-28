# Master Engineering & Statistical Instructions for "Big Pickle"

This document provides exact, step-by-step instructions to refactor the **Station Risk Scoring Engine**. Following these instructions will fix critical code bugs, eliminate mathematically flawed metrics (like the current RPI and raw Gaussian P-Score), and upgrade the application into a statistically sound, predictive early-warning risk ranking system.

---

## Phase 1: Critical Bug Fixes & Code Cleanup

### Task 1.1: Fix Reporting Quality Flag Dead-Code Bug
**Target File**: `js/app.js` (lines 1030–1119)  
**Issue**: `hasOapt` and `hasSapt` are computed inside the `seen.has(r.o)` deduplication loop. When `occCount === 0`, the loop never runs, causing `hasOapt` and `hasSapt` to remain `false`. As a result, the `(!hasOapt && !hasSapt)` condition ALWAYS triggers first, making `'Low Reporting Confidence'` and `'Insufficient Volume'` unreachable dead code.

**Action**:
1. Scan `stationRecords` for `OAPT` and `SAPT` presence **before** the deduplication loop.
2. Update `app.js` around lines 1030–1120:

```js
// Track presence of eligible record types BEFORE the dedup loop
const hasAnyOapt = stationRecords.some(r => r.t === 'OAPT');
const hasAnySapt = stationRecords.some(r => r.t === 'SAPT');

const seen = new Set();
let weightSum = 0;
stationRecords.forEach(r => {
  if (seen.has(r.o)) return;
  seen.add(r.o);
  weightSum += r.t === 'OAPT' ? OAPT_WEIGHT : (RISK_LEVEL_WEIGHTS[r.rl] || 0);
});

// ... inside Pass 2 (line 1104) ...
const expectedIncidents = networkIncidentRate * data.flightCount;
let reportingFlag = '';
if (data.occCount === 0) {
  if (hasAnyOapt && !hasAnySapt) {
    reportingFlag = 'No SAPT';
  } else if (!hasAnyOapt && hasAnySapt) {
    reportingFlag = 'No OAPT';
  } else if (!hasAnyOapt && !hasAnySapt) {
    if (expectedIncidents >= EXPECTED_INCIDENT_THRESHOLD) {
      reportingFlag = 'Low Reporting Confidence';
    } else {
      reportingFlag = 'Insufficient Volume';
    }
  }
}
```

---

### Task 1.2: Implement Empirical Bayes Credibility $K$ (Self-Calibrating)
**Target File**: `js/app.js` (lines 975, 1060–1087)  
**Issue**: Hardcoding `BUEHLMANN_K_DEFAULT = 500` (or `1000`) is arbitrary. The actuarial definition of $K$ is the ratio of within-station variance to between-station variance ($K = \sigma^2 / \tau^2$).

**Action**:
Calculate $K$ dynamically from network empirical variance:

```js
// In _computeAllRiskScores pass 1:
const rawRates = [...stationRawRates.values()].map(d => d.rawRate);
const netMean = rawRates.reduce((a, b) => a + b, 0) / (rawRates.length || 1);
const netVar = rawRates.reduce((s, r) => s + (r - netMean) ** 2, 0) / (rawRates.length || 1);

// Empirical Bayes K: variance ratio (fallback to 500 if variance is negligible)
const BUEHLMANN_K = netVar > 0 ? Math.min(Math.max(Math.round((netMean * netMean) / netVar), 100), 2000) : 500;
```

---

### Task 1.3: Fix Misleading Code Comments & Documentation Typos
1. **In `js/app.js` (line 812)**: Update the `C_multiplier` comment to state that input is `C_weight` (range 18–1260 risk units) with a neutral point at ~630, NOT a 1–4 raw average.
2. **In `CALCULATIONS.md` (§4)**: Fix the `networkAvgRate` typo (`120.50` vs `12.05`). Recompute worked examples with $K = 500$ or empirical $K$.

---

## Phase 2: Refactor Invalid & Contaminated Metrics

### Task 2.1: Discontaminate `Risk per Hazard` (Separate SAPT Severity)
**Target File**: `js/app.js` (lines 1043–1050)  
**Issue**: `riskPerHazard = (weightSum / occCount) * 1000` mixes OAPT (weight=1) with SAPT (weight=50–1250). A single OAPT dilutes severe SAPTs.

**Action**:
Calculate SAPT-only average severity:

```js
const saptRecords = stationRecords.filter(r => r.t === 'SAPT');
const saptSeen = new Set();
let saptWeightSum = 0;
saptRecords.forEach(r => {
  if (saptSeen.has(r.o)) return;
  saptSeen.add(r.o);
  saptWeightSum += RISK_LEVEL_WEIGHTS[r.rl] || 0;
});

const saptRiskPerHazard = saptSeen.size > 0 ? (saptWeightSum / saptSeen.size) : 0;
// Store as saptRiskPerHazard (conditional severity given a safety occurrence)
```

---

### Task 2.2: Replace Raw Gaussian P-Score with Freeman-Tukey Poisson Transform
**Target File**: `js/app.js` (lines 1095–1097)  
**Issue**: `(stationRawRate - networkMean) / stdDev` assumes normality, which fails severely on skewed, zero-inflated rate data.

**Action**:
Use the **Freeman-Tukey Variance Stabilizing Transform** for Poisson counts:

```js
// Expected count based on network incident rate
const expectedCount = networkIncidentRate * data.flightCount;
const k = data.occCount;

// Freeman-Tukey Z-score (stabilizes variance to ~1.0)
const ftPScore = data.flightCount > 0 
  ? (Math.sqrt(k) + Math.sqrt(k + 1) - Math.sqrt(4 * expectedCount + 1))
  : 0;

// Replace raw pScore with ftPScore (or rely on logPScore)
```

---

## Phase 3: Replace Broken RPI with SMPRI (Standardized Multi-Pillar Risk Index)

### Task 3.1: Deprecate RPI Options 1 & 2
**Target File**: `js/app.js` (`computeRpiScore`, lines 1158–1267)  
**Issue**: Terms like `(A_avg / medA) * (flights / 1000)` multiply score ratios by flight count. High-volume hubs get massive RPI values purely because of flight volume, making RPI an airport size metric rather than a risk metric.

### Task 3.2: Implement SMPRI
Build the **Standardized Multi-Pillar Risk Index**:
Convert each pillar into a standardized $Z$-score across the network, then take a weighted linear combination.

$$\text{SMPRI} = w_A z_A + w_B z_B + w_C z_C + w_R z_R$$

Where:
- $z_A = \frac{A_{\text{avg}} - \mu_A}{\sigma_A}$
- $z_B = \frac{B_{\text{avg}} - \mu_B}{\sigma_B}$
- $z_C = \frac{C_{\text{avg}} - \mu_C}{\sigma_C}$
- $z_R = \text{logPScore}$ (already a standardized $Z$-score on the log-rate scale)
- $w_A = 0.25, w_B = 0.25, w_C = 0.25, w_R = 0.25$ (default configurable weights)

**Implementation in `js/app.js`**:

```js
function computeSmpriScore(station) {
  const allStations = loadData().stations || {};
  const df = document.getElementById('map-issues-date-from')?.value || '';
  const dt = document.getElementById('map-issues-date-to')?.value || '';
  
  // 1. Gather all station scores across pillars
  const records = [];
  Object.keys(allStations).forEach(iata => {
    const s = allStations[iata];
    const aAvg = calcAvg(s.partA.scores, AXES.partA);
    const worstB = getWorstPartB(s);
    const bAvg = worstB ? calcAvg(worstB.scores, AXES.partB) : null;
    const cAvg = s.partC.status === 'complete' ? calcWeightedCAvg(s.partC.scores, AXES.partC) : null;
    const riskData = computeRiskScore(iata, df || undefined, dt || undefined);
    const logP = riskData ? riskData.logPScore || 0 : 0;
    records.push({ iata, aAvg, bAvg, cAvg, logP });
  });

  // 2. Compute network means and std devs for Part A, B, C
  const calcStats = (vals) => {
    const valid = vals.filter(v => v !== null && !isNaN(v));
    if (!valid.length) return { mean: 0, std: 1 };
    const mean = valid.reduce((a, b) => a + b, 0) / valid.length;
    const variance = valid.reduce((s, v) => s + (v - mean) ** 2, 0) / valid.length;
    return { mean, std: Math.sqrt(variance) || 1 };
  };

  const statsA = calcStats(records.map(r => r.aAvg));
  const statsB = calcStats(records.map(r => r.bAvg));
  const statsC = calcStats(records.map(r => r.cAvg));

  // 3. Compute z-scores for target station
  const targetIata = station.iataCode || station.name;
  const aAvg = calcAvg(station.partA.scores, AXES.partA);
  const worstB = getWorstPartB(station);
  const bAvg = worstB ? calcAvg(worstB.scores, AXES.partB) : null;
  const cAvg = station.partC.status === 'complete' ? calcWeightedCAvg(station.partC.scores, AXES.partC) : null;
  const riskData = computeRiskScore(targetIata, df || undefined, dt || undefined);

  const zA = aAvg !== null ? (aAvg - statsA.mean) / statsA.std : 0;
  const zB = bAvg !== null ? (bAvg - statsB.mean) / statsB.std : 0;
  const zC = cAvg !== null ? (cAvg - statsC.mean) / statsC.std : 0;
  const zR = riskData ? riskData.logPScore : 0;

  // 4. Weighted combination (SMPRI score; 0 = exact network average)
  const smpri = 0.25 * zA + 0.25 * zB + 0.25 * zC + 0.25 * zR;

  return {
    finalScore: +smpri.toFixed(3),
    zA: +zA.toFixed(2), zB: +zB.toFixed(2), zC: +zC.toFixed(2), zR: +zR.toFixed(2),
    sortScore: +smpri.toFixed(3),
    tier: smpri > 1.5 ? { tier: 'Very High', color: '#9F1239' }
        : smpri > 0.75 ? { tier: 'High', color: '#DC2626' }
        : smpri > -0.25 ? { tier: 'Medium', color: '#D97706' }
        : { tier: 'Low', color: '#65A30D' }
  };
}
```

---

## Phase 4: Implement Predictive Early Warning & Intervention System

To transform the tool into an **early-warning system for rapid intervention**, implement the following three mechanisms:

### Task 4.1: Credibility-Gated Fusion Model
When evaluating overall station risk, automatically scale occurrence weight by Bühlmann $Z$:

$$\text{Weight}_{\text{Occurrence}} = 0.40 \times Z$$
$$\text{Weight}_{\text{Audit}} = 1.0 - \text{Weight}_{\text{Occurrence}}$$

- **Low-volume station ($Z \approx 0.1$)**: $96\%$ weight on Audit (Parts A/B/C), $4\%$ on occurrences. Prevents single-SAPT distortion.
- **High-volume station ($Z \approx 0.95$)**: $62\%$ weight on Audit, $38\%$ on occurrence data. Real-world events carry heavy weight.

### Task 4.2: Exponential Time Decay on Occurrences
Add exponential decay to occurrence records so recent incidents trigger rapid alerts while older incidents fade:

$$w_{\text{time}} = \exp(-\lambda \times \Delta t_{\text{days}})$$

Where $\lambda = 0.005$ (half-life $\approx 138$ days). An occurrence from yesterday has weight $1.0$; an occurrence from 6 months ago has weight $0.40$.

### Task 4.3: Automated Risk Outlier & Under-Reporting Alert Triggers
Add two intervention flags to station summary cards:

1. **🚨 Immediate Action Alert**: Triggered if $\text{SMPRI} \ge 1.5$ OR ($\text{logPScore} \ge 2.0$ AND $Z \ge 0.5$).
2. **⚠️ Reporting Quality Audit Required**: Triggered if $\text{actualIncidents} = 0$ AND $\text{expectedIncidents} \ge 3.0$.

---

## Summary Checklist for Code Implementation

- [ ] **Fix bug**: Move `hasAnyOapt`/`hasAnySapt` scan above dedup loop in `app.js`.
- [ ] **Update $K$**: Replace hardcoded `BUEHLMANN_K = 500` with empirical variance ratio $K = \text{mean}^2 / \text{variance}$.
- [ ] **Fix P-Score**: Replace raw Gaussian P-score with Freeman-Tukey transform or promote `logPScore`.
- [ ] **Separate SAPT**: Add `saptRiskPerHazard` (SAPT-only average severity).
- [ ] **Replace RPI**: Deprecate Options 1 & 2; implement `computeSmpriScore()` using standardized Z-scores.
- [ ] **Add Early Warning Triggers**: Display intervention alerts for high SMPRI / logPScore and under-reporting flags.
- [ ] **Update Documentation**: Synchronize `CALCULATIONS.md` with updated math and formulas.
