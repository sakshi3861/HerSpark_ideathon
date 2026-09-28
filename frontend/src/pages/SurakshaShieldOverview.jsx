import React from 'react';
import brandMark from '../assets/brandmark.svg';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SurakshaShieldOverview() {
  return (
    <>
      <Header active="surakshashield_overview" />
    <main className={"w-full pt-20 bg-surface min-h-[calc(100vh-140px)]"}><div className={"flex flex-col w-full"}>
    
    <section className={"relative w-full overflow-hidden bg-gradient-to-b from-surface-container-lowest via-surface to-surface-container-low px-margin py-space-2xl"}>
    <div className={"absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"}></div>
    <div className={"absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"}></div>
    <div className={"max-w-[1440px] mx-auto flex flex-col items-center text-center"}>
    
    <div className={"inline-flex items-center gap-space-sm bg-surface-container-high px-space-md py-space-xs rounded-full shadow-sm mb-space-lg"}>
    <span className={"w-2 h-2 rounded-full bg-secondary animate-pulse"}></span>
    <span className={"font-label-sm text-label-sm text-primary font-semibold tracking-wide"}>
              Quantum-Resistant Privacy Architecture • DPDP Act 2023 Compliant
            </span>
    </div>
    
    <h1 className={"font-headline-xl text-headline-xl text-on-surface max-w-4xl tracking-tight mb-space-md"}>The Quick Heal for Apps</h1>
    
    <p className={"font-body-lg text-body-lg text-on-surface-variant max-w-3xl mb-space-xl"}>Women's apps leak sensitive data through their own third-party SDKs.</p>
    
    <div className={"flex flex-col sm:flex-row items-center gap-space-md mb-space-2xl"}><a className={"inline-flex items-center gap-space-sm bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-space-xl py-space-md rounded-lg shadow-md hover:shadow-lg transition-all duration-200"} href={"/cyclesafe/welcome"}><span className={""}>Try the demo</span><span className={"material-symbols-outlined text-[18px]"}>arrow_forward</span></a><a className={"inline-flex items-center gap-space-sm bg-surface-container-lowest hover:bg-surface-container-low text-primary font-label-md text-label-md px-space-lg py-space-md rounded-lg shadow-sm transition-all duration-200"} href={"/console"}><span className={"material-symbols-outlined text-[18px]"}>terminal</span><span className={""}>Open Console</span></a></div>
    <div className={"inline-flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm bg-surface-container-low/70 px-space-md py-space-xs rounded-full shadow-sm"}>
    <span className={"material-symbols-outlined text-secondary text-[16px]"}>verified_user</span>
    <span className={""}>Protected by post-quantum ML-KEM-768 &amp; ML-DSA Cryptographic Primitives</span>
    </div>
    
    <div className={"w-full max-w-5xl mt-space-2xl bg-surface-container-lowest rounded-2xl shadow-xl p-space-lg"}>
    <div className={"flex flex-col lg:flex-row items-stretch justify-between gap-space-md"}>
    
    <div className={"flex-1 bg-error-container/20 rounded-xl p-space-md flex flex-col text-left"}>
    <div className={"flex items-center justify-between mb-space-sm"}>
    <span className={"font-label-sm text-label-sm text-error font-semibold flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-[16px]"}>warning</span>
                    UNSHIELDED RAW TELEMETRY
                  </span>
    <span className={"bg-error-container text-on-error-container font-label-sm text-label-sm px-space-xs py-0.5 rounded"}>
                    LEAK RISK: CRITICAL
                  </span>
    </div>
    <div className={"font-code-block text-code-block text-error bg-surface-container-lowest p-space-sm rounded-lg flex-1 shadow-sm leading-relaxed overflow-x-auto"}>
    <span className={"text-on-surface-variant"}>// Outbound Tracking Payload</span><br />
                  {'{'}<br />
                  &nbsp;&nbsp;<span className={"font-semibold text-error"}>"logFertility"</span>: <span className={"text-on-surface"}>"period_day_14_ovulation"</span>,<br />
                  &nbsp;&nbsp;<span className={"font-semibold text-error"}>"intimacy_logged"</span>: <span className={"text-on-surface"}>true</span>,<br />
                  &nbsp;&nbsp;<span className={"font-semibold text-error"}>"ad_id"</span>: <span className={"text-on-surface"}>"8f3a91bb-04a2-4112"</span>,<br />
                  &nbsp;&nbsp;<span className={"font-semibold text-error"}>"lat"</span>: <span className={"text-on-surface"}>19.076090</span>,<br />
                  &nbsp;&nbsp;<span className={"font-semibold text-error"}>"lng"</span>: <span className={"text-on-surface"}>72.877746</span><br />
                  {'}'}
                </div>
    <p className={"font-body-sm text-body-sm text-on-surface-variant mt-space-sm flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-error text-[16px]"}>block</span>
                  Exposes ovulation cycle, intimacy events &amp; precise residential coordinates.
                </p>
    </div>
    
    <div className={"flex lg:flex-col items-center justify-center py-space-sm px-space-xs gap-space-sm"}>
    <div className={"w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg animate-pulse"}>
    <span className={"material-symbols-outlined text-[24px]"}>shield_lock</span>
    </div>
    <div className={"hidden lg:flex flex-col items-center"}>
    <span className={"font-label-sm text-label-sm text-primary font-bold tracking-tight"}>GATEWAY</span>
    <span className={"font-label-sm text-label-sm text-secondary font-medium"}>SHIELD ACTIVE</span>
    <span className={"material-symbols-outlined text-primary text-[20px] mt-space-xs"}>arrow_downward</span>
    </div>
    <div className={"flex lg:hidden items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-primary text-[20px]"}>arrow_forward</span>
    </div>
    </div>
    
    <div className={"flex-1 bg-surface-container rounded-xl p-space-md flex flex-col text-left"}>
    <div className={"flex items-center justify-between mb-space-sm"}>
    <span className={"font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-[16px]"}>verified</span>
                    SURAKSHA PROTOCOL ENFORCED
                  </span>
    <span className={"bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-space-xs py-0.5 rounded font-semibold"}>
                    QUANTUM SECURE
                  </span>
    </div>
    <div className={"font-code-block text-code-block text-primary-container bg-surface-container-lowest p-space-sm rounded-lg flex-1 shadow-sm leading-relaxed overflow-x-auto"}>
    <span className={"text-on-surface-variant"}>// Zero-Knowledge Egress Envelope</span><br />
                  {'{'}<br />
                  &nbsp;&nbsp;<span className={"font-semibold text-secondary"}>"zk_cipher_payload"</span>: <span className={"text-primary font-mono"}>"ML-KEM-768:0x8a92f0bc4..."</span>,<br />
                  &nbsp;&nbsp;<span className={"font-semibold text-secondary"}>"intimacy_logged"</span>: <span className={"text-secondary font-mono"}>"[MASKED_DIFFERENTIAL_NOISE]"</span>,<br />
                  &nbsp;&nbsp;<span className={"font-semibold text-secondary"}>"ad_id"</span>: <span className={"text-secondary font-mono"}>"[ROTATED_HASH_ROT-33]"</span>,<br />
                  &nbsp;&nbsp;<span className={"font-semibold text-secondary"}>"lat"</span>: <span className={"text-on-surface font-mono"}>19.07</span> <span className={"text-on-surface-variant text-[11px]"}>(H3 res 6 cell)</span>,<br />
                  &nbsp;&nbsp;<span className={"font-semibold text-secondary"}>"dpdp_consent_token"</span>: <span className={"text-primary font-mono"}>"urn:ss:dpdp:2023:valid"</span><br />
                  {'}'}
                </div>
    <p className={"font-body-sm text-body-sm text-on-surface-variant mt-space-sm flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-secondary text-[16px]"}>check_circle</span>
                  Synthetic identity substitution, coarse geo-fuzzing, zero raw telemetry.
                </p>
    </div>
    </div>
    </div>
    </div>
    </section>
    
    
    
    <section className={"w-full bg-surface py-space-2xl px-margin"}>
    <div className={"max-w-[1440px] mx-auto"}>
    <div className={"flex flex-col md:flex-row md:items-end justify-between mb-space-xl"}>
    <div className={"max-w-2xl"}>
    <span className={"font-label-sm text-label-sm text-error uppercase font-bold tracking-wider"}>Historical Vulnerabilities</span>
    <h2 className={"font-headline-lg text-headline-lg text-on-surface tracking-tight mt-space-xs"}>
                Why Women's App Data Demands Dedicated Defense
              </h2>
    <p className={"font-body-md text-body-md text-on-surface-variant mt-space-sm"}>
                Standard endpoint security ignores third-party analytics trackers silently gathering reproductive health metrics, ovulation logs, and pinpoint mobility.
              </p>
    </div>
    <div className={"mt-space-md md:mt-0 flex items-center gap-space-xs text-error font-label-md text-label-md bg-error-container/40 px-space-md py-space-xs rounded-lg"}>
    <span className={"material-symbols-outlined text-[18px]"}>gavel</span>
    <span className={""}>Regulatory Enforcement Trends (2021-2024)</span>
    </div>
    </div>
    
    <div className={"grid grid-cols-1 md:grid-cols-3 gap-space-lg"}>
    
    <div className={"bg-surface-container-lowest rounded-2xl p-space-lg shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow"}>
    <div>
    <div className={"flex items-center justify-between mb-space-md"}>
    <span className={"font-label-sm text-label-sm bg-error-container text-on-error-container px-space-xs py-0.5 rounded font-semibold"}>
                    FTC SETTLEMENT
                  </span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>100M+ Profiles</span>
    </div>
    <h3 className={"font-headline-sm text-headline-sm text-on-surface mb-space-xs"}>
                  Flo Health Settlement
                </h3>
    <p className={"font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md"}>
                  Federal Trade Commission enforcement revealed unencrypted sharing of intimate ovulation dates, cycle timestamps, and pregnancy milestones directly with ad platforms and web analytics services without explicit user authorization.
                </p>
    </div>
    <div className={"bg-surface-container-low rounded-lg p-space-sm"}>
    <span className={"font-label-sm text-label-sm text-error font-medium flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-[14px]"}>warning</span>
                  Vulnerability: Third-party SDK telemetry bypass
                </span>
    </div>
    </div>
    
    <div className={"bg-surface-container-lowest rounded-2xl p-space-lg shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow"}>
    <div>
    <div className={"flex items-center justify-between mb-space-md"}>
    <span className={"font-label-sm text-label-sm bg-error-container text-on-error-container px-space-xs py-0.5 rounded font-semibold"}>
                    FTC REGULATORY ORDER
                  </span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Hardware Identifiers</span>
    </div>
    <h3 className={"font-headline-sm text-headline-sm text-on-surface mb-space-xs"}>
                  Premom Ovulation Tracker
                </h3>
    <p className={"font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md"}>
                  Repeated FTC enforcement actions uncovered background transmission of non-resettable MAC addresses, Wi-Fi router BSSIDs, and precise GPS markers to overseas advertising consortiums despite explicit user opt-outs.
                </p>
    </div>
    <div className={"bg-surface-container-low rounded-lg p-space-sm"}>
    <span className={"font-label-sm text-label-sm text-error font-medium flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-[14px]"}>warning</span>
                  Vulnerability: Hardware-level device fingerprinting
                </span>
    </div>
    </div>
    
    <div className={"bg-surface-container-lowest rounded-2xl p-space-lg shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow"}>
    <div>
    <div className={"flex items-center justify-between mb-space-md"}>
    <span className={"font-label-sm text-label-sm bg-error-container text-on-error-container px-space-xs py-0.5 rounded font-semibold"}>
                    GLOBAL DATA BROKER LEAK
                  </span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Symptom Telemetry</span>
    </div>
    <h3 className={"font-headline-sm text-headline-sm text-on-surface mb-space-xs"}>
                  Tea Period Tracking Leak
                </h3>
    <p className={"font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md"}>
                  Intimacy frequency, contraceptive notes, and pain symptom logs leaked via in-app banner ad SDK bridges. Raw demographic sets were harvested by commercial data aggregators without informed or revocable user consent.
                </p>
    </div>
    <div className={"bg-surface-container-low rounded-lg p-space-sm"}>
    <span className={"font-label-sm text-label-sm text-error font-medium flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-[14px]"}>warning</span>
                  Vulnerability: Behavioral ad profiling aggregation
                </span>
    </div>
    </div>
    </div>
    </div>
    </section>
    
    <section className={"w-full bg-surface-container-low py-space-2xl px-margin"}>
    <div className={"max-w-[1440px] mx-auto"}>
    <div className={"text-center max-w-2xl mx-auto mb-space-2xl"}>
    <span className={"font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider"}>Architectural Pipeline</span>
    <h2 className={"font-headline-lg text-headline-lg text-on-surface tracking-tight mt-space-xs"}>3-Step Protection Pipeline</h2>
    <p className={"font-body-md text-body-md text-on-surface-variant mt-space-sm"}>
              A drop-in SDK initialized with three lines of Swift or Kotlin that acts as an in-memory kernel intercepting every outbound packet before socket delivery.
            </p>
    </div>
    
    <div className={"grid grid-cols-1 lg:grid-cols-3 gap-space-lg"}>
    
    <div className={"bg-surface-container-lowest rounded-2xl p-space-xl shadow-md flex flex-col justify-between"}>
    <div>
    <div className={"flex items-center justify-between mb-space-lg"}>
    <div className={"w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center font-headline-md text-headline-md font-bold"}>
                    01
                  </div>
    <span className={"material-symbols-outlined text-primary text-[28px]"}>search_insights</span>
    </div>
    <h3 className={"font-headline-md text-headline-md text-on-surface mb-space-xs"}>Classify</h3>
    <span className={"font-label-sm text-label-sm text-primary font-semibold block mb-space-md"}>Real-Time In-Memory Inspection</span>
    <p className={"font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-lg"}>
                  SurakshaShield’s edge classifier inspects serialized memory heaps across Android and iOS runtime. It identifies menstrual tracking fields, fertility symptoms, Aadhaar/Government ID patterns, and fine GPS coordinates.
                </p>
    </div>
    <div className={"bg-surface-container-high rounded-xl p-space-md"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant block mb-space-xs"}>Active Classifiers:</span>
    <div className={"flex flex-wrap gap-1.5"}>
    <span className={"font-label-sm text-label-sm bg-surface-container-lowest text-primary px-space-xs py-0.5 rounded shadow-sm"}>Fertility/Cycle</span>
    <span className={"font-label-sm text-label-sm bg-surface-container-lowest text-primary px-space-xs py-0.5 rounded shadow-sm"}>GPS Precision</span>
    <span className={"font-label-sm text-label-sm bg-surface-container-lowest text-primary px-space-xs py-0.5 rounded shadow-sm"}>Hardware UUID</span>
    </div>
    </div>
    </div>
    
    <div className={"bg-surface-container-lowest rounded-2xl p-space-xl shadow-md flex flex-col justify-between"}>
    <div>
    <div className={"flex items-center justify-between mb-space-lg"}>
    <div className={"w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-md text-headline-md font-bold"}>
                    02
                  </div>
    <span className={"material-symbols-outlined text-secondary text-[28px]"}>tune</span>
    </div>
    <h3 className={"font-headline-md text-headline-md text-on-surface mb-space-xs"}>Block or Mask</h3>
    <span className={"font-label-sm text-label-sm text-secondary font-semibold block mb-space-md"}>DPDP Consent Matrix Enforcement</span>
    <p className={"font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-lg"}>
                  Dynamic policy engine intercepts advertising beacons (Facebook Pixel, AppsFlyer, Google Analytics) and either drops unauthorized packets or substitutes them with synthetic noise and coarse H3 spatial cells.
                </p>
    </div>
    <div className={"bg-surface-container-high rounded-xl p-space-md"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant block mb-space-xs"}>Policy Engine Outcome:</span>
    <div className={"flex flex-wrap gap-1.5"}>
    <span className={"font-label-sm text-label-sm bg-surface-container-lowest text-secondary px-space-xs py-0.5 rounded shadow-sm"}>Differential Privacy</span>
    <span className={"font-label-sm text-label-sm bg-surface-container-lowest text-secondary px-space-xs py-0.5 rounded shadow-sm"}>H3 Resolution Fuzzing</span>
    <span className={"font-label-sm text-label-sm bg-surface-container-lowest text-secondary px-space-xs py-0.5 rounded shadow-sm"}>Synthetic IDs</span>
    </div>
    </div>
    </div>
    
    <div className={"bg-surface-container-lowest rounded-2xl p-space-xl shadow-md flex flex-col justify-between"}>
    <div>
    <div className={"flex items-center justify-between mb-space-lg"}>
    <div className={"w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-md text-headline-md font-bold"}>
                    03
                  </div>
    <span className={"material-symbols-outlined text-primary text-[28px]"}>key</span>
    </div>
    <h3 className={"font-headline-md text-headline-md text-on-surface mb-space-xs"}>Encrypt and Sign</h3>
    <span className={"font-label-sm text-label-sm text-primary font-semibold block mb-space-md"}>Post-Quantum Cryptographic Envelope</span>
    <p className={"font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-lg"}>
                  Legitimate user data bound for internal backend stores is sealed inside an ML-KEM-768 quantum-safe key exchange envelope, paired with AES-256-GCM symmetric encryption and SHA-3 immutable tamper-evident audit trails.
                </p>
    </div>
    <div className={"bg-surface-container-high rounded-xl p-space-md"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant block mb-space-xs"}>Cryptographic Suite:</span>
    <div className={"flex flex-wrap gap-1.5"}>
    <span className={"font-label-sm text-label-sm bg-surface-container-lowest text-primary px-space-xs py-0.5 rounded shadow-sm"}>ML-KEM 768</span>
    <span className={"font-label-sm text-label-sm bg-surface-container-lowest text-primary px-space-xs py-0.5 rounded shadow-sm"}>AES-256-GCM</span>
    <span className={"font-label-sm text-label-sm bg-surface-container-lowest text-primary px-space-xs py-0.5 rounded shadow-sm"}>SHA-3 / ML-DSA</span>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
    
    
    
    <section className={"w-full bg-gradient-to-r from-primary to-primary-container py-space-2xl px-margin text-on-primary"}>
    <div className={"max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-space-xl"}>
    <div className={"max-w-2xl text-center lg:text-left"}>
    <div className={"inline-flex items-center gap-space-xs bg-surface-container-lowest/10 px-space-md py-space-xs rounded-full mb-space-md text-secondary-fixed font-label-sm text-label-sm"}>
    <span className={"material-symbols-outlined text-[16px]"}>verified</span>
    <span className={""}>Suraksha Verified Trust Seal</span>
    </div>
    <h2 className={"font-headline-lg text-headline-lg font-bold tracking-tight text-on-primary"}>Get certified on the SurakshaShield Verified Registry</h2>
    <p className={"font-body-md text-body-md text-on-primary/80 mt-space-sm"}>
              Display our verified seal in your app store listings and user settings to prove quantum-safe, DPDP Act 2023 compliant data stewardship to your users.
            </p>
    </div>
    <div className={"flex flex-col sm:flex-row items-center gap-space-md shrink-0"}>
    <a className={"inline-flex items-center gap-space-sm bg-surface-container-lowest hover:bg-surface-container-low text-primary font-label-md text-label-md px-space-xl py-space-md rounded-lg shadow-lg transition-all duration-200"} href={"/registry"}>
    <span className={"material-symbols-outlined text-[18px]"}>verified_user</span>
    <span className={""}>View Verified Registry</span>
    </a>
    <a className={"inline-flex items-center gap-space-sm bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-on-primary font-label-md text-label-md px-space-lg py-space-md rounded-lg transition-all duration-200"} href={"/console"}>
    <span className={""}>Request App Audit</span>
    <span className={"material-symbols-outlined text-[18px]"}>arrow_forward</span>
    </a>
    </div>
    </div>
    </section>
    </div></main>
      <Footer variant="app" />
    </>
  );
}
