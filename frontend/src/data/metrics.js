import { useSyncExternalStore } from 'react';
import { useEvents } from '../state/events';

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

const useBase = () => useSyncExternalStore(subscribe, () => state);

// The counters include what the apps in the other tabs actually did.
export const useMetrics = () => {
  const base = useBase();
  const real = useEvents().filter(e => e.action !== 'info');
  const count = a => real.filter(e => e.action === a).length;
  return { ...base, events: base.events + real.length, leaks: base.leaks + count('blocked'), masked: base.masked + count('masked') };
};

export const fmt = n => n.toLocaleString('en-US');

export const buildKpis = m => [
  { key: 'events', label: 'Data checks', value: fmt(m.events), note: 'Times an app tried to send data out (last 24 hours)', tone: 'text-on-surface' },
  { key: 'leaks', label: 'Stopped', value: fmt(m.leaks), note: 'Attempts to send private data to advertisers or trackers', tone: 'text-error' },
  { key: 'masked', label: 'Blurred', value: fmt(m.masked), note: 'Exact locations and device IDs made less precise before sharing', tone: 'text-tertiary-container' },
  { key: 'threats', label: 'Needs attention', value: String(m.threats), note: 'Privacy warnings active right now', tone: 'text-primary' },
];
