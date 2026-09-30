import { addEvent } from './events';
import { getShield } from './shield';

// The Sense Layer and Consent Gate. Every outbound field is looked up in a fixed taxonomy
// (rules, not guesses). Sensitive fields need the owner's consent to leave. Everything else passes.
const TAXONOMY = [
  [/cycle|period|ovulat|fertil|pregnan|symptom|severity|flow|phase|menstru/i, 'Reproductive health'],
  [/^(lat|lon|lng)$|latitude|longitude|gps|location|address|geo/i, 'Precise location'],
  [/balance|income|salary|transaction|card|account|upi|iban|ifsc/i, 'Financial'],
  [/aadhaar|aadhar|^pan$|pan_|passport|voter|id_number|ssn/i, 'Government ID'],
  [/device_id|ad_id|advertising|idfa|gaid|imei|^mac$|mac_|fingerprint/i, 'Device identifier'],
  [/email|phone|mobile|^name$|full_name|dob|birth/i, 'Personal identity'],
  [/mood|health|diagnos|medic|weight|blood/i, 'Health'],
];

const isObject = v => v && typeof v === 'object' && !Array.isArray(v);

export function classify(key, value) {
  const hit = TAXONOMY.find(([re]) => re.test(key));
  if (hit) return { sensitive: true, tag: hit[1] };
  // A nested object is as sensitive as anything inside it.
  if (isObject(value)) {
    for (const [k, v] of Object.entries(value)) {
      const inner = classify(k, v);
      if (inner.sensitive) return inner;
    }
  }
  return { sensitive: false, tag: 'Normal' };
}

// The ledger and the monitor never store or show private values. Private fields appear as [tag, outcome];
// only fields with nothing private in them keep their value.
const WORD = { block: 'stopped', mask: 'blurred', allow: 'sent' };
export function redact(payload, words = {}, fallback = 'stopped') {
  const out = {};
  Object.entries(payload || {}).forEach(([key, value]) => {
    if (typeof value === 'string' && value.startsWith('[')) { out[key] = value; return; }
    const c = classify(key, value);
    out[key] = c.sensitive ? `[${c.tag}, ${words[key] || fallback}]` : value;
  });
  return out;
}
const wordsOf = fields => Object.fromEntries(fields.map(f => [f.key, WORD[f.result]]));

// consent: field -> 'allow' | 'mask'. Anything else is stopped.
// strict: every field needs consent (used when the owner is answering a data request).
export function decide(payload, consent = {}, maskers = {}, { strict = false } = {}) {
  const kept = {};
  const stopped = {};
  const fields = [];
  Object.entries(payload).forEach(([key, value]) => {
    const c = classify(key, value);
    const needsConsent = strict || c.sensitive;
    const choice = consent[key];
    let result;
    if (!needsConsent || choice === 'allow') { kept[key] = value; result = 'allow'; }
    else if (choice === 'mask' && maskers[key]) { kept[key] = maskers[key](value); result = 'mask'; }
    else { stopped[key] = value; result = 'block'; }
    fields.push({ key, tag: c.tag, sensitive: c.sensitive, result });
  });
  return { kept, stopped, fields };
}

// A request leaving an app through SurakshaShield. Logs what happened and returns the result.
export function send({ source, dest, event, payload, consent = {}, maskers = {}, blockedNote }) {
  const base = { source, dest };
  if (!getShield()) {
    addEvent({ ...base, event, action: 'leaked', note: 'Shield was off. Sent unchanged', payload: redact(payload, {}, 'leaked') });
    return { action: 'leaked', kept: payload, stopped: {}, fields: Object.entries(payload).map(([key, v]) => ({ key, ...classify(key, v), result: 'allow' })) };
  }
  const r = decide(payload, consent, maskers);
  const stoppedKeys = Object.keys(r.stopped);
  const keptKeys = Object.keys(r.kept);
  if (!r.fields.some(f => f.sensitive)) {
    addEvent({ ...base, event, action: 'allowed', note: 'No sensitive fields. Sent unchanged', payload });
    return { action: 'allowed', ...r };
  }
  if (stoppedKeys.length) {
    addEvent({ ...base, event, action: 'blocked', note: blockedNote || `Stopped ${stoppedKeys.join(', ')}. Never left the phone`, payload: redact(payload, wordsOf(r.fields)) });
  }
  if (keptKeys.length) {
    const anonymous = !r.fields.some(f => f.sensitive && f.result !== 'block');
    addEvent({
      ...base, event: `${r.kept.event || 'usage'}_count`, action: 'allowed',
      note: anonymous ? 'Anonymous count only' : 'Only what you approved was sent', payload: redact(r.kept, wordsOf(r.fields)),
    });
  }
  return { action: stoppedKeys.length ? 'blocked' : 'allowed', ...r };
}
