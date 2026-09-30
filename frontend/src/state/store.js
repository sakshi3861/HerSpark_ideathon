import { useSyncExternalStore } from 'react';

// A tiny localStorage-backed store. Changes made in one tab reach every other open tab.
export function createStore(key, initial) {
  const listeners = new Set();
  let raw = null;
  let value = initial;

  const read = () => {
    let next = null;
    try { next = localStorage.getItem(key); } catch { /* ignore */ }
    if (next === raw) return;
    raw = next;
    try { value = next === null ? initial : JSON.parse(next); } catch { value = initial; }
  };
  const emit = () => listeners.forEach(fn => fn());

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', e => { if (e.key === key || e.key === null) { read(); emit(); } });
  }

  const get = () => { read(); return value; };
  const set = next => {
    value = next;
    try { raw = JSON.stringify(next); localStorage.setItem(key, raw); } catch { /* ignore */ }
    emit();
  };
  const subscribe = fn => { listeners.add(fn); return () => listeners.delete(fn); };
  const use = () => useSyncExternalStore(subscribe, get);
  return { get, set, use };
}
