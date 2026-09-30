import { createStore } from './store';
import { sha256 } from '../util/sha256';

// One event log for every screen. Each entry is chained to the one before it by hash.
// action: shared | allowed | masked | blocked | leaked | info
const store = createStore('ss-events', []);
const GENESIS = '0'.repeat(64);

const fieldsOf = e => JSON.stringify([e.id, e.ts, e.source, e.dest, e.event, e.action, e.note || '', e.payload || null]);
const hashOf = (prev, e) => sha256(prev + fieldsOf(e));

export function addEvent({ source, dest, event, action, note, payload, bytes }) {
  const list = store.get();
  const prev = list.length ? list[list.length - 1].hash : GENESIS;
  const e = { id: `EVT-${1000 + list.length}`, ts: Date.now(), source, dest, event, action, note, payload, bytes };
  e.prev = prev;
  e.hash = hashOf(prev, e);
  store.set([...list, e].slice(-150));
}

export const getEvents = () => store.get();
export const useEvents = () => store.use();

// Index of the first entry that does not match its hash, or -1 when the chain is intact.
export function verifyChain(list = store.get()) {
  for (let i = 1; i < list.length; i++) {
    if (list[i].prev !== list[i - 1].hash || list[i].hash !== hashOf(list[i].prev, list[i])) return i;
  }
  return -1;
}
