import React, { useState } from 'react';
import { STORE_KEY, setPending } from '../data/healthRequest';
import { addEvent } from '../state/events';
import { checkPin, saveVault, setPins, useVault } from '../state/vault';

const PINK = '#a53860';
const BG = '#fbf1f4';

// Setup the first time (real PIN, then decoy PIN). After that it only asks for a PIN.
export default function PinLock({ onUnlock }) {
  const vault = useVault();
  const setup = !vault.realPin;
  const [step, setStep] = useState(0); // setup: 0 real, 1 decoy
  const [real, setReal] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const [confirmReset, setConfirmReset] = useState(false);

  // A new PIN cannot open the old data. Setting one erases what the old PINs protected.
  const resetPins = () => {
    try { localStorage.removeItem('cyclesafe-log'); localStorage.removeItem(STORE_KEY); } catch { /* ignore */ }
    setPending(false);
    saveVault({ realPin: null, decoyPin: null });
    addEvent({ source: 'CycleSafe', dest: 'On this phone', event: 'pin_reset', action: 'info', note: 'PINs reset. Old data erased' });
    setConfirmReset(false); setStep(0); setPin(''); setError('');
  };

  const valid = /^\d{4}$/.test(pin);

  const submit = e => {
    e.preventDefault();
    if (!valid) { setError('Enter 4 digits.'); return; }
    if (setup) {
      if (step === 0) { setReal(pin); setPin(''); setError(''); setStep(1); return; }
      if (pin === real) { setError('Choose a different PIN from your real one.'); return; }
      setPins(real, pin);
      onUnlock('real', true);
      return;
    }
    const mode = checkPin(pin);
    if (!mode) { setError('That PIN is not right.'); setPin(''); return; }
    onUnlock(mode);
  };

  const title = !setup ? 'Enter your PIN' : step === 0 ? 'Choose your PIN' : 'Choose a second PIN';
  const text = !setup
    ? 'Your data is encrypted on this phone.'
    : step === 0
      ? 'You will use this PIN every day. It opens your real data.'
      : 'If someone ever forces you to open the app, enter this one. It opens a harmless calendar and your real data stays locked.';

  return (
    <div className="h-screen w-screen flex items-center justify-center p-5 text-[#3a1420]" style={{ background: BG, colorScheme: 'light' }}>
      <form onSubmit={submit} className="bg-white rounded-2xl border border-[#a53860]/25 shadow-sm p-8 w-full max-w-sm flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white" style={{ background: PINK }}>
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{setup ? 'lock_open' : 'lock'}</span>
        </div>
        <div className="text-xl font-bold">CycleSafe</div>
        {setup && <div className="text-xs font-semibold uppercase tracking-wide opacity-60">Step {step + 1} of 2</div>}
        <h1 className="text-2xl font-bold -mt-2">{title}</h1>
        <p className="opacity-75 text-sm">{text}</p>
        <input
          autoFocus
          key={step}
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={pin}
          onChange={e => { setPin(e.target.value.replace(/\D/g, '')); setError(''); }}
          aria-label="PIN"
          className="w-40 h-14 text-center text-3xl tracking-[0.5em] rounded-xl border border-[#a53860]/40 outline-none focus:border-[#a53860]"
        />
        {error && <div className="text-sm text-red-700">{error}</div>}
        <button type="submit" disabled={!valid} className="h-12 w-full rounded-xl text-white font-semibold shadow-sm disabled:opacity-40 hover:brightness-95" style={{ background: PINK }}>
          {setup ? (step === 0 ? 'Next' : 'Finish setup') : 'Unlock'}
        </button>
        {!setup && !confirmReset && (
          <button type="button" onClick={() => setConfirmReset(true)} className="text-sm font-medium underline" style={{ color: PINK }}>Forgot PIN? Set a new PIN</button>
        )}
        {!setup && confirmReset && (
          <div className="w-full rounded-xl border border-red-300 bg-red-50 p-3 flex flex-col gap-2 text-sm text-red-800">
            <span>A new PIN cannot open your old data. Your saved entries and sharing choices will be erased.</span>
            <div className="flex gap-2 justify-center">
              <button type="button" onClick={resetPins} className="h-9 px-3 rounded-lg bg-red-600 text-white font-semibold">Erase and set new PIN</button>
              <button type="button" onClick={() => setConfirmReset(false)} className="h-9 px-3 rounded-lg border border-red-300 font-semibold">Cancel</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
