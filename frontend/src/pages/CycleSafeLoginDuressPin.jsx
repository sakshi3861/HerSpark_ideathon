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
    if (value === '1234') setToast({ mode: 'success', icon: 'verified_user', title: 'Standard Vault Access Granted', body: 'Authenticating Ananya Sharma. Zero-Knowledge Key Envelope decrypted. Redirecting to sovereign dashboard...' });
    else if (value === '4321') setToast({ mode: 'duress', icon: 'fmd_bad', title: 'Duress Protocol Engaged (Silent)', body: 'Loaded decoy empty telemetry logs. Inbound UI appears authentic. Covert emergency beacon transmitted to SurakshaShield Console.' });
    else setToast({ mode: 'error', icon: 'error', title: 'Authentication Rejection', body: 'Invalid cryptographic PIN capsule. Zero knowledge verification failed. Try PIN 1234 or Duress PIN 4321.' });
  };
  const presetPin = value => { setPin(value); window.setTimeout(() => authenticatePin(value), 200); };
  const handleBiometric = () => { setPin('1234'); setToast({ mode: 'success', icon: 'verified_user', title: 'Biometric Key Unlocked', body: 'Passkey authenticated via WebAuthn. Initializing ML-KEM session decryption...' }); };
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
    <main className={"w-full pt-20 bg-surface min-h-[calc(100vh-140px)]"}><div className={"flex flex-col w-full"}>
    <div className={"relative w-full min-h-[calc(100vh-140px)] flex flex-col justify-center items-center px-gutter-mobile md:px-margin py-space-xl overflow-hidden bg-surface"}>
    <div className={"absolute -top-32 -left-20 w-96 h-96 rounded-full bg-surface-container-high/60 blur-3xl pointer-events-none"}></div>
    <div className={"absolute top-1/3 -right-24 w-[30rem] h-[30rem] rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"}></div>
    <div className={"absolute -bottom-24 left-1/4 w-[28rem] h-[28rem] rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none"}></div>
    <div className={"w-full max-w-xl mx-auto relative z-10 flex flex-col items-center"}>
    <div className={"inline-flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-surface-container-low shadow-sm mb-space-lg"}>
    <span className={"w-2 h-2 rounded-full bg-secondary animate-pulse"}></span>
    <span className={"font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider"}>Zero-Knowledge Vault Sandbox</span>
    <span className={"w-1 h-1 rounded-full bg-outline-variant"}></span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant font-mono"}>NODE-PQ-768</span>
    </div>
    <div className={"w-full bg-surface-container-lowest rounded-2xl shadow-xl shadow-primary/5 p-space-lg md:p-space-2xl transition-all duration-300"}>
    <div className={"flex flex-col items-center text-center mb-space-xl"}>
    <div className={"relative w-20 h-20 mb-space-md flex items-center justify-center"}>
    <div className={"absolute inset-0 bg-primary/10 rounded-2xl rotate-3"}></div>
    <div className={"relative w-16 h-16 rounded-xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center shadow-md shadow-primary/20"}>
    <span className={"material-symbols-outlined text-secondary-fixed text-[36px]"} style={{"fontVariationSettings": "'FILL' 1"}}>shield_person</span>
    </div>
    <div className={"absolute -bottom-1 -right-1 bg-surface-container-lowest p-1 rounded-full shadow-sm"}>
    <span className={"material-symbols-outlined text-secondary text-[16px] block"}>lock</span>
    </div>
    </div>
    <div className={"flex items-center gap-space-xs mb-space-xs"}>
    <h1 className={"font-headline-md text-headline-md text-on-surface tracking-tight"}>CycleSafe</h1>
    <span className={"px-space-xs py-0.5 rounded text-[10px] font-mono font-semibold bg-surface-container-high text-primary tracking-wide uppercase"}>Core</span>
    </div>
    <p className={"font-body-md text-body-md text-on-surface-variant"}>Secure Sovereign Vault Login</p>
    <div className={"flex items-center gap-space-sm mt-space-xs"}>
    <span className={"font-label-sm text-label-sm text-outline"}>Protocol:</span>
    <span className={"font-label-sm text-label-sm text-tertiary font-semibold"}>ML-KEM 768 / Kyber Protected</span>
    </div>
    </div>
    <form className={"flex flex-col gap-space-lg"} id={"vault-auth-form"} onSubmit={onSubmit}>
    <div className={"flex flex-col gap-space-xs"}>
    <div className={"flex justify-between items-center"}>
    <label className={"font-label-md text-label-md text-on-surface font-medium flex items-center gap-space-xs"} htmlFor={"vault-email"}>
    <span className={"material-symbols-outlined text-outline text-[18px]"}>alternate_email</span>
                    Identity Handle
                  </label>
    <span className={"font-label-sm text-label-sm text-secondary font-medium flex items-center gap-1"}>
    <span className={"material-symbols-outlined text-[14px]"}>verified</span> Encrypted ID
                  </span>
    </div>
    <div className={"relative"}>
    <input className={"w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-space-md py-space-sm rounded-lg focus:outline-none cursor-default shadow-sm"} id={"vault-email"} readOnly={true} type={"email"} value={"ananya.sharma@example.com"} />
    <span className={"material-symbols-outlined absolute right-space-md top-1/2 -translate-y-1/2 text-outline text-[18px]"}>lock</span>
    </div>
    </div>
    <div className={"flex flex-col gap-space-xs"}>
    <div className={"flex justify-between items-center"}>
    <label className={"font-label-md text-label-md text-on-surface font-medium flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-outline text-[18px]"}>pin</span>
                    4-Digit Security PIN
                  </label>
    <button className={"font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors"} onClick={clearPin} type={"button"}>Clear Input</button>
    </div>
    <div className={"flex items-center justify-between gap-space-sm bg-surface-container-low p-space-md rounded-xl"}>
    <div className={"flex items-center gap-space-md"}>
    <div className={"flex gap-space-sm"} id={"pin-display"}>
    {Array.from({ length: 4 }, (_, index) => <div key={index} className={`pin-dot w-3.5 h-3.5 rounded-full transition-all duration-150 ${index < pin.length ? 'bg-primary scale-110' : 'bg-surface-variant'}`} />)}
    </div>
    <input autoComplete={"off"} className={"sr-only"} id={"vault-pin-hidden"} inputMode={"numeric"} maxLength={"4"} pattern={"[0-9]*"} type={"password"} />
    </div>
    <div className={"flex items-center gap-space-xs"}>
    <button className={"px-space-sm py-1 bg-surface-container text-on-surface font-label-sm text-label-sm rounded hover:bg-surface-variant transition-colors"} onClick={() => presetPin('1234')} title={"Load Normal PIN"} type={"button"}>PIN 1234</button>
    <button className={"px-space-sm py-1 bg-error-container text-on-error-container font-label-sm text-label-sm rounded hover:opacity-90 transition-opacity"} onClick={() => presetPin('4321')} title={"Load Coerced Duress PIN"} type={"button"}>Duress 4321</button>
    </div>
    </div>
    <div className={"grid grid-cols-3 gap-space-xs pt-space-xs"}>
    <button className={"h-11 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors"} onClick={() => appendPinDigit('1')} type={"button"}>1</button>
    <button className={"h-11 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors"} onClick={() => appendPinDigit('2')} type={"button"}>2</button>
    <button className={"h-11 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors"} onClick={() => appendPinDigit('3')} type={"button"}>3</button>
    <button className={"h-11 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors"} onClick={() => appendPinDigit('4')} type={"button"}>4</button>
    <button className={"h-11 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors"} onClick={() => appendPinDigit('5')} type={"button"}>5</button>
    <button className={"h-11 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors"} onClick={() => appendPinDigit('6')} type={"button"}>6</button>
    <button className={"h-11 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors"} onClick={() => appendPinDigit('7')} type={"button"}>7</button>
    <button className={"h-11 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors"} onClick={() => appendPinDigit('8')} type={"button"}>8</button>
    <button className={"h-11 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors"} onClick={() => appendPinDigit('9')} type={"button"}>9</button>
    <button className={"h-11 rounded-lg bg-surface-container-high hover:bg-surface-variant font-label-sm text-label-sm text-on-surface-variant transition-colors flex items-center justify-center"} onClick={clearPin} type={"button"}>
    <span className={"material-symbols-outlined text-[18px]"}>backspace</span>
    </button>
    <button className={"h-11 rounded-lg bg-surface-container hover:bg-surface-variant font-label-md text-label-md text-on-surface font-medium transition-colors"} onClick={() => appendPinDigit('0')} type={"button"}>0</button>
    <button className={"h-11 rounded-lg bg-surface-container-high hover:bg-surface-variant font-label-sm text-label-sm text-secondary transition-colors flex items-center justify-center"} onClick={handleBiometric} title={"Quick Biometric"} type={"button"}>
    <span className={"material-symbols-outlined text-[20px]"}>fingerprint</span>
    </button>
    </div>
    </div>
    <div className={"relative overflow-hidden rounded-xl bg-surface-container-high p-space-md shadow-sm"}>
    <div className={"flex items-start gap-space-sm"}>
    <span className={"material-symbols-outlined text-primary text-[22px] shrink-0 mt-0.5"}>lightbulb</span>
    <div className={"flex flex-col gap-1"}>
    <span className={"font-label-sm text-label-sm text-primary font-semibold tracking-wide uppercase"}>Demo Security Hint</span>
    <p className={"font-body-sm text-body-sm text-on-surface-variant leading-relaxed"}>
                      Enter PIN <span className={"font-mono font-semibold text-on-surface bg-surface-container px-1 rounded"}>1234</span> for normal vault access, or enter Duress PIN <span className={"font-mono font-semibold text-error bg-error-container/60 px-1 rounded"}>4321</span> to silently simulate a coerced login (activates fake empty decoy logs, silences SOS alerts, and sends a covert emergency beacon to SurakshaShield Threat Console).
                    </p>
    </div>
    </div>
    </div>
    <button className={"w-full flex items-center justify-center gap-space-sm py-space-sm px-space-md rounded-lg bg-surface-container hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-all shadow-sm"} onClick={handleBiometric} type={"button"}>
    <span className={"material-symbols-outlined text-secondary text-[20px]"}>fingerprint</span>
    <span className={""}>Unlock with Passkey / Face ID</span>
    <span className={"material-symbols-outlined text-on-surface-variant text-[16px] ml-auto"}>lock_open</span>
    </button>
    <button className={"w-full py-space-md px-space-xl rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-space-sm transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] shadow-md"} id={"auth-submit-btn"} type={"submit"} disabled={busy} data-path={"cyclesafe-dashboard"}>
    {busy ? <><span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span><span>Verifying Cryptographic Capsule...</span></> : <><span>Sign In to Vault</span><span className={"material-symbols-outlined text-[18px]"}>arrow_forward</span></>}
    </button>
    </form>
    {toast && <div className={`mt-space-md p-space-md rounded-xl transition-all duration-300 ${toast.mode === 'success' ? 'bg-secondary-container text-on-secondary-container' : toast.mode === 'warning' ? 'bg-surface-container-high text-primary' : 'bg-error-container text-on-error-container'}`} role="status">
    <div className={"flex items-center gap-space-sm"}>
    <span className={"material-symbols-outlined text-[20px]"}>{toast.icon}</span>
    <div className={"flex flex-col"}>
    <span className={"font-label-md text-label-md font-semibold"}>{toast.title}</span>
    <span className={"font-body-sm text-body-sm"}>{toast.body}</span>
    </div>
    </div>
    </div>}
    </div>
    <div className={"mt-space-lg flex items-center justify-center gap-space-sm px-space-md py-space-xs rounded-full bg-surface-container-low shadow-sm text-center"}>
    <span className={"material-symbols-outlined text-primary text-[16px]"}>verified_user</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>
              End-to-End Encrypted via SurakshaShield Post-Quantum Envelope • No plain-text PIN stored
            </span>
    </div>
    
    </div>
    </div>
    </div>
    </main>
      <Footer variant="app" />
    </>
  );
}
