import { createStore } from './store';
import { sha256 } from '../util/sha256';
import { APPS } from '../data/apps';

// Kept on the phone (localStorage), one vault per app. Only hashes of the two PINs are stored, never the PINs.
// wiped: the panic action destroyed the old data.
const vaults = {};
const storeOf = id => (vaults[id] ??= createStore(APPS[id].vaultKey, { wiped: false, realPin: null, decoyPin: null }));

export const useVault = id => storeOf(id).use();
export const getVault = id => storeOf(id).get();
export const saveVault = (id, patch) => storeOf(id).set({ ...storeOf(id).get(), ...patch });

export const hashPin = pin => sha256(`pin|${pin}`);

// 'real' opens the real vault, 'decoy' opens the harmless one, null means wrong PIN.
export function checkPin(id, pin) {
  const v = getVault(id);
  const h = hashPin(pin);
  if (h === v.realPin) return 'real';
  if (h === v.decoyPin) return 'decoy';
  return null;
}

export const setPins = (id, real, decoy) => saveVault(id, { realPin: hashPin(real), decoyPin: hashPin(decoy) });
