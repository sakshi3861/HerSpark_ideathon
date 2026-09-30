import { createStore } from '../state/store';
import { APPS } from './apps';
import { decide } from '../state/engine';

// Everything the request flow needs for one app, built once from its config.
const kits = {};

export function kitFor(id) {
  if (kits[id]) return kits[id];
  const app = APPS[id];
  const { partner, requests } = app;
  const pending = createStore(partner.pendingKey, false);

  const loadLog = () => { try { return JSON.parse(localStorage.getItem(app.logKey) || '[]'); } catch { return []; } };

  // decisions: key -> 'allow' | 'mask' | 'block'
  const applyDecisions = decisions => {
    const all = app.dataOf(loadLog());
    const maskers = Object.fromEntries(Object.entries(app.maskOf).map(([k, fn]) => [k, () => fn(all)]));
    // The owner is answering a data request, so every category needs an explicit yes.
    return decide(all, decisions, maskers, { strict: true }).kept;
  };

  kits[id] = {
    app, partner, requests,
    APP_NAME: partner.name, PURPOSE: partner.purpose, STORE_KEY: partner.storeKey,
    applyDecisions,
    defaultDecisions: () => Object.fromEntries(requests.map(r => [r.key, !r.needed ? 'block' : r.canMask ? 'mask' : 'allow'])),
    async proofHash(payload) {
      const bytes = new TextEncoder().encode(JSON.stringify(payload) + Date.now());
      const digest = await crypto.subtle.digest('SHA-256', bytes);
      return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
    },
    loadShared() { try { return JSON.parse(localStorage.getItem(partner.storeKey) || 'null'); } catch { return null; } },
    saveShared(value) { try { localStorage.setItem(partner.storeKey, JSON.stringify(value)); } catch { /* ignore */ } },
    isPending: () => pending.get(),
    usePending: () => pending.use(),
    setPending: value => pending.set(value),
  };
  return kits[id];
}
