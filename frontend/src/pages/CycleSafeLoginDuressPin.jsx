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
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-140px)] flex items-center justify-center py-space-xl">
        <div className="w-full max-w-md mx-auto px-gutter-mobile md:px-margin">
          <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-space-lg md:p-space-xl border border-surface-container">
            {/* Header / Title */}
            <div className="flex flex-col items-center text-center mb-space-lg">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center shadow-md mb-space-xs">
                <span className="material-symbols-outlined text-secondary-fixed text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
              </div>
              <h1 className="font-headline-md text-headline-md text-on-surface font-bold">CycleSafe Login</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Enter your PIN to access your account</p>
            </div>

            <form className="flex flex-col gap-space-md" id="vault-auth-form" onSubmit={onSubmit}>
              {/* Identity Field */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-md text-label-md text-on-surface font-medium flex items-center gap-space-xs" htmlFor="vault-email">
                  <span className="material-symbols-outlined text-outline text-[18px]">alternate_email</span>
                  Identity Handle
                </label>
                <input
                  className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-space-md py-space-sm rounded-lg focus:outline-none cursor-default shadow-sm"
                  id="vault-email"
                  readOnly
                  type="email"
                  value="ananya.sharma@example.com"
                />
              </div>

              {/* PIN Display & Preset Buttons */}
              <div className="flex flex-col gap-space-xs">
                <div className="flex justify-between items-center">
                  <label className="font-label-md text-label-md text-on-surface font-medium flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-outline text-[18px]">pin</span>
                    4-Digit Security PIN
                  </label>
                  <button className="font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors" onClick={clearPin} type="button">Clear</button>
                </div>
                <div className="flex items-center justify-between gap-space-sm bg-surface-container-low p-space-md rounded-xl">
                  <div className="flex items-center gap-space-sm" id="pin-display">
                    {Array.from({ length: 4 }, (_, index) => (
                      <div key={index} className={`pin-dot w-3.5 h-3.5 rounded-full transition-all duration-150 ${index < pin.length ? 'bg-primary scale-110' : 'bg-surface-variant'}`} />
                    ))}
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <button className="px-space-sm py-1 bg-surface-container text-on-surface font-label-sm text-label-sm rounded hover:bg-surface-variant transition-colors" onClick={() => presetPin('1234')} type="button">PIN 1234</button>
                    <button className="px-space-sm py-1 bg-error-container text-on-error-container font-label-sm text-label-sm rounded hover:opacity-90 transition-opacity" onClick={() => presetPin('4321')} type="button">Duress 4321</button>
                  </div>
                </div>

                {/* PIN Pad Grid */}
                <div className="grid grid-cols-3 gap-space-xs pt-space-xs">
                  <button className="h-10 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors" onClick={() => appendPinDigit('1')} type="button">1</button>
                  <button className="h-10 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors" onClick={() => appendPinDigit('2')} type="button">2</button>
                  <button className="h-10 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors" onClick={() => appendPinDigit('3')} type="button">3</button>
                  <button className="h-10 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors" onClick={() => appendPinDigit('4')} type="button">4</button>
                  <button className="h-10 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors" onClick={() => appendPinDigit('5')} type="button">5</button>
                  <button className="h-10 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors" onClick={() => appendPinDigit('6')} type="button">6</button>
                  <button className="h-10 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors" onClick={() => appendPinDigit('7')} type="button">7</button>
                  <button className="h-10 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors" onClick={() => appendPinDigit('8')} type="button">8</button>
                  <button className="h-10 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors" onClick={() => appendPinDigit('9')} type="button">9</button>
                  <button className="h-10 rounded-lg bg-surface-container-high hover:bg-surface-variant font-label-sm text-label-sm text-on-surface-variant transition-colors flex items-center justify-center" onClick={clearPin} type="button">
                    <span className="material-symbols-outlined text-[18px]">backspace</span>
                  </button>
                  <button className="h-10 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors" onClick={() => appendPinDigit('0')} type="button">0</button>
                  <button className="h-10 rounded-lg bg-surface-container-high hover:bg-surface-variant font-label-sm text-label-sm text-secondary transition-colors flex items-center justify-center" onClick={handleBiometric} title="Quick Biometric" type="button">
                    <span className="material-symbols-outlined text-[20px]">fingerprint</span>
                  </button>
                </div>
              </div>

              {/* Demo Hint Text */}
              <div className="rounded-xl bg-surface-container-high p-space-sm">
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  <strong>Demo Hint:</strong> PIN <span className="font-mono font-semibold text-on-surface bg-surface-container px-1 rounded">1234</span> normal / Duress PIN <span className="font-mono font-semibold text-error bg-error-container/60 px-1 rounded">4321</span> engagement.
                </p>
              </div>

              {/* Sign In Button */}
              <button
                className="w-full py-space-md px-space-xl rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-space-sm transition-all shadow-md"
                id="auth-submit-btn"
                type="submit"
                disabled={busy}
                data-path="cyclesafe-dashboard"
              >
                {busy ? <><span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span><span>Verifying...</span></> : <><span>Sign In</span><span className="material-symbols-outlined text-[18px]">arrow_forward</span></>}
              </button>
            </form>

            {/* Toast Notification */}
            {toast && (
              <div className={`mt-space-md p-space-md rounded-xl transition-all ${toast.mode === 'success' ? 'bg-secondary-container text-on-secondary-container' : toast.mode === 'warning' ? 'bg-surface-container-high text-primary' : 'bg-error-container text-on-error-container'}`} role="status">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[20px]">{toast.icon}</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold">{toast.title}</span>
                    <span className="font-body-sm text-body-sm">{toast.body}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer variant="app" />
    </>
  );
}
