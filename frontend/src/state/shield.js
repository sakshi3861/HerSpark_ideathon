import { useSyncExternalStore } from 'react';

let on = true;
const listeners = new Set();
const subscribe = fn => { listeners.add(fn); return () => listeners.delete(fn); };

export const getShield = () => on;
export const toggleShield = () => { on = !on; listeners.forEach(fn => fn()); };
export const useShield = () => useSyncExternalStore(subscribe, getShield);
