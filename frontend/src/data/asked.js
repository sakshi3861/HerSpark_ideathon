import { APPS } from './apps';
import { classify } from '../state/engine';

// What a request was asking for, in plain words, and what happened to each item.
// Used by the details panel on the Live Traffic page.
const known = {
  period_day: ['Cycle day', 'Reproductive health'],
  cycle_day: ['Cycle day', 'Reproductive health'],
  phase: ['Cycle phase', 'Reproductive health'],
  ovulation: ['Ovulation status', 'Reproductive health'],
  symptom: ['Symptom', 'Reproductive health'],
  severity: ['Symptom severity', 'Reproductive health'],
  ad_id: ['Advertising ID', 'Device identifier'],
  idfa: ['Advertising ID', 'Device identifier'],
  device_id: ['Device ID', 'Device identifier'],
  mac: ['Device address', 'Device identifier'],
  gps: ['Exact location', 'Precise location'],
  lat: ['Exact location', 'Precise location'],
  lon: ['Exact location', 'Precise location'],
  account_balance: ['Account balance', 'Financial'],
  upi_id: ['UPI ID', 'Financial'],
  referrer: ['Ad referrer', null],
  model: ['Phone model', null],
  screen: ['Screen viewed', null],
  session: ['Session ID', null],
  locale: ['Language', null],
  sdk: ['SDK version', null],
  thread: ['Crash details', null],
  signal: ['Crash details', null],
  path: ['Unknown data', null],
  body: ['Unknown data', null],
  city: ['City', null],
};
const skip = new Set(['event', 'bytes', 'app_opens']);

// Saved entries going to the app's own vault.
const vaultEntry = {
  sync_biomarker: ['Health readings', 'Health'],
  sync_cycle_log: ['Cycle log entry', 'Reproductive health'],
  sync_log: ['Saved log entry', 'Private'],
};

const humanize = key => { const t = key.replace(/_/g, ' ').trim(); return t.charAt(0).toUpperCase() + t.slice(1); };

// What happened to one item, given how the whole request ended.
const outcomeFor = (status, sensitive) => {
  if (status === 'Encrypted') return 'Encrypted';
  if (!sensitive) return 'Allowed';
  return status === 'Allowed' ? 'Allowed' : status; // Blocked, Masked or Leaked
};

const requestLabel = key => {
  for (const app of Object.values(APPS)) {
    const r = app.requests.find(x => x.key === key);
    if (r) return { label: r.label, tag: r.sense };
  }
  return null;
};

export function askedFor(row) {
  const ev = row.event || '';
  if (vaultEntry[ev]) {
    const [label, tag] = vaultEntry[ev];
    return [{ label, tag, outcome: 'Encrypted' }];
  }
  const m = /^(share|revoke)_(.+)$/.exec(ev);
  if (m) {
    const r = requestLabel(m[2]);
    if (r) return [{ label: r.label, tag: r.tag, outcome: row.status === 'Masked' ? 'Masked' : row.status === 'Encrypted' ? 'Encrypted' : 'Blocked' }];
  }
  const seen = new Set();
  const out = [];
  Object.entries(row.payload || {}).forEach(([key, value]) => {
    if (skip.has(key)) return;
    const hit = known[key];
    const c = classify(key, value);
    const label = hit ? hit[0] : humanize(key);
    const tag = hit ? hit[1] : c.sensitive ? c.tag : null;
    if (seen.has(label)) return;
    seen.add(label);
    out.push({ label, tag: tag || 'Not private', outcome: outcomeFor(row.status, !!tag) });
  });
  return out;
}
