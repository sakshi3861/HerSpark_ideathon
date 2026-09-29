import { useSyncExternalStore } from 'react';

// Sandbox counters. A single interval nudges them so every screen that reads
// them (Home, Console) stays in agreement and moves over time.
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

let state = { events: 48214, leaks: 5983, masked: 417, threats: 3, score: 91.7, updatedAt: Date.now() };
const listeners = new Set();
let timer = null;

function tick() {
  const s = state;
  state = {
    events: s.events + rand(3, 21),
    leaks: s.leaks + (Math.random() < 0.45 ? rand(1, 2) : 0),
    masked: s.masked + (Math.random() < 0.25 ? 1 : 0),
    threats: s.threats,
    score: Math.min(93.4, Math.max(90.2, +(s.score + (Math.random() - 0.5) * 0.3).toFixed(1))),
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

export const useMetrics = () => useSyncExternalStore(subscribe, () => state);

export const fmt = n => n.toLocaleString('en-US');

export const buildKpis = m => [
  { key: 'events', label: 'Requests inspected', value: fmt(m.events), note: 'Outbound SDK calls, last 24 h', tone: 'text-on-surface' },
  { key: 'leaks', label: 'Blocked', value: fmt(m.leaks), note: 'Sent to ad or analytics hosts', tone: 'text-error' },
  { key: 'masked', label: 'Masked', value: fmt(m.masked), note: 'Location and device IDs coarsened', tone: 'text-tertiary-container' },
  { key: 'threats', label: 'Open alerts', value: String(m.threats), note: 'Runtime rules currently firing', tone: 'text-primary' },
];
