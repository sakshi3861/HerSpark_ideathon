import { createStore } from '../state/store';

// The data request HealthPlus makes to CycleSafe, and what the SDK reports about it.
export const APP_NAME = 'HealthPlus';
export const STORE_KEY = 'aarogya-shared';
export const PURPOSE = 'Build a personalised wellness plan and book a gynaecology appointment.';

// `needed` is judged against the stated purpose. `sense` is the taxonomy tag.
export const requests = [
  { key: 'cycleData', label: 'Menstrual-cycle data', icon: 'calendar_month', sense: 'Reproductive health', needed: true, risk: 'High',
    reason: 'Needed to time the wellness plan and suggest appointment dates.' },
  { key: 'symptoms', label: 'Symptoms log', icon: 'pulse_alert', sense: 'Reproductive health', needed: true, risk: 'High',
    reason: 'Needed so the doctor can see what you have been experiencing.' },
  { key: 'location', label: 'Precise location', icon: 'location_on', sense: 'Precise location', needed: true, risk: 'High', canMask: true,
    reason: 'Needed to find nearby clinics, but your city is enough. Exact coordinates can reveal your home.' },
  { key: 'pregnancy', label: 'Pregnancy status', icon: 'pregnant_woman', sense: 'Reproductive health', needed: false, risk: 'Very high',
    reason: 'Nothing in this request uses it. Safe to ignore.' },
  { key: 'mood', label: 'Mood & energy', icon: 'mood', sense: 'Health', needed: false, risk: 'Medium',
    reason: 'Not used for a wellness plan or an appointment. Safe to ignore.' },
  { key: 'deviceInfo', label: 'Device information', icon: 'smartphone', sense: 'Device', needed: false, risk: 'Low',
    reason: 'Not required. Often used for ad profiling.' },
];

const loadLog = () => { try { return JSON.parse(localStorage.getItem('cyclesafe-log') || '[]'); } catch { return []; } };

// What CycleSafe holds for each category.
function cycleSafeData() {
  const log = loadLog();
  const latest = type => log.find(e => e.type === type)?.values ?? [];
  return {
    cycleData: { cycle_day: 14, cycle_length: 28, phase: 'Luteal', last_flow: latest('period')[0] ?? 'not logged' },
    symptoms: latest('symptoms'),
    location: { lat: 19.076, lon: 72.877, city: 'Mumbai' },
    pregnancy: { status: 'trying_to_conceive' },
    mood: latest('mood'),
    deviceInfo: { os: 'iOS 17.1', model: 'iPhone 14 Pro' },
  };
}

// decisions: key -> 'allow' | 'mask' | 'block'
export function applyDecisions(decisions) {
  const all = cycleSafeData();
  const received = {};
  requests.forEach(r => {
    const d = decisions[r.key];
    if (d === 'allow') received[r.key] = all[r.key];
    else if (d === 'mask' && r.key === 'location') received[r.key] = { city: all.location.city };
  });
  return received;
}

export const defaultDecisions = () => Object.fromEntries(requests.map(r => [r.key, !r.needed ? 'block' : r.canMask ? 'mask' : 'allow']));

export async function proofHash(payload) {
  const bytes = new TextEncoder().encode(JSON.stringify(payload) + Date.now());
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export const loadShared = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); } catch { return null; } };
export const saveShared = value => { try { localStorage.setItem(STORE_KEY, JSON.stringify(value)); } catch { /* ignore */ } };

// A request waits here until CycleSafe is open and the owner decides.
const pending = createStore('ss-pending', false);
export const isPending = () => pending.get();
export const usePending = () => pending.use();
export const setPending = value => pending.set(value);
