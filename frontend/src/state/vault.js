import { createStore } from './store';
import { sha256 } from '../util/sha256';

// Kept on the phone (localStorage). Only hashes of the two PINs are stored, never the PINs.
// wiped: the panic action destroyed the old data.
const config = createStore('ss-vault', { wiped: false, realPin: null, decoyPin: null });

export const useVault = () => config.use();
export const getVault = () => config.get();
export const saveVault = patch => config.set({ ...config.get(), ...patch });

export const hashPin = pin => sha256(`pin|${pin}`);

// 'real' opens the real vault, 'decoy' opens the harmless one, null means wrong PIN.
export function checkPin(pin) {
  const v = config.get();
  const h = hashPin(pin);
  if (h === v.realPin) return 'real';
  if (h === v.decoyPin) return 'decoy';
  return null;
}

export const setPins = (real, decoy) => saveVault({ realPin: hashPin(real), decoyPin: hashPin(decoy) });
