import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toggle from '../components/Toggle';

export default function CycleSafeWelcomeConsent() {
  const navigate = useNavigate();
  const [consents, setConsents] = useState({ health: true, sync: true, ads: false, research: false });
  const [initializing, setInitializing] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const toggleConsent = key => setConsents(current => ({ ...current, [key]: !current[key] }));
  const initializeVault = () => {
    if (initializing) return;
    setInitializing(true);
    window.setTimeout(() => {
      setInitializing(false);
      setAccepted(true);
      window.setTimeout(() => navigate('/cyclesafe/login'), 1000);
    }, 1200);
  };

  return (
    <>
      <Header active="cyclesafe_welcome_consent" />
    <main className={"w-full pt-20 bg-surface min-h-[calc(100vh-140px)]"}><div className={"flex flex-col w-full"}>
    <div className={"w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-space-xl"}>
    
    <div className={"w-full bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden"}>
    
    <div className={"w-full bg-surface-container-high px-space-md py-space-sm flex items-center justify-between gap-space-md"}>
    <div className={"flex items-center gap-space-sm"}>
    <div className={"flex items-center gap-1.5"}>
    <span className={"w-3 h-3 rounded-full bg-error/70"}></span>
    <span className={"w-3 h-3 rounded-full bg-outline-variant/60"}></span>
    <span className={"w-3 h-3 rounded-full bg-secondary/70"}></span>
    </div>
    <div className={"hidden sm:flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-0.5 rounded-full text-on-surface-variant text-[11px] font-label-sm shadow-sm"}>
    <span className={"material-symbols-outlined text-[13px] text-secondary"}>lock</span>
    <span className={""}>https://app.cyclesafe.internal/onboarding/consent-vault</span>
    <span className={"text-secondary font-semibold ml-1"}>SurakshaShield Active</span>
    </div>
    </div>
    <div className={"flex items-center gap-space-sm"}>
    <span className={"inline-flex items-center gap-1 bg-surface-container-low px-space-sm py-0.5 rounded text-[11px] font-label-sm text-on-surface-variant"}>
    <span className={"material-symbols-outlined text-[14px] text-primary"}>verified_user</span>
                E2EE Client v2.4.1
              </span>
    <span className={"w-2 h-2 rounded-full bg-secondary animate-pulse"}></span>
    </div>
    </div>
    
    <div className={"grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[680px]"}>
    
    <div className={"lg:col-span-6 bg-surface-container-lowest p-space-lg md:p-space-2xl flex flex-col justify-between relative overflow-hidden"}>
    
    <div className={"absolute -top-24 -left-24 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"}></div>
    <div className={"absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none"}></div>
    <div className={"relative z-10"}>
    
    <div className={"flex items-center gap-space-sm"}>
    <div className={"w-11 h-11 rounded-xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center shadow-md"}>
    <span className={"material-symbols-outlined text-on-primary text-[26px]"} style={{"fontVariationSettings": "'FILL' 1"}}>vital_signs</span>
    </div>
    <div className={"flex flex-col"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"font-headline-md text-headline-md tracking-tight text-primary"}>CycleSafe</span>
    <span className={"bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold"}>Private &amp; Secure</span>
    </div>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Confidential Reproductive Health Suite</span>
    </div>
    </div>
    
    <div className={"mt-space-xl"}>
    <h1 className={"font-headline-lg text-headline-lg text-on-surface leading-tight"}>
                    Empowering your menstrual health with <span className={"text-primary underline decoration-secondary-container decoration-4"}>zero privacy compromise</span>.
                  </h1>
    <p className={"mt-space-sm font-body-lg text-body-lg text-on-surface-variant max-w-xl"}>
                    CycleSafe stores zero unencrypted fertility telemetry on centralized cloud databases. All biomarker calculations execute inside your local enclave guarded by post-quantum ciphers.
                  </p>
    </div>
    
    <div className={"mt-space-xl space-y-space-md max-w-xl"}>
    <div className={"flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-low/70 transition-all hover:bg-surface-container-low shadow-sm"}>
    <div className={"w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm"}>
    <span className={"material-symbols-outlined text-primary text-[22px]"} style={{"fontVariationSettings": "'FILL' 1"}}>insights</span>
    </div>
    <div className={"flex flex-col"}>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Predictive Cycle Rhythm Forecasting</span>
    <span className={"font-body-md text-body-md text-on-surface-variant"}>Adaptive hormone estimation tailored directly to your basal biomarkers with local differential privacy.</span>
    </div>
    </div>
    <div className={"flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-low/70 transition-all hover:bg-surface-container-low shadow-sm"}>
    <div className={"w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm"}>
    <span className={"material-symbols-outlined text-secondary text-[22px]"} style={{"fontVariationSettings": "'FILL' 1"}}>lock_clock</span>
    </div>
    <div className={"flex flex-col"}>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Private Encrypted Symptom &amp; Mood Journal</span>
    <span className={"font-body-md text-body-md text-on-surface-variant"}>Private AES-256 encrypted journals. Even subpoena requests yield unreadable, random ciphertext.</span>
    </div>
    </div>
    <div className={"flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-low/70 transition-all hover:bg-surface-container-low shadow-sm"}>
    <div className={"w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm"}>
    <span className={"material-symbols-outlined text-primary text-[22px]"} style={{"fontVariationSettings": "'FILL' 1"}}>shield_with_heart</span>
    </div>
    <div className={"flex flex-col"}>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>One-Tap Guardian Emergency Circuit</span>
    <span className={"font-body-md text-body-md text-on-surface-variant"}>Duress passcodes, panic stealth wipes, and ephemeral location pinging to trusted family circles.</span>
    </div>
    </div>
    </div>
    </div>
    
    <div className={"mt-space-xl pt-space-lg relative z-10 flex flex-col sm:flex-row items-center justify-between gap-space-md p-space-md bg-surface-container-low rounded-xl"}>
    
    <div className={"flex items-center gap-space-md"}>
    <div className={"relative w-16 h-16 shrink-0 flex items-center justify-center"}>
    <svg className={"w-16 h-16 transform -rotate-90"} viewBox={"0 0 64 64"}>
    
    <circle className={"text-surface-variant"} cx={"32"} cy={"32"} fill={"none"} r={"26"} stroke={"currentColor"} strokeWidth={"4"}></circle>
    
    <circle className={"text-primary"} cx={"32"} cy={"32"} fill={"none"} r={"26"} stroke={"currentColor"} strokeDasharray={"163"} strokeDashoffset={"48"} strokeLinecap={"round"} strokeWidth={"4"}></circle>
    
    <circle className={"text-surface-variant"} cx={"32"} cy={"32"} fill={"none"} r={"18"} stroke={"currentColor"} strokeWidth={"3.5"}></circle>
    
    <circle className={"text-secondary"} cx={"32"} cy={"32"} fill={"none"} r={"18"} stroke={"currentColor"} strokeDasharray={"113"} strokeDashoffset={"35"} strokeLinecap={"round"} strokeWidth={"3.5"}></circle>
    </svg>
    <span className={"absolute font-label-sm text-label-sm font-bold text-primary"}>D-14</span>
    </div>
    <div className={"flex flex-col"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"font-label-md text-label-md font-semibold text-on-surface"}>Private Health Protection</span>
    <span className={"w-2 h-2 rounded-full bg-secondary"}></span>
    </div>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Entropy key rotation in 18 hrs</span>
    </div>
    </div>
    
    <div className={"flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded-full shadow-sm"}>
    <svg className={"w-5 h-5 text-primary"} fill={"currentColor"} viewBox={"0 0 24 24"}>
    <path d={"M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 9.06-7 10.18-3.87-1.12-7-5.51-7-10.18V6.3l7-3.12zm-1 5.82v6h2v-6h-2zm0 8v2h2v-2h-2z"}></path>
    </svg>
    <div className={"flex flex-col"}>
    <span className={"font-label-sm text-label-sm font-semibold text-primary"}>SurakshaShield Hardened</span>
    <span className={"text-[10px] font-label-sm text-on-surface-variant"}>Zero Raw Data Egress</span>
    </div>
    </div>
    </div>
    </div>
    
    <div className={"lg:col-span-6 bg-surface-container-low p-space-md sm:p-space-lg md:p-space-xl flex items-center justify-center"}>
    <div className={"w-full max-w-xl bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl shadow-xl flex flex-col justify-between"}>
    <div>
    
    <div className={"flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs"}>
    <span className={"font-headline-md text-headline-md text-on-surface tracking-tight"}>Your Data, Your Choice</span>
    </div>
    
    <div className={"mt-space-xs inline-flex items-center gap-space-xs bg-surface-container px-space-sm py-1 rounded-md"}>
    <span className={"material-symbols-outlined text-[16px] text-tertiary"}>verified</span>
    <span className={"font-label-sm text-label-sm text-tertiary font-semibold tracking-tight"}>DPDP Act 2023 Compliant Consent Receipt #SURAKSHA-8842</span>
    </div>
    <p className={"mt-space-md font-body-md text-body-md text-on-surface-variant leading-relaxed"}>CycleSafe utilizes the <strong className={"text-primary font-semibold"}>SurakshaShield SDK</strong> to ensure you hold granular privacy control over every data point. Change or revoke these privileges anytime.</p>
    
    <div className={"mt-space-lg space-y-space-md"}>
    
    <div className={"p-space-md rounded-xl bg-surface-container-low flex items-start justify-between gap-space-md transition-colors"}>
    <div className={"flex items-start gap-space-sm"}>
    <div className={"w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm mt-0.5"}>
    <span className={"material-symbols-outlined text-secondary text-[20px]"} style={{"fontVariationSettings": "'FILL' 1"}}>medical_information</span>
    </div>
    <div className={"flex flex-col"}>
    <div className={"flex items-center gap-space-xs flex-wrap"}>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Health &amp; Cycle Tracking</span>
    <span className={"inline-flex items-center gap-1 bg-secondary-fixed/50 text-on-secondary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold"}>
    <span className={"w-1.5 h-1.5 rounded-full bg-secondary"}></span> Protected On-Device
                            </span>
    </div>
    <p className={"mt-1 font-body-sm text-body-sm text-on-surface-variant"}>
                            Menstrual, symptom, and ovulation telemetry. Processed strictly on-device with zero external exposure.
                          </p>
    </div>
    </div>
    
    <div className={"shrink-0 pt-1"}>
    <Toggle label="Health and cycle tracking" enabled={consents.health} onChange={() => toggleConsent('health')} />
    </div>
    </div>
    
    <div className={"p-space-md rounded-xl bg-surface-container-low flex items-start justify-between gap-space-md transition-colors"}>
    <div className={"flex items-start gap-space-sm"}>
    <div className={"w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm mt-0.5"}>
    <span className={"material-symbols-outlined text-primary text-[20px]"}>sync_saved_locally</span>
    </div>
    <div className={"flex flex-col"}>
    <div className={"flex items-center gap-space-xs flex-wrap"}>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Internal Analytics &amp; Sync</span>
    <span className={"inline-flex items-center gap-1 bg-surface-variant text-primary font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold"}>
    <span className={"material-symbols-outlined text-[13px]"}>key</span> ML-KEM 768
                            </span>
    </div>
    <p className={"mt-1 font-body-sm text-body-sm text-on-surface-variant"}>
                            Encrypted multi-device backup and crash diagnostic reports with post-quantum key encapsulation.
                          </p>
    </div>
    </div>
    
    <div className={"shrink-0 pt-1"}>
    <Toggle label="Internal analytics and sync" enabled={consents.sync} onChange={() => toggleConsent('sync')} />
    </div>
    </div>
    
    <div className={"p-space-md rounded-xl bg-surface-container-low flex items-start justify-between gap-space-md transition-colors"}>
    <div className={"flex items-start gap-space-sm"}>
    <div className={"w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm mt-0.5"}>
    <span className={"material-symbols-outlined text-error text-[20px]"}>ad_off</span>
    </div>
    <div className={"flex flex-col"}>
    <div className={"flex items-center gap-space-xs flex-wrap"}>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Advertising &amp; Personalization</span>
    <span className={"inline-flex items-center gap-1 bg-error-container text-on-error-container font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold"}>
    <span className={"material-symbols-outlined text-[12px]"}>do_not_disturb_on</span> Blocked by default
                            </span>
    </div>
    <p className={"mt-1 font-body-sm text-body-sm text-on-surface-variant"}>
                            Transmitting anonymous IDs or targeting signals to marketing brokers. Always disabled={'{'}true{'}'} in core mode.
                          </p>
    </div>
    </div>
    
    <div className={"shrink-0 pt-1"}>
    <Toggle label="Advertising and personalization" enabled={consents.ads} onChange={() => toggleConsent('ads')} />
    </div>
    </div>
    
    <div className={"p-space-md rounded-xl bg-surface-container-low flex items-start justify-between gap-space-md transition-colors"}>
    <div className={"flex items-start gap-space-sm"}>
    <div className={"w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm mt-0.5"}>
    <span className={"material-symbols-outlined text-outline text-[20px]"}>biotech</span>
    </div>
    <div className={"flex flex-col"}>
    <div className={"flex items-center gap-space-xs flex-wrap"}>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Third-Party Research Sharing</span>
    <span className={"inline-flex items-center gap-1 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold"}>
                              Opt-In Only
                            </span>
    </div>
    <p className={"mt-1 font-body-sm text-body-sm text-on-surface-variant"}>Sharing anonymous, de-identified reproductive health datasets with public university laboratories.</p>
    </div>
    </div>
    
    <div className={"shrink-0 pt-1"}>
    <Toggle label="Third-party research sharing" enabled={consents.research} onChange={() => toggleConsent('research')} />
    </div>
    </div>
    </div>
    </div>
    
    <div className={"mt-space-xl pt-space-md flex flex-col gap-space-md"}>
    
    <div className={"flex items-center justify-between p-space-md rounded-xl bg-gradient-to-r from-primary/10 via-surface-container-low to-secondary-container/20 shadow-sm"}>
    <div className={"flex items-center gap-space-sm"}>
    <div className={"w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-sm"}>
    <span className={"material-symbols-outlined text-on-primary text-[20px]"}>lock</span>
    </div>
    <div className={"flex flex-col"}>
    <span className={"font-label-md text-label-md font-semibold text-primary"}>Private Health Protection</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Hardware keystore validation &amp; tamper defense</span>
    </div>
    </div>
    <span className={"font-label-sm text-label-sm font-semibold text-secondary flex items-center gap-1"}>
    <span className={"w-2 h-2 rounded-full bg-secondary animate-pulse"}></span>
                      Active Shield
                    </span>
    </div>
    
    <div className={"flex flex-col sm:flex-row items-center gap-space-md"}>
    <button className={`w-full sm:flex-1 py-space-sm px-space-lg ${accepted ? 'bg-secondary' : 'bg-primary hover:bg-primary-container'} text-on-primary font-headline-sm text-headline-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-space-sm`} id={"accept-vault-btn"} type={"button"} onClick={initializeVault} disabled={initializing}>
    {initializing ? <><span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span><span>Generating Signed DPDP Keypair...</span></> : accepted ? <><span className="material-symbols-outlined text-[20px]">check_circle</span><span>Consent Vault Initialized</span></> : <><span>Accept &amp; Continue to Vault</span><span className={"material-symbols-outlined text-[20px]"}>arrow_forward</span></>}
    </button>
    </div>
    
    </div>
    </div>
    </div>
    </div>
    </div>
    
    
    </div>
    
    
    </div></main>
      <Footer variant="app" />
    </>
  );
}
