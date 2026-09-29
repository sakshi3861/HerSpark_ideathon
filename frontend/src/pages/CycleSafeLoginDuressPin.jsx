import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CycleSafeLoginDuressPin() {
  const [pin, setPin] = useState('');
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  const clearPin = () => { setPin(''); setToast(null); };
  const appendPinDigit = digit => setPin(current => current.length < 4 ? current + digit : current);
  const authenticatePin = async value => {
    if (value.length < 4) {
      setToast({ mode: 'warning', icon: 'warning', title: 'PIN Incomplete', body: 'Please enter a 4-digit security PIN or tap a demo preset.' });
      return;
    }
    setBusy(true);
    await new Promise(resolve => window.setTimeout(resolve, 600));
    setBusy(false);
    if (value === '1234') setToast({ mode: 'success', icon: 'verified_user', title: 'Standard Access Granted', body: 'Authenticating Ananya Sharma. Decrypted. Redirecting...' });
    else if (value === '4321') setToast({ mode: 'duress', icon: 'fmd_bad', title: 'Duress Protocol Engaged (Silent)', body: 'Loaded decoy empty logs. Emergency beacon transmitted to Console.' });
    else setToast({ mode: 'error', icon: 'error', title: 'Authentication Rejection', body: 'Invalid PIN. Try PIN 1234 or Duress PIN 4321.' });
  };
  const presetPin = value => { setPin(value); window.setTimeout(() => authenticatePin(value), 200); };
  const handleBiometric = () => { setPin('1234'); setToast({ mode: 'success', icon: 'verified_user', title: 'Biometric Unlocked', body: 'Authenticated via Passkey / Biometrics.' }); };
  const onSubmit = event => { event.preventDefault(); authenticatePin(pin); };

  useEffect(() => {
    const handleKey = event => {
      if (/^[0-9]$/.test(event.key)) appendPinDigit(event.key);
      else if (event.key === 'Backspace') setPin(current => current.slice(0, -1));
      else if (event.key === 'Escape') clearPin();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <Header active="cyclesafe_login_duress_pin" />
      <main className="w-full pt-20 bg-background text-on-surface min-h-screen">
        <div className="page">
        <div className="w-full max-w-md mx-auto">
          <div className="card-bordered flex flex-col gap-space-lg">
            {/* Header / Title */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-sm mb-space-md">
                <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-on-surface">CycleSafe Vault</h1>
              <p className="text-xs text-on-surface-variant mt-space-xs">Enter your security PIN to authenticate</p>
            </div>

            <form className="flex flex-col gap-space-lg" id="vault-auth-form" onSubmit={onSubmit}>
              {/* Identity Field */}
              <div className="flex flex-col gap-space-sm">
                <label className="text-xs text-on-surface-variant font-medium flex items-center gap-space-xs" htmlFor="vault-email">
                  <span className="material-symbols-outlined text-secondary text-base">alternate_email</span>
                  Identity Handle
                </label>
                <input
                  className="field w-full border border-outline-variant/40 cursor-default"
                  id="vault-email"
                  readOnly
                  type="email"
                  value="ananya.sharma@example.com"
                />
              </div>

              {/* PIN Display & Preset Buttons */}
              <div className="flex flex-col gap-space-sm">
                <div className="flex justify-between items-center">
                  <label className="text-xs text-on-surface-variant font-medium flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-base">pin</span>
                    4-Digit Security PIN
                  </label>
                  <button className="text-xs text-secondary hover:text-secondary transition-colors" onClick={clearPin} type="button">Clear</button>
                </div>
                <div className="flex items-center justify-between gap-space-md bg-surface-container-low p-space-md rounded-xl border border-outline-variant/40">
                  <div className="flex items-center gap-space-md" id="pin-display">
                    {Array.from({ length: 4 }, (_, index) => (
                      <div key={index} className={`pin-dot w-3.5 h-3.5 rounded-full transition-all duration-150 ${index < pin.length ? 'bg-secondary shadow-sm scale-110' : 'bg-outline-variant'}`} />
                    ))}
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <button className="px-space-md py-space-xs bg-secondary-container/40 text-secondary border border-secondary/30 text-xs font-medium rounded-xl hover:bg-secondary-container transition-colors" onClick={() => presetPin('1234')} type="button">PIN 1234</button>
                    <button className="px-space-md py-space-xs bg-error-container text-error border border-error/30 text-xs font-medium rounded-xl hover:bg-error-container transition-colors" onClick={() => presetPin('4321')} type="button">Duress 4321</button>
                  </div>
                </div>

                {/* PIN Pad Grid */}
                <div className="grid grid-cols-3 gap-space-sm">
                  {['1','2','3','4','5','6','7','8','9'].map(digit => (
                    <button key={digit} className="h-12 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-base border border-outline-variant/40 transition-all active:scale-95" onClick={() => appendPinDigit(digit)} type="button">{digit}</button>
                  ))}
                  <button className="h-12 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-colors flex items-center justify-center" onClick={clearPin} type="button">
                    <span className="material-symbols-outlined text-lg">backspace</span>
                  </button>
                  <button className="h-12 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-base border border-outline-variant/40 transition-all active:scale-95" onClick={() => appendPinDigit('0')} type="button">0</button>
                  <button className="h-12 rounded-xl bg-primary-fixed hover:bg-primary-fixed text-primary-container border border-primary/30 transition-colors flex items-center justify-center" onClick={handleBiometric} title="Quick Biometric" type="button">
                    <span className="material-symbols-outlined text-xl">fingerprint</span>
                  </button>
                </div>
              </div>

              {/* Demo Hint Text */}
              <div className="rounded-xl bg-surface-container-low border border-outline-variant/40 p-space-md">
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  <strong className="text-secondary">Demo Hint:</strong> PIN <span className="font-mono text-on-surface bg-surface-container px-space-sm py-space-xs rounded-lg border border-outline-variant/40">1234</span> normal / Duress <span className="font-mono text-error bg-error-container px-space-sm py-space-xs rounded-lg border border-error/30">4321</span> silent alert.
                </p>
              </div>

              {/* Sign In Button */}
              <button
                className="btn-primary w-full"
                id="auth-submit-btn"
                type="submit"
                disabled={busy}
                data-path="cyclesafe-dashboard"
              >
                {busy ? <><span className="material-symbols-outlined animate-spin text-lg">progress_activity</span><span>Verifying...</span></> : <><span>Sign In</span><span className="material-symbols-outlined text-lg">arrow_forward</span></>}
              </button>
            </form>

            {/* Toast Notification */}
            {toast && (
              <div className={`p-space-md rounded-xl border transition-all ${toast.mode === 'success' ? 'bg-secondary-container/40 border-secondary/30 text-secondary' : toast.mode === 'duress' ? 'bg-error-container border-error/30 text-on-error-container' : toast.mode === 'warning' ? 'bg-amber-50 border-amber-400 text-amber-800' : 'bg-error-container border-error/30 text-on-error-container'}`} role="status">
                <div className="flex items-center gap-space-md">
                  <span className="material-symbols-outlined text-xl">{toast.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider">{toast.title}</span>
                    <span className="text-xs mt-space-xs">{toast.body}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
