import { useSyncExternalStore } from 'react';
import { useEvents } from '../state/events';

// Sandbox counters. A single interval nudges them so every screen that reads
// them (Home, Console) stays in agreement and moves over time.
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Starting counts. Kept small on purpose so every number stays under 100.
export const BASE = { events: 62, leaks: 18, masked: 9, leaked: 2, encrypted: 24 };
let state = { ...BASE, threats: 3, updatedAt: Date.now() };
const listeners = new Set();
let timer = null;

function tick() {
  const s = state;
  state = {
    ...s,
    // Only the number of checks creeps up. Stopped and blurred change only when something really happens, so the score stays put.
    events: Math.min(80, s.events + (Math.random() < 0.5 ? 1 : 0)),
    updatedAt: Date.now(),
  };
  listeners.forEach(fn => fn());
}

function subscribe(fn) {
  listeners.add(fn);
  if (!timer) timer = window.setInterval(tick, 4000);
  return () => {
    listeners.delete(fn);
    if (!listeners.size) { window.clearInterval(timer); timer = null; }
  };
}

const useBase = () => useSyncExternalStore(subscribe, () => state);

// The counters include what the apps in the other tabs actually did.
export const useMetrics = () => {
  const base = useBase();
  const real = useEvents().filter(e => e.action !== 'info' && Date.now() - e.ts < 24 * 3600e3);
  const count = a => real.filter(e => e.action === a).length;
  const stopped = base.leaks + count('blocked');
  const blurred = base.masked + count('masked');
  const leaked = base.leaked + count('leaked');
  // Every number is capped at 99, so nothing on the page ever has three digits.
  const cap = n => Math.min(99, n);
  const score = 93;
  return { ...base, events: cap(base.events + real.length), leaks: cap(stopped), masked: cap(blurred), leaked: cap(leaked), encrypted: cap(base.encrypted + count('shared')), score };
};

// Which details page each card opens.
export const kindOf = { events: 'checks', leaks: 'stopped', masked: 'blurred', threats: 'attention' };

export const fmt = n => String(Math.min(99, n));

export const buildKpis = m => [
  { key: 'events', label: 'Data checks', value: fmt(m.events), note: 'Times an app tried to send data out (last 24 hours)', tone: 'text-on-surface' },
  { key: 'leaks', label: 'Stopped', value: fmt(m.leaks), note: 'Attempts to send private data to advertisers or trackers', tone: 'text-error' },
  { key: 'masked', label: 'Blurred', value: fmt(m.masked), note: 'Exact locations and device IDs made less precise before sharing', tone: 'text-tertiary-container' },
  { key: 'threats', label: 'Needs attention', value: String(m.threats), note: 'Privacy warnings active right now', tone: 'text-primary' },
];
