const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = list => list[Math.floor(Math.random() * list.length)];

export const destinations = ['Facebook Graph API', 'Google Analytics 4', 'AppsFlyer Attribution', 'Own Health Vault', 'Firebase Crashlytics', 'Unrecognised host', 'ads.sampleads.io', 'HealthPlus', 'Own Money Vault', 'QuickBite'];
export const statuses = ['Blocked', 'Masked', 'Allowed', 'Encrypted', 'Leaked'];

// [destination, event, status when shield is on, weight]
const templates = [
  ['Facebook Graph API', 'LogFertility', 'Blocked', 3],
  ['Facebook Graph API', 'purchase_symptom', 'Blocked', 2],
  ['Facebook Graph API', 'app_activate', 'Allowed', 1],
  ['AppsFlyer Attribution', 'install_referrer', 'Masked', 2],
  ['AppsFlyer Attribution', 'device_ping', 'Masked', 2],
  ['Google Analytics 4', 'screen_view', 'Allowed', 5],
  ['Google Analytics 4', 'session_start', 'Allowed', 3],
  ['Own Health Vault', 'sync_biomarker', 'Encrypted', 4],
  ['Own Health Vault', 'sync_cycle_log', 'Encrypted', 3],
  ['Firebase Crashlytics', 'crash_report', 'Allowed', 1],
];
const weighted = templates.flatMap(t => Array(t[3]).fill(t));

const payloads = {
  LogFertility: { period_day: 14, ovulation: true, ad_id: '8f3a91bb-4e20-41' },
  purchase_symptom: { symptom: 'cramps', severity: 3, ad_id: 'c19d02e7-88a1-4f' },
  install_referrer: { referrer: 'utm_source=meta', gps: [19.076, 72.8777], idfa: '3b71…e0' },
  device_ping: { model: 'Pixel 7', mac: 'a4:77:33:…', lat: 19.0761, lon: 72.8779 },
  screen_view: { screen: 'home', session: 'd41c…' },
  session_start: { session: '9be2…', locale: 'en-IN' },
  sync_biomarker: { ciphertext: 'ML-KEM-768:7f3c…', bytes: 1184 },
  sync_cycle_log: { ciphertext: 'ML-KEM-768:0a91…', bytes: 642 },
  app_activate: { sdk: 'fb-android 16.0.1' },
  crash_report: { thread: 'main', signal: 'SIGSEGV' },
  unknown_beacon: { path: '/v2/collect', body: '<opaque, 212 bytes>' },
};
export const payloadFor = e => e.payload || payloads[e.event] || {};

let seq = 94800;

export function makeEvent(ts, shieldOn = true) {
  const roll = Math.random();
  let ev;
  if (roll < 0.06) {
    ev = { dest: 'Unrecognised host', host: 'cdn-edge-7.metrixhub.io', event: 'unknown_beacon', status: 'Blocked', latency: rand(180, 420), note: 'Destination not in registry' };
  } else if (roll < 0.12) {
    const t = pick(templates.filter(x => x[2] === 'Encrypted' || x[2] === 'Allowed'));
    ev = { dest: t[0], event: t[1], status: t[2], latency: rand(1900, 3400), note: 'Slow response' };
  } else if (roll < 0.18) {
    const t = pick(weighted);
    ev = { dest: t[0], event: t[1], status: t[2], latency: rand(90, 260), retries: rand(1, 3), note: 'Retried after timeout' };
  } else {
    const t = pick(weighted);
    ev = { dest: t[0], event: t[1], status: t[2], latency: rand(38, 310) };
  }
  if (!shieldOn && (ev.status === 'Blocked' || ev.status === 'Masked')) {
    ev.status = 'Leaked';
    ev.note = 'Shield was off';
  }
  return { id: `PKT-${seq++}`, ts, retries: 0, bytes: rand(120, 2400), ...ev };
}

// Newest first; gaps widen the further back we go, so timestamps stay ordered.
export function seedEvents(count = 46) {
  const now = Date.now();
  let t = now - rand(2, 7) * 1000;
  const out = [];
  for (let i = 0; i < count; i++) {
    out.push(makeEvent(t));
    t -= rand(4, 30 + i * 8) * 1000;
  }
  return out;
}

export function ago(ts, now = Date.now()) {
  const s = Math.max(0, Math.round((now - ts) / 1000));
  if (s < 5) return 'just now';
  if (s < 60) return `${s} sec ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  return `${h} hr ${m % 60 ? `${m % 60} min ` : ''}ago`;
}

export const clock = ts => new Date(ts).toLocaleTimeString('en-GB', { hour12: false });
