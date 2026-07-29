'use strict';

// ─── Axis definitions ─────────────────────────────────────────────────────────

const AXES = {
  partA: [
    { id: 'aa-sms-governance', name: '2.1 Airport Authority Safety Management System (SMS) & Safety Governance', short: 'AA SMS/Gov' },
    { id: 'environment', name: '2.2.1 Environment', short: 'Environment' },
    { id: 'tenant-mgmt', name: '2.2.2 Tenant Management', short: 'Tenant Mgmt' },
    { id: 'emergency-response', name: '2.2.3 Emergency Response', short: 'Emerg Resp' },
    { id: 'terminal-construction', name: '2.3 Terminal Construction & Temporary Conditions', short: 'Term Constr' },
    { id: 'groundside-access', name: '3.0 Groundside & Airport Access', short: 'Groundside' },
    { id: 'checkin-layout', name: '4.1 Check-in Layout, Capacity & Passenger Flow', short: 'Check-in' },
    { id: 'baggage-induction', name: '4.2 Baggage Induction at Check-in', short: 'Bags Induct' },
    { id: 'baggage-sortation', name: '5.1 Baggage System — Sortation & Screening Infrastructure', short: 'Bag Sort' },
    { id: 'bag-room', name: '5.2 Bag Room Operations Environment', short: 'Bag Room' },
    { id: 'arrivals-reclaim', name: '5.3 Arrivals, Transfer & Baggage Reclaim', short: 'Arr/Reclaim' },
    { id: 'boarding-lounge', name: '6.1 Boarding Lounge & Gate Area', short: 'Board Lounge' },
    { id: 'gate-operations', name: '6.2 Gate & Boarding Bridge Operations', short: 'Gate Ops' },
    { id: 'remote-stand', name: '6.3 Passenger Transport / Remote Stand Operations', short: 'Remote Stand' },
    { id: 'stand-layout', name: '7.1 Stand Layout, Markings & Clearances', short: 'Stand Layout' },
    { id: 'parking-guidance', name: '7.2 Parking Guidance — Arrival & Departure', short: 'Park Guide' },
    { id: 'gse-staging', name: '7.3 Stand Services & GSE Staging', short: 'GSE Staging' },
    { id: 'vehicle-service-roads', name: '7.4 Vehicle Service Roads & Apron Traffic', short: 'Veh Svc Rd' },
    { id: 'potable-water', name: '8.1 Potable Water Servicing Infrastructure', short: 'Potable H2O' },
    { id: 'fueling', name: '8.2 Fueling Infrastructure', short: 'Fueling' },
    { id: 'lavatory-waste', name: '8.3 Lavatory & Waste Servicing Infrastructure', short: 'Lav/Waste' },
    { id: 'deicing', name: '8.4 De-icing Infrastructure & Operation Setup', short: 'De-icing' },
  ],
  partB: [
    { id: 'sp-sms-governance', name: 'SP SMS & governance', short: 'SP SMS/Gov' },
    { id: 'staffing-structure', name: 'Staffing & structure', short: 'Staff/Struct' },
    { id: 'training-competency', name: 'Training & competency', short: 'Training' },
    { id: 'procedures-alignment', name: 'Procedures & alignment', short: 'Procedures' },
    { id: 'potable-water-sp', name: 'Potable water process', short: 'Potable H2O' },
    { id: 'load-control', name: 'Load control & communications', short: 'Load Control' },
    { id: 'emergency-response-sp', name: 'Emergency response', short: 'Emerg Resp' },
    { id: 'gse-management', name: 'GSE management', short: 'GSE Mgmt' },
  ],
  partC: [
    { id: 'environment-context', name: '2.0 Environment & Operating Context', short: 'Enviro/Ctxt' },
    { id: 'wj-standards', name: '3.1 Standards, Procedures & Training (WestJet)', short: 'WJ Stds' },
    { id: 'wj-operational-support', name: '3.2 Operational Support & Setup (WestJet)', short: 'WJ Ops Supp' },
    { id: 'wj-safety-mgmt', name: '3.3 Safety Management, Coordination & Oversight (WestJet)', short: 'WJ Safety' },
    { id: 'sp-standards', name: '4.1 Standards, Procedures & Training (Service Provider)', short: 'SP Stds' },
    { id: 'sp-safety-assurance', name: '4.2 Safety Management, Assurance & Risk Monitoring (Service Provider)', short: 'SP Safety' },
    { id: 'sp-roles-coordination', name: '4.3 Roles, Accountability & Coordination (Service Provider)', short: 'SP Roles' },
    { id: 'sp-staffing-equipment', name: '4.4 Staffing, Equipment & Capacity (Service Provider)', short: 'SP Staff' },
    { id: 'supervisory-presence', name: '5.1 Supervisory Presence & Oversight', short: 'Supervision' },
    { id: 'planning-priority', name: '5.2 Planning & Priority Management', short: 'Planning' },
    { id: 'managing-issues', name: '5.3 Managing Known Issues', short: 'Known Issues' },
    { id: 'communication-coordination', name: '6.1 Communication & Team Coordination', short: 'Comms/Coord' },
    { id: 'workload-pressure', name: '6.2 Workload & Time Pressure', short: 'Workload' },
    { id: 'task-performance', name: '7.2 Task Performance', short: 'Task Perf' },
  ],
};

// ─── Region / ASRM mapping ─────────────────────────────────────────────────

const REGION_SETTINGS_KEY = 'stationRiskRegionSettings';
const TITLE_SETTINGS_KEY = 'stationRiskTitleSettings';

let REGION_MAP = {
  YVR: 'Western Canada & Mexico', YYC: 'Western Canada & Mexico',
  YEG: 'Western Canada & Mexico', YLW: 'Western Canada & Mexico',
  YXX: 'Western Canada & Mexico', YXS: 'Western Canada & Mexico',
  YQQ: 'Western Canada & Mexico', YYJ: 'Western Canada & Mexico',
  YMM: 'Western Canada & Mexico', YQR: 'Western Canada & Mexico',
  YXE: 'Western Canada & Mexico', YBL: 'Western Canada & Mexico',
  CUN: 'Western Canada & Mexico', PVR: 'Western Canada & Mexico',
  SJD: 'Western Canada & Mexico',
  YBR: 'Western Canada & Mexico', YFC: 'Western Canada & Mexico',
  YFI: 'Western Canada & Mexico', YKA: 'Western Canada & Mexico',
  YKF: 'Western Canada & Mexico', YXC: 'Western Canada & Mexico',

  YWG: 'Central Canada & LATAM', YOW: 'Central Canada & LATAM',
  YXU: 'Central Canada & LATAM', YTS: 'Central Canada & LATAM',
  YSB: 'Central Canada & LATAM', YAM: 'Central Canada & LATAM',
  YYB: 'Central Canada & LATAM',
  YQB: 'Central Canada & LATAM', YQG: 'Central Canada & LATAM',
  YQM: 'Central Canada & LATAM', YQT: 'Central Canada & LATAM',
  YQU: 'Central Canada & LATAM', YQY: 'Central Canada & LATAM',
  YXJ: 'Central Canada & LATAM', YXT: 'Central Canada & LATAM',
  YYF: 'Central Canada & LATAM', YYG: 'Central Canada & LATAM',
  POP: 'Central Canada & LATAM', CCC: 'Central Canada & LATAM',
  SNU: 'Central Canada & LATAM', HOG: 'Central Canada & LATAM',
  RIH: 'Central Canada & LATAM', AZS: 'Central Canada & LATAM',
  PTY: 'Central Canada & LATAM', CYO: 'Central Canada & LATAM',
  LRM: 'Central Canada & LATAM', CFG: 'Central Canada & LATAM',
  SJU: 'Central Canada & LATAM', ADZ: 'Central Canada & LATAM',
  GRU: 'Central Canada & LATAM', MDE: 'Central Canada & LATAM',

  YYZ: 'Eastern Canada & Europe & Asia', YUL: 'Eastern Canada & Europe & Asia',
  YHZ: 'Eastern Canada & Europe & Asia', YQX: 'Eastern Canada & Europe & Asia',
  AMS: 'Eastern Canada & Europe & Asia', CDG: 'Eastern Canada & Europe & Asia',
  CPH: 'Eastern Canada & Europe & Asia', CWL: 'Eastern Canada & Europe & Asia',
  DUB: 'Eastern Canada & Europe & Asia', EDI: 'Eastern Canada & Europe & Asia',
  GLA: 'Eastern Canada & Europe & Asia', LIS: 'Eastern Canada & Europe & Asia',
  MAD: 'Eastern Canada & Europe & Asia', LHR: 'Eastern Canada & Europe & Asia',
  FRA: 'Eastern Canada & Europe & Asia', NRT: 'Eastern Canada & Europe & Asia',
  ICN: 'Eastern Canada & Europe & Asia',

  ATL: 'US & Caribbean', BOS: 'US & Caribbean', DEN: 'US & Caribbean',
  IAH: 'US & Caribbean', JFK: 'US & Caribbean', LAS: 'US & Caribbean',
  LAX: 'US & Caribbean', MCO: 'US & Caribbean', MIA: 'US & Caribbean',
  ORD: 'US & Caribbean', PHX: 'US & Caribbean', SEA: 'US & Caribbean',
  SFO: 'US & Caribbean', BON: 'US & Caribbean', HAV: 'US & Caribbean',
  PUJ: 'US & Caribbean', SXM: 'US & Caribbean', VRA: 'US & Caribbean',
  SLC: 'US & Caribbean', SAN: 'US & Caribbean', DTW: 'US & Caribbean',
  IAD: 'US & Caribbean', ACY: 'US & Caribbean', AUS: 'US & Caribbean',
  BNA: 'US & Caribbean', FLL: 'US & Caribbean', IWA: 'US & Caribbean',
  MSP: 'US & Caribbean', OKC: 'US & Caribbean', PDX: 'US & Caribbean',
  RSW: 'US & Caribbean', SNA: 'US & Caribbean', TUS: 'US & Caribbean',
  YZF: 'US & Caribbean', ANC: 'US & Caribbean',
  GND: 'Central Canada & LATAM', HUX: 'Western Canada & Mexico', LTO: 'Western Canada & Mexico',
  MID: 'Western Canada & Mexico', PLS: 'Central Canada & LATAM', PXM: 'Western Canada & Mexico',
  TPQ: 'Western Canada & Mexico', TQO: 'Western Canada & Mexico',
};

let COMPOSED_REGIONS = {};

// Load saved region settings from localStorage
(function loadRegionSettings() {
  try {
    const saved = localStorage.getItem(REGION_SETTINGS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.regionMap) Object.assign(REGION_MAP, parsed.regionMap);
      if (parsed.composedRegions) Object.assign(COMPOSED_REGIONS, parsed.composedRegions);
    }
  } catch (_) { }
})();

let ASRM_MAP = {
  'Western Canada & Mexico': { name: 'Suzan', short: 'Suzan', hub: 'YEG' },
  'Central Canada & LATAM': { name: 'Isis', short: 'Isis', hub: 'YYC' },
  'Eastern Canada & Europe & Asia': { name: 'Nicole', short: 'Nicole', hub: 'YYZ' },
  'US & Caribbean': { name: 'Theresa', short: 'Theresa', hub: 'YVR' },
};

function getStationRegion(iata) {
  if (Object.keys(COMPOSED_REGIONS).length > 0) {
    return getComposedRegionForStation(iata) || REGION_MAP[iata] || '';
  }
  return REGION_MAP[iata] || '';
}

// ─── Tier thresholds ──────────────────────────────────────────────────────────

const TIER_THRESHOLDS = [
  { max: 1.5, tier: 'Low', cls: 'tier-low', color: '#65A30D' },
  { max: 2.5, tier: 'Medium', cls: 'tier-medium', color: '#D97706' },
  { max: 3.25, tier: 'High', cls: 'tier-high', color: '#DC2626' },
  { max: 4.0, tier: 'Very High', cls: 'tier-very-high', color: '#9F1239' },
];

const STORAGE_KEY = 'stationRiskData_v3';
const AGG_MODE_KEY = 'stationRiskAggMode';
const EXCEL_SEEDED_KEY = 'excelDataSeeded_v1';
const RPI_SETTINGS_KEY = 'stationRiskRpiSettings';
const ALL_AXES = [...AXES.partA, ...AXES.partB, ...AXES.partC];

let isitTaxonomy = [];

function escHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// ─── Excel import data ────────────────────────────────────────────────────────
// Label → numeric score mapping (matches SCORE_WEIGHTS keys)
const EXCEL_LABEL_MAP = {
  low: 1, medium: 2, high: 3, 'very high': 4,
  'very high': 4, 'n/a': null,
};
function excelLabelToScore(lbl) {
  if (!lbl) return null;
  const key = lbl.toString().trim().toLowerCase();
  return Object.prototype.hasOwnProperty.call(EXCEL_LABEL_MAP, key) ? EXCEL_LABEL_MAP[key] : null;
}

// Axis name → app ID maps for each part
const EXCEL_AXIS_MAP_A = {
  '2.1 airport authority safety management system (sms) & safetygovernance': 'aa-sms-governance',
  '2.1 airport authority safety management system (sms) & safety\ngovernance': 'aa-sms-governance',
  '2.1 airport authority safety management system (sms) & safety governance': 'aa-sms-governance',
  '2.2.1 environment': 'environment',
  '2.2.2 tenant management': 'tenant-mgmt',
  '2.2.3 emergency response': 'emergency-response',
  '2.3 terminal construction & temporary conditions': 'terminal-construction',
  '3.0 groundside & airport access': 'groundside-access',
  '4.1 check-in layout, capacity & passenger flow': 'checkin-layout',
  '4.2 baggage induction at check-in': 'baggage-induction',
  '5.1 baggage system — sortation & screening infrastructure': 'baggage-sortation',
  '5.2 bag room operations environment': 'bag-room',
  '5.3 arrivals, transfer & baggage reclaim': 'arrivals-reclaim',
  '6.1 boarding lounge & gate area': 'boarding-lounge',
  '6.2 gate & boarding bridge operations': 'gate-operations',
  '6.3 passenger transport / remote stand operations': 'remote-stand',
  '7.1 stand layout, markings & clearances': 'stand-layout',
  '7.2 parking guidance — arrival & departure': 'parking-guidance',
  '7.3 stand services & gse staging': 'gse-staging',
  '7.4 vehicle service roads & apron traffic': 'vehicle-service-roads',
  '8.1 potable water servicing infrastructure': 'potable-water',
  '8.2 fueling infrastructure': 'fueling',
  '8.3 lavatory & waste servicing infrastructure': 'lavatory-waste',
  '8.4 de-icing infrastructure & operation setup': 'deicing',
};
const EXCEL_AXIS_MAP_B = {
  '2.1 safety governance': 'sp-sms-governance',
  '3.0 organizational strucutre & staffing': 'staffing-structure',
  '3.0 organizational structure & staffing': 'staffing-structure',
  '4.1 service provider training': 'training-competency',
  '5.1 procedural framework & alignment': 'procedures-alignment',
  '5.2 potable water servicing': 'potable-water-sp',
  '5.3  load control & loading': 'load-control',
  '5.3 load control & loading': 'load-control',
  '5.4 emergency response procedures': 'emergency-response-sp',
  '6.1 gse program': 'gse-management',
};
const EXCEL_AXIS_MAP_C = {
  '2.0 environment & operating context': 'environment-context',
  '3.1 standards, procedures & training (westjet)': 'wj-standards',
  '3.2 operational support & setup (westjet)': 'wj-operational-support',
  '3.3 safety management, coordination & oversight (westjet)': 'wj-safety-mgmt',
  '4.1 standards, procedures & training (service provider)': 'sp-standards',
  '4.2 safety management, assurance & risk monitoring (service provider)': 'sp-safety-assurance',
  '4.3 roles, accountability & coordination (service provider)': 'sp-roles-coordination',
  '4.4 staffing, equipment & capacity (service provider)': 'sp-staffing-equipment',
  '5.1 supervisory presence & oversight': 'supervisory-presence',
  '5.2 planning & priority management': 'planning-priority',
  '5.3 managing known issues': 'managing-issues',
  '6.1 communication & team coordination': 'communication-coordination',
  '6.2 workload & time pressure': 'workload-pressure',
  '7.2 task performance': 'task-performance',
};

function mapExcelAxes(axesObj, mapTable) {
  const result = {};
  Object.entries(axesObj).forEach(([name, lbl]) => {
    const key = name.trim().toLowerCase();
    const id = mapTable[key];
    if (id) result[id] = excelLabelToScore(lbl);
  });
  return result;
}

// Raw Excel data extracted from Airport Safety Risk Profile.xlsx
const EXCEL_STATION_DATA = {
  AMS: {
    partA: { total: 777, axes: { '2.1 Airport Authority Safety Management System (SMS) & Safety\nGovernance': 'Low', '2.2.1 Environment': 'Medium', '2.2.2 Tenant Management': 'Low', '2.2.3 Emergency Response': 'Low', '2.3 Terminal Construction & Temporary Conditions': 'Low', '3.0 Groundside & Airport Access': 'Low', '4.1 Check-in Layout, Capacity & Passenger Flow': 'Low', '4.2 Baggage Induction at Check-in': 'Low', '5.1 Baggage System — Sortation & Screening Infrastructure': 'Low', '5.2 Bag Room Operations Environment': 'Low', '5.3 Arrivals, Transfer & Baggage Reclaim': 'Medium', '6.1 Boarding Lounge & Gate Area': 'Low', '6.2 Gate & Boarding Bridge Operations': 'Low', '6.3 Passenger Transport / Remote Stand Operations': 'Low', '7.1 Stand Layout, Markings & Clearances': 'Low', '7.2 Parking Guidance — Arrival & Departure': 'Medium', '7.3 Stand Services & GSE Staging': 'Low', '7.4 Vehicle Service Roads & Apron Traffic': 'Low', '8.1 Potable Water Servicing Infrastructure': 'Low', '8.2 Fueling Infrastructure': 'Low', '8.3 Lavatory & Waste Servicing Infrastructure': 'Low', '8.4 De-icing Infrastructure & Operation Setup': 'N/A' }, hazards: ['Lack of High Wind Program', 'Baggage System', 'AGDS failures and SOP'] },
    partB: null,
    partC: { total: 385, axes: { '2.0 Environment & Operating Context': 'medium', '3.1 Standards, Procedures & Training (WestJet)': 'Low', '3.2 Operational Support & Setup (WestJet)': 'Low', '3.3 Safety Management, Coordination & Oversight (WestJet)': 'Low', '4.1 Standards, Procedures & Training (Service Provider)': 'Low', '4.2 Safety Management, Assurance & Risk Monitoring (Service Provider)': 'Low', '4.3 Roles, Accountability & Coordination (Service Provider)': 'Low', '4.4 Staffing, Equipment & Capacity (Service Provider)': 'Low', '5.1 Supervisory Presence & Oversight': 'Low', '5.2 Planning & Priority Management': 'Low', '5.3 Managing Known Issues': 'Low', '6.1 Communication & Team Coordination': 'Low', '6.2 Workload & Time Pressure': 'Low', '7.2 Task Performance': 'Low' }, hazards: ['Baggage System', 'AGDS failures and SOP', 'Lack of High Wind Program', 'Aircraft Taxiing', 'IHR Process'] },
  },
  BOS: {
    partA: { total: 777, axes: { '2.1 Airport Authority Safety Management System (SMS) & Safety\nGovernance': 'low', '2.2.1 Environment': 'low', '2.2.2 Tenant Management': 'Low', '2.2.3 Emergency Response': 'Low', '2.3 Terminal Construction & Temporary Conditions': 'Low', '3.0 Groundside & Airport Access': 'Low', '4.1 Check-in Layout, Capacity & Passenger Flow': 'Low', '4.2 Baggage Induction at Check-in': 'Low', '5.1 Baggage System — Sortation & Screening Infrastructure': 'Low', '5.2 Bag Room Operations Environment': 'Low', '5.3 Arrivals, Transfer & Baggage Reclaim': 'Low', '6.1 Boarding Lounge & Gate Area': 'Low', '6.2 Gate & Boarding Bridge Operations': 'Low', '6.3 Passenger Transport / Remote Stand Operations': 'Low', '7.1 Stand Layout, Markings & Clearances': 'Medium', '7.2 Parking Guidance — Arrival & Departure': 'Low', '7.3 Stand Services & GSE Staging': 'Medium', '7.4 Vehicle Service Roads & Apron Traffic': 'Medium', '8.1 Potable Water Servicing Infrastructure': 'Low', '8.2 Fueling Infrastructure': 'Low', '8.3 Lavatory & Waste Servicing Infrastructure': 'Low', '8.4 De-icing Infrastructure & Operation Setup': 'N/A' }, hazards: ['Gate availability', 'GSE Congestion', 'Busy vehicle corridor'] },
    partB: null,
    partC: { total: 3062, axes: { '2.0 Environment & Operating Context': 'medium', '3.1 Standards, Procedures & Training (WestJet)': 'medium', '3.2 Operational Support & Setup (WestJet)': 'medium', '3.3 Safety Management, Coordination & Oversight (WestJet)': 'medium', '4.1 Standards, Procedures & Training (Service Provider)': 'high', '4.2 Safety Management, Assurance & Risk Monitoring (Service Provider)': 'high', '4.3 Roles, Accountability & Coordination (Service Provider)': 'high', '4.4 Staffing, Equipment & Capacity (Service Provider)': 'low', '5.1 Supervisory Presence & Oversight': 'low', '5.2 Planning & Priority Management': 'medium', '5.3 Managing Known Issues': 'high', '6.1 Communication & Team Coordination': 'low', '6.2 Workload & Time Pressure': 'low', '7.2 Task Performance': 'medium' }, hazards: ['Staff training', 'Failure to Correct known Problems', 'Lack of SP Oversight'] },
  },
  CDG: {
    partA: { total: 529, axes: { '2.1 Airport Authority Safety Management System (SMS) & Safety\nGovernance': 'Low', '2.2.1 Environment': 'Low', '2.2.2 Tenant Management': 'Low', '2.2.3 Emergency Response': 'Low', '2.3 Terminal Construction & Temporary Conditions': 'Low', '3.0 Groundside & Airport Access': 'Low', '4.1 Check-in Layout, Capacity & Passenger Flow': 'Low', '4.2 Baggage Induction at Check-in': 'Low', '5.1 Baggage System — Sortation & Screening Infrastructure': 'Low', '5.2 Bag Room Operations Environment': 'Low', '5.3 Arrivals, Transfer & Baggage Reclaim': 'Low', '6.1 Boarding Lounge & Gate Area': 'Medium', '6.2 Gate & Boarding Bridge Operations': 'Low', '6.3 Passenger Transport / Remote Stand Operations': 'Low', '7.1 Stand Layout, Markings & Clearances': 'Low', '7.2 Parking Guidance — Arrival & Departure': 'Low', '7.3 Stand Services & GSE Staging': 'Low', '7.4 Vehicle Service Roads & Apron Traffic': 'Low', '8.1 Potable Water Servicing Infrastructure': 'Low', '8.2 Fueling Infrastructure': 'Low', '8.3 Lavatory & Waste Servicing Infrastructure': 'Low', '8.4 De-icing Infrastructure & Operation Setup': 'Low' }, hazards: [] },
    partB: { total: 277, axes: { '2.1 Safety Governance': 'Medium', '3.0 Organizational Strucutre & Staffing': 'Low', '4.1 Service Provider Training': 'Low', '5.1 Procedural Framework & Alignment': 'Low', '5.2 Potable Water Servicing': 'low', '5.3  Load Control & Loading': 'low', '5.4 Emergency Response Procedures': 'low', '6.1 GSE Program': 'Low' }, hazards: [] },
    partC: { total: 651, axes: { '2.0 Environment & Operating Context': 'Medium', '3.1 Standards, Procedures & Training (WestJet)': 'medium', '3.2 Operational Support & Setup (WestJet)': 'Low', '3.3 Safety Management, Coordination & Oversight (WestJet)': 'Low', '4.1 Standards, Procedures & Training (Service Provider)': 'Low', '4.2 Safety Management, Assurance & Risk Monitoring (Service Provider)': 'Medium', '4.3 Roles, Accountability & Coordination (Service Provider)': 'Low', '4.4 Staffing, Equipment & Capacity (Service Provider)': 'Low', '5.1 Supervisory Presence & Oversight': 'Low', '5.2 Planning & Priority Management': 'Low', '5.3 Managing Known Issues': 'Low', '6.1 Communication & Team Coordination': 'Low', '6.2 Workload & Time Pressure': 'Low', '7.2 Task Performance': 'Low' }, hazards: ['Passenger Congestion', 'Safety Reporting', 'SMS Integration', 'SOP coordination'] },
  },
  CPH: {
    partA: { total: 529, axes: { '2.1 Airport Authority Safety Management System (SMS) & Safety\nGovernance': 'Low', '2.2.1 Environment': 'Low', '2.2.2 Tenant Management': 'Low', '2.2.3 Emergency Response': 'Low', '2.3 Terminal Construction & Temporary Conditions': 'Low', '3.0 Groundside & Airport Access': 'Low', '4.1 Check-in Layout, Capacity & Passenger Flow': 'Low', '4.2 Baggage Induction at Check-in': 'Low', '5.1 Baggage System — Sortation & Screening Infrastructure': 'Medium', '5.2 Bag Room Operations Environment': 'Low', '5.3 Arrivals, Transfer & Baggage Reclaim': 'Low', '6.1 Boarding Lounge & Gate Area': 'Low', '6.2 Gate & Boarding Bridge Operations': 'Low', '6.3 Passenger Transport / Remote Stand Operations': 'Low', '7.1 Stand Layout, Markings & Clearances': 'Low', '7.2 Parking Guidance — Arrival & Departure': 'Low', '7.3 Stand Services & GSE Staging': 'Low', '7.4 Vehicle Service Roads & Apron Traffic': 'Low', '8.1 Potable Water Servicing Infrastructure': 'Low', '8.2 Fueling Infrastructure': 'Low', '8.3 Lavatory & Waste Servicing Infrastructure': 'Low', '8.4 De-icing Infrastructure & Operation Setup': 'Low' }, hazards: [] },
    partB: null,
    partC: { total: 385, axes: { '2.0 Environment & Operating Context': 'Low', '3.1 Standards, Procedures & Training (WestJet)': 'Medium', '3.2 Operational Support & Setup (WestJet)': 'Low', '3.3 Safety Management, Coordination & Oversight (WestJet)': 'Low', '4.1 Standards, Procedures & Training (Service Provider)': 'Low', '4.2 Safety Management, Assurance & Risk Monitoring (Service Provider)': 'Low', '4.3 Roles, Accountability & Coordination (Service Provider)': 'Low', '4.4 Staffing, Equipment & Capacity (Service Provider)': 'Low', '5.1 Supervisory Presence & Oversight': 'Low', '5.2 Planning & Priority Management': 'Low', '5.3 Managing Known Issues': 'Low', '6.1 Communication & Team Coordination': 'Low', '6.2 Workload & Time Pressure': 'Low', '7.2 Task Performance': 'Low' }, hazards: [] },
  },
  CWL: {
    partA: { total: 396, axes: { '2.1 Airport Authority Safety Management System (SMS) & Safety\nGovernance': 'Low', '2.2.1 Environment': 'Low', '2.2.2 Tenant Management': 'Low', '2.2.3 Emergency Response': 'Low', '2.3 Terminal Construction & Temporary Conditions': 'Low', '3.0 Groundside & Airport Access': 'Low', '4.1 Check-in Layout, Capacity & Passenger Flow': 'Low', '4.2 Baggage Induction at Check-in': 'Low', '5.1 Baggage System — Sortation & Screening Infrastructure': 'Low', '5.2 Bag Room Operations Environment': 'Low', '5.3 Arrivals, Transfer & Baggage Reclaim': 'Low', '6.1 Boarding Lounge & Gate Area': 'Low', '6.2 Gate & Boarding Bridge Operations': 'Low', '6.3 Passenger Transport / Remote Stand Operations': 'Low', '7.1 Stand Layout, Markings & Clearances': 'Low', '7.2 Parking Guidance — Arrival & Departure': 'Low', '7.3 Stand Services & GSE Staging': 'Low', '7.4 Vehicle Service Roads & Apron Traffic': 'Low', '8.1 Potable Water Servicing Infrastructure': 'Low', '8.2 Fueling Infrastructure': 'Low', '8.3 Lavatory & Waste Servicing Infrastructure': 'Low', '8.4 De-icing Infrastructure & Operation Setup': 'Low' }, hazards: [] },
    partB: null, partC: null,
  },
  DUB: {
    partA: { total: 511, axes: { '2.1 Airport Authority Safety Management System (SMS) & Safety\nGovernance': 'Low', '2.2.1 Environment': 'Low', '2.2.2 Tenant Management': 'Low', '2.2.3 Emergency Response': 'Low', '2.3 Terminal Construction & Temporary Conditions': 'Low', '3.0 Groundside & Airport Access': 'Low', '4.1 Check-in Layout, Capacity & Passenger Flow': 'Low', '4.2 Baggage Induction at Check-in': 'Low', '5.1 Baggage System — Sortation & Screening Infrastructure': 'Low', '5.2 Bag Room Operations Environment': 'Low', '5.3 Arrivals, Transfer & Baggage Reclaim': 'Low', '6.1 Boarding Lounge & Gate Area': 'Low', '6.2 Gate & Boarding Bridge Operations': 'N/A', '6.3 Passenger Transport / Remote Stand Operations': 'Medium', '7.1 Stand Layout, Markings & Clearances': 'Low', '7.2 Parking Guidance — Arrival & Departure': 'Low', '7.3 Stand Services & GSE Staging': 'Low', '7.4 Vehicle Service Roads & Apron Traffic': 'Low', '8.1 Potable Water Servicing Infrastructure': 'Low', '8.2 Fueling Infrastructure': 'Low', '8.3 Lavatory & Waste Servicing Infrastructure': 'Low', '8.4 De-icing Infrastructure & Operation Setup': 'Low' }, hazards: [] },
    partB: null, partC: null,
  },
  EDI: {
    partA: { total: 2389, axes: { '2.1 Airport Authority Safety Management System (SMS) & Safety\nGovernance': 'low', '2.2.1 Environment': 'low', '2.2.2 Tenant Management': 'low', '2.2.3 Emergency Response': 'low', '2.3 Terminal Construction & Temporary Conditions': 'low', '3.0 Groundside & Airport Access': 'low', '4.1 Check-in Layout, Capacity & Passenger Flow': 'Very high', '4.2 Baggage Induction at Check-in': 'Medium', '5.1 Baggage System — Sortation & Screening Infrastructure': 'Low', '5.2 Bag Room Operations Environment': 'Low', '5.3 Arrivals, Transfer & Baggage Reclaim': 'Low', '6.1 Boarding Lounge & Gate Area': 'Medium', '6.2 Gate & Boarding Bridge Operations': 'Low', '6.3 Passenger Transport / Remote Stand Operations': 'Low', '7.1 Stand Layout, Markings & Clearances': 'Low', '7.2 Parking Guidance — Arrival & Departure': 'Low', '7.3 Stand Services & GSE Staging': 'Low', '7.4 Vehicle Service Roads & Apron Traffic': 'Low', '8.1 Potable Water Servicing Infrastructure': 'Low', '8.2 Fueling Infrastructure': 'High', '8.3 Lavatory & Waste Servicing Infrastructure': 'Low', '8.4 De-icing Infrastructure & Operation Setup': 'N/A' }, hazards: ['Check-in Congestion', 'Refueling', 'Leadership Availability?'] },
    partB: null, partC: null,
  },
  GLA: {
    partA: { total: 928, axes: { '2.1 Airport Authority Safety Management System (SMS) & Safety\nGovernance': 'Low', '2.2.1 Environment': 'Low', '2.2.2 Tenant Management': 'Low', '2.2.3 Emergency Response': 'Low', '2.3 Terminal Construction & Temporary Conditions': 'Low', '3.0 Groundside & Airport Access': 'Low', '4.1 Check-in Layout, Capacity & Passenger Flow': 'Low', '4.2 Baggage Induction at Check-in': 'Medium', '5.1 Baggage System — Sortation & Screening Infrastructure': 'Medium', '5.2 Bag Room Operations Environment': 'Low', '5.3 Arrivals, Transfer & Baggage Reclaim': 'Low', '6.1 Boarding Lounge & Gate Area': 'Medium', '6.2 Gate & Boarding Bridge Operations': 'Medium', '6.3 Passenger Transport / Remote Stand Operations': 'Low', '7.1 Stand Layout, Markings & Clearances': 'Low', '7.2 Parking Guidance — Arrival & Departure': 'Low', '7.3 Stand Services & GSE Staging': 'Low', '7.4 Vehicle Service Roads & Apron Traffic': 'Low', '8.1 Potable Water Servicing Infrastructure': 'Low', '8.2 Fueling Infrastructure': 'Low', '8.3 Lavatory & Waste Servicing Infrastructure': 'Low', '8.4 De-icing Infrastructure & Operation Setup': 'Low' }, hazards: [] },
    partB: null,
    partC: { total: 385, axes: { '2.0 Environment & Operating Context': 'Low', '3.1 Standards, Procedures & Training (WestJet)': 'Low', '3.2 Operational Support & Setup (WestJet)': 'Low', '3.3 Safety Management, Coordination & Oversight (WestJet)': 'Low', '4.1 Standards, Procedures & Training (Service Provider)': 'Medium', '4.2 Safety Management, Assurance & Risk Monitoring (Service Provider)': 'Low', '4.3 Roles, Accountability & Coordination (Service Provider)': 'Low', '4.4 Staffing, Equipment & Capacity (Service Provider)': 'Low', '5.1 Supervisory Presence & Oversight': 'Low', '5.2 Planning & Priority Management': 'Low', '5.3 Managing Known Issues': 'Low', '6.1 Communication & Team Coordination': 'Low', '6.2 Workload & Time Pressure': 'Low', '7.2 Task Performance': 'Low' }, hazards: ['Leadership Gaps', 'Passenger Congestion', 'SMS Reporting', 'Procedural inconsistencies'] },
  },
  IAH: {
    partA: { total: 795, axes: { '2.1 Airport Authority Safety Management System (SMS) & Safety\nGovernance': 'low', '2.2.1 Environment': 'Low', '2.2.2 Tenant Management': 'Low', '2.2.3 Emergency Response': 'Low', '2.3 Terminal Construction & Temporary Conditions': 'Low', '3.0 Groundside & Airport Access': 'Low', '4.1 Check-in Layout, Capacity & Passenger Flow': 'Medium', '4.2 Baggage Induction at Check-in': 'Medium', '5.1 Baggage System — Sortation & Screening Infrastructure': 'Low', '5.2 Bag Room Operations Environment': 'Low', '5.3 Arrivals, Transfer & Baggage Reclaim': 'Low', '6.1 Boarding Lounge & Gate Area': 'Low', '6.2 Gate & Boarding Bridge Operations': 'Low', '6.3 Passenger Transport / Remote Stand Operations': 'Low', '7.1 Stand Layout, Markings & Clearances': 'Low', '7.2 Parking Guidance — Arrival & Departure': 'Low', '7.3 Stand Services & GSE Staging': 'Medium', '7.4 Vehicle Service Roads & Apron Traffic': 'Low', '8.1 Potable Water Servicing Infrastructure': 'Low', '8.2 Fueling Infrastructure': 'Low', '8.3 Lavatory & Waste Servicing Infrastructure': 'Low', '8.4 De-icing Infrastructure & Operation Setup': 'Low' }, hazards: [] },
    partB: null, partC: null,
  },
  LIS: {
    partA: { total: 644, axes: { '2.1 Airport Authority Safety Management System (SMS) & Safety\nGovernance': 'Low', '2.2.1 Environment': 'Low', '2.2.2 Tenant Management': 'Low', '2.2.3 Emergency Response': 'Low', '2.3 Terminal Construction & Temporary Conditions': 'Low', '3.0 Groundside & Airport Access': 'Low', '4.1 Check-in Layout, Capacity & Passenger Flow': 'Medium', '4.2 Baggage Induction at Check-in': 'Low', '5.1 Baggage System — Sortation & Screening Infrastructure': 'Low', '5.2 Bag Room Operations Environment': 'Low', '5.3 Arrivals, Transfer & Baggage Reclaim': 'Low', '6.1 Boarding Lounge & Gate Area': 'Low', '6.2 Gate & Boarding Bridge Operations': 'Low', '6.3 Passenger Transport / Remote Stand Operations': 'Medium', '7.1 Stand Layout, Markings & Clearances': 'Low', '7.2 Parking Guidance — Arrival & Departure': 'Low', '7.3 Stand Services & GSE Staging': 'Low', '7.4 Vehicle Service Roads & Apron Traffic': 'Low', '8.1 Potable Water Servicing Infrastructure': 'Low', '8.2 Fueling Infrastructure': 'Low', '8.3 Lavatory & Waste Servicing Infrastructure': 'Low', '8.4 De-icing Infrastructure & Operation Setup': 'N/A' }, hazards: [] },
    partB: null, partC: null,
  },
  MAD: {
    partA: { total: 1753, axes: { '2.1 Airport Authority Safety Management System (SMS) & Safety\nGovernance': 'Low', '2.2.1 Environment': 'Low', '2.2.2 Tenant Management': 'Low', '2.2.3 Emergency Response': 'Low', '2.3 Terminal Construction & Temporary Conditions': 'Low', '3.0 Groundside & Airport Access': 'Low', '4.1 Check-in Layout, Capacity & Passenger Flow': 'Low', '4.2 Baggage Induction at Check-in': 'Low', '5.1 Baggage System — Sortation & Screening Infrastructure': 'Low', '5.2 Bag Room Operations Environment': 'Low', '5.3 Arrivals, Transfer & Baggage Reclaim': 'Medium', '6.1 Boarding Lounge & Gate Area': 'Low', '6.2 Gate & Boarding Bridge Operations': 'Very High', '6.3 Passenger Transport / Remote Stand Operations': 'Low', '7.1 Stand Layout, Markings & Clearances': 'Low', '7.2 Parking Guidance — Arrival & Departure': 'Low', '7.3 Stand Services & GSE Staging': 'Low', '7.4 Vehicle Service Roads & Apron Traffic': 'Low', '8.1 Potable Water Servicing Infrastructure': 'Low', '8.2 Fueling Infrastructure': 'Low', '8.3 Lavatory & Waste Servicing Infrastructure': 'Low', '8.4 De-icing Infrastructure & Operation Setup': 'N/A' }, hazards: [] },
    partB: null, partC: null,
  },
  YAM: {
    partA: { total: 662, axes: { '2.1 Airport Authority Safety Management System (SMS) & Safety\nGovernance': 'Low', '2.2.1 Environment': 'Low', '2.2.2 Tenant Management': 'Low', '2.2.3 Emergency Response': 'Low', '2.3 Terminal Construction & Temporary Conditions': 'Low', '3.0 Groundside & Airport Access': 'Low', '4.1 Check-in Layout, Capacity & Passenger Flow': 'Low', '4.2 Baggage Induction at Check-in': 'Low', '5.1 Baggage System — Sortation & Screening Infrastructure': 'Low', '5.2 Bag Room Operations Environment': 'Low', '5.3 Arrivals, Transfer & Baggage Reclaim': 'Low', '6.1 Boarding Lounge & Gate Area': 'Low', '6.2 Gate & Boarding Bridge Operations': 'Low', '6.3 Passenger Transport / Remote Stand Operations': 'Low', '7.1 Stand Layout, Markings & Clearances': 'Medium', '7.2 Parking Guidance — Arrival & Departure': 'Low', '7.3 Stand Services & GSE Staging': 'Low', '7.4 Vehicle Service Roads & Apron Traffic': 'Low', '8.1 Potable Water Servicing Infrastructure': 'Medium', '8.2 Fueling Infrastructure': 'Low', '8.3 Lavatory & Waste Servicing Infrastructure': 'Low', '8.4 De-icing Infrastructure & Operation Setup': 'Low' }, hazards: ['No lead-in lines or apron markings', 'No defined potable water fill point area'] },
    partB: null, partC: null,
  },
  YBL: {
    partA: { total: 3777, axes: { '2.1 Airport Authority Safety Management System (SMS) & Safety\nGovernance': 'Low', '2.2.1 Environment': 'Low', '2.2.2 Tenant Management': 'Low', '2.2.3 Emergency Response': 'Low', '2.3 Terminal Construction & Temporary Conditions': 'Low', '3.0 Groundside & Airport Access': 'Low', '4.1 Check-in Layout, Capacity & Passenger Flow': 'Medium', '4.2 Baggage Induction at Check-in': 'High', '5.1 Baggage System — Sortation & Screening Infrastructure': 'High', '5.2 Bag Room Operations Environment': 'High', '5.3 Arrivals, Transfer & Baggage Reclaim': 'Low', '6.1 Boarding Lounge & Gate Area': 'Medium', '6.2 Gate & Boarding Bridge Operations': 'Low', '6.3 Passenger Transport / Remote Stand Operations': 'Low', '7.1 Stand Layout, Markings & Clearances': 'High', '7.2 Parking Guidance — Arrival & Departure': 'Medium', '7.3 Stand Services & GSE Staging': 'High', '7.4 Vehicle Service Roads & Apron Traffic': 'High', '8.1 Potable Water Servicing Infrastructure': 'N/A', '8.2 Fueling Infrastructure': 'Low', '8.3 Lavatory & Waste Servicing Infrastructure': 'N/A', '8.4 De-icing Infrastructure & Operation Setup': 'Low' }, hazards: [] },
    partB: null, partC: null,
  },
  YQX: {
    partA: { total: 3631, axes: { '2.1 Airport Authority Safety Management System (SMS) & Safety\nGovernance': 'Low', '2.2.1 Environment': 'Low', '2.2.2 Tenant Management': 'Low', '2.2.3 Emergency Response': 'Low', '2.3 Terminal Construction & Temporary Conditions': 'Low', '3.0 Groundside & Airport Access': 'Low', '4.1 Check-in Layout, Capacity & Passenger Flow': 'Low', '4.2 Baggage Induction at Check-in': 'Medium', '5.1 Baggage System — Sortation & Screening Infrastructure': 'Low', '5.2 Bag Room Operations Environment': 'Low', '5.3 Arrivals, Transfer & Baggage Reclaim': 'Low', '6.1 Boarding Lounge & Gate Area': 'Low', '6.2 Gate & Boarding Bridge Operations': 'Low', '6.3 Passenger Transport / Remote Stand Operations': 'Very high', '7.1 Stand Layout, Markings & Clearances': 'Very high', '7.2 Parking Guidance — Arrival & Departure': 'high', '7.3 Stand Services & GSE Staging': 'Low', '7.4 Vehicle Service Roads & Apron Traffic': 'Medium', '8.2 Fueling Infrastructure': 'Low', '8.3 Lavatory & Waste Servicing Infrastructure': 'Low', '8.4 De-icing Infrastructure & Operation Setup': 'Low' }, hazards: [] },
    partB: null, partC: null,
  },
  YYB: {
    partA: { total: 529, axes: { '2.1 Airport Authority Safety Management System (SMS) & Safety\nGovernance': 'Medium', '2.2.1 Environment': 'Low', '2.2.2 Tenant Management': 'Low', '2.2.3 Emergency Response': 'Low', '2.3 Terminal Construction & Temporary Conditions': 'Low', '3.0 Groundside & Airport Access': 'Low', '4.1 Check-in Layout, Capacity & Passenger Flow': 'Low', '4.2 Baggage Induction at Check-in': 'Low', '5.1 Baggage System — Sortation & Screening Infrastructure': 'Low', '5.2 Bag Room Operations Environment': 'Low', '5.3 Arrivals, Transfer & Baggage Reclaim': 'Low', '6.1 Boarding Lounge & Gate Area': 'Low', '6.2 Gate & Boarding Bridge Operations': 'Low', '6.3 Passenger Transport / Remote Stand Operations': 'Low', '7.1 Stand Layout, Markings & Clearances': 'Low', '7.2 Parking Guidance — Arrival & Departure': 'Low', '7.3 Stand Services & GSE Staging': 'Low', '7.4 Vehicle Service Roads & Apron Traffic': 'Low', '8.1 Potable Water Servicing Infrastructure': 'Low', '8.2 Fueling Infrastructure': 'Low', '8.3 Lavatory & Waste Servicing Infrastructure': 'Low', '8.4 De-icing Infrastructure & Operation Setup': 'Low' }, hazards: ['lav waste', 'SMS Governance'] },
    partB: null, partC: null,
  },
};

function importExcelData(overwrite = false) {
  const data = loadData();
  Object.entries(EXCEL_STATION_DATA).forEach(([iata, excel]) => {
    const existing = data.stations[iata];
    const station = existing || emptyStation(iata);
    station.asrm = true;

    const importPart = (partKey, excelPart, axisMap, axesDef) => {
      if (!excelPart) return;
      // Only overwrite if requested OR if no scores exist yet
      const hasExisting = axesDef.some(a => station[partKey].scores?.[a.id] !== null);
      if (hasExisting && !overwrite) return;
      const mapped = mapExcelAxes(excelPart.axes, axisMap);
      axesDef.forEach(a => {
        if (Object.prototype.hasOwnProperty.call(mapped, a.id)) {
          if (partKey === 'partB') {
            // Import to the first Part B entry (or create one)
            let entry = getWorstPartB(station) || getPartBList(station)[0];
            if (!entry) {
              entry = { serviceProvider: '', function: '', date: '', status: 'not-started', scores: axisScores(axesDef), notes: axisNotes(axesDef) };
              station.partB = [entry];
            }
            entry.scores[a.id] = mapped[a.id];
          } else {
            station[partKey].scores[a.id] = mapped[a.id];
          }
        }
      });
      const target = partKey === 'partB'
        ? (getPartBList(station)[0] || station.partB)
        : station[partKey];
      target.status = 'complete';
      if (!target.date) target.date = '2025-01-01';
      if (excelPart.hazards && excelPart.hazards.length) {
        station[partKey].hazards = excelPart.hazards;
      }
    };

    importPart('partA', excel.partA, EXCEL_AXIS_MAP_A, AXES.partA);
    importPart('partB', excel.partB, EXCEL_AXIS_MAP_B, AXES.partB);
    importPart('partC', excel.partC, EXCEL_AXIS_MAP_C, AXES.partC);

    data.stations[iata] = station;
  });
  saveData(data);
}

let aggregationMode = 'weighted';

function loadAggMode() {
  const saved = localStorage.getItem(AGG_MODE_KEY);
  if (saved === 'sum' || saved === 'weighted' || saved === 'risk' || saved === 'rpi' || saved === 'smpri') aggregationMode = saved;
}
function saveAggMode() {
  localStorage.setItem(AGG_MODE_KEY, aggregationMode);
}

const RPI_DEFAULTS = { formula: 'option1', weightA: 0.25, weightB: 0.25, weightC: 0.25, weightR: 0.25 };
function loadRpiSettings() {
  try {
    const saved = localStorage.getItem(RPI_SETTINGS_KEY);
    return saved ? { ...RPI_DEFAULTS, ...JSON.parse(saved) } : { ...RPI_DEFAULTS };
  } catch (_) { return { ...RPI_DEFAULTS }; }
}
function saveRpiSettings(settings) {
  localStorage.setItem(RPI_SETTINGS_KEY, JSON.stringify(settings));
}

let formChart = null;
let compareChart = null;
let trendChart = null;
let detailScoreChart = null;
let detailOpChart = null;
let detailConcernChart = null;
let currentStation = null;
let _partBSelectedIdx = 0;
let showNormalizedRisk = false;

// ─── Storage & data helpers ───────────────────────────────────────────────────

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);

  // Attempt one-time migration from old schemas (v1 / v2)
  const oldKeys = ['stationRiskData_v2', 'stationRiskData'];
  for (const key of oldKeys) {
    const oldRaw = localStorage.getItem(key);
    if (oldRaw) {
      try {
        const migrated = migrateData(JSON.parse(oldRaw));
        saveData(migrated);
        return migrated;
      } catch (e) { /* ignore bad data */ }
    }
  }

  // Seed from SEED_DATA on first run (has assessment scores)
  if (typeof SEED_DATA !== 'undefined') {
    const stations = {};
    Object.entries(SEED_DATA).forEach(([iata, entry]) => {
      const s = emptyStation(iata);
      Object.assign(s, entry);
      // Merge region from RISK_PROFILE (SEED_DATA has empty region)
      if (typeof RISK_PROFILE !== 'undefined' && RISK_PROFILE[iata]?.region) {
        s.region = RISK_PROFILE[iata].region;
      }
      stations[iata] = s;
    });
    const data = { stations };
    saveData(data);
    return data;
  }

  // Seed from RISK_PROFILE on first run (empty stations)
  if (typeof RISK_PROFILE !== 'undefined') {
    const stations = {};
    Object.entries(RISK_PROFILE).forEach(([iata, entry]) => {
      const s = emptyStation(iata);
      s.region = entry.region || '';
      // Copy Part C axes if any are scored
      if (entry.partC?.axes && Object.keys(entry.partC.axes).length > 0) {
        s.partC.status = 'complete';
        s.partC.date = new Date().toISOString().slice(0, 10);
        Object.entries(entry.partC.axes).forEach(([axisId, val]) => {
          const match = AXES.partC.find(a => a.name === axisId || a.id === axisId);
          if (match && val != null) s.partC.scores[match.id] = Number(val);
        });
      }
      stations[iata] = s;
    });
    const data = { stations };
    saveData(data);
    return data;
  }

  return { stations: {} };
}

function migrateData(old) {
  const stations = {};
  Object.entries(old.stations || {}).forEach(([iata, s]) => {
    const n = emptyStation(iata);
    n.name = s.name || '';
    n.airportName = s.airportName || '';
    n.location = s.location || '';
    n.region = s.region || '';
    n.regionalManager = s.regionalManager || '';
    n.advisor = s.advisor || '';
    n.serviceProvider = s.serviceProvider || '';
    AXES.partA.forEach(a => {
      if (s.partA?.scores?.[a.id] != null) n.partA.scores[a.id] = s.partA.scores[a.id];
      if (s.partA?.notes?.[a.id]) n.partA.notes[a.id] = s.partA.notes[a.id];
    });
    n.partA.status = s.partA?.status || 'not-started';
    n.partA.date = s.partA?.date || '';
    // Part B: handle both old single-object and new array format
    if (Array.isArray(s.partB)) {
      n.partB = s.partB.map(b => ({
        serviceProvider: b.serviceProvider || '',
        function: b.function || '',
        status: b.status || 'not-started',
        date: b.date || '',
        scores: axisScores(AXES.partB),
        notes: axisNotes(AXES.partB),
      }));
      n.partB.forEach((entry, i) => {
        AXES.partB.forEach(a => {
          if (s.partB[i]?.scores?.[a.id] != null) entry.scores[a.id] = s.partB[i].scores[a.id];
          if (s.partB[i]?.notes?.[a.id]) entry.notes[a.id] = s.partB[i].notes[a.id];
        });
      });
    } else if (s.partB) {
      // Old single-object format: copy scores/notes, use station-level SP if available
      n.partB[0].serviceProvider = s.serviceProvider || '';
      n.partB[0].status = s.partB.status || 'not-started';
      n.partB[0].date = s.partB.date || '';
      AXES.partB.forEach(a => {
        if (s.partB?.scores?.[a.id] != null) n.partB[0].scores[a.id] = s.partB.scores[a.id];
        if (s.partB?.notes?.[a.id]) n.partB[0].notes[a.id] = s.partB.notes[a.id];
      });
    }
    n.partC.status = s.partC?.status || 'not-started';
    n.partC.date = s.partC?.date || '';
    AXES.partC.forEach(a => {
      if (s.partC?.scores?.[a.id] != null) n.partC.scores[a.id] = s.partC.scores[a.id];
      if (s.partC?.notes?.[a.id]) n.partC.notes[a.id] = s.partC.notes[a.id];
    });
    // Copy history & operational data
    n.history = s.history || [];
    if (s.operationalData) {
      n.operationalData.flightNumbers = s.operationalData.flightNumbers || '';
      n.operationalData.exposure = s.operationalData.exposure || '';
      n.operationalData.qci = s.operationalData.qci || '';
      n.operationalData.auditFindings = s.operationalData.auditFindings || '';
      n.operationalData.incidentTrends = s.operationalData.incidentTrends || [];
    }
    stations[iata] = n;
  });
  return { stations };
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getStation(iata) {
  return loadData().stations[iata.toUpperCase()] || null;
}

function saveStation(station) {
  const data = loadData();
  const key = station.iataCode.toUpperCase();
  data.stations[key] = station;
  saveData(data);
  return key;
}

function deleteStation(iata) {
  const data = loadData();
  delete data.stations[iata.toUpperCase()];
  saveData(data);
}

function axisScores(axes) {
  const s = {};
  axes.forEach(a => (s[a.id] = null));
  return s;
}

function axisNotes(axes) {
  const n = {};
  axes.forEach(a => (n[a.id] = ''));
  return n;
}

function emptyStation(iata) {
  return {
    name: '',
    iataCode: iata.toUpperCase(),
    airportName: '',
    location: '',
    region: '',
    regionalManager: '',
    advisor: '',
    serviceProvider: '',
    partA: { status: 'not-started', date: '', scores: axisScores(AXES.partA), notes: axisNotes(AXES.partA) },
    partB: [{
      serviceProvider: '',
      function: '',
      status: 'not-started',
      date: '',
      scores: axisScores(AXES.partB),
      notes: axisNotes(AXES.partB),
    }],
    partC: { status: 'not-started', date: '', scores: axisScores(AXES.partC), notes: axisNotes(AXES.partC) },
    history: [],
    operationalData: {
      flightNumbers: '',
      exposure: '',
      qci: '',
      auditFindings: '',
      incidentTrends: [],
    },
  };
}

// Return Part B entries as an array (handles old single-object format)
function getPartBList(station) {
  if (!station.partB) return [];
  if (Array.isArray(station.partB)) return station.partB;
  return [station.partB];
}

// Return the worst (highest-risk) Part B entry for scoring
function getWorstPartB(station) {
  const list = getPartBList(station);
  return list.reduce((worst, b) => {
    if (b.status !== 'complete') return worst;
    const avg = calcAvg(b.scores, AXES.partB);
    if (avg === null) return worst;
    if (!worst) return b;
    const wAvg = calcAvg(worst.scores, AXES.partB);
    return wAvg === null || avg > wAvg ? b : worst;
  }, null);
}

// Number of completed Part B assessments for a station
function getPartBCount(station) {
  return getPartBList(station).filter(b => b.status === 'complete').length;
}

// Collect all unique service provider names across all stations
function getAllServiceProviders() {
  const data = loadData();
  const sps = new Set();
  Object.values(data.stations).forEach(s => {
    getPartBList(s).forEach(b => {
      if (b.serviceProvider) sps.add(b.serviceProvider.trim());
    });
  });
  return [...sps].sort();
}

// Populate an SP filter dropdown
function populateSpFilter(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  const all = getAllServiceProviders();
  sel.innerHTML = '<option value="">All Service Providers</option>' +
    all.map(sp => `<option value="${sp}">${sp}</option>`).join('');
}

// Check if a station matches a service provider filter
function stationMatchesSp(station, spFilter) {
  if (!spFilter) return true;
  return getPartBList(station).some(b =>
    b.status === 'complete' && b.serviceProvider && b.serviceProvider.trim() === spFilter
  );
}

// Check if a station matches a text filter (name or IATA)
function stationMatchesText(station, iata, text) {
  if (!text) return true;
  const q = text.toLowerCase();
  return (station.name || '').toLowerCase().includes(q) || iata.toLowerCase().includes(q);
}

// Check if a station matches a region filter
function stationMatchesRegion(iata, regionFilter) {
  if (!regionFilter) return true;
  return getStationRegion(iata) === regionFilter;
}

// Get unique sorted list of all regions
function getAllRegions() {
  return [...new Set(Object.values(REGION_MAP))].sort();
}

function getSubRegions() {
  return [...new Set(Object.values(REGION_MAP))].sort();
}

function getComposedRegionForStation(iata) {
  const sub = REGION_MAP[iata] || '';
  if (!sub) return '';
  for (const [composed, subs] of Object.entries(COMPOSED_REGIONS)) {
    if (subs.includes(sub)) return composed;
  }
  return '';
}

function getStationsForComposedRegion(composedName) {
  const subs = COMPOSED_REGIONS[composedName] || [];
  const stations = [];
  Object.entries(REGION_MAP).forEach(([iata, sub]) => {
    if (subs.includes(sub)) stations.push(iata);
  });
  return stations.sort();
}

function getActiveRegions() {
  const composed = Object.keys(COMPOSED_REGIONS).sort();
  if (composed.length > 0) return composed;
  return getAllRegions();
}

function getActiveRegionForStation(iata) {
  if (Object.keys(COMPOSED_REGIONS).length > 0) {
    return getComposedRegionForStation(iata) || REGION_MAP[iata] || '';
  }
  return REGION_MAP[iata] || '';
}

// Populate a region filter dropdown
function populateRegionFilter(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  const regions = getAllRegions();
  sel.innerHTML = '<option value="">All Regions</option>' +
    regions.map(r => `<option value="${r}">${r}</option>`).join('');
}

// Get unique sorted airlines from CRS_MERGED_REPORTS
function getAllAirlines() {
  if (typeof CRS_MERGED_REPORTS === 'undefined') return [];
  return [...new Set(CRS_MERGED_REPORTS.map(r => r.al).filter(Boolean))].sort();
}

// Get unique sorted aircraft types from CRS_MERGED_REPORTS
function getAllAircraftTypes() {
  if (typeof CRS_MERGED_REPORTS === 'undefined') return [];
  return [...new Set(CRS_MERGED_REPORTS.map(r => r.ac).filter(Boolean))].sort();
}

// Populate airline filter dropdown
function populateAirlineFilter(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  const airlines = getAllAirlines();
  sel.innerHTML = '<option value="">All Airlines</option>' +
    airlines.map(a => `<option value="${a}">${a}</option>`).join('');
}

// Populate aircraft type filter dropdown
function populateAircraftFilter(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  const aircraft = getAllAircraftTypes();
  sel.innerHTML = '<option value="">All Aircraft</option>' +
    aircraft.map(a => `<option value="${a}">${a}</option>`).join('');
}

// Check if a CRS record matches airline filter
function crsMatchesAirline(record, airlineFilter) {
  if (!airlineFilter) return true;
  return record.al === airlineFilter;
}

// Check if a CRS record matches aircraft type filter
function crsMatchesAircraft(record, aircraftFilter) {
  if (!aircraftFilter) return true;
  return record.ac === aircraftFilter;
}

// Check if a station has any CRS records matching airline/aircraft filters
function stationMatchesCrsFilters(iata, airlineFilter, aircraftFilter) {
  if (!airlineFilter && !aircraftFilter) return true;
  if (typeof CRS_MERGED_REPORTS === 'undefined') return true;
  const matchingIcaos = new Set([iata, 'C' + iata, 'K' + iata]);
  Object.entries(ICAO_TO_IATA_GLOBAL).forEach(([icao, iata2]) => { if (iata2 === iata) matchingIcaos.add(icao); });
  return CRS_MERGED_REPORTS.some(r =>
    matchingIcaos.has(r.c) &&
    crsMatchesAirline(r, airlineFilter) &&
    crsMatchesAircraft(r, aircraftFilter)
  );
}

// ─── Part B multi-entry form helpers ─────────────────────────────────────────

function loadPartBEntryToForm(idx) {
  const list = getPartBList(currentStation);
  if (!list[idx]) {
    list[idx] = { serviceProvider: '', function: '', status: 'not-started', date: '', scores: axisScores(AXES.partB), notes: axisNotes(AXES.partB) };
  }
  const entry = list[idx];
  document.getElementById('partb-sp-name').value = entry.serviceProvider || '';
  document.getElementById('partb-sp-function').value = entry.function || '';
  document.getElementById('partB-date').value = entry.date || '';
  document.getElementById('partB-status').value = entry.status || 'not-started';

  // Load axes scores for this entry
  AXES.partB.forEach(a => {
    const sel = document.getElementById(`score-${a.id}`);
    if (sel) sel.value = entry.scores[a.id] ?? '';
    const note = document.getElementById(`note-${a.id}`);
    if (note) note.value = entry.notes[a.id] || '';
  });

  document.getElementById('partb-remove-entry').style.display = list.length > 1 ? 'inline-block' : 'none';
}

function savePartBEntryFromForm() {
  if (!currentStation) return;
  const list = getPartBList(currentStation);
  if (!list[_partBSelectedIdx]) {
    list[_partBSelectedIdx] = { serviceProvider: '', function: '', status: 'not-started', date: '', scores: axisScores(AXES.partB), notes: axisNotes(AXES.partB) };
  }
  const entry = list[_partBSelectedIdx];
  entry.serviceProvider = document.getElementById('partb-sp-name').value.trim();
  entry.function = document.getElementById('partb-sp-function').value;
  entry.date = document.getElementById('partB-date').value;
  entry.status = document.getElementById('partB-status').value;
  AXES.partB.forEach(a => {
    const sel = document.getElementById(`score-${a.id}`);
    if (sel) entry.scores[a.id] = sel.value ? parseInt(sel.value, 10) : null;
    const note = document.getElementById(`note-${a.id}`);
    if (note) entry.notes[a.id] = note.value;
  });
  // Ensure currentStation.partB is an array
  if (!Array.isArray(currentStation.partB)) currentStation.partB = list;
}

function renderPartBEntryTabs() {
  const list = getPartBList(currentStation);
  const tabsEl = document.getElementById('partb-entry-tabs');
  tabsEl.innerHTML = list.map((entry, i) => {
    const sp = entry.serviceProvider || `SP ${i + 1}`;
    const fn = entry.function ? ` (${entry.function})` : '';
    const active = i === _partBSelectedIdx ? ' active' : '';
    const done = entry.status === 'complete' ? ' tab-done' : '';
    return `<span class="partb-entry-tab${active}${done}" data-idx="${i}">${sp}${fn}</span>`;
  }).join('');
  document.getElementById('partb-remove-entry').style.display = list.length > 1 ? 'inline-block' : 'none';
}

function addPartBEntry() {
  savePartBEntryFromForm();
  const list = getPartBList(currentStation);
  list.push({ serviceProvider: '', function: '', status: 'not-started', date: '', scores: axisScores(AXES.partB), notes: axisNotes(AXES.partB) });
  _partBSelectedIdx = list.length - 1;
  renderPartBEntryTabs();
  loadPartBEntryToForm(_partBSelectedIdx);
}

function removePartBEntry() {
  const list = getPartBList(currentStation);
  if (list.length <= 1) return;
  if (!confirm(`Remove this Part B entry?`)) return;
  list.splice(_partBSelectedIdx, 1);
  _partBSelectedIdx = Math.min(_partBSelectedIdx, list.length - 1);
  if (!Array.isArray(currentStation.partB)) currentStation.partB = list;
  renderPartBEntryTabs();
  loadPartBEntryToForm(_partBSelectedIdx);
  updateRiskAlerts();
  renderFormChart(currentStation);
  renderScoreBreakdown(currentStation);
}

function selectPartBEntry(idx) {
  savePartBEntryFromForm();
  _partBSelectedIdx = idx;
  renderPartBEntryTabs();
  loadPartBEntryToForm(idx);
  highlightAxisScores();
}

// ─── Scoring engine ───────────────────────────────────────────────────────────
//
//  Formula:  Final = A_avg × B_multiplier × C_multiplier   (clamped 1–4)
//
//  B_multiplier : B_avg=1 → ×0.70 (great SP dampens risk)
//                 B_avg=2.5 → ×1.00 (neutral)
//                 B_avg=4 → ×1.30 (poor SP amplifies risk)
//
//  C_multiplier : C_weight=18 → ×0.60 (excellent integration)
//                 C_weight≈630 → ×1.00 (neutral, midpoint of 18–1260 risk units)
//                 C_weight=1260 → ×1.40 (poor integration amplifies — stronger than B)
//
//  Changing the SP → update Part B → final score updates automatically.
//  C must be re-reviewed whenever B is updated (staleness flag fires).

const SCORE_WEIGHTS = { 1: 18, 2: 151, 3: 521, 4: 1260 };
const SCORE_MAX = 1260;
const SCORE_MIN = 18;

function calcAvg(scores, axes) {
  const vals = axes.map(a => scores[a.id]).filter(v => v !== null && v !== undefined && v !== '');
  if (!vals.length) return null;
  return vals.reduce((s, v) => s + Number(v), 0) / vals.length;
}

function calcWeightedCAvg(scores, axes) {
  const vals = axes.map(a => scores[a.id]).filter(v => v !== null && v !== undefined && v !== '');
  if (!vals.length) return null;
  return vals.reduce((s, v) => s + SCORE_WEIGHTS[v], 0) / vals.length;
}

function bMultFromAvg(bAvg) {
  if (bAvg === null) return 1.0;
  return 0.7 + ((bAvg - 1) / 3) * 0.6;  // [0.70 – 1.30]
}

function cMultFromAvg(cWeight) {
  if (cWeight === null) return 1.0;
  return 0.6 + ((cWeight - 18) / (1260 - 18)) * 0.8;  // [0.60 – 1.40]
}

// Sum risk-units for a single part's scores
function sumPartRiskUnits(scores, axes) {
  const vals = [];
  axes.forEach(a => {
    const v = scores[a.id];
    if (v != null && v !== '') vals.push(SCORE_WEIGHTS[Number(v)] ?? 0);
  });
  return { sum: vals.reduce((s, v) => s + v, 0), count: vals.length, max: vals.length * SCORE_MAX, min: vals.length * SCORE_MIN };
}

// Tier from raw risk-unit sum using fixed thresholds (max/4 per band):
//   Low    ≤ count × 333
//   Medium ≤ count × 648
//   High   ≤ count × 963
//   VeryHigh > count × 963
function tierFromPartSum(sum, count) {
  if (!count || sum === null || sum === undefined) return null;
  if (sum <= count * 333) return { tier: 'Low', cls: 'tier-low', color: '#65A30D' };
  if (sum <= count * 648) return { tier: 'Medium', cls: 'tier-medium', color: '#D97706' };
  if (sum <= count * 963) return { tier: 'High', cls: 'tier-high', color: '#DC2626' };
  return { tier: 'Very High', cls: 'tier-very-high', color: '#9F1239' };
}

function computeSumScore(station) {
  const aS = sumPartRiskUnits(station.partA.scores, AXES.partA);
  const worstB = getWorstPartB(station);
  const bS = worstB
    ? sumPartRiskUnits(worstB.scores, AXES.partB)
    : { sum: 0, count: 0, max: 0, min: 0 };
  const cS = station.partC.status === 'complete'
    ? sumPartRiskUnits(station.partC.scores, AXES.partC)
    : { sum: 0, count: 0, max: 0, min: 0 };

  const totalSum = aS.sum + bS.sum + cS.sum;
  const totalCount = aS.count + bS.count + cS.count;
  if (!totalCount) return null;

  const mOp = computeOperationalMultiplier(station);
  const adjustedSum = Math.round(totalSum * mOp.mult);
  const tier = tierFromPartSum(adjustedSum, totalCount);

  // Map adjustedSum to a 1-4 sortScore using the fixed tier thresholds
  const lowMax = totalCount * 333;
  const medMax = totalCount * 648;
  const highMax = totalCount * 963;
  let sortScore;
  if (adjustedSum <= lowMax) {
    sortScore = 1 + 0.75 * (adjustedSum - totalCount * SCORE_MIN) / (lowMax - totalCount * SCORE_MIN || 1);
  } else if (adjustedSum <= medMax) {
    sortScore = 1.75 + 0.75 * (adjustedSum - lowMax) / (medMax - lowMax || 1);
  } else if (adjustedSum <= highMax) {
    sortScore = 2.5 + 0.75 * (adjustedSum - medMax) / (highMax - medMax || 1);
  } else {
    sortScore = 3.25 + 0.75 * Math.min(adjustedSum - highMax, totalCount * 1260 - highMax) / (totalCount * 1260 - highMax || 1);
  }

  return {
    aSum: aS.count ? aS.sum : null, aMax: aS.max, aMin: aS.min, aCount: aS.count,
    aTier: aS.count ? tierFromPartSum(aS.sum, aS.count) : null,
    bSum: bS.count ? bS.sum : null, bMax: bS.max, bMin: bS.min, bCount: bS.count,
    bTier: bS.count ? tierFromPartSum(bS.sum, bS.count) : null,
    cSum: cS.count ? cS.sum : null, cMax: cS.max, cMin: cS.min, cCount: cS.count,
    cTier: cS.count ? tierFromPartSum(cS.sum, cS.count) : null,
    finalScore: adjustedSum, sumCount: totalCount,
    sumMax: totalCount * SCORE_MAX, sumMin: totalCount * SCORE_MIN,
    tier, sortScore,
    mOp: mOp.mult !== 1 ? mOp.mult : null,
    mOpDetails: mOp.mult !== 1 ? mOp.details : null,
  };
}

const RISK_LEVEL_WEIGHTS = { 'Level 1': 50, 'Level 2': 250, 'Level 3': 1250 };
const OAPT_WEIGHT = 1;
const _riskScoreCache = new Map(); // key: dateRange → Map<iata, score>
const OAPT_SAPT_TYPES = new Set(['OAPT', 'SAPT']);
const RISK_THRESHOLDS = [
  { max: 10, tier: 'Low', cls: 'tier-low', color: '#65A30D' },
  { max: 50, tier: 'Medium', cls: 'tier-medium', color: '#D97706' },
  { max: 150, tier: 'High', cls: 'tier-high', color: '#DC2626' },
  { max: Infinity, tier: 'Very High', cls: 'tier-very-high', color: '#9F1239' },
];

// Global ICAO→IATA lookup (built lazily after STATION_COORDS is defined)
const ICAO_TO_IATA_GLOBAL = {};
const _ICAO_DIRECT_MAP = {
  EGPH: 'EDI', EGFF: 'CWL', EGLL: 'LHR', EGKK: 'LGW', EGPF: 'GLA',
  LFPG: 'CDG', LFPB: 'ORY', LIRF: 'FCO', LIMC: 'MXP', LIME: 'BGY',
  LEMD: 'MAD', LEBL: 'BCN', EHAM: 'AMS', EKCH: 'CPH', EIDW: 'DUB',
  BIKF: 'KEF', LPPD: 'PDL', LPPT: 'LIS', RKSI: 'ICN', RJAA: 'NRT', RJTT: 'HND',
  MMUN: 'CUN', MMSD: 'SJD', MMPR: 'PVR', MDPC: 'PUJ', MRLB: 'LIR',
  MDCY: 'STI', MKJS: 'MBJ', MKJP: 'KIN', TNCM: 'SXM', TNCA: 'AUA',
  TLPL: 'UVF', TBPB: 'BGI', MROC: 'SJO',
  PHNL: 'HNL', PHOG: 'OGG', PHKO: 'KOA', PHLI: 'LIH',
  MMMZ: 'MZT', MMMX: 'MEX', MMTL: 'TIJ', MMMD: 'MLM', MMPS: 'PBC',
  MMZO: 'ZLO', MMGL: 'GDL', MMLT: 'LMM', MMZH: 'ZIH', MMBT: 'TPO',
  MUVR: 'VRA', MUCC: 'ICW', MUHG: 'HOG', MUHA: 'HAV', MUCL: 'CFG', MUCF: 'CMW',
  MDPP: 'POP', MZBZ: 'BZE', MPTO: 'PTY', MPSM: 'SAL',
  MUSC: 'SCU', MMSL: 'SLP', MMCZ: 'CZM',
  MYNN: 'NAS', MYGF: 'FPO',
  MHRO: 'RTB', MNMG: 'MGA', MWCR: 'GCM',
  TGPY: 'BGI', TJSJ: 'SJU', TNCC: 'CUR', TNCB: 'BON', TAPA: 'ANU',
  TXKF: 'BDA', SKSP: 'ADZ',
  CAL4: 'TAB',
};
Object.entries(_ICAO_DIRECT_MAP).forEach(([icao, iata]) => { ICAO_TO_IATA_GLOBAL[icao] = iata; });
let _icaoGlobalBuilt = false;
function ensureIcaoGlobal() {
  if (_icaoGlobalBuilt) return;
  _icaoGlobalBuilt = true;
  Object.keys(STATION_COORDS).forEach(iata => {
    ICAO_TO_IATA_GLOBAL['C' + iata] = iata;
    ICAO_TO_IATA_GLOBAL['K' + iata] = iata;
    ICAO_TO_IATA_GLOBAL['TJ' + iata] = iata;
    ICAO_TO_IATA_GLOBAL[iata] = iata;
  });
}

function computeRiskScore(iata, dateFrom, dateTo) {
  const allScores = _computeAllRiskScores(dateFrom, dateTo);
  return allScores.get(iata) || null;
}

function _computeAllRiskScores(dateFrom, dateTo) {
  const cacheKey = `${dateFrom || ''}_${dateTo || ''}`;
  if (_riskScoreCache.has(cacheKey)) return _riskScoreCache.get(cacheKey);
  if (typeof CRS_MERGED_REPORTS === 'undefined') return new Map();
  ensureIcaoGlobal();
  const rpiSettings = loadRpiSettings();

  // ── Count global unique OAPT+SAPT occurrences ────────────────────────
  const globalSeen = new Set();
  CRS_MERGED_REPORTS.forEach(r => {
    if (!OAPT_SAPT_TYPES.has(r.t)) return;
    if (dateFrom || dateTo) {
      const dt = (r.dt || '').substring(0, 10);
      if (!dt) return;
      if (dateFrom && dt < dateFrom) return;
      if (dateTo && dt > dateTo) return;
    }
    globalSeen.add(r.o);
  });
  const totalGlobal = globalSeen.size;

  // ── Pass 1: raw rate per station (from all stations with flight data) ──
  const stationRawRates = new Map();
  let totalFlights = 0;

  // Iterate every station in FLIGHT_COUNTS (or CRS data)
  const allFlightIatas = new Set();
  if (typeof FLIGHT_COUNTS !== 'undefined' && FLIGHT_COUNTS) {
    Object.keys(FLIGHT_COUNTS).forEach(iata => allFlightIatas.add(iata));
  }
  CRS_MERGED_REPORTS.forEach(r => {
    if (!OAPT_SAPT_TYPES.has(r.t)) return;
    const iata = ICAO_TO_IATA_GLOBAL[r.c] || r.c;
    if (iata && iata.length === 3) allFlightIatas.add(iata);
  });

  allFlightIatas.forEach(iata => {
    const flightCount = getFlightVolumeByDate(iata, dateFrom || '', dateTo || '') || getFlightVolume({ iataCode: iata, name: iata }) || 0;
    if (!flightCount) return;
    totalFlights += flightCount;

    // Find matching ICAOs
    const matchingIcaos = new Set([iata]);
    matchingIcaos.add('C' + iata);
    matchingIcaos.add('K' + iata);
    Object.entries(ICAO_TO_IATA_GLOBAL).forEach(([icao, i]) => { if (i === iata) matchingIcaos.add(icao); });

    const stationRecords = CRS_MERGED_REPORTS.filter(r => {
      if (!matchingIcaos.has(r.c) || !OAPT_SAPT_TYPES.has(r.t)) return false;
      if (r.t === 'SAPT') {
        if ((r.rl || '') === 'Not Set' || (r.rl || '') === '') return false;
      }
      if (dateFrom || dateTo) {
        const dt = (r.dt || '').substring(0, 10);
        if (!dt) return false;
        if (dateFrom && dt < dateFrom) return false;
        if (dateTo && dt > dateTo) return false;
      }
      return true;
    });

    const hasAnyOapt = stationRecords.some(r => r.t === 'OAPT');
    const hasAnySapt = stationRecords.some(r => r.t === 'SAPT');

    const seen = new Set();
    let oaptCount = 0;
    let weightSum = 0;
    let decayedWeightSum = 0;
    const LAMBDA_DECAY = 0.005;
    const now = Date.now();
    stationRecords.forEach(r => {
      if (seen.has(r.o)) return;
      seen.add(r.o);
      if (r.t === 'OAPT') oaptCount++;
      const baseWeight = r.t === 'OAPT' ? OAPT_WEIGHT : (RISK_LEVEL_WEIGHTS[r.rl] || 0);
      weightSum += baseWeight;
      const occDate = r.dt ? new Date(r.dt.substring(0, 10)) : null;
      const deltaDays = occDate ? Math.max(0, (now - occDate.getTime()) / 86400000) : 180;
      const decayWeight = Math.exp(-LAMBDA_DECAY * deltaDays) * baseWeight;
      decayedWeightSum += decayWeight;
    });

    const saptRecords = stationRecords.filter(r => r.t === 'SAPT');
    const saptSeen = new Set();
    let saptWeightSum = 0;
    saptRecords.forEach(r => {
      if (saptSeen.has(r.o)) return;
      saptSeen.add(r.o);
      saptWeightSum += RISK_LEVEL_WEIGHTS[r.rl] || 0;
    });
    const saptRiskPerHazard = saptSeen.size > 0 ? (saptWeightSum / saptSeen.size) : 0;

    const avgWeightPerOcc = seen.size > 0 ? weightSum / seen.size : 0;
    const rawRate = flightCount > 0 ? (avgWeightPerOcc / flightCount) * 1000 : 0;
    const decayedRawRate = flightCount > 0 ? (decayedWeightSum / seen.size / flightCount) * 1000 : 0;
    const riskPerHazard = seen.size > 0 ? avgWeightPerOcc * 1000 : 0;
    const riskPerFlight = flightCount > 0 ? (weightSum / flightCount) * 1000 : 0;

    stationRawRates.set(iata, {
      weightSum, decayedWeightSum, occCount: seen.size, oaptCount, saptCount: saptSeen.size, flightCount, rawRate, decayedRawRate, hasAnyOapt, hasAnySapt, riskPerHazard, riskPerFlight, saptRiskPerHazard,
    });
  });

  if (!stationRawRates.size) {
    _riskScoreCache.set(cacheKey, new Map());
    return new Map();
  }

  // Empirical Bayes K from network variance ratio
  const rawRates = [...stationRawRates.values()].map(d => d.rawRate);
  const netMean = rawRates.reduce((a, b) => a + b, 0) / (rawRates.length || 1);
  const netVar = rawRates.reduce((s, r) => s + (r - netMean) ** 2, 0) / (rawRates.length || 1);
  const BUEHLMANN_K = netVar > 0 ? Math.min(Math.max(Math.round((netMean * netMean) / netVar), 100), 2000) : 2000;

  // ── Network average rate + incident rate ──────────────────────────────
  let networkSum = 0;
  let networkOccCount = 0;
  stationRawRates.forEach(d => {
    networkSum += d.rawRate;
    networkOccCount += d.occCount;
  });
  const networkAvgRate = networkSum / stationRawRates.size;
  const networkIncidentRate = totalFlights > 0 ? networkOccCount / totalFlights : 0;

  // ── Compute network std dev of blended scores (used for P-score) ──────
  const allRawRates = [...stationRawRates.values()].map(d => d.rawRate);
  const networkStdDev = (() => {
    const avg = networkAvgRate;
    const variance = allRawRates.reduce((s, r) => s + (r - avg) ** 2, 0) / allRawRates.length;
    return Math.sqrt(variance);
  })();

  // Log-transformed network stats
  const logRates = allRawRates.map(r => Math.log(r + 1));
  const logNetworkMean = logRates.reduce((a, b) => a + b, 0) / logRates.length;
  const logNetworkStdDev = Math.sqrt(logRates.reduce((a, b) => a + (b - logNetworkMean) ** 2, 0) / logRates.length);

  // ── Pass 2: apply Bühlmann + reporting quality flag ───────────────────
  const EXPECTED_INCIDENT_THRESHOLD = 3; // min expected incidents to flag underreporting

  const results = new Map();
  stationRawRates.forEach((data, iata) => {
    const Z = data.flightCount / (data.flightCount + BUEHLMANN_K);
    const blendedScore = Z * data.rawRate + (1 - Z) * networkAvgRate;
    const decayedBlendedScore = Z * data.decayedRawRate + (1 - Z) * networkAvgRate;

    // Log transformation: ln(rate + 1)
    const logRate = Math.log(data.rawRate + 1);
    const logBlended = Math.log(blendedScore + 1);
    const logRiskPerHazard = Math.log(data.riskPerHazard + 1);
    const logRiskPerFlight = Math.log(data.riskPerFlight + 1);

    // P-score: how many std devs from network mean
    const pScore = networkStdDev > 0 ? (data.rawRate - networkAvgRate) / networkStdDev : 0;
    const logPScore = logNetworkStdDev > 0 ? (logRate - logNetworkMean) / logNetworkStdDev : 0;

    // Freeman-Tukey Poisson variance-stabilizing transform
    const expectedCount = networkIncidentRate * data.flightCount;
    const k = data.occCount;
    const ftPScore = data.flightCount > 0
      ? (Math.sqrt(k) + Math.sqrt(k + 1) - Math.sqrt(4 * expectedCount + 1))
      : 0;

    let tier = RISK_THRESHOLDS[RISK_THRESHOLDS.length - 1];
    for (const t of RISK_THRESHOLDS) {
      if (blendedScore <= t.max) { tier = t; break; }
    }

    // Reporting quality flag
    const expectedIncidents = networkIncidentRate * data.flightCount;
    let reportingFlag = '';
    if (data.occCount === 0) {
      if (data.hasAnyOapt && !data.hasAnySapt) {
        reportingFlag = 'No SAPT';
      } else if (!data.hasAnyOapt && data.hasAnySapt) {
        reportingFlag = 'No OAPT';
      } else if (!data.hasAnyOapt && !data.hasAnySapt) {
        if (expectedIncidents >= EXPECTED_INCIDENT_THRESHOLD) {
          reportingFlag = 'Low Reporting Confidence';
        } else {
          reportingFlag = 'Insufficient Volume';
        }
      }
    }

    results.set(iata, {
      finalScore: +blendedScore.toFixed(4),
      rawRate: +data.rawRate.toFixed(4),
      credibility: +Z.toFixed(4),
      networkAvgRate: +networkAvgRate.toFixed(4),
      networkIncidentRate: +networkIncidentRate.toFixed(6),
      weightSum: data.weightSum,
      decayedWeightSum: +(data.decayedWeightSum || 0).toFixed(4),
      stationUniqueCount: data.occCount,
      oaptCount: data.oaptCount,
      saptCount: data.saptCount,
      totalGlobal,
      flightCount: data.flightCount,
      denominator: data.flightCount,
      reportingFlag,
      expectedIncidents: +expectedIncidents.toFixed(2),
      tier,
      pScore: +pScore.toFixed(4),
      ftPScore: +ftPScore.toFixed(4),
      logRate: +logRate.toFixed(4),
      logBlended: +logBlended.toFixed(4),
      logRiskPerHazard: +logRiskPerHazard.toFixed(4),
      logRiskPerFlight: +logRiskPerFlight.toFixed(4),
      logPScore: +logPScore.toFixed(4),
      networkStdDev: +networkStdDev.toFixed(4),
      logNetworkMean: +logNetworkMean.toFixed(4),
      logNetworkStdDev: +logNetworkStdDev.toFixed(4),
      riskPerHazard: +data.riskPerHazard.toFixed(4),
      saptRiskPerHazard: +(data.saptRiskPerHazard || 0).toFixed(4),
      riskPerFlight: +data.riskPerFlight.toFixed(4),
      decayedBlendedScore: +decayedBlendedScore.toFixed(4),
      sortScore: +blendedScore.toFixed(4),
      buehlmannK: BUEHLMANN_K,
    });
  });

  _riskScoreCache.set(cacheKey, results);
  return results;
}

function clearRiskScoreCache() {
  _riskScoreCache.clear();
}

function computeRpiScore(station) {
  const rpiSettings = loadRpiSettings();
  const { formula, weightA, weightB, weightC, weightR } = rpiSettings;
  const iata = station.iataCode || station.name;
  const df = document.getElementById('map-issues-date-from')?.value || '';
  const dt = document.getElementById('map-issues-date-to')?.value || '';

  const aAvg = calcAvg(station.partA.scores, AXES.partA);
  const worstB = getWorstPartB(station);
  const bAvg = worstB ? calcAvg(worstB.scores, AXES.partB) : null;
  const cAvg = station.partC.status === 'complete' ? calcAvg(station.partC.scores, AXES.partC) : null;
  const flightCount = getFlightVolumeByDate(iata, df || '', dt || '') || getFlightVolume({ iataCode: iata, name: iata }) || 0;
  const riskData = computeRiskScore(iata, df || undefined, dt || undefined);
  const reportingRisk = riskData ? riskData.rawRate || 0 : 0;

  if (!flightCount) return null;

  // Collect all stations' data for network medians
  const allStations = loadData().stations || {};
  const stationScores = [];
  Object.keys(allStations).forEach(siata => {
    const s = allStations[siata];
    const sa = calcAvg(s.partA.scores, AXES.partA);
    const sw = getWorstPartB(s);
    const sb = sw ? calcAvg(sw.scores, AXES.partB) : null;
    const sc = s.partC.status === 'complete' ? calcAvg(s.partC.scores, AXES.partC) : null;
    const sf = getFlightVolumeByDate(siata, df || '', dt || '') || getFlightVolume({ iataCode: siata, name: siata }) || 0;
    const sr = computeRiskScore(siata, df || undefined, dt || undefined);
    const srr = sr ? sr.rawRate || 0 : 0;
    stationScores.push({ iata: siata, a: sa, b: sb, c: sc, flights: sf, rr: srr });
  });

  function median(vals) {
    const sorted = vals.filter(v => v !== null && v !== undefined).sort((a, b) => a - b);
    if (!sorted.length) return 0;
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  const medA = median(stationScores.map(s => s.a));
  const medB = median(stationScores.map(s => s.b));
  const medC = median(stationScores.map(s => s.c));
  const medFlights = median(stationScores.map(s => s.flights));
  const medRR = median(stationScores.map(s => s.rr));

  let rpi;
  if (formula === 'option1') {
    const termA = medA > 0 && aAvg !== null ? (aAvg / medA) * (flightCount / 1000) : 0;
    const termB = medB > 0 && bAvg !== null ? (bAvg / medB) * (flightCount / 1000) : 0;
    const termC = medC > 0 && cAvg !== null ? (cAvg / medC) * (flightCount / 1000) : 0;
    const termR = medRR > 0 ? ((reportingRisk / flightCount) * 1000) / medRR : 0;
    rpi = weightA * termA + weightB * termB + weightC * termC + weightR * termR;
  } else {
    const termA = medA > 0 && aAvg !== null ? (aAvg * (flightCount / 1000)) / medA : 0;
    const termB = medB > 0 && bAvg !== null ? (bAvg * (flightCount / 1000)) / medB : 0;
    const termC = medC > 0 && cAvg !== null ? (cAvg * (flightCount / 1000)) / medC : 0;
    const termR = medRR > 0 ? reportingRisk / medRR : 0;
    rpi = weightA * termA + weightB * termB + weightC * termC + weightR * termR;
  }

  const tier = RISK_THRESHOLDS.find(t => rpi <= t.max) || RISK_THRESHOLDS[RISK_THRESHOLDS.length - 1];

  return {
    finalScore: +rpi.toFixed(4),
    rawRate: reportingRisk,
    credibility: 0,
    networkAvgRate: 0,
    networkIncidentRate: 0,
    weightSum: 0,
    stationUniqueCount: 0,
    totalGlobal: 0,
    flightCount,
    denominator: flightCount,
    reportingFlag: '',
    expectedIncidents: 0,
    tier,
    pScore: 0,
    logRate: 0,
    logBlended: 0,
    logRiskPerHazard: 0,
    logRiskPerFlight: 0,
    logPScore: 0,
    networkStdDev: 0,
    logNetworkMean: 0,
    logNetworkStdDev: 0,
    riskPerHazard: 0,
    riskPerFlight: 0,
    sortScore: +rpi.toFixed(4),
    rpi: +rpi.toFixed(4),
    rpiFormula: formula,
    rpiWeights: { a: weightA, b: weightB, c: weightC, r: weightR },
    rpiTerms: {
      a: formula === 'option1'
        ? (medA > 0 && aAvg !== null ? (aAvg / medA) * (flightCount / 1000) : 0)
        : (medA > 0 && aAvg !== null ? (aAvg * (flightCount / 1000)) / medA : 0),
      b: formula === 'option1'
        ? (medB > 0 && bAvg !== null ? (bAvg / medB) * (flightCount / 1000) : 0)
        : (medB > 0 && bAvg !== null ? (bAvg * (flightCount / 1000)) / medB : 0),
      c: formula === 'option1'
        ? (medC > 0 && cAvg !== null ? (cAvg / medC) * (flightCount / 1000) : 0)
        : (medC > 0 && cAvg !== null ? (cAvg * (flightCount / 1000)) / medC : 0),
      r: medRR > 0 ? (formula === 'option1'
        ? ((reportingRisk / flightCount) * 1000) / medRR
        : reportingRisk / medRR) : 0,
    },
    aAvg,
    bAvg,
    cAvg,
  };
}

function computeSmpriScore(station) {
  const allStations = loadData().stations || {};
  const df = document.getElementById('map-issues-date-from')?.value || '';
  const dt = document.getElementById('map-issues-date-to')?.value || '';
  const rpiSettings = loadRpiSettings();

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

  const aAvg = calcAvg(station.partA.scores, AXES.partA);
  const worstB = getWorstPartB(station);
  const bAvg = worstB ? calcAvg(worstB.scores, AXES.partB) : null;
  const cAvg = station.partC.status === 'complete' ? calcWeightedCAvg(station.partC.scores, AXES.partC) : null;
  const iata = station.iataCode || station.name;
  const riskData = computeRiskScore(iata, df || undefined, dt || undefined);

  const zA = aAvg !== null ? (aAvg - statsA.mean) / statsA.std : 0;
  const zB = bAvg !== null ? (bAvg - statsB.mean) / statsB.std : 0;
  const zC = cAvg !== null ? (cAvg - statsC.mean) / statsC.std : 0;
  const zR = riskData ? riskData.logPScore : 0;
  const Z_cred = riskData ? riskData.credibility : 0;

  const baseWA = rpiSettings.weightA;
  const baseWB = rpiSettings.weightB;
  const baseWC = rpiSettings.weightC;
  const baseWR = rpiSettings.weightR;

  const wR_cred = 0.40 * Z_cred;
  const wAudit = 1.0 - wR_cred;
  const baseAuditSum = baseWA + baseWB + baseWC;
  const wA = baseAuditSum > 0 ? wAudit * (baseWA / baseAuditSum) : wAudit / 3;
  const wB = baseAuditSum > 0 ? wAudit * (baseWB / baseAuditSum) : wAudit / 3;
  const wC = baseAuditSum > 0 ? wAudit * (baseWC / baseAuditSum) : wAudit / 3;
  const wR = wR_cred;

  const smpri = wA * zA + wB * zB + wC * zC + wR * zR;

  const tier = smpri > 1.5 ? { tier: 'Very High', cls: 'tier-very-high', color: '#9F1239' }
    : smpri > 0.75 ? { tier: 'High', cls: 'tier-high', color: '#DC2626' }
    : smpri > -0.25 ? { tier: 'Medium', cls: 'tier-medium', color: '#D97706' }
    : { tier: 'Low', cls: 'tier-low', color: '#65A30D' };

  const flightCount = getFlightVolumeByDate(iata, df || '', dt || '') || getFlightVolume({ iataCode: iata, name: iata }) || 0;
  const reportingFlag = riskData ? riskData.reportingFlag : '';
  const expectedIncidents = riskData ? riskData.expectedIncidents : 0;

  return {
    finalScore: +smpri.toFixed(3),
    rawRate: riskData ? riskData.rawRate : 0,
    credibility: riskData ? riskData.credibility : 0,
    networkAvgRate: 0,
    networkIncidentRate: 0,
    weightSum: 0,
    stationUniqueCount: 0,
    totalGlobal: 0,
    flightCount,
    denominator: flightCount,
    reportingFlag,
    expectedIncidents,
    tier,
    pScore: 0,
    ftPScore: 0,
    logRate: 0,
    logBlended: 0,
    logRiskPerHazard: 0,
    logRiskPerFlight: 0,
    logPScore: +zR.toFixed(4),
    networkStdDev: 0,
    logNetworkMean: 0,
    logNetworkStdDev: 0,
    riskPerHazard: 0,
    saptRiskPerHazard: 0,
    riskPerFlight: 0,
    sortScore: +smpri.toFixed(3),
    smpri: +smpri.toFixed(3),
    zA: +zA.toFixed(2), zB: +zB.toFixed(2), zC: +zC.toFixed(2), zR: +zR.toFixed(2),
    smpriWeights: { a: +wA.toFixed(4), b: +wB.toFixed(4), c: +wC.toFixed(4), r: +wR.toFixed(4) },
    aAvg,
    bAvg,
    cAvg,
  };
}

function getCompositeScore(station) {
  if (aggregationMode === 'sum') return computeSumScore(station);
  if (aggregationMode === 'risk') {
    const df = document.getElementById('map-issues-date-from')?.value || '';
    const dt = document.getElementById('map-issues-date-to')?.value || '';
    return computeRiskScore(station.iataCode || station.name, df || undefined, dt || undefined);
  }
  if (aggregationMode === 'rpi') return computeRpiScore(station);
  if (aggregationMode === 'smpri') return computeSmpriScore(station);

  const aAvg = calcAvg(station.partA.scores, AXES.partA);
  const worstB = getWorstPartB(station);
  const bComplete = !!worstB;
  const bMult = bComplete ? bMultFromAvg(calcAvg(worstB.scores, AXES.partB)) : 1;
  const cComplete = station.partC.status === 'complete';
  const cMult = cComplete ? cMultFromAvg(calcWeightedCAvg(station.partC.scores, AXES.partC)) : 1;

  let abComposite = null;
  let finalScore = null;
  let sortScore = null;
  let tier = null;

  const mOp = computeOperationalMultiplier(station);

  if (aAvg !== null) {
    abComposite = aAvg * bMult;
    const rawFinal = abComposite * cMult;
    finalScore = Math.min(4, Math.max(1, rawFinal * mOp.mult));
    sortScore = finalScore;
    tier = getScoreTier(finalScore);
  }

  return {
    aAvg: aAvg !== null ? +aAvg.toFixed(2) : null,
    bMult: +bMult.toFixed(3),
    cMult: +cMult.toFixed(3),
    abComposite: abComposite !== null ? +abComposite.toFixed(2) : null,
    finalScore: finalScore !== null ? +finalScore.toFixed(2) : null,
    sortScore: sortScore !== null ? +sortScore.toFixed(2) : null,
    tier, bComplete, cComplete,
    mOp: mOp.mult !== 1 ? mOp.mult : null,
    mOpDetails: mOp.mult !== 1 ? mOp.details : null,
  };
}

function getScoreTier(score) {
  if (score === null || score === undefined) return null;
  for (const t of TIER_THRESHOLDS) {
    if (score <= t.max) return t;
  }
  return TIER_THRESHOLDS[TIER_THRESHOLDS.length - 1];
}

// ─── Operational Multiplier (M_op) ──────────────────────────────────────────
//
//  M_op = 1.0 + QCI_adjustment + Audit_adjustment + Incidents_adjustment
//
//  QCI:          < 50 → +0.20      > 90 → −0.10
//  Audit text:   contains "critical" or "major" → +0.25
//  Incidents:    +0.05 per tagged trend, capped at +0.50 total
//
//  The multiplier is applied to the final A×B×C score:
//    adjustedScore = rawScore × M_op   (clamped 1–4)

function computeOperationalMultiplier(station) {
  const op = station.operationalData;
  if (!op) return { mult: 1.0, details: [] };

  let m = 1.0;
  const details = [];

  if (op.qci) {
    const q = parseFloat(op.qci);
    if (!isNaN(q)) {
      if (q < 50) { m += 0.2; details.push({ label: `QCI ${q} (< 50)`, delta: '+0.20' }); }
      else if (q > 90) { m -= 0.1; details.push({ label: `QCI ${q} (> 90)`, delta: '-0.10' }); }
    }
  }

  if (op.auditFindings) {
    const text = op.auditFindings.toLowerCase();
    if (text.includes('critical')) { m += 0.25; details.push({ label: 'Audit: "critical" found', delta: '+0.25' }); }
    else if (text.includes('major')) { m += 0.25; details.push({ label: 'Audit: "major" found', delta: '+0.25' }); }
  }

  if (op.incidentTrends && op.incidentTrends.length > 0) {
    const totalInc = op.incidentTrends.reduce((sum, t) => sum + (t.count || 1), 0);
    const inc = Math.min(totalInc * 0.05, 0.5);
    if (inc > 0) { m += inc; details.push({ label: `${totalInc} incident occurrence(s)`, delta: `+${inc.toFixed(2)}` }); }
  }

  return { mult: +m.toFixed(3), details };
}

function isStale(station) {
  // C is stale when Part B was assessed more recently than Part C
  const bDates = getPartBList(station).map(b => b.date).filter(Boolean);
  const latestB = bDates.length ? bDates.sort().pop() : null;
  if (!latestB || !station.partC.date) return false;
  return new Date(latestB) > new Date(station.partC.date);
}

function getHighRiskAxes(station) {
  const flags = [];
  AXES.partA.forEach(a => {
    const s = station.partA.scores[a.id];
    if (s >= 3) flags.push({ axis: a, score: s, part: 'A' });
  });
  getPartBList(station).forEach(b => {
    AXES.partB.forEach(a => {
      const s = b.scores[a.id];
      if (s >= 3) flags.push({ axis: a, score: s, part: 'B' });
    });
  });
  return flags;
}

// ─── Radar chart ──────────────────────────────────────────────────────────────

function buildRadarLabels() {
  return ALL_AXES.map(a => a.short);
}

// Returns raw scores for A & B axes, null for C slots (uses worst Part B)
function buildRadarDataAB(station) {
  const worstB = getWorstPartB(station) || getPartBList(station)[0] || { scores: {} };
  return ALL_AXES.map(a => {
    if (AXES.partA.find(pa => pa.id === a.id)) return station.partA.scores[a.id] ?? null;
    if (AXES.partB.find(pb => pb.id === a.id)) return worstB.scores[a.id] ?? null;
    return null;
  });
}

// Returns raw scores for C axes, null for A/B slots
function buildRadarDataC(station) {
  return ALL_AXES.map(a => {
    if (AXES.partC.find(pc => pc.id === a.id))
      return station.partC.status === 'complete' ? (station.partC.scores[a.id] ?? null) : null;
    return null;
  });
}

// All raw scores for all axes (used in compare view)
function buildRadarDataAll(station) {
  return ALL_AXES.map(a => {
    if (AXES.partA.find(pa => pa.id === a.id)) return station.partA.scores[a.id] ?? null;
    if (AXES.partB.find(pb => pb.id === a.id)) {
      const worstB = getWorstPartB(station) || getPartBList(station)[0] || { scores: {} };
      return worstB.scores[a.id] ?? null;
    }
    if (AXES.partC.find(pc => pc.id === a.id))
      return station.partC.status === 'complete' ? (station.partC.scores[a.id] ?? null) : null;
    return null;
  });
}

const RADAR_OPTIONS = (onTitle) => ({
  responsive: true,
  scales: {
    r: {
      min: 0, max: 4,
      ticks: { stepSize: 1, backdropColor: 'transparent', font: { size: 9 } },
      pointLabels: { font: { size: 8, weight: '500' }, padding: 6 },
      grid: { color: 'rgba(0,0,0,0.07)' },
      angleLines: { color: 'rgba(0,0,0,0.07)' },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label(ctx) {
          if (ctx.parsed.r === null) return null;
          const t = getScoreTier(ctx.parsed.r);
          return `${ctx.dataset.label}: ${ctx.parsed.r}${t ? ' — ' + t.tier : ''}`;
        },
        title: onTitle || (items => ALL_AXES[items[0].dataIndex].name),
      },
    },
  },
});

function renderFormChart(station) {
  if (formChart) { formChart.destroy(); formChart = null; }
  const canvas = document.getElementById('form-chart');
  if (!canvas) return;

  const abData = buildRadarDataAB(station);
  const cData = buildRadarDataC(station);
  const hasAB = abData.some(v => v !== null);
  const hasC = cData.some(v => v !== null);

  const datasets = [];
  if (hasAB) datasets.push({
    label: 'Physical (A + B)',
    data: abData,
    borderColor: '#3B82F6',
    backgroundColor: 'rgba(59,130,246,0.12)',
    borderWidth: 2, pointRadius: 4, pointHoverRadius: 6,
  });
  if (hasC) datasets.push({
    label: 'Integration (C)',
    data: cData,
    borderColor: '#A855F7',
    backgroundColor: 'rgba(168,85,247,0.12)',
    borderWidth: 2, pointRadius: 4, pointHoverRadius: 6,
  });

  formChart = new Chart(canvas.getContext('2d'), {
    type: 'radar',
    data: { labels: buildRadarLabels(), datasets },
    options: RADAR_OPTIONS(),
  });
}

// ─── Score breakdown panel ────────────────────────────────────────────────────

function renderScoreBreakdown(station) {
  const container = document.getElementById('score-breakdown');
  if (!container) return;

  if (!station || !station.iataCode) {
    container.innerHTML = '<p class="breakdown-empty">Enter scores to see the breakdown.</p>';
    return;
  }

  const cs = getCompositeScore(station);

  if (aggregationMode === 'sum') {
    if (!cs || cs.finalScore === null) {
      container.innerHTML = '<p class="breakdown-empty">Enter scores to see the breakdown.</p>';
      return;
    }
    const pctBar = (sum, max, min, count) => {
      if (!count) return '';
      const pct = ((sum - min) / (max - min) * 100).toFixed(1);
      const tier = tierFromPartSum(sum, count);
      return `<div class="part-bar-track"><div class="part-bar-fill" style="width:${pct}%;background:${tier?.color || '#94A3B8'}"></div></div>`;
    };
    const partBlock = (label, cls, sum, max, min, count, tier) => {
      if (!count) return `<div class="bw-part-block bw-part-empty"><span class="bw-part-label ${cls}">${label}</span><span class="bw-na">Not yet assessed</span></div>`;
      return `
        <div class="bw-part-block">
          <div class="bw-part-header">
            <span class="bw-part-label ${cls}">${label}</span>
            <span class="tier-badge ${tier?.cls || ''}" style="font-size:0.7rem;padding:2px 8px">${tier?.tier || '—'}</span>
          </div>
          <div class="bw-part-score">${sum} <span class="bw-part-max">/ ${max}</span></div>
          ${pctBar(sum, max, min, count)}
        </div>`;
    };

    const totalPct = ((cs.finalScore - cs.sumMin) / (cs.sumMax - cs.sumMin) * 100).toFixed(1);
    const mOpDetailRows = cs.mOpDetails ? cs.mOpDetails.map(d =>
      `<div class="bw-op-row"><span class="bw-op-label">${escHtml(d.label)}</span><span class="bw-op-value">${d.delta}</span></div>`
    ).join('') : '';
    const sumOpHtml = cs.mOp ? `
      <hr class="bw-op-divider">
      <div class="bw-op-row"><span class="bw-op-label">Operational Multiplier (M<sub>op</sub>)</span><span class="bw-op-value">×${cs.mOp.toFixed(2)}</span></div>
      ${mOpDetailRows}` : '';
    container.innerHTML = `
      <div class="sum-breakdown">
        ${partBlock('Part A — Airport Infra', 'part-a-text', cs.aSum, cs.aMax, cs.aMin, cs.aCount, cs.aTier)}
        ${partBlock('Part B — Service Provider', 'part-b-text', cs.bSum, cs.bMax, cs.bMin, cs.bCount, cs.bTier)}
        ${partBlock('Part C — Operational Safety', 'part-c-text', cs.cSum, cs.cMax, cs.cMin, cs.cCount, cs.cTier)}
        <div class="bw-part-total">
          <div class="bw-part-header">
            <span class="bw-part-label">Combined Total</span>
            <span class="tier-badge ${cs.tier?.cls || ''}">${cs.tier?.tier || '—'}</span>
          </div>
          <div class="bw-part-score">${cs.finalScore} <span class="bw-part-max">/ ${cs.sumMax}</span></div>
          <div class="part-bar-track"><div class="part-bar-fill" style="width:${totalPct}%;background:${cs.tier?.color || '#94A3B8'}"></div></div>
        </div>
        ${sumOpHtml}
      </div>
    `;
    return;
  }

  if (aggregationMode === 'risk') {
    if (!cs || cs.finalScore === null) {
      container.innerHTML = '<p class="breakdown-empty">No OAPT/SAPT occurrences with risk levels for this station.</p>';
      return;
    }
    container.innerHTML = `
      <div class="sum-breakdown">
        <div class="bw-part-block">
          <div class="bw-part-header">
            <span class="bw-part-label">Weighted Sum (OAPT+SAPT)</span>
            <span class="tier-badge ${cs.tier?.cls || ''}" style="font-size:0.7rem;padding:2px 8px">${cs.tier?.tier || '—'}</span>
          </div>
          <div class="bw-part-score">${cs.weightSum.toLocaleString()}</div>
        </div>
        <div class="bw-part-block">
          <div class="bw-part-header">
            <span class="bw-part-label">Unique OAPT+SAPT (this station)</span>
          </div>
          <div class="bw-part-score">${cs.stationUniqueCount}</div>
        </div>
        <div class="bw-part-block">
          <div class="bw-part-header">
            <span class="bw-part-label">Total OAPT+SAPT (all stations)</span>
          </div>
          <div class="bw-part-score">${cs.totalGlobal.toLocaleString()}</div>
        </div>
        ${cs.flightCount ? `<div class="bw-part-block">
          <div class="bw-part-header">
            <span class="bw-part-label">Total Flights</span>
          </div>
          <div class="bw-part-score">${cs.flightCount.toLocaleString()}</div>
        </div>` : ''}
        <div class="bw-part-total">
          <div class="bw-part-header">
            <span class="bw-part-label">Risk Score (OAPT+SAPT)</span>
            <span class="tier-badge ${cs.tier?.cls || ''}">${cs.tier?.tier || '—'}</span>
          </div>
          <div class="bw-part-score">${cs.finalScore.toFixed(2)}</div>
          <div style="font-size:0.75rem;color:#6b7280;margin-top:4px">${cs.weightSum.toLocaleString()} ÷ ${cs.stationUniqueCount} occ ÷ ${cs.flightCount ? cs.flightCount.toLocaleString() + ' flights × 1,000' : cs.totalGlobal.toLocaleString() + ' global'} = ${cs.finalScore.toFixed(2)}</div>
        </div>
        <div class="bw-part-total">
          <div class="bw-part-header">
            <span class="bw-part-label">Risk per Hazards</span>
          </div>
          <div class="bw-part-score">${cs.riskPerHazard.toFixed(2)}</div>
          <div style="font-size:0.75rem;color:#6b7280;margin-top:4px">${cs.weightSum.toLocaleString()} ÷ ${cs.stationUniqueCount} occ × 1,000 = ${cs.riskPerHazard.toFixed(2)}</div>
        </div>
        <div style="font-size:0.75rem;color:#6b7280;margin-top:6px">
          OAPT × 1 | SAPT Lvl 1 × 50 | SAPT Lvl 2 × 250 | SAPT Lvl 3 × 1250
          ${cs.flightCount ? ' | Normalized per 1k flights' : ' | No flight data — using global count'}
        </div>
      </div>
    `;
    return;
  }

  if (cs.aAvg === null) {
    container.innerHTML = '<p class="breakdown-empty">Enter Part A scores to see the breakdown.</p>';
    return;
  }

  const staleHtml = isStale(station)
    ? '<div class="stale-warning">⚠ Service provider updated — Part C review required before final score is current.</div>'
    : '';

  const tierHtml = cs.tier
    ? `<div class="tier-badge ${cs.tier.cls} tier-badge-lg">${cs.finalScore.toFixed(2)} — ${cs.tier.tier}</div>`
    : `<div class="tier-badge tier-unscored tier-badge-lg">${cs.abComposite?.toFixed(2) ?? cs.aAvg?.toFixed(2) ?? '—'} — Partial</div>`;

  const bRow = cs.bComplete
    ? `<span class="bw-val">avg ${cs.bAvg}</span><span class="bw-mult">×${cs.bMult.toFixed(2)}</span>`
    : `<span class="bw-na">Not yet assessed — ×1.00</span>`;

  const cRow = cs.cComplete
    ? `<span class="bw-val">avg ${cs.cAvg}</span><span class="bw-mult">×${cs.cMult.toFixed(2)}</span>`
    : `<span class="bw-na">Not yet assessed — ×1.00</span>`;

  const mOpDetailRows = cs.mOpDetails ? cs.mOpDetails.map(d =>
    `<div class="bw-op-row"><span class="bw-op-label">${escHtml(d.label)}</span><span class="bw-op-value">${d.delta}</span></div>`
  ).join('') : '';
  const opHtml = cs.mOp ? `
    <hr class="bw-op-divider">
    <div class="bw-op-row"><span class="bw-op-label">Operational Multiplier (M<sub>op</sub>)</span><span class="bw-op-value">×${cs.mOp.toFixed(2)}</span></div>
    ${mOpDetailRows}` : '';

  container.innerHTML = `
    ${staleHtml}
    ${tierHtml}
    <div class="breakdown-formula">
      <div class="bw-row">
        <span class="bw-label part-a-text">A — Airport base score</span>
        <span class="bw-value">${cs.aAvg}</span>
      </div>
      <div class="bw-op">×</div>
      <div class="bw-row">
        <span class="bw-label part-b-text">B — Service provider multiplier</span>
        <span class="bw-value bw-flex">${bRow}</span>
      </div>
      <div class="bw-op">=</div>
      <div class="bw-row bw-subtotal">
        <span class="bw-label">A × B composite</span>
        <span class="bw-value">${cs.abComposite ?? '—'}</span>
      </div>
      <div class="bw-op">×</div>
      <div class="bw-row">
        <span class="bw-label part-c-text">C — Integration multiplier</span>
        <span class="bw-value bw-flex">${cRow}</span>
      </div>
      <div class="bw-op">=</div>
      <div class="bw-row bw-total">
        <span class="bw-label">Final risk score</span>
        <span class="bw-value">${cs.finalScore?.toFixed(2) ?? cs.abComposite?.toFixed(2) ?? '—'}</span>
      </div>
      ${opHtml}
    </div>
  `;
}

// ─── Trend chart ──────────────────────────────────────────────────────────────

function renderTrendChart(station) {
  if (trendChart) { trendChart.destroy(); trendChart = null; }

  const history = (station?.history || []).filter(h => h.finalScore !== null && h.finalScore !== undefined);
  const container = document.getElementById('trend-chart-container');
  const placeholder = document.getElementById('trend-placeholder');

  if (history.length < 2) {
    if (container) container.style.display = 'none';
    if (placeholder) placeholder.style.display = 'flex';
    return;
  }

  if (container) container.style.display = 'block';
  if (placeholder) placeholder.style.display = 'none';

  const canvas = document.getElementById('trend-chart');
  if (!canvas) return;

  const labels = history.map(h => new Date(h.date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }));
  const scores = history.map(h => h.finalScore);
  const sums = history.map(h => h.sumScore);

  trendChart = new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Final Score',
        data: scores,
        sumScores: sums,
        borderColor: '#3B82F6',
        backgroundColor: ctx => {
          const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
          g.addColorStop(0, 'rgba(59,130,246,0.25)');
          g.addColorStop(1, 'rgba(59,130,246,0)');
          return g;
        },
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.35,
        pointBackgroundColor: scores.map(s => {
          const t = getScoreTier(s);
          return t ? t.color : '#3B82F6';
        }),
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          min: 1, max: 4,
          ticks: {
            stepSize: 1,
            callback: v => ['', 'Low', 'Med', 'High', 'V.High'][v] || v,
            font: { size: 9 },
          },
          grid: { color: 'rgba(0,0,0,0.06)' },
        },
        x: {
          ticks: { font: { size: 9 } },
          grid: { display: false },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label(ctx) {
              const v = ctx.parsed.y;
              const t = getScoreTier(v);
              const raw = ctx.dataset.sumScores?.[ctx.dataIndex];
              const sumInfo = raw != null ? ` (sum: ${raw})` : '';
              return `Score: ${v.toFixed(2)}${sumInfo} — ${t ? t.tier : ''}`;
            },
          },
        },
      },
    },
  });
}

// ─── Form rendering ───────────────────────────────────────────────────────────

function renderForm() {
  const selector = document.getElementById('station-selector');
  selector.innerHTML = '<option value="new">+ New Station</option>';
  const data = loadData();
  Object.keys(data.stations).sort().forEach(iata => {
    const s = data.stations[iata];
    selector.innerHTML += `<option value="${iata}">${s.name || iata} (${iata})</option>`;
  });
  if (currentStation?.iataCode) selector.value = currentStation.iataCode;
}

function buildTagHtml(entry) {
  const label = entry.level4 || entry.level3 || entry.type || entry.id;
  const title = [entry.parent, entry.type, entry.level3, entry.level4].filter(Boolean).join(' › ');
  const count = entry.count || 1;
  return `<span class="tag-label" title="${escHtml(title)}">${escHtml(label)}</span>
    <span class="tag-count">
      <button class="tag-count-btn" data-id="${entry.id}" data-delta="-1" title="Decrease count">−</button>
      <span class="tag-count-num" data-id="${entry.id}">${count}</span>
      <button class="tag-count-btn" data-id="${entry.id}" data-delta="1" title="Increase count">+</button>
    </span>
    <button class="tag-remove" data-id="${entry.id}" title="Remove">&times;</button>`;
}

function loadOperationalDataIntoForm(station) {
  const op = station.operationalData || {};
  document.getElementById('op-flight-numbers').value = op.flightNumbers || '';
  document.getElementById('op-exposure').value = op.exposure || '';
  document.getElementById('op-qci').value = op.qci || '';
  document.getElementById('op-audit-findings').value = op.auditFindings || '';

  // Tags
  const tagsContainer = document.getElementById('op-incident-tags');
  if (tagsContainer) {
    tagsContainer.innerHTML = '';
    (op.incidentTrends || []).forEach(entry => {
      const tag = document.createElement('span');
      tag.className = 'tag-item';
      tag.innerHTML = buildTagHtml(entry);
      tagsContainer.appendChild(tag);
    });
  }

}

function loadStationIntoForm(iata) {
  if (iata === 'new') {
    currentStation = emptyStation('');
    document.getElementById('station-name').value = '';
    document.getElementById('station-iata').value = '';
    document.getElementById('station-airport-name').value = '';
    document.getElementById('station-location').value = '';
    document.getElementById('station-region').value = '';
    document.getElementById('station-rm').value = '';
    document.getElementById('station-advisor').value = '';
    document.getElementById('delete-station').style.display = 'none';
  } else {
    currentStation = getStation(iata);
    if (!currentStation) return;
    if (!currentStation.history) currentStation.history = [];
    if (!currentStation.operationalData) currentStation.operationalData = emptyStation('').operationalData;
    document.getElementById('station-name').value = currentStation.name || '';
    document.getElementById('station-iata').value = currentStation.iataCode;
    document.getElementById('station-airport-name').value = currentStation.airportName || '';
    document.getElementById('station-location').value = currentStation.location || '';
    document.getElementById('station-region').value = currentStation.region || '';
    document.getElementById('station-rm').value = currentStation.regionalManager || '';
    let advisor = currentStation.advisor || '';
    if (!advisor && typeof OAPT_REPORTS !== 'undefined' && OAPT_REPORTS.reports && OAPT_REPORTS.reports[iata]) {
      const reps = OAPT_REPORTS.reports[iata];
      const counts = {};
      reps.forEach(r => { counts[r.i] = (counts[r.i] || 0) + 1; });
      const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
      if (top) advisor = top[0];
    }
    document.getElementById('station-advisor').value = advisor;
    document.getElementById('delete-station').style.display = 'inline-block';
  }

  // Load Part A & C (single-object parts)
  ['partA', 'partC'].forEach(part => {
    document.getElementById(`${part}-date`).value = currentStation[part].date || '';
    document.getElementById(`${part}-status`).value = currentStation[part].status || 'not-started';
  });

  // Load Part B (array of entries)
  _partBSelectedIdx = 0;
  renderPartBEntryTabs();
  loadPartBEntryToForm(0);

  // Load axes scores for Part A and Part C
  const axesMap = { partA: AXES.partA, partC: AXES.partC };
  Object.entries(axesMap).forEach(([part, axes]) => {
    axes.forEach(a => {
      const sel = document.getElementById(`score-${a.id}`);
      if (sel) sel.value = currentStation[part].scores[a.id] ?? '';
      const note = document.getElementById(`note-${a.id}`);
      if (note) note.value = currentStation[part].notes[a.id] || '';
    });
  });

  loadOperationalDataIntoForm(currentStation);
  updateRiskAlerts();
  renderFormChart(currentStation);
  renderScoreBreakdown(currentStation);
  renderTrendChart(currentStation);
  renderIncidentTrendChart(currentStation);
  renderStationIcaoContext(currentStation);
  highlightAxisScores();
}

function buildAxisInputs(containerId, axes, part) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  axes.forEach(a => {
    const div = document.createElement('div');
    div.className = 'axis-input';
    div.id = `axis-row-${a.id}`;
    div.innerHTML = `
      <span class="axis-label">${a.name}</span>
      <select class="score-select" id="score-${a.id}" data-axis="${a.id}" data-part="${part}">
        <option value="">—</option>
        <option value="1">1 — Low</option>
        <option value="2">2 — Medium</option>
        <option value="3">3 — High</option>
        <option value="4">4 — Very High</option>
      </select>
      <input type="text" class="note-input" id="note-${a.id}" placeholder="Notes…" data-axis="${a.id}" data-part="${part}">
    `;
    container.appendChild(div);
  });
}

function saveOperationalDataFromForm(station) {
  if (!station.operationalData) {
    station.operationalData = emptyStation('').operationalData;
  }
  const op = station.operationalData;
  op.flightNumbers = document.getElementById('op-flight-numbers').value;
  op.exposure = document.getElementById('op-exposure').value;
  op.qci = document.getElementById('op-qci').value;
  op.auditFindings = document.getElementById('op-audit-findings').value;
  // incidentTrends is maintained via add/remove, not from a form field directly
}

function saveStationFromForm() {
  const name = document.getElementById('station-name').value.trim();
  const iata = document.getElementById('station-iata').value.trim().toUpperCase();

  if (!iata || iata.length !== 3) {
    alert('Please enter a valid 3-letter IATA code.');
    return;
  }

  // If IATA changed, remove old record
  if (currentStation?.iataCode && currentStation.iataCode !== iata) {
    deleteStation(currentStation.iataCode);
  }

  currentStation.name = name;
  currentStation.iataCode = iata;
  currentStation.airportName = document.getElementById('station-airport-name').value;
  currentStation.location = document.getElementById('station-location').value;
  currentStation.region = document.getElementById('station-region').value;
  currentStation.regionalManager = document.getElementById('station-rm').value;
  currentStation.advisor = document.getElementById('station-advisor').value;
  if (!currentStation.history) currentStation.history = [];

  // Save Part A & C (single-object parts)
  const axesMap = { partA: AXES.partA, partC: AXES.partC };
  Object.entries(axesMap).forEach(([part, axes]) => {
    currentStation[part].date = document.getElementById(`${part}-date`).value;
    currentStation[part].status = document.getElementById(`${part}-status`).value;
    axes.forEach(a => {
      const sel = document.getElementById(`score-${a.id}`);
      if (sel) currentStation[part].scores[a.id] = sel.value ? parseInt(sel.value, 10) : null;
      const note = document.getElementById(`note-${a.id}`);
      if (note) currentStation[part].notes[a.id] = note.value;
    });
  });

  // Save Part B (array of entries)
  savePartBEntryFromForm();

  saveOperationalDataFromForm(currentStation);

  // Auto-snapshot on save
  const cs = getCompositeScore(currentStation);
  const snapshotScore = cs.sortScore ?? cs.finalScore ?? cs.abComposite ?? cs.aAvg;
  if (snapshotScore !== null) {
    const sumScores = (scores, axes) => {
      let s = 0, c = 0;
      axes.forEach(a => { const v = scores[a.id]; if (v != null) { s += v; c++; } });
      return c ? s : null;
    };
    currentStation.history.push({
      date: new Date().toISOString(),
      aAvg: cs.aAvg,
      abComposite: cs.abComposite,
      finalScore: snapshotScore,
      sumScore: aggregationMode === 'sum' ? cs.finalScore : null,
      sumMax: aggregationMode === 'sum' ? cs.sumMax : null,
      tier: cs.tier?.tier || null,
      aSum: sumScores(currentStation.partA.scores, AXES.partA),
      bSum: (() => { const w = getWorstPartB(currentStation); return w ? sumScores(w.scores, AXES.partB) : null; })(),
      cSum: sumScores(currentStation.partC.scores, AXES.partC),
      qci: currentStation.operationalData?.qci || null,
      auditFindings: currentStation.operationalData?.auditFindings || null,
      flightNumbers: currentStation.operationalData?.flightNumbers || null,
    });
    // Keep last 50 snapshots
    if (currentStation.history.length > 50) currentStation.history = currentStation.history.slice(-50);
  }

  saveStation(currentStation);
  ['rankings-filter-sp', 'list-filter-sp', 'dash-filter-sp'].forEach(id => populateSpFilter(id));
  ['rankings-filter-region', 'list-filter-region', 'dash-filter-region'].forEach(id => populateRegionFilter(id));
  renderDashboard();
  renderForm();
  document.getElementById('station-selector').value = iata;
  document.getElementById('delete-station').style.display = 'inline-block';

  updateRiskAlerts();
  renderFormChart(currentStation);
  renderScoreBreakdown(currentStation);
  renderTrendChart(currentStation);
  renderIncidentTrendChart(currentStation);
  renderStationIcaoContext(currentStation);
  highlightAxisScores();
}

function updateRiskAlerts() {
  const container = document.getElementById('risk-alerts');
  if (!currentStation?.iataCode) { container.innerHTML = ''; return; }

  const alerts = [];
  if (isStale(currentStation)) {
    alerts.push('<span class="risk-alert amber">⚠ SP updated — C review required</span>');
  }

  const cs = getCompositeScore(currentStation);
  if (cs.tier && (cs.tier.cls === 'tier-high' || cs.tier.cls === 'tier-very-high')) {
    const cls = cs.tier.cls === 'tier-very-high' ? 'red' : 'amber';
    const scoreDisplay = aggregationMode === 'sum' ? `${cs.finalScore} / ${cs.sumMax}` : aggregationMode === 'risk' ? cs.finalScore.toFixed(2) : cs.finalScore;
    alerts.push(`<span class="risk-alert ${cls}">${cs.tier.tier} risk — Score ${scoreDisplay}</span>`);
  }

  getHighRiskAxes(currentStation).forEach(f => {
    const cls = f.score >= 4 ? 'red' : 'amber';
    alerts.push(`<span class="risk-alert ${cls}">${f.axis.short}: ${f.score}</span>`);
  });

  container.innerHTML = alerts.join('');
}

function highlightAxisScores() {
  ALL_AXES.forEach(a => {
    const row = document.getElementById(`axis-row-${a.id}`);
    if (!row) return;
    const val = parseInt(document.getElementById(`score-${a.id}`)?.value);
    row.classList.remove('has-risk', 'has-critical');
    if (val === 3) row.classList.add('has-risk');
    if (val >= 4) row.classList.add('has-critical');
  });
}

// ─── IATA ISIT Taxonomy loader & autocomplete ──────────────────────────────────

function loadISITTaxonomy() {
  if (isitTaxonomy.length) return;
  if (typeof ISIT_TAXONOMY !== 'undefined' && Array.isArray(ISIT_TAXONOMY)) {
    isitTaxonomy = ISIT_TAXONOMY;
  }
}

function setupOperationalUI() {
  const searchInput = document.getElementById('op-incident-search');
  const resultsEl = document.getElementById('op-incident-results');
  const tagsEl = document.getElementById('op-incident-tags');
  if (!searchInput || !resultsEl || !tagsEl) return;

  let highlightIdx = -1;

  function filterTaxonomy(query) {
    if (!query || query.length < 1) return [];
    const q = query.toLowerCase();
    const results = [];
    for (const item of isitTaxonomy) {
      const searchText = (item.parent + ' ' + item.type + ' ' + item.level3 + ' ' + (item.level4 || '')).toLowerCase();
      if (searchText.includes(q)) {
        results.push(item);
        if (results.length >= 50) break;
      }
    }
    return results;
  }

  function getTagIds() {
    return Array.from(tagsEl.querySelectorAll('.tag-item')).map(t => t.querySelector('.tag-remove')?.dataset.id).filter(Boolean);
  }

  function renderResults(results) {
    const existingIds = getTagIds();
    const filtered = results.filter(r => !existingIds.includes(r.id));
    if (!filtered.length) {
      resultsEl.classList.remove('active');
      resultsEl.innerHTML = '';
      return;
    }
    resultsEl.innerHTML = filtered.map((item, i) => {
      const label = item.level4 || item.level3 || item.type;
      const path = [item.parent, item.type, item.level3].filter(Boolean).join(' › ');
      return `<div class="autocomplete-item${i === 0 ? ' highlighted' : ''}" data-index="${i}" data-id="${item.id}">
        <span>${escHtml(label)}</span>
        <span class="ac-path">${escHtml(path)}</span>
      </div>`;
    }).join('');
    resultsEl.classList.add('active');
    highlightIdx = 0;
  }

  function addTag(entry) {
    const existingIds = getTagIds();
    if (existingIds.includes(entry.id)) {
      // Already present — increment count instead
      updateIncidentTrendCount(entry.id, 1);
      return;
    }
    if (!currentStation.operationalData) currentStation.operationalData = emptyStation('').operationalData;
    if (!currentStation.operationalData.incidentTrends) currentStation.operationalData.incidentTrends = [];
    currentStation.operationalData.incidentTrends.push({ ...entry, count: 1 });

    const tag = document.createElement('span');
    tag.className = 'tag-item';
    tag.innerHTML = buildTagHtml(entry);
    tagsEl.appendChild(tag);
    resultsEl.classList.remove('active');
    searchInput.value = '';
    searchInput.focus();
    triggerOpRecalc();
  }

  searchInput.addEventListener('input', () => {
    const results = filterTaxonomy(searchInput.value);
    renderResults(results);
  });

  searchInput.addEventListener('keydown', e => {
    const items = resultsEl.querySelectorAll('.autocomplete-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightIdx = Math.min(highlightIdx + 1, items.length - 1);
      items.forEach((el, i) => el.classList.toggle('highlighted', i === highlightIdx));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightIdx = Math.max(highlightIdx - 1, 0);
      items.forEach((el, i) => el.classList.toggle('highlighted', i === highlightIdx));
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      const highlighted = resultsEl.querySelector('.highlighted');
      if (highlighted) {
        e.preventDefault();
        const entry = isitTaxonomy.find(t => t.id === highlighted.dataset.id);
        if (entry) addTag(entry);
      }
    } else if (e.key === 'Escape') {
      resultsEl.classList.remove('active');
    }
  });

  searchInput.addEventListener('blur', () => {
    setTimeout(() => resultsEl.classList.remove('active'), 200);
  });

  resultsEl.addEventListener('mousedown', e => {
    const item = e.target.closest('.autocomplete-item');
    if (!item) return;
    const entry = isitTaxonomy.find(t => t.id === item.dataset.id);
    if (entry) addTag(entry);
  });

  function updateIncidentTrendCount(id, delta) {
    if (!currentStation || !currentStation.operationalData || !currentStation.operationalData.incidentTrends) return;
    const trends = currentStation.operationalData.incidentTrends;
    const idx = trends.findIndex(t => t.id === id);
    if (idx === -1) return;
    const newCount = (trends[idx].count || 1) + delta;
    if (newCount < 1) {
      // Remove if count drops below 1
      trends.splice(idx, 1);
      const tag = tagsEl.querySelector(`.tag-remove[data-id="${id}"]`)?.closest('.tag-item');
      if (tag) tag.remove();
    } else {
      trends[idx].count = newCount;
      const numEl = tagsEl.querySelector(`.tag-count-num[data-id="${id}"]`) || tagsEl.querySelector(`.tag-remove[data-id="${id}"]`)?.closest('.tag-item')?.querySelector('.tag-count-num');
      if (numEl) numEl.textContent = newCount;
    }
    triggerOpRecalc();
  }

  // Tag removal & count buttons via delegation
  tagsEl.addEventListener('click', e => {
    const removeBtn = e.target.closest('.tag-remove');
    if (removeBtn) {
      const id = removeBtn.dataset.id;
      removeBtn.closest('.tag-item').remove();
      if (currentStation && currentStation.operationalData && currentStation.operationalData.incidentTrends) {
        currentStation.operationalData.incidentTrends = currentStation.operationalData.incidentTrends.filter(t => t.id !== id);
      }
      triggerOpRecalc();
      return;
    }
    const countBtn = e.target.closest('.tag-count-btn');
    if (countBtn) {
      const id = countBtn.dataset.id;
      const delta = parseInt(countBtn.dataset.delta, 10);
      updateIncidentTrendCount(id, delta);
    }
  });


  // Field input change → recalc
  ['op-flight-numbers', 'op-exposure', 'op-qci', 'op-audit-findings'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', triggerOpRecalc);
  });
}

function triggerOpRecalc() {
  if (!currentStation) return;
  saveOperationalDataFromForm(currentStation);
  updateRiskAlerts();
  renderFormChart(currentStation);
  renderScoreBreakdown(currentStation);
  renderTrendChart(currentStation);
  renderIncidentTrendChart(currentStation);
}

// ─── Incident Trend Chart ────────────────────────────────────────────────────

function renderIncidentTrendChart(station) {
  const wrapper = document.getElementById('incident-trend-chart-wrapper');
  const canvas = document.getElementById('incident-trend-chart');
  if (!wrapper || !canvas) return;

  const trends = station?.operationalData?.incidentTrends || [];
  if (trends.length === 0) {
    wrapper.style.display = 'none';
    return;
  }

  // Destroy existing chart instance
  if (window._incidentTrendChart) {
    window._incidentTrendChart.destroy();
    window._incidentTrendChart = null;
  }

  wrapper.style.display = 'block';

  const labels = trends.map(t => t.level4 || t.level3 || t.type || t.id);
  const counts = trends.map(t => t.count || 1);

  const ctx = canvas.getContext('2d');
  window._incidentTrendChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Frequency',
        data: counts,
        backgroundColor: 'rgba(59,130,246,0.55)',
        borderColor: 'rgba(59,130,246,0.9)',
        borderWidth: 1,
        borderRadius: 3,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.parsed.x} occurrence${ctx.parsed.x !== 1 ? 's' : ''}`,
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: { stepSize: 1, precision: 0 },
          grid: { color: 'rgba(0,0,0,0.06)' },
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 11 } },
        },
      },
    },
  });
}

// ─── Normalized risk helpers ──────────────────────────────────────────────────

function getFlightVolume(station) {
  // Try FLIGHT_COUNTS data first (from Excel upload)
  if (typeof FLIGHT_COUNTS !== 'undefined' && FLIGHT_COUNTS) {
    const iata = station.iataCode || station.name;
    if (FLIGHT_COUNTS[iata]) return FLIGHT_COUNTS[iata].total;
    // Try matching by name
    if (station.name && FLIGHT_COUNTS[station.name]) return FLIGHT_COUNTS[station.name].total;
  }
  // Fallback to manually entered flightNumbers
  const v = station?.operationalData?.flightNumbers;
  if (!v) return null;
  const n = parseFloat(v);
  return (!isNaN(n) && n > 0) ? n : null;
}

function getFlightVolumeByDate(iata, dateFrom, dateTo) {
  if (typeof FLIGHT_COUNTS === 'undefined' || !FLIGHT_COUNTS || !FLIGHT_COUNTS[iata]) return null;
  const daily = FLIGHT_COUNTS[iata].daily;
  if (!daily) return FLIGHT_COUNTS[iata].total;
  let sum = 0;
  for (const [dt, fc] of Object.entries(daily)) {
    if (dateFrom && dt < dateFrom) continue;
    if (dateTo && dt > dateTo) continue;
    sum += fc;
  }
  return sum;
}

function getRawCorporateRisk(finalScore, flightVol) {
  if (finalScore === null || flightVol === null) return null;
  return finalScore * flightVol;
}

function getRiskPer10kFlights(finalScore, flightVol) {
  if (finalScore === null || flightVol === null) return null;
  return (finalScore / flightVol) * 1000;
}

function formatRiskValue(val) {
  if (val === null || val === undefined) return null;
  if (val >= 10000) return Math.round(val).toLocaleString();
  if (val >= 100) return val.toFixed(1);
  return val.toFixed(3);
}

// ─── Station list ─────────────────────────────────────────────────────────────

function renderStationList() {
  const data = loadData();
  const tbody = document.getElementById('stations-tbody');
  let keys = Object.keys(data.stations).sort();
  const isSum = aggregationMode === 'sum';

  // Read filters
  const stationFilter = (document.getElementById('list-filter-station')?.value || '').trim();
  const spFilter = (document.getElementById('list-filter-sp')?.value || '').trim();
  const regionFilter = (document.getElementById('list-filter-region')?.value || '').trim();
  const airlineFilter = (document.getElementById('list-filter-airline')?.value || '').trim();
  const aircraftFilter = (document.getElementById('list-filter-aircraft')?.value || '').trim();

  // Apply filters before rendering
  if (stationFilter || spFilter || regionFilter || airlineFilter || aircraftFilter) {
    keys = keys.filter(iata => {
      const s = data.stations[iata];
      return stationMatchesText(s, iata, stationFilter) &&
        stationMatchesSp(s, spFilter) &&
        stationMatchesRegion(iata, regionFilter) &&
        stationMatchesCrsFilters(iata, airlineFilter, aircraftFilter);
    });
  }

  if (keys.length === 0) {
    const riskHeadersEmpty = showNormalizedRisk
      ? `<th>Vol</th><th>Risk/10k</th>` : '';
    document.querySelector('#stations-table thead tr').innerHTML = `
      <th>Station</th><th>IATA</th>${riskHeadersEmpty}${isSum ? '<th>Score</th>' : '<th>A Score</th><th>B Mult</th><th>A×B</th><th>C Mult</th>'}<th>Final Score</th><th>Tier</th><th>Status</th><th>Flags</th>`;
    const defaultCols = isSum ? 6 : 8;
    const riskCols = showNormalizedRisk ? 2 : 0;
    const riskExtraCols = aggregationMode === 'risk' ? 1 : 0;
    tbody.innerHTML = `<tr><td colspan="${defaultCols + riskCols + riskExtraCols}" class="empty-state">No stations matching filters.</td></tr>`;
    return;
  }

  const riskHeaders = showNormalizedRisk
    ? `<th>Vol</th><th data-sort="riskRate">Risk/10k</th>`
    : '';

  document.querySelector('#stations-table thead tr').innerHTML = (isSum
    ? `<th data-sort="name">Station</th>
       <th data-sort="iata">IATA</th>${riskHeaders}
       <th>Part A</th>
       <th>Part B</th>
       <th>Part C</th>
       <th data-sort="finalScore">Total Score</th>
       <th data-sort="tier">Tier</th>
       <th>Flags</th>`
    : aggregationMode === 'risk'
      ? `<th data-sort="name">Station</th>
       <th data-sort="iata">IATA</th>${riskHeaders}
       <th data-sort="finalScore">Risk Score (OAPT+SAPT)</th>
       <th data-sort="riskPerHazard">Risk/Hazard</th>
       <th data-sort="riskPerFlight">Risk/Flight</th>
       <th data-sort="logRiskPerHazard">Log H</th>
       <th data-sort="logRiskPerFlight">Log F</th>
       <th data-sort="pScore">P</th>
       <th data-sort="credibility">Cred. Z</th>
       <th>Reporting</th>
       <th data-sort="tier">Tier</th>
       <th>Flags</th>`
    : aggregationMode === 'smpri'
      ? `<th data-sort="name">Station</th>
       <th data-sort="iata">IATA</th>${riskHeaders}
       <th data-sort="aScore">z<sub>A</sub></th>
       <th data-sort="bMult">z<sub>B</sub></th>
       <th data-sort="abComposite">z<sub>C</sub></th>
       <th data-sort="cMult">z<sub>R</sub></th>
       <th data-sort="finalScore">SMPRI Score</th>
       <th data-sort="tier">Tier</th>
       <th>Status</th>
       <th>Flags</th>`
       : `<th data-sort="name">Station</th>
        <th data-sort="iata">IATA</th>${riskHeaders}
        <th data-sort="aScore">A (weighted)</th>
        <th data-sort="bMult">B (weighted)</th>
        <th data-sort="abComposite">A+B</th>
        <th data-sort="cMult">C (weighted)</th>
        <th data-sort="finalScore">${aggregationMode === 'rpi' ? 'RPI Score' : 'Final Score'}</th>
       <th data-sort="tier">Tier</th>
       <th>Status</th>
       <th>Flags</th>`);

  tbody.innerHTML = keys.map(iata => {
    const s = data.stations[iata];
    const cs = getCompositeScore(s);
    const staleHtml = isStale(s) ? '<span class="stale-dot" title="C review required after SP update">⚠</span>' : '';

    const statusBadge = part => s[part].status === 'complete'
      ? '<span class="status-badge status-complete">Done</span>'
      : '<span class="status-badge status-not-started">Pending</span>';

    const tierHtml = cs.tier
      ? `<span class="tier-badge ${cs.tier.cls}">${cs.tier.tier}</span>`
      : '<span class="tier-badge tier-unscored">—</span>';

    let scoreHtml;
    if (isSum) {
      const sum = cs?.finalScore;
      scoreHtml = sum !== null
        ? `<span class="score-pill${cs.sortScore > 3.25 ? ' score-pill-very-high' : cs.sortScore > 2.5 ? ' score-pill-high' : ''}">${sum} / ${cs.sumMax}</span>`
        : '<span class="score-na">—</span>';
    } else if (aggregationMode === 'risk') {
      const scoreVal = cs?.finalScore;
      scoreHtml = scoreVal !== null
        ? `<span class="score-pill${cs.sortScore > 0.8 ? ' score-pill-very-high' : cs.sortScore > 0.5 ? ' score-pill-high' : ''}">${scoreVal.toFixed(2)}</span>`
        : '<span class="score-na">—</span>';
    } else {
      const scoreVal = cs?.finalScore;
      scoreHtml = scoreVal !== null && scoreVal !== undefined
        ? `<span class="score-pill${scoreVal > 3.25 ? ' score-pill-very-high' : scoreVal > 2.5 ? ' score-pill-high' : ''}">${typeof scoreVal === 'number' ? scoreVal.toFixed(2) : scoreVal}</span>`
        : '<span class="score-na">—</span>';
    }

    const multHtml = (complete, val) => complete
      ? `<span class="mult-badge">×${val.toFixed(2)}</span>`
      : '<span class="score-na">—</span>';

    const highAxes = getHighRiskAxes(s);
    const flagHtml = highAxes.map(f =>
      `<span class="flag-dot ${f.score >= 4 ? 'flag-red' : 'flag-amber'}" title="${f.axis.name} (${f.axis.short}): ${f.score}"></span>`
    ).join('');

    let alertHtml = '';
    if (cs) {
      const smpriVal = cs.smpri ?? cs.finalScore ?? 0;
      const logP = cs.logPScore ?? 0;
      const cred = cs.credibility ?? 0;
      if (smpriVal >= 1.5 || (logP >= 2.0 && cred >= 0.5)) {
        alertHtml += '<span class="flag-dot flag-red" title="Immediate Action Alert: SMPRI≥1.5 or (logPScore≥2.0 & Z≥0.5)" style="font-size:0.7rem">🚨</span>';
      }
      const expectedInc = cs.expectedIncidents ?? 0;
      const occCount = cs.stationUniqueCount ?? 0;
      if (occCount === 0 && expectedInc >= 3.0) {
        alertHtml += '<span class="flag-dot flag-amber" title="Reporting Quality Audit Required: 0 incidents but ≥3 expected" style="font-size:0.7rem">⚠️</span>';
      }
    }

    if (isSum) {
      const sum = cs?.finalScore;
      const barWidth = cs?.sortScore != null ? ((cs.sortScore / 4) * 100).toFixed(1) : 0;
      const barColor = cs.tier?.color || '#94A3B8';

      const partCell = (lbl, cls, sumPart, tier) => sumPart !== null
        ? `<td class="sum-part-td"><span class="sum-part-label ${cls}">${lbl}</span><span class="score-chip">${sumPart}</span><br><span class="tier-badge ${tier?.cls || ''}" style="font-size:0.68rem;padding:1px 6px">${tier?.tier || '—'}</span></td>`
        : `<td class="sum-part-td"><span class="sum-part-label ${cls}">${lbl}</span><span class="score-na">—</span></td>`;

      const scoreVal = sum !== null ? sum : null;
      const flightVol = getFlightVolume(s);
      const riskRate = showNormalizedRisk && flightVol !== null && scoreVal !== null
        ? getRiskPer10kFlights(scoreVal, flightVol) : null;
      const volCell = showNormalizedRisk
        ? `<td class="vol-cell">${flightVol !== null ? flightVol.toLocaleString() : '—'}</td>` : '';
      const riskCell = showNormalizedRisk
        ? `<td class="risk-cell">${riskRate !== null ? formatRiskValue(riskRate) : '—'}</td>` : '';
      return `<tr data-iata="${iata}" class="${cs.tier ? 'row-' + cs.tier.cls : ''}">
        <td><strong>${s.name || iata}</strong></td>
        <td>${iata}</td>${volCell}${riskCell}
        ${partCell('A', 'part-a-text', cs?.aSum ?? null, cs?.aTier)}
        ${partCell('B', 'part-b-text', cs?.bSum ?? null, cs?.bTier)}
        ${partCell('C', 'part-c-text', cs?.cSum ?? null, cs?.cTier)}
        <td class="final-td" style="min-width: 140px;">
          <div class="final-score-cell">
            <span class="final-score-num">${sum !== null ? sum + ' / ' + cs.sumMax : '—'}</span>
            <div class="score-bar" style="background: linear-gradient(to right, #65A30D 0%, #D97706 50%, #9F1239 100%);"><div class="score-bar-fill" style="width:${100 - barWidth}%;background:var(--color-bg);float:right;"></div></div>
          </div>
        </td>
        <td>${tierHtml}${staleHtml}</td>
        <td>${flagHtml}${alertHtml}</td>
      </tr>`;
    }

    if (aggregationMode === 'risk') {
      const credHtml = cs?.credibility != null ? `${cs.credibility.toFixed(2)}` : '—';
      const reportFlagHtml = cs?.reportingFlag
        ? `<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:600;background:${cs.reportingFlag === 'Low Reporting Confidence' ? '#FEF3C7;color:#92400E' : '#E0E7FF;color:#3730A3'}">${cs.reportingFlag}</span>`
        : '—';
      return `<tr data-iata="${iata}" class="${cs.tier ? 'row-' + cs.tier.cls : ''}">
        <td><strong>${s.name || iata}</strong></td>
        <td>${iata}</td>
        <td>${scoreHtml}</td>
        <td style="font-size:0.8rem">${cs?.riskPerHazard != null ? cs.riskPerHazard.toFixed(1) : '—'}</td>
        <td style="font-size:0.8rem">${cs?.riskPerFlight != null && cs.flightCount ? cs.riskPerFlight.toFixed(1) : '—'}</td>
        <td style="font-size:0.8rem;color:#6b7280">${cs?.logRiskPerHazard != null ? cs.logRiskPerHazard.toFixed(2) : '—'}</td>
        <td style="font-size:0.8rem;color:#6b7280">${cs?.logRiskPerFlight != null && cs.flightCount ? cs.logRiskPerFlight.toFixed(2) : '—'}</td>
        <td style="font-size:0.8rem">${cs?.pScore != null ? `<span style="display:inline-block;padding:1px 5px;border-radius:3px;font-weight:600;background:${Math.abs(cs.pScore) >= 3 ? '#FEE2E2;color:#991B1B' : Math.abs(cs.pScore) >= 2 ? '#FEF3C7;color:#92400E' : '#F0FDF4;color:#166534'}">${cs.pScore > 0 ? '+' : ''}${cs.pScore.toFixed(2)}</span>` : '—'}</td>
        <td style="font-size:0.8rem">${credHtml}</td>
        <td>${reportFlagHtml}</td>
        <td>${tierHtml}${staleHtml}</td>
        <td>${flagHtml}${alertHtml}</td>
      </tr>`;
    }

    const scoreVal = cs.finalScore ?? cs.abComposite ?? cs.aAvg;
    const flightVol = getFlightVolume(s);
    const riskRate = showNormalizedRisk && flightVol !== null && scoreVal !== null
      ? getRiskPer10kFlights(scoreVal, flightVol) : null;
    const volCell = showNormalizedRisk
      ? `<td class="vol-cell">${flightVol !== null ? flightVol.toLocaleString() : '—'}</td>` : '';
    const riskCell = showNormalizedRisk
      ? `<td class="risk-cell">${riskRate !== null ? formatRiskValue(riskRate) : '—'}</td>` : '';
    return `<tr data-iata="${iata}" class="${cs.tier ? 'row-' + cs.tier.cls : ''}">
      <td><strong>${s.name || iata}</strong></td>
      <td>${iata}</td>${volCell}${riskCell}
      ${aggregationMode === 'rpi' ? `
        <td>${cs.rpiTerms ? `<span class="score-pill">${(cs.rpiWeights.a * cs.rpiTerms.a).toFixed(3)}</span> <span style="font-size:0.65rem;color:var(--color-text-muted)">(${(cs.rpiTerms.a).toFixed(2)}×${cs.rpiWeights.a})</span>` : '<span class="score-na">—</span>'}</td>
        <td>${cs.rpiTerms ? `<span class="score-pill">${(cs.rpiWeights.b * cs.rpiTerms.b).toFixed(3)}</span> <span style="font-size:0.65rem;color:var(--color-text-muted)">(${(cs.rpiTerms.b).toFixed(2)}×${cs.rpiWeights.b})</span>` : '<span class="score-na">—</span>'}</td>
        <td>${cs.rpiTerms ? `<span class="score-pill">${((cs.rpiWeights.a * cs.rpiTerms.a) + (cs.rpiWeights.b * cs.rpiTerms.b)).toFixed(3)}</span>` : '<span class="score-na">—</span>'}</td>
        <td>${cs.rpiTerms ? `<span class="score-pill">${(cs.rpiWeights.c * cs.rpiTerms.c).toFixed(3)}</span> <span style="font-size:0.65rem;color:var(--color-text-muted)">(${(cs.rpiTerms.c).toFixed(2)}×${cs.rpiWeights.c})</span>` : '<span class="score-na">—</span>'}</td>
      ` : aggregationMode === 'smpri' ? `
        <td style="font-size:0.8rem">${cs?.zA != null ? `<span style="display:inline-block;padding:1px 5px;border-radius:3px;font-weight:600;background:${Math.abs(cs.zA) >= 2 ? '#FEE2E2;color:#991B1B' : Math.abs(cs.zA) >= 1 ? '#FEF3C7;color:#92400E' : '#F0FDF4;color:#166534'}">${cs.zA > 0 ? '+' : ''}${cs.zA.toFixed(2)}</span>` : '—'}</td>
        <td style="font-size:0.8rem">${cs?.zB != null ? `<span style="display:inline-block;padding:1px 5px;border-radius:3px;font-weight:600;background:${Math.abs(cs.zB) >= 2 ? '#FEE2E2;color:#991B1B' : Math.abs(cs.zB) >= 1 ? '#FEF3C7;color:#92400E' : '#F0FDF4;color:#166534'}">${cs.zB > 0 ? '+' : ''}${cs.zB.toFixed(2)}</span>` : '—'}</td>
        <td style="font-size:0.8rem">${cs?.zC != null ? `<span style="display:inline-block;padding:1px 5px;border-radius:3px;font-weight:600;background:${Math.abs(cs.zC) >= 2 ? '#FEE2E2;color:#991B1B' : Math.abs(cs.zC) >= 1 ? '#FEF3C7;color:#92400E' : '#F0FDF4;color:#166534'}">${cs.zC > 0 ? '+' : ''}${cs.zC.toFixed(2)}</span>` : '—'}</td>
        <td style="font-size:0.8rem">${cs?.zR != null ? `<span style="display:inline-block;padding:1px 5px;border-radius:3px;font-weight:600;background:${Math.abs(cs.zR) >= 2 ? '#FEE2E2;color:#991B1B' : Math.abs(cs.zR) >= 1 ? '#FEF3C7;color:#92400E' : '#F0FDF4;color:#166534'}">${cs.zR > 0 ? '+' : ''}${cs.zR.toFixed(2)}</span>` : '—'}</td>
      ` : `
        <td>${cs.aAvg !== null ? `<span class="score-pill">${cs.aAvg}</span>` : '<span class="score-na">—</span>'}</td>
        <td>${multHtml(cs.bComplete, cs.bMult)}</td>
        <td>${cs.abComposite !== null ? `<span class="score-pill">${cs.abComposite}</span>` : '<span class="score-na">—</span>'}</td>
        <td>${multHtml(cs.cComplete, cs.cMult)}</td>
      `}
      <td>${scoreHtml}</td>
      <td>${tierHtml}${staleHtml}</td>
      <td class="status-cell">${statusBadge('partA')} ${statusBadge('partB')} ${statusBadge('partC')}</td>
      <td>${flagHtml}${alertHtml}</td>
    </tr>`;
  }).join('');

  document.querySelectorAll('#stations-table th[data-sort]').forEach(th => {
    th.onclick = () => sortTable(th.dataset.sort);
  });
}

let currentSort = { key: null, asc: true };

function sortTable(key) {
  if (currentSort.key === key) currentSort.asc = !currentSort.asc;
  else currentSort = { key, asc: true };

  const data = loadData();
  const keys = Object.keys(data.stations);

  keys.sort((a, b) => {
    const sa = data.stations[a], sb = data.stations[b];
    const ca = getCompositeScore(sa), cb = getCompositeScore(sb);
    let va, vb;

    if (key === 'name') { va = (sa.name || a).toLowerCase(); vb = (sb.name || b).toLowerCase(); }
    else if (key === 'iata') { va = a; vb = b; }
    else if (key === 'aScore') { va = ca.aAvg ?? -1; vb = cb.aAvg ?? -1; }
    else if (key === 'bMult') { va = ca.bMult; vb = cb.bMult; }
    else if (key === 'abComposite') { va = ca.abComposite ?? -1; vb = cb.abComposite ?? -1; }
    else if (key === 'cMult') { va = ca.cMult; vb = cb.cMult; }
    else if (key === 'finalScore' || key === 'tier') {
      va = ca.sortScore ?? ca.finalScore ?? ca.abComposite ?? ca.aAvg ?? -1;
      vb = cb.sortScore ?? cb.finalScore ?? cb.abComposite ?? cb.aAvg ?? -1;
    }
    else if (key === 'credibility') {
      va = ca.credibility ?? -1; vb = cb.credibility ?? -1;
    }

    if (typeof va === 'string') return currentSort.asc ? va.localeCompare(vb) : vb.localeCompare(va);
    return currentSort.asc ? va - vb : vb - va;
  });

  const tbody = document.getElementById('stations-tbody');
  const rowMap = {};
  Array.from(tbody.querySelectorAll('tr[data-iata]')).forEach(r => (rowMap[r.dataset.iata] = r));
  keys.forEach(iata => { if (rowMap[iata]) tbody.appendChild(rowMap[iata]); });
}

// ─── Rankings view ────────────────────────────────────────────────────────────

function renderRankings() {
  const data = loadData();
  const container = document.getElementById('rankings-content');
  const keys = Object.keys(data.stations);
  const isSum = aggregationMode === 'sum';

  if (keys.length === 0) {
    container.innerHTML = '<div class="empty-state" style="padding:3rem">No stations recorded yet. Use the Station Input tab to add one.</div>';
    return;
  }

  // Read filters
  const stationFilter = (document.getElementById('rankings-filter-station')?.value || '').trim();
  const spFilter = (document.getElementById('rankings-filter-sp')?.value || '').trim();
  const regionFilter = (document.getElementById('rankings-filter-region')?.value || '').trim();
  const airlineFilter = (document.getElementById('rankings-filter-airline')?.value || '').trim();
  const aircraftFilter = (document.getElementById('rankings-filter-aircraft')?.value || '').trim();

  // Score every station and sort by finalScore descending
  let ranked = keys.map(iata => ({
    iata,
    s: data.stations[iata],
    cs: getCompositeScore(data.stations[iata]),
    stale: isStale(data.stations[iata]),
  })).sort((a, b) => {
    const fa = a.cs.sortScore ?? a.cs.finalScore ?? a.cs.abComposite ?? a.cs.aAvg ?? 0;
    const fb = b.cs.sortScore ?? b.cs.finalScore ?? b.cs.abComposite ?? b.cs.aAvg ?? 0;
    return fb - fa;
  });

  // Apply filters
  if (stationFilter || spFilter || regionFilter || airlineFilter || aircraftFilter) {
    ranked = ranked.filter(r =>
      stationMatchesText(r.s, r.iata, stationFilter) &&
      stationMatchesSp(r.s, spFilter) &&
      stationMatchesRegion(r.iata, regionFilter) &&
      stationMatchesCrsFilters(r.iata, airlineFilter, aircraftFilter)
    );
  }

  // Summary cards
  const total = ranked.length;
  const scored = ranked.filter(r => isSum ? (r.cs?.finalScore !== null) : (aggregationMode === 'risk' || aggregationMode === 'smpri') ? (r.cs?.finalScore !== null) : (r.cs.aAvg !== null)).length;
  const veryHigh = ranked.filter(r => r.cs.tier?.cls === 'tier-very-high').length;
  const high = ranked.filter(r => r.cs.tier?.cls === 'tier-high').length;
  const staleCount = ranked.filter(r => r.stale).length;
  const topStation = ranked.find(r => isSum ? (r.cs?.finalScore !== null) : (aggregationMode === 'risk' || aggregationMode === 'smpri') ? (r.cs?.finalScore !== null) : (r.cs.aAvg !== null));

  const summaryCards = `
    <div class="summary-cards">
      <div class="summary-card">
        <div class="summary-num">${total}</div>
        <div class="summary-label">Total Stations</div>
      </div>
      <div class="summary-card">
        <div class="summary-num">${scored}</div>
        <div class="summary-label">Assessed</div>
      </div>
      <div class="summary-card summary-card-very-high">
        <div class="summary-num">${veryHigh}</div>
        <div class="summary-label">Very High Risk</div>
      </div>
      <div class="summary-card summary-card-high">
        <div class="summary-num">${high}</div>
        <div class="summary-label">High Risk</div>
      </div>
      <div class="summary-card summary-card-stale">
        <div class="summary-num">${staleCount}</div>
        <div class="summary-label">C Review Needed</div>
      </div>
      ${topStation ? `
      <div class="summary-card summary-card-top">
        <div class="summary-num">${topStation.iata}</div>
        <div class="summary-label">Highest Risk Station</div>
      </div>` : ''}
    </div>
  `;

  const rows = ranked.map((r, i) => {
    const { iata, s, cs, stale } = r;

    const flightVol = getFlightVolume(s);
    const finalVal = cs.finalScore ?? cs.abComposite ?? cs.aAvg;
    const riskRate = showNormalizedRisk && flightVol !== null && finalVal !== null
      ? getRiskPer10kFlights(finalVal, flightVol) : null;
    const volCell = showNormalizedRisk
      ? `<td class="vol-cell">${flightVol !== null ? flightVol.toLocaleString() : '—'}</td>` : '';
    const riskCell = showNormalizedRisk
      ? `<td class="risk-cell">${riskRate !== null ? formatRiskValue(riskRate) : '—'}</td>` : '';

    if (isSum) {
      const tierCls = cs?.tier?.cls || 'tier-unscored';
      const tierLabel = cs?.tier?.tier || 'Unscored';
      const staleTag = stale ? '<span class="stale-tag">C Review Needed</span>' : '';
      const barWidth = cs?.sortScore != null ? ((cs.sortScore / 4) * 100).toFixed(1) : 0;
      const barColor = cs?.tier?.color || '#94A3B8';

      const partCell = (lbl, cls, sum, max, tier) => sum !== null
        ? `<td class="sum-part-td"><span class="sum-part-label ${cls}">${lbl}</span><span class="score-chip">${sum}</span><br><span class="tier-badge ${tier?.cls || ''}" style="font-size:0.68rem;padding:1px 6px">${tier?.tier || '—'}</span></td>`
        : `<td class="sum-part-td"><span class="sum-part-label ${cls}">${lbl}</span><span class="score-na">—</span></td>`;

      return `
      <tr class="ranking-row ${tierCls}" data-iata="${iata}">
        <td class="rank-num">#${i + 1}</td>
        <td><div class="station-name-cell"><strong>${s.name || iata}</strong><span class="iata-tag">${iata}</span></div></td>${volCell}${riskCell}
        ${partCell('A', 'part-a-text', cs?.aSum ?? null, cs?.aMax, cs?.aTier)}
        ${partCell('B', 'part-b-text', cs?.bSum ?? null, cs?.bMax, cs?.bTier)}
        ${partCell('C', 'part-c-text', cs?.cSum ?? null, cs?.cMax, cs?.cTier)}
        <td class="final-td">
          <div class="final-score-cell">
            <span class="final-score-num">${cs?.finalScore ?? '—'}</span>
            <div class="score-bar"><div class="score-bar-fill" style="width:${barWidth}%;background:${barColor}"></div></div>
          </div>
        </td>
        <td><span class="tier-badge ${tierCls}">${tierLabel}</span>${staleTag}</td>
        <td class="parts-td">${['partA', 'partB', 'partC'].map(p => s[p].status === 'complete' ? `<span class="part-dot part-dot-done">✓</span>` : `<span class="part-dot">${p.slice(-1).toUpperCase()}</span>`).join('')}</td>
      </tr>`;
    }

    if (aggregationMode === 'risk') {
      const tierCls = cs?.tier?.cls || 'tier-unscored';
      const tierLabel = cs?.tier?.tier || 'Unscored';
      const staleTag = stale ? '<span class="stale-tag">C Review Needed</span>' : '';
      const barWidth = cs?.sortScore != null ? (Math.min(cs.sortScore / 1.0, 1) * 100).toFixed(1) : 0;
      const barColor = cs?.tier?.color || '#94A3B8';
      return `
      <tr class="ranking-row ${tierCls}" data-iata="${iata}">
        <td class="rank-num">#${i + 1}</td>
        <td><div class="station-name-cell"><strong>${s.name || iata}</strong><span class="iata-tag">${iata}</span></div></td>${volCell}${riskCell}
        <td class="final-td">
          <div class="final-score-cell">
            <span class="final-score-num">${cs?.finalScore?.toFixed(2) ?? '—'}</span>
            <div class="score-bar"><div class="score-bar-fill" style="width:${barWidth}%;background:${barColor}"></div></div>
          </div>
        </td>
        <td><span class="tier-badge ${tierCls}">${tierLabel}</span>${staleTag}</td>
        <td class="parts-td">${['partA', 'partB', 'partC'].map(p => s[p].status === 'complete' ? `<span class="part-dot part-dot-done">✓</span>` : `<span class="part-dot">${p.slice(-1).toUpperCase()}</span>`).join('')}</td>
      </tr>`;
    }

    if (aggregationMode === 'smpri') {
      const tierCls = cs?.tier?.cls || 'tier-unscored';
      const tierLabel = cs?.tier?.tier || 'Unscored';
      const staleTag = stale ? '<span class="stale-tag">C Review Needed</span>' : '';
      const barWidth = cs?.sortScore != null ? (Math.min(cs.sortScore / 1.0, 1) * 100).toFixed(1) : 0;
      const barColor = cs?.tier?.color || '#94A3B8';
      const zCell = (val) => val != null
        ? `<span style="display:inline-block;padding:1px 5px;border-radius:3px;font-weight:600;background:${Math.abs(val) >= 2 ? '#FEE2E2;color:#991B1B' : Math.abs(val) >= 1 ? '#FEF3C7;color:#92400E' : '#F0FDF4;color:#166534'}">${val > 0 ? '+' : ''}${val.toFixed(2)}</span>`
        : '<span class="score-na">—</span>';
      return `
      <tr class="ranking-row ${tierCls}" data-iata="${iata}">
        <td class="rank-num">#${i + 1}</td>
        <td><div class="station-name-cell"><strong>${s.name || iata}</strong><span class="iata-tag">${iata}</span></div></td>${volCell}${riskCell}
        <td class="score-td">${zCell(cs?.zA)}</td>
        <td class="score-td">${zCell(cs?.zB)}</td>
        <td class="score-td">${zCell(cs?.zC)}</td>
        <td class="score-td">${zCell(cs?.zR)}</td>
        <td class="final-td">
          <div class="final-score-cell">
            <span class="final-score-num">${cs?.finalScore?.toFixed(2) ?? '—'}</span>
            <div class="score-bar"><div class="score-bar-fill" style="width:${barWidth}%;background:${barColor}"></div></div>
          </div>
        </td>
        <td><span class="tier-badge ${tierCls}">${tierLabel}</span>${staleTag}</td>
        <td class="parts-td">${['partA', 'partB', 'partC'].map(p => s[p].status === 'complete' ? `<span class="part-dot part-dot-done">✓</span>` : `<span class="part-dot">${p.slice(-1).toUpperCase()}</span>`).join('')}</td>
      </tr>`;
    }

    if (aggregationMode === 'rpi') {
      const tierCls = cs.tier?.cls || 'tier-unscored';
      const tierLabel = cs.tier?.tier || 'Unscored';
      const staleTag = stale ? '<span class="stale-tag">C Review Needed</span>' : '';
      const barWidth = cs?.sortScore != null ? (Math.min(cs.sortScore / 4, 1) * 100).toFixed(1) : 0;
      const barColor = cs.tier?.color || '#94A3B8';
      const finalDisplay = cs?.finalScore != null ? cs.finalScore.toFixed(2) : '—';
      return `
      <tr class="ranking-row ${tierCls}" data-iata="${iata}">
        <td class="rank-num">#${i + 1}</td>
        <td><div class="station-name-cell"><strong>${s.name || iata}</strong><span class="iata-tag">${iata}</span></div></td>${volCell}${riskCell}
        <td class="score-td">${cs.rpiTerms ? `<span class="score-chip">${(cs.rpiWeights.a * cs.rpiTerms.a).toFixed(3)}</span><br><span style="font-size:0.6rem;color:var(--color-text-muted)">(${(cs.rpiTerms.a).toFixed(2)}×${cs.rpiWeights.a})</span>` : '<span class="score-na">—</span>'}</td>
        <td class="score-td">${cs.rpiTerms ? `<span class="score-chip">${(cs.rpiWeights.b * cs.rpiTerms.b).toFixed(3)}</span><br><span style="font-size:0.6rem;color:var(--color-text-muted)">(${(cs.rpiTerms.b).toFixed(2)}×${cs.rpiWeights.b})</span>` : '<span class="score-na">—</span>'}</td>
        <td class="score-td">${cs.rpiTerms ? `<span class="score-chip">${((cs.rpiWeights.a * cs.rpiTerms.a) + (cs.rpiWeights.b * cs.rpiTerms.b)).toFixed(3)}</span>` : '<span class="score-na">—</span>'}</td>
        <td class="score-td">${cs.rpiTerms ? `<span class="score-chip">${(cs.rpiWeights.c * cs.rpiTerms.c).toFixed(3)}</span><br><span style="font-size:0.6rem;color:var(--color-text-muted)">(${(cs.rpiTerms.c).toFixed(2)}×${cs.rpiWeights.c})</span>` : '<span class="score-na">—</span>'}</td>
        <td class="final-td">
          <div class="final-score-cell">
            <span class="final-score-num">${finalDisplay}</span>
            <div class="score-bar"><div class="score-bar-fill" style="width:${barWidth}%;background:${barColor}"></div></div>
          </div>
        </td>
        <td><span class="tier-badge ${tierCls}">${tierLabel}</span>${staleTag}</td>
        <td class="parts-td">
          ${['partA', 'partB', 'partC'].map(p => s[p].status === 'complete' ? `<span class="part-dot part-dot-done">✓</span>` : `<span class="part-dot">${p.slice(-1).toUpperCase()}</span>`).join('')}
        </td>
      </tr>`;
    }

    const tierCls = cs.tier?.cls || 'tier-unscored';
    const tierLabel = cs.tier?.tier || 'Unscored';
    const finalDisplay = finalVal !== null
      ? finalVal.toFixed(2) + (cs.finalScore === null ? ' *' : '')
      : '—';

    const barWidth = finalVal !== null ? ((finalVal / 4) * 100).toFixed(1) : 0;
    const barColor = cs.tier?.color || '#94A3B8';

    const staleTag = stale
      ? '<span class="stale-tag">C Review Needed</span>'
      : '';

    const partDot = (part) => s[part].status === 'complete'
      ? `<span class="part-dot part-dot-done" title="Part ${part.slice(-1)} complete">✓</span>`
      : `<span class="part-dot" title="Part ${part.slice(-1)} pending">${part.slice(-1).toUpperCase()}</span>`;

    return `
      <tr class="ranking-row ${tierCls}" data-iata="${iata}">
        <td class="rank-num">#${i + 1}</td>
        <td>
          <div class="station-name-cell">
            <strong>${s.name || iata}</strong>
            <span class="iata-tag">${iata}</span>
          </div>
        </td>${volCell}${riskCell}
        <td class="score-td">${cs.aAvg !== null ? `<span class="score-chip">${cs.aAvg}</span>` : '<span class="score-na">—</span>'}</td>
        <td class="mult-td">${cs.bComplete ? `<span class="mult-chip">×${cs.bMult.toFixed(2)}</span>` : '<span class="score-na">—</span>'}</td>
        <td class="score-td">${cs.abComposite !== null ? `<span class="score-chip">${cs.abComposite}</span>` : '<span class="score-na">—</span>'}</td>
        <td class="mult-td">${cs.cComplete ? `<span class="mult-chip">×${cs.cMult.toFixed(2)}</span>` : '<span class="score-na">—</span>'}</td>
        <td class="final-td">
          <div class="final-score-cell">
            <span class="final-score-num">${finalDisplay}</span>
            <div class="score-bar"><div class="score-bar-fill" style="width:${barWidth}%;background:${barColor}"></div></div>
          </div>
        </td>
        <td><span class="tier-badge ${tierCls}">${tierLabel}</span>${staleTag}</td>
        <td class="parts-td">
          ${partDot('partA')}${partDot('partB')}${partDot('partC')}
        </td>
      </tr>`;
  }).join('');

  const riskHeaders = showNormalizedRisk
    ? `<th>Vol</th><th>Risk/10k</th>`
    : '';
  const tableHeaders = isSum
    ? `<tr><th>Rank</th><th>Station</th>${riskHeaders}<th>Part A</th><th>Part B</th><th>Part C</th><th>Total</th><th>Risk Tier</th><th>Parts</th></tr>`
    : aggregationMode === 'risk'
      ? `<tr><th>Rank</th><th>Station</th>${riskHeaders}<th>Risk/Hazard</th><th>Risk/Flight</th><th>Log H</th><th>Log F</th><th>P</th><th colspan="3">Weight / Global</th><th>Risk Score</th><th>Risk Tier</th><th>Parts</th></tr>`
    : aggregationMode === 'smpri'
      ? `<tr><th>Rank</th><th>Station</th>${riskHeaders}<th>z<sub>A</sub></th><th>z<sub>B</sub></th><th>z<sub>C</sub></th><th>z<sub>R</sub></th><th>SMPRI Score</th><th>Risk Tier</th><th>Parts</th></tr>`
    : aggregationMode === 'rpi'
      ? `<tr><th>Rank</th><th>Station</th>${riskHeaders}<th>A (term×w)</th><th>B (term×w)</th><th>A+B</th><th>C (term×w)</th><th>RPI Score</th><th>Risk Tier</th><th>Parts</th></tr>`
    : `<tr><th>Rank</th><th>Station</th>${riskHeaders}<th>A Score</th><th>B Mult</th><th>A × B</th><th>C Mult</th><th>Final Score</th><th>Risk Tier</th><th>Parts</th></tr>`;

  container.innerHTML = `
    ${summaryCards}
    <div class="table-wrapper">
      <table id="rankings-table">
        <thead>${tableHeaders}</thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <p class="rankings-note">${isSum ? 'Sum of all axis scores &nbsp;|&nbsp;' : '* Partial score — not all assessments complete &nbsp;|&nbsp;'} Click any row to open that station &nbsp;|&nbsp; Higher score = higher risk</p>
  `;

  // Click-to-navigate
  document.querySelectorAll('.ranking-row').forEach(row => {
    row.addEventListener('click', () => {
      document.querySelector('.tab[data-view="form"]').click();
      setTimeout(() => {
        document.getElementById('station-selector').value = row.dataset.iata;
        loadStationIntoForm(row.dataset.iata);
      }, 50);
    });
  });
}

// ─── Comparison view ──────────────────────────────────────────────────────────

const COMPARE_COLORS = [
  '#3B82F6', '#A855F7', '#10B981', '#F59E0B',
  '#EF4444', '#EC4899', '#14B8A6', '#F97316',
  '#8B5CF6', '#06B6D4', '#84CC16', '#E11D48',
];

function populateCompareSelectors() {
  const data = loadData();
  const keys = Object.keys(data.stations).sort();
  const sel = document.getElementById('compare-stations');
  sel.innerHTML = keys.map(k =>
    `<option value="${k}">${data.stations[k].name || k} (${k})</option>`
  ).join('');
}

function getAxisScore(station, axisId) {
  if (AXES.partA.find(pa => pa.id === axisId)) return station.partA.scores[axisId] ?? null;
  if (AXES.partB.find(pb => pb.id === axisId)) {
    const b = getWorstPartB(station) || getPartBList(station)[0];
    return b ? (b.scores[axisId] ?? null) : null;
  }
  return station.partC.status === 'complete' ? (station.partC.scores[axisId] ?? null) : null;
}

function renderCompare() {
  const sel = document.getElementById('compare-stations');
  const selected = [...sel.selectedOptions].map(o => o.value);
  if (selected.length < 2) return;

  const stations = selected.map(iata => getStation(iata)).filter(Boolean);
  if (stations.length < 2) return;

  const iatas = stations.map((s, i) => selected[i]);
  const composites = stations.map(s => getCompositeScore(s));

  // Radar chart
  if (compareChart) { compareChart.destroy(); compareChart = null; }

  compareChart = new Chart(document.getElementById('compare-chart').getContext('2d'), {
    type: 'radar',
    data: {
      labels: buildRadarLabels(),
      datasets: stations.map((s, i) => ({
        label: s.name || iatas[i],
        data: buildRadarDataAll(s),
        borderColor: COMPARE_COLORS[i % COMPARE_COLORS.length],
        backgroundColor: COMPARE_COLORS[i % COMPARE_COLORS.length] + '1F',
        borderWidth: 2, pointRadius: 4,
      })),
    },
    options: RADAR_OPTIONS(),
  });

  // Legend
  document.getElementById('compare-legend').innerHTML =
    stations.map((s, i) =>
      `<span class="legend-item"><span class="legend-dot" style="background:${COMPARE_COLORS[i % COMPARE_COLORS.length]}"></span> ${s.name || iatas[i]}</span>`
    ).join('');

  const container = document.getElementById('compare-tables');
  const isSum = aggregationMode === 'sum';

  const thRow = () => '<th>Axis</th>' +
    stations.map((s, i) => `<th>${s.name || iatas[i]} (${iatas[i]})</th>`).join('') +
    '<th>Range</th>';

  const axisCells = scores => scores.map(v =>
    `<td><span class="score-cell ${typeof v === 'number' && v >= 4 ? 'score-' + v : ''}">${v ?? '—'}</span></td>`
  ).join('');

  const sumCell = (cs, key, tierKey) => {
    const val = cs[key];
    if (val === null) return '<td>—</td>';
    const tier = cs[tierKey];
    const badge = tier ? ` <span class="tier-badge ${tier.cls}" style="font-size:0.7rem;padding:1px 6px">${tier.tier}</span>` : '';
    return `<td><strong>${val}</strong>${badge}</td>`;
  };

  const finalCell = (cs, val) => {
    if (val === null) return '<td>—</td>';
    const display = (aggregationMode === 'sum' && cs.finalScore != null) ? `${cs.finalScore}` : val.toFixed(2);
    const badge = cs.tier ? ` <span class="tier-badge ${cs.tier.cls}" style="margin-left:.4rem">${cs.tier.tier}</span>` : '';
    return `<td><strong>${display}</strong>${badge}</td>`;
  };

  const range = values => {
    const nums = values.filter(v => v !== null);
    if (nums.length < 2) return '<td class="delta-zero">—</td>';
    const rng = Math.max(...nums) - Math.min(...nums);
    return `<td class="${rng > 0 ? 'delta-positive' : 'delta-zero'}">${rng.toFixed(1)}</td>`;
  };

  const partDefs = [
    { id: 'A', axes: AXES.partA, label: 'Part A — Airport Infrastructure', color: 'var(--part-a)' },
    { id: 'B', axes: AXES.partB, label: 'Part B — Service Provider Capability', color: 'var(--part-b)' },
    { id: 'C', axes: AXES.partC, label: 'Part C — Operational Safety', color: 'var(--part-c)' },
  ];

  const sumKeys = { A: 'aSum', B: 'bSum', C: 'cSum' };
  const tierKeys = { A: 'aTier', B: 'bTier', C: 'cTier' };

  let html = '';

  partDefs.forEach(p => {
    html += `<div class="compare-part-heading" style="border-color:${p.color}">${p.label}</div>`;
    html += `<table class="compare-part-table"><thead><tr>${thRow()}</tr></thead><tbody>`;

    p.axes.forEach(a => {
      const scores = stations.map(s => getAxisScore(s, a.id));
      html += `<tr><td>${a.name}</td>${axisCells(scores)}${range(scores)}</tr>`;
    });

    if (isSum) {
      const vals = composites.map(c => c[sumKeys[p.id]]);
      html += `<tr class="compare-composite-row">
        <td><strong>${p.label}</strong></td>
        ${composites.map(c => sumCell(c, sumKeys[p.id], tierKeys[p.id])).join('')}
        ${range(vals)}
      </tr>`;
    }

    html += `</tbody></table>`;
  });

  const finals = composites.map(c => c.sortScore ?? c.finalScore ?? c.abComposite ?? c.aAvg);

  html += `<table class="compare-part-table"><tbody>
    <tr class="compare-composite-row">
      <td><strong>${isSum ? 'Combined Total' : 'Final Score'}</strong></td>
      ${composites.map((c, i) => finalCell(c, finals[i])).join('')}
      ${range(finals)}
    </tr>
  </tbody></table>`;

  container.innerHTML = html;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

const HAZARD_ACTIONS = {
  ramp: 'Review ramp handling procedures, increase GSE inspections, and enforce safe driving protocols.',
  aircraft: 'Review maintenance schedules, increase inspection frequency, and audit ground handling procedures.',
  baggage: 'Review baggage handling SOPs, upgrade sortation system training, and inspect induction points.',
  security: 'Review access control procedures, increase security patrols, and audit perimeter integrity.',
  weather: 'Review adverse weather procedures, ensure de-icing equipment readiness, and update winter operations plan.',
  fuel: 'Review fuel handling procedures, inspect fueling equipment, and audit fuel farm safety.',
  passenger: 'Review passenger handling procedures, improve signage, and enhance crowd management training.',
  atc: 'Review communication procedures with ATC, audit navigation aids, and update coordination protocols.',
  cargo: 'Review cargo handling procedures, inspect loading equipment, and audit dangerous goods compliance.',
  ground: 'Review ground handling SOPs, increase ramp safety inspections, and enhance marshalling training.',
  maintenance: 'Audit maintenance records, verify tool control procedures, and review technician training records.',
  bird: 'Review wildlife management plan, increase patrol frequency, and assess habitat mitigation measures.',
  deice: 'Review de-icing procedures, verify fluid stock levels, and audit hold-over time compliance.',
  lavatory: 'Review Lavatory service procedures, inspect service vehicle, and audit waste handling safety.',
  catering: 'Review catering delivery procedures, inspect service vehicles, and audit food safety compliance.',
};

function getActionForHazard(hazardName) {
  const lower = hazardName.toLowerCase();
  const key = Object.keys(HAZARD_ACTIONS).find(k => lower.includes(k));
  return key
    ? HAZARD_ACTIONS[key]
    : 'Investigate reported trends and implement corrective measures across affected stations.';
}

const REGION_IDS = [
  { region: 'Western Canada & Mexico', abbr: 'w-can' },
  { region: 'Central Canada & LATAM', abbr: 'cen-can' },
  { region: 'Eastern Canada & Europe & Asia', abbr: 'e-can' },
  { region: 'US & Caribbean', abbr: 'us' },
];

function renderRegionalOverview(stations, enriched, isSum) {
  const valFmt = isSum ? v => `${v}` : v => v.toFixed(2);

  // Compute per-region hazard data
  const regionHazards = {};
  stations.forEach(s => {
    const reg = getStationRegion(s.iataCode);
    if (!reg) return;
    if (!regionHazards[reg]) regionHazards[reg] = {};
    (s.operationalData?.incidentTrends || []).forEach(inc => {
      const key = inc.level4 && inc.level4 !== 'nan' ? inc.level4
        : inc.level3 && inc.level3 !== 'nan' ? inc.level3
          : inc.type;
      if (key && key !== 'nan') {
        regionHazards[reg][key] = (regionHazards[reg][key] || 0) + (inc.count || 1);
      }
    });
  });

  REGION_IDS.forEach(({ region, abbr }) => {
    const asrm = ASRM_MAP[region];
    const panel = document.querySelector(`.dash-panel-region[data-region="${region}"]`);
    if (!panel) return;

    // Set heading with clickable ASRM name → region-wide advisor analysis
    const heading = panel.querySelector('h3');
    if (heading && asrm) {
      heading.innerHTML = `<a href="#" class="advisor-link" data-advisor="${asrm.name}" data-region="${region}">${asrm.name}</a> &mdash; ${region}  (Hub: ${asrm.hub})`;
    }

    // Filter stations for this region
    const regStations = enriched.filter(e => getStationRegion(e.station.iataCode) === region);

    document.getElementById(`dash-region-${abbr}-stations`).textContent = regStations.length;

    const assessed = regStations.filter(e =>
      e.station.partA?.status === 'complete' &&
      getPartBCount(e.station) > 0 &&
      e.station.partC?.status === 'complete'
    ).length;
    document.getElementById(`dash-region-${abbr}-assessed`).textContent = assessed;

    const highRisk = regStations.filter(e => {
      const t = e.aggTier?.tier;
      return t === 'High' || t === 'Very High';
    }).length;
    document.getElementById(`dash-region-${abbr}-highrisk`).textContent = highRisk;

    // Station list sorted by aggregate score descending (highest risk first)
    const sorted = [...regStations].filter(e => e.aggVal !== null)
      .sort((a, b) => b.aggVal - a.aggVal);

    const listEl = document.getElementById(`dash-region-${abbr}-list`);
    listEl.innerHTML = sorted.length
      ? sorted.map(e => {
        const s = e.station;
        const name = s.name || s.iataCode || '—';
        const tier = e.aggTier || {};
        return `<div class="dash-region-station" data-iata="${s.iataCode}">
            <span class="dash-region-station-name">${name} (${s.iataCode})</span>
            <span class="dash-region-station-score">${valFmt(e.aggVal)}</span>
            <span class="tier-badge ${tier.cls || ''}">${tier.tier || '—'}</span>
          </div>`;
      }).join('')
      : '<div class="empty-state" style="padding:0.25rem 0">—</div>';

    // Top 3 hazards for region
    const hazards = regionHazards[region] || {};
    const topH = Object.entries(hazards).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const hazardsEl = document.getElementById(`dash-region-${abbr}-hazards`);
    hazardsEl.innerHTML = topH.length
      ? topH.map(([h, c], i) =>
        `<div class="dash-region-hazard">
            <span class="dash-hazard-count" style="font-size:0.6rem">${c}</span>
            <span>${h}</span>
          </div>`
      ).join('')
      : '';
  });
}

function renderPartBImpact(stations, enriched, isSum) {
  const valFmt = isSum ? v => `${v}` : v => v.toFixed(2);

  // Group all completed Part B entries by SP name
  const spMap = {};
  stations.forEach(s => {
    getPartBList(s).forEach(b => {
      if (b.status !== 'complete') return;
      const sp = (b.serviceProvider || '').trim() || '(unspecified)';
      if (!spMap[sp]) spMap[sp] = [];
      spMap[sp].push({ station: s, entry: b });
    });
  });

  const sortedSPs = Object.entries(spMap)
    .map(([sp, entries]) => {
      const stationsList = [...new Set(entries.map(e => e.station.iataCode))];
      const allAvgs = entries.map(e => calcAvg(e.entry.scores, AXES.partB)).filter(v => v !== null);
      const overallAvg = allAvgs.length ? allAvgs.reduce((a, b) => a + b, 0) / allAvgs.length : null;
      const tier = overallAvg !== null ? getScoreTier(overallAvg) : null;
      return { sp, stationCount: stationsList.length, overallAvg, tier, entries };
    })
    .sort((a, b) => {
      if (a.overallAvg !== null && b.overallAvg !== null) return b.overallAvg - a.overallAvg;
      if (a.overallAvg !== null) return -1;
      if (b.overallAvg !== null) return 1;
      return b.stationCount - a.stationCount;
    });

  const container = document.getElementById('dash-sp-table');
  if (!sortedSPs.length) {
    container.innerHTML = '<div class="empty-state" style="padding:1rem">No Part B assessments completed.</div>';
    return;
  }

  container.innerHTML = `<table class="sp-compare-table">
    <thead><tr>
      <th>Service Provider</th>
      <th>Stations</th>
      <th>Avg Score</th>
      <th>Tier</th>
    </tr></thead>
    <tbody>${sortedSPs.map(d => {
    const stationRows = d.entries.map(e => {
      const avg = calcAvg(e.entry.scores, AXES.partB);
      const avgDisplay = avg !== null ? valFmt(avg) : '—';
      const tier = avg !== null ? getScoreTier(avg) : null;
      return `<div class="sp-compare-station" data-iata="${e.station.iataCode}">
          <span class="sp-compare-station-name">${e.station.name || e.station.iataCode} (${e.station.iataCode})</span>
          <span class="sp-compare-station-score">${avgDisplay}</span>
          ${tier ? `<span class="tier-badge ${tier.cls || ''}" style="font-size:0.6rem">${tier.tier || '—'}</span>` : ''}
        </div>`;
    }).join('');

    const overallDisplay = d.overallAvg !== null ? (isSum ? d.overallAvg.toFixed(0) : d.overallAvg.toFixed(2)) : '—';

    return `<tr class="sp-compare-row">
        <td class="sp-compare-name">${d.sp}</td>
        <td class="sp-compare-count">${d.stationCount}</td>
        <td class="sp-compare-avg">${overallDisplay}</td>
        <td>${d.tier ? `<span class="tier-badge ${d.tier.cls || ''}">${d.tier.tier || '—'}</span>` : '<span class="tier-badge">—</span>'}</td>
      </tr>
      <tr class="sp-compare-detail-row">
        <td colspan="4"><div class="sp-compare-stations">${stationRows}</div></td>
      </tr>`;
  }).join('')}</tbody>
  </table>`;

  // Toggle expand/collapse on row click
  container.querySelectorAll('.sp-compare-row').forEach((row, i) => {
    row.addEventListener('click', () => {
      const detail = container.querySelectorAll('.sp-compare-detail-row')[i];
      if (detail) {
        detail.classList.toggle('sp-compare-detail-open');
        row.classList.toggle('sp-compare-row-open');
      }
    });
  });

  // Click a station name → go to detail
  container.addEventListener('click', e => {
    const st = e.target.closest('.sp-compare-station');
    if (st && st.dataset.iata) {
      switchToView('detail');
      renderStationDetail(st.dataset.iata);
    }
  });
}

// ─── Station coordinates for map ──────────────────────────────────────────
const STATION_COORDS = {
  YVR: [49.1947, -123.1792], YYC: [51.1215, -114.0075], YEG: [53.3098, -113.5805], YLW: [49.9615, -119.3794],
  YXX: [49.0254, -122.3692], YXS: [53.8892, -122.6785], YQQ: [49.7107, -124.887], YYJ: [48.6469, -123.4258],
  YMM: [56.6531, -111.2219], YQR: [50.4458, -104.5273], YXE: [52.1708, -106.6997], YBL: [49.9461, -125.2708],
  YWG: [49.91, -97.2397], YOW: [45.3225, -75.6692], YXU: [43.0356, -81.2997], YTS: [48.6522, -80.7825],
  YSB: [46.624, -80.7944], YAM: [46.4844, -84.5094], YYB: [46.3617, -79.4228], YYZ: [43.6772, -79.6241],
  YUL: [45.4706, -73.7408], YHZ: [44.8808, -63.5069], YQX: [48.9369, -54.5681], ATL: [33.6407, -84.4277],
  BOS: [42.3656, -71.0096], DEN: [39.8561, -104.6737], IAH: [29.9844, -95.3414], JFK: [40.6413, -73.7781],
  LAS: [36.08, -115.1522], LAX: [33.9416, -118.4085], MCO: [28.4294, -81.3083], MIA: [25.7959, -80.287],
  ORD: [41.9742, -87.9073], PHX: [33.4352, -112.0101], SEA: [47.4502, -122.3088], SFO: [37.6213, -122.379],
  CUN: [21.0365, -86.8762], PVR: [20.6803, -105.2536], SJD: [23.1518, -109.7196], BON: [12.1466, -68.2703],
  HAV: [22.9892, -82.4093], PUJ: [18.5674, -68.3634], SXM: [18.0409, -63.1089], VRA: [23.0344, -81.4353],
  AMS: [52.3105, 4.7683], CDG: [49.0097, 2.5479], CPH: [55.618, 12.655], CWL: [51.3967, -3.3433],
  DUB: [53.4213, -6.27], EDI: [55.95, -3.3725], GLA: [55.8719, -4.4331], LIS: [38.7756, -9.135],
  MAD: [40.4983, -3.5676], LHR: [51.47, -0.4543], FRA: [50.0379, 8.5622], NRT: [35.7647, 140.3864],
  FCO: [41.8003, 12.2389], LGW: [51.1481, -0.1903], BCN: [41.2974, 2.0833], KEF: [63.985, -22.6056],
  PDL: [37.7412, -25.6979], ICN: [37.4602, 126.4407], HND: [35.5494, 139.7798], LIR: [10.5953, -85.5444],
  MBJ: [18.5037, -77.9134], KIN: [17.9357, -76.7875], AUA: [12.5014, -70.0152], UVF: [13.7336, -60.9526],
  BGI: [13.0746, -59.4925], SJO: [9.9939, -84.2088], STI: [19.4062, -70.6047], ORY: [48.7233, 2.3797],
  MXP: [45.6306, 8.7281], BGY: [45.6689, 9.7004], YYT: [47.6186, -52.7513], YCD: [49.0481, -123.8656],
  SLC: [40.7899, -111.9791], YHM: [43.1736, -79.935], SAN: [32.7338, -117.1933], DTW: [42.2124, -83.3534],
  IAD: [38.9474, -77.4599], YBR: [49.91, -99.9519], YFC: [45.8689, -66.4308], YFI: [56.2381, -117.4463],
  YKA: [50.7022, -120.4444], YKF: [43.4558, -80.3814], YQB: [46.7911, -71.3933], YQG: [42.2756, -82.8369],
  YQM: [46.1122, -64.6803], YQT: [48.3719, -89.3239], YQU: [55.1786, -118.7906], YQY: [46.1614, -60.4556],
  YXC: [49.6942, -115.7833], YXJ: [56.2381, -120.74], YXT: [54.4667, -128.5942], YYF: [49.3967, -119.6],
  YYG: [46.29, -63.1247], POP: [19.7579, -70.57], CCC: [22.461, -78.3638], SNU: [22.4922, -79.9435],
  HOG: [20.7858, -76.3144], RIH: [8.3757, -80.1292], AZS: [19.2673, -69.4284], PTY: [9.0714, -79.3835],
  CYO: [21.6153, -84.6452], LRM: [18.45, -68.9119], CFG: [22.15, -80.4142], SJU: [18.4394, -66.0018],
  ADZ: [12.5316, -81.7076], GRU: [-23.4356, -46.4731], MDE: [6.1645, -75.4231], YZF: [62.4628, -114.4403],
  ACY: [39.4576, -74.5772], AUS: [30.1945, -97.6699], BNA: [36.1263, -86.6774], FLL: [26.0742, -80.1506],
  IWA: [33.3078, -111.6556], MSP: [44.8848, -93.2223], OKC: [35.3931, -97.6007], PDX: [45.5898, -122.5951],
  RSW: [26.5362, -81.7553], SNA: [33.6757, -117.8678], TUS: [32.1161, -110.941], ANC: [61.1744, -149.9964],
  HNL: [21.3187, -157.9225], OGG: [20.8986, -156.4305], KOA: [19.7388, -156.0456], LIH: [21.976, -159.339],
  PSP: [33.8303, -116.5064], TPA: [27.9756, -82.5333], JAX: [30.4941, -81.6879], SAT: [29.5337, -98.4698],
  EWR: [40.6925, -74.1687], STL: [38.7487, -90.37], ELP: [31.8001, -106.3788], BUF: [42.9354, -78.7307],
  MOB: [30.6912, -88.2428], GEG: [47.6197, -117.5339], CAE: [33.9388, -81.1192], BHM: [33.5629, -86.7535],
  IND: [39.7173, -86.2944], FAR: [46.9207, -96.8158], MKE: [42.9472, -87.8966], RAP: [44.0373, -103.0648],
  SYR: [43.1112, -76.1063], RDU: [35.8776, -78.7875], ABQ: [35.0402, -106.6092], MLB: [28.1028, -80.6453],
  MEX: [19.4363, -99.0721], MZT: [23.1614, -106.2658], TIJ: [32.5411, -116.97], MLM: [19.8499, -101.0253],
  PBC: [19.1581, -98.3714], ZLO: [19.2095, -104.5533], GDL: [20.5218, -103.3109], LMM: [25.6852, -109.0808],
  ZIH: [17.6017, -101.4607], SLP: [22.2543, -100.9308], SCU: [19.9698, -75.8561], BZE: [17.5391, -88.3082],
  MGA: [12.1415, -86.1682], GCM: [19.2926, -81.3577], CUR: [12.1889, -68.9599], ANU: [17.1367, -61.7927],
  TBS: [32.364, -64.6787], SAL: [13.4409, -89.0557], CMW: [21.4204, -77.8475], YXH: [50.0189, -110.7258],
  YBG: [48.3306, -71.0036], YQL: [49.63, -112.8], YXY: [60.7096, -135.077], YDF: [49.2217, -57.3956],
  YHU: [45.5167, -73.4167], YMX: [45.6812, -74.0286], YWK: [52.9639, -66.8558], YCC: [45.0833, -74.55],
  YFB: [63.7564, -68.47], YQK: [49.8167, -94.3667], YZD: [43.75, -79.4667], YSJ: [45.3161, -65.88],
  YJT: [48.5278, -58.5528], YYR: [53.3192, -60.4258], ZMT: [54.0275, -132.125], NSI: [16.75, -159.2667],
  GUM: [13.4834, 144.796], CXH: [49.2833, -123.1167], YDT: [49.195, -123.1333], CGB: [-15.6536, -56.1167],
  NAS: [25.0390, -77.4663], FPO: [26.5587, -80.1557], RTB: [16.3168, -86.5229],
  CZM: [20.5224, -86.9256], TAB: [11.1497, -60.8322],
  TPO: [22.1500, -80.4142], ICW: [21.9132, -78.8350],
  GND: [12.004, -61.785], HUX: [15.775, -96.263], LTO: [26.013, -111.347],
  MID: [20.937, -89.657], PLS: [21.773, -72.266], PXM: [15.877, -97.089],
  TPQ: [21.420, -104.843], TQO: [20.237, -87.439],
};

const TIER_COLORS = {
  'Low': { fill: '#22C55E', border: '#16A34A' },
  'Medium': { fill: '#EAB308', border: '#CA8A04' },
  'High': { fill: '#F97316', border: '#EA580C' },
  'Very High': { fill: '#EF4444', border: '#DC2626' },
};

function getGradientColor(score, maxScore) {
  const t = Math.min(Math.max(score / maxScore, 0), 1);
  const h = (1 - t) * 120;
  return { fill: `hsl(${h}, 70%, 45%)`, border: `hsl(${h}, 70%, 35%)` };
}

// Geographic area polygon overlays for map region highlighting


let mapInstance = null;
let mapMarkers = null;
let mapTopN = 0; // 0 = all, 5 or 10 = top N
let mapIssuesLayer = null;
let mapSearchMatches = null; // Set of IATA codes matching keyword search, or null if no search
let mapSearchKeyword = null; // Raw keyword string for popup display

function renderStationMap() {
  if (typeof L === 'undefined') return;

  const container = document.getElementById('map-container');
  if (!container) return;

  const mapMode = document.getElementById('map-mode')?.value || 'risk';

  // Toggle filter visibility based on mode
  document.querySelectorAll('.map-issues-filter').forEach(el => {
    el.style.display = mapMode === 'issues' ? '' : 'none';
  });
  ['map-tier-group'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = (mapMode === 'risk' || mapMode === 'risk-oapt') ? '' : 'none';
  });
  const analysisGroup = document.getElementById('map-analysis-group');
  if (analysisGroup) analysisGroup.style.display = mapMode === 'risk' ? '' : 'none';
  const spGroup = document.getElementById('map-sp-group');
  if (spGroup) spGroup.style.display = mapMode === 'risk' ? '' : 'none';

  // Build filter options
  const data = loadData();
  const stations = Object.values(data.stations);

  // Populate SP filter
  const spSel = document.getElementById('map-sp');
  const allSPs = new Set();
  stations.forEach(s => getPartBList(s).forEach(b => {
    if (b.serviceProvider) allSPs.add(b.serviceProvider.trim());
  }));
  const currentSP = spSel.value;
  spSel.innerHTML = '<option value="">All SPs</option>' +
    [...allSPs].sort().map(sp => `<option value="${sp}">${sp}</option>`).join('');
  spSel.value = currentSP || '';

  // Populate region filter
  const regSel = document.getElementById('map-region');
  const regions = getActiveRegions();
  const currentReg = regSel.value;
  regSel.innerHTML = '<option value="">All Regions</option>' +
    regions.map(r => `<option value="${r}">${r}</option>`).join('');
  regSel.value = currentReg || '';

  // Populate airline filter
  const alSel = document.getElementById('map-airline');
  if (alSel) {
    const currentAl = alSel.value;
    const airlines = getAllAirlines();
    alSel.innerHTML = '<option value="">All Airlines</option>' +
      airlines.map(a => `<option value="${a}">${a}</option>`).join('');
    alSel.value = currentAl || '';
  }

  // Populate aircraft filter
  const acSel = document.getElementById('map-aircraft');
  if (acSel) {
    const currentAc = acSel.value;
    const aircraft = getAllAircraftTypes();
    acSel.innerHTML = '<option value="">All Aircraft</option>' +
      aircraft.map(a => `<option value="${a}">${a}</option>`).join('');
    acSel.value = currentAc || '';
  }

  // Populate CRS+OAPT filters if in issues mode
  if (mapMode === 'issues' && typeof CRS_MERGED_REPORTS !== 'undefined') {
    populateMapIssueFilters();
  }

  // Init map if needed
  if (!mapInstance) {
    mapInstance = L.map(container).setView([45, -95], 3);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
    }).addTo(mapInstance);
    requestAnimationFrame(() => mapInstance.invalidateSize());
  } else {
    mapInstance.invalidateSize();
  }

  // Clear old layers
  if (mapMarkers) mapInstance.removeLayer(mapMarkers);
  if (mapIssuesLayer) mapInstance.removeLayer(mapIssuesLayer);
  if (window._mapRegionLayer) mapInstance.removeLayer(window._mapRegionLayer);
  if (window._mapRegionLabel) mapInstance.removeControl(window._mapRegionLabel);
  mapMarkers = L.featureGroup().addTo(mapInstance);
  mapIssuesLayer = L.featureGroup().addTo(mapInstance);
  window._mapRegionLayer = L.featureGroup().addTo(mapInstance);

  // Clear old "By Region" summary bar
  const oldRegionBar = document.getElementById('map-region-summary');
  if (oldRegionBar) oldRegionBar.remove();

  const regFilter = regSel.value;
  const keywordSearch = (document.getElementById('map-keyword-search')?.value || '').trim();
  mapSearchMatches = keywordSearch ? getMapSearchMatches(keywordSearch) : null;
  mapSearchKeyword = keywordSearch || null;

  if (mapMode === 'issues') {
    renderMapIssuesMode(stations, regFilter);
  } else if (mapMode === 'risk-oapt') {
    renderMapRiskOaptMode(stations, regFilter);
  } else if (mapMode === 'risk-hazard') {
    renderMapRiskHazardMode(stations, regFilter);
  } else if (mapMode === 'risk-flight') {
    renderMapRiskFlightMode(stations, regFilter);
  } else if (mapMode === 'risk-log') {
    renderMapRiskLogMode(stations, regFilter);
  } else if (mapMode === 'risk-log-hazard') {
    renderMapLogRiskHazardMode(stations, regFilter);
  } else if (mapMode === 'risk-log-flight') {
    renderMapLogRiskFlightMode(stations, regFilter);
  } else if (mapMode === 'flight-count') {
    renderMapFlightCountMode(stations, regFilter);
  } else {
    renderMapRiskMode(stations, regFilter);
  }
  if (mapMode === 'issues') {
    document.getElementById('map-distribution-wrap').style.display = 'none';
    if (_mapDistChart) { _mapDistChart.destroy(); _mapDistChart = null; }
  }

  // Geographic polygon overlay + region name label
  if (regFilter) {
    renderMapRegionOverlay(regFilter);
  }

  // Fit bounds
  const allLayers = mapMarkers.getLayers().concat(mapIssuesLayer.getLayers());
  if (!regFilter && allLayers.length) {
    const group = L.featureGroup(allLayers);
    mapInstance.fitBounds(group.getBounds().pad(0.1));
  }
}

let _mapTypeDescMap = {};

function populateMapIssueFilters() {
  const types = new Set();
  const descriptors = new Set();
  const hfacs = new Set();
  const typeDescMap = {};
  CRS_MERGED_REPORTS.forEach(r => {
    if (r.t) types.add(r.t);
    if (r.d) { descriptors.add(r.d); if (r.t) { if (!typeDescMap[r.t]) typeDescMap[r.t] = new Set(); typeDescMap[r.t].add(r.d); } }
    if (r.h1) hfacs.add(r.h1);
  });
  _mapTypeDescMap = typeDescMap;

  const typeSel = document.getElementById('map-issues-type');
  const descSel = document.getElementById('map-issues-desc');
  const hfacsSel = document.getElementById('map-issues-hfacs');

  if (typeSel && typeSel.options.length <= 1) {
    typeSel.innerHTML = '<option value="">All</option>' +
      [...types].sort().map(t => `<option value="${escHtml(t)}">${escHtml(t)}</option>`).join('');
  }
  if (descSel && descSel.options.length <= 1) {
    descSel.innerHTML = '<option value="">All</option>' +
      [...descriptors].sort().map(d => `<option value="${escHtml(d)}">${escHtml(d)}</option>`).join('');
  }
  if (hfacsSel && hfacsSel.options.length <= 1) {
    hfacsSel.innerHTML = '<option value="">All</option>' +
      [...hfacs].sort().map(h => `<option value="${escHtml(h)}">${escHtml(h)}</option>`).join('');
  }

  // Set default date range: last 7 days
  const dateFrom = document.getElementById('map-issues-date-from');
  const dateTo = document.getElementById('map-issues-date-to');
  if (dateFrom && !dateFrom.value) {
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);
    dateFrom.value = weekAgo.toISOString().substring(0, 10);
  }
  if (dateTo && !dateTo.value) {
    dateTo.value = new Date().toISOString().substring(0, 10);
  }
}

function updateMapDescFilter(selectedType) {
  const descSel = document.getElementById('map-issues-desc');
  if (!descSel) return;
  const currentVal = descSel.value;
  let descriptors;
  if (selectedType && _mapTypeDescMap[selectedType]) {
    descriptors = [..._mapTypeDescMap[selectedType]].sort();
  } else {
    descriptors = [...new Set(Object.values(_mapTypeDescMap).flatMap(s => [...s]))].sort();
  }
  descSel.innerHTML = '<option value="">All</option>' +
    descriptors.map(d => `<option value="${escHtml(d)}"${d === currentVal ? ' selected' : ''}>${escHtml(d)}</option>`).join('');
  if (currentVal && !descriptors.includes(currentVal)) descSel.value = '';
}

// ─── Map: Distribution Chart ────────────────────────────────────────────────

let _mapDistChart = null;

function renderMapDistributionChart(values, label, unit, fixedBinWidth) {
  const wrap = document.getElementById('map-distribution-wrap');
  const canvas = document.getElementById('map-dist-chart');
  const titleEl = document.getElementById('map-dist-title');
  const statsEl = document.getElementById('map-dist-stats');
  if (!wrap || !canvas || !values.length) { if (wrap) wrap.style.display = 'none'; return; }

  wrap.style.display = '';

  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
  const std = Math.sqrt(variance);

  const p5 = Math.max(0, mean - 2 * std);
  const p95 = mean + 2 * std;

  statsEl.textContent = `μ = ${mean.toFixed(2)} ${unit}  ·  M = ${median.toFixed(2)}  ·  σ = ${std.toFixed(2)}  ·  n = ${values.length}`;

  let bins, labels, binWidth;
  if (fixedBinWidth) {
    const dataMin = Math.max(0, Math.min(...values));
    const sortedVals = [...values].sort((a, b) => a - b);
    const p95Idx = Math.min(Math.floor(sortedVals.length * 0.95), sortedVals.length - 1);
    const capMax = Math.max(fixedBinWidth * 2, sortedVals[p95Idx]);
    const binStart = Math.floor(dataMin / fixedBinWidth) * fixedBinWidth;
    const binEnd = Math.ceil(capMax / fixedBinWidth) * fixedBinWidth;
    const binCount = Math.max(1, Math.round((binEnd - binStart) / fixedBinWidth));
    binWidth = fixedBinWidth;
    bins = new Array(binCount).fill(0);
    values.forEach(v => {
      if (v > capMax) return;
      const idx = Math.min(Math.floor((v - binStart) / binWidth), binCount - 1);
      if (idx >= 0 && idx < binCount) bins[idx]++;
    });
    labels = bins.map((_, i) => `${(binStart + i * binWidth).toFixed(0)}–${(binStart + (i + 1) * binWidth).toFixed(0)}`);
  } else {
    const binCount = Math.min(30, Math.max(10, Math.ceil(Math.sqrt(values.length))));
    const minVal = Math.max(0, p5);
    const maxVal = p95 || 1;
    binWidth = (maxVal - minVal) / binCount || 1;
    bins = new Array(binCount).fill(0);
    values.forEach(v => {
      const idx = Math.min(Math.floor((v - minVal) / binWidth), binCount - 1);
      if (idx >= 0 && idx < binCount) bins[idx]++;
    });
    labels = bins.map((_, i) => (minVal + i * binWidth + binWidth / 2).toFixed(1));
  }

  if (_mapDistChart) { _mapDistChart.destroy(); _mapDistChart = null; }

  const meanBin = (mean - minVal) / binWidth;
  const medianBin = (median - minVal) / binWidth;
  const stdLowBin = Math.max(0, (mean - std - minVal) / binWidth);
  const stdHighBin = Math.min(binCount - 1, (mean + std - minVal) / binWidth);

  _mapDistChart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: bins,
        backgroundColor: bins.map((_, i) => {
          if (i >= stdLowBin && i <= stdHighBin) return 'rgba(59,130,246,0.6)';
          return 'rgba(209,213,219,0.5)';
        }),
        borderColor: bins.map((_, i) => {
          if (i >= stdLowBin && i <= stdHighBin) return 'rgba(37,99,235,0.8)';
          return 'rgba(156,163,175,0.5)';
        }),
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => `${label} ≈ ${items[0].label} ${unit}`,
            label: (item) => `${item.raw} station${item.raw !== 1 ? 's' : ''}`,
          },
        },
        annotation: undefined,
      },
      scales: {
        x: {
          title: { display: true, text: `${label} (${unit})`, font: { size: 10 } },
          ticks: { font: { size: 9 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 8 },
          grid: { display: false },
        },
        y: {
          title: { display: true, text: 'Stations', font: { size: 10 } },
          ticks: { font: { size: 9 }, stepSize: 1 },
          beginAtZero: true,
        },
      },
    },
    plugins: [{
      id: 'meanStdLines',
      afterDraw(chart) {
        const ctx = chart.ctx;
        const xScale = chart.scales.x;
        const yScale = chart.scales.y;
        const area = chart.chartArea;

        const drawLine = (x, color, label) => {
          if (x < area.left || x > area.right) return;
          ctx.save();
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 3]);
          ctx.beginPath();
          ctx.moveTo(x, area.top);
          ctx.lineTo(x, area.bottom);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = color;
          ctx.font = '9px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(label, x, area.top - 3);
          ctx.restore();
        };

        const meanX = xScale.getPixelForValue(meanBin);
        const medianX = xScale.getPixelForValue(medianBin);
        const stdLowX = xScale.getPixelForValue(stdLowBin);
        const stdHighX = xScale.getPixelForValue(stdHighBin);

        drawLine(stdLowX, '#EF4444', `μ−σ (${(mean - std).toFixed(1)})`);
        drawLine(meanX, '#2563EB', `μ (${mean.toFixed(1)})`);
        drawLine(medianX, '#16A34A', `M (${median.toFixed(1)})`);
        drawLine(stdHighX, '#EF4444', `μ+σ (${(mean + std).toFixed(1)})`);
      },
    }],
  });
}

function updateMapDistribution(mode, allScores) {
  let values = [];
  let label = '';
  let unit = '';

  if (mode === 'risk' && Array.isArray(allScores)) {
    values = allScores.filter(v => v != null);
    label = 'Risk Score';
    unit = '';
  } else if (mode === 'risk' || mode === 'risk-oapt') {
    allScores.forEach(cs => { if (cs?.finalScore != null) values.push(cs.finalScore); });
    label = mode === 'risk-oapt' ? 'Risk Score (Bühlmann)' : 'Risk Score';
    unit = '/1k flt';
  } else if (mode === 'risk-hazard') {
    allScores.forEach(cs => { if (cs?.riskPerHazard > 0) values.push(cs.riskPerHazard); });
    label = 'Risk per Hazards';
    unit = '';
  } else if (mode === 'risk-flight') {
    allScores.forEach(cs => { if (cs?.riskPerFlight > 0 && cs.flightCount) values.push(cs.riskPerFlight); });
    label = 'Risk per Flight';
    unit = '/1k flt';
  } else if (mode === 'risk-log') {
    allScores.forEach(cs => { if (cs?.logBlended > 0) values.push(cs.logBlended); });
    label = 'Log Risk (ln(rate+1))';
    unit = '';
  } else if (mode === 'risk-log-hazard') {
    allScores.forEach(cs => { if (cs?.logRiskPerHazard > 0) values.push(cs.logRiskPerHazard); });
    label = 'Log Risk/Hazard (ln)';
    unit = '';
  } else if (mode === 'risk-log-flight') {
    allScores.forEach(cs => { if (cs?.logRiskPerFlight > 0 && cs.flightCount) values.push(cs.logRiskPerFlight); });
    label = 'Log Risk/Flight (ln)';
    unit = '';
  } else if (mode === 'flight-count') {
    if (Array.isArray(allScores)) {
      allScores.forEach(r => { if (r?.fc > 0) values.push(r.fc); });
    } else {
      allScores.forEach(cs => { if (cs?.flightCount > 0) values.push(cs.flightCount); });
    }
    label = 'Flight Count';
    unit = 'flights';
  } else {
    document.getElementById('map-distribution-wrap').style.display = 'none';
    return;
  }

  if (!values.length) { document.getElementById('map-distribution-wrap').style.display = 'none'; return; }
  renderMapDistributionChart(values, label, unit, mode === 'flight-count' ? 100 : undefined);
}

// ─── Network Distribution Page ────────────────────────────────────────────────

let _distCharts = [];

function renderNetworkDistribution() {
  ensureIcaoGlobal();

  const dateFrom = document.getElementById('dist-date-from')?.value || '';
  const dateTo = document.getElementById('dist-date-to')?.value || '';
  const regionFilter = document.getElementById('dist-region')?.value || '';
  const airlineFilter = (document.getElementById('dist-airline')?.value || '').trim();
  const aircraftFilter = (document.getElementById('dist-aircraft')?.value || '').trim();

  // Populate filter dropdowns if empty
  const regionSel = document.getElementById('dist-region');
  if (regionSel && regionSel.options.length <= 1) {
    const regions = getActiveRegions();
    regionSel.innerHTML = '<option value="">All Regions</option>' +
      regions.map(r => `<option value="${escHtml(r)}">${escHtml(r)}</option>`).join('');
  }
  const airlineSel = document.getElementById('dist-airline');
  if (airlineSel && airlineSel.options.length <= 1 && typeof CRS_MERGED_REPORTS !== 'undefined') {
    const airlines = getAllAirlines();
    airlineSel.innerHTML = '<option value="">All Airlines</option>' +
      airlines.map(a => `<option value="${escHtml(a)}">${escHtml(a)}</option>`).join('');
  }
  const aircraftSel = document.getElementById('dist-aircraft');
  if (aircraftSel && aircraftSel.options.length <= 1 && typeof CRS_MERGED_REPORTS !== 'undefined') {
    const aircraft = getAllAircraftTypes();
    aircraftSel.innerHTML = '<option value="">All Aircraft</option>' +
      aircraft.map(a => `<option value="${escHtml(a)}">${escHtml(a)}</option>`).join('');
  }

  // Compute all risk scores
  const allScores = _computeAllRiskScores(dateFrom || undefined, dateTo || undefined);

  // Build airline/aircraft filter sets
  let airlineSet = null;
  let aircraftSet = null;
  if (airlineFilter) {
    airlineSet = new Set();
    if (typeof CRS_MERGED_REPORTS !== 'undefined') {
      CRS_MERGED_REPORTS.forEach(r => {
        if (r.al === airlineFilter) {
          const iatas = new Set();
          if (r.c) iatas.add(r.c);
          const iata = ICAO_TO_IATA_GLOBAL?.[r.c];
          if (iata) iatas.add(iata);
          iatas.forEach(i => airlineSet.add(i));
        }
      });
    }
  }
  if (aircraftFilter) {
    aircraftSet = new Set();
    if (typeof CRS_MERGED_REPORTS !== 'undefined') {
      CRS_MERGED_REPORTS.forEach(r => {
        if (r.ac === aircraftFilter) {
          const iatas = new Set();
          if (r.c) iatas.add(r.c);
          const iata = ICAO_TO_IATA_GLOBAL?.[r.c];
          if (iata) iatas.add(iata);
          iatas.forEach(i => aircraftSet.add(i));
        }
      });
    }
  }

  function stationPassesFilters(iata) {
    if (regionFilter && getStationRegion(iata) !== regionFilter) return false;
    if (airlineSet && !airlineSet.has(iata)) return false;
    if (aircraftSet && !aircraftSet.has(iata)) return false;
    return true;
  }

  // Destroy old charts
  _distCharts.forEach(c => { if (c) c.destroy(); });
  _distCharts = [];

  const container = document.getElementById('dist-charts');
  if (!container) return;

  // Define all chart configurations
  const charts = [
    {
      title: 'Risk Score (A×B×C)',
      metric: 'finalScore',
      filter: cs => cs?.finalScore != null && stationPassesFilters(cs._iata),
      unit: '/1k flt',
    },
    {
      title: 'Risk Score (OAPT+SAPT) Bühlmann',
      metric: 'finalScore',
      filter: cs => cs?.finalScore != null && stationPassesFilters(cs._iata),
      unit: '/1k flt',
    },
    {
      title: 'Risk per Hazards',
      metric: 'riskPerHazard',
      filter: cs => cs?.riskPerHazard > 0 && stationPassesFilters(cs._iata),
      unit: '',
    },
    {
      title: 'Risk per Flight',
      metric: 'riskPerFlight',
      filter: cs => cs?.riskPerFlight > 0 && cs?.flightCount && stationPassesFilters(cs._iata),
      unit: '/1k flt',
    },
    {
      title: 'Log Risk (ln(rate+1))',
      metric: 'logBlended',
      filter: cs => cs?.logBlended > 0 && stationPassesFilters(cs._iata),
      unit: '',
    },
    {
      title: 'Log Risk/Hazard (ln)',
      metric: 'logRiskPerHazard',
      filter: cs => cs?.logRiskPerHazard > 0 && stationPassesFilters(cs._iata),
      unit: '',
    },
    {
      title: 'Log Risk/Flight (ln)',
      metric: 'logRiskPerFlight',
      filter: cs => cs?.logRiskPerFlight > 0 && cs?.flightCount && stationPassesFilters(cs._iata),
      unit: '',
    },
    {
      title: 'Flight Count (total)',
      metric: '__flights',
      filter: cs => cs?.flightCount > 0 && stationPassesFilters(cs._iata),
      unit: 'flights',
      fixedBinWidth: 100,
    },
    {
      title: 'OAPT Occurrences (unique)',
      metric: 'oaptCount',
      filter: cs => cs?.oaptCount > 0 && stationPassesFilters(cs._iata),
      unit: 'occurrences',
      fixedBinWidth: 5,
    },
    {
      title: 'SAPT Occurrences (unique)',
      metric: 'saptCount',
      filter: cs => cs?.saptCount > 0 && stationPassesFilters(cs._iata),
      unit: 'occurrences',
      fixedBinWidth: 1,
    },
  ];

  // Build HTML for all charts
  container.innerHTML = charts.map((cfg, i) => `
    <div class="dash-panel" style="padding:0.75rem">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
        <h4 style="font-size:0.8rem;font-weight:600;color:var(--color-text,#1F2937)">${cfg.title}</h4>
        <span id="dist-stats-${i}" style="font-size:0.7rem;color:#6B7280"></span>
      </div>
      <div style="position:relative;height:200px">
        <canvas id="dist-chart-${i}"></canvas>
      </div>
    </div>
  `).join('');

  // Render each chart
  charts.forEach((cfg, i) => {
    let values = [];
    allScores.forEach((cs, iata) => {
      cs._iata = iata;
      if (cfg.filter(cs)) {
        values.push(cfg.fixedBinWidth && cfg.metric === '__flights' ? cs.flightCount : cs[cfg.metric]);
      }
    });

    if (!values.length) return;

    const statsEl = document.getElementById(`dist-stats-${i}`);
    const canvas = document.getElementById(`dist-chart-${i}`);
    if (!canvas) return;

    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
    const std = Math.sqrt(variance);

    if (statsEl) statsEl.textContent = `μ = ${mean.toFixed(2)} ${cfg.unit}  ·  M = ${median.toFixed(2)}  ·  σ = ${std.toFixed(2)}  ·  n = ${values.length}`;

    let bins, labels, binWidth, minVal, binCount;
    if (cfg.fixedBinWidth) {
      const fixedBinWidth = cfg.fixedBinWidth;
      const dataMin = Math.max(0, Math.min(...values));
      const sortedVals = [...values].sort((a, b) => a - b);
      const p95Idx = Math.min(Math.floor(sortedVals.length * 0.95), sortedVals.length - 1);
      const capMax = Math.max(fixedBinWidth * 2, sortedVals[p95Idx]);
      minVal = Math.floor(dataMin / fixedBinWidth) * fixedBinWidth;
      const binEnd = Math.ceil(capMax / fixedBinWidth) * fixedBinWidth;
      binCount = Math.max(1, Math.round((binEnd - minVal) / fixedBinWidth));
      binWidth = fixedBinWidth;
      bins = new Array(binCount).fill(0);
      values.forEach(v => {
        if (v > capMax) return;
        const idx = Math.min(Math.floor((v - minVal) / binWidth), binCount - 1);
        if (idx >= 0 && idx < binCount) bins[idx]++;
      });
      labels = bins.map((_, j) => `${(minVal + j * binWidth).toFixed(0)}–${(minVal + (j + 1) * binWidth).toFixed(0)}`);
    } else {
      const p5 = Math.max(0, mean - 2 * std);
      const p95 = mean + 2 * std;
      binCount = Math.min(30, Math.max(10, Math.ceil(Math.sqrt(values.length))));
      minVal = Math.max(0, p5);
      const maxVal = p95 || 1;
      binWidth = (maxVal - minVal) / binCount || 1;
      bins = new Array(binCount).fill(0);
      values.forEach(v => {
        const idx = Math.min(Math.floor((v - minVal) / binWidth), binCount - 1);
        if (idx >= 0 && idx < binCount) bins[idx]++;
      });
      labels = bins.map((_, j) => (minVal + j * binWidth + binWidth / 2).toFixed(1));
    }

    const meanBin = (mean - minVal) / binWidth;
    const medianBin = (median - minVal) / binWidth;
    const stdLowBin = Math.max(0, (mean - std - minVal) / binWidth);
    const stdHighBin = Math.min(binCount - 1, (mean + std - minVal) / binWidth);

    const chart = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data: bins,
          backgroundColor: bins.map((_, j) => {
            if (j >= stdLowBin && j <= stdHighBin) return 'rgba(59,130,246,0.6)';
            return 'rgba(209,213,219,0.5)';
          }),
          borderColor: bins.map((_, j) => {
            if (j >= stdLowBin && j <= stdHighBin) return 'rgba(37,99,235,0.8)';
            return 'rgba(156,163,175,0.5)';
          }),
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) => `${cfg.title} ≈ ${items[0].label} ${cfg.unit}`,
              label: (item) => `${item.raw} station${item.raw !== 1 ? 's' : ''}`,
            },
          },
        },
        scales: {
          x: {
            title: { display: true, text: `${cfg.title} (${cfg.unit})`, font: { size: 10 } },
            ticks: { font: { size: 9 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 8 },
            grid: { display: false },
          },
          y: {
            title: { display: true, text: 'Stations', font: { size: 10 } },
            ticks: { font: { size: 9 }, stepSize: 1 },
            beginAtZero: true,
          },
        },
      },
      plugins: [{
        id: `distMeanStdLines-${i}`,
        afterDraw(chart) {
          const ctx = chart.ctx;
          const xScale = chart.scales.x;
          const area = chart.chartArea;

          const drawLine = (x, color, label) => {
            if (x < area.left || x > area.right) return;
            ctx.save();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 3]);
            ctx.beginPath();
            ctx.moveTo(x, area.top);
            ctx.lineTo(x, area.bottom);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = color;
            ctx.font = '9px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(label, x, area.top - 3);
            ctx.restore();
          };

          drawLine(xScale.getPixelForValue(stdLowBin), '#EF4444', `μ−σ (${(mean - std).toFixed(1)})`);
          drawLine(xScale.getPixelForValue(meanBin), '#2563EB', `μ (${mean.toFixed(1)})`);
          drawLine(xScale.getPixelForValue(medianBin), '#16A34A', `M (${median.toFixed(1)})`);
          drawLine(xScale.getPixelForValue(stdHighBin), '#EF4444', `μ+σ (${(mean + std).toFixed(1)})`);
        },
      }],
    });
    _distCharts.push(chart);
  });
}

// ─── Map: Risk Mode (existing behavior) ──────────────────────────────────────

function renderMapRiskMode(stations, regFilter) {
  const analysis = document.getElementById('map-analysis').value;
  const spFilter = document.getElementById('map-sp').value;
  const tierFilter = document.getElementById('map-tier').value;
  const airlineFilter = (document.getElementById('map-airline')?.value || '').trim();
  const aircraftFilter = (document.getElementById('map-aircraft')?.value || '').trim();

  // Pre-compute all scores to find max for bubble scaling
  const stationScores = new Map();
  let maxScore = 1;
  stations.forEach(s => {
    const cs = (analysis === 'agg') ? getCompositeScore(s) : null;
    const sc = cs?.sortScore ?? cs?.finalScore ?? null;
    if (sc !== null) { stationScores.set(s.iataCode, sc); if (sc > maxScore) maxScore = sc; }
  });

  const topStations = mapTopN > 0 ? [...stations].filter(s => stationScores.has(s.iataCode)).sort((a, b) => (stationScores.get(b.iataCode) ?? 0) - (stationScores.get(a.iataCode) ?? 0)).slice(0, mapTopN) : stations;
  topStations.forEach(s => {
    const coords = STATION_COORDS[s.iataCode];
    if (!coords) return;

    if (spFilter) {
      const hasSP = getPartBList(s).some(b =>
        (b.serviceProvider || '').trim() === spFilter && b.status === 'complete'
      );
      if (!hasSP) return;
    }

    if (!stationMatchesCrsFilters(s.iataCode, airlineFilter, aircraftFilter)) return;

    const inRegion = !regFilter || getStationRegion(s.iataCode) === regFilter;

    let score, tier, rawDisplay;
    const cs = (analysis === 'agg') ? getCompositeScore(s) : null;
    if (analysis === 'partA') {
      score = calcAvg(s.partA.scores, AXES.partA);
    } else if (analysis === 'partB') {
      const w = getWorstPartB(s);
      score = w ? calcAvg(w.scores, AXES.partB) : null;
    } else if (analysis === 'partC') {
      score = s.partC.status === 'complete' ? calcAvg(s.partC.scores, AXES.partC) : null;
    } else {
      const isSum = aggregationMode === 'sum';
      if (isSum) {
        score = cs ? cs.sortScore : null;
        rawDisplay = cs && cs.finalScore != null ? `${Math.round(cs.finalScore)} / ${cs.sumMax}` : null;
      } else if (aggregationMode === 'risk') {
        score = cs ? cs.sortScore : null;
        rawDisplay = cs && cs.finalScore != null ? cs.finalScore.toFixed(2) : null;
      } else {
        score = cs ? cs.finalScore : null;
        rawDisplay = cs && cs.finalScore != null ? cs.finalScore.toFixed(2) : null;
      }
    }
    tier = (aggregationMode === 'risk' || aggregationMode === 'smpri')
      ? (cs?.tier || null)
      : (score !== null ? getScoreTier(score) : null);

    if (tierFilter && (!tier || tier.tier !== tierFilter)) return;

    const dimmed = (regFilter && !inRegion) || (mapSearchMatches && !mapSearchMatches.has(s.iataCode));
    const colors = score !== null && maxScore > 1 ? getGradientColor(score, maxScore) : { fill: '#94A3B8', border: '#64748B' };
    let baseRadius;
    if (analysis === 'agg' && aggregationMode === 'sum') {
      baseRadius = 10;
    } else if (analysis === 'agg' && (aggregationMode === 'risk' || aggregationMode === 'smpri') && score !== null) {
      const norm = Math.min(score / maxScore, 1);
      baseRadius = 6 + norm * 18;
    } else {
      baseRadius = 8;
    }
    const radius = dimmed ? Math.max(4, baseRadius * 0.5) : baseRadius;
    const displayScore = rawDisplay || (score !== null
      ? (analysis === 'agg' && aggregationMode === 'sum' ? score.toFixed(0) : aggregationMode === 'risk' ? score.toFixed(2) : score.toFixed(2))
      : 'N/A');

    const marker = L.circleMarker(coords, {
      radius,
      fillColor: dimmed ? '#CBD5E1' : colors.fill,
      color: dimmed ? '#94A3B8' : colors.border,
      weight: dimmed ? 1 : 2,
      opacity: dimmed ? 0.4 : 1,
      fillOpacity: dimmed ? 0.15 : 0.7,
    });
    marker.bindPopup(`
      <div style="font-size:0.85rem;line-height:1.5">
        ${mapSearchKeyword ? _searchPopupHtml(s.iataCode, s.name, dimmed) : `
        <strong>${s.name || s.iataCode} (${s.iataCode})</strong><br>
        Region: ${getStationRegion(s.iataCode) || '—'}${dimmed ? ' <span style="color:#94A3B8">(dimmed)</span>' : ''}<br>
        ${(() => {
          if (!cs || !cs.reportingFlag) return '';
          const FLAG_STYLES = {
            'Low Reporting Confidence': '#FEF3C7;color:#92400E',
            'Insufficient Volume': '#E0E7FF;color:#3730A3',
            'No OAPT/SAPT': '#FEE2E2;color:#991B1B',
            'No OAPT': '#FDE68A;color:#92400E',
            'No SAPT': '#E0E7FF;color:#3730A3',
          };
          return `<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:600;background:${FLAG_STYLES[cs.reportingFlag] || '#F3F4F6;color:#374151'}">${cs.reportingFlag}</span><br>`;
        })()}
        ${(() => {
          if (!cs) return '';
          const smpriVal = cs.smpri ?? cs.finalScore ?? 0;
          const logP = cs.logPScore ?? 0;
          const cred = cs.credibility ?? 0;
          let alerts = '';
          if (smpriVal >= 1.5 || (logP >= 2.0 && cred >= 0.5)) {
            alerts += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEE2E2;color:#991B1B">Immediate Action Alert</span> ';
          }
          const expectedInc = cs.expectedIncidents ?? 0;
          const occCount = cs.stationUniqueCount ?? 0;
          if (occCount === 0 && expectedInc >= 3.0) {
            alerts += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEF3C7;color:#92400E">Reporting Quality Audit Required</span> ';
          }
          return alerts ? alerts + '<br>' : '';
        })()}
        ${analysis === 'agg' ? (aggregationMode === 'sum' ? 'Sum Score' : aggregationMode === 'risk' ? 'Risk Score (OAPT+SAPT)' : aggregationMode === 'smpri' ? 'SMPRI Score' : aggregationMode === 'rpi' ? 'RPI Score' : 'Weighted Score') : `Part ${analysis.slice(-1)} Avg`}: <strong>${displayScore}</strong><br>
        ${cs?.saptRiskPerHazard > 0 ? `SAPT-only Severity: <strong>${cs.saptRiskPerHazard.toFixed(2)}</strong> <span style="color:#9CA3AF">(no OAPT dilution)</span><br>` : ''}
        ${cs?.ftPScore != null ? `FT P-Score: <strong>${cs.ftPScore.toFixed(3)}</strong> <span style="color:#9CA3AF">(Freeman-Tukey)</span><br>` : ''}
        Tier: ${tier ? `<span style="display:inline-block;padding:0 6px;border-radius:3px;background:${colors.fill};color:#fff;font-weight:600">${tier.tier}</span>` : '—'}<br>
        ${aggregationMode === 'risk' && cs ? `<span style="font-size:0.75rem;color:#6b7280">Weight: ${cs.weightSum.toLocaleString()} ÷ ${cs.stationUniqueCount} occ ÷ ${cs.flightCount ? cs.flightCount.toLocaleString() + ' flights × 1,000' : cs.totalGlobal.toLocaleString() + ' global'}</span><br>` : ''}
        ${aggregationMode === 'smpri' && cs ? `<div style="margin-top:4px;padding:4px 6px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB;font-size:0.75rem;color:#374151">
          <div><strong>SMPRI = ${cs.smpri?.toFixed(3) ?? cs.finalScore?.toFixed(3) ?? '—'}</strong></div>
          <div style="margin-top:2px">z<sub>A</sub>: ${cs.zA != null ? (cs.zA > 0 ? '+' : '') + cs.zA.toFixed(2) : '—'} · z<sub>B</sub>: ${cs.zB != null ? (cs.zB > 0 ? '+' : '') + cs.zB.toFixed(2) : '—'} · z<sub>C</sub>: ${cs.zC != null ? (cs.zC > 0 ? '+' : '') + cs.zC.toFixed(2) : '—'} · z<sub>R</sub>: ${cs.zR != null ? (cs.zR > 0 ? '+' : '') + cs.zR.toFixed(2) : '—'}</div>
          <div style="margin-top:2px;font-size:0.7rem;color:#6b7280">Credibility-gated weights: A=${cs.smpriWeights?.a?.toFixed(3) ?? '—'} B=${cs.smpriWeights?.b?.toFixed(3) ?? '—'} C=${cs.smpriWeights?.c?.toFixed(3) ?? '—'} R=${cs.smpriWeights?.r?.toFixed(3) ?? '—'} (Z=${cs.credibility?.toFixed(3) ?? '—'})</div>
        </div><br>` : ''}
        Total Flights: <strong>${getFlightVolume(s)?.toLocaleString() || '—'}</strong><br>
        ${getPartBList(s).filter(b => b.status === 'complete').map(b =>
      `SP: ${b.serviceProvider || '—'}${b.function ? ` (${b.function})` : ''}`
    ).join('<br>') || 'No SP assessments'}
        `}
      </div>
    `);
    marker.on('click', () => {
      switchToView('detail');
      renderStationDetail(s.iataCode);
    });
    mapMarkers.addLayer(marker);
    if (cs && cs.reportingFlag && !dimmed) {
      const FLAG_DOT_COLORS = {
        'Low Reporting Confidence': '#F59E0B',
        'Insufficient Volume': '#6366F1',
        'No OAPT/SAPT': '#EF4444',
        'No OAPT': '#F59E0B',
        'No SAPT': '#6366F1',
      };
      const flagColor = FLAG_DOT_COLORS[cs.reportingFlag] || '#94A3B8';
      const flagMarker = L.circleMarker(coords, {
        radius: 4,
        fillColor: flagColor,
        color: '#fff',
        weight: 1.5,
        opacity: 1,
        fillOpacity: 1,
      });
      flagMarker.bindTooltip(cs.reportingFlag, { direction: 'top', offset: [0, -radius - 4] });
      mapMarkers.addLayer(flagMarker);
    }
  });

  // Risk legend
  const legend = document.getElementById('map-legend');
  legend.innerHTML = `<div class="map-gradient-bar-wrap"><div class="map-gradient-bar" style="background:linear-gradient(to right, hsl(120,70%,45%), hsl(60,70%,45%), hsl(0,70%,45%));height:12px;border-radius:3px;flex:1"></div><div style="display:flex;justify-content:space-between;font-size:0.65rem;color:#6b7280;flex:1"><span>Low</span><span>Medium</span><span>High</span><span>Very High</span></div></div>`;

  document.getElementById('map-stats').innerHTML = '';
  const riskValues = [...stationScores.values()];
  updateMapDistribution('risk', riskValues);
}

// ─── Map: Risk Score (OAPT+SAPT) Mode ──────────────────────────────────────

function renderMapRiskOaptMode(stations, regFilter) {
  if (typeof CRS_MERGED_REPORTS === 'undefined') return;

  const tierFilter = document.getElementById('map-tier').value;
  const airlineFilter = (document.getElementById('map-airline')?.value || '').trim();
  const aircraftFilter = (document.getElementById('map-aircraft')?.value || '').trim();
  const dateFrom = document.getElementById('map-issues-date-from')?.value || '';
  const dateTo = document.getElementById('map-issues-date-to')?.value || '';
  ensureIcaoGlobal();

  // Pre-compute risk scores for all stations (includes 0-incident stations with flights)
  const allScores = _computeAllRiskScores(dateFrom || undefined, dateTo || undefined);

  // Build station list from all scored IATAs that have coordinates
  const stationRisks = [];
  let maxScore = 1;
  allScores.forEach((cs, iata) => {
    const coords = STATION_COORDS[iata];
    if (!coords) return;
    if (!cs || cs.finalScore === null) return;
    if (cs.finalScore > maxScore) maxScore = cs.finalScore;
    const formStation = stations.find(s => s.iataCode === iata);
    const s = formStation || { iataCode: iata, name: iata, partA: { scores: {} }, partB: [], partC: { scores: {} } };
    stationRisks.push({ s, coords, cs });
  });

  const topStations = applyMapTopN(stationRisks, x => x.cs?.finalScore ?? 0);
  topStations.forEach(({ s, coords, cs }) => {
    const inRegion = !regFilter || getStationRegion(s.iataCode) === regFilter;
    const dimmed = (regFilter && !inRegion) || (mapSearchMatches && !mapSearchMatches.has(s.iataCode));

    const score = cs.sortScore;
    const tier = cs.tier;

    if (tierFilter && (!tier || tier.tier !== tierFilter)) return;
    if (!stationMatchesCrsFilters(s.iataCode, airlineFilter, aircraftFilter)) return;

    const colors = score !== null && maxScore > 1 ? getGradientColor(score, maxScore) : { fill: '#94A3B8', border: '#64748B' };
    const norm = Math.min(score / maxScore, 1);
    const baseRadius = 6 + norm * 18;
    const radius = dimmed ? Math.max(4, baseRadius * 0.5) : baseRadius;

    const FLAG_STYLES = {
      'Low Reporting Confidence': '#FEF3C7;color:#92400E',
      'Insufficient Volume': '#E0E7FF;color:#3730A3',
      'No OAPT/SAPT': '#FEE2E2;color:#991B1B',
      'No OAPT': '#FDE68A;color:#92400E',
      'No SAPT': '#E0E7FF;color:#3730A3',
    };
    const flagHtml = cs.reportingFlag
      ? `<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:600;background:${FLAG_STYLES[cs.reportingFlag] || '#F3F4F6;color:#374151'}">${cs.reportingFlag}</span><br>`
      : '';

    // Count CRS records matching airline/aircraft filter for this station
    let filteredCrsCount = 0;
    if (airlineFilter || aircraftFilter) {
      const matchingIcaos2 = new Set([s.iataCode, 'C' + s.iataCode, 'K' + s.iataCode]);
      Object.entries(ICAO_TO_IATA_GLOBAL).forEach(([icao, iata2]) => { if (iata2 === s.iataCode) matchingIcaos2.add(icao); });
      filteredCrsCount = CRS_MERGED_REPORTS.filter(r =>
        matchingIcaos2.has(r.c) &&
        crsMatchesAirline(r, airlineFilter) &&
        crsMatchesAircraft(r, aircraftFilter)
      ).length;
    }

    const marker = L.circleMarker(coords, {
      radius,
      fillColor: dimmed ? '#CBD5E1' : colors.fill,
      color: dimmed ? '#94A3B8' : colors.border,
      weight: dimmed ? 1 : 2,
      opacity: dimmed ? 0.4 : 1,
      fillOpacity: dimmed ? 0.15 : 0.7,
    });
    // Outlier ring for |P| >= 2
    if (!dimmed && cs.pScore != null && Math.abs(cs.pScore) >= 2) {
      const ringColor = Math.abs(cs.pScore) >= 3 ? '#DC2626' : '#D97706';
      const ringWeight = Math.abs(cs.pScore) >= 3 ? 3 : 2;
      const ring = L.circleMarker(coords, {
        radius: radius + 4,
        fillColor: 'transparent',
        color: ringColor,
        weight: ringWeight,
        opacity: 0.8,
        fillOpacity: 0,
      });
      ring.bindTooltip(`P = ${cs.pScore > 0 ? '+' : ''}${cs.pScore.toFixed(2)} — ${Math.abs(cs.pScore) >= 3 ? 'Extreme outlier' : 'Outlier'}`, { direction: 'top', offset: [0, -radius - 8] });
      mapMarkers.addLayer(ring);
    }
    marker.bindPopup(`
      <div style="font-size:0.85rem;line-height:1.5">
        ${mapSearchKeyword ? _searchPopupHtml(s.iataCode, s.name, dimmed) : `
        <strong>${s.name || s.iataCode} (${s.iataCode})</strong><br>
        Region: ${getStationRegion(s.iataCode) || '—'}${dimmed ? ' <span style="color:#94A3B8">(dimmed)</span>' : ''}<br>
        ${flagHtml}
        ${(() => {
          const logP = cs.logPScore ?? 0;
          const cred = cs.credibility ?? 0;
          let alerts = '';
          if (logP >= 2.0 && cred >= 0.5) {
            alerts += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEE2E2;color:#991B1B">Immediate Action Alert</span> ';
          }
          const expectedInc = cs.expectedIncidents ?? 0;
          const occCount = cs.stationUniqueCount ?? 0;
          if (occCount === 0 && expectedInc >= 3.0) {
            alerts += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEF3C7;color:#92400E">Reporting Quality Audit Required</span> ';
          }
          return alerts ? alerts + '<br>' : '';
        })()}
        Risk Score (Bühlmann): <strong>${cs.finalScore.toFixed(2)}</strong><br>
        ${cs.decayedBlendedScore != null ? `Decayed Score: <strong>${cs.decayedBlendedScore.toFixed(2)}</strong> <span style="color:#9CA3AF">(time-weighted)</span><br>` : ''}
        Risk per Hazards: <strong>${cs.riskPerHazard.toFixed(2)}</strong> <span style="color:#9CA3AF">(log: ${cs.logRiskPerHazard.toFixed(2)})</span><br>
        ${cs.saptRiskPerHazard > 0 ? `SAPT-only Severity: <strong>${cs.saptRiskPerHazard.toFixed(2)}</strong> <span style="color:#9CA3AF">(no OAPT dilution)</span><br>` : ''}
        Risk per Flight: <strong>${cs.flightCount ? cs.riskPerFlight.toFixed(2) : '—'}</strong> <span style="color:#9CA3AF">(log: ${cs.flightCount ? cs.logRiskPerFlight.toFixed(2) : '—'})</span><br>
        P-Score: <strong style="color:${Math.abs(cs.pScore) >= 3 ? '#DC2626' : Math.abs(cs.pScore) >= 2 ? '#D97706' : '#16A34A'}">${cs.pScore > 0 ? '+' : ''}${cs.pScore.toFixed(2)}</strong> ${Math.abs(cs.pScore) >= 3 ? '⚠ Extreme outlier' : Math.abs(cs.pScore) >= 2 ? '⚠ Outlier' : Math.abs(cs.pScore) >= 1 ? 'Slightly elevated' : 'Within normal range'}<br>
        FT P-Score: <strong>${cs.ftPScore != null ? cs.ftPScore.toFixed(3) : '—'}</strong> <span style="color:#9CA3AF">(Freeman-Tukey Poisson transform)</span><br>
        Tier: ${tier ? `<span style="display:inline-block;padding:0 6px;border-radius:3px;background:${colors.fill};color:#fff;font-weight:600">${tier.tier}</span>` : '—'}<br>
        <div style="margin-top:4px;padding:4px 6px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB;font-size:0.75rem;color:#374151">
          <div><strong>Credibility Z: ${cs.credibility.toFixed(2)}</strong> — Station data trust (flights ÷ flights + K, empirical K=${cs.buehlmannK}). Higher Z → more trust in own rate.</div>
          <div style="margin-top:3px"><strong>Raw: ${cs.rawRate.toFixed(2)}</strong> — Station incident rate per 1,000 flights (OAPT/SAPT weighted).</div>
          <div style="margin-top:3px"><strong>Net Avg: ${cs.networkAvgRate.toFixed(2)}</strong> — Network-wide average. Fallback for low-flight stations.</div>
          <div style="margin-top:3px"><strong>FT Transform: ${cs.ftPScore != null ? cs.ftPScore.toFixed(3) : '—'}</strong> — Variance-stabilized for Poisson counts (√k+√(k+1)−√(4E+1)).</div>
        </div>
        <span style="font-size:0.75rem;color:#6b7280">${cs.weightSum.toLocaleString()} weight ÷ ${cs.stationUniqueCount} occ ÷ ${cs.flightCount.toLocaleString()} flights × 1k</span><br>
        Total Flights: <strong>${cs.flightCount.toLocaleString()}</strong>${(airlineFilter || aircraftFilter) && filteredCrsCount > 0 ? ` <span style="color:#6b7280;font-size:0.75rem">(${filteredCrsCount} matching ${(airlineFilter || '') + (airlineFilter && aircraftFilter ? ' + ' : '') + (aircraftFilter || '')} CRS records)</span>` : ''}<br>
        ${cs.reportingFlag ? `<span style="font-size:0.75rem;color:#6b7280">Expected ~${cs.expectedIncidents} incidents at network rate</span><br>` : ''}
        ${getPartBList(s).filter(b => b.status === 'complete').map(b =>
      `SP: ${b.serviceProvider || '—'}${b.function ? ` (${b.function})` : ''}`
    ).join('<br>') || 'No SP assessments'}
        `}
      </div>
    `);
    marker.on('click', () => {
      switchToView('detail');
      renderStationDetail(s.iataCode);
    });
    mapMarkers.addLayer(marker);

    if (cs.reportingFlag && !dimmed) {
      const FLAG_DOT_COLORS = {
        'Low Reporting Confidence': '#F59E0B',
        'Insufficient Volume': '#6366F1',
        'No OAPT/SAPT': '#EF4444',
        'No OAPT': '#F59E0B',
        'No SAPT': '#6366F1',
      };
      const flagColor = FLAG_DOT_COLORS[cs.reportingFlag] || '#94A3B8';
      const flagMarker = L.circleMarker(coords, {
        radius: 4,
        fillColor: flagColor,
        color: '#fff',
        weight: 1.5,
        opacity: 1,
        fillOpacity: 1,
      });
      flagMarker.bindTooltip(cs.reportingFlag, { direction: 'top', offset: [0, -radius - 4] });
      mapMarkers.addLayer(flagMarker);
    }
  });

  // Legend
  const legend = document.getElementById('map-legend');
  legend.innerHTML = `<div class="map-gradient-bar-wrap"><div class="map-gradient-bar" style="background:linear-gradient(to right, hsl(120,70%,45%), hsl(60,70%,45%), hsl(0,70%,45%));height:12px;border-radius:3px;flex:1"></div><div style="display:flex;justify-content:space-between;font-size:0.65rem;color:#6b7280;flex:1"><span>Low</span><span>Medium</span><span>High</span><span>Very High</span></div></div> <span class="map-legend-item" style="margin-left:8px"><span class="map-legend-dot" style="background:#EF4444;border-color:#DC2626"></span>No OAPT/SAPT</span> <span class="map-legend-item"><span class="map-legend-dot" style="background:#F59E0B;border-color:#D97706"></span>Low Reporting</span> <span class="map-legend-item"><span class="map-legend-dot" style="background:#6366F1;border-color:#4F46E5"></span>Insufficient Volume</span> <span class="map-legend-item"><span class="map-legend-ring" style="border:2px solid #D97706"></span>P ≥ 2 (Outlier)</span> <span class="map-legend-item"><span class="map-legend-ring" style="border:3px solid #DC2626"></span>P ≥ 3 (Extreme)</span>`;

  // Stats
  const scored = stationRisks.length;
  const flagged = stationRisks.filter(r => r.cs.reportingFlag).length;
  const lowReporting = stationRisks.filter(r => r.cs.reportingFlag === 'Low Reporting Confidence').length;
  const totalWeight = stationRisks.reduce((sum, r) => sum + r.cs.weightSum, 0);
  const networkAvg = stationRisks.length ? stationRisks[0].cs.networkAvgRate : 0;
  document.getElementById('map-stats').innerHTML =
    `<span>${scored} stations</span> · <span>${totalWeight.toLocaleString()} weight</span> · <span>K=${stationRisks.length ? stationRisks[0].cs.buehlmannK : '—'}</span> · <span>Net avg: ${networkAvg.toFixed(2)}</span>${flagged ? ` · <span style="color:#D97706">${flagged} flagged (${lowReporting} low reporting)</span>` : ''}`;

  // Risk by region
  const regionMap = {};
  stationRisks.forEach(r => {
    const reg = getStationRegion(r.s.iataCode) || 'Unassigned';
    if (!regionMap[reg]) regionMap[reg] = { stations: 0, totalScore: 0, totalWeight: 0, totalFlights: 0, flagged: 0 };
    regionMap[reg].stations++;
    regionMap[reg].totalScore += r.cs.finalScore;
    regionMap[reg].totalWeight += r.cs.weightSum;
    regionMap[reg].totalFlights += r.cs.flightCount;
    if (r.cs.reportingFlag) regionMap[reg].flagged++;
  });
  const regionHtml = Object.entries(regionMap).sort((a, b) => (b[1].totalScore / b[1].stations) - (a[1].totalScore / a[1].stations)).map(([reg, d]) => {
    const avg = d.totalScore / d.stations;
    const t = avg <= 10 ? 'tier-low' : avg <= 50 ? 'tier-medium' : avg <= 150 ? 'tier-high' : 'tier-very-high';
    return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:0.75rem;margin-right:10px"><span class="tier-badge ${t}" style="padding:1px 6px">${avg.toFixed(1)}</span>${reg} <span style="color:#9CA3AF">(${d.stations}${d.flagged ? ' · ' + d.flagged + ' flagged' : ''})</span></span>`;
  }).join('');
  document.getElementById('map-legend').insertAdjacentHTML('afterend', `<div id="map-region-summary" style="display:flex;flex-wrap:wrap;gap:2px 0;margin-top:6px;padding:4px 8px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB"><span style="font-size:0.7rem;font-weight:600;color:#374151;margin-right:8px">By Region:</span>${regionHtml}</div>`);
  updateMapDistribution('risk-oapt', allScores);
}

// ─── Map: Risk per Hazards Mode ──────────────────────────────────────────────

function renderMapRiskHazardMode(stations, regFilter) {
  if (typeof CRS_MERGED_REPORTS === 'undefined') return;

  const airlineFilter = (document.getElementById('map-airline')?.value || '').trim();
  const aircraftFilter = (document.getElementById('map-aircraft')?.value || '').trim();
  const dateFrom = document.getElementById('map-issues-date-from')?.value || '';
  const dateTo = document.getElementById('map-issues-date-to')?.value || '';
  ensureIcaoGlobal();

  const allScores = _computeAllRiskScores(dateFrom || undefined, dateTo || undefined);

  const stationRisks = [];
  let maxRiskHazard = 1;
  allScores.forEach((cs, iata) => {
    const coords = STATION_COORDS[iata];
    if (!coords) return;
    if (!cs || cs.riskPerHazard === 0) return;
    if (cs.riskPerHazard > maxRiskHazard) maxRiskHazard = cs.riskPerHazard;
    const formStation = stations.find(s => s.iataCode === iata);
    const s = formStation || { iataCode: iata, name: iata, partA: { scores: {} }, partB: [], partC: { scores: {} } };
    stationRisks.push({ s, coords, cs });
  });

  const topStations = applyMapTopN(stationRisks, x => x.cs?.riskPerHazard ?? 0);
  topStations.forEach(({ s, coords, cs }) => {
    const inRegion = !regFilter || getStationRegion(s.iataCode) === regFilter;
    const dimmed = (regFilter && !inRegion) || (mapSearchMatches && !mapSearchMatches.has(s.iataCode));

    if (!stationMatchesCrsFilters(s.iataCode, airlineFilter, aircraftFilter)) return;

    const val = cs.riskPerHazard;
    const colors = val > 0 && maxRiskHazard > 1 ? getGradientColor(val, maxRiskHazard) : { fill: '#94A3B8', border: '#64748B' };
    const norm = Math.min(val / maxRiskHazard, 1);
    const baseRadius = 6 + norm * 18;
    const radius = dimmed ? Math.max(4, baseRadius * 0.5) : baseRadius;

    const FLAG_STYLES = {
      'Low Reporting Confidence': '#FEF3C7;color:#92400E',
      'Insufficient Volume': '#E0E7FF;color:#3730A3',
      'No OAPT/SAPT': '#FEE2E2;color:#991B1B',
      'No OAPT': '#FDE68A;color:#92400E',
      'No SAPT': '#E0E7FF;color:#3730A3',
    };
    const flagHtml = cs.reportingFlag
      ? `<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:600;background:${FLAG_STYLES[cs.reportingFlag] || '#F3F4F6;color:#374151'}">${cs.reportingFlag}</span><br>`
      : '';

    let filteredCrsCount = 0;
    if (airlineFilter || aircraftFilter) {
      const matchingIcaos2 = new Set([s.iataCode, 'C' + s.iataCode, 'K' + s.iataCode]);
      Object.entries(ICAO_TO_IATA_GLOBAL).forEach(([icao, iata2]) => { if (iata2 === s.iataCode) matchingIcaos2.add(icao); });
      filteredCrsCount = CRS_MERGED_REPORTS.filter(r =>
        matchingIcaos2.has(r.c) &&
        crsMatchesAirline(r, airlineFilter) &&
        crsMatchesAircraft(r, aircraftFilter)
      ).length;
    }

    const marker = L.circleMarker(coords, {
      radius,
      fillColor: dimmed ? '#CBD5E1' : colors.fill,
      color: dimmed ? '#94A3B8' : colors.border,
      weight: dimmed ? 1 : 2,
      opacity: dimmed ? 0.4 : 1,
      fillOpacity: dimmed ? 0.15 : 0.7,
    });
    // Outlier ring for |P| >= 2
    if (!dimmed && cs.pScore != null && Math.abs(cs.pScore) >= 2) {
      const ringColor = Math.abs(cs.pScore) >= 3 ? '#DC2626' : '#D97706';
      const ring = L.circleMarker(coords, { radius: radius + 4, fillColor: 'transparent', color: ringColor, weight: Math.abs(cs.pScore) >= 3 ? 3 : 2, opacity: 0.8, fillOpacity: 0 });
      ring.bindTooltip(`P = ${cs.pScore > 0 ? '+' : ''}${cs.pScore.toFixed(2)} — ${Math.abs(cs.pScore) >= 3 ? 'Extreme outlier' : 'Outlier'}`, { direction: 'top', offset: [0, -radius - 8] });
      mapMarkers.addLayer(ring);
    }
    marker.bindPopup(`
      <div style="font-size:0.85rem;line-height:1.5">
        ${mapSearchKeyword ? _searchPopupHtml(s.iataCode, s.name, dimmed) : `
        <strong>${s.name || s.iataCode} (${s.iataCode})</strong><br>
        Region: ${getStationRegion(s.iataCode) || '—'}${dimmed ? ' <span style="color:#94A3B8">(dimmed)</span>' : ''}<br>
        ${flagHtml}
        ${(() => {
          const logP = cs.logPScore ?? 0;
          const cred = cs.credibility ?? 0;
          let alerts = '';
          if (logP >= 2.0 && cred >= 0.5) {
            alerts += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEE2E2;color:#991B1B">Immediate Action Alert</span> ';
          }
          const expectedInc = cs.expectedIncidents ?? 0;
          const occCount = cs.stationUniqueCount ?? 0;
          if (occCount === 0 && expectedInc >= 3.0) {
            alerts += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEF3C7;color:#92400E">Reporting Quality Audit Required</span> ';
          }
          return alerts ? alerts + '<br>' : '';
        })()}
        Risk per Hazards: <strong>${cs.riskPerHazard.toFixed(2)}</strong> <span style="color:#9CA3AF">(log: ${cs.logRiskPerHazard.toFixed(2)})</span><br>
        ${cs.saptRiskPerHazard > 0 ? `SAPT-only Severity: <strong>${cs.saptRiskPerHazard.toFixed(2)}</strong> <span style="color:#9CA3AF">(no OAPT dilution)</span><br>` : ''}
        Risk per Flight: <strong>${cs.flightCount ? cs.riskPerFlight.toFixed(2) : '—'}</strong> <span style="color:#9CA3AF">(log: ${cs.flightCount ? cs.logRiskPerFlight.toFixed(2) : '—'})</span><br>
        P-Score: <strong style="color:${Math.abs(cs.pScore) >= 3 ? '#DC2626' : Math.abs(cs.pScore) >= 2 ? '#D97706' : '#16A34A'}">${cs.pScore > 0 ? '+' : ''}${cs.pScore.toFixed(2)}</strong> ${Math.abs(cs.pScore) >= 3 ? '⚠ Extreme outlier' : Math.abs(cs.pScore) >= 2 ? '⚠ Outlier' : Math.abs(cs.pScore) >= 1 ? 'Slightly elevated' : 'Within normal range'}<br>
        FT P-Score: <strong>${cs.ftPScore != null ? cs.ftPScore.toFixed(3) : '—'}</strong> <span style="color:#9CA3AF">(Freeman-Tukey Poisson transform)</span><br>
        <div style="margin-top:4px;padding:4px 6px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB;font-size:0.75rem;color:#374151">
          <div><strong>Formula:</strong> weightSum ÷ occCount × 1,000</div>
          <div style="margin-top:3px"><strong>Weight Sum: ${cs.weightSum.toLocaleString()}</strong> — Sum of weighted OAPT (×1) + SAPT (×50/250/1250) occurrences</div>
          <div style="margin-top:3px"><strong>Occurrences: ${cs.stationUniqueCount}</strong> — Unique OAPT+SAPT OccNos at this station</div>
          ${cs.saptRiskPerHazard > 0 ? `<div style="margin-top:3px"><strong>SAPT-only: ${cs.saptRiskPerHazard.toFixed(2)}</strong> — Conditional severity given a safety occurrence (SAPT only, no OAPT dilution)</div>` : ''}
          <div style="margin-top:3px"><strong>Avg Weight/Occ: ${(cs.weightSum / cs.stationUniqueCount).toFixed(2)}</strong> — Average severity per hazard</div>
          <div style="margin-top:3px"><strong>Log Risk/Hazard: ${cs.logRiskPerHazard.toFixed(3)}</strong> — ln(${cs.riskPerHazard.toFixed(2)} + 1)</div>
        </div>
        <div style="margin-top:4px;padding:4px 6px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB;font-size:0.75rem;color:#374151">
          <strong>Risk Score (Bühlmann): ${cs.finalScore.toFixed(2)}</strong> — ${cs.tier?.tier || '—'} tier<br>
          Credibility Z: ${cs.credibility.toFixed(2)} | Net Avg: ${cs.networkAvgRate.toFixed(2)}
        </div>
        ${cs.flightCount ? `<span style="font-size:0.75rem;color:#6b7280">Total Flights: ${cs.flightCount.toLocaleString()}</span>${(airlineFilter || aircraftFilter) && filteredCrsCount > 0 ? ` <span style="color:#6b7280;font-size:0.75rem">(${filteredCrsCount} matching CRS records)</span>` : ''}<br>` : ''}
        ${cs.reportingFlag ? `<span style="font-size:0.75rem;color:#6b7280">Expected ~${cs.expectedIncidents} incidents at network rate</span><br>` : ''}
        ${getPartBList(s).filter(b => b.status === 'complete').map(b =>
      `SP: ${b.serviceProvider || '—'}${b.function ? ` (${b.function})` : ''}`
    ).join('<br>') || 'No SP assessments'}
        `}
      </div>
    `);
    marker.on('click', () => {
      switchToView('detail');
      renderStationDetail(s.iataCode);
    });
    mapMarkers.addLayer(marker);

    if (cs.reportingFlag && !dimmed) {
      const FLAG_DOT_COLORS = {
        'Low Reporting Confidence': '#F59E0B',
        'Insufficient Volume': '#6366F1',
        'No OAPT/SAPT': '#EF4444',
        'No OAPT': '#F59E0B',
        'No SAPT': '#6366F1',
      };
      const flagColor = FLAG_DOT_COLORS[cs.reportingFlag] || '#94A3B8';
      const flagMarker = L.circleMarker(coords, {
        radius: 4,
        fillColor: flagColor,
        color: '#fff',
        weight: 1.5,
        opacity: 1,
        fillOpacity: 1,
      });
      flagMarker.bindTooltip(cs.reportingFlag, { direction: 'top', offset: [0, -radius - 4] });
      mapMarkers.addLayer(flagMarker);
    }
  });

  const legend = document.getElementById('map-legend');
  legend.innerHTML = `<div class="map-gradient-bar-wrap"><div class="map-gradient-bar" style="background:linear-gradient(to right, hsl(120,70%,45%), hsl(60,70%,45%), hsl(0,70%,45%));height:12px;border-radius:3px;flex:1"></div><div style="display:flex;justify-content:space-between;font-size:0.65rem;color:#6b7280;flex:1"><span>Low</span><span>Medium</span><span>High</span><span>Very High</span></div></div> <span class="map-legend-item" style="margin-left:8px"><span class="map-legend-dot" style="background:#EF4444;border-color:#DC2626"></span>No OAPT/SAPT</span> <span class="map-legend-item"><span class="map-legend-dot" style="background:#F59E0B;border-color:#D97706"></span>Low Reporting</span> <span class="map-legend-item"><span class="map-legend-dot" style="background:#6366F1;border-color:#4F46E5"></span>Insufficient Volume</span> <span class="map-legend-item"><span class="map-legend-ring" style="border:2px solid #D97706"></span>P ≥ 2 (Outlier)</span> <span class="map-legend-item"><span class="map-legend-ring" style="border:3px solid #DC2626"></span>P ≥ 3 (Extreme)</span>`;

  const scored = stationRisks.length;
  const flagged = stationRisks.filter(r => r.cs.reportingFlag).length;
  const lowReporting = stationRisks.filter(r => r.cs.reportingFlag === 'Low Reporting Confidence').length;
  const totalWeight = stationRisks.reduce((sum, r) => sum + r.cs.weightSum, 0);
  const avgHazard = stationRisks.length ? stationRisks.reduce((sum, r) => sum + r.cs.riskPerHazard, 0) / stationRisks.length : 0;
  document.getElementById('map-stats').innerHTML =
    `<span>${scored} stations</span> · <span>${totalWeight.toLocaleString()} weight</span> · <span>Avg: ${avgHazard.toFixed(1)}</span>${flagged ? ` · <span style="color:#D97706">${flagged} flagged (${lowReporting} low reporting)</span>` : ''}`;

  const regionMap = {};
  stationRisks.forEach(r => {
    const reg = getStationRegion(r.s.iataCode) || 'Unassigned';
    if (!regionMap[reg]) regionMap[reg] = { stations: 0, totalRH: 0, flagged: 0 };
    regionMap[reg].stations++;
    regionMap[reg].totalRH += r.cs.riskPerHazard;
    if (r.cs.reportingFlag) regionMap[reg].flagged++;
  });
  const regionHtml = Object.entries(regionMap).sort((a, b) => (b[1].totalRH / b[1].stations) - (a[1].totalRH / a[1].stations)).map(([reg, d]) => {
    const avg = d.totalRH / d.stations;
    const t = avg <= 1000 ? 'tier-low' : avg <= 5000 ? 'tier-medium' : avg <= 50000 ? 'tier-high' : 'tier-very-high';
    return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:0.75rem;margin-right:10px"><span class="tier-badge ${t}" style="padding:1px 6px">${avg.toFixed(1)}</span>${reg} <span style="color:#9CA3AF">(${d.stations}${d.flagged ? ' · ' + d.flagged + ' flagged' : ''})</span></span>`;
  }).join('');
  document.getElementById('map-legend').insertAdjacentHTML('afterend', `<div id="map-region-summary" style="display:flex;flex-wrap:wrap;gap:2px 0;margin-top:6px;padding:4px 8px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB"><span style="font-size:0.7rem;font-weight:600;color:#374151;margin-right:8px">By Region:</span>${regionHtml}</div>`);
  updateMapDistribution('risk-hazard', allScores);
}

// ─── Map: Risk per Flight Mode ───────────────────────────────────────────────

function renderMapRiskFlightMode(stations, regFilter) {
  if (typeof CRS_MERGED_REPORTS === 'undefined') return;

  const airlineFilter = (document.getElementById('map-airline')?.value || '').trim();
  const aircraftFilter = (document.getElementById('map-aircraft')?.value || '').trim();
  const dateFrom = document.getElementById('map-issues-date-from')?.value || '';
  const dateTo = document.getElementById('map-issues-date-to')?.value || '';
  ensureIcaoGlobal();

  const allScores = _computeAllRiskScores(dateFrom || undefined, dateTo || undefined);

  const stationRisks = [];
  let maxVal = 1;
  allScores.forEach((cs, iata) => {
    const coords = STATION_COORDS[iata];
    if (!coords) return;
    if (!cs || !cs.flightCount || cs.riskPerFlight === 0) return;
    if (cs.riskPerFlight > maxVal) maxVal = cs.riskPerFlight;
    const formStation = stations.find(s => s.iataCode === iata);
    const s = formStation || { iataCode: iata, name: iata, partA: { scores: {} }, partB: [], partC: { scores: {} } };
    stationRisks.push({ s, coords, cs });
  });

  const topStations = applyMapTopN(stationRisks, x => x.cs?.riskPerFlight ?? 0);
  topStations.forEach(({ s, coords, cs }) => {
    const inRegion = !regFilter || getStationRegion(s.iataCode) === regFilter;
    const dimmed = (regFilter && !inRegion) || (mapSearchMatches && !mapSearchMatches.has(s.iataCode));

    if (!stationMatchesCrsFilters(s.iataCode, airlineFilter, aircraftFilter)) return;

    const val = cs.riskPerFlight;
    const colors = val > 0 && maxVal > 1 ? getGradientColor(val, maxVal) : { fill: '#94A3B8', border: '#64748B' };
    const norm = Math.min(val / maxVal, 1);
    const baseRadius = 6 + norm * 18;
    const radius = dimmed ? Math.max(4, baseRadius * 0.5) : baseRadius;

    const FLAG_STYLES = {
      'Low Reporting Confidence': '#FEF3C7;color:#92400E',
      'Insufficient Volume': '#E0E7FF;color:#3730A3',
      'No OAPT/SAPT': '#FEE2E2;color:#991B1B',
      'No OAPT': '#FDE68A;color:#92400E',
      'No SAPT': '#E0E7FF;color:#3730A3',
    };
    const flagHtml = cs.reportingFlag
      ? `<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:600;background:${FLAG_STYLES[cs.reportingFlag] || '#F3F4F6;color:#374151'}">${cs.reportingFlag}</span><br>`
      : '';

    let filteredCrsCount = 0;
    if (airlineFilter || aircraftFilter) {
      const matchingIcaos2 = new Set([s.iataCode, 'C' + s.iataCode, 'K' + s.iataCode]);
      Object.entries(ICAO_TO_IATA_GLOBAL).forEach(([icao, iata2]) => { if (iata2 === s.iataCode) matchingIcaos2.add(icao); });
      filteredCrsCount = CRS_MERGED_REPORTS.filter(r =>
        matchingIcaos2.has(r.c) &&
        crsMatchesAirline(r, airlineFilter) &&
        crsMatchesAircraft(r, aircraftFilter)
      ).length;
    }

    const marker = L.circleMarker(coords, {
      radius,
      fillColor: dimmed ? '#CBD5E1' : colors.fill,
      color: dimmed ? '#94A3B8' : colors.border,
      weight: dimmed ? 1 : 2,
      opacity: dimmed ? 0.4 : 1,
      fillOpacity: dimmed ? 0.15 : 0.7,
    });
    // Outlier ring for |P| >= 2
    if (!dimmed && cs.pScore != null && Math.abs(cs.pScore) >= 2) {
      const ringColor = Math.abs(cs.pScore) >= 3 ? '#DC2626' : '#D97706';
      const ring = L.circleMarker(coords, { radius: radius + 4, fillColor: 'transparent', color: ringColor, weight: Math.abs(cs.pScore) >= 3 ? 3 : 2, opacity: 0.8, fillOpacity: 0 });
      ring.bindTooltip(`P = ${cs.pScore > 0 ? '+' : ''}${cs.pScore.toFixed(2)} — ${Math.abs(cs.pScore) >= 3 ? 'Extreme outlier' : 'Outlier'}`, { direction: 'top', offset: [0, -radius - 8] });
      mapMarkers.addLayer(ring);
    }
    marker.bindPopup(`
      <div style="font-size:0.85rem;line-height:1.5">
        ${mapSearchKeyword ? _searchPopupHtml(s.iataCode, s.name, dimmed) : `
        <strong>${s.name || s.iataCode} (${s.iataCode})</strong><br>
        Region: ${getStationRegion(s.iataCode) || '—'}${dimmed ? ' <span style="color:#94A3B8">(dimmed)</span>' : ''}<br>
        ${flagHtml}
        ${(() => {
          const logP = cs.logPScore ?? 0;
          const cred = cs.credibility ?? 0;
          let alerts = '';
          if (logP >= 2.0 && cred >= 0.5) alerts += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEE2E2;color:#991B1B">Immediate Action Alert</span> ';
          if ((cs.stationUniqueCount ?? 0) === 0 && (cs.expectedIncidents ?? 0) >= 3.0) alerts += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEF3C7;color:#92400E">Reporting Quality Audit Required</span> ';
          return alerts ? alerts + '<br>' : '';
        })()}
        Risk per Flight: <strong>${cs.riskPerFlight.toFixed(2)}</strong> <span style="color:#9CA3AF">(log: ${cs.logRiskPerFlight.toFixed(2)})</span><br>
        ${cs.saptRiskPerHazard > 0 ? `SAPT-only Severity: <strong>${cs.saptRiskPerHazard.toFixed(2)}</strong> <span style="color:#9CA3AF">(no OAPT dilution)</span><br>` : ''}
        FT P-Score: <strong>${cs.ftPScore != null ? cs.ftPScore.toFixed(3) : '—'}</strong> <span style="color:#9CA3AF">(Freeman-Tukey)</span><br>
        P-Score: <strong style="color:${Math.abs(cs.pScore) >= 3 ? '#DC2626' : Math.abs(cs.pScore) >= 2 ? '#D97706' : '#16A34A'}">${cs.pScore > 0 ? '+' : ''}${cs.pScore.toFixed(2)}</strong> ${Math.abs(cs.pScore) >= 3 ? '⚠ Extreme outlier' : Math.abs(cs.pScore) >= 2 ? '⚠ Outlier' : Math.abs(cs.pScore) >= 1 ? 'Slightly elevated' : 'Within normal range'}<br>
        <div style="margin-top:4px;padding:4px 6px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB;font-size:0.75rem;color:#374151">
          <div><strong>Formula:</strong> weightSum ÷ flightCount × 1,000</div>
          <div style="margin-top:3px"><strong>Weight Sum: ${cs.weightSum.toLocaleString()}</strong> — Sum of weighted OAPT (×1) + SAPT (×50/250/1250) occurrences</div>
          <div style="margin-top:3px"><strong>Flights: ${cs.flightCount.toLocaleString()}</strong></div>
          <div style="margin-top:3px"><strong>Log Risk/Flight: ${cs.logRiskPerFlight.toFixed(3)}</strong> — ln(${cs.riskPerFlight.toFixed(2)} + 1)</div>
        </div>
        <div style="margin-top:4px;padding:4px 6px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB;font-size:0.75rem;color:#374151">
          <strong>Risk Score (Bühlmann): ${cs.finalScore.toFixed(2)}</strong> — ${cs.tier?.tier || '—'} tier<br>
          Credibility Z: ${cs.credibility.toFixed(2)} | Net Avg: ${cs.networkAvgRate.toFixed(2)}<br>
          Risk per Hazards: ${cs.riskPerHazard.toFixed(2)}
        </div>
        ${cs.reportingFlag ? `<span style="font-size:0.75rem;color:#6b7280">Expected ~${cs.expectedIncidents} incidents at network rate</span><br>` : ''}
        ${getPartBList(s).filter(b => b.status === 'complete').map(b =>
      `SP: ${b.serviceProvider || '—'}${b.function ? ` (${b.function})` : ''}`
    ).join('<br>') || 'No SP assessments'}
        `}
      </div>
    `);
    marker.on('click', () => {
      switchToView('detail');
      renderStationDetail(s.iataCode);
    });
    mapMarkers.addLayer(marker);

    if (cs.reportingFlag && !dimmed) {
      const FLAG_DOT_COLORS = {
        'Low Reporting Confidence': '#F59E0B',
        'Insufficient Volume': '#6366F1',
        'No OAPT/SAPT': '#EF4444',
        'No OAPT': '#F59E0B',
        'No SAPT': '#6366F1',
      };
      const flagColor = FLAG_DOT_COLORS[cs.reportingFlag] || '#94A3B8';
      const flagMarker = L.circleMarker(coords, {
        radius: 4,
        fillColor: flagColor,
        color: '#fff',
        weight: 1.5,
        opacity: 1,
        fillOpacity: 1,
      });
      flagMarker.bindTooltip(cs.reportingFlag, { direction: 'top', offset: [0, -radius - 4] });
      mapMarkers.addLayer(flagMarker);
    }
  });

  const legend = document.getElementById('map-legend');
  legend.innerHTML = `<div class="map-gradient-bar-wrap"><div class="map-gradient-bar" style="background:linear-gradient(to right, hsl(120,70%,45%), hsl(60,70%,45%), hsl(0,70%,45%));height:12px;border-radius:3px;flex:1"></div><div style="display:flex;justify-content:space-between;font-size:0.65rem;color:#6b7280;flex:1"><span>Low</span><span>Medium</span><span>High</span><span>Very High</span></div></div> <span class="map-legend-item" style="margin-left:8px"><span class="map-legend-dot" style="background:#EF4444;border-color:#DC2626"></span>No OAPT/SAPT</span> <span class="map-legend-item"><span class="map-legend-dot" style="background:#F59E0B;border-color:#D97706"></span>Low Reporting</span> <span class="map-legend-item"><span class="map-legend-dot" style="background:#6366F1;border-color:#4F46E5"></span>Insufficient Volume</span> <span class="map-legend-item"><span class="map-legend-ring" style="border:2px solid #D97706"></span>P ≥ 2 (Outlier)</span> <span class="map-legend-item"><span class="map-legend-ring" style="border:3px solid #DC2626"></span>P ≥ 3 (Extreme)</span>`;

  const scored = stationRisks.length;
  const flagged = stationRisks.filter(r => r.cs.reportingFlag).length;
  const lowReporting = stationRisks.filter(r => r.cs.reportingFlag === 'Low Reporting Confidence').length;
  const totalWeight = stationRisks.reduce((sum, r) => sum + r.cs.weightSum, 0);
  const avgRPF = stationRisks.length ? stationRisks.reduce((sum, r) => sum + r.cs.riskPerFlight, 0) / stationRisks.length : 0;
  document.getElementById('map-stats').innerHTML =
    `<span>${scored} stations</span> · <span>${totalWeight.toLocaleString()} weight</span> · <span>Avg: ${avgRPF.toFixed(1)}</span>${flagged ? ` · <span style="color:#D97706">${flagged} flagged (${lowReporting} low reporting)</span>` : ''}`;

  const regionMap = {};
  stationRisks.forEach(r => {
    const reg = getStationRegion(r.s.iataCode) || 'Unassigned';
    if (!regionMap[reg]) regionMap[reg] = { stations: 0, totalRPF: 0, flagged: 0 };
    regionMap[reg].stations++;
    regionMap[reg].totalRPF += r.cs.riskPerFlight;
    if (r.cs.reportingFlag) regionMap[reg].flagged++;
  });
  const regionHtml = Object.entries(regionMap).sort((a, b) => (b[1].totalRPF / b[1].stations) - (a[1].totalRPF / a[1].stations)).map(([reg, d]) => {
    const avg = d.totalRPF / d.stations;
    const t = avg <= 10 ? 'tier-low' : avg <= 50 ? 'tier-medium' : avg <= 150 ? 'tier-high' : 'tier-very-high';
    return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:0.75rem;margin-right:10px"><span class="tier-badge ${t}" style="padding:1px 6px">${avg.toFixed(1)}</span>${reg} <span style="color:#9CA3AF">(${d.stations}${d.flagged ? ' · ' + d.flagged + ' flagged' : ''})</span></span>`;
  }).join('');
  document.getElementById('map-legend').insertAdjacentHTML('afterend', `<div id="map-region-summary" style="display:flex;flex-wrap:wrap;gap:2px 0;margin-top:6px;padding:4px 8px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB"><span style="font-size:0.7rem;font-weight:600;color:#374151;margin-right:8px">By Region:</span>${regionHtml}</div>`);
  updateMapDistribution('risk-flight', allScores);
}

// ─── Map: Log Risk Mode ──────────────────────────────────────────────────────

function renderMapRiskLogMode(stations, regFilter) {
  if (typeof CRS_MERGED_REPORTS === 'undefined') return;

  const airlineFilter = (document.getElementById('map-airline')?.value || '').trim();
  const aircraftFilter = (document.getElementById('map-aircraft')?.value || '').trim();
  const dateFrom = document.getElementById('map-issues-date-from')?.value || '';
  const dateTo = document.getElementById('map-issues-date-to')?.value || '';
  ensureIcaoGlobal();

  const allScores = _computeAllRiskScores(dateFrom || undefined, dateTo || undefined);

  const stationRisks = [];
  let maxVal = 1;
  allScores.forEach((cs, iata) => {
    const coords = STATION_COORDS[iata];
    if (!coords) return;
    if (!cs || cs.logBlended === 0) return;
    if (cs.logBlended > maxVal) maxVal = cs.logBlended;
    const formStation = stations.find(s => s.iataCode === iata);
    const s = formStation || { iataCode: iata, name: iata, partA: { scores: {} }, partB: [], partC: { scores: {} } };
    stationRisks.push({ s, coords, cs });
  });

  const topStations = applyMapTopN(stationRisks, x => x.cs?.logBlended ?? 0);
  topStations.forEach(({ s, coords, cs }) => {
    const inRegion = !regFilter || getStationRegion(s.iataCode) === regFilter;
    const dimmed = (regFilter && !inRegion) || (mapSearchMatches && !mapSearchMatches.has(s.iataCode));

    if (!stationMatchesCrsFilters(s.iataCode, airlineFilter, aircraftFilter)) return;

    const val = cs.logBlended;
    const colors = val > 0 && maxVal > 1 ? getGradientColor(val, maxVal) : { fill: '#94A3B8', border: '#64748B' };
    const norm = Math.min(val / maxVal, 1);
    const baseRadius = 6 + norm * 18;
    const radius = dimmed ? Math.max(4, baseRadius * 0.5) : baseRadius;

    const FLAG_STYLES = {
      'Low Reporting Confidence': '#FEF3C7;color:#92400E',
      'Insufficient Volume': '#E0E7FF;color:#3730A3',
      'No OAPT/SAPT': '#FEE2E2;color:#991B1B',
      'No OAPT': '#FDE68A;color:#92400E',
      'No SAPT': '#E0E7FF;color:#3730A3',
    };
    const flagHtml = cs.reportingFlag
      ? `<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:600;background:${FLAG_STYLES[cs.reportingFlag] || '#F3F4F6;color:#374151'}">${cs.reportingFlag}</span><br>`
      : '';

    let filteredCrsCount = 0;
    if (airlineFilter || aircraftFilter) {
      const matchingIcaos2 = new Set([s.iataCode, 'C' + s.iataCode, 'K' + s.iataCode]);
      Object.entries(ICAO_TO_IATA_GLOBAL).forEach(([icao, iata2]) => { if (iata2 === s.iataCode) matchingIcaos2.add(icao); });
      filteredCrsCount = CRS_MERGED_REPORTS.filter(r =>
        matchingIcaos2.has(r.c) &&
        crsMatchesAirline(r, airlineFilter) &&
        crsMatchesAircraft(r, aircraftFilter)
      ).length;
    }

    const marker = L.circleMarker(coords, {
      radius,
      fillColor: dimmed ? '#CBD5E1' : colors.fill,
      color: dimmed ? '#94A3B8' : colors.border,
      weight: dimmed ? 1 : 2,
      opacity: dimmed ? 0.4 : 1,
      fillOpacity: dimmed ? 0.15 : 0.7,
    });
    // Outlier ring for |logP| >= 2
    if (!dimmed && cs.logPScore != null && Math.abs(cs.logPScore) >= 2) {
      const ringColor = Math.abs(cs.logPScore) >= 3 ? '#DC2626' : '#D97706';
      const ring = L.circleMarker(coords, { radius: radius + 4, fillColor: 'transparent', color: ringColor, weight: Math.abs(cs.logPScore) >= 3 ? 3 : 2, opacity: 0.8, fillOpacity: 0 });
      ring.bindTooltip(`Log P = ${cs.logPScore > 0 ? '+' : ''}${cs.logPScore.toFixed(2)} — ${Math.abs(cs.logPScore) >= 3 ? 'Extreme outlier' : 'Outlier'}`, { direction: 'top', offset: [0, -radius - 8] });
      mapMarkers.addLayer(ring);
    }
    marker.bindPopup(`
      <div style="font-size:0.85rem;line-height:1.5">
        ${mapSearchKeyword ? _searchPopupHtml(s.iataCode, s.name, dimmed) : `
        <strong>${s.name || s.iataCode} (${s.iataCode})</strong><br>
        Region: ${getStationRegion(s.iataCode) || '—'}${dimmed ? ' <span style="color:#94A3B8">(dimmed)</span>' : ''}<br>
        ${flagHtml}
        ${(() => {
          const logP = cs.logPScore ?? 0;
          const cred = cs.credibility ?? 0;
          let alerts = '';
          if (logP >= 2.0 && cred >= 0.5) alerts += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEE2E2;color:#991B1B">Immediate Action Alert</span> ';
          if ((cs.stationUniqueCount ?? 0) === 0 && (cs.expectedIncidents ?? 0) >= 3.0) alerts += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEF3C7;color:#92400E">Reporting Quality Audit Required</span> ';
          return alerts ? alerts + '<br>' : '';
        })()}
        Log Blended: <strong>${cs.logBlended.toFixed(3)}</strong> (ln(${cs.finalScore.toFixed(2)} + 1))<br>
        Log Raw: <strong>${cs.logRate.toFixed(3)}</strong> (ln(${cs.rawRate.toFixed(2)} + 1))<br>
        ${cs.saptRiskPerHazard > 0 ? `SAPT-only Severity: <strong>${cs.saptRiskPerHazard.toFixed(2)}</strong> <span style="color:#9CA3AF">(no OAPT dilution)</span><br>` : ''}
        FT P-Score: <strong>${cs.ftPScore != null ? cs.ftPScore.toFixed(3) : '—'}</strong> <span style="color:#9CA3AF">(Freeman-Tukey)</span><br>
        Log P-Score: <strong style="color:${Math.abs(cs.logPScore) >= 3 ? '#DC2626' : Math.abs(cs.logPScore) >= 2 ? '#D97706' : '#16A34A'}">${cs.logPScore > 0 ? '+' : ''}${cs.logPScore.toFixed(2)}</strong> ${Math.abs(cs.logPScore) >= 3 ? '⚠ Extreme outlier' : Math.abs(cs.logPScore) >= 2 ? '⚠ Outlier' : Math.abs(cs.logPScore) >= 1 ? 'Slightly elevated' : 'Within normal range'}<br>
        Tier: ${cs.tier ? `<span style="display:inline-block;padding:0 6px;border-radius:3px;background:${colors.fill};color:#fff;font-weight:600">${cs.tier.tier}</span>` : '—'}<br>
        <div style="margin-top:4px;padding:4px 6px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB;font-size:0.75rem;color:#374151">
          <div><strong>Formula:</strong> ln(rawRate + 1) → Bühlmann blended → ln(blendedScore + 1)</div>
          <div style="margin-top:3px"><strong>Raw Rate: ${cs.rawRate.toFixed(2)}</strong> per 1k flights</div>
          <div style="margin-top:3px"><strong>Blended: ${cs.finalScore.toFixed(2)}</strong> (Bühlmann, Z=${cs.credibility.toFixed(2)})</div>
          <div style="margin-top:3px"><strong>Log Mean: ${cs.logNetworkMean.toFixed(3)}</strong> · Log σ: ${cs.logNetworkStdDev.toFixed(3)}</div>
        </div>
        ${cs.flightCount ? `<span style="font-size:0.75rem;color:#6b7280">Total Flights: ${cs.flightCount.toLocaleString()}</span>${(airlineFilter || aircraftFilter) && filteredCrsCount > 0 ? ` <span style="color:#6b7280;font-size:0.75rem">(${filteredCrsCount} matching CRS records)</span>` : ''}<br>` : ''}
        ${cs.reportingFlag ? `<span style="font-size:0.75rem;color:#6b7280">Expected ~${cs.expectedIncidents} incidents at network rate</span><br>` : ''}
        ${getPartBList(s).filter(b => b.status === 'complete').map(b =>
      `SP: ${b.serviceProvider || '—'}${b.function ? ` (${b.function})` : ''}`
    ).join('<br>') || 'No SP assessments'}
        `}
      </div>
    `);
    marker.on('click', () => {
      switchToView('detail');
      renderStationDetail(s.iataCode);
    });
    mapMarkers.addLayer(marker);

    if (cs.reportingFlag && !dimmed) {
      const FLAG_DOT_COLORS = {
        'Low Reporting Confidence': '#F59E0B',
        'Insufficient Volume': '#6366F1',
        'No OAPT/SAPT': '#EF4444',
        'No OAPT': '#F59E0B',
        'No SAPT': '#6366F1',
      };
      const flagColor = FLAG_DOT_COLORS[cs.reportingFlag] || '#94A3B8';
      const flagMarker = L.circleMarker(coords, {
        radius: 4,
        fillColor: flagColor,
        color: '#fff',
        weight: 1.5,
        opacity: 1,
        fillOpacity: 1,
      });
      flagMarker.bindTooltip(cs.reportingFlag, { direction: 'top', offset: [0, -radius - 4] });
      mapMarkers.addLayer(flagMarker);
    }
  });

  const legend = document.getElementById('map-legend');
  legend.innerHTML = `<div class="map-gradient-bar-wrap"><div class="map-gradient-bar" style="background:linear-gradient(to right, hsl(120,70%,45%), hsl(60,70%,45%), hsl(0,70%,45%));height:12px;border-radius:3px;flex:1"></div><div style="display:flex;justify-content:space-between;font-size:0.65rem;color:#6b7280;flex:1"><span>Low</span><span>Medium</span><span>High</span><span>Very High</span></div></div> <span class="map-legend-item" style="margin-left:8px"><span class="map-legend-dot" style="background:#EF4444;border-color:#DC2626"></span>No OAPT/SAPT</span> <span class="map-legend-item"><span class="map-legend-dot" style="background:#F59E0B;border-color:#D97706"></span>Low Reporting</span> <span class="map-legend-item"><span class="map-legend-dot" style="background:#6366F1;border-color:#4F46E5"></span>Insufficient Volume</span> <span class="map-legend-item"><span class="map-legend-ring" style="border:2px solid #D97706"></span>Log P ≥ 2</span> <span class="map-legend-item"><span class="map-legend-ring" style="border:3px solid #DC2626"></span>Log P ≥ 3</span>`;

  const scored = stationRisks.length;
  const flagged = stationRisks.filter(r => r.cs.reportingFlag).length;
  const lowReporting = stationRisks.filter(r => r.cs.reportingFlag === 'Low Reporting Confidence').length;
  const totalWeight = stationRisks.reduce((sum, r) => sum + r.cs.weightSum, 0);
  const avgLog = stationRisks.length ? stationRisks.reduce((sum, r) => sum + r.cs.logBlended, 0) / stationRisks.length : 0;
  const netLogMean = stationRisks.length ? stationRisks[0].cs.logNetworkMean : 0;
  const netLogStd = stationRisks.length ? stationRisks[0].cs.logNetworkStdDev : 0;
  document.getElementById('map-stats').innerHTML =
    `<span>${scored} stations</span> · <span>${totalWeight.toLocaleString()} weight</span> · <span>μ(log) = ${netLogMean.toFixed(3)}</span> · <span>σ(log) = ${netLogStd.toFixed(3)}</span> · <span>Avg: ${avgLog.toFixed(3)}</span>${flagged ? ` · <span style="color:#D97706">${flagged} flagged (${lowReporting} low reporting)</span>` : ''}`;

  const regionMap = {};
  stationRisks.forEach(r => {
    const reg = getStationRegion(r.s.iataCode) || 'Unassigned';
    if (!regionMap[reg]) regionMap[reg] = { stations: 0, totalLog: 0, flagged: 0 };
    regionMap[reg].stations++;
    regionMap[reg].totalLog += r.cs.logBlended;
    if (r.cs.reportingFlag) regionMap[reg].flagged++;
  });
  const regionHtml = Object.entries(regionMap).sort((a, b) => (b[1].totalLog / b[1].stations) - (a[1].totalLog / a[1].stations)).map(([reg, d]) => {
    const avg = d.totalLog / d.stations;
    const t = avg <= 2 ? 'tier-low' : avg <= 4 ? 'tier-medium' : avg <= 5.5 ? 'tier-high' : 'tier-very-high';
    return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:0.75rem;margin-right:10px"><span class="tier-badge ${t}" style="padding:1px 6px">${avg.toFixed(2)}</span>${reg} <span style="color:#9CA3AF">(${d.stations}${d.flagged ? ' · ' + d.flagged + ' flagged' : ''})</span></span>`;
  }).join('');
  document.getElementById('map-legend').insertAdjacentHTML('afterend', `<div id="map-region-summary" style="display:flex;flex-wrap:wrap;gap:2px 0;margin-top:6px;padding:4px 8px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB"><span style="font-size:0.7rem;font-weight:600;color:#374151;margin-right:8px">By Region:</span>${regionHtml}</div>`);
  updateMapDistribution('risk-log', allScores);
}

// ─── Map: Log Risk per Hazard Mode ────────────────────────────────────────────

function renderMapLogRiskHazardMode(stations, regFilter) {
  if (typeof CRS_MERGED_REPORTS === 'undefined') return;

  const airlineFilter = (document.getElementById('map-airline')?.value || '').trim();
  const aircraftFilter = (document.getElementById('map-aircraft')?.value || '').trim();
  const dateFrom = document.getElementById('map-issues-date-from')?.value || '';
  const dateTo = document.getElementById('map-issues-date-to')?.value || '';
  ensureIcaoGlobal();

  const allScores = _computeAllRiskScores(dateFrom || undefined, dateTo || undefined);

  const stationRisks = [];
  let maxVal = 1;
  allScores.forEach((cs, iata) => {
    const coords = STATION_COORDS[iata];
    if (!coords) return;
    if (!cs || cs.logRiskPerHazard === 0) return;
    if (cs.logRiskPerHazard > maxVal) maxVal = cs.logRiskPerHazard;
    const formStation = stations.find(s => s.iataCode === iata);
    const s = formStation || { iataCode: iata, name: iata, partA: { scores: {} }, partB: [], partC: { scores: {} } };
    stationRisks.push({ s, coords, cs });
  });

  const topStations = applyMapTopN(stationRisks, x => x.cs?.logRiskPerHazard ?? 0);
  topStations.forEach(({ s, coords, cs }) => {
    const inRegion = !regFilter || getStationRegion(s.iataCode) === regFilter;
    const dimmed = (regFilter && !inRegion) || (mapSearchMatches && !mapSearchMatches.has(s.iataCode));

    if (!stationMatchesCrsFilters(s.iataCode, airlineFilter, aircraftFilter)) return;

    const val = cs.logRiskPerHazard;
    const colors = val > 0 && maxVal > 1 ? getGradientColor(val, maxVal) : { fill: '#94A3B8', border: '#64748B' };
    const norm = Math.min(val / maxVal, 1);
    const baseRadius = 6 + norm * 18;
    const radius = dimmed ? Math.max(4, baseRadius * 0.5) : baseRadius;

    const FLAG_STYLES = {
      'Low Reporting Confidence': '#FEF3C7;color:#92400E',
      'Insufficient Volume': '#E0E7FF;color:#3730A3',
      'No OAPT/SAPT': '#FEE2E2;color:#991B1B',
      'No OAPT': '#FDE68A;color:#92400E',
      'No SAPT': '#E0E7FF;color:#3730A3',
    };
    const flagHtml = cs.reportingFlag
      ? `<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:600;background:${FLAG_STYLES[cs.reportingFlag] || '#F3F4F6;color:#374151'}">${cs.reportingFlag}</span><br>`
      : '';

    let filteredCrsCount = 0;
    if (airlineFilter || aircraftFilter) {
      const matchingIcaos2 = new Set([s.iataCode, 'C' + s.iataCode, 'K' + s.iataCode]);
      Object.entries(ICAO_TO_IATA_GLOBAL).forEach(([icao, iata2]) => { if (iata2 === s.iataCode) matchingIcaos2.add(icao); });
      filteredCrsCount = CRS_MERGED_REPORTS.filter(r =>
        matchingIcaos2.has(r.c) &&
        crsMatchesAirline(r, airlineFilter) &&
        crsMatchesAircraft(r, aircraftFilter)
      ).length;
    }

    const marker = L.circleMarker(coords, {
      radius,
      fillColor: dimmed ? '#CBD5E1' : colors.fill,
      color: dimmed ? '#94A3B8' : colors.border,
      weight: dimmed ? 1 : 2,
      opacity: dimmed ? 0.4 : 1,
      fillOpacity: dimmed ? 0.15 : 0.7,
    });
    if (!dimmed && cs.pScore != null && Math.abs(cs.pScore) >= 2) {
      const ringColor = Math.abs(cs.pScore) >= 3 ? '#DC2626' : '#D97706';
      const ring = L.circleMarker(coords, { radius: radius + 4, fillColor: 'transparent', color: ringColor, weight: Math.abs(cs.pScore) >= 3 ? 3 : 2, opacity: 0.8, fillOpacity: 0 });
      ring.bindTooltip(`P = ${cs.pScore > 0 ? '+' : ''}${cs.pScore.toFixed(2)} — ${Math.abs(cs.pScore) >= 3 ? 'Extreme outlier' : 'Outlier'}`, { direction: 'top', offset: [0, -radius - 8] });
      mapMarkers.addLayer(ring);
    }
    marker.bindPopup(`
      <div style="font-size:0.85rem;line-height:1.5">
        ${mapSearchKeyword ? _searchPopupHtml(s.iataCode, s.name, dimmed) : `
        <strong>${s.name || s.iataCode} (${s.iataCode})</strong><br>
        Region: ${getStationRegion(s.iataCode) || '—'}${dimmed ? ' <span style="color:#94A3B8">(dimmed)</span>' : ''}<br>
        ${flagHtml}
        ${(() => {
          const logP = cs.logPScore ?? 0;
          const cred = cs.credibility ?? 0;
          let alerts = '';
          if (logP >= 2.0 && cred >= 0.5) alerts += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEE2E2;color:#991B1B">Immediate Action Alert</span> ';
          if ((cs.stationUniqueCount ?? 0) === 0 && (cs.expectedIncidents ?? 0) >= 3.0) alerts += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEF3C7;color:#92400E">Reporting Quality Audit Required</span> ';
          return alerts ? alerts + '<br>' : '';
        })()}
        Log Risk/Hazard: <strong>${cs.logRiskPerHazard.toFixed(3)}</strong> (ln(${cs.riskPerHazard.toFixed(2)} + 1))<br>
        Raw Risk/Hazard: <strong>${cs.riskPerHazard.toFixed(2)}</strong><br>
        ${cs.saptRiskPerHazard > 0 ? `SAPT-only Severity: <strong>${cs.saptRiskPerHazard.toFixed(2)}</strong> <span style="color:#9CA3AF">(no OAPT dilution)</span><br>` : ''}
        FT P-Score: <strong>${cs.ftPScore != null ? cs.ftPScore.toFixed(3) : '—'}</strong> <span style="color:#9CA3AF">(Freeman-Tukey)</span><br>
        P-Score: <strong style="color:${Math.abs(cs.pScore) >= 3 ? '#DC2626' : Math.abs(cs.pScore) >= 2 ? '#D97706' : '#16A34A'}">${cs.pScore > 0 ? '+' : ''}${cs.pScore.toFixed(2)}</strong> ${Math.abs(cs.pScore) >= 3 ? '⚠ Extreme outlier' : Math.abs(cs.pScore) >= 2 ? '⚠ Outlier' : Math.abs(cs.pScore) >= 1 ? 'Slightly elevated' : 'Within normal range'}<br>
        <div style="margin-top:4px;padding:4px 6px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB;font-size:0.75rem;color:#374151">
          <div><strong>Formula:</strong> ln(weightSum ÷ occCount × 1,000 + 1)</div>
          <div style="margin-top:3px"><strong>Weight Sum: ${cs.weightSum.toLocaleString()}</strong> — Sum of weighted OAPT (×1) + SAPT (×50/250/1250) occurrences</div>
          <div style="margin-top:3px"><strong>Occurrences: ${cs.stationUniqueCount}</strong> — Unique OAPT+SAPT OccNos at this station</div>
          <div style="margin-top:3px"><strong>Avg Weight/Occ: ${(cs.weightSum / cs.stationUniqueCount).toFixed(2)}</strong> — Average severity per hazard</div>
        </div>
        <div style="margin-top:4px;padding:4px 6px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB;font-size:0.75rem;color:#374151">
          <strong>Risk Score (Bühlmann): ${cs.finalScore.toFixed(2)}</strong> — ${cs.tier?.tier || '—'} tier<br>
          Credibility Z: ${cs.credibility.toFixed(2)} | Net Avg: ${cs.networkAvgRate.toFixed(2)}
        </div>
        ${cs.flightCount ? `<span style="font-size:0.75rem;color:#6b7280">Total Flights: ${cs.flightCount.toLocaleString()}</span>${(airlineFilter || aircraftFilter) && filteredCrsCount > 0 ? ` <span style="color:#6b7280;font-size:0.75rem">(${filteredCrsCount} matching CRS records)</span>` : ''}<br>` : ''}
        ${cs.reportingFlag ? `<span style="font-size:0.75rem;color:#6b7280">Expected ~${cs.expectedIncidents} incidents at network rate</span><br>` : ''}
        ${getPartBList(s).filter(b => b.status === 'complete').map(b =>
      `SP: ${b.serviceProvider || '—'}${b.function ? ` (${b.function})` : ''}`
    ).join('<br>') || 'No SP assessments'}
        `}
      </div>
    `);
    marker.on('click', () => {
      switchToView('detail');
      renderStationDetail(s.iataCode);
    });
    mapMarkers.addLayer(marker);

    if (cs.reportingFlag && !dimmed) {
      const FLAG_DOT_COLORS = {
        'Low Reporting Confidence': '#F59E0B',
        'Insufficient Volume': '#6366F1',
        'No OAPT/SAPT': '#EF4444',
        'No OAPT': '#F59E0B',
        'No SAPT': '#6366F1',
      };
      const flagColor = FLAG_DOT_COLORS[cs.reportingFlag] || '#94A3B8';
      const flagMarker = L.circleMarker(coords, {
        radius: 4,
        fillColor: flagColor,
        color: '#fff',
        weight: 1.5,
        opacity: 1,
        fillOpacity: 1,
      });
      flagMarker.bindTooltip(cs.reportingFlag, { direction: 'top', offset: [0, -radius - 4] });
      mapMarkers.addLayer(flagMarker);
    }
  });

  const legend = document.getElementById('map-legend');
  legend.innerHTML = `<div class="map-gradient-bar-wrap"><div class="map-gradient-bar" style="background:linear-gradient(to right, hsl(120,70%,45%), hsl(60,70%,45%), hsl(0,70%,45%));height:12px;border-radius:3px;flex:1"></div><div style="display:flex;justify-content:space-between;font-size:0.65rem;color:#6b7280;flex:1"><span>Low</span><span>Medium</span><span>High</span><span>Very High</span></div></div> <span class="map-legend-item" style="margin-left:8px"><span class="map-legend-dot" style="background:#EF4444;border-color:#DC2626"></span>No OAPT/SAPT</span> <span class="map-legend-item"><span class="map-legend-dot" style="background:#F59E0B;border-color:#D97706"></span>Low Reporting</span> <span class="map-legend-item"><span class="map-legend-dot" style="background:#6366F1;border-color:#4F46E5"></span>Insufficient Volume</span> <span class="map-legend-item"><span class="map-legend-ring" style="border:2px solid #D97706"></span>P ≥ 2 (Outlier)</span> <span class="map-legend-item"><span class="map-legend-ring" style="border:3px solid #DC2626"></span>P ≥ 3 (Extreme)</span>`;

  const scored = stationRisks.length;
  const flagged = stationRisks.filter(r => r.cs.reportingFlag).length;
  const lowReporting = stationRisks.filter(r => r.cs.reportingFlag === 'Low Reporting Confidence').length;
  const totalWeight = stationRisks.reduce((sum, r) => sum + r.cs.weightSum, 0);
  const avgLog = stationRisks.length ? stationRisks.reduce((sum, r) => sum + r.cs.logRiskPerHazard, 0) / stationRisks.length : 0;
  document.getElementById('map-stats').innerHTML =
    `<span>${scored} stations</span> · <span>${totalWeight.toLocaleString()} weight</span> · <span>Avg ln: ${avgLog.toFixed(3)}</span>${flagged ? ` · <span style="color:#D97706">${flagged} flagged (${lowReporting} low reporting)</span>` : ''}`;

  const regionMap = {};
  stationRisks.forEach(r => {
    const reg = getStationRegion(r.s.iataCode) || 'Unassigned';
    if (!regionMap[reg]) regionMap[reg] = { stations: 0, totalLogRH: 0, flagged: 0 };
    regionMap[reg].stations++;
    regionMap[reg].totalLogRH += r.cs.logRiskPerHazard;
    if (r.cs.reportingFlag) regionMap[reg].flagged++;
  });
  const regionHtml = Object.entries(regionMap).sort((a, b) => (b[1].totalLogRH / b[1].stations) - (a[1].totalLogRH / a[1].stations)).map(([reg, d]) => {
    const avg = d.totalLogRH / d.stations;
    const t = avg <= 2 ? 'tier-low' : avg <= 3 ? 'tier-medium' : avg <= 4 ? 'tier-high' : 'tier-very-high';
    return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:0.75rem;margin-right:10px"><span class="tier-badge ${t}" style="padding:1px 6px">${avg.toFixed(2)}</span>${reg} <span style="color:#9CA3AF">(${d.stations}${d.flagged ? ' · ' + d.flagged + ' flagged' : ''})</span></span>`;
  }).join('');
  document.getElementById('map-legend').insertAdjacentHTML('afterend', `<div id="map-region-summary" style="display:flex;flex-wrap:wrap;gap:2px 0;margin-top:6px;padding:4px 8px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB"><span style="font-size:0.7rem;font-weight:600;color:#374151;margin-right:8px">By Region:</span>${regionHtml}</div>`);
  updateMapDistribution('risk-log-hazard', allScores);
}

// ─── Map: Log Risk per Flight Mode ────────────────────────────────────────────

function renderMapLogRiskFlightMode(stations, regFilter) {
  if (typeof CRS_MERGED_REPORTS === 'undefined') return;

  const airlineFilter = (document.getElementById('map-airline')?.value || '').trim();
  const aircraftFilter = (document.getElementById('map-aircraft')?.value || '').trim();
  const dateFrom = document.getElementById('map-issues-date-from')?.value || '';
  const dateTo = document.getElementById('map-issues-date-to')?.value || '';
  ensureIcaoGlobal();

  const allScores = _computeAllRiskScores(dateFrom || undefined, dateTo || undefined);

  const stationRisks = [];
  let maxVal = 1;
  allScores.forEach((cs, iata) => {
    const coords = STATION_COORDS[iata];
    if (!coords) return;
    if (!cs || !cs.flightCount || cs.logRiskPerFlight === 0) return;
    if (cs.logRiskPerFlight > maxVal) maxVal = cs.logRiskPerFlight;
    const formStation = stations.find(s => s.iataCode === iata);
    const s = formStation || { iataCode: iata, name: iata, partA: { scores: {} }, partB: [], partC: { scores: {} } };
    stationRisks.push({ s, coords, cs });
  });

  const topStations = applyMapTopN(stationRisks, x => x.cs?.logRiskPerFlight ?? 0);
  topStations.forEach(({ s, coords, cs }) => {
    const inRegion = !regFilter || getStationRegion(s.iataCode) === regFilter;
    const dimmed = (regFilter && !inRegion) || (mapSearchMatches && !mapSearchMatches.has(s.iataCode));

    if (!stationMatchesCrsFilters(s.iataCode, airlineFilter, aircraftFilter)) return;

    const val = cs.logRiskPerFlight;
    const colors = val > 0 && maxVal > 1 ? getGradientColor(val, maxVal) : { fill: '#94A3B8', border: '#64748B' };
    const norm = Math.min(val / maxVal, 1);
    const baseRadius = 6 + norm * 18;
    const radius = dimmed ? Math.max(4, baseRadius * 0.5) : baseRadius;

    const FLAG_STYLES = {
      'Low Reporting Confidence': '#FEF3C7;color:#92400E',
      'Insufficient Volume': '#E0E7FF;color:#3730A3',
      'No OAPT/SAPT': '#FEE2E2;color:#991B1B',
      'No OAPT': '#FDE68A;color:#92400E',
      'No SAPT': '#E0E7FF;color:#3730A3',
    };
    const flagHtml = cs.reportingFlag
      ? `<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:600;background:${FLAG_STYLES[cs.reportingFlag] || '#F3F4F6;color:#374151'}">${cs.reportingFlag}</span><br>`
      : '';

    let filteredCrsCount = 0;
    if (airlineFilter || aircraftFilter) {
      const matchingIcaos2 = new Set([s.iataCode, 'C' + s.iataCode, 'K' + s.iataCode]);
      Object.entries(ICAO_TO_IATA_GLOBAL).forEach(([icao, iata2]) => { if (iata2 === s.iataCode) matchingIcaos2.add(icao); });
      filteredCrsCount = CRS_MERGED_REPORTS.filter(r =>
        matchingIcaos2.has(r.c) &&
        crsMatchesAirline(r, airlineFilter) &&
        crsMatchesAircraft(r, aircraftFilter)
      ).length;
    }

    const marker = L.circleMarker(coords, {
      radius,
      fillColor: dimmed ? '#CBD5E1' : colors.fill,
      color: dimmed ? '#94A3B8' : colors.border,
      weight: dimmed ? 1 : 2,
      opacity: dimmed ? 0.4 : 1,
      fillOpacity: dimmed ? 0.15 : 0.7,
    });
    if (!dimmed && cs.pScore != null && Math.abs(cs.pScore) >= 2) {
      const ringColor = Math.abs(cs.pScore) >= 3 ? '#DC2626' : '#D97706';
      const ring = L.circleMarker(coords, { radius: radius + 4, fillColor: 'transparent', color: ringColor, weight: Math.abs(cs.pScore) >= 3 ? 3 : 2, opacity: 0.8, fillOpacity: 0 });
      ring.bindTooltip(`P = ${cs.pScore > 0 ? '+' : ''}${cs.pScore.toFixed(2)} — ${Math.abs(cs.pScore) >= 3 ? 'Extreme outlier' : 'Outlier'}`, { direction: 'top', offset: [0, -radius - 8] });
      mapMarkers.addLayer(ring);
    }
    marker.bindPopup(`
      <div style="font-size:0.85rem;line-height:1.5">
        ${mapSearchKeyword ? _searchPopupHtml(s.iataCode, s.name, dimmed) : `
        <strong>${s.name || s.iataCode} (${s.iataCode})</strong><br>
        Region: ${getStationRegion(s.iataCode) || '—'}${dimmed ? ' <span style="color:#94A3B8">(dimmed)</span>' : ''}<br>
        ${flagHtml}
        ${(() => {
          const logP = cs.logPScore ?? 0;
          const cred = cs.credibility ?? 0;
          let alerts = '';
          if (logP >= 2.0 && cred >= 0.5) alerts += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEE2E2;color:#991B1B">Immediate Action Alert</span> ';
          if ((cs.stationUniqueCount ?? 0) === 0 && (cs.expectedIncidents ?? 0) >= 3.0) alerts += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEF3C7;color:#92400E">Reporting Quality Audit Required</span> ';
          return alerts ? alerts + '<br>' : '';
        })()}
        Log Risk/Flight: <strong>${cs.logRiskPerFlight.toFixed(3)}</strong> (ln(${cs.riskPerFlight.toFixed(2)} + 1))<br>
        Raw Risk/Flight: <strong>${cs.riskPerFlight.toFixed(2)}</strong><br>
        ${cs.saptRiskPerHazard > 0 ? `SAPT-only Severity: <strong>${cs.saptRiskPerHazard.toFixed(2)}</strong> <span style="color:#9CA3AF">(no OAPT dilution)</span><br>` : ''}
        FT P-Score: <strong>${cs.ftPScore != null ? cs.ftPScore.toFixed(3) : '—'}</strong> <span style="color:#9CA3AF">(Freeman-Tukey)</span><br>
        P-Score: <strong style="color:${Math.abs(cs.pScore) >= 3 ? '#DC2626' : Math.abs(cs.pScore) >= 2 ? '#D97706' : '#16A34A'}">${cs.pScore > 0 ? '+' : ''}${cs.pScore.toFixed(2)}</strong> ${Math.abs(cs.pScore) >= 3 ? '⚠ Extreme outlier' : Math.abs(cs.pScore) >= 2 ? '⚠ Outlier' : Math.abs(cs.pScore) >= 1 ? 'Slightly elevated' : 'Within normal range'}<br>
        <div style="margin-top:4px;padding:4px 6px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB;font-size:0.75rem;color:#374151">
          <div><strong>Formula:</strong> ln(weightSum ÷ flightCount × 1,000 + 1)</div>
          <div style="margin-top:3px"><strong>Weight Sum: ${cs.weightSum.toLocaleString()}</strong> — Sum of weighted OAPT (×1) + SAPT (×50/250/1250) occurrences</div>
          <div style="margin-top:3px"><strong>Flights: ${cs.flightCount.toLocaleString()}</strong></div>
        </div>
        <div style="margin-top:4px;padding:4px 6px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB;font-size:0.75rem;color:#374151">
          <strong>Risk Score (Bühlmann): ${cs.finalScore.toFixed(2)}</strong> — ${cs.tier?.tier || '—'} tier<br>
          Credibility Z: ${cs.credibility.toFixed(2)} | Net Avg: ${cs.networkAvgRate.toFixed(2)}<br>
          Risk per Hazards: ${cs.riskPerHazard.toFixed(2)} · Log: ${cs.logRiskPerHazard.toFixed(3)}
        </div>
        ${cs.flightCount ? `<span style="font-size:0.75rem;color:#6b7280">Total Flights: ${cs.flightCount.toLocaleString()}</span>${(airlineFilter || aircraftFilter) && filteredCrsCount > 0 ? ` <span style="color:#6b7280;font-size:0.75rem">(${filteredCrsCount} matching CRS records)</span>` : ''}<br>` : ''}
        ${cs.reportingFlag ? `<span style="font-size:0.75rem;color:#6b7280">Expected ~${cs.expectedIncidents} incidents at network rate</span><br>` : ''}
        ${getPartBList(s).filter(b => b.status === 'complete').map(b =>
      `SP: ${b.serviceProvider || '—'}${b.function ? ` (${b.function})` : ''}`
    ).join('<br>') || 'No SP assessments'}
        `}
      </div>
    `);
    marker.on('click', () => {
      switchToView('detail');
      renderStationDetail(s.iataCode);
    });
    mapMarkers.addLayer(marker);

    if (cs.reportingFlag && !dimmed) {
      const FLAG_DOT_COLORS = {
        'Low Reporting Confidence': '#F59E0B',
        'Insufficient Volume': '#6366F1',
        'No OAPT/SAPT': '#EF4444',
        'No OAPT': '#F59E0B',
        'No SAPT': '#6366F1',
      };
      const flagColor = FLAG_DOT_COLORS[cs.reportingFlag] || '#94A3B8';
      const flagMarker = L.circleMarker(coords, {
        radius: 4,
        fillColor: flagColor,
        color: '#fff',
        weight: 1.5,
        opacity: 1,
        fillOpacity: 1,
      });
      flagMarker.bindTooltip(cs.reportingFlag, { direction: 'top', offset: [0, -radius - 4] });
      mapMarkers.addLayer(flagMarker);
    }
  });

  const legend = document.getElementById('map-legend');
  legend.innerHTML = `<div class="map-gradient-bar-wrap"><div class="map-gradient-bar" style="background:linear-gradient(to right, hsl(120,70%,45%), hsl(60,70%,45%), hsl(0,70%,45%));height:12px;border-radius:3px;flex:1"></div><div style="display:flex;justify-content:space-between;font-size:0.65rem;color:#6b7280;flex:1"><span>Low</span><span>Medium</span><span>High</span><span>Very High</span></div></div> <span class="map-legend-item" style="margin-left:8px"><span class="map-legend-dot" style="background:#EF4444;border-color:#DC2626"></span>No OAPT/SAPT</span> <span class="map-legend-item"><span class="map-legend-dot" style="background:#F59E0B;border-color:#D97706"></span>Low Reporting</span> <span class="map-legend-item"><span class="map-legend-dot" style="background:#6366F1;border-color:#4F46E5"></span>Insufficient Volume</span> <span class="map-legend-item"><span class="map-legend-ring" style="border:2px solid #D97706"></span>P ≥ 2 (Outlier)</span> <span class="map-legend-item"><span class="map-legend-ring" style="border:3px solid #DC2626"></span>P ≥ 3 (Extreme)</span>`;

  const scored = stationRisks.length;
  const flagged = stationRisks.filter(r => r.cs.reportingFlag).length;
  const lowReporting = stationRisks.filter(r => r.cs.reportingFlag === 'Low Reporting Confidence').length;
  const totalWeight = stationRisks.reduce((sum, r) => sum + r.cs.weightSum, 0);
  const avgLog = stationRisks.length ? stationRisks.reduce((sum, r) => sum + r.cs.logRiskPerFlight, 0) / stationRisks.length : 0;
  document.getElementById('map-stats').innerHTML =
    `<span>${scored} stations</span> · <span>${totalWeight.toLocaleString()} weight</span> · <span>Avg ln: ${avgLog.toFixed(3)}</span>${flagged ? ` · <span style="color:#D97706">${flagged} flagged (${lowReporting} low reporting)</span>` : ''}`;

  const regionMap = {};
  stationRisks.forEach(r => {
    const reg = getStationRegion(r.s.iataCode) || 'Unassigned';
    if (!regionMap[reg]) regionMap[reg] = { stations: 0, totalLogRF: 0, flagged: 0 };
    regionMap[reg].stations++;
    regionMap[reg].totalLogRF += r.cs.logRiskPerFlight;
    if (r.cs.reportingFlag) regionMap[reg].flagged++;
  });
  const regionHtml = Object.entries(regionMap).sort((a, b) => (b[1].totalLogRF / b[1].stations) - (a[1].totalLogRF / a[1].stations)).map(([reg, d]) => {
    const avg = d.totalLogRF / d.stations;
    const t = avg <= 2 ? 'tier-low' : avg <= 3 ? 'tier-medium' : avg <= 4 ? 'tier-high' : 'tier-very-high';
    return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:0.75rem;margin-right:10px"><span class="tier-badge ${t}" style="padding:1px 6px">${avg.toFixed(2)}</span>${reg} <span style="color:#9CA3AF">(${d.stations}${d.flagged ? ' · ' + d.flagged + ' flagged' : ''})</span></span>`;
  }).join('');
  document.getElementById('map-legend').insertAdjacentHTML('afterend', `<div id="map-region-summary" style="display:flex;flex-wrap:wrap;gap:2px 0;margin-top:6px;padding:4px 8px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB"><span style="font-size:0.7rem;font-weight:600;color:#374151;margin-right:8px">By Region:</span>${regionHtml}</div>`);
  updateMapDistribution('risk-log-flight', allScores);
}

// ─── Map: Flight Count Mode ──────────────────────────────────────────────────

function renderMapFlightCountMode(stations, regFilter) {
  const airlineFilter = (document.getElementById('map-airline')?.value || '').trim();
  const aircraftFilter = (document.getElementById('map-aircraft')?.value || '').trim();

  const stationRisks = [];
  let maxVal = 1;
  const seenIatas = new Set();
  stations.forEach(s => {
    const coords = STATION_COORDS[s.iataCode];
    if (!coords) return;
    const fc = getFlightVolume(s);
    if (!fc || fc <= 0) return;
    seenIatas.add(s.iataCode);
    if (fc > maxVal) maxVal = fc;
    stationRisks.push({ s, coords, fc });
  });

  if (typeof FLIGHT_COUNTS !== 'undefined' && FLIGHT_COUNTS) {
    Object.keys(FLIGHT_COUNTS).forEach(iata => {
      if (iata === 'TOTAL' || seenIatas.has(iata)) return;
      const coords = STATION_COORDS[iata];
      if (!coords) return;
      const fc = FLIGHT_COUNTS[iata].total;
      if (!fc || fc <= 0) return;
      const s = emptyStation(iata);
      if (fc > maxVal) maxVal = fc;
      stationRisks.push({ s, coords, fc });
    });
  }

  const topStations = applyMapTopN(stationRisks, x => x.cs?.fc ?? 0);
  topStations.forEach(({ s, coords, fc }) => {
    const inRegion = !regFilter || getStationRegion(s.iataCode) === regFilter;
    const dimmed = (regFilter && !inRegion) || (mapSearchMatches && !mapSearchMatches.has(s.iataCode));

    if (!stationMatchesCrsFilters(s.iataCode, airlineFilter, aircraftFilter)) return;

    const colors = fc > 0 && maxVal > 1 ? getGradientColor(fc, maxVal) : { fill: '#94A3B8', border: '#64748B' };
    const baseRadius = Math.max(2, 28 * Math.sqrt(fc / maxVal));
    const radius = dimmed ? Math.max(4, baseRadius * 0.5) : baseRadius;

    const marker = L.circleMarker(coords, {
      radius,
      fillColor: dimmed ? '#CBD5E1' : colors.fill,
      color: dimmed ? '#94A3B8' : colors.border,
      weight: dimmed ? 1 : 2,
      opacity: dimmed ? 0.4 : 1,
      fillOpacity: dimmed ? 0.15 : 0.7,
    });

    const cs = _computeAllRiskScores().get(s.iataCode);
    marker.bindPopup(`
      <div style="font-size:0.85rem;line-height:1.5">
        ${mapSearchKeyword ? _searchPopupHtml(s.iataCode, s.name, dimmed) : `
        <strong>${s.name || s.iataCode} (${s.iataCode})</strong><br>
        Region: ${getStationRegion(s.iataCode) || '—'}${dimmed ? ' <span style="color:#94A3B8">(dimmed)</span>' : ''}<br>
        Flight Count: <strong>${fc.toLocaleString()}</strong><br>
        ${cs ? `Risk Score: <strong>${cs.finalScore.toFixed(2)}</strong> — ${cs.tier?.tier || '—'} tier<br>
        ${cs.saptRiskPerHazard > 0 ? `SAPT-only Severity: <strong>${cs.saptRiskPerHazard.toFixed(2)}</strong><br>` : ''}
        ${cs.ftPScore != null ? `FT P-Score: <strong>${cs.ftPScore.toFixed(3)}</strong><br>` : ''}
        P-Score: <strong style="color:${Math.abs(cs.pScore) >= 3 ? '#DC2626' : Math.abs(cs.pScore) >= 2 ? '#D97706' : '#16A34A'}">${cs.pScore > 0 ? '+' : ''}${cs.pScore.toFixed(2)}</strong><br>
        ${(() => {
          const logP = cs.logPScore ?? 0;
          const cred = cs.credibility ?? 0;
          let alerts = '';
          if (logP >= 2.0 && cred >= 0.5) alerts += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEE2E2;color:#991B1B">Immediate Action Alert</span> ';
          if ((cs.stationUniqueCount ?? 0) === 0 && (cs.expectedIncidents ?? 0) >= 3.0) alerts += '<span style="display:inline-block;padding:1px 6px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEF3C7;color:#92400E">Reporting Quality Audit Required</span> ';
          return alerts ? alerts + '<br>' : '';
        })()}` : ''}
        ${getPartBList(s).filter(b => b.status === 'complete').map(b =>
      `SP: ${b.serviceProvider || '—'}${b.function ? ` (${b.function})` : ''}`
    ).join('<br>') || 'No SP assessments'}
        `}
      </div>
    `);
    marker.on('click', () => {
      switchToView('detail');
      renderStationDetail(s.iataCode);
    });
    mapMarkers.addLayer(marker);
    if (cs && cs.reportingFlag && !dimmed) {
      const FLAG_DOT_COLORS = {
        'Low Reporting Confidence': '#F59E0B',
        'Insufficient Volume': '#6366F1',
        'No OAPT/SAPT': '#EF4444',
        'No OAPT': '#F59E0B',
        'No SAPT': '#6366F1',
      };
      const flagColor = FLAG_DOT_COLORS[cs.reportingFlag] || '#94A3B8';
      const flagMarker = L.circleMarker(coords, {
        radius: 4,
        fillColor: flagColor,
        color: '#fff',
        weight: 1.5,
        opacity: 1,
        fillOpacity: 1,
      });
      flagMarker.bindTooltip(cs.reportingFlag, { direction: 'top', offset: [0, -radius - 4] });
      mapMarkers.addLayer(flagMarker);
    }
  });

  const legend = document.getElementById('map-legend');
  legend.innerHTML = `<div class="map-gradient-bar-wrap"><div class="map-gradient-bar" style="background:linear-gradient(to right, hsl(120,70%,45%), hsl(60,70%,45%), hsl(0,70%,45%));height:12px;border-radius:3px;flex:1"></div><div style="display:flex;justify-content:space-between;font-size:0.65rem;color:#6b7280;flex:1"><span>Low</span><span>Medium</span><span>High</span><span>Very High</span></div></div>`;

  const scored = stationRisks.length;
  const totalFlights = stationRisks.reduce((sum, r) => sum + r.fc, 0);
  const avgFlights = scored ? totalFlights / scored : 0;
  document.getElementById('map-stats').innerHTML =
    `<span>${scored} stations</span> · <span>${totalFlights.toLocaleString()} total flights</span> · <span>Avg: ${avgFlights.toLocaleString()}</span>`;

  const regionMap = {};
  stationRisks.forEach(r => {
    const reg = getStationRegion(r.s.iataCode) || 'Unassigned';
    if (!regionMap[reg]) regionMap[reg] = { stations: 0, totalFlights: 0 };
    regionMap[reg].stations++;
    regionMap[reg].totalFlights += r.fc;
  });
  const regionHtml = Object.entries(regionMap).sort((a, b) => b[1].totalFlights - a[1].totalFlights).map(([reg, d]) => {
    const avg = d.totalFlights / d.stations;
    const t = avg <= 5000 ? 'tier-low' : avg <= 15000 ? 'tier-medium' : avg <= 30000 ? 'tier-high' : 'tier-very-high';
    return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:0.75rem;margin-right:10px"><span class="tier-badge ${t}" style="padding:1px 6px">${avg.toLocaleString()}</span>${reg} <span style="color:#9CA3AF">(${d.stations} stations · ${d.totalFlights.toLocaleString()} flights)</span></span>`;
  }).join('');
  document.getElementById('map-legend').insertAdjacentHTML('afterend', `<div id="map-region-summary" style="display:flex;flex-wrap:wrap;gap:2px 0;margin-top:6px;padding:4px 8px;background:#F9FAFB;border-radius:4px;border:1px solid #E5E7EB"><span style="font-size:0.7rem;font-weight:600;color:#374151;margin-right:8px">By Region:</span>${regionHtml}</div>`);
  updateMapDistribution('flight-count', stationRisks);
}

// ─── Map: Issues Mode (CRS+OAPT merged data) ────────────────────────────────

const MAP_ISSUE_TYPE_COLORS = {
  ICM: '#3B82F6', CABS: '#22C55E', OSH: '#F97316', OCGO: '#A855F7',
  OAPT: '#EF4444', SINF: '#06B6D4', 'SINF-F': '#84CC16', MINF: '#F59E0B',
  SFLT: '#EC4899', SAPT: '#6366F1', OINF: '#14B8A6', OSHHAZ: '#8B5CF6',
  SIR: '#F43F5E', 'E-SFLT': '#0EA5E9', MAINT: '#78716C', 'SFLT-F': '#D946EF',
  'E-SAPT': '#10B981', 'E-SINF': '#FBBF24', MTCEOP: '#64748B',
};
const MAP_ISSUE_DEFAULT_COLOR = '#94A3B8';

function renderMapIssuesMode(stations, regFilter) {
  if (typeof CRS_MERGED_REPORTS === 'undefined') return;

  const typeFilter = document.getElementById('map-issues-type')?.value || '';
  const descFilter = document.getElementById('map-issues-desc')?.value || '';
  const hfacsFilter = document.getElementById('map-issues-hfacs')?.value || '';
  const airlineFilter = (document.getElementById('map-airline')?.value || '').trim();
  const aircraftFilter = (document.getElementById('map-aircraft')?.value || '').trim();
  const dateFrom = document.getElementById('map-issues-date-from')?.value || '';
  const dateTo = document.getElementById('map-issues-date-to')?.value || '';

  // Filter records
  const filtered = CRS_MERGED_REPORTS.filter(r => {
    if (typeFilter && r.t !== typeFilter) return false;
    if (descFilter && r.d !== descFilter) return false;
    if (hfacsFilter && r.h1 !== hfacsFilter) return false;
    if (airlineFilter && r.al !== airlineFilter) return false;
    if (aircraftFilter && r.ac !== aircraftFilter) return false;
    if (dateFrom || dateTo) {
      const dt = (r.dt || '').substring(0, 10);
      if (!dt) return false;
      if (dateFrom && dt < dateFrom) return false;
      if (dateTo && dt > dateTo) return false;
    }
    return true;
  });

  // Count unique occurrences per airport
  const airportCounts = {};
  const airportTypes = {};
  const airportOccNos = {};
  const airportTypeOccNos = {};
  filtered.forEach(r => {
    const city = r.c;
    if (!city || city === 'ENRTE') return;
    if (!airportOccNos[city]) airportOccNos[city] = new Set();
    if (!airportTypeOccNos[city]) airportTypeOccNos[city] = {};
    const isNew = !airportOccNos[city].has(r.o);
    airportOccNos[city].add(r.o);
    if (isNew) airportCounts[city] = (airportCounts[city] || 0) + 1;
    // Count unique OccNo per type (independent tracking)
    const t = r.t || 'Unknown';
    if (!airportTypeOccNos[city][t]) airportTypeOccNos[city][t] = new Set();
    const typeIsNew = !airportTypeOccNos[city][t].has(r.o);
    airportTypeOccNos[city][t].add(r.o);
    if (typeIsNew) {
      if (!airportTypes[city]) airportTypes[city] = {};
      airportTypes[city][t] = (airportTypes[city][t] || 0) + 1;
    }
  });

  const maxCount = Math.max(...Object.values(airportCounts), 1);

  // Map ICAO → IATA for coordinates (reuse global lookup)
  ensureIcaoGlobal();
  window.ICAO_TO_IATA = ICAO_TO_IATA_GLOBAL;

  // Render issue bubbles
  let totalIssues = 0;
  let totalStations = 0;

  Object.entries(airportCounts).forEach(([icao, count]) => {
    const iata = ICAO_TO_IATA[icao];
    const coords = iata ? STATION_COORDS[iata] : null;
    if (!coords) return;

    totalIssues += count;
    totalStations++;

    const region = getStationRegion(iata);
    const inRegion = !regFilter || region === regFilter;
    const dimmed = (regFilter && !inRegion) || (mapSearchMatches && !mapSearchMatches.has(iata));

    // Find dominant type
    const types = airportTypes[icao] || {};
    const dominantType = Object.entries(types).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';
    const color = MAP_ISSUE_TYPE_COLORS[dominantType] || MAP_ISSUE_DEFAULT_COLOR;

    // Scale radius: sqrt scaling for better visual distribution
    const normCount = count / maxCount;
    const baseRadius = 6 + normCount * 22;
    const radius = dimmed ? Math.max(4, baseRadius * 0.4) : baseRadius;

    const marker = L.circleMarker(coords, {
      radius,
      fillColor: dimmed ? '#CBD5E1' : color,
      color: dimmed ? '#94A3B8' : '#fff',
      weight: dimmed ? 1 : 2,
      opacity: dimmed ? 0.3 : 0.9,
      fillOpacity: dimmed ? 0.1 : 0.55,
    });

    const typeBreakdown = Object.entries(types)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([t, c]) => `<span class="map-popup-type" data-icao="${escHtml(icao)}" data-type="${escHtml(t)}" style="cursor:pointer;display:inline-block;padding:1px 5px;border-radius:3px;background:${MAP_ISSUE_TYPE_COLORS[t] || MAP_ISSUE_DEFAULT_COLOR}22;color:${MAP_ISSUE_TYPE_COLORS[t] || MAP_ISSUE_DEFAULT_COLOR};font-weight:600;font-size:0.75rem;margin:1px">${t}: ${c}</span>`)
      .join(' ');

    const flightTotal = (typeof FLIGHT_COUNTS !== 'undefined' && FLIGHT_COUNTS[iata])
      ? (dateFrom || dateTo ? getFlightVolumeByDate(iata, dateFrom, dateTo) : FLIGHT_COUNTS[iata].total)
      : null;
    marker.bindPopup(`
      <div style="font-size:0.85rem;line-height:1.6;min-width:180px">
        ${mapSearchKeyword ? _searchPopupHtml(iata, iata, dimmed) : `
        <strong>${iata || icao}</strong> ${dimmed ? '<span style="color:#94A3B8">(outside region)</span>' : ''}<br>
        Region: ${region || '—'}<br>
        Total Flights${(dateFrom || dateTo) ? ` (${dateFrom || '…'} to ${dateTo || '…'})` : ''}: <strong>${flightTotal !== null ? flightTotal.toLocaleString() : '—'}</strong><br>
        Total Occurrences: <strong style="color:${color};font-size:1.1rem">${count}</strong><br>
        <div style="margin-top:4px">${typeBreakdown}</div>
        <div style="margin-top:6px;font-size:0.7rem;color:#6b7280">Click a type to view occurrence list</div>
        `}
      </div>
    `);
    marker.on('click', () => {
      switchToView('detail');
      renderStationDetail(iata);
    });
    mapIssuesLayer.addLayer(marker);
  });

  // Delegated click handler for map popup type spans (register once)
  if (!window._mapTypeHandlerAdded) {
    window._mapTypeHandlerAdded = true;
    document.addEventListener('click', function (e) {
      const typeSpan = e.target.closest('.map-popup-type');
      if (!typeSpan) return;
      e.stopPropagation();
      const icao = typeSpan.dataset.icao;
      const type = typeSpan.dataset.type;
      if (!icao || !type) return;

      // Apply same filters as the bubble counts
      const typeFilter = document.getElementById('map-issues-type')?.value || '';
      const descFilter = document.getElementById('map-issues-desc')?.value || '';
      const hfacsFilter = document.getElementById('map-issues-hfacs')?.value || '';
      const dateFrom = document.getElementById('map-issues-date-from')?.value || '';
      const dateTo = document.getElementById('map-issues-date-to')?.value || '';

      const matching = CRS_MERGED_REPORTS.filter(r => {
        if (r.c !== icao) return false;
        if (r.t !== type) return false;
        if (descFilter && r.d !== descFilter) return false;
        if (hfacsFilter && r.h1 !== hfacsFilter) return false;
        if (dateFrom || dateTo) {
          const dt = (r.dt || '').substring(0, 10);
          if (!dt) return false;
          if (dateFrom && dt < dateFrom) return false;
          if (dateTo && dt > dateTo) return false;
        }
        return true;
      });
      const seen = new Set();
      const uniqueOccs = [];
      matching.forEach(r => { if (!seen.has(r.o)) { seen.add(r.o); uniqueOccs.push(r); } });

      const iata = window.ICAO_TO_IATA[icao] || icao;
      showOccNoPopup(`${type} at ${iata} (${icao})`, uniqueOccs);
    });
  }

  // Issues legend — show top types present
  const legend = document.getElementById('map-legend');
  const presentTypes = {};
  const legendOccNos = {};
  filtered.forEach(r => {
    if (r.t) {
      if (!legendOccNos[r.t]) legendOccNos[r.t] = new Set();
      if (!legendOccNos[r.t].has(r.o)) {
        legendOccNos[r.t].add(r.o);
        presentTypes[r.t] = (presentTypes[r.t] || 0) + 1;
      }
    }
  });
  const topTypes = Object.entries(presentTypes).sort((a, b) => b[1] - a[1]).slice(0, 8);

  legend.innerHTML = topTypes.map(([t, c]) => {
    const col = MAP_ISSUE_TYPE_COLORS[t] || MAP_ISSUE_DEFAULT_COLOR;
    return `<span class="map-legend-item"><span class="map-legend-dot" style="background:${col};border-color:${col}"></span>${t} (${c})</span>`;
  }).join('') + `<span class="map-legend-item" style="color:var(--color-text-muted);font-style:italic">Bubble size = issue count</span>`;

  // Stats bar
  const statsEl = document.getElementById('map-stats');
  if (statsEl) {
    statsEl.innerHTML = `<span class="map-stats-text">${totalIssues.toLocaleString()} issues across ${totalStations} airports</span>`;
  }
}

// ─── Map: Region polygon overlay ─────────────────────────────────────────────

function renderMapRegionOverlay(regFilter) {
  const rc = getRegionColors();
  const REGION_HIGHLIGHT_COLORS = {};
  Object.entries(rc).forEach(([region, hex]) => {
    const m = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (m) {
      const [_, r, g, b] = m;
      REGION_HIGHLIGHT_COLORS[region] = {
        fill: `rgba(${parseInt(r, 16)},${parseInt(g, 16)},${parseInt(b, 16)},0.07)`,
        border: `rgba(${parseInt(r, 16)},${parseInt(g, 16)},${parseInt(b, 16)},0.30)`,
      };
    }
  });
  const hc = REGION_HIGHLIGHT_COLORS[regFilter] || { fill: 'rgba(100,116,139,0.07)', border: 'rgba(100,116,139,0.25)' };
  const NAME_NORMALIZE = {
    'Quebec': 'Québec',
    'Newfoundland': 'Newfoundland and Labrador',
  };
  function getGeoFeatures(name) {
    const norm = NAME_NORMALIZE[name] || name;
    if (name === 'United States') {
      const usStates = STATE_PROV_BOUNDARIES.features.filter(f => f.properties.admin === 'United States of America');
      return { type: 'FeatureCollection', features: usStates };
    }
    const prov = STATE_PROV_BOUNDARIES.features.find(f => f.properties.name === norm);
    if (prov) return { type: 'FeatureCollection', features: [prov] };
    const country = COUNTRY_BOUNDARIES.features.find(f => f.properties.admin === norm);
    if (country) return { type: 'FeatureCollection', features: [country] };
    return null;
  }
  const areaNames = REGION_GEO_AREAS[regFilter] || [];
  areaNames.forEach(name => {
    const geojson = getGeoFeatures(name);
    if (!geojson) return;
    L.geoJSON(geojson, {
      style: { color: hc.border, weight: 2, fillColor: hc.fill, fillOpacity: 1 },
      interactive: false,
    }).addTo(window._mapRegionLayer);
  });
  window._mapRegionLabel = L.control({ position: 'topright' });
  window._mapRegionLabel.onAdd = () => {
    const div = L.DomUtil.create('div', 'map-region-label');
    div.innerHTML = `<span>Region: ${regFilter}</span>`;
    return div;
  };
  window._mapRegionLabel.addTo(mapInstance);
}

// Re-render map on filter change
document.addEventListener('change', e => {
  if (e.target.closest('#map-filters')) {
    // Reset filters when switching modes
    if (e.target.id === 'map-mode') {
      const mode = e.target.value;
      if (mode === 'risk') {
        document.getElementById('map-issues-type').value = '';
        document.getElementById('map-issues-desc').value = '';
        document.getElementById('map-issues-hfacs').value = '';
      } else if (mode === 'risk-hazard') {
        document.getElementById('map-analysis').value = 'agg';
        document.getElementById('map-sp').value = '';
      } else {
        document.getElementById('map-analysis').value = 'agg';
        document.getElementById('map-sp').value = '';
        document.getElementById('map-tier').value = '';
      }
    }
    if (e.target.id === 'map-issues-type') {
      updateMapDescFilter(e.target.value);
    }
    renderStationMap();
  }
});

// Map keyword search → re-render (debounced)
let _mapSearchDebounce = null;
document.addEventListener('input', e => {
  if (e.target.id === 'map-keyword-search') {
    clearTimeout(_mapSearchDebounce);
    _mapSearchDebounce = setTimeout(() => renderStationMap(), 300);
  }
});

// Build set of station IATA codes matching a keyword search in CRS+OAPT data
function getMapSearchMatches(keyword) {
  if (!keyword || typeof CRS_MERGED_REPORTS === 'undefined') return null;
  const kw = keyword.toLowerCase();
  const kwRe = new RegExp('\\b' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
  const matched = new Set();
  CRS_MERGED_REPORTS.forEach(r => {
    const inConcerns = r._nLow && kwRe.test(r._nLow);
    const inDesc = r._rdLow && kwRe.test(r._rdLow);
    const inSearch = r._stLow && kwRe.test(r._stLow);
    const inOccNo = r._oLow && kwRe.test(r._oLow);
    if (inConcerns || inDesc || inSearch || inOccNo) {
      const city = (r.c || '').toUpperCase();
      let iata = ICAO_TO_IATA_GLOBAL[city] || null;
      if (!iata && city.length === 3) iata = city;
      if (iata) matched.add(iata);
    }
  });
  return matched;
}

function getCrsMatchesForStation(iata, keyword) {
  if (!keyword || !iata || typeof CRS_MERGED_REPORTS === 'undefined') return [];
  const kw = keyword.toLowerCase();
  const kwRe = new RegExp('\\b' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
  const matchingIcaos = new Set([iata]);
  Object.entries(ICAO_TO_IATA_GLOBAL).forEach(([icao, iata2]) => { if (iata2 === iata) matchingIcaos.add(icao); });
  return CRS_MERGED_REPORTS.filter(r => {
    if (!matchingIcaos.has(r.c)) return false;
    const inConcerns = r._nLow && kwRe.test(r._nLow);
    const inDesc = r._rdLow && kwRe.test(r._rdLow);
    const inSearch = r._stLow && kwRe.test(r._stLow);
    const inOccNo = r._oLow && kwRe.test(r._oLow);
    return inConcerns || inDesc || inSearch || inOccNo;
  });
}

function renderSearchMatchHtml(iata, keyword, maxShow) {
  maxShow = maxShow || 8;
  const matches = getCrsMatchesForStation(iata, keyword);
  if (!matches.length) return '';
  const kw = keyword.toLowerCase();
  const typeColors = { OAPT: '#059669', SAPT: '#D97706', 'E-OAPT': '#2563EB', 'E-SAPT': '#7C3AED', CABS: '#6B7280' };
  const allConcerns = {};
  const typeCounts = {};
  matches.forEach(r => {
    typeCounts[r.t] = (typeCounts[r.t] || 0) + 1;
    (r.n || []).forEach(tag => { allConcerns[tag] = (allConcerns[tag] || 0) + 1; });
  });
  let html = `<div style="font-size:0.85rem;line-height:1.5">`;
  html += `<div style="font-weight:600;margin-bottom:4px;color:#111827">${matches.length} occurrence${matches.length > 1 ? 's' : ''} matching "${keyword}"</div>`;
  const typeSummary = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).map(([t, c]) => {
    const tc = typeColors[t] || '#6B7280';
    return `<span style="display:inline-block;padding:1px 5px;border-radius:3px;background:${tc};color:#fff;font-size:0.65rem;font-weight:600;margin-right:3px">${t}: ${c}</span>`;
  }).join('');
  if (typeSummary) html += `<div style="margin-bottom:4px">${typeSummary}</div>`;
  const topConcerns = Object.entries(allConcerns).sort((a, b) => b[1] - a[1]).slice(0, 10);
  if (topConcerns.length) {
    html += `<div style="margin-bottom:4px;display:flex;flex-wrap:wrap;gap:3px">`;
    topConcerns.forEach(([tag, cnt]) => {
      html += `<span style="display:inline-block;padding:1px 5px;border-radius:3px;background:#F3F4F6;color:#374151;font-size:0.65rem">${tag}${cnt > 1 ? ' ×' + cnt : ''}</span>`;
    });
    html += `</div>`;
  }
  html += `<div style="max-height:180px;overflow-y:auto">`;
  matches.slice(0, maxShow).forEach(r => {
    const typeColor = typeColors[r.t] || '#6B7280';
    const snippet = (r.rd || '').substring(0, 120);
    const highlighted = snippet.replace(new RegExp('\\b' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi'), m => `<mark style="background:#FDE68A;padding:0 1px;border-radius:2px">${m}</mark>`);
    html += `<div style="margin-bottom:4px;padding:3px 0;border-bottom:1px solid #E5E7EB">`;
    html += `<span style="font-weight:600;color:#111827">${r.o || '?'}</span> `;
    html += `<span style="display:inline-block;padding:0 4px;border-radius:3px;background:${typeColor};color:#fff;font-size:0.65rem;font-weight:600">${r.t}</span>`;
    html += ` <span style="color:#6b7280;font-size:0.7rem">${r.dt || ''}</span>`;
    if (snippet) html += `<br><span style="color:#4B5563;font-size:0.7rem;line-height:1.3">${highlighted}${(r.rd || '').length > 120 ? '…' : ''}</span>`;
    html += `</div>`;
  });
  if (matches.length > maxShow) html += `<div style="color:#6b7280;text-align:center">…and ${matches.length - maxShow} more</div>`;
  html += `</div></div>`;
  return html;
}

function _searchPopupHtml(iata, name, dimmed) {
  return `<strong>${name || iata} (${iata})</strong><br>` +
    (dimmed ? `<span style="color:#94A3B8">(dimmed)</span><br>` : '') +
    renderSearchMatchHtml(iata, mapSearchKeyword);
}
// ─── Top N toggle button
document.addEventListener('click', e => {
  if (e.target.id === 'map-top-n') {
    const cycle = [0, 10, 5];
    const idx = cycle.indexOf(mapTopN);
    mapTopN = cycle[(idx + 1) % cycle.length];
    e.target.textContent = mapTopN === 0 ? 'All' : `Top ${mapTopN}`;
    e.target.style.background = mapTopN === 0 ? '' : '#3B82F6';
    e.target.style.color = mapTopN === 0 ? '' : '#fff';
    renderStationMap();
  }
});

function applyMapTopN(arr, sortKey) {
  if (mapTopN <= 0 || arr.length <= mapTopN) return arr;
  return [...arr].sort((a, b) => {
    const va = sortKey(a.cs ?? a) ?? 0;
    const vb = sortKey(b.cs ?? b) ?? 0;
    return vb - va;
  }).slice(0, mapTopN);
}

let advisorCharts = [];

function renderSafetyAdvisors(stations) {
  const list = document.getElementById('dash-advisor-list');
  if (typeof OAPT_REPORTS === 'undefined' || !OAPT_REPORTS.reports) {
    list.innerHTML = '<div class="empty-state">No OAPT report data.</div>';
    return;
  }
  const regionReports = {};
  Object.entries(OAPT_REPORTS.reports).forEach(([iata, reports]) => {
    const reg = getStationRegion(iata);
    if (!reg) return;
    if (!regionReports[reg]) regionReports[reg] = [];
    regionReports[reg].push(...reports);
  });
  const cards = REGION_IDS.map(({ region }) => {
    const asrm = ASRM_MAP[region];
    if (!asrm) return '';
    const reps = regionReports[region] || [];
    const total = reps.length;
    const closed = reps.filter(r => r.l).length;
    const open = total - closed;
    const reporters = new Set(reps.filter(r => r.i).map(r => r.i));
    const repNames = [...reporters].slice(0, 6);
    return `<div class="dash-advisor-card" data-advisor="${asrm.name}" data-region="${region}">
      <div class="dash-advisor-card-head">
        <strong>${asrm.name}</strong>
        <span class="dash-advisor-card-hub">Hub: ${asrm.hub}</span>
      </div>
      <div class="dash-advisor-card-stats">
        <span><b>${total}</b> reports</span>
        <span><b>${closed}</b> closed</span>
        <span><b>${open}</b> open</span>
      </div>
      <div class="dash-advisor-card-advisors">
        ${repNames.map(n => `<span class="dash-advisor-card-pill">${n}</span>`).join('')}
        ${reporters.size > 6 ? `<span class="dash-advisor-card-pill dash-advisor-card-more">+${reporters.size - 6}</span>` : ''}
      </div>
    </div>`;
  }).filter(Boolean).join('');
  list.innerHTML = cards || '<div class="empty-state">No OAPT report data.</div>';
}

function renderReportersPage() {
  if (typeof OAPT_REPORTS === 'undefined' || !OAPT_REPORTS.reports) {
    document.getElementById('reporters-page-list').innerHTML = '<div class="empty-state">No OAPT data available.</div>';
    return;
  }

  const regionFilter = document.getElementById('reporters-page-region')?.value || '';
  const searchFilter = (document.getElementById('reporters-page-search')?.value || '').toLowerCase().trim();

  // Populate region dropdown
  const regSel = document.getElementById('reporters-page-region');
  if (regSel && regSel.options.length <= 1) {
    const regions = getActiveRegions();
    regSel.innerHTML = '<option value="">All Regions</option>' +
      regions.map(r => `<option value="${r}">${r}</option>`).join('');
  }

  // Collect all reporters
  const reportersMap = {};
  Object.entries(OAPT_REPORTS.reports).forEach(([iata, reports]) => {
    if (regionFilter && getStationRegion(iata) !== regionFilter) return;
    reports.forEach(r => {
      const reporter = r.i || 'Unknown';
      if (!reportersMap[reporter]) reportersMap[reporter] = { name: reporter, imported: 0, closed: 0, open: 0, types: {}, stations: {} };
      reportersMap[reporter].imported++;
      const t = r.t || 'Unknown';
      reportersMap[reporter].types[t] = (reportersMap[reporter].types[t] || 0) + 1;
      reportersMap[reporter].stations[iata] = (reportersMap[reporter].stations[iata] || 0) + 1;
      if (r.b) {
        const closer = r.b;
        if (!reportersMap[closer]) reportersMap[closer] = { name: closer, imported: 0, closed: 0, open: 0, types: {}, stations: {} };
        reportersMap[closer].closed++;
      }
    });
  });
  Object.values(reportersMap).forEach(v => { v.open = v.imported - v.closed; });

  let reportersArr = Object.values(reportersMap).map(v => ({
    ...v,
    stationCount: Object.keys(v.stations).length,
    topType: Object.entries(v.types).sort((a, b) => b[1] - a[1])[0]?.[0] || '',
  }));

  if (searchFilter) {
    reportersArr = reportersArr.filter(r =>
      r.name.toLowerCase().includes(searchFilter) || (r.topType || '').toLowerCase().includes(searchFilter)
    );
  }

  reportersArr.sort((a, b) => b.imported - a.imported);

  const countEl = document.getElementById('reporters-page-count');
  if (countEl) countEl.textContent = `${reportersArr.length} reporters`;

  const el = document.getElementById('reporters-page-list');
  if (!el) return;

  if (reportersArr.length === 0) {
    el.innerHTML = '<div class="empty-state" style="padding:2rem">No reporters match your filters.</div>';
    return;
  }

  el.innerHTML = `<div class="advisor-reporters-header" style="grid-template-columns:1fr 70px 70px 55px 90px 90px">
      <span class="adv-rpt-name">Reporter</span>
      <span class="adv-rpt-num">Imported</span>
      <span class="adv-rpt-num">Closed</span>
      <span class="adv-rpt-num">Open</span>
      <span class="adv-rpt-type">Top Type</span>
      <span class="adv-rpt-type">Stations</span>
    </div>` + reportersArr.map(r => {
    const openClass = r.open > 5 ? 'adv-rpt-open-high' : r.open > 0 ? 'adv-rpt-open-mid' : '';
    return `<div class="advisor-reporter-row" style="grid-template-columns:1fr 70px 70px 55px 90px 90px" data-reporter="${escHtml(r.name)}">
      <span class="adv-rpt-name"><a href="#" class="advisor-link" data-advisor="${escHtml(r.name)}">${escHtml(r.name)}</a></span>
      <span class="adv-rpt-num">${r.imported}</span>
      <span class="adv-rpt-num">${r.closed}</span>
      <span class="adv-rpt-num ${openClass}">${r.open}</span>
      <span class="adv-rpt-type">${escHtml(r.topType)}</span>
      <span class="adv-rpt-type">${r.stationCount}</span>
    </div>`;
  }).join('');
}

function renderAdvisorAnalysis(name, region) {
  if (typeof OAPT_REPORTS === 'undefined' || !OAPT_REPORTS.reports) {
    document.getElementById('advisor-name').textContent = name;
    document.getElementById('advisor-summary').innerHTML = '<div class="empty-state">No OAPT report data available.</div>';
    return;
  }

  const isRegion = !!region;
  const title = isRegion ? `Safety Oversight: ${name} — ${region}` : `Safety Advisor: ${name}`;
  document.getElementById('advisor-name').textContent = title;

  let imported = [];
  let closed = [];

  if (isRegion) {
    // Collect all reports from stations in this region
    Object.entries(OAPT_REPORTS.reports).forEach(([iata, reports]) => {
      if (getStationRegion(iata) === region) {
        reports.forEach(r => {
          imported.push({ ...r, iata });
          if (r.b) closed.push({ ...r, iata });
        });
      }
    });
  } else {
    // Collect reports imported/closed by this individual
    Object.entries(OAPT_REPORTS.reports).forEach(([iata, reports]) => {
      reports.forEach(r => {
        if (r.i === name) imported.push({ ...r, iata });
        if (r.b === name) closed.push({ ...r, iata });
      });
    });
  }

  const allImported = imported;
  const allClosed = closed;

  // Find global date range
  const allDates = allImported.map(r => r.c).filter(Boolean).sort();
  const globalEarliest = allDates.length ? allDates[0] : '';
  const globalLatest = allDates.length ? allDates[allDates.length - 1] : '';

  // Setup date inputs
  const fromInput = document.getElementById('advisor-date-from');
  const toInput = document.getElementById('advisor-date-to');
  const resetBtn = document.getElementById('advisor-date-reset');
  if (fromInput) { fromInput.value = ''; fromInput.min = globalEarliest; fromInput.max = globalLatest; }
  if (toInput) { toInput.value = ''; toInput.min = globalEarliest; toInput.max = globalLatest; }

  function renderFiltered() {
    const fromDate = fromInput?.value || '';
    const toDate = toInput?.value || '';

    imported = allImported.filter(r => {
      if (!r.c) return !fromDate && !toDate;
      if (fromDate && r.c < fromDate) return false;
      if (toDate && r.c > toDate) return false;
      return true;
    });
    closed = allClosed.filter(r => {
      if (!r.l) {
        if (!fromDate && !toDate) return true;
        if (!r.c) return false;
        if (fromDate && r.c < fromDate) return false;
        if (toDate && r.c > toDate) return false;
        return true;
      }
      if (fromDate && r.l < fromDate) return false;
      if (toDate && r.l > toDate) return false;
      return true;
    });

    const totalImported = imported.length;
    const totalClosed = closed.length;
    const openCount = imported.filter(r => !r.l).length;
    const closedSelf = !isRegion ? imported.filter(r => r.b === name).length : 0;
    const closedByOthers = !isRegion ? imported.filter(r => r.l && r.b !== name).length : 0;

    const dates = imported.map(r => r.c).filter(Boolean).sort();
    const earliest = dates.length ? dates[0] : '—';
    const latest = dates.length ? dates[dates.length - 1] : '—';

    let monthlyImport = {}, monthlyClose = {};
    imported.forEach(r => {
      if (r.c) { const m = r.c.slice(0, 7); monthlyImport[m] = (monthlyImport[m] || 0) + 1; }
    });
    closed.forEach(r => {
      if (r.l) { const m = r.l.slice(0, 7); monthlyClose[m] = (monthlyClose[m] || 0) + 1; }
    });
    const months = [...new Set([...Object.keys(monthlyImport), ...Object.keys(monthlyClose)])].sort();
    const numMonths = months.length || 1;
    const importRate = totalImported > 0 ? (totalImported / numMonths).toFixed(1) : '0';
    const closeRate = totalClosed > 0 ? (totalClosed / numMonths).toFixed(1) : '0';

    const topReporters = isRegion ? (() => {
      const c = {};
      imported.forEach(r => { if (r.i) c[r.i] = (c[r.i] || 0) + 1; });
      return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 8);
    })() : [];

    const viewMode = document.getElementById('advisor-mode')?.value || 'imported';
    const closedSelfReports = !isRegion
      ? (viewMode === 'imported' ? imported.filter(r => r.b === name) : closed)
      : closed;
    const closedTypes = {};
    closedSelfReports.forEach(r => {
      const t = r.t || 'Unknown';
      closedTypes[t] = (closedTypes[t] || 0) + 1;
    });
    const closedTypeEntries = Object.entries(closedTypes).sort((a, b) => b[1] - a[1]);

    const closedTypeHtml = closedTypeEntries.length ? `
      <div class="advisor-stat" style="grid-column:span 2;text-align:left">
        <div style="font-size:0.7rem;color:var(--color-text-muted);margin-bottom:4px">${isRegion ? 'Closed' : viewMode === 'imported' ? 'Self-closed Imported' : 'Closed'} by Type:</div>
        <div style="display:flex;flex-wrap:wrap;gap:3px">
          ${closedTypeEntries.slice(0, 12).map(([t, c]) =>
      `<span style="font-size:0.7rem;background:var(--color-bg);padding:2px 5px;border-radius:3px;white-space:nowrap">${t} <b>${c}</b></span>`
    ).join('')}
          ${closedTypeEntries.length > 12 ? `<span style="font-size:0.7rem;color:var(--color-text-muted)">+${closedTypeEntries.length - 12}</span>` : ''}
        </div>
      </div>
    ` : '';

    document.getElementById('advisor-summary').innerHTML = isRegion ? `
      <div class="advisor-stat"><span class="advisor-stat-num">${totalImported}</span> Total Reports</div>
      <div class="advisor-stat"><span class="advisor-stat-num">${totalClosed}</span> Total Closed</div>
      <div class="advisor-stat"><span class="advisor-stat-num">${openCount}</span> Open</div>
      <div class="advisor-stat"><span class="advisor-stat-num">${numMonths}</span> Active Months</div>
      <div class="advisor-stat"><span class="advisor-stat-num">${importRate}</span> Import Rate (reports/month)</div>
      <div class="advisor-stat"><span class="advisor-stat-num">${closeRate}</span> Close Rate (reports/month)</div>
      <div class="advisor-stat" style="grid-column:span 2;text-align:left">
        <div style="font-size:0.7rem;color:var(--color-text-muted);margin-bottom:4px">Top Reporters:</div>
        <div style="display:flex;flex-wrap:wrap;gap:3px">
          ${topReporters.map(([n, c]) => `<a href="#" class="advisor-link" data-advisor="${n}" style="font-size:0.75rem;background:var(--color-bg);padding:2px 6px;border-radius:3px;white-space:nowrap">${n} <b>${c}</b></a>`).join('')}
        </div>
      </div>
      ${closedTypeHtml}
    ` : `
      <div class="advisor-stat"><span class="advisor-stat-num">${totalImported}</span> Reports Imported</div>
      <div class="advisor-stat"><span class="advisor-stat-num">${totalClosed}</span> Reports Closed</div>
      <div class="advisor-stat"><span class="advisor-stat-num">${openCount}</span> Open</div>
      <div class="advisor-stat"><span class="advisor-stat-num">${closedSelf}</span> Closed by Self</div>
      <div class="advisor-stat"><span class="advisor-stat-num">${closedByOthers}</span> Closed by Others</div>
      <div class="advisor-stat"><span class="advisor-stat-num">${numMonths}</span> Active Months</div>
      <div class="advisor-stat"><span class="advisor-stat-num">${importRate}</span> Import Rate (reports/month)</div>
      <div class="advisor-stat"><span class="advisor-stat-num">${closeRate}</span> Close Rate (reports/month)</div>
      <div class="advisor-stat"><span class="advisor-stat-num">${earliest}</span> Earliest Report</div>
      <div class="advisor-stat"><span class="advisor-stat-num">${latest}</span> Latest Report</div>
      ${closedTypeHtml}
    `;

    const chartData = { imported, closed, months, monthlyImport, monthlyClose };

    function renderAdvisorCharts(sourceData) {
      advisorCharts.forEach(c => c.destroy());
      advisorCharts = [];

      // Type distribution
      const typeCounts = {};
      sourceData.forEach(r => {
        const t = r.t || 'Unknown';
        typeCounts[t] = (typeCounts[t] || 0) + 1;
      });
      const typeEntries = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
      const typeCtx = document.getElementById('advisor-type-chart');
      if (typeCtx) {
        advisorCharts.push(new Chart(typeCtx, {
          type: 'bar',
          data: {
            labels: typeEntries.map(e => e[0]),
            datasets: [{ label: 'Reports', data: typeEntries.map(e => e[1]), backgroundColor: '#2563EB', borderRadius: 3 }]
          },
          options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } }, y: { ticks: { font: { size: 10 } } } } }
        }));
      }

      // Location bar chart
      const locCtx = document.getElementById('advisor-location-chart');
      if (locCtx) {
        if (typeof Chart !== 'undefined' && Chart.getChart) Chart.getChart(locCtx)?.destroy();
        locCtx.style.display = 'block';
        const locCounts = {};
        sourceData.forEach(r => { if (!locCounts[r.iata]) locCounts[r.iata] = 0; locCounts[r.iata]++; });
        const allStations = Object.entries(locCounts).map(([iata, count]) => ({
          l: iata, v: count,
          color: getRegionColors()[getStationRegion(iata)] || '#64748B',
          region: getStationRegion(iata) || 'Other',
        })).sort((a, b) => b.v - a.v);
        advisorCharts.push(new Chart(locCtx, {
          type: 'bar',
          data: { labels: allStations.map(s => s.l), datasets: [{ label: 'Reports', data: allStations.map(s => s.v), backgroundColor: allStations.map(s => s.color), borderRadius: 3 }] },
          options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { afterLabel: ctx => allStations[ctx.dataIndex]?.region || '' } } }, scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } }, y: { ticks: { font: { size: 10 } } } } }
        }));
      }

      // Timeline
      const timelineCtx = document.getElementById('advisor-timeline-chart');
      if (timelineCtx) {
        const importData = months.map(m => monthlyImport[m] || 0);
        const closeData = months.map(m => monthlyClose[m] || 0);
        const mode = document.getElementById('advisor-mode')?.value || 'imported';
        const datasets = mode === 'imported'
          ? [{ label: 'Imported', data: importData, borderColor: '#2563EB', backgroundColor: 'rgba(37,99,235,0.1)', fill: true, tension: 0.3, pointRadius: 3 }]
          : [{ label: 'Closed', data: closeData, borderColor: '#22C55E', backgroundColor: 'rgba(34,197,94,0.1)', fill: true, tension: 0.3, pointRadius: 3 }];
        advisorCharts.push(new Chart(timelineCtx, {
          type: 'line', data: { labels: months, datasets },
          options: { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, scales: { x: { ticks: { font: { size: 10 }, maxTicksLimit: 20 } }, y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
        }));
      }
    }

    const modeSel = document.getElementById('advisor-mode');
    if (modeSel) {
      modeSel.onchange = renderFiltered;
    }
    renderAdvisorCharts(modeSel?.value === 'closed' ? chartData.closed : chartData.imported);
  }

  renderFiltered();
  if (fromInput) fromInput.onchange = renderFiltered;
  if (toInput) toInput.onchange = renderFiltered;
  if (resetBtn) resetBtn.onclick = () => { if (fromInput) fromInput.value = ''; if (toInput) toInput.value = ''; renderFiltered(); };

  // Reporter profile details (individual only)
  const profileEl = document.getElementById('advisor-reporter-profile');
  if (profileEl) {
    if (!isRegion) {
      profileEl.style.display = '';

      // Station breakdown
      const stationCounts = {};
      imported.forEach(r => { if (r.iata) stationCounts[r.iata] = (stationCounts[r.iata] || 0) + 1; });
      const stationEntries = Object.entries(stationCounts).sort((a, b) => b[1] - a[1]);
      const stationEl = document.getElementById('advisor-reporter-stations');
      if (stationEl) {
        stationEl.innerHTML = stationEntries.length
          ? stationEntries.map(([iata, count]) => {
            const region = getStationRegion(iata) || '';
            return `<div class="advisor-breakdown-row">
                <span class="adv-bd-label"><a href="#" class="advisor-link" data-advisor="${escHtml(name)}" style="color:var(--color-text)">${escHtml(iata)}</a> <span style="font-size:0.65rem;color:var(--color-text-muted)">${escHtml(region)}</span></span>
                <span class="adv-bd-bar"><span class="adv-bd-bar-fill" style="width:${(count / stationEntries[0][1] * 100)}%"></span></span>
                <span class="adv-bd-count">${count}</span>
              </div>`;
          }).join('')
          : '<div class="empty-state">No station data.</div>';
      }

      // Types breakdown
      const typeCounts = {};
      imported.forEach(r => { const t = r.t || 'Unknown'; typeCounts[t] = (typeCounts[t] || 0) + 1; });
      const typeEntries = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
      const typeEl = document.getElementById('advisor-reporter-types');
      if (typeEl) {
        const maxType = typeEntries.length ? typeEntries[0][1] : 1;
        typeEl.innerHTML = typeEntries.length
          ? typeEntries.map(([t, c]) =>
            `<div class="advisor-breakdown-row">
                <span class="adv-bd-label">${escHtml(t)}</span>
                <span class="adv-bd-bar"><span class="adv-bd-bar-fill" style="width:${(c / maxType * 100)}%"></span></span>
                <span class="adv-bd-count">${c}</span>
              </div>`
          ).join('')
          : '<div class="empty-state">No type data.</div>';
      }

      // Recent reports
      const recentReports = [...imported].sort((a, b) => (b.c || '').localeCompare(a.c || '')).slice(0, 50);
      const reportsCountEl = document.getElementById('advisor-reporter-reports-count');
      if (reportsCountEl) reportsCountEl.textContent = `Showing latest ${recentReports.length} of ${imported.length}`;
      const reportsEl = document.getElementById('advisor-reporter-reports');
      if (reportsEl) {
        reportsEl.innerHTML = recentReports.length
          ? `<div class="advisor-reports-header">
              <span class="adv-rpt-date">Date</span>
              <span class="adv-rpt-type-cell">Type</span>
              <span class="adv-rpt-station-cell">Station</span>
              <span class="adv-rpt-status-cell">Status</span>
              <span class="adv-rpt-desc-cell">Description</span>
            </div>` + recentReports.map(r => {
            const isOpen = !r.l;
            const closedBy = r.b ? ` by ${r.b}` : '';
            return `<div class="advisor-report-row">
                <span class="adv-rpt-date">${escHtml(r.c || '—')}</span>
                <span class="adv-rpt-type-cell"><span class="dash-issues-occ-type" style="background:${_issuesOccTypeColors[r.t] || '#94A3B8'}22;color:${_issuesOccTypeColors[r.t] || '#94A3B8'}">${escHtml(r.t || '—')}</span></span>
                <span class="adv-rpt-station-cell">${escHtml(r.iata || '—')}</span>
                <span class="adv-rpt-status-cell ${isOpen ? 'adv-rpt-open' : 'adv-rpt-closed'}">${isOpen ? 'Open' : 'Closed' + closedBy}</span>
                <span class="adv-rpt-desc-cell">${escHtml((r.rd || '').substring(0, 100))}${(r.rd || '').length > 100 ? '\u2026' : ''}</span>
              </div>`;
          }).join('')
          : '<div class="empty-state">No reports available.</div>';
      }
    } else {
      profileEl.style.display = 'none';
    }
  }
}

// Advisor back button
document.getElementById('advisor-back').addEventListener('click', () => {
  switchToView('dashboard');
  renderDashboard();
});

function renderDashboard() {
  const data = loadData();
  let stations = Object.values(data.stations);
  const isSum = aggregationMode === 'sum';

  // Read dashboard filters
  const stationFilter = (document.getElementById('dash-filter-station')?.value || '').trim();
  const spFilter = (document.getElementById('dash-filter-sp')?.value || '').trim();
  const regionFilter = (document.getElementById('dash-filter-region')?.value || '').trim();
  const airlineFilter = (document.getElementById('dash-filter-airline')?.value || '').trim();
  const aircraftFilter = (document.getElementById('dash-filter-aircraft')?.value || '').trim();

  // Apply filters
  if (stationFilter || spFilter || regionFilter || airlineFilter || aircraftFilter) {
    stations = stations.filter(s =>
      stationMatchesText(s, s.iataCode, stationFilter) &&
      stationMatchesSp(s, spFilter) &&
      stationMatchesRegion(s.iataCode, regionFilter) &&
      stationMatchesCrsFilters(s.iataCode, airlineFilter, aircraftFilter)
    );
  }

  const total = stations.length;

  // Summary stats
  const assessed = stations.filter(s =>
    s.partA?.status === 'complete' &&
    getWorstPartB(s) &&
    s.partC?.status === 'complete'
  ).length;

  const scores = stations.map(s => getCompositeScore(s)).filter(Boolean);
  const avgScore = scores.length
    ? scores.reduce((sum, cs) => sum + (cs.sortScore ?? 0), 0) / scores.length
    : 0;
  const highRisk = scores.filter(cs => {
    const t = cs.tier?.tier;
    return t === 'High' || t === 'Very High';
  }).length;

  document.getElementById('dash-total-stations').textContent = total;
  document.getElementById('dash-assessed').textContent = assessed;
  document.getElementById('dash-avg-score').textContent = avgScore ? avgScore.toFixed(2) : '—';
  document.getElementById('dash-avg-label').textContent = isSum ? 'Avg Total Score' : aggregationMode === 'risk' ? 'Avg Risk Score' : aggregationMode === 'smpri' ? 'Avg SMPRI Score' : 'Avg Composite Score';
  document.getElementById('dash-high-risk').textContent = highRisk;

  // Aggregate sub-heading label
  document.getElementById('dash-agg-sub').textContent = isSum ? 'Sum' : aggregationMode === 'risk' ? 'Risk' : aggregationMode === 'smpri' ? 'SMPRI' : 'Composite';

  // Scale reference bar (sum mode only)
  const scaleBar = document.getElementById('dash-scale-bar');
  if (isSum) {
    const aCount = AXES.partA.length;
    const bCount = AXES.partB.length;
    const cCount = AXES.partC.length;
    const tCount = aCount + bCount + cCount;
    document.getElementById('dash-scale-low-val').textContent = `${tCount * 333}`;
    document.getElementById('dash-scale-med-val').textContent = `${tCount * 648}`;
    document.getElementById('dash-scale-high-val').textContent = `${tCount * 963}`;
    document.getElementById('dash-scale-vhigh-val').textContent = `${tCount * 1260}`;
    scaleBar.style.display = 'flex';
  } else {
    scaleBar.style.display = 'none';
  }

  // Build enriched station data with per-part scores
  const enriched = stations.map(s => {
    const cs = getCompositeScore(s);
    const partAAvg = calcAvg(s.partA.scores, AXES.partA);
    const worstB = getWorstPartB(s);
    const partBAvg = worstB ? calcAvg(worstB.scores, AXES.partB) : null;
    const partCAvg = calcAvg(s.partC.scores, AXES.partC);

    let partAval, partBval, partCval, aggVal, aggTier;
    let partATier, partBTier, partCTier;

    if (isSum && cs) {
      partAval = cs.aSum;
      partBval = cs.bSum;
      partCval = cs.cSum;
      partATier = cs.aTier;
      partBTier = cs.bTier;
      partCTier = cs.cTier;
      aggVal = cs.finalScore;
      aggTier = cs.tier;
    } else if (aggregationMode === 'risk' && cs) {
      partAval = null;
      partBval = null;
      partCval = null;
      partATier = null;
      partBTier = null;
      partCTier = null;
      aggVal = cs.finalScore;
      aggTier = cs.tier;
    } else if (cs) {
      partAval = partAAvg !== null ? +partAAvg.toFixed(2) : null;
      partBval = partBAvg !== null ? +partBAvg.toFixed(2) : null;
      partCval = partCAvg !== null ? +partCAvg.toFixed(2) : null;
      partATier = partAval !== null ? getScoreTier(partAval) : null;
      partBTier = partBval !== null ? getScoreTier(partBval) : null;
      partCTier = partCval !== null ? getScoreTier(partCval) : null;
      aggVal = cs.sortScore;
      aggTier = cs.tier;
    }

    return { station: s, cs, partAval, partBval, partCval, aggVal, partATier, partBTier, partCTier, aggTier };
  });

  renderRegionalOverview(stations, enriched, isSum);
  renderPartBImpact(stations, enriched, isSum);

  // Render a ranked list into a container
  const renderList = (containerId, items, valueKey, tierKey, valFmt, emptyMsg, afterName) => {
    const container = document.getElementById(containerId);
    const sorted = items.filter(i => i[valueKey] !== null)
      .sort((a, b) => b[valueKey] - a[valueKey]);

    container.innerHTML = sorted.length
      ? sorted.map((item, i) => {
        const s = item.station;
        const val = item[valueKey];
        const tier = item[tierKey] || {};
        const name = s.name || s.iataCode || '—';
        return `<div class="dash-station-item" data-iata="${s.iataCode}">
            <span class="dash-rank">${i + 1}</span>
            <span class="dash-station-name">${name} (${s.iataCode})${afterName ? afterName(item) : ''}</span>
            <span class="dash-station-score">${valFmt(val)}</span>
            <span class="tier-badge ${tier.cls || ''}" style="font-size:0.65rem">${tier.tier || '—'}</span>
          </div>`;
      }).join('')
      : `<div class="empty-state" style="padding:1rem">${emptyMsg}</div>`;
  };

  const fmtSum = v => `${v}`;
  const fmtScore = v => v.toFixed(2);
  const fmtRisk = v => v.toFixed(2);
  const valFmt = isSum ? fmtSum : aggregationMode === 'risk' ? fmtRisk : fmtScore;

  renderList('dash-partA-list', enriched, 'partAval', 'partATier', valFmt, 'No Part A scores yet.');
  renderList('dash-partB-list', enriched, 'partBval', 'partBTier', valFmt, 'No Part B scores yet.',
    item => {
      const s = item.station;
      const bList = getPartBList(s).filter(b => b.status === 'complete');
      if (!bList.length) return '';
      const tags = bList.map(b => {
        const sp = b.serviceProvider || b.function || 'SP';
        const fn = b.function ? ` (${b.function})` : '';
        return `<span class="dash-sp-tag">${sp}${fn}</span>`;
      });
      return tags.join('');
    });
  renderList('dash-partC-list', enriched, 'partCval', 'partCTier', valFmt, 'No Part C scores yet.');
  renderList('dash-agg-list', enriched, 'aggVal', 'aggTier', valFmt, 'No composite scores yet.',
    item => {
      const s = item.station;
      const bCount = getPartBCount(s);
      return `<span class="part-flags">
        ${['A', 'B', 'C'].map(p => {
        if (p === 'B') {
          const ok = bCount > 0;
          return `<span class="part-flag ${ok ? 'part-flag-ok' : 'part-flag-no'}" title="${bCount} Part B assessment${bCount !== 1 ? 's' : ''}">${ok ? '✓' : '✗'}<span class="part-b-count">${bCount || ''}</span></span>`;
        }
        const ok = s[`part${p}`]?.status === 'complete';
        return `<span class="part-flag ${ok ? 'part-flag-ok' : 'part-flag-no'}">${ok ? '✓' : '✗'}</span>`;
      }).join('')}
      </span>`;
    });

  // Top hazards (from OAPT occurrence reports)
  const hazardData = {};
  if (typeof OAPT_REPORTS !== 'undefined' && OAPT_REPORTS.reports) {
    stations.forEach(s => {
      const reports = OAPT_REPORTS.reports[s.iataCode] || [];
      reports.forEach(r => {
        (r.n || []).forEach(concern => {
          if (!concern) return;
          if (!hazardData[concern]) hazardData[concern] = { count: 0, stations: new Set() };
          hazardData[concern].count += 1;
          hazardData[concern].stations.add(s.iataCode || s.name || '?');
        });
      });
    });
  } else {
    // Fallback to incident trends
    stations.forEach(s => {
      (s.operationalData?.incidentTrends || []).forEach(inc => {
        const key = inc.level4 && inc.level4 !== 'nan' ? inc.level4
          : inc.level3 && inc.level3 !== 'nan' ? inc.level3
            : inc.type;
        if (key && key !== 'nan') {
          if (!hazardData[key]) hazardData[key] = { count: 0, stations: new Set() };
          hazardData[key].count += inc.count || 1;
          hazardData[key].stations.add(s.iataCode || s.name || '?');
        }
      });
    });
  }

  const topHazards = Object.entries(hazardData)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10);

  const hazardList = document.getElementById('dash-hazard-list');
  hazardList.innerHTML = topHazards.length
    ? topHazards.map(([h, d], i) =>
      `<div class="dash-hazard-item">
          <span class="dash-rank">${i + 1}</span>
          <span class="dash-hazard-name">${h}</span>
          <span class="dash-hazard-stations">${[...d.stations].join(', ')}</span>
          <span class="dash-hazard-count">${d.count}</span>
        </div>`
    ).join('')
    : '<div class="empty-state" style="padding:1rem">No incident data recorded yet.</div>';

  // Corrective actions
  const actions = topHazards.slice(0, 6).map(([hazard, d]) => ({
    hazard, count: d.count,
    stations: [...d.stations].join(', '),
    action: getActionForHazard(hazard),
  }));

  const actionList = document.getElementById('dash-action-list');
  actionList.innerHTML = actions.length
    ? actions.map((a, i) =>
      `<div class="dash-action-item">
          <span class="dash-action-num">${i + 1}</span>
          <div class="dash-action-body">
            <strong>${a.hazard}</strong> <span class="dash-hazard-count">${a.count}</span>
            <span class="dash-action-stations">${a.stations}</span>
            <p>${a.action}</p>
          </div>
        </div>`
    ).join('')
    : '<div class="empty-state" style="padding:1rem">No hazard data available yet to suggest actions.</div>';

  renderSafetyAdvisors(stations);
}

// ─── Export ───────────────────────────────────────────────────────────────────

function exportJSON() {
  const data = loadData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `station-risk-export-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── ICAO API Data Service 2.0 ────────────────────────────────────────────────

const ICAO_BASE_URL_V2 = 'https://dataservices.icao.int/api';
const ICAO_BASE_URL_V1 = 'https://applications.icao.int/dataservices';
const ICAO_KEY_KEY = 'icaoApiKey_v1';
const ICAO_RECENT_KEY = 'icaoRecentLookups_v2';
const ICAO_CALLS_KEY = 'icaoCallCount_v1';
const ICAO_CALL_LIMIT = 100;

function getIcaoCallCount() {
  return +(localStorage.getItem(ICAO_CALLS_KEY) || 0);
}

function incIcaoCallCount() {
  const c = getIcaoCallCount() + 1;
  localStorage.setItem(ICAO_CALLS_KEY, c);
  updateIcaoCallDisplay();
  return c;
}

function resetIcaoCallCount() {
  localStorage.setItem(ICAO_CALLS_KEY, 0);
  updateIcaoCallDisplay();
}

function updateIcaoCallDisplay() {
  const el = document.getElementById('icao-call-count');
  if (el) {
    const c = getIcaoCallCount();
    el.textContent = c;
    el.style.color = c >= ICAO_CALL_LIMIT ? '#d32f2f' : c >= ICAO_CALL_LIMIT * 0.8 ? '#f57c00' : '';
  }
}

function getIcaoKey() {
  return localStorage.getItem(ICAO_KEY_KEY) || '';
}

function saveIcaoKey(key) {
  localStorage.setItem(ICAO_KEY_KEY, key);
}

function clearIcaoKey() {
  localStorage.removeItem(ICAO_KEY_KEY);
}

function getRecentLookups() {
  const raw = localStorage.getItem(ICAO_RECENT_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveRecentLookups(lookups) {
  localStorage.setItem(ICAO_RECENT_KEY, JSON.stringify(lookups.slice(0, 20)));
}

function addRecentLookup(code, airportData, safetyData, stateData) {
  const lookups = getRecentLookups();
  lookups.unshift({
    code: code.toUpperCase(),
    name: airportData?.Location_Name,
    iata: airportData?.IATA_Code,
    icao: airportData?.ICAO_Code,
    country: airportData?.State_Name,
    ts: Date.now(),
  });
  saveRecentLookups(lookups);
}

async function icaoFetch(endpoint, params, useV1) {
  const apiKey = getIcaoKey();
  const base = useV1 ? ICAO_BASE_URL_V1 : ICAO_BASE_URL_V2;

  // v1 uses api_key as explicit query param; v2 may also accept it
  let url;
  if (useV1) {
    const q = new URLSearchParams({ api_key: apiKey, format: 'json', ...params });
    url = `${base}/${endpoint}?${q}`;
  } else {
    const q = new URLSearchParams({ api_key: apiKey, format: 'json', ...params });
    url = `${base}/${endpoint}?${q}`;
  }

  const resp = await fetch(url, {
    headers: { 'Accept': 'application/json' },
  });
  incIcaoCallCount();

  if (!resp.ok) {
    if (resp.status === 401 || resp.status === 403) throw new Error('Invalid or expired API key.');
    if (resp.status === 404) throw new Error(`API endpoint not found. The API may need a different URL format.`);
    throw new Error(`${endpoint}: ${resp.status} ${resp.statusText}`);
  }

  const text = await resp.text();
  if (!text || text.trim() === '') return [];

  try {
    const data = JSON.parse(text);
    // Handle various response wrappers
    if (data && data.data) return Array.isArray(data.data) ? data.data : [data.data];
    if (data && data.results) return Array.isArray(data.results) ? data.results : [data.results];
    if (data && data.airports) return Array.isArray(data.airports) ? data.airports : [data.airports];
    return Array.isArray(data) ? data : [data];
  } catch {
    throw new Error(`Unexpected API response format for ${endpoint}`);
  }
}

async function icaoGetFirst(endpoint, params, useV1) {
  const arr = await icaoFetch(endpoint, params, useV1);
  return arr.length ? arr[0] : null;
}

async function lookupAirport(icaoCode) {
  const code = icaoCode.toUpperCase();
  if (!code || code.length < 4) throw new Error('Enter a valid 4-letter ICAO code.');
  if (!getIcaoKey()) throw new Error('Enter your ICAO API key in the settings above.');

  async function tryFetch(endpoint, paramsList) {
    const paramSets = Array.isArray(paramsList) ? paramsList : [paramsList];
    for (const params of paramSets) {
      try { const r = await icaoGetFirst(endpoint, params, false); if (r) return r; } catch (_) { }
      try { const r = await icaoGetFirst(endpoint, params, true); if (r) return r; } catch (_) { }
    }
    return null;
  }

  const REGIONAL_OFFICES = ['EUR/NAT', 'NACC', 'APAC', 'MID', 'SAM', 'ESAF', 'WACAF'];

  // Phase 1: get airport data + member states list for ISO3 resolution
  const [docResult, ...officeResults] = await Promise.allSettled([
    tryFetch('doc7910', [{ icaocode: code }, { airports: code }, { icao: code }]),
    ...REGIONAL_OFFICES.map(ro => icaoFetch('icao-member-states', { RegionalOffice: ro }).catch(() => [])),
  ]);

  const airport = docResult.status === 'fulfilled' ? docResult.value : null;
  if (!airport) throw new Error(`No airport found for "${code}". Check the code, your API key, or try the ICAO portal to verify your key has access to DOC7910.`);

  // Build State_Name → ISO3 mapping from all regional offices
  const stateName = (airport.State_Name || '').trim().toUpperCase();
  const nameToIso3 = {};
  for (const r of officeResults) {
    const list = r.status === 'fulfilled' ? r.value : [];
    for (const s of Array.isArray(list) ? list : [list]) {
      const uname = ((s.UN_state_name || s.stateName || s.State_Name || '')).trim();
      if (uname) {
        nameToIso3[uname.toUpperCase()] = s.iso_3_code || s.iso3Code || s.Iso3Code || '';
      }
    }
  }

  // Fuzzy match: exact match first, then substring
  let iso3 = nameToIso3[stateName] || '';
  if (!iso3) {
    const match = Object.keys(nameToIso3).find(k => k.includes(stateName) || stateName.includes(k));
    if (match) iso3 = nameToIso3[match];
  }

  // Phase 2: fetch state-level data and incidents
  const stateParams = iso3 ? { iso3code: iso3 } : {};
  const incidentParams = airport.State_Name ? { StateOfOccurrence: airport.State_Name } : {};

  const [eiResult, marginResult, eiSumResult, incidentResult, profileResult] = await Promise.allSettled([
    icaoFetch('ei-stats', stateParams).catch(() => []),
    icaoFetch('safety-margin-stats', stateParams).catch(() => []),
    icaoFetch('eisummary-stats', stateParams).catch(() => []),
    icaoFetch('incidents', incidentParams).catch(() => []),
    icaoFetch('profile-stats', stateParams).catch(() => []),
  ]);

  const stateData = eiResult.status === 'fulfilled' ? (Array.isArray(eiResult.value) ? eiResult.value[0] : eiResult.value) : null;
  const marginData = marginResult.status === 'fulfilled' ? (Array.isArray(marginResult.value) ? marginResult.value[0] : marginResult.value) : null;
  const sspData = eiSumResult.status === 'fulfilled' ? (Array.isArray(eiSumResult.value) ? eiSumResult.value[0] : eiSumResult.value) : null;
  const incidents = incidentResult.status === 'fulfilled' ? (Array.isArray(incidentResult.value) ? incidentResult.value : [incidentResult.value]) : [];
  const profile = profileResult.status === 'fulfilled' ? (Array.isArray(profileResult.value) ? profileResult.value : [profileResult.value]) : [];

  return { airport, safety: null, stateData, marginData, sspData, incidents, profile };
}

function renderIcaoRecent() {
  const container = document.getElementById('icao-recent');
  const lookups = getRecentLookups();
  if (!container) return;
  if (lookups.length === 0) {
    container.innerHTML = '<p class="icao-empty">No lookups yet.</p>';
    return;
  }
  container.innerHTML = lookups.map(l => `
    <div class="icao-recent-item" data-code="${l.code}">
      <span class="icao-recent-code">${l.icao}</span>
      <span class="icao-recent-name">${l.name || '—'}</span>
      ${l.iata ? `<span class="iata-tag">${l.iata}</span>` : ''}
    </div>
  `).join('');
  container.querySelectorAll('.icao-recent-item').forEach(el => {
    el.addEventListener('click', () => {
      document.getElementById('icao-code-input').value = el.dataset.code;
      document.getElementById('icao-lookup').click();
    });
  });
}

function renderIcaoResults(result) {
  const { airport, safety, stateData, marginData, sspData, incidents, profile } = result;

  function f(obj, ...keys) {
    if (!obj) return '—';
    for (const k of keys) {
      if (obj[k] !== undefined && obj[k] !== null && obj[k] !== '') return obj[k];
    }
    return '—';
  }

  // Hide error, show sections
  document.getElementById('icao-error').style.display = 'none';

  const showSection = (id, show) => {
    const el = document.getElementById(id);
    if (el) el.style.display = show ? 'block' : 'none';
  };

  // ── Airport Info ──
  const name = f(airport, 'Location_Name', 'locationName', 'location_name', 'name', 'airportName');
  const icao = f(airport, 'ICAO_Code', 'icaoCode', 'icao_code', 'icao', 'airportCode');
  const iata = f(airport, 'IATA_Code', 'iataCode', 'iata_code', 'iata');
  const state = f(airport, 'State_Name', 'stateName', 'state_name', 'state', 'countryName', 'country');
  const lat = f(airport, 'Latitude', 'latitude', 'lat');
  const lng = f(airport, 'Longitude', 'longitude', 'lng', 'lon');
  const coord = lat !== '—' && lng !== '—'
    ? `${typeof lat === 'number' ? lat.toFixed(4) : lat}, ${typeof lng === 'number' ? lng.toFixed(4) : lng}`
    : '—';

  document.getElementById('icao-airport-content').innerHTML = `
    <table class="icao-result-table">
      <tr><td class="icao-result-label">ICAO Code</td><td class="icao-result-value icao-result-icao">${icao}</td></tr>
      <tr><td class="icao-result-label">IATA Code</td><td class="icao-result-value icao-result-iata">${iata}</td></tr>
      <tr><td class="icao-result-label">Airport Name</td><td class="icao-result-value">${name}</td></tr>
      <tr><td class="icao-result-label">State/Country</td><td class="icao-result-value">${state}</td></tr>
      <tr><td class="icao-result-label">Coordinates</td><td class="icao-result-value">${coord}</td></tr>
    </table>
  `;
  const actions = document.getElementById('icao-actions');
  if (actions) {
    actions.style.display = iata !== '—' ? 'block' : 'none';
    actions.dataset.icao = icao;
    actions.dataset.iata = iata;
    actions.dataset.name = name;
    actions.dataset.country = state;
    actions.dataset.safety = safety ? JSON.stringify(safety) : '';
    actions.dataset.stateData = stateData ? JSON.stringify(stateData) : '';
    actions.dataset.marginData = marginData ? JSON.stringify(marginData) : '';
    actions.dataset.sspData = sspData ? JSON.stringify(sspData) : '';
  }
  showSection('icao-airport-section', true);

  // ── Airport Safety Profile ──
  if (safety) {
    const safetyContent = document.getElementById('icao-safety-content');
    if (safetyContent) {
      const hasInstrument = safety.hasInstrument === 'true' || safety.hasInstrument === true || safety.fullInstrumentation === 'true' || safety.fullInstrumentation === true;
      const hasIntRWYs = safety.hasIntersectingRWYs === 'true' || safety.hasIntersectingRWYs === true || safety.intersectingRunways === 'true' || safety.intersectingRunways === true;
      const imcPct = safety.IMC != null ? safety.IMC : f(safety, 'imc', 'IMCPercent');
      const terrain300 = safety.TerrainAbove300m != null ? safety.TerrainAbove300m : f(safety, 'terrainAbove300m', 'terrain_300');
      const terrain600 = safety.TerrainAbove600m != null ? safety.TerrainAbove600m : f(safety, 'terrainAbove600m', 'terrain_600');
      const terrain900 = safety.TerrainAbove900m != null ? safety.TerrainAbove900m : f(safety, 'terrainAbove900m', 'terrain_900');
      const elev = safety.elevation != null ? `${safety.elevation}m` : '—';
      const punctuality = safety.punctuality != null ? safety.punctuality : '—';
      const navEI = safety.airnavigation_ei != null ? `${safety.airnavigation_ei}%` : f(safety, 'airnavigationEI', 'ans_ei', 'ansEI');
      let navEIDisplay = navEI;
      if (navEIDisplay !== '—' && !navEIDisplay.includes('%')) navEIDisplay += '%';
      const navMargin = safety.airnavigation_margin != null ? safety.airnavigation_margin : f(safety, 'airnavigationMargin', 'ans_margin', 'ansMargin');
      const navMarginDisplay = navMargin !== '—' ? (typeof navMargin === 'number' ? navMargin.toFixed(1) : navMargin) : '—';

      safetyContent.innerHTML = `
        <div class="icao-safety-grid">
          <div class="icao-metric ${hasInstrument ? 'icao-metric-good' : 'icao-metric-warn'}">
            <span class="icao-metric-icon">${hasInstrument ? '✓' : '⚠'}</span>
            <div><div class="icao-metric-label">Instrument Approaches</div><div class="icao-metric-value">${hasInstrument ? 'Available' : 'None'}</div></div>
          </div>
          <div class="icao-metric ${hasIntRWYs ? 'icao-metric-warn' : 'icao-metric-good'}">
            <span class="icao-metric-icon">${hasIntRWYs ? '⚠' : '✓'}</span>
            <div><div class="icao-metric-label">Intersecting Runways</div><div class="icao-metric-value">${hasIntRWYs ? 'Yes' : 'No'}</div></div>
          </div>
          <div class="icao-metric">
            <span class="icao-metric-icon">🌦</span>
            <div><div class="icao-metric-label">IMC Conditions</div><div class="icao-metric-value">${imcPct}%</div></div>
          </div>
          <div class="icao-metric">
            <span class="icao-metric-icon">⛰</span>
            <div><div class="icao-metric-label">Terrain >300m / 600m / 900m</div><div class="icao-metric-value">${terrain300}% / ${terrain600}% / ${terrain900}%</div></div>
          </div>
          <div class="icao-metric">
            <span class="icao-metric-icon">↕</span>
            <div><div class="icao-metric-label">Elevation</div><div class="icao-metric-value">${elev}</div></div>
          </div>
          <div class="icao-metric">
            <span class="icao-metric-icon">⏱</span>
            <div><div class="icao-metric-label">Punctuality</div><div class="icao-metric-value">${punctuality}</div></div>
          </div>
          <div class="icao-metric">
            <span class="icao-metric-icon">📡</span>
            <div><div class="icao-metric-label">Air Navigation EI</div><div class="icao-metric-value">${navEIDisplay}</div></div>
          </div>
          <div class="icao-metric">
            <span class="icao-metric-icon">📊</span>
            <div><div class="icao-metric-label">Nav Margin vs World</div><div class="icao-metric-value ${navMarginDisplay !== '—' && +navMarginDisplay < 0 ? 'icao-metric-warn' : 'icao-metric-good'}">${navMarginDisplay}</div></div>
          </div>
        </div>
      `;
    }
    showSection('icao-safety-section', true);
  }

  // ── State Safety Overview ──
  if (stateData || sspData) {
    const stateContent = document.getElementById('icao-state-content');
    if (stateContent) {
      const overallEI = f(stateData, 'overallEI', 'OverallEI', 'overall_ei') !== '—' ? f(stateData, 'overallEI', 'OverallEI', 'overall_ei') : f(sspData, 'overallEI', 'OverallEI', 'overall_ei');
      const sspEI = f(sspData, 'sspFoundationEI', 'sspFoundationEi', 'ssp_foundation_ei');
      const sspTotal = f(sspData, 'sspPQsTotal', 'sspPQs_total', 'ssp_pqs_total');
      const sspSat = f(sspData, 'sspPQsSatisfactory', 'sspPQs_satisfactory', 'ssp_pqs_satisfactory');
      const sspNotSat = f(sspData, 'sspPQsNotSatisfactory', 'sspPQs_not_satisfactory', 'ssp_pqs_not_satisfactory');

      stateContent.innerHTML = `
        <div class="icao-safety-grid">
          <div class="icao-metric icao-metric-lg">
            <div>
              <div class="icao-metric-label">USOAP Overall EI</div>
              <div class="icao-metric-value icao-metric-pct">${overallEI !== '—' ? overallEI + '%' : '—'}</div>
              <div class="icao-metric-sub">Effective Implementation</div>
            </div>
          </div>
          <div class="icao-metric icao-metric-lg">
            <div>
              <div class="icao-metric-label">SSP Foundation EI</div>
              <div class="icao-metric-value icao-metric-pct">${sspEI !== '—' ? sspEI + '%' : '—'}</div>
              <div class="icao-metric-sub">State Safety Programme foundation</div>
            </div>
          </div>
          ${sspTotal !== '—' ? `
          <div class="icao-metric">
            <span class="icao-metric-icon">✓</span>
            <div><div class="icao-metric-label">SSP PQs Satisfactory</div><div class="icao-metric-value">${sspSat} / ${sspTotal}</div></div>
          </div>
          <div class="icao-metric">
            <span class="icao-metric-icon">✗</span>
            <div><div class="icao-metric-label">SSP PQs Not Satisfactory</div><div class="icao-metric-value">${sspNotSat} / ${sspTotal}</div></div>
          </div>` : ''}
        </div>
      `;
    }
    showSection('icao-state-section', true);
  }

  // ── State Safety Margins ──
  if (marginData) {
    const marginContent = document.getElementById('icao-margin-content');
    if (marginContent) {
      const margins = [
        { label: 'Overall', keys: ['overall_margin', 'overallMargin', 'overallMarginPct'] },
        { label: 'Legislation', keys: ['leg_margin', 'legMargin', 'legislationMargin'] },
        { label: 'Organization', keys: ['org_margin', 'orgMargin', 'organizationMargin'] },
        { label: 'Personnel', keys: ['personnel_margin', 'personnelMargin'] },
        { label: 'Operations', keys: ['operations_margin', 'operationsMargin'] },
        { label: 'Airworthiness', keys: ['airworthiness_margin', 'airworthinessMargin'] },
        { label: 'Accident Invest.', keys: ['accident_investigation_margin', 'accidentInvestigationMargin'] },
        { label: 'Air Navigation', keys: ['ans_margin', 'ansMargin', 'airNavigationMargin'] },
        { label: 'Aerodromes', keys: ['aerodrome_margin', 'aerodromeMargin'] },
      ];

      marginContent.innerHTML = `
        <p class="icao-margin-note">Safety margin = State EI minus Global Average EI. Negative values indicate below-average performance.</p>
        <div class="icao-margin-bars">
          ${margins.map(m => {
        const val = f(marginData, ...m.keys);
        if (val === '—') return '';
        const marginVal = +val;
        if (isNaN(marginVal)) return '';
        const pct = ((marginVal + 50) / 100) * 100;
        const cls = marginVal < 0 ? 'icao-margin-bar-negative' : marginVal > 10 ? 'icao-margin-bar-positive' : 'icao-margin-bar-neutral';
        return `
              <div class="icao-margin-row">
                <span class="icao-margin-label">${m.label}</span>
                <div class="icao-margin-bar-track">
                  <div class="icao-margin-bar ${cls}" style="width:${Math.min(100, Math.max(0, pct))}%"></div>
                </div>
                <span class="icao-margin-val ${marginVal < 0 ? 'icao-margin-negative' : 'icao-margin-positive'}">${marginVal > 0 ? '+' : ''}${marginVal.toFixed(1)}%</span>
              </div>
            `;
      }).join('')}
        </div>
      `;
    }
    showSection('icao-margin-section', true);
  }

  // ── Incidents ──
  if (incidents && incidents.length > 0) {
    const incContent = document.getElementById('icao-incidents-content');
    if (incContent) {
      incContent.innerHTML = `
        <div style="max-height:300px;overflow-y:auto">
          <table style="width:100%;border-collapse:collapse;font-size:0.85rem">
            <thead><tr style="background:var(--surface-soft,#f3f8fe)">
              <th style="padding:6px 8px;text-align:left">Date</th>
              <th style="padding:6px 8px;text-align:left">Type</th>
              <th style="padding:6px 8px;text-align:left">Location</th>
              <th style="padding:6px 8px;text-align:right">Fatalities</th>
            </tr></thead>
            <tbody>${incidents.slice(0, 20).map(inc => {
        const dt = f(inc, 'eventDate', 'EventDate', 'date', 'Date');
        const tp = f(inc, 'eventType', 'EventType', 'type', 'Type');
        const loc = f(inc, 'location', 'Location', 'Location_Name', 'locationName');
        const fat = f(inc, 'totalFatalities', 'TotalFatalities', 'fatalities', 'Fatalities');
        return `<tr style="border-bottom:1px solid var(--border,#d8e2ec)">
                <td style="padding:4px 8px">${dt}</td>
                <td style="padding:4px 8px">${tp}</td>
                <td style="padding:4px 8px">${loc}</td>
                <td style="padding:4px 8px;text-align:right">${fat}</td>
              </tr>`;
      }).join('')}</tbody>
          </table>
          ${incidents.length > 20 ? `<p style="font-size:0.8rem;color:var(--muted,#5f6b7a);margin:8px 0 0">Showing 20 of ${incidents.length} incidents</p>` : ''}
        </div>
      `;
    }
    showSection('icao-incidents-section', true);
  }

  // ── Operator Risk Profile ──
  if (profile && profile.length > 0) {
    const profContent = document.getElementById('icao-profile-content');
    if (profContent) {
      const p = profile[0];
      const riskScore = f(p, 'overallRiskScore', 'overall_risk_score', 'riskScore', 'RiskScore');
      const riskLevel = f(p, 'riskLevel', 'risk_level', 'RiskLevel');
      const operatorCnt = f(p, 'operatorCount', 'operator_count', 'operatorCount');
      const highRisk = f(p, 'highRiskOperators', 'high_risk_operators', 'highRiskCount');
      profContent.innerHTML = `
        <div class="icao-safety-grid">
          <div class="icao-metric icao-metric-lg">
            <div>
              <div class="icao-metric-label">Overall Risk Score</div>
              <div class="icao-metric-value ${riskScore !== '—' && +riskScore > 60 ? 'icao-metric-warn' : 'icao-metric-good'}">${riskScore !== '—' ? riskScore : '—'}</div>
            </div>
          </div>
          <div class="icao-metric icao-metric-lg">
            <div>
              <div class="icao-metric-label">Risk Level</div>
              <div class="icao-metric-value">${riskLevel}</div>
            </div>
          </div>
          <div class="icao-metric">
            <div><div class="icao-metric-label">Operators</div><div class="icao-metric-value">${operatorCnt}</div></div>
          </div>
          <div class="icao-metric">
            <div><div class="icao-metric-label">High Risk Operators</div><div class="icao-metric-value">${highRisk}</div></div>
          </div>
        </div>
      `;
    }
    showSection('icao-profile-section', true);
  }

  addRecentLookup(icao, airport, safety, stateData);
  renderIcaoRecent();
}

function showIcaoError(msg) {
  document.getElementById('icao-airport-section').style.display = 'none';
  document.getElementById('icao-safety-section').style.display = 'none';
  document.getElementById('icao-state-section').style.display = 'none';
  document.getElementById('icao-margin-section').style.display = 'none';
  document.getElementById('icao-incidents-section').style.display = 'none';
  document.getElementById('icao-profile-section').style.display = 'none';
  const errorEl = document.getElementById('icao-error');
  errorEl.style.display = 'block';
  errorEl.textContent = msg;
}

function initIcao() {
  const keyInput = document.getElementById('icao-api-key');
  if (keyInput) keyInput.value = getIcaoKey();

  document.getElementById('icao-save-key').addEventListener('click', () => {
    saveIcaoKey(document.getElementById('icao-api-key').value.trim());
  });

  document.getElementById('icao-clear-key').addEventListener('click', () => {
    clearIcaoKey();
    document.getElementById('icao-api-key').value = '';
  });

  document.getElementById('icao-reset-calls').addEventListener('click', resetIcaoCallCount);

  document.getElementById('icao-test-key').addEventListener('click', async () => {
    const key = document.getElementById('icao-api-key').value.trim();
    if (!key) { showIcaoError('Enter an API key first.'); return; }
    saveIcaoKey(key);
    const resultEl = document.getElementById('icao-test-result');
    resultEl.innerHTML = 'Testing…';
    // Try doc7910 with EGLL using various param names and URLs
    const tests = [
      { label: 'v2 airports=EGLL', url: `${ICAO_BASE_URL_V2}/doc7910?api_key=${key}&format=json&airports=EGLL` },
      { label: 'v2 icaocode=EGLL', url: `${ICAO_BASE_URL_V2}/doc7910?api_key=${key}&format=json&icaocode=EGLL` },
      { label: 'v1 airports=EGLL', url: `${ICAO_BASE_URL_V1}/doc7910?api_key=${key}&format=json&airports=EGLL` },
      { label: 'v1 icaocode=EGLL', url: `${ICAO_BASE_URL_V1}/doc7910?api_key=${key}&format=json&icaocode=EGLL` },
    ];
    let html = '';
    for (const { label, url } of tests) {
      try {
        const resp = await fetch(url, { headers: { 'Accept': 'application/json' } });
        const text = await resp.text();
        const preview = text.length > 300 ? text.slice(0, 300) + '…' : text;
        const ok = resp.ok ? '✅' : '❌';
        html += `<div style="margin:4px 0;padding:4px;background:${resp.ok ? 'rgba(0,200,0,0.08)' : 'rgba(200,0,0,0.08)'}"><strong>${ok} ${label}</strong> <span style="color:${resp.ok ? 'green' : 'red'}">${resp.status}</span><br><code style="font-size:0.75rem">${preview}</code></div>`;
      } catch (err) {
        html += `<div style="margin:4px 0;padding:4px;background:rgba(200,0,0,0.08)"><strong>❌ ${label}</strong> ${err.message}</div>`;
      }
    }
    resultEl.innerHTML = html;
  });

  document.getElementById('icao-lookup').addEventListener('click', async () => {
    const code = document.getElementById('icao-code-input').value.trim();
    if (!code || code.length < 4) {
      showIcaoError('Enter a valid 4-letter ICAO code (e.g. CYVR).');
      return;
    }
    const btn = document.getElementById('icao-lookup');
    btn.disabled = true;
    btn.textContent = 'Looking up…';
    document.getElementById('icao-lookup-status').textContent = 'Fetching airport data, safety profile, and state indicators…';
    try {
      const result = await lookupAirport(code);
      renderIcaoResults(result);
      document.getElementById('icao-lookup-status').textContent = '';
    } catch (err) {
      showIcaoError(err.message);
      document.getElementById('icao-lookup-status').textContent = '';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Look Up';
    }
  });

  document.getElementById('icao-code-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('icao-lookup').click();
  });

  document.getElementById('icao-populate-form').addEventListener('click', () => {
    const a = document.getElementById('icao-actions');
    const iata = a.dataset.iata;
    const name = a.dataset.name;
    const icao = a.dataset.icao;
    const country = a.dataset.country;

    document.querySelector('.tab[data-view="form"]').click();
    setTimeout(() => {
      document.getElementById('station-selector').value = 'new';
      loadStationIntoForm('new');
      document.getElementById('station-name').value = name || '';
      document.getElementById('station-iata').value = iata || '';
      currentStation.name = name || '';
      currentStation.iataCode = iata || '';

      let safety = null, stateData = null, marginData = null, sspData = null;
      try { safety = a.dataset.safety ? JSON.parse(a.dataset.safety) : null; } catch { }
      try { stateData = a.dataset.stateData ? JSON.parse(a.dataset.stateData) : null; } catch { }
      try { marginData = a.dataset.marginData ? JSON.parse(a.dataset.marginData) : null; } catch { }
      try { sspData = a.dataset.sspData ? JSON.parse(a.dataset.sspData) : null; } catch { }

      currentStation.icaoData = {
        icaoCode: icao,
        airportName: name,
        country: country,
        safetyChars: safety,
        stateEI: stateData,
        stateMargins: marginData,
        sspFoundation: sspData,
        lookupDate: new Date().toISOString(),
      };
      renderForm();
    }, 50);
  });

  renderIcaoRecent();
  updateIcaoCallDisplay();
}

function renderStationIcaoContext(station) {
  const container = document.getElementById('icao-station-context');
  if (!container) return;

  const icaoData = station?.icaoData;
  if (!icaoData) {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'block';
  const s = icaoData.safetyChars || {};
  const stateEI = icaoData.stateEI || {};
  const margins = icaoData.stateMargins || {};

  const safetyItems = [];
  if (s.hasInstrument != null) {
    const ok = s.hasInstrument === 'true' || s.hasInstrument === true;
    safetyItems.push(`<div class="icao-ctx-item ${ok ? 'ctx-ok' : 'ctx-warn'}"><span>${ok ? '✓' : '⚠'}</span> Instrument approaches: ${ok ? 'Available' : 'None'}</div>`);
  }
  if (s.hasIntersectingRWYs != null) {
    const ok = s.hasIntersectingRWYs === 'true' || s.hasIntersectingRWYs === true;
    safetyItems.push(`<div class="icao-ctx-item ${ok ? 'ctx-warn' : 'ctx-ok'}"><span>${ok ? '⚠' : '✓'}</span> Intersecting runways: ${ok ? 'Yes' : 'No'}</div>`);
  }
  if (s.IMC != null) {
    safetyItems.push(`<div class="icao-ctx-item"><span>🌦</span> IMC: ${s.IMC}%</div>`);
  }
  if (s.airnavigation_ei != null) {
    safetyItems.push(`<div class="icao-ctx-item"><span>📡</span> Nav EI: ${s.airnavigation_ei}%</div>`);
  }
  if (margins.overall_margin != null) {
    const om = +margins.overall_margin;
    if (!isNaN(om)) {
      const cls = om < 0 ? 'ctx-warn' : 'ctx-ok';
      safetyItems.push(`<div class="icao-ctx-item ${cls}"><span>${om < 0 ? '⚠' : '✓'}</span> State safety margin: ${om > 0 ? '+' : ''}${om.toFixed(1)}%</div>`);
    }
  }
  if (stateEI.overallEI != null) {
    safetyItems.push(`<div class="icao-ctx-item"><span>🏛</span> USOAP EI: ${stateEI.overallEI}%</div>`);
  }
  if (icaoData.sspFoundation?.sspFoundationEI != null) {
    safetyItems.push(`<div class="icao-ctx-item"><span>📋</span> SSP Foundation: ${icaoData.sspFoundation.sspFoundationEI}%</div>`);
  }

  const lookupDate = icaoData.lookupDate ? new Date(icaoData.lookupDate).toLocaleDateString('en-CA') : '—';
  const icaoCode = icaoData.icaoCode || '—';

  container.innerHTML = `
    <div class="icao-ctx-header">
      <strong>${icaoCode}</strong>
      <span class="icao-ctx-date">${lookupDate}</span>
    </div>
    ${safetyItems.length ? safetyItems.join('') : '<div class="icao-ctx-empty">Limited safety data available</div>'}
  `;
}

// ─── Station Detail ────────────────────────────────────────────────────────────

function renderStationDetail(iata) {
  const station = getStation(iata);
  if (!station) { switchToView('dashboard'); renderDashboard(); return; }

  const view = document.getElementById('detail-view');
  view.dataset.iata = iata;

  document.getElementById('detail-title').textContent = `${station.name || station.iataCode} (${station.iataCode})`;

  // General info
  const info = document.getElementById('detail-info');
  const reports = (typeof OAPT_REPORTS !== 'undefined' && OAPT_REPORTS.reports)
    ? (OAPT_REPORTS.reports[iata] || []) : [];
  const asrmCounts = {};
  reports.forEach(r => { asrmCounts[r.i] = (asrmCounts[r.i] || 0) + 1; });
  const topAsrm = Object.entries(asrmCounts).sort((a, b) => b[1] - a[1])[0];
  const activeAsrm = topAsrm
    ? `<a href="#" class="advisor-link" data-advisor="${topAsrm[0]}">${topAsrm[0]}</a> (${topAsrm[1]} reports)`
    : '—';
  const rows = [
    ['Airport', station.airportName || '—'],
    ['Location', station.location || '—'],
    ['Region', station.region || '—'],
    ['Regional Manager', station.regionalManager || '—'],
    ['Safety Advisor', station.advisor || '—'],
    ['Active ASRM', activeAsrm],
    ['IATA Code', station.iataCode],
    ['ICAO Code', station.icaoData?.icaoCode || '—'],
  ];
  info.innerHTML = rows.map(([l, v]) =>
    `<div class="detail-info-row"><span class="detail-info-label">${l}</span><span class="detail-info-value">${v}</span></div>`
  ).join('');

  // Score history chart
  renderDetailScoreChart(station);

  // Operational chart
  renderDetailOpChart(station);

  // Hazards
  const hazards = document.getElementById('detail-hazards');
  const allHazards = new Set();
  ['partA', 'partB', 'partC'].forEach(p => {
    (station[p]?.hazards || []).forEach(h => allHazards.add(h));
  });
  (station.operationalData?.incidentTrends || []).forEach(inc => {
    const key = inc.level4 && inc.level4 !== 'nan' ? inc.level4
      : inc.level3 && inc.level3 !== 'nan' ? inc.level3
        : inc.type;
    if (key && key !== 'nan') allHazards.add(key);
  });
  hazards.innerHTML = allHazards.size
    ? [...allHazards].map(h => `<div class="detail-hazard-item">${h}</div>`).join('')
    : '<div class="empty-state" style="padding:0.5rem">No hazards recorded.</div>';

  // Summary
  renderDetailSummary(station);

  // Occurrence reports
  renderOccurrenceReports(iata);
}

function renderDetailScoreChart(station) {
  if (detailScoreChart) { detailScoreChart.destroy(); detailScoreChart = null; }

  const mode = document.getElementById('detail-score-select').value;
  const history = (station.history || []).filter(h => h.date);
  if (history.length < 2) {
    document.getElementById('detail-score-chart').style.display = 'none';
    document.getElementById('detail-score-empty').style.display = 'block';
    return;
  }

  document.getElementById('detail-score-chart').style.display = 'block';
  document.getElementById('detail-score-empty').style.display = 'none';

  const labels = history.map(h => new Date(h.date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }));
  let data, label, color;
  const isSum = aggregationMode === 'sum';

  if (mode === 'partA') {
    data = history.map(h => h.aSum);
    label = 'Part A Raw Sum';
    color = '#3B82F6';
  } else if (mode === 'partB') {
    data = history.map(h => h.bSum);
    label = 'Part B Raw Sum';
    color = '#F59E0B';
  } else if (mode === 'partC') {
    data = history.map(h => h.cSum);
    label = 'Part C Raw Sum';
    color = '#10B981';
  } else {
    data = history.map(h => isSum ? h.sumScore : h.finalScore);
    label = isSum ? 'Aggregate Sum' : 'Aggregate Score';
    color = '#8B5CF6';
  }

  // Filter out nulls
  const valid = labels.map((l, i) => ({ l, d: data[i] })).filter(x => x.d != null);
  if (valid.length < 2) {
    document.getElementById('detail-score-chart').style.display = 'none';
    document.getElementById('detail-score-empty').style.display = 'block';
    return;
  }

  const canvas = document.getElementById('detail-score-chart');
  detailScoreChart = new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: valid.map(x => x.l),
      datasets: [{
        label,
        data: valid.map(x => x.d),
        borderColor: color,
        backgroundColor: ctx => {
          const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
          g.addColorStop(0, color + '40');
          g.addColorStop(1, color + '05');
          return g;
        },
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.35,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.06)' },
        },
        x: {
          grid: { display: false },
          ticks: { maxTicksLimit: 8, font: { size: 9 } },
        },
      },
    },
  });
}

function renderDetailOpChart(station) {
  if (detailOpChart) { detailOpChart.destroy(); detailOpChart = null; }

  const history = (station.history || []).filter(h => h.date && (h.qci || h.flightNumbers));
  if (history.length < 2) {
    document.getElementById('detail-op-chart').style.display = 'none';
    document.getElementById('detail-op-empty').style.display = 'block';
    return;
  }

  document.getElementById('detail-op-chart').style.display = 'block';
  document.getElementById('detail-op-empty').style.display = 'none';

  const labels = history.map(h => new Date(h.date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }));
  const qciData = history.map(h => { const v = parseFloat(h.qci); return isNaN(v) ? null : v; });
  const fltData = history.map(h => { const v = parseInt(h.flightNumbers, 10); return isNaN(v) ? null : v; });

  const canvas = document.getElementById('detail-op-chart');
  detailOpChart = new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'QCI',
          data: qciData,
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59,130,246,0.1)',
          borderWidth: 2,
          pointRadius: 4,
          tension: 0.35,
          fill: true,
          yAxisID: 'y',
        },
        {
          label: 'Flight Numbers',
          data: fltData,
          borderColor: '#F59E0B',
          borderWidth: 2,
          pointRadius: 4,
          tension: 0.35,
          borderDash: [4, 3],
          fill: false,
          yAxisID: 'y1',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          labels: { font: { size: 10 }, boxWidth: 12, padding: 8 },
        },
        tooltip: {
          callbacks: {
            label: ctx => {
              if (ctx.dataset.label === 'Flight Numbers') {
                return `Flight Numbers: ${ctx.parsed.y}`;
              }
              return `${ctx.dataset.label}: ${ctx.parsed.y}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.06)' },
          title: { display: true, text: 'QCI', font: { size: 9 } },
        },
        y1: {
          position: 'right',
          beginAtZero: true,
          grid: { drawOnChartArea: false },
          title: { display: true, text: 'Flight Numbers', font: { size: 9 } },
        },
        x: {
          grid: { display: false },
          ticks: { maxTicksLimit: 8, font: { size: 9 } },
        },
      },
    },
  });
}

function renderDetailSummary(station) {
  const el = document.getElementById('detail-summary');
  const cs = getCompositeScore(station);
  if (!cs) {
    el.innerHTML = '<div class="empty-state" style="padding:0.5rem">No assessment data yet.</div>';
    return;
  }

  const isSum = aggregationMode === 'sum';
  const parts = ['partA', 'partB', 'partC'];
  const labels = ['Part A', 'Part B', 'Part C'];
  const colors = ['badge-a', 'badge-b', 'badge-c'];

  let html = '';
  parts.forEach((p, i) => {
    if (p === 'partB') {
      const bList = getPartBList(station);
      const bCount = getPartBCount(station);
      const bComplete = bCount > 0;
      const status = bComplete ? `✓ Complete (${bCount} SP${bCount > 1 ? 's' : ''})` : '✗ Not Started';
      const earliest = bList.filter(b => b.date).map(b => b.date).sort().shift() || '—';
      const latest = bList.filter(b => b.date).map(b => b.date).sort().pop() || '';
      const date = earliest !== latest && latest ? `${earliest} – ${latest}` : earliest;
      html += `<div class="detail-summary-row">
        <span class="badge ${colors[i]}" style="font-size:0.6rem;padding:1px 6px">${labels[i]}</span>
        <span class="detail-summary-status">${status}</span>
        <span class="detail-summary-date">${date}</span>
      </div>`;
      return;
    }
    const s = station[p];
    const status = s?.status === 'complete' ? '✓ Complete' : '✗ Not Started';
    const date = s?.date || '—';
    html += `<div class="detail-summary-row">
      <span class="badge ${colors[i]}" style="font-size:0.6rem;padding:1px 6px">${labels[i]}</span>
      <span class="detail-summary-status">${status}</span>
      <span class="detail-summary-date">${date}</span>
    </div>`;
  });

  let aggLabel, aggVal, aggTier;
  if (isSum) {
    aggLabel = 'Aggregate Sum';
    aggVal = cs.finalScore != null ? `${cs.finalScore} / ${cs.sumMax}` : '—';
    aggTier = cs.tier?.tier || '—';
  } else {
    aggLabel = 'Final Score';
    aggVal = cs.finalScore != null ? cs.finalScore.toFixed(2) : '—';
    aggTier = cs.tier?.tier || '—';
  }

  html += `<div class="detail-summary-row detail-summary-total">
    <span class="detail-summary-label">${aggLabel}</span>
    <span class="detail-summary-value">${aggVal}</span>
    <span class="tier-badge ${cs.tier?.cls || ''}" style="font-size:0.6rem">${aggTier}</span>
  </div>`;

  const logP = cs.logPScore ?? 0;
  const cred = cs.credibility ?? 0;
  const alertHtmls = [];
  if ((cs.smpri ?? cs.finalScore ?? 0) >= 1.5 || (logP >= 2.0 && cred >= 0.5)) {
    alertHtmls.push('<span style="display:inline-block;padding:1px 8px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEE2E2;color:#991B1B">Immediate Action Alert</span>');
  }
  if ((cs.stationUniqueCount ?? 0) === 0 && (cs.expectedIncidents ?? 0) >= 3.0) {
    alertHtmls.push('<span style="display:inline-block;padding:1px 8px;border-radius:3px;font-size:0.7rem;font-weight:700;background:#FEF3C7;color:#92400E">Reporting Quality Audit Required</span>');
  }
  if (alertHtmls.length) {
    html += `<div class="detail-summary-row" style="margin-top:6px;gap:6px;align-items:center">${alertHtmls.join(' ')}</div>`;
  }

  // Operational multiplier
  const op = station.operationalData;
  html += `<div class="detail-summary-row">
    <span class="detail-summary-label">QCI</span>
    <span class="detail-summary-value">${op?.qci || '—'}</span>
  </div>
  <div class="detail-summary-row">
    <span class="detail-summary-label">Flight Numbers</span>
    <span class="detail-summary-value">${op?.flightNumbers || '—'}</span>
  </div>
  <div class="detail-summary-row">
    <span class="detail-summary-label">Audit Findings</span>
    <span class="detail-summary-value" style="font-size:0.7rem;white-space:pre-wrap">${op?.auditFindings || '—'}</span>
  </div>`;

  el.innerHTML = html;
}

// ─── Init ─────────────────────────────────────────────────────────────────────

function updateHeaderFormula() {
  const el = document.getElementById('header-formula');
  const btn = document.getElementById('agg-toggle');
  if (aggregationMode === 'sum') {
    btn.textContent = 'Σ Sum';
    el.innerHTML = `
      <span class="formula-pill formula-a">A</span>
      <span class="formula-op">+</span>
      <span class="formula-pill formula-b">B</span>
      <span class="formula-op">+</span>
      <span class="formula-pill formula-c">C</span>
      <span class="formula-op">=</span>
      <span class="formula-pill formula-final">Σ Sum</span>`;
  } else if (aggregationMode === 'risk') {
    btn.textContent = '⚠ Risk (OAPT+SAPT)';
    el.innerHTML = `
      <span class="formula-pill formula-a">L1×50</span>
      <span class="formula-op">+</span>
      <span class="formula-pill formula-b">L2×250</span>
      <span class="formula-op">+</span>
      <span class="formula-pill formula-c">L3×1250</span>
      <span class="formula-op">÷</span>
      <span class="formula-pill formula-final">Flights (or global count)</span>`;
  } else if (aggregationMode === 'rpi') {
    const rpi = loadRpiSettings();
    btn.textContent = '📊 RPI';
    el.innerHTML = `
      <span class="formula-pill formula-a">W<sub>A</sub>×A</span>
      <span class="formula-op">+</span>
      <span class="formula-pill formula-b">W<sub>B</sub>×B</span>
      <span class="formula-op">+</span>
      <span class="formula-pill formula-c">W<sub>C</sub>×C</span>
      <span class="formula-op">+</span>
      <span class="formula-pill formula-final">W<sub>R</sub>×Risk</span>
      <span class="formula-op">=</span>
      <span class="formula-pill formula-final" style="font-size:0.7rem">(${rpi.formula === 'option1' ? 'Norm→Scale' : 'Total→Net'})</span>`;
  } else if (aggregationMode === 'smpri') {
    const rpi = loadRpiSettings();
    btn.textContent = '📊 SMPRI';
    el.innerHTML = `
      <span class="formula-pill formula-a">w<sub>A</sub>·z<sub>A</sub></span>
      <span class="formula-op">+</span>
      <span class="formula-pill formula-b">w<sub>B</sub>·z<sub>B</sub></span>
      <span class="formula-op">+</span>
      <span class="formula-pill formula-c">w<sub>C</sub>·z<sub>C</sub></span>
      <span class="formula-op">+</span>
      <span class="formula-pill formula-final">w<sub>R</sub>·z<sub>R</sub></span>
      <span class="formula-op">=</span>
      <span class="formula-pill formula-final" style="font-size:0.7rem">(Z-scores, Empirical Bayes K)</span>`;
  } else {
    btn.textContent = 'Σ Weighted';
    el.innerHTML = `
      <span class="formula-pill formula-a">A Base</span>
      <span class="formula-op">×</span>
      <span class="formula-pill formula-b">B Multiplier</span>
      <span class="formula-op">×</span>
      <span class="formula-pill formula-c">C Multiplier</span>
      <span class="formula-op">=</span>
      <span class="formula-pill formula-final">Final Score</span>`;
  }
}

// ─── Occurrence Reports ────────────────────────────────────────────────────────

function renderOccurrenceReports(iata) {
  const el = document.getElementById('detail-reports');
  if (!el) return;
  const allReports = (typeof OAPT_REPORTS !== 'undefined' && OAPT_REPORTS.reports)
    ? (OAPT_REPORTS.reports[iata] || []) : [];
  if (!allReports || !allReports.length) {
    el.innerHTML = '<div class="empty-state" style="padding:1rem">No occurrence reports for this station.</div>';
    renderConcernChart([]);
    return;
  }

  // Date range
  const dates = allReports.map(r => r.c).filter(Boolean).sort();
  const minDate = dates[0] || '';
  const maxDate = dates[dates.length - 1] || '';

  // Get unique report types for dropdown
  const typeOpts = [...new Set(allReports.map(r => r.t).filter(Boolean))].sort();

  // Read filter values
  const fromInput = document.getElementById('report-filter-from');
  const toInput = document.getElementById('report-filter-to');
  const typeInput = document.getElementById('report-filter-type');
  const filterFrom = fromInput ? fromInput.value : minDate;
  const filterTo = toInput ? toInput.value : maxDate;
  const filterType = typeInput ? typeInput.value : '';

  // Apply filters
  const reports = allReports.filter(r => {
    if (r.c && filterFrom && r.c < filterFrom) return false;
    if (r.c && filterTo && r.c > filterTo) return false;
    if (filterType && r.t !== filterType) return false;
    return true;
  });

  const total = reports.length;
  const open = reports.filter(r => !r.l).length;
  const closed = reports.filter(r => r.l).length;

  // Importer breakdown
  const importerCounts = {};
  reports.forEach(r => { importerCounts[r.i] = (importerCounts[r.i] || 0) + 1; });

  const sorted = [...reports].sort((a, b) => (b.c || '').localeCompare(a.c || ''));

  el.innerHTML = `
    <div class="detail-reports-summary">
      <div class="detail-reports-stat">
        <span class="detail-reports-stat-num">${total}</span>
        <span class="detail-reports-stat-label">Filtered</span>
      </div>
      <div class="detail-reports-stat open">
        <span class="detail-reports-stat-num">${open}</span>
        <span class="detail-reports-stat-label">Open</span>
      </div>
      <div class="detail-reports-stat closed">
        <span class="detail-reports-stat-num">${closed}</span>
        <span class="detail-reports-stat-label">Closed</span>
      </div>
    </div>
    <div class="detail-reports-filter">
      <label class="report-filter-group">
        <span>From</span>
        <input type="date" id="report-filter-from" value="${filterFrom}" min="${minDate}" max="${maxDate}">
      </label>
      <label class="report-filter-group">
        <span>To</span>
        <input type="date" id="report-filter-to" value="${filterTo}" min="${minDate}" max="${maxDate}">
      </label>
      <label class="report-filter-group">
        <span>Type</span>
        <select id="report-filter-type">
          <option value="">All Types</option>
          ${typeOpts.map(t => `<option value="${t}"${t === filterType ? ' selected' : ''}>${t}</option>`).join('')}
        </select>
      </label>
      <button class="btn btn-secondary" id="report-filter-reset" style="font-size:0.7rem;padding:0.15rem 0.5rem;min-height:auto;min-width:auto">Reset</button>
    </div>
    <div class="detail-reports-asrm-bar" style="${reports.length ? '' : 'display:none'}">
      ${Object.entries(importerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) =>
        `<span class="detail-reports-asrm-pill">${name} <span class="count">(${count})</span></span>`
      ).join('')}
      ${Object.keys(importerCounts).length > 8 ? `<span class="detail-reports-asrm-pill">+${Object.keys(importerCounts).length - 8} more</span>` : ''}
    </div>
    <div class="detail-reports-list">
      ${sorted.length
      ? sorted.map(r => {
        const isClosed = !!r.l;
        return `<div class="detail-reports-item">
              <div class="detail-reports-item-header">
                <span class="report-no">${r.r}</span>
                <span class="report-date">${r.c || '—'}</span>
                <span class="report-type-badge">${r.t || ''}</span>
                <span class="report-asrm">${r.i}</span>
                ${isClosed
            ? `<span class="report-closed">✓ Closed ${r.l}${r.b ? ' by ' + r.b : ''}</span>`
            : `<span class="report-open">○ Open</span>`}
              </div>
              ${r.n && r.n.length
            ? `<div class="report-concerns">${r.n.map(c => `<span class="report-concern-tag">${c}</span>`).join('')}</div>`
            : ''}
              <div class="report-desc">${r.d || ''}</div>
            </div>`;
      }).join('')
      : '<div class="empty-state" style="padding:0.75rem">No reports match the selected filters.</div>'}
    </div>`;

  renderConcernChart(reports);
}

function renderConcernChart(reports) {
  if (detailConcernChart) { detailConcernChart.destroy(); detailConcernChart = null; }

  const canvas = document.getElementById('detail-concern-chart');
  const empty = document.getElementById('detail-concern-empty');
  if (!canvas || !empty) return;

  // Collect concerns from filtered reports
  const counts = {};
  reports.forEach(r => {
    (r.n || []).forEach(c => { counts[c] = (counts[c] || 0) + 1; });
  });

  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (!entries.length) {
    canvas.style.display = 'none';
    empty.style.display = 'block';
    return;
  }

  canvas.style.display = 'block';
  empty.style.display = 'none';

  const top = entries.slice(0, 12);
  const labels = top.map(e => e[0]);
  const data = top.map(e => e[1]);

  const colors = ['#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#EC4899',
    '#14B8A6', '#F97316', '#6366F1', '#84CC16', '#06B6D4', '#D946EF'];

  detailConcernChart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Reports',
        data,
        backgroundColor: colors.slice(0, top.length),
        borderWidth: 0,
        borderRadius: 3,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: { precision: 0, font: { size: 9 } },
          grid: { color: 'rgba(0,0,0,0.06)' },
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 8 } },
        },
      },
    },
  });
}

// ─── Settings Page ────────────────────────────────────────────────────────────

const REGION_COLORS_DEFAULT = {
  'Western Canada & Mexico': '#3B82F6',
  'Central Canada & LATAM': '#8B5CF6',
  'Eastern Canada & Europe & Asia': '#10B981',
  'US & Caribbean': '#F59E0B',
};
const REGION_COLORS_KEY = 'stationRiskRegionColors';

function getRegionColors() {
  try {
    const saved = localStorage.getItem(REGION_COLORS_KEY);
    return saved ? JSON.parse(saved) : { ...REGION_COLORS_DEFAULT };
  } catch (_) { return { ...REGION_COLORS_DEFAULT }; }
}

function getAllStations() {
  const iatas = new Set();
  if (typeof STATION_COORDS !== 'undefined') Object.keys(STATION_COORDS).forEach(k => iatas.add(k));
  if (typeof CRS_MERGED_REPORTS !== 'undefined') CRS_MERGED_REPORTS.forEach(r => {
    if (r.c && r.c !== 'NA') {
      const iata = (typeof ICAO_TO_IATA_GLOBAL !== 'undefined' && ICAO_TO_IATA_GLOBAL[r.c]) || (r.c.startsWith('C') ? r.c.slice(1) : r.c.startsWith('K') ? r.c.slice(1) : null);
      if (iata) iatas.add(iata);
    }
  });
  return [...iatas].sort();
}

function getUnassignedStations() {
  const assigned = new Set(Object.keys(REGION_MAP));
  return getAllStations().filter(s => !assigned.has(s));
}

function renderSettings() {
  // Populate title fields
  const titleInput = document.getElementById('settings-title');
  const subtitleInput = document.getElementById('settings-subtitle');
  const savedTitle = localStorage.getItem(TITLE_SETTINGS_KEY);
  if (savedTitle) {
    try { const t = JSON.parse(savedTitle); titleInput.value = t.title || ''; subtitleInput.value = t.subtitle || ''; } catch (_) { }
  }

  // Populate RPI settings
  const rpi = loadRpiSettings();
  document.getElementById('settings-rpi-formula').value = rpi.formula;
  document.getElementById('settings-weight-a').value = rpi.weightA;
  document.getElementById('settings-weight-b').value = rpi.weightB;
  document.getElementById('settings-weight-c').value = rpi.weightC;
  document.getElementById('settings-weight-r').value = rpi.weightR;

  const container = document.getElementById('settings-regions');
  const regionColors = getRegionColors();
  const allStations = getAllStations();

  // Get unique region names
  const regionNames = [...new Set(Object.values(REGION_MAP))].sort();

  let html = '';
  regionNames.forEach(region => {
    const stations = Object.entries(REGION_MAP).filter(([_, r]) => r === region).map(([s]) => s).sort();
    const color = regionColors[region] || '#64748B';
    html += `<div class="settings-region-block" data-region="${escHtml(region)}">
      <div class="settings-region-header">
        <div class="settings-color-dot" style="background:${color}" onclick="this.querySelector('input').click()">
          <input type="color" value="${color}" data-region="${escHtml(region)}" onchange="handleRegionColorChange(this)">
        </div>
        <input type="text" class="settings-region-name-input" value="${escHtml(region)}" data-original="${escHtml(region)}">
        <button class="settings-region-delete" onclick="handleDeleteRegion('${escHtml(region)}')">Remove</button>
      </div>
      <div class="settings-stations-grid">
        ${stations.map(s => `<span class="settings-station-chip">${s}<button onclick="handleRemoveStation('${s}','${escHtml(region)}')">&times;</button></span>`).join('')}
      </div>
      <div class="settings-add-station-row">
        <select class="settings-station-add-select" data-region="${escHtml(region)}">
          <option value="">Add station...</option>
          ${allStations.filter(s => !stations.includes(s)).map(s => `<option value="${s}">${s}</option>`).join('')}
        </select>
        <button class="btn btn-sm btn-secondary" onclick="handleAddStation(this)">Add</button>
      </div>
    </div>`;
  });

  // Unassigned stations
  const unassigned = getUnassignedStations();
  if (unassigned.length) {
    html += `<div class="settings-region-block settings-unassigned" data-region="__unassigned">
      <div class="settings-region-header">
        <span style="font-weight:700;font-size:0.85rem">Unassigned (${unassigned.length})</span>
      </div>
      <div class="settings-stations-grid">
        ${unassigned.map(s => `<span class="settings-station-chip">${s}</span>`).join('')}
      </div>
    </div>`;
  }

  container.innerHTML = html;

  // Wire up save/reset
  document.getElementById('settings-save').onclick = saveSettings;
  document.getElementById('settings-reset').onclick = resetSettings;
  document.getElementById('settings-add-region').onclick = addNewRegion;
  document.getElementById('settings-add-composed').onclick = addNewComposedRegion;

  // Render composed regions
  renderComposedRegions();

  // Distribution page Apply button
  const distApply = document.getElementById('dist-apply');
  if (distApply) distApply.addEventListener('click', renderNetworkDistribution);
}

function handleRemoveStation(iata, region) {
  delete REGION_MAP[iata];
  renderSettings();
}

function handleAddStation(btn) {
  const row = btn.closest('.settings-add-station-row');
  const select = row.querySelector('select');
  const iata = select.value;
  const region = select.dataset.region;
  if (!iata) return;
  REGION_MAP[iata] = region;
  renderSettings();
}

function handleDeleteRegion(region) {
  const stations = Object.entries(REGION_MAP).filter(([_, r]) => r === region);
  if (stations.length) {
    if (!confirm(`Remove region "${region}"? ${stations.length} station(s) will become unassigned.`)) return;
    stations.forEach(([s]) => delete REGION_MAP[s]);
  }
  renderSettings();
}

function handleRegionColorChange(input) {
  const region = input.dataset.region;
  const color = input.value;
  const colors = getRegionColors();
  colors[region] = color;
  localStorage.setItem(REGION_COLORS_KEY, JSON.stringify(colors));
  input.closest('.settings-color-dot').style.background = color;
}

function addNewRegion() {
  const name = prompt('Enter new region name:');
  if (!name || !name.trim()) return;
  const trimmed = name.trim();
  // Check for duplicate
  const existing = [...new Set(Object.values(REGION_MAP))];
  if (existing.includes(trimmed)) { alert('Region already exists.'); return; }
  // Add with a default color
  const colors = getRegionColors();
  if (!colors[trimmed]) {
    const palette = ['#EC4899', '#14B8A6', '#8B5CF6', '#F59E0B', '#3B82F6', '#10B981', '#EF4444', '#6366F1'];
    colors[trimmed] = palette[existing.length % palette.length];
    localStorage.setItem(REGION_COLORS_KEY, JSON.stringify(colors));
  }
  renderSettings();
}

function renderComposedRegions() {
  const container = document.getElementById('settings-composed-regions');
  if (!container) return;
  const subRegions = getSubRegions();
  const composedNames = Object.keys(COMPOSED_REGIONS).sort();

  if (composedNames.length === 0 && subRegions.length === 0) {
    container.innerHTML = '<div style="color:var(--color-text-muted);font-size:0.8rem;padding:0.5rem 0">No sub-regions exist yet. Create regions in the section above first.</div>';
    return;
  }

  const assignedSubs = new Set(Object.values(COMPOSED_REGIONS).flat());
  const unassignedSubs = subRegions.filter(s => !assignedSubs.includes(s));

  let html = '';

  if (composedNames.length > 0) {
    composedNames.forEach(name => {
      const subs = COMPOSED_REGIONS[name] || [];
      const stationCount = subs.reduce((sum, sub) => {
        return sum + Object.values(REGION_MAP).filter(r => r === sub).length;
      }, 0);
      html += `<div class="settings-composed-block" style="border:1px solid var(--color-border);border-radius:8px;padding:0.75rem;margin-bottom:0.5rem;background:var(--color-bg-alt, #f9fafb)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem">
          <div style="display:flex;align-items:center;gap:0.5rem">
            <span style="font-weight:700;font-size:0.85rem;color:var(--color-text)">${escHtml(name)}</span>
            <span style="font-size:0.7rem;color:var(--color-text-muted)">${stationCount} stations</span>
          </div>
          <button class="btn btn-sm btn-secondary" onclick="handleDeleteComposedRegion('${escHtml(name)}')" style="font-size:0.7rem;padding:2px 8px">Remove</button>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:0.35rem">
          ${subs.map(sub => {
            const count = Object.values(REGION_MAP).filter(r => r === sub).length;
            return `<span style="display:inline-flex;align-items:center;gap:4px;background:var(--color-primary-light, #EFF6FF);color:var(--color-primary, #3B82F6);padding:2px 8px;border-radius:4px;font-size:0.72rem;font-weight:600">${escHtml(sub)} <span style="font-weight:400;opacity:0.7">(${count})</span> <button onclick="handleRemoveSubFromComposed('${escHtml(name)}','${escHtml(sub)}')" style="background:none;border:none;color:inherit;cursor:pointer;padding:0;font-size:0.8rem;line-height:1">&times;</button></span>`;
          }).join('')}
        </div>
        <div style="margin-top:0.4rem;display:flex;gap:0.35rem;align-items:center">
          <select class="settings-composed-add-sub" data-composed="${escHtml(name)}" style="font-size:0.75rem;padding:2px 6px;border:1px solid var(--color-border);border-radius:4px">
            <option value="">Add sub-region...</option>
            ${subRegions.filter(s => !subs.includes(s)).map(s => `<option value="${escHtml(s)}">${escHtml(s)}</option>`).join('')}
          </select>
          <button class="btn btn-sm btn-secondary" onclick="handleAddSubToComposed(this)" style="font-size:0.7rem;padding:2px 8px">Add</button>
        </div>
      </div>`;
    });
  }

  if (unassignedSubs.length > 0) {
    html += `<div style="margin-top:0.5rem;padding:0.5rem;background:var(--color-bg);border-radius:6px;border:1px dashed var(--color-border)">
      <span style="font-size:0.75rem;font-weight:600;color:var(--color-text-muted)">Unassigned sub-regions:</span>
      <div style="display:flex;flex-wrap:wrap;gap:0.35rem;margin-top:0.3rem">
        ${unassignedSubs.map(s => {
          const count = Object.values(REGION_MAP).filter(r => r === s).length;
          return `<span style="font-size:0.72rem;color:var(--color-text-muted)">${escHtml(s)} (${count})</span>`;
        }).join('<span style="color:var(--color-border)">·</span>')}
      </div>
    </div>`;
  }

  container.innerHTML = html;
}

function handleAddSubToComposed(btn) {
  const row = btn.closest('div');
  const select = row.querySelector('select');
  const composed = select.dataset.composed;
  const sub = select.value;
  if (!sub || !composed) return;
  if (!COMPOSED_REGIONS[composed]) COMPOSED_REGIONS[composed] = [];
  if (!COMPOSED_REGIONS[composed].includes(sub)) COMPOSED_REGIONS[composed].push(sub);
  renderComposedRegions();
}

function handleRemoveSubFromComposed(composed, sub) {
  if (!COMPOSED_REGIONS[composed]) return;
  COMPOSED_REGIONS[composed] = COMPOSED_REGIONS[composed].filter(s => s !== sub);
  if (COMPOSED_REGIONS[composed].length === 0) delete COMPOSED_REGIONS[composed];
  renderComposedRegions();
}

function handleDeleteComposedRegion(name) {
  if (!confirm(`Remove composed region "${name}"?`)) return;
  delete COMPOSED_REGIONS[name];
  renderComposedRegions();
}

function addNewComposedRegion() {
  const input = document.getElementById('composed-region-name');
  const name = input.value.trim();
  if (!name) return;
  if (COMPOSED_REGIONS[name]) { alert('Composed region already exists.'); return; }
  const allRegionNames = getAllRegions();
  if (allRegionNames.includes(name)) { alert('Name conflicts with an existing sub-region. Choose a different name.'); return; }
  COMPOSED_REGIONS[name] = [];
  input.value = '';
  renderComposedRegions();
}

function saveSettings() {
  const title = document.getElementById('settings-title').value.trim();
  const subtitle = document.getElementById('settings-subtitle').value.trim();

  // Save title
  localStorage.setItem(TITLE_SETTINGS_KEY, JSON.stringify({ title, subtitle }));
  if (title) document.querySelector('header h1').textContent = title;
  if (subtitle) document.querySelector('header p').textContent = subtitle;

  // Save region name renames from DOM
  document.querySelectorAll('.settings-region-name-input').forEach(input => {
    const original = input.dataset.original;
    const newName = input.value.trim();
    if (!newName || newName === original) return;
    // Rename all stations from old to new
    Object.keys(REGION_MAP).forEach(k => {
      if (REGION_MAP[k] === original) REGION_MAP[k] = newName;
    });
  });

  // Save region map
  localStorage.setItem(REGION_SETTINGS_KEY, JSON.stringify({ regionMap: REGION_MAP, geoAreas: REGION_GEO_AREAS, composedRegions: COMPOSED_REGIONS }));

  // Update REGION_GEO_AREAS in the page (for map polygon overlays)
  if (typeof REGION_GEO_AREAS !== 'undefined') {
    const newGeo = {};
    const oldGeo = { ...REGION_GEO_AREAS };
    // Map old region names to new ones
    const nameMapping = {};
    document.querySelectorAll('.settings-region-name-input').forEach(input => {
      const original = input.dataset.original;
      const newName = input.value.trim();
      if (newName && newName !== original) nameMapping[original] = newName;
    });
    Object.entries(REGION_MAP).forEach(([_, region]) => {
      if (!newGeo[region]) {
        const srcName = Object.entries(nameMapping).find(([_, n]) => n === region)?.[0];
        newGeo[region] = (srcName && oldGeo[srcName]) || oldGeo[region] || [];
      }
    });
    Object.assign(REGION_GEO_AREAS, newGeo);
    // Remove old names that were renamed
    Object.keys(nameMapping).forEach(old => { if (old !== nameMapping[old]) delete REGION_GEO_AREAS[old]; });
  }

  // Save RPI settings
  saveRpiSettings({
    formula: document.getElementById('settings-rpi-formula').value,
    weightA: parseFloat(document.getElementById('settings-weight-a').value) || 0.25,
    weightB: parseFloat(document.getElementById('settings-weight-b').value) || 0.25,
    weightC: parseFloat(document.getElementById('settings-weight-c').value) || 0.25,
    weightR: parseFloat(document.getElementById('settings-weight-r').value) || 0.25,
  });
  _riskScoreCache.clear();

  document.getElementById('settings-status').textContent = 'Settings saved.';
  setTimeout(() => { document.getElementById('settings-status').textContent = ''; }, 3000);
  renderSettings();
}

function resetSettings() {
  if (!confirm('Reset all settings to defaults?')) return;
  localStorage.removeItem(REGION_SETTINGS_KEY);
  localStorage.removeItem(TITLE_SETTINGS_KEY);
  localStorage.removeItem(REGION_COLORS_KEY);
  localStorage.removeItem(RPI_SETTINGS_KEY);
  // Reload page to pick up defaults
  location.reload();
}

// Pre-compute lowercase search text for CRS records (avoids per-keystroke toLowerCase)
function _precomputeCrsSearchText() {
  if (typeof CRS_MERGED_REPORTS === 'undefined') return;
  CRS_MERGED_REPORTS.forEach(r => {
    r._nLow = (r.n || []).join(' ').toLowerCase();
    r._rdLow = (r.rd || '').toLowerCase();
    r._stLow = (r.st || '').toLowerCase();
    r._oLow = (r.o || '').toLowerCase();
  });
}
_precomputeCrsSearchText();

function init() {
  loadAggMode();
  updateHeaderFormula();

  // Set default date range to last 7 days
  const dateFrom = document.getElementById('map-issues-date-from');
  const dateTo = document.getElementById('map-issues-date-to');
  if (dateFrom && !dateFrom.value) {
    const d = new Date(); d.setDate(d.getDate() - 7);
    dateFrom.value = d.toISOString().substring(0, 10);
  }
  if (dateTo && !dateTo.value) {
    dateTo.value = new Date().toISOString().substring(0, 10);
  }

  // Load saved title settings
  try {
    const savedTitle = localStorage.getItem(TITLE_SETTINGS_KEY);
    if (savedTitle) {
      const t = JSON.parse(savedTitle);
      if (t.title) document.querySelector('header h1').textContent = t.title;
      if (t.subtitle) document.querySelector('header p').textContent = t.subtitle;
    }
  } catch (_) { }

  // Seed Excel data on first run
  if (!localStorage.getItem(EXCEL_SEEDED_KEY)) {
    importExcelData(false);
    localStorage.setItem(EXCEL_SEEDED_KEY, '1');
  }

  buildAxisInputs('partA-axes', AXES.partA, 'partA');
  buildAxisInputs('partB-axes', AXES.partB, 'partB');
  buildAxisInputs('partC-axes', AXES.partC, 'partC');

  // Populate filter dropdowns before initial renders
  ['rankings-filter-sp', 'list-filter-sp', 'dash-filter-sp'].forEach(id => populateSpFilter(id));
  ['rankings-filter-region', 'list-filter-region', 'dash-filter-region'].forEach(id => populateRegionFilter(id));
  ['rankings-filter-airline', 'list-filter-airline', 'dash-filter-airline'].forEach(id => populateAirlineFilter(id));
  ['rankings-filter-aircraft', 'list-filter-aircraft', 'dash-filter-aircraft'].forEach(id => populateAircraftFilter(id));

  renderDashboard();
  renderForm();
  renderStationList();
  populateCompareSelectors();
  loadISITTaxonomy();

  // Aggregation toggle
  document.getElementById('agg-toggle').addEventListener('click', () => {
    aggregationMode = aggregationMode === 'weighted' ? 'sum' : aggregationMode === 'sum' ? 'risk' : aggregationMode === 'risk' ? 'rpi' : aggregationMode === 'rpi' ? 'smpri' : 'weighted';
    saveAggMode();
    const labels = { sum: 'Σ Sum', risk: '⚠ Risk (OAPT+SAPT)', rpi: '📊 RPI', smpri: '📊 SMPRI', weighted: 'Σ Weighted' };
    document.getElementById('agg-toggle').textContent = labels[aggregationMode];
    updateHeaderFormula();
    if (currentStation) {
      renderScoreBreakdown(currentStation);
      renderFormChart(currentStation);
      renderTrendChart(currentStation);
      renderStationIcaoContext(currentStation);
      updateRiskAlerts();
    }
    renderDashboard();
    renderStationList();
    renderRankings();
    renderCompare();
    renderStationMap();
  });

  // Tab navigation
  function switchToView(viewId) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`${viewId}-view`).classList.add('active');
    // Keep dashboard tab lit when viewing station detail
    if (viewId === 'detail') {
      document.querySelector('.tab[data-view="dashboard"]').classList.add('active');
    }
  }

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      switchToView(tab.dataset.view);
      if (tab.dataset.view === 'dashboard') renderDashboard();
      if (tab.dataset.view === 'list') renderStationList();
      if (tab.dataset.view === 'compare') populateCompareSelectors();
      if (tab.dataset.view === 'rankings') renderRankings();
      if (tab.dataset.view === 'icao') renderIcaoRecent();
      if (tab.dataset.view === 'map') renderStationMap();
      if (tab.dataset.view === 'dist') renderNetworkDistribution();
      if (tab.dataset.view === 'reporters') renderReportersPage();
      if (tab.dataset.view === 'import') { /* static UI, no render needed */ }
      if (tab.dataset.view === 'issues') { renderCrsMergedIssues(); }
      if (tab.dataset.view === 'settings') renderSettings();
      if (tab.dataset.view === 'form') {
        renderForm();
        if (currentStation) loadStationIntoForm(currentStation.iataCode || 'new');
      }
    });
  });

  // Back button from station detail
  document.getElementById('detail-back').addEventListener('click', () => {
    switchToView('dashboard');
    renderDashboard();
  });

  // Station detail score selector
  document.getElementById('detail-score-select').addEventListener('change', () => {
    const iata = document.getElementById('detail-view').dataset.iata;
    if (iata) renderStationDetail(iata);
  });

  // Click station on dashboard → detail view
  document.getElementById('dashboard-view').addEventListener('click', e => {
    const link = e.target.closest('.advisor-link');
    if (link && link.dataset.advisor) {
      e.preventDefault();
      switchToView('advisor');
      renderAdvisorAnalysis(link.dataset.advisor, link.dataset.region || '');
      return;
    }
    const advisor = e.target.closest('.dash-advisor-card');
    if (advisor && advisor.dataset.advisor) {
      const region = advisor.dataset.region || '';
      switchToView('advisor');
      renderAdvisorAnalysis(advisor.dataset.advisor, region);
      return;
    }
    const item = e.target.closest('.dash-station-item, .dash-region-station, .dash-sp-station, .dash-sp-contrib');
    if (item && item.dataset.iata) {
      switchToView('detail');
      renderStationDetail(item.dataset.iata);
    }
  });

  // Click advisor link in station detail
  document.getElementById('detail-view').addEventListener('click', e => {
    const link = e.target.closest('.advisor-link');
    if (link && link.dataset.advisor) {
      e.preventDefault();
      switchToView('advisor');
      renderAdvisorAnalysis(link.dataset.advisor);
    }
  });

  // Click advisor link inside advisor view (e.g. top reporters list)
  document.getElementById('advisor-view').addEventListener('click', e => {
    const link = e.target.closest('.advisor-link');
    if (link && link.dataset.advisor) {
      e.preventDefault();
      renderAdvisorAnalysis(link.dataset.advisor);
    }
  });

  // OAPT report filter events
  document.getElementById('detail-view').addEventListener('change', e => {
    if (e.target.id === 'report-filter-from' || e.target.id === 'report-filter-to' || e.target.id === 'report-filter-type') {
      const iata = document.getElementById('detail-view').dataset.iata;
      if (iata) renderOccurrenceReports(iata);
    }
  });
  document.getElementById('detail-view').addEventListener('click', e => {
    if (e.target.id === 'report-filter-reset') {
      const iata = document.getElementById('detail-view').dataset.iata;
      if (!iata) return;
      const all = (typeof OAPT_REPORTS !== 'undefined' && OAPT_REPORTS.reports)
        ? (OAPT_REPORTS.reports[iata] || []) : [];
      const dates = all.map(r => r.c).filter(Boolean).sort();
      if (dates.length) {
        const from = document.getElementById('report-filter-from');
        const to = document.getElementById('report-filter-to');
        if (from) from.value = dates[0];
        if (to) to.value = dates[dates.length - 1];
      }
      const typeEl = document.getElementById('report-filter-type');
      if (typeEl) typeEl.value = '';
      renderOccurrenceReports(iata);
    }
  });

  document.getElementById('station-selector').addEventListener('change', e => loadStationIntoForm(e.target.value));
  document.getElementById('save-station').addEventListener('click', saveStationFromForm);
  document.getElementById('delete-station').addEventListener('click', () => {
    if (!currentStation?.iataCode) return;
    if (confirm(`Delete station ${currentStation.iataCode}?`)) {
      deleteStation(currentStation.iataCode);
      currentStation = null;
      ['rankings-filter-sp', 'list-filter-sp', 'dash-filter-sp'].forEach(id => populateSpFilter(id));
      ['rankings-filter-region', 'list-filter-region', 'dash-filter-region'].forEach(id => populateRegionFilter(id));
      renderForm();
      loadStationIntoForm('new');
    }
  });
  document.getElementById('partb-add-entry').addEventListener('click', addPartBEntry);
  document.getElementById('partb-remove-entry').addEventListener('click', removePartBEntry);

  // Part B entry tab clicks (delegated)
  document.getElementById('partb-entry-tabs').addEventListener('click', e => {
    const tab = e.target.closest('.partb-entry-tab');
    if (tab) selectPartBEntry(parseInt(tab.dataset.idx, 10));
  });

  // Live score update as user changes selects
  document.addEventListener('change', e => {
    if (!e.target.classList.contains('score-select')) return;
    updateRiskAlerts();
    highlightAxisScores();
    if (currentStation) {
      renderFormChart(currentStation);
      renderScoreBreakdown(currentStation);
    }
  });

  document.getElementById('compare-btn').addEventListener('click', renderCompare);
  document.getElementById('export-json').addEventListener('click', exportJSON);
  document.getElementById('list-export-json').addEventListener('click', exportJSON);
  document.getElementById('refresh-list').addEventListener('click', renderStationList);

  function toggleNormalized() {
    showNormalizedRisk = !showNormalizedRisk;
    ['toggle-normalized', 'rankings-toggle-normalized'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.textContent = showNormalizedRisk ? 'Score' : 'Risk Rate';
    });
    renderStationList();
    renderRankings();
  }
  document.getElementById('toggle-normalized')?.addEventListener('click', toggleNormalized);
  document.getElementById('rankings-toggle-normalized')?.addEventListener('click', toggleNormalized);

  // Import Excel button (re-import with overwrite)
  const importBtn = document.getElementById('import-excel-btn');
  if (importBtn) {
    importBtn.addEventListener('click', () => {
      if (confirm('Re-import all 15 Excel station records? This will overwrite existing axis scores for those stations.')) {
        importExcelData(true);
        ['rankings-filter-sp', 'list-filter-sp', 'dash-filter-sp'].forEach(id => populateSpFilter(id));
        ['rankings-filter-region', 'list-filter-region', 'dash-filter-region'].forEach(id => populateRegionFilter(id));
        renderDashboard();
        renderStationList();
        renderForm();
        populateCompareSelectors();
        alert('Excel data imported successfully.');
      }
    });
  }

  // Filter change events — re-render the active view
  document.getElementById('rankings-view')?.addEventListener('input', e => {
    if (e.target.id?.startsWith('rankings-filter-')) renderRankings();
  });
  document.getElementById('list-view')?.addEventListener('input', e => {
    if (e.target.id?.startsWith('list-filter-')) renderStationList();
  });
  document.getElementById('dashboard-view')?.addEventListener('input', e => {
    if (e.target.id?.startsWith('dash-filter-')) { renderDashboard(); }
  });
  document.getElementById('dashboard-view')?.addEventListener('change', e => {
    if (e.target.id?.startsWith('dash-filter-')) renderDashboard();
  });
  document.getElementById('issues-view')?.addEventListener('input', e => {
    if (e.target.id === 'dash-issues-search') renderCrsMergedIssues();
  });
  document.getElementById('issues-view')?.addEventListener('change', e => {
    if (e.target.id === 'dash-issues-type') updateDashDescFilter(e.target.value);
    if (e.target.id?.startsWith('dash-issues-')) renderCrsMergedIssues();
  });
  document.getElementById('reporters-view')?.addEventListener('input', e => {
    if (e.target.id === 'reporters-page-search') renderReportersPage();
  });
  document.getElementById('reporters-view')?.addEventListener('change', e => {
    if (e.target.id === 'reporters-page-region') renderReportersPage();
  });
  document.getElementById('reporters-view')?.addEventListener('click', e => {
    const link = e.target.closest('.advisor-link');
    if (link && link.dataset.advisor) {
      e.preventDefault();
      switchToView('advisor');
      renderAdvisorAnalysis(link.dataset.advisor, link.dataset.region || '');
    }
  });
  document.getElementById('issues-view')?.addEventListener('click', e => {
    const regionCard = e.target.closest('.dash-issues-region');
    if (regionCard && regionCard.dataset.region) {
      e.preventDefault();
      e.stopPropagation();
      const region = regionCard.dataset.region;
      if (_issuesRegionFilter === region) {
        _issuesRegionFilter = null;
      } else {
        _issuesRegionFilter = region;
      }
      renderCrsMergedIssues();
      return;
    }
    const badge = e.target.closest('#dash-issues-occ-type-badge');
    if (badge) {
      _issuesOccTypeFilter = null;
      renderIssuesOccurrences(_issuesFilteredRecords);
      renderIssuesOccBadge();
      return;
    }
    const occRow = e.target.closest('.dash-issues-occ-row');
    if (occRow && occRow.dataset.occ) {
      // Could link to detail in the future
    }
  });

  initIcao();
  setupOperationalUI();
  setupImportUI();
  loadStationIntoForm('new');

  // ─── CRS+OAPT Merged Issues by Region ─────────────────────────────────────
  initCrsMergedIssues();
}

// ─── CRS+OAPT Merged Issues: filter & render per region ─────────────────────

let _issuesTypeChart = null;
let _issuesDescSetChart = null;
let _issuesL1Chart = null;
let _issuesL2Chart = null;
let _issuesHfacsChart = null;
let _issuesOccTypeFilter = null;
let _issuesRegionFilter = null;
let _issuesDescSetFilter = null;
let _issuesL1Filter = null;
let _issuesL2Filter = null;
let _issuesFilteredRecords = [];

let _dashTypeDescMap = {};

function initCrsMergedIssues() {
  if (typeof CRS_MERGED_REPORTS === 'undefined' || !CRS_MERGED_REPORTS.length) return;

  // Populate filter dropdowns
  const types = new Set();
  const descriptors = new Set();
  const hfacs = new Set();
  const stations = new Set();
  const typeDescMap = {};
  CRS_MERGED_REPORTS.forEach(r => {
    if (r.t) types.add(r.t);
    if (r.d) { descriptors.add(r.d); if (r.t) { if (!typeDescMap[r.t]) typeDescMap[r.t] = new Set(); typeDescMap[r.t].add(r.d); } }
    if (r.h1) hfacs.add(r.h1);
    if (r.c && r.c !== 'ENRTE') stations.add(r.c);
  });
  _dashTypeDescMap = typeDescMap;

  const typeSel = document.getElementById('dash-issues-type');
  const descSel = document.getElementById('dash-issues-descriptor');
  const hfacsSel = document.getElementById('dash-issues-hfacs');
  const stationSel = document.getElementById('dash-issues-station');

  if (typeSel) {
    typeSel.innerHTML = '<option value="">All Types</option>' +
      [...types].sort().map(t => `<option value="${escHtml(t)}">${escHtml(t)}</option>`).join('');
  }
  if (descSel) {
    descSel.innerHTML = '<option value="">All Descriptors</option>' +
      [...descriptors].sort().map(d => `<option value="${escHtml(d)}">${escHtml(d)}</option>`).join('');
  }
  if (hfacsSel) {
    hfacsSel.innerHTML = '<option value="">All HFACS L1</option>' +
      [...hfacs].sort().map(h => `<option value="${escHtml(h)}">${escHtml(h)}</option>`).join('');
  }
  if (stationSel) {
    stationSel.innerHTML = '<option value="">All Stations</option>' +
      [...stations].sort().map(s => `<option value="${escHtml(s)}">${escHtml(s)}</option>`).join('');
  }

  // Event listeners are handled via delegated events on dashboard-view
  renderCrsMergedIssues();
}

function updateDashDescFilter(selectedType) {
  _issuesDescSetFilter = null;
  _issuesL1Filter = null;
  _issuesL2Filter = null;
  const descSel = document.getElementById('dash-issues-descriptor');
  if (!descSel) return;
  const currentVal = descSel.value;
  let descriptors;
  if (selectedType && _dashTypeDescMap[selectedType]) {
    descriptors = [..._dashTypeDescMap[selectedType]].sort();
  } else {
    descriptors = [...new Set(Object.values(_dashTypeDescMap).flatMap(s => [...s]))].sort();
  }
  descSel.innerHTML = '<option value="">All Descriptors</option>' +
    descriptors.map(d => `<option value="${escHtml(d)}"${d === currentVal ? ' selected' : ''}>${escHtml(d)}</option>`).join('');
  if (currentVal && !descriptors.includes(currentVal)) descSel.value = '';
}

function renderCrsMergedIssues() {
  if (typeof CRS_MERGED_REPORTS === 'undefined') return;

  const typeFilter = document.getElementById('dash-issues-type')?.value || '';
  const descFilter = document.getElementById('dash-issues-descriptor')?.value || '';
  const hfacsFilter = document.getElementById('dash-issues-hfacs')?.value || '';
  const stationFilter = (document.getElementById('dash-issues-station')?.value || '').trim();
  const dateFrom = document.getElementById('dash-issues-date-from')?.value || '';
  const dateTo = document.getElementById('dash-issues-date-to')?.value || '';
  const searchFilter = (document.getElementById('dash-issues-search')?.value || '').toLowerCase();
  const airlineFilter = (document.getElementById('dash-filter-airline')?.value || '').trim();
  const aircraftFilter = (document.getElementById('dash-filter-aircraft')?.value || '').trim();

  // Apply region filter from region card clicks
  const regionFilter = _issuesRegionFilter || '';

  // Build station filter set: station code and its IATA mapped form
  let stationFilterSet = null;
  if (stationFilter) {
    stationFilterSet = new Set([stationFilter]);
    // If it's an ICAO code, also accept its IATA equivalent
    const iata = ICAO_TO_IATA_GLOBAL?.[stationFilter];
    if (iata) stationFilterSet.add(iata);
    // If it's an IATA code, accept the station code as-is (already in set)
    // Also accept ICAO variants: C-prefix (Canada) and K-prefix (US)
    if (stationFilter.length === 3 && /^[A-Z]{3}$/.test(stationFilter)) {
      stationFilterSet.add('C' + stationFilter);
      stationFilterSet.add('K' + stationFilter);
    }
  }

  // Filter records
  const filtered = CRS_MERGED_REPORTS.filter(r => {
    if (typeFilter && r.t !== typeFilter) return false;
    if (descFilter && r.d !== descFilter) return false;
    if (hfacsFilter && r.h1 !== hfacsFilter) return false;
    if (stationFilterSet && !stationFilterSet.has(r.c)) return false;
    if (regionFilter && r.r !== regionFilter) return false;
    if (dateFrom || dateTo) {
      const dt = (r.dt || '').substring(0, 10);
      if (!dt) return false;
      if (dateFrom && dt < dateFrom) return false;
      if (dateTo && dt > dateTo) return false;
    }
    if (airlineFilter && r.al !== airlineFilter) return false;
    if (aircraftFilter && r.ac !== aircraftFilter) return false;
    if (searchFilter) {
      const kwRe = new RegExp('\\b' + searchFilter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
      const inConcerns = r._nLow && kwRe.test(r._nLow);
      const inDesc = r._rdLow && kwRe.test(r._rdLow);
      const inSearch = r._stLow && kwRe.test(r._stLow);
      const inOccNo = r._oLow && kwRe.test(r._oLow);
      if (!inConcerns && !inDesc && !inSearch && !inOccNo) return false;
    }
    return true;
  });

  // Update total count (unique occurrences)
  const uniqueOccNos = new Set(filtered.map(r => r.o));
  const totalEl = document.getElementById('dash-issues-total');
  if (totalEl) totalEl.textContent = `${uniqueOccNos.size.toLocaleString()} occurrences · ${filtered.length.toLocaleString()} records`;

  // Group by region
  const regionData = {};
  const regionColors = getRegionColors();
  const hasComposed = Object.keys(COMPOSED_REGIONS).length > 0;
  const uniqueRegions = hasComposed ? Object.keys(COMPOSED_REGIONS).sort() : [...new Set(Object.values(REGION_MAP))].sort();
  const REGION_IDS_ISSUES = uniqueRegions.map(region => ({
    region,
    abbr: region.substring(0, 8).replace(/[^a-z]/gi, '').toLowerCase(),
    color: regionColors[region] || '#64748B',
  }));

  REGION_IDS_ISSUES.forEach(r => { regionData[r.region] = { total: 0, types: {}, cities: {}, occNos: new Set(), occTypes: new Set() }; });

  filtered.forEach(r => {
    let reg = r.r;
    if (hasComposed) {
      reg = getComposedRegionForStation(r.c) || reg;
    }
    if (!regionData[reg]) return;
    const isNew = !regionData[reg].occNos.has(r.o);
    regionData[reg].occNos.add(r.o);
    if (isNew) regionData[reg].total++;
    const t = r.t || 'Unknown';
    const ttKey = r.o + '|' + t;
    if (isNew && !regionData[reg].occTypes.has(ttKey)) {
      regionData[reg].occTypes.add(ttKey);
      regionData[reg].types[t] = (regionData[reg].types[t] || 0) + 1;
    }
    const city = r.c || 'Unknown';
    if (isNew) regionData[reg].cities[city] = (regionData[reg].cities[city] || 0) + 1;
  });

  // Render region panels
  const container = document.getElementById('dash-issues-regions');
  if (!container) return;

  container.innerHTML = REGION_IDS_ISSUES.map(({ region, abbr, color }) => {
    const data = regionData[region];
    const topTypes = Object.entries(data.types)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    const topCities = Object.entries(data.cities)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return `
      <div class="dash-issues-region${_issuesRegionFilter === region ? ' dash-issues-region-active' : ''}" data-region="${escHtml(region)}" style="border-left:3px solid ${color};cursor:pointer;${_issuesRegionFilter === region ? 'background:var(--color-primary-light);' : ''}" title="${_issuesRegionFilter === region ? 'Click to remove region filter' : 'Click to filter by this region'}">
        <div class="dash-issues-region-header">
          <span class="dash-issues-region-name" style="color:${color}">${region}</span>
          <span class="dash-issues-region-count">${data.total.toLocaleString()}</span>
        </div>
        <div class="dash-issues-region-body">
          <div class="dash-issues-region-col">
            <span class="dash-issues-col-label">Top Types</span>
            ${topTypes.map(([t, c]) => `<div class="dash-issues-row dash-issues-clickable" data-region="${escHtml(region)}" data-type="${escHtml(t)}"><span class="dash-issues-row-label">${escHtml(t)}</span><span class="dash-issues-row-count">${c}</span></div>`).join('')}
            ${topTypes.length === 0 ? '<div class="dash-issues-empty">No data</div>' : ''}
          </div>
          <div class="dash-issues-region-col">
            <span class="dash-issues-col-label">Top Locations</span>
            ${topCities.map(([c, n]) => `<div class="dash-issues-row dash-issues-clickable" data-region="${escHtml(region)}" data-city="${escHtml(c)}"><span class="dash-issues-row-label">${escHtml(c)}</span><span class="dash-issues-row-count">${n}</span></div>`).join('')}
            ${topCities.length === 0 ? '<div class="dash-issues-empty">No data</div>' : ''}
          </div>
        </div>
      </div>`;
  }).join('');

  // Click handlers for type and city rows in region panels
  container.onclick = function (e) {
    const row = e.target.closest('.dash-issues-clickable');
    if (!row) return;
    const region = row.dataset.region;
    const type = row.dataset.type;
    const city = row.dataset.city;
    if (!region) return;

    const matching = filtered.filter(r => {
      if (r.r !== region) return false;
      if (type && r.t !== type) return false;
      if (city && r.c !== city) return false;
      return true;
    });
    const uniqueOccs = [];
    const seen = new Set();
    matching.forEach(r => {
      if (!seen.has(r.o)) { seen.add(r.o); uniqueOccs.push(r); }
    });

    const title = type ? `${type} in ${region}` : `${city} in ${region}`;
    showOccNoPopup(title, uniqueOccs);
  };

  // Render type distribution chart
  renderIssuesTypeChart(filtered);

  // Render descriptor distribution charts
  renderIssuesDescSetChart(filtered);
  renderIssuesL1Chart(filtered);
  renderIssuesL2Chart(filtered);
  renderIssuesHfacsChart(filtered);
  renderIssuesActiveFilters();

  // Render top concerns
  renderIssuesConcerns(filtered);

  // Render occurrence list
  _issuesFilteredRecords = filtered;
  _issuesOccTypeFilter = null;
  renderIssuesOccurrences(filtered);
  renderIssuesOccBadge();
}

function renderIssuesTypeChart(records) {
  if (_issuesTypeChart) { _issuesTypeChart.destroy(); _issuesTypeChart = null; }
  const canvas = document.getElementById('dash-issues-type-chart');
  if (!canvas) return;

  // Aggregate by OccType
  const typeCounts = {};
  records.forEach(r => {
    const t = r.t || 'Unknown';
    typeCounts[t] = (typeCounts[t] || 0) + 1;
  });

  const sorted = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).slice(0, 12);
  if (sorted.length === 0) return;

  const labels = sorted.map(([t]) => t);
  const data = sorted.map(([, c]) => c);
  const colors = [
    '#3B82F6', '#22C55E', '#F97316', '#A855F7', '#EF4444', '#06B6D4',
    '#84CC16', '#F59E0B', '#EC4899', '#6366F1', '#14B8A6', '#8B5CF6',
  ];

  const typeFilter = document.getElementById('dash-issues-type')?.value || '';
  _issuesTypeChart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: labels.map((_, i) => typeFilter === labels[i] ? '#EF4444' : colors[i % colors.length]),
        borderRadius: 4,
        barThickness: 16,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      onClick: (evt, elements) => {
        const typeSel = document.getElementById('dash-issues-type');
        if (elements.length > 0) {
          const clickedType = labels[elements[0].index];
          if (typeSel && typeSel.value === clickedType) {
            typeSel.value = '';
          } else if (typeSel) {
            typeSel.value = clickedType;
          }
        } else if (typeSel) {
          typeSel.value = '';
        }
        if (typeSel) updateDashDescFilter(typeSel.value);
        renderCrsMergedIssues();
      },
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { font: { size: 9 } } },
        y: { ticks: { font: { size: 9 } }, grid: { display: false } },
      },
    },
  });
}

function renderIssuesActiveFilters() {
  const wrap = document.getElementById('dash-issues-active-filters');
  const regionSpan = document.getElementById('dash-issues-filter-region');
  const typeSpan = document.getElementById('dash-issues-filter-type');
  if (!wrap) return;
  const hasRegion = !!_issuesRegionFilter;
  const typeFilter = document.getElementById('dash-issues-type')?.value || '';
  const hasType = !!typeFilter;
  const hasHierarchy = !!(_issuesDescSetFilter || _issuesL1Filter || _issuesL2Filter);
  if (!hasRegion && !hasType && !hasHierarchy) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'flex';
  if (regionSpan) {
    regionSpan.innerHTML = hasRegion
      ? `<span style="display:inline-flex;align-items:center;gap:4px;background:var(--color-primary);color:#fff;padding:1px 8px;border-radius:4px;cursor:pointer;font-size:0.7rem" onclick="_issuesRegionFilter=null;renderCrsMergedIssues()">Region: ${escHtml(_issuesRegionFilter)} &times;</span>`
      : '';
  }
  if (typeSpan) {
    typeSpan.innerHTML = hasType
      ? `<span style="display:inline-flex;align-items:center;gap:4px;background:var(--color-primary);color:#fff;padding:1px 8px;border-radius:4px;cursor:pointer;font-size:0.7rem" onclick="document.getElementById('dash-issues-type').value='';updateDashDescFilter('');renderCrsMergedIssues()">Type: ${escHtml(typeFilter)} &times;</span>`
      : '';
  }
  const hierarchyParts = [];
  if (_issuesDescSetFilter) hierarchyParts.push(_issuesDescSetFilter);
  if (_issuesL1Filter) hierarchyParts.push(_issuesL1Filter);
  if (_issuesL2Filter) hierarchyParts.push(_issuesL2Filter);
  const hierWrap = document.getElementById('dash-issues-filter-type');
  if (hierWrap && hierarchyParts.length) {
    hierWrap.innerHTML += `<span style="display:inline-flex;align-items:center;gap:4px;background:#A855F7;color:#fff;padding:1px 8px;border-radius:4px;cursor:pointer;font-size:0.7rem" onclick="_issuesDescSetFilter=null;_issuesL1Filter=null;_issuesL2Filter=null;renderCrsMergedIssues()">${escHtml(hierarchyParts.join(' \u2192 '))} &times;</span>`;
  }
}

const _chartAccentColors = [
  '#3B82F6', '#22C55E', '#F97316', '#A855F7', '#EF4444', '#06B6D4',
  '#84CC16', '#F59E0B', '#EC4899', '#6366F1', '#14B8A6', '#8B5CF6',
  '#F43F5E', '#0EA5E9', '#78716C', '#D946EF', '#10B981', '#FBBF24',
];

function _chartBarOpts(labels, onBarClick, filterVar) {
  return {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    onClick: (evt, elements) => {
      if (elements.length > 0) {
        const clicked = labels[elements[0].index];
        onBarClick(filterVar === clicked ? null : clicked);
      } else {
        onBarClick(null);
      }
    },
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { font: { size: 9 } } },
      y: {
        ticks: {
          font: { size: 9 },
          callback: function (v) {
            const lbl = this.getLabelForValue(v);
            return lbl.length > 30 ? lbl.substring(0, 28) + '\u2026' : lbl;
          },
        },
        grid: { display: false },
      },
    },
  };
}

function _renderBarChart(canvasId, chartVar, counts, filterVar, onBarClick, maxBars) {
  maxBars = maxBars || 15;
  if (chartVar) { chartVar.destroy(); chartVar = null; }
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, maxBars);
  if (sorted.length === 0) {
    canvas.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--color-text-muted);font-size:0.78rem">No data</div>';
    return null;
  }

  const labels = sorted.map(([l]) => l);
  const data = sorted.map(([, c]) => c);
  return new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: labels.map((_, i) => filterVar === labels[i] ? '#EF4444' : _chartAccentColors[i % _chartAccentColors.length]),
        borderRadius: 4,
        barThickness: 16,
      }],
    },
    options: _chartBarOpts(labels, onBarClick, filterVar),
  });
}

function renderIssuesDescSetChart(records) {
  if (_issuesDescSetChart) { _issuesDescSetChart.destroy(); _issuesDescSetChart = null; }
  const counts = {};
  records.forEach(r => { const d = r.d || ''; if (d) counts[d] = (counts[d] || 0) + 1; });
  _issuesDescSetChart = _renderBarChart(
    'dash-issues-descset-chart', _issuesDescSetChart, counts,
    _issuesDescSetFilter,
    (val) => {
      _issuesDescSetFilter = val;
      _issuesL1Filter = null;
      _issuesL2Filter = null;
      renderIssuesDescSetChart(records);
      renderIssuesL1Chart(records);
      renderIssuesL2Chart(records);
    }
  );
}

function renderIssuesL1Chart(records) {
  if (_issuesL1Chart) { _issuesL1Chart.destroy(); _issuesL1Chart = null; }
  const ctx = document.getElementById('dash-issues-l1-context');
  let source = records;
  if (_issuesDescSetFilter) {
    source = records.filter(r => r.d === _issuesDescSetFilter);
    if (ctx) ctx.textContent = `\u2014 filtered by ${_issuesDescSetFilter}`;
  } else {
    if (ctx) ctx.textContent = '';
  }
  const counts = {};
  source.forEach(r => { const l1 = r.l1 || ''; if (l1) counts[l1] = (counts[l1] || 0) + 1; });
  _issuesL1Chart = _renderBarChart(
    'dash-issues-l1-chart', _issuesL1Chart, counts,
    _issuesL1Filter,
    (val) => {
      _issuesL1Filter = val;
      _issuesL2Filter = null;
      renderIssuesL1Chart(records);
      renderIssuesL2Chart(records);
    }
  );
}

function renderIssuesL2Chart(records) {
  if (_issuesL2Chart) { _issuesL2Chart.destroy(); _issuesL2Chart = null; }
  const ctx = document.getElementById('dash-issues-l2-context');
  let source = records;
  if (_issuesDescSetFilter) source = source.filter(r => r.d === _issuesDescSetFilter);
  if (_issuesL1Filter) source = source.filter(r => r.l1 === _issuesL1Filter);
  if (_issuesDescSetFilter || _issuesL1Filter) {
    const parts = [];
    if (_issuesDescSetFilter) parts.push(_issuesDescSetFilter);
    if (_issuesL1Filter) parts.push(_issuesL1Filter);
    if (ctx) ctx.textContent = `\u2014 filtered by ${parts.join(' \u2192 ')}`;
  } else {
    if (ctx) ctx.textContent = '';
  }
  const counts = {};
  source.forEach(r => { const l2 = r.l2 || ''; if (l2) counts[l2] = (counts[l2] || 0) + 1; });
  _issuesL2Chart = _renderBarChart(
    'dash-issues-l2-chart', _issuesL2Chart, counts,
    _issuesL2Filter,
    (val) => {
      _issuesL2Filter = val;
      renderIssuesL2Chart(records);
    }
  );
}

function renderIssuesHfacsChart(records) {
  if (_issuesHfacsChart) { _issuesHfacsChart.destroy(); _issuesHfacsChart = null; }
  const canvas = document.getElementById('dash-issues-hfacs-chart');
  if (!canvas) return;

  const h1Counts = {};
  let total = 0;
  records.forEach(r => {
    const h = r.h1 || '';
    if (!h) return;
    h1Counts[h] = (h1Counts[h] || 0) + 1;
    total++;
  });

  if (total === 0) { canvas.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--color-text-muted);font-size:0.78rem">No HFACS data</div>'; return; }

  const sorted = Object.entries(h1Counts).sort((a, b) => b[1] - a[1]).slice(0, 12);
  const labels = sorted.map(([h]) => h);
  const data = sorted.map(([, c]) => c);

  _issuesHfacsChart = new Chart(canvas.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: labels.map((_, i) => _chartAccentColors[i % _chartAccentColors.length]),
        borderWidth: 1,
        borderColor: 'var(--color-bg)',
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '55%',
      plugins: {
        legend: {
          position: 'right',
          labels: { font: { size: 9 }, boxWidth: 12, padding: 6 },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${ctx.parsed} (${Math.round(ctx.parsed / data.reduce((a, b) => a + b, 0) * 100)}%)`,
          },
        },
      },
    },
  });
}

function showOccNoPopup(title, occs) {
  let overlay = document.getElementById('occno-popup-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'occno-popup-overlay';
    overlay.className = 'occno-popup-overlay';
    overlay.onclick = function (e) { if (e.target === overlay) overlay.remove(); };
    document.body.appendChild(overlay);
  }

  const sorted = occs.sort((a, b) => (b.rc || 0) - (a.rc || 0));
  const rows = sorted.map(r => {
    const types = [];
    if (r.t) types.push(`<span class="occno-popup-type">${escHtml(r.t)}</span>`);
    return `<div class="occno-popup-row">
      <span class="occno-popup-occ">${escHtml(r.o)}</span>
      <span class="occno-popup-rc">${r.rc || 1} report${(r.rc || 1) !== 1 ? 's' : ''}</span>
      ${types.join('')}
      <span class="occno-popup-city">${escHtml(r.c || '')}</span>
      <span class="occno-popup-desc">${escHtml((r.rd || r.st || '').substring(0, 100))}${(r.rd || r.st || '').length > 100 ? '\u2026' : ''}</span>
    </div>`;
  }).join('');

  overlay.innerHTML = `<div class="occno-popup-panel">
    <div class="occno-popup-header">
      <span class="occno-popup-title">${escHtml(title)} — ${occs.length} occurrence${occs.length !== 1 ? 's' : ''}</span>
      <span class="occno-popup-close" onclick="this.closest('.occno-popup-overlay').remove()">&times;</span>
    </div>
    <div class="occno-popup-body">${rows || '<div class="occno-popup-empty">No occurrences found.</div>'}</div>
  </div>`;
}

function renderIssuesConcerns(records) {
  const container = document.getElementById('dash-issues-concerns');
  if (!container) return;

  const concernCounts = {};
  records.forEach(r => {
    (r.n || []).forEach(c => {
      if (c) concernCounts[c] = (concernCounts[c] || 0) + 1;
    });
  });

  const sorted = Object.entries(concernCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  container.innerHTML = sorted.length
    ? sorted.map(([concern, count], i) =>
      `<div class="dash-hazard-item">
          <span class="dash-rank">${i + 1}</span>
          <span class="dash-hazard-name">${escHtml(concern)}</span>
          <span class="dash-hazard-count">${count}</span>
        </div>`
    ).join('')
    : '<div class="empty-state" style="padding:1rem">No concerns in filtered data.</div>';
}

function renderIssuesOccBadge() {
  const badge = document.getElementById('dash-issues-occ-type-badge');
  if (!badge) return;
  if (_issuesOccTypeFilter) {
    badge.style.display = '';
    badge.textContent = `${_issuesOccTypeFilter} \u00d7`;
    badge.title = 'Click to clear filter';
  } else {
    badge.style.display = 'none';
    badge.textContent = '';
  }
}

function renderIssuesOccurrences(records) {
  const container = document.getElementById('dash-issues-occ-list');
  if (!container) return;

  let display = records;
  if (_issuesOccTypeFilter) {
    display = records.filter(r => r.t === _issuesOccTypeFilter);
  }

  const occMap = {};
  display.forEach(r => {
    const key = r.o;
    if (!occMap[key]) {
      occMap[key] = { o: key, c: r.c, r: r.r, rd: r.rd, types: {}, count: 0, rc: r.rc || 0 };
    }
    occMap[key].types[r.t || 'Unknown'] = (occMap[key].types[r.t || 'Unknown'] || 0) + 1;
    occMap[key].count++;
    if (r.rc && r.rc > occMap[key].rc) occMap[key].rc = r.rc;
    if (r.rd && (!occMap[key].rd || r.rd.length > occMap[key].rd.length)) occMap[key].rd = r.rd;
    if (r.c) occMap[key].c = r.c;
  });

  const grouped = Object.values(occMap).sort((a, b) => b.count - a.count);

  const countEl = document.getElementById('dash-issues-occ-count');
  if (countEl) countEl.textContent = `${grouped.length.toLocaleString()} unique occurrences · ${display.length.toLocaleString()} records`;

  if (grouped.length === 0) {
    container.innerHTML = '<div class="empty-state" style="padding:1rem">No occurrences match the current filters.</div>';
    return;
  }

  const rows = grouped.map(g => {
    const topType = Object.entries(g.types).sort((a, b) => b[1] - a[1])[0];
    const col = _issuesOccTypeColors[topType[0]] || '#94A3B8';
    const typeBadge = `<span class="dash-issues-occ-type" style="background:${col}22;color:${col}">${escHtml(topType[0])}</span>`;
    return `<div class="dash-issues-occ-row" data-occ="${escHtml(g.o)}">
      <span class="dash-issues-occ-no">${escHtml(g.o)}</span>
      <span class="dash-issues-occ-reports">${g.rc || g.count}</span>
      <span class="dash-issues-occ-type-cell">${typeBadge}</span>
      <span class="dash-issues-occ-city">${escHtml(g.c || '—')}</span>
      <span class="dash-issues-occ-desc">${escHtml((g.rd || '').substring(0, 120))}${(g.rd || '').length > 120 ? '\u2026' : ''}</span>
    </div>`;
  }).join('');

  container.innerHTML = rows;
}

const _issuesOccTypeColors = {
  ICM: '#3B82F6', CABS: '#22C55E', OSH: '#F97316', OCGO: '#A855F7',
  OAPT: '#EF4444', SINF: '#06B6D4', 'SINF-F': '#84CC16', MINF: '#F59E0B',
  SFLT: '#EC4899', SAPT: '#6366F1', OINF: '#14B8A6', OSHHAZ: '#8B5CF6',
  SIR: '#F43F5E', 'E-SFLT': '#0EA5E9', MAINT: '#78716C', 'SFLT-F': '#D946EF',
  'E-SAPT': '#10B981', 'E-SINF': '#FBBF24', MTCEOP: '#64748B',
};

// ─── Import / Upload ───────────────────────────────────────────────────────

function setupImportUI() {
  const uploadBtn = document.getElementById('import-upload-btn');
  const clearBtn = document.getElementById('import-clear-btn');
  const globalStatus = document.getElementById('import-global-status');
  const logEl = document.getElementById('import-log');
  const progressEl = document.getElementById('import-progress');
  const progressLabel = document.getElementById('import-progress-label');
  const progressPct = document.getElementById('import-progress-pct');
  const progressBar = document.getElementById('import-progress-bar');
  const progressStep = document.getElementById('import-progress-step');

  const pendingFiles = {};

  document.querySelectorAll('.import-file-input').forEach(input => {
    input.addEventListener('change', () => {
      const type = input.dataset.type;
      const file = input.files[0];
      if (file) {
        pendingFiles[type] = file;
        const statusEl = document.getElementById(`status-${type}`);
        if (statusEl) {
          statusEl.textContent = file.name;
          statusEl.className = 'import-zone-status import-zone-selected';
        }
      } else {
        delete pendingFiles[type];
        const statusEl = document.getElementById(`status-${type}`);
        if (statusEl) {
          statusEl.textContent = 'No file selected';
          statusEl.className = 'import-zone-status';
        }
      }
      const hasFiles = Object.keys(pendingFiles).length > 0;
      uploadBtn.disabled = !hasFiles;
      globalStatus.textContent = hasFiles ? `${Object.keys(pendingFiles).length} file(s) ready` : '';
    });
  });

  uploadBtn.addEventListener('click', () => {
    if (!Object.keys(pendingFiles).length) return;

    uploadBtn.disabled = true;
    logEl.style.display = '';
    logEl.innerHTML = '';

    const formData = new FormData();
    const totalFiles = Object.keys(pendingFiles).length;
    for (const [type, file] of Object.entries(pendingFiles)) {
      formData.append(type, file, file.name);
    }

    progressEl.style.display = '';
    progressLabel.textContent = 'Uploading...';
    progressPct.textContent = '0%';
    progressBar.className = 'import-progress-bar';
    progressBar.style.width = '0%';
    progressStep.textContent = 'Preparing upload...';
    globalStatus.textContent = '';

    const uploadUrl = window.location.protocol === 'file:'
      ? 'http://localhost:9000/api/upload'
      : '/api/upload';

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', e => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        progressBar.style.width = pct + '%';
        progressPct.textContent = pct + '%';
        const loadedMB = (e.loaded / 1048576).toFixed(1);
        const totalMB = (e.total / 1048576).toFixed(1);
        progressStep.textContent = `Uploading: ${loadedMB} MB / ${totalMB} MB`;
      }
    });

    xhr.addEventListener('loadstart', () => {
      progressLabel.textContent = 'Uploading...';
      progressStep.textContent = `Sending ${totalFiles} file(s)...`;
    });

    xhr.upload.addEventListener('load', () => {
      progressLabel.textContent = 'Processing data...';
      progressPct.textContent = '';
      progressBar.classList.add('import-progress-indeterminate');
      progressStep.textContent = 'Running Python processors (may take up to 30s)...';
    });

    xhr.addEventListener('load', () => {
      let result;
      try { result = JSON.parse(xhr.responseText); }
      catch { result = { error: 'Invalid server response' }; }

      if (xhr.status >= 200 && xhr.status < 300 && result.success) {
        progressLabel.textContent = 'Done';
        progressPct.textContent = '100%';
        progressBar.classList.remove('import-progress-indeterminate');
        progressBar.style.width = '100%';
        progressStep.textContent = 'Page will reload shortly...';

        globalStatus.textContent = 'Success! Reload the page to see updated data.';
        globalStatus.style.color = '#22C55E';
        logEl.innerHTML = `<div class="import-log-entry import-log-success">
          <strong>Upload complete</strong><br>
          ${result.saved.map(s => `${s.original} \u2192 ${s.saved}`).join('<br>')}
          ${result.output ? '<br><br><pre>' + result.output + '</pre>' : ''}
        </div>`;

        setTimeout(() => location.reload(), 2500);
      } else {
        progressLabel.textContent = 'Upload failed';
        progressStep.textContent = result.error || 'Unknown error';
        progressBar.style.width = '0%';
        progressBar.style.background = '#EF4444';
        progressPct.textContent = '';
        globalStatus.textContent = 'Upload failed. See details below.';
        globalStatus.style.color = '#EF4444';
        logEl.innerHTML = `<div class="import-log-entry import-log-error">
          <strong>Error:</strong> ${result.error || 'Unknown error'}<br>
          ${result.details ? '<pre>' + result.details + '</pre>' : ''}
          ${result.saved ? 'Files saved before error: ' + result.saved.map(s => s.original).join(', ') : ''}
        </div>`;
      }
      uploadBtn.disabled = false;
    });

    xhr.addEventListener('error', () => {
      progressLabel.textContent = 'Network error';
      progressStep.textContent = 'Is the server running?';
      progressBar.style.width = '0%';
      progressBar.style.background = '#EF4444';
      progressPct.textContent = '';
      globalStatus.textContent = 'Network error. Is the server running?';
      globalStatus.style.color = '#EF4444';
      logEl.innerHTML = `<div class="import-log-entry import-log-error">
        <strong>Network error:</strong> Failed to connect to server
      </div>`;
      uploadBtn.disabled = false;
    });

    xhr.open('POST', uploadUrl);
    xhr.send(formData);
  });

  clearBtn.addEventListener('click', () => {
    Object.keys(pendingFiles).forEach(k => delete pendingFiles[k]);
    document.querySelectorAll('.import-file-input').forEach(i => { i.value = ''; });
    document.querySelectorAll('.import-zone-status').forEach(s => {
      s.textContent = 'No file selected';
      s.className = 'import-zone-status';
    });
    uploadBtn.disabled = true;
    globalStatus.textContent = '';
    globalStatus.style.color = '';
    logEl.style.display = 'none';
    logEl.innerHTML = '';
    progressEl.style.display = 'none';
    progressBar.style.width = '0%';
    progressBar.style.background = '';
    progressBar.classList.remove('import-progress-indeterminate');
    progressLabel.textContent = 'Uploading...';
    progressPct.textContent = '0%';
    progressStep.textContent = '';
  });
}

document.addEventListener('DOMContentLoaded', init);
