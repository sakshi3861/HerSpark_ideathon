import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function VerifiedRegistry() {
  const [query, setQuery] = useState('');
  const [checking, setChecking] = useState(false);
  const inputRef = useRef(null);
  const verifyApp = () => {
    if (checking) return;
    setChecking(true);
    window.setTimeout(() => setChecking(false), 700);
  };

  return (
    <>
      <Header active="verified_registry" />
    <main className={"w-full pt-20 bg-surface min-h-[calc(100vh-160px)]"}><div className={"flex flex-col w-full"}>
    
    <div className={"relative w-full overflow-hidden"}>
    <div className={"absolute top-12 left-1/2 -translate-x-1/2 w-[840px] h-[340px] bg-gradient-to-r from-primary/10 via-secondary-container/20 to-primary-container/10 blur-3xl pointer-events-none -z-10 rounded-full"}></div>
    
    <div className={"max-w-6xl mx-auto px-6 py-12 flex flex-col gap-space-2xl"}>
    
    <section className={"flex flex-col items-center text-center max-w-4xl mx-auto"}>
    
    <div className={"inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-low shadow-sm"}>
    <span className={"w-2 h-2 rounded-full bg-secondary animate-ping"}></span>
    <span className={"font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider"}>Public Audit Directory • Post-Quantum Assurance</span>
    </div>
    
    <h1 className={"mt-space-lg font-headline-xl text-headline-xl text-on-surface tracking-tight leading-tight"}>
              Is your app keeping your data safe?
            </h1>
    
    <p className={"mt-space-md font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed"}>
              Verify whether your health, fertility, or lifestyle app protects user telemetry with cryptographic zero-knowledge enclaves or leaks intimate data to commercial ad-brokers under DPDP Act standards.
            </p>
    
    <div className={"w-full mt-space-xl bg-surface-container-lowest shadow-[0_10px_30px_-5px_rgba(67,56,202,0.08)] rounded-2xl p-2.5 transition-all focus-within:shadow-[0_12px_36px_-4px_rgba(67,56,202,0.14)]"}>
    <div className={"flex flex-col sm:flex-row items-stretch sm:items-center gap-2"}>
    <div className={"flex items-center gap-space-sm pl-space-md flex-1 py-1"}>
    <span className={"material-symbols-outlined text-outline text-[22px]"}>search</span>
    <input ref={inputRef} value={query} onChange={event => setQuery(event.target.value)} className={"w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:outline-none"} id={"registry-search-input"} placeholder={"Search by app name, developer bundle ID, or SDK hash (e.g. CycleSafe, GenericTracker)..."} type={"text"}/>
    <button aria-label={"Clear search"} className={`text-outline-variant hover:text-on-surface px-1 py-1 rounded transition-colors ${query ? '' : 'hidden'}`} id={"search-clear-btn"} type={"button"} onClick={() => { setQuery(''); inputRef.current?.focus(); }}>
    <span className={"material-symbols-outlined text-[18px]"}>close</span>
    </button>
    </div>
    <button className={"inline-flex items-center justify-center gap-space-xs px-space-xl py-3 rounded-xl bg-primary-container text-on-primary font-title-md text-title-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:bg-primary transition-all active:scale-[0.98]"} id={"check-app-btn"} type={"button"} onClick={verifyApp} disabled={checking}>
    {checking ? <><span className="material-symbols-outlined text-[20px] animate-spin">refresh</span><span>Verifying...</span></> : <><span className={"material-symbols-outlined text-[20px]"}>verified_user</span><span>Check App</span></>}
    </button>
    </div>
    </div>
    
    <div className={"flex flex-wrap items-center justify-center gap-2 mt-space-md"}>
    <span className={"font-label-sm text-label-sm text-outline uppercase tracking-wider"}>Quick Filters:</span>
    <button onClick={() => { setQuery('Recently Audited'); inputRef.current?.focus(); }} className={"filter-tag px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed font-label-sm text-label-sm transition-all shadow-sm"} type={"button"}>
                Recently Audited
              </button>
    <button onClick={() => { setQuery("Women's Health"); inputRef.current?.focus(); }} className={"filter-tag px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed font-label-sm text-label-sm transition-all shadow-sm"} type={"button"}>
                Women's Health
              </button>
    <button onClick={() => { setQuery('Wearables & IoT'); inputRef.current?.focus(); }} className={"filter-tag px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed font-label-sm text-label-sm transition-all shadow-sm"} type={"button"}>
                Wearables &amp; IoT
              </button>
    <button onClick={() => { setQuery('Zero-Egress Certified'); inputRef.current?.focus(); }} className={"filter-tag px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed font-label-sm text-label-sm transition-all shadow-sm"} type={"button"}>
                Zero-Egress Certified
              </button>
    </div>
    </section>
    
    <section className={"flex flex-col gap-space-lg"}>
    
    <div className={"flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-xs"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-primary text-[20px]"}>balance</span>
    <span className={"font-headline-sm text-headline-sm text-on-surface"}>Comparison Audit Snapshot</span>
    </div>
    <span className={"font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-3 py-1 rounded-full"}>
                Sample Verified vs Unverified Architectures
              </span>
    </div>
    
    <div className={"grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"}>
    
    <article className={"bg-surface-container-lowest rounded-2xl p-space-xl shadow-[0_4px_20px_-2px_rgba(79,70,229,0.06),0_1px_3px_0_rgba(79,70,229,0.04)] hover:shadow-[0_10px_25px_-3px_rgba(67,56,202,0.1)] transition-all flex flex-col justify-between"}>
    <div>
    
    <div className={"flex items-start justify-between gap-space-md pb-space-md"}>
    <div className={"flex items-center gap-space-md"}>
    <div className={"w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-container to-secondary flex items-center justify-center text-on-primary shadow-sm"}>
    <span className={"material-symbols-outlined text-[30px]"} style={{"fontVariationSettings": "'FILL' 1"}}>spa</span>
    </div>
    <div>
    <h2 className={"font-headline-md text-headline-md text-on-surface tracking-tight"}>CycleSafe</h2>
    <p className={"font-body-sm text-body-sm text-on-surface-variant"}>Period &amp; Reproductive Health App</p>
    <p className={"font-label-sm text-label-sm text-outline mt-0.5"}>by CycleSafe Health Inc.</p>
    </div>
    </div>
    
    <div className={"inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed shadow-sm"}>
    <span className={"material-symbols-outlined text-[16px]"} style={{"fontVariationSettings": "'FILL' 1"}}>verified</span>
    <span className={"font-label-sm text-label-sm font-semibold uppercase tracking-wider"}>Gold Verified</span>
    </div>
    </div>
    
    <div className={"mt-space-md p-space-md bg-surface-container-low rounded-xl flex flex-col sm:flex-row items-center justify-between gap-space-md"}>
    <div className={"flex items-center gap-space-md"}>
    
    <div className={"relative w-20 h-20 shrink-0 flex items-center justify-center"}>
    <svg className={"w-full h-full -rotate-90"} viewBox={"0 0 36 36"}>
    
    <path className={"text-surface-container-highest"} d={"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"} fill={"none"} stroke={"currentColor"} strokeWidth={"3.5"}></path>
    
    <path className={"text-secondary"} d={"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"} fill={"none"} stroke={"currentColor"} strokeDasharray={"94, 100"} strokeLinecap={"round"} strokeWidth={"3.5"}></path>
    </svg>
    <div className={"absolute inset-0 flex flex-col items-center justify-center"}>
    <span className={"font-headline-sm text-headline-sm font-bold text-on-surface"}>94</span>
    <span className={"text-[9px] font-label-sm text-outline -mt-1"}>/ 100</span>
    </div>
    </div>
    <div>
    <div className={"inline-flex items-center gap-1.5 text-secondary font-label-md text-label-md font-semibold tracking-wide"}>
    <span className={"w-2 h-2 rounded-full bg-secondary"}></span>
    <span>EXCELLENT PROTECTION</span>
    </div>
    <p className={"font-body-sm text-body-sm text-on-surface-variant mt-0.5"}>
                          Complies with zero-knowledge post-quantum telemetry constraints.
                        </p>
    </div>
    </div>
    <div className={"hidden sm:block text-right"}>
    <span className={"font-label-sm text-label-sm text-secondary bg-surface-container-lowest px-2.5 py-1 rounded-md shadow-xs"}>
                        PQC Level 3
                      </span>
    </div>
    </div>
    
    <div className={"mt-space-md px-1 py-1.5 flex flex-wrap items-center gap-x-space-md gap-y-1 font-label-sm text-label-sm text-on-surface-variant"}>
    <span className={"inline-flex items-center gap-1"}>
    <span className={"material-symbols-outlined text-[15px] text-secondary"}>memory</span>
                      Enclave: AMD SEV-SNP
                    </span>
    <span className={"text-outline-variant"}>•</span>
    <span className={"inline-flex items-center gap-1"}>
    <span className={"material-symbols-outlined text-[15px] text-secondary"}>shield_lock</span>
                      Zero AST Bypass
                    </span>
    <span className={"text-outline-variant"}>•</span>
    <span className={"inline-flex items-center gap-1"}>
    <span className={"material-symbols-outlined text-[15px] text-secondary"}>cloud_done</span>
                      Certified Egress: 0 bytes
                    </span>
    </div>
    
    <div className={"mt-space-lg flex flex-col gap-space-sm"}>
    
    <div className={"p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-start gap-space-md"}>
    <div className={"w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0 mt-0.5"}>
    <span className={"material-symbols-outlined text-[18px]"}>check</span>
    </div>
    <div className={"flex-1"}>
    <div className={"flex flex-col sm:flex-row sm:items-center justify-between gap-1"}>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>No sensitive data sent to ad SDKs</span>
    <span className={"font-label-sm text-label-sm text-secondary bg-surface-container px-2 py-0.5 rounded-full inline-block self-start sm:self-auto"}>
                            Passed
                          </span>
    </div>
    <p className={"font-body-sm text-body-sm text-on-surface-variant mt-1"}>
                          100% Blocked / Severed at Socket level prior to cellular transport.
                        </p>
    </div>
    </div>
    
    <div className={"p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-start gap-space-md"}>
    <div className={"w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0 mt-0.5"}>
    <span className={"material-symbols-outlined text-[18px]"}>key</span>
    </div>
    <div className={"flex-1"}>
    <div className={"flex flex-col sm:flex-row sm:items-center justify-between gap-1"}>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Quantum-safe encryption</span>
    <span className={"font-label-sm text-label-sm text-secondary bg-surface-container px-2 py-0.5 rounded-full inline-block self-start sm:self-auto"}>
                            Enforced
                          </span>
    </div>
    <p className={"font-body-sm text-body-sm text-on-surface-variant mt-1"}>
                          ML-KEM-768 key encapsulation + AES-256-GCM symmetric transport layer.
                        </p>
    </div>
    </div>
    
    <div className={"p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-start gap-space-md"}>
    <div className={"w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0 mt-0.5"}>
    <span className={"material-symbols-outlined text-[18px]"}>gavel</span>
    </div>
    <div className={"flex-1"}>
    <div className={"flex flex-col sm:flex-row sm:items-center justify-between gap-1"}>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Consent enforced</span>
    <span className={"font-label-sm text-label-sm text-secondary bg-surface-container px-2 py-0.5 rounded-full inline-block self-start sm:self-auto"}>
                            DPDP Compliant
                          </span>
    </div>
    <p className={"font-body-sm text-body-sm text-on-surface-variant mt-1"}>
                          Hardware Enclave Gate ensures strict user revocability (DPDP Act §9 Compliant).
                        </p>
    </div>
    </div>
    
    <div className={"p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-start gap-space-md"}>
    <div className={"w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0 mt-0.5"}>
    <span className={"material-symbols-outlined text-[18px]"}>verified</span>
    </div>
    <div className={"flex-1"}>
    <div className={"flex flex-col sm:flex-row sm:items-center justify-between gap-1"}>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Last audit date</span>
    <span className={"font-label-sm text-label-sm text-secondary bg-surface-container px-2 py-0.5 rounded-full inline-block self-start sm:self-auto"}>
                            Oct 24, 2025
                          </span>
    </div>
    <p className={"font-body-sm text-body-sm text-on-surface-variant mt-1"}>
                          Cryptographically verified by SurakshaShield Labs (Block #104,912 ledger stamp).
                        </p>
    </div>
    </div>
    </div>
    </div>
    
    <div className={"mt-space-xl pt-space-md"}>
    <a className={"w-full inline-flex items-center justify-center gap-space-xs px-space-lg py-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-primary font-title-md text-title-md transition-all shadow-xs"} href={"#"}>
    <span>View Full Attestation Certificate</span>
    <span className={"material-symbols-outlined text-[18px]"}>open_in_new</span>
    </a>
    </div>
    </article>
    
    <article className={"bg-surface-container-lowest rounded-2xl p-space-xl shadow-[0_4px_20px_-2px_rgba(186,26,26,0.06),0_1px_3px_0_rgba(186,26,26,0.04)] hover:shadow-[0_10px_25px_-3px_rgba(186,26,26,0.1)] transition-all flex flex-col justify-between"}>
    <div>
    
    <div className={"flex items-start justify-between gap-space-md pb-space-md"}>
    <div className={"flex items-center gap-space-md"}>
    <div className={"w-14 h-14 rounded-2xl bg-surface-container-highest flex items-center justify-center text-outline shadow-sm"}>
    <span className={"material-symbols-outlined text-[30px]"}>apps</span>
    </div>
    <div>
    <h2 className={"font-headline-md text-headline-md text-on-surface tracking-tight"}>GenericTracker</h2>
    <p className={"font-body-sm text-body-sm text-on-surface-variant"}>Fictional Lifestyle &amp; Cycle App</p>
    <p className={"font-label-sm text-label-sm text-outline mt-0.5"}>by Generic App Studio LLC</p>
    </div>
    </div>
    
    <div className={"inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-error-container text-on-error-container shadow-sm"}>
    <span className={"material-symbols-outlined text-[16px]"}>warning</span>
    <span className={"font-label-sm text-label-sm font-semibold uppercase tracking-wider"}>Not Verified</span>
    </div>
    </div>
    
    <div className={"mt-space-md p-space-md bg-surface-container-low rounded-xl flex flex-col sm:flex-row items-center justify-between gap-space-md"}>
    <div className={"flex items-center gap-space-md"}>
    
    <div className={"relative w-20 h-20 shrink-0 flex items-center justify-center"}>
    <svg className={"w-full h-full -rotate-90"} viewBox={"0 0 36 36"}>
    
    <path className={"text-surface-container-highest"} d={"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"} fill={"none"} stroke={"currentColor"} strokeWidth={"3.5"}></path>
    
    <path className={"text-error"} d={"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"} fill={"none"} stroke={"currentColor"} strokeDasharray={"38, 100"} strokeLinecap={"round"} strokeWidth={"3.5"}></path>
    </svg>
    <div className={"absolute inset-0 flex flex-col items-center justify-center"}>
    <span className={"font-headline-sm text-headline-sm font-bold text-on-surface"}>38</span>
    <span className={"text-[9px] font-label-sm text-outline -mt-1"}>/ 100</span>
    </div>
    </div>
    <div>
    <div className={"inline-flex items-center gap-1.5 text-error font-label-md text-label-md font-semibold tracking-wide"}>
    <span className={"w-2 h-2 rounded-full bg-error"}></span>
    <span>HIGH EGRESS RISK</span>
    </div>
    <p className={"font-body-sm text-body-sm text-on-surface-variant mt-0.5"}>
                          Third-party analytical trackers actively exfiltrate user inputs.
                        </p>
    </div>
    </div>
    <div className={"hidden sm:block text-right"}>
    <span className={"font-label-sm text-label-sm text-error bg-surface-container-lowest px-2.5 py-1 rounded-md shadow-xs"}>
                        Insecure AST
                      </span>
    </div>
    </div>
    
    <div className={"mt-space-md px-1 py-1.5 flex flex-wrap items-center gap-x-space-md gap-y-1 font-label-sm text-label-sm text-on-surface-variant"}>
    <span className={"inline-flex items-center gap-1"}>
    <span className={"material-symbols-outlined text-[15px] text-error"}>bug_report</span>
                      Ad SDKs detected: 6
                    </span>
    <span className={"text-outline-variant"}>•</span>
    <span className={"inline-flex items-center gap-1"}>
    <span className={"material-symbols-outlined text-[15px] text-error"}>lock_open</span>
                      Unencrypted Telemetry
                    </span>
    <span className={"text-outline-variant"}>•</span>
    <span className={"inline-flex items-center gap-1"}>
    <span className={"material-symbols-outlined text-[15px] text-error"}>person_off</span>
                      User Consent Bypassed
                    </span>
    </div>
    
    <div className={"mt-space-lg flex flex-col gap-space-sm"}>
    
    <div className={"p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-start gap-space-md"}>
    <div className={"w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0 mt-0.5"}>
    <span className={"material-symbols-outlined text-[18px]"}>close</span>
    </div>
    <div className={"flex-1"}>
    <div className={"flex flex-col sm:flex-row sm:items-center justify-between gap-1"}>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>No sensitive data sent to ad SDKs</span>
    <span className={"font-label-sm text-label-sm text-error bg-error-container/60 px-2 py-0.5 rounded-full inline-block self-start sm:self-auto"}>
                            Failed
                          </span>
    </div>
    <p className={"font-body-sm text-body-sm text-on-surface-variant mt-1"}>
                          Transmits raw ovulation &amp; symptom data payload to 4 ad networks.
                        </p>
    </div>
    </div>
    
    <div className={"p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-start gap-space-md"}>
    <div className={"w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0 mt-0.5"}>
    <span className={"material-symbols-outlined text-[18px]"}>no_encryption</span>
    </div>
    <div className={"flex-1"}>
    <div className={"flex flex-col sm:flex-row sm:items-center justify-between gap-1"}>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Quantum-safe encryption</span>
    <span className={"font-label-sm text-label-sm text-error bg-error-container/60 px-2 py-0.5 rounded-full inline-block self-start sm:self-auto"}>
                            Missing
                          </span>
    </div>
    <p className={"font-body-sm text-body-sm text-on-surface-variant mt-1"}>
                          Plaintext HTTP/1.1 or legacy RSA-1024 without forward secrecy (PFS).
                        </p>
    </div>
    </div>
    
    <div className={"p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-start gap-space-md"}>
    <div className={"w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0 mt-0.5"}>
    <span className={"material-symbols-outlined text-[18px]"}>cancel</span>
    </div>
    <div className={"flex-1"}>
    <div className={"flex flex-col sm:flex-row sm:items-center justify-between gap-1"}>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Consent enforced</span>
    <span className={"font-label-sm text-label-sm text-error bg-error-container/60 px-2 py-0.5 rounded-full inline-block self-start sm:self-auto"}>
                            Bypassed
                          </span>
    </div>
    <p className={"font-body-sm text-body-sm text-on-surface-variant mt-1"}>
                          Pre-ticked advertising consent, zero dynamic user revocation controls.
                        </p>
    </div>
    </div>
    
    <div className={"p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex items-start gap-space-md"}>
    <div className={"w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0 mt-0.5"}>
    <span className={"material-symbols-outlined text-[18px]"}>report</span>
    </div>
    <div className={"flex-1"}>
    <div className={"flex flex-col sm:flex-row sm:items-center justify-between gap-1"}>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Last audit date</span>
    <span className={"font-label-sm text-label-sm text-error bg-error-container/60 px-2 py-0.5 rounded-full inline-block self-start sm:self-auto"}>
                            Failed Scan
                          </span>
    </div>
    <p className={"font-body-sm text-body-sm text-on-surface-variant mt-1"}>
                          Failed automated scan Oct 20, 2025 (Multiple DPDP §9 non-compliance flags).
                        </p>
    </div>
    </div>
    </div>
    </div>
    
    <div className={"mt-space-xl pt-space-md"}>
    <a className={"w-full inline-flex items-center justify-center gap-space-xs px-space-lg py-3 rounded-xl bg-error-container/40 hover:bg-error-container/70 text-on-error-container font-title-md text-title-md transition-all shadow-xs"} href={"#"}>
    <span>View Vulnerability Notice</span>
    <span className={"material-symbols-outlined text-[18px]"}>warning</span>
    </a>
    </div>
    </article>
    </div>
    </section>
    
    <section className={"relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-container to-tertiary text-on-primary p-space-xl md:p-space-2xl shadow-[0_20px_35px_-10px_rgba(42,20,180,0.25)]"}>
    
    <div className={"absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none"}></div>
    <div className={"absolute -left-10 -top-10 w-60 h-60 rounded-full bg-inverse-primary/20 blur-2xl pointer-events-none"}></div>
    <div className={"relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-xl"}>
    <div className={"max-w-2xl"}>
    <div className={"inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-on-primary/10 text-primary-fixed font-label-sm text-label-sm mb-space-sm"}>
    <span className={"material-symbols-outlined text-[16px]"}>verified</span>
    <span>Developer Assurance Program</span>
    </div>
    <h2 className={"font-headline-lg text-headline-lg font-bold tracking-tight text-on-primary"}>
                  Protect your users and earn trust
                </h2>
    <p className={"mt-space-sm font-body-lg text-body-lg text-inverse-on-surface/90 leading-relaxed"}>
                  Integrate SurakshaShield SDK in under 10 minutes to eliminate SDK data leaks, achieve quantum-safe protection, and get featured in the Verified Registry.
                </p>
    </div>
    <div className={"flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md w-full lg:w-auto shrink-0"}>
    <a className={"inline-flex items-center justify-center gap-space-xs px-space-xl py-3.5 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-bright font-title-md text-title-md font-semibold transition-all shadow-md active:scale-[0.98]"} data-path={"integration-guide"} href={"#"}>
    <span className={"material-symbols-outlined text-[20px] text-primary"} style={{"fontVariationSettings": "'FILL' 1"}}>security</span>
    <span>Get your app certified</span>
    </a>
    <a className={"inline-flex items-center justify-center gap-space-xs px-space-lg py-3.5 rounded-xl bg-on-primary/10 hover:bg-on-primary/20 text-on-primary font-title-md text-title-md transition-all border-none"} data-path={"developer-docs"} href={"#"}>
    <span>Read Integration Docs</span>
    <span className={"material-symbols-outlined text-[18px]"}>arrow_forward</span>
    </a>
    </div>
    </div>
    </section>
    </div>
    </div>
    </div>
    </main>
      <Footer variant="registry" />
    </>
  );
}
