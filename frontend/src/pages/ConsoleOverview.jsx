import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConsoleSidebarNav from '../components/ConsoleSidebarNav';

export default function ConsoleOverview() {
  const [copied, setCopied] = useState(false);
  const copyCode = async () => {
    const code = `import { SurakshaShield } from '@suraksha-shield/core';\n\n// Initialize edge runtime with DPDP women's health preset\nawait SurakshaShield.init({\n  apiKey: 'sk_live_suraksha_9f7a8b92c4e1...',\n  policy: 'dpdp-women-health'\n});`;
    try { await navigator.clipboard.writeText(code); setCopied(true); window.setTimeout(() => setCopied(false), 2000); } catch { setCopied(false); }
  };
  return (
    <>
      <Header active="console_overview" />
    <main className={"w-full pt-20 bg-background min-h-screen"}><div className={"max-w-[1440px] mx-auto px-margin py-space-lg"}><div className={"flex flex-col w-full"}>
    <div className={"flex flex-col lg:flex-row gap-space-lg w-full"}>
    
    <aside className={"w-full lg:w-64 flex-shrink-0 flex flex-col gap-space-lg"}>
    <div className={"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-space-md"}>
    <div className={"flex items-center justify-between px-space-xs"}>
    <div className={"flex flex-col"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant font-semibold tracking-wider uppercase"}>Console</span>
    <span className={"font-headline-sm text-headline-sm text-on-surface"}>Developer</span>
    </div>
    <span className={"px-space-xs py-0.5 rounded-full bg-secondary-fixed/50 text-on-secondary-container font-label-sm text-label-sm font-semibold"}>
                v2.4 Active
              </span>
    </div>
    
    <ConsoleSidebarNav active="overview" />
    </div>
    
    <div className={"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-space-sm"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"}></span>
    <span className={"font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider"}>Gateway Operational</span>
    </div>
    <p className={"font-body-sm text-body-sm text-on-surface-variant"}>
              Node: <span className={"font-medium text-on-surface"}>US-East Edge 04</span><br/>
              Crypto: <span className={"font-medium text-on-surface"}>ML-KEM-768 Enforced</span><br/>
              Cluster Uptime: <span className={"font-medium text-secondary"}>99.99%</span>
    </p>
    <div className={"w-full bg-surface-container rounded-full h-1.5 overflow-hidden mt-space-xs"}>
    <div className={"bg-secondary h-full rounded-full"} style={{"width": "99.99%"}}></div>
    </div>
    </div>
    </aside>
    
    <section className={"flex-1 min-w-0 flex flex-col gap-space-xl"}>
    
    <div className={"flex flex-col sm:flex-row sm:items-center justify-between gap-space-md"}>
    <div className={"flex flex-col"}>
    <h1 className={"font-headline-lg text-headline-lg text-on-surface tracking-tight"}>Console Overview</h1>
    <p className={"font-body-md text-body-md text-on-surface-variant mt-0.5"}>
                Real-time threat monitoring, cryptographic telemetry, and DPDP Act 2023 compliance matrix.
              </p>
    </div>
    <div className={"flex items-center gap-space-sm flex-wrap sm:flex-nowrap"}>
    <div className={"relative inline-flex items-center bg-surface-container-lowest rounded-xl shadow-sm px-space-md py-space-sm text-on-surface"}>
    <span className={"material-symbols-outlined text-primary text-[18px] mr-space-xs"}>schedule</span>
    <select className={"bg-transparent font-body-md text-body-md font-medium text-on-surface focus:outline-none cursor-pointer pr-space-xs"}>
    <option value={"24h"}>Last 24 Hours</option>
    <option value={"live"}>Live Stream (1s)</option>
    <option value={"7d"}>Last 7 Days</option>
    </select>
    </div>
    <button className={"inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-xl bg-primary-container hover:bg-primary text-on-primary font-body-md text-body-md font-medium shadow-sm transition-all"} type={"button"}>
    <span className={"material-symbols-outlined text-[18px]"}>download</span>
    <span>Export Audit Log</span>
    </button>
    </div>
    </div>
    
    <div className={"grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md"}>
    
    <div className={"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between gap-space-md group hover:shadow-md transition-shadow"}>
    <div className={"flex items-center justify-between"}>
    <span className={"font-body-md text-body-md font-medium text-on-surface-variant"}>Events Today</span>
    <span className={"px-space-xs py-0.5 rounded-full bg-secondary-fixed/40 text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-0.5"}>
    <span className={"material-symbols-outlined text-[14px]"}>trending_up</span> +12.4%
                </span>
    </div>
    <div>
    <div className={"font-headline-xl text-headline-xl font-bold text-on-surface tracking-tight leading-none"}>48,210</div>
    <div className={"font-body-sm text-body-sm text-on-surface-variant mt-space-xs"}>Outbound SDK calls monitored</div>
    </div>
    </div>
    
    <div className={"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between gap-space-md group hover:shadow-md transition-shadow"}>
    <div className={"flex items-center justify-between"}>
    <span className={"font-body-md text-body-md font-medium text-on-surface-variant"}>Leaks Blocked</span>
    <span className={"px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold flex items-center gap-0.5"}>
    <span className={"material-symbols-outlined text-[14px]"}>shield</span> Critical Protection
                </span>
    </div>
    <div>
    <div className={"font-headline-xl text-headline-xl font-bold text-error tracking-tight leading-none"}>5,981</div>
    <div className={"font-body-sm text-body-sm text-on-surface-variant mt-space-xs"}>Ad brokers &amp; trackers intercepted</div>
    </div>
    </div>
    
    <div className={"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between gap-space-md group hover:shadow-md transition-shadow"}>
    <div className={"flex items-center justify-between"}>
    <span className={"font-body-md text-body-md font-medium text-on-surface-variant"}>Data Masked</span>
    <span className={"px-space-xs py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-0.5"}>
    <span className={"material-symbols-outlined text-[14px]"}>visibility_off</span> H3 Geo &amp; Rotated IDs
                </span>
    </div>
    <div>
    <div className={"font-headline-xl text-headline-xl font-bold text-tertiary-container tracking-tight leading-none"}>411</div>
    <div className={"font-body-sm text-body-sm text-on-surface-variant mt-space-xs"}>Fuzzed coordinates &amp; phone tokens</div>
    </div>
    </div>
    
    <div className={"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between gap-space-md group hover:shadow-md transition-shadow"}>
    <div className={"flex items-center justify-between"}>
    <span className={"font-body-md text-body-md font-medium text-on-surface-variant"}>Threat Alerts</span>
    <span className={"px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold flex items-center gap-0.5"}>
    <span className={"material-symbols-outlined text-[14px]"}>priority_high</span> Requires Review
                </span>
    </div>
    <div>
    <div className={"font-headline-xl text-headline-xl font-bold text-primary tracking-tight leading-none"}>3</div>
    <div className={"font-body-sm text-body-sm text-on-surface-variant mt-space-xs"}>Active anomalous runtime patterns</div>
    </div>
    </div>
    </div>
    
    <div className={"grid grid-cols-1 lg:grid-cols-12 gap-space-md"}>
    
    <div className={"lg:col-span-8 bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between gap-space-md"}>
    <div className={"flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs"}>
    <div>
    <h2 className={"font-title-md text-title-md font-semibold text-on-surface"}>Events Over 24 Hours</h2>
    <p className={"font-body-sm text-body-sm text-on-surface-variant"}>Hourly distribution of classified vs. blocked packets</p>
    </div>
    <div className={"flex items-center gap-space-sm text-label-sm font-label-sm"}>
    <span className={"flex items-center gap-1.5 text-on-surface-variant"}>
    <span className={"w-3 h-3 rounded-full bg-primary"}></span> Total Traffic
                  </span>
    <span className={"flex items-center gap-1.5 text-on-surface-variant"}>
    <span className={"w-3 h-3 rounded-full bg-secondary"}></span> Protected
                  </span>
    <span className={"flex items-center gap-1.5 text-on-surface-variant"}>
    <span className={"w-3 h-3 rounded-full bg-error"}></span> Intercepted
                  </span>
    </div>
    </div>
    
    <div className={"w-full h-56 relative pt-2"}>
    <svg className={"w-full h-full overflow-visible"} preserveAspectRatio={"none"} viewBox={"0 0 700 180"}>
    <defs>
    <linearGradient id={"grad-total"} x1={"0"} x2={"0"} y1={"0"} y2={"1"}>
    <stop offset={"0%"} stopColor={"#4338ca"} stopOpacity={"0.25"}></stop>
    <stop offset={"100%"} stopColor={"#4338ca"} stopOpacity={"0.0"}></stop>
    </linearGradient>
    <linearGradient id={"grad-blocked"} x1={"0"} x2={"0"} y1={"0"} y2={"1"}>
    <stop offset={"0%"} stopColor={"#ba1a1a"} stopOpacity={"0.3"}></stop>
    <stop offset={"100%"} stopColor={"#ba1a1a"} stopOpacity={"0.0"}></stop>
    </linearGradient>
    </defs>
    
    <line stroke={"#eff4ff"} strokeWidth={"1.5"} x1={"0"} x2={"700"} y1={"40"} y2={"40"}></line>
    <line stroke={"#eff4ff"} strokeWidth={"1.5"} x1={"0"} x2={"700"} y1={"90"} y2={"90"}></line>
    <line stroke={"#eff4ff"} strokeWidth={"1.5"} x1={"0"} x2={"700"} y1={"140"} y2={"140"}></line>
    
    <path d={"M0,130 C60,110 110,60 175,70 C240,80 300,30 380,45 C460,60 520,20 600,35 C650,45 680,25 700,30 L700,170 L0,170 Z"} fill={"url(#grad-total)"}></path>
    
    <path d={"M0,130 C60,110 110,60 175,70 C240,80 300,30 380,45 C460,60 520,20 600,35 C650,45 680,25 700,30"} fill={"none"} stroke={"#4338ca"} strokeWidth={"2.5"}></path>
    
    <path d={"M0,165 C60,160 110,145 175,150 C240,155 300,130 380,138 C460,145 520,120 600,130 C650,138 680,125 700,128 L700,170 L0,170 Z"} fill={"url(#grad-blocked)"}></path>
    
    <path d={"M0,165 C60,160 110,145 175,150 C240,155 300,130 380,138 C460,145 520,120 600,130 C650,138 680,125 700,128"} fill={"none"} stroke={"#ba1a1a"} strokeDasharray={"4 3"} strokeWidth={"2"}></path>
    
    <circle cx={"380"} cy={"45"} fill={"#4338ca"} r={"4.5"} stroke={"#ffffff"} strokeWidth={"2"}></circle>
    <circle cx={"380"} cy={"138"} fill={"#ba1a1a"} r={"4"} stroke={"#ffffff"} strokeWidth={"1.5"}></circle>
    </svg>
    </div>
    
    <div className={"flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm pt-space-xs"}>
    <span>00:00</span>
    <span>04:00</span>
    <span>08:00</span>
    <span>12:00</span>
    <span>16:00</span>
    <span>20:00</span>
    <span>23:00</span>
    </div>
    </div>
    
    <div className={"lg:col-span-4 bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between gap-space-md"}>
    <div>
    <h2 className={"font-title-md text-title-md font-semibold text-on-surface"}>Data Categories</h2>
    <p className={"font-body-sm text-body-sm text-on-surface-variant"}>Classified runtime payload types</p>
    </div>
    
    <div className={"flex items-center justify-center my-auto relative"}>
    <svg className={"w-36 h-36 -rotate-90"} viewBox={"0 0 100 100"}>
    <circle cx={"50"} cy={"50"} fill={"transparent"} r={"38"} stroke={"#eff4ff"} strokeWidth={"12"}></circle>
    
    <circle cx={"50"} cy={"50"} fill={"transparent"} r={"38"} stroke={"#4338ca"} strokeDasharray={"90.7 238.7"} strokeDashoffset={"0"} strokeWidth={"12"}></circle>
    
    <circle cx={"50"} cy={"50"} fill={"transparent"} r={"38"} stroke={"#006b5f"} strokeDasharray={"62.1 238.7"} strokeDashoffset={"-90.7"} strokeWidth={"12"}></circle>
    
    <circle cx={"50"} cy={"50"} fill={"transparent"} r={"38"} stroke={"#0047be"} strokeDasharray={"43.0 238.7"} strokeDashoffset={"-152.8"} strokeWidth={"12"}></circle>
    
    <circle cx={"50"} cy={"50"} fill={"transparent"} r={"38"} stroke={"#71f8e4"} strokeDasharray={"28.6 238.7"} strokeDashoffset={"-195.8"} strokeWidth={"12"}></circle>
    
    <circle cx={"50"} cy={"50"} fill={"transparent"} r={"38"} stroke={"#777586"} strokeDasharray={"14.3 238.7"} strokeDashoffset={"-224.4"} strokeWidth={"12"}></circle>
    </svg>
    <div className={"absolute inset-0 flex flex-col items-center justify-center pointer-events-none"}>
    <span className={"font-headline-md text-headline-md font-bold text-on-surface"}>100%</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Shielded</span>
    </div>
    </div>
    
    <div className={"flex flex-col gap-1.5 font-body-sm text-body-sm text-on-surface-variant"}>
    <div className={"flex items-center justify-between"}>
    <span className={"flex items-center gap-2"}><span className={"w-2.5 h-2.5 rounded-full bg-primary"}></span>Reproductive Health</span>
    <span className={"font-semibold text-on-surface"}>38%</span>
    </div>
    <div className={"flex items-center justify-between"}>
    <span className={"flex items-center gap-2"}><span className={"w-2.5 h-2.5 rounded-full bg-secondary"}></span>Location &amp; GPS</span>
    <span className={"font-semibold text-on-surface"}>26%</span>
    </div>
    <div className={"flex items-center justify-between"}>
    <span className={"flex items-center gap-2"}><span className={"w-2.5 h-2.5 rounded-full bg-tertiary-container"}></span>Identity &amp; Aadhaar</span>
    <span className={"font-semibold text-on-surface"}>18%</span>
    </div>
    <div className={"flex items-center justify-between"}>
    <span className={"flex items-center gap-2"}><span className={"w-2.5 h-2.5 rounded-full bg-secondary-fixed"}></span>Biometrics</span>
    <span className={"font-semibold text-on-surface"}>12%</span>
    </div>
    <div className={"flex items-center justify-between"}>
    <span className={"flex items-center gap-2"}><span className={"w-2.5 h-2.5 rounded-full bg-outline"}></span>Normal / Telemetry</span>
    <span className={"font-semibold text-on-surface"}>6%</span>
    </div>
    </div>
    </div>
    </div>
    
    <div className={"grid grid-cols-1 md:grid-cols-2 gap-space-md"}>
    
    <div className={"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between gap-space-md"}>
    <div className={"flex items-center justify-between"}>
    <h2 className={"font-title-md text-title-md font-semibold text-on-surface"}>Privacy Score</h2>
    <span className={"px-space-xs py-0.5 rounded-full bg-secondary-fixed/50 text-on-secondary-container font-label-sm text-label-sm font-semibold"}>
                  Excellent • DPDP Compliant
                </span>
    </div>
    <div className={"flex items-center gap-space-lg"}>
    <div className={"relative w-28 h-28 flex-shrink-0 flex items-center justify-center"}>
    <svg className={"w-full h-full -rotate-90"} viewBox={"0 0 100 100"}>
    <circle cx={"50"} cy={"50"} fill={"transparent"} r={"42"} stroke={"#e5eeff"} strokeWidth={"10"}></circle>
    <circle cx={"50"} cy={"50"} fill={"transparent"} r={"42"} stroke={"#006b5f"} strokeDasharray={"263.8"} strokeDashoffset={"21.1"} strokeLinecap={"round"} strokeWidth={"10"}></circle>
    </svg>
    <div className={"absolute inset-0 flex flex-col items-center justify-center"}>
    <span className={"font-headline-lg text-headline-lg font-bold text-on-surface"}>92</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant font-medium"}>/ 100</span>
    </div>
    </div>
    <div className={"flex flex-col gap-space-xs flex-1"}>
    <div>
    <div className={"flex justify-between text-body-sm font-body-sm text-on-surface mb-1"}>
    <span>Zero Plain-text Egress</span>
    <span className={"font-semibold text-secondary"}>100%</span>
    </div>
    <div className={"w-full bg-surface-container rounded-full h-1.5 overflow-hidden"}>
    <div className={"bg-secondary h-full rounded-full"} style={{"width": "100%"}}></div>
    </div>
    </div>
    <div>
    <div className={"flex justify-between text-body-sm font-body-sm text-on-surface mb-1"}>
    <span>Synthetic Ad ID Rotation</span>
    <span className={"font-semibold text-primary"}>94%</span>
    </div>
    <div className={"w-full bg-surface-container rounded-full h-1.5 overflow-hidden"}>
    <div className={"bg-primary h-full rounded-full"} style={{"width": "94%"}}></div>
    </div>
    </div>
    <div>
    <div className={"flex justify-between text-body-sm font-body-sm text-on-surface mb-1"}>
    <span>Local Enclave Execution</span>
    <span className={"font-semibold text-tertiary-container"}>88%</span>
    </div>
    <div className={"w-full bg-surface-container rounded-full h-1.5 overflow-hidden"}>
    <div className={"bg-tertiary-container h-full rounded-full"} style={{"width": "88%"}}></div>
    </div>
    </div>
    </div>
    </div>
    <div className={"pt-space-xs"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1"}>
    <span className={"material-symbols-outlined text-[16px] text-secondary"}>verified</span>
                  Compliant with Digital Personal Data Protection Act (DPDP), 2023 §9 for Sensitive Female Data.
                </span>
    </div>
    </div>
    
    <div className={"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between gap-space-md"}>
    <div className={"flex items-center justify-between"}>
    <h2 className={"font-title-md text-title-md font-semibold text-on-surface"}>Encryption in Use &amp; Key Health</h2>
    <span className={"px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold flex items-center gap-1"}>
    <span className={"material-symbols-outlined text-[14px]"}>lock</span> Post-Quantum Secure
                </span>
    </div>
    <div className={"bg-surface-container-low p-space-sm rounded-xl"}>
    <div className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1 font-semibold"}>Active Cipher Pipeline</div>
    <div className={"font-code-block text-code-block text-primary font-medium flex items-center gap-1 flex-wrap"}>
    <span>ECC (Curve25519)</span>
    <span className={"text-on-surface-variant"}>→</span>
    <span className={"bg-secondary-fixed/50 px-1 py-0.5 rounded text-on-secondary-container"}>ML-KEM-768</span>
    <span className={"text-on-surface-variant"}>→</span>
    <span>HKDF-SHA512</span>
    <span className={"text-on-surface-variant"}>→</span>
    <span>AES-256-GCM</span>
    </div>
    </div>
    <div className={"grid grid-cols-2 gap-space-md"}>
    <div>
    <span className={"font-label-sm text-label-sm text-on-surface-variant block font-medium"}>Ephemeral Key Rotation In</span>
    <span className={"font-headline-sm text-headline-sm font-bold text-on-surface font-label-md"}>03:12:45</span>
    <span className={"font-body-sm text-body-sm text-on-surface-variant block mt-0.5"}>Automated re-seeding active</span>
    </div>
    <div>
    <div className={"flex justify-between items-center"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant font-medium"}>E2EE Latency</span>
    <span className={"font-code-block text-code-block font-bold text-secondary"}>95 ms</span>
    </div>
    <div className={"relative w-full bg-surface-container rounded-full h-2 mt-2"}>
    <div className={"bg-secondary h-full rounded-full"} style={{"width": "95%"}}></div>
    <div className={"absolute top-[-3px] left-[100%] w-0.5 h-3.5 bg-error -translate-x-full"} title={"Target: 100ms"}></div>
    </div>
    <span className={"font-label-sm text-label-sm text-on-surface-variant mt-1 block"}>5 ms below maximum ceiling</span>
    </div>
    </div>
    </div>
    </div>
    
    <div className={"flex flex-col gap-space-md"}>
    <div className={"flex items-center justify-between"}>
    <div className={"flex items-center gap-space-sm"}>
    <h2 className={"font-headline-sm text-headline-sm font-semibold text-on-surface"}>Recent Threat Alerts</h2>
    <span className={"px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold"}>
                  4 Active Incidents
                </span>
    </div>
    <a className={"font-body-md text-body-md text-primary font-medium hover:underline flex items-center gap-1"} href={"#"}>
                View all telemetry →
              </a>
    </div>
    <div className={"flex flex-col gap-space-sm"}>
    
    <div className={"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-md"}>
    <div className={"flex items-start gap-space-md"}>
    <div className={"w-10 h-10 rounded-xl bg-error-container text-error flex items-center justify-center flex-shrink-0 mt-0.5"}>
    <span className={"material-symbols-outlined text-[22px]"}>warning</span>
    </div>
    <div className={"flex flex-col"}>
    <div className={"flex items-center gap-space-xs flex-wrap"}>
    <span className={"font-title-md text-title-md font-semibold text-on-surface"}>Abnormal bulk export attempt at 03:12 AM</span>
    <span className={"px-space-xs py-0.5 rounded-md bg-error text-on-error font-label-sm text-label-sm font-bold"}>
                        Risk 87
                      </span>
    </div>
    <p className={"font-body-md text-body-md text-on-surface-variant mt-0.5"}>
                      Source: Outbound <code className={"font-code-block text-code-block text-primary"}>com.analytics.tracker</code> SDK attempted batch sync of 4,000 encrypted period cycle entries.
                    </p>
    </div>
    </div>
    <div className={"flex items-center gap-space-xs flex-shrink-0 self-end lg:self-center"}>
    <button className={"px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-body-md text-body-md font-medium transition-colors"} type={"button"}>
                    Restrict access
                  </button>
    <button className={"px-space-md py-space-xs rounded-lg bg-primary-container hover:bg-primary text-on-primary font-body-md text-body-md font-medium transition-colors"} type={"button"}>
                    Rotate keys
                  </button>
    </div>
    </div>
    
    <div className={"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-md"}>
    <div className={"flex items-start gap-space-md"}>
    <div className={"w-10 h-10 rounded-xl bg-surface-container-highest text-tertiary-container flex items-center justify-center flex-shrink-0 mt-0.5"}>
    <span className={"material-symbols-outlined text-[22px]"}>fingerprint</span>
    </div>
    <div className={"flex flex-col"}>
    <div className={"flex items-center gap-space-xs flex-wrap"}>
    <span className={"font-title-md text-title-md font-semibold text-on-surface"}>7 failed vault unlock attempts</span>
    <span className={"px-space-xs py-0.5 rounded-md bg-tertiary-container text-on-tertiary font-label-sm text-label-sm font-bold"}>
                        Risk 74
                      </span>
    </div>
    <p className={"font-body-md text-body-md text-on-surface-variant mt-0.5"}>
                      Source: Client Biometric Enclave <code className={"font-code-block text-code-block text-primary"}>#VAULT-4902</code> triggered exponential backoff lock.
                    </p>
    </div>
    </div>
    <div className={"flex items-center gap-space-xs flex-shrink-0 self-end lg:self-center"}>
    <button className={"px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-body-md text-body-md font-medium transition-colors"} type={"button"}>
                    Restrict access
                  </button>
    <button className={"px-space-md py-space-xs rounded-lg bg-primary-container hover:bg-primary text-on-primary font-body-md text-body-md font-medium transition-colors"} type={"button"}>
                    Rotate keys
                  </button>
    </div>
    </div>
    
    <div className={"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-md"}>
    <div className={"flex items-start gap-space-md"}>
    <div className={"w-10 h-10 rounded-xl bg-error text-on-error flex items-center justify-center flex-shrink-0 mt-0.5"}>
    <span className={"material-symbols-outlined text-[22px]"}>crisis_alert</span>
    </div>
    <div className={"flex flex-col"}>
    <div className={"flex items-center gap-space-xs flex-wrap"}>
    <span className={"font-title-md text-title-md font-semibold text-on-surface"}>Duress PIN used silently</span>
    <span className={"px-space-xs py-0.5 rounded-md bg-error text-on-error font-label-sm text-label-sm font-bold"}>
                        Risk 91 • Critical
                      </span>
    </div>
    <p className={"font-body-md text-body-md text-on-surface-variant mt-0.5"}>
                      Source: Emergency Coercion Protocol triggered on <code className={"font-code-block text-code-block text-primary"}>Node-768</code>. Decoy logs served; silent panic beacon transmitted to security operations.
                    </p>
    </div>
    </div>
    <div className={"flex items-center gap-space-xs flex-shrink-0 self-end lg:self-center"}>
    <button className={"px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-body-md text-body-md font-medium transition-colors"} type={"button"}>
                    Restrict access
                  </button>
    <button className={"px-space-md py-space-xs rounded-lg bg-primary-container hover:bg-primary text-on-primary font-body-md text-body-md font-medium transition-colors"} type={"button"}>
                    Rotate keys
                  </button>
    </div>
    </div>
    
    <div className={"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-md"}>
    <div className={"flex items-start gap-space-md"}>
    <div className={"w-10 h-10 rounded-xl bg-surface-container-highest text-on-surface flex items-center justify-center flex-shrink-0 mt-0.5"}>
    <span className={"material-symbols-outlined text-[22px]"}>radar</span>
    </div>
    <div className={"flex flex-col"}>
    <div className={"flex items-center gap-space-xs flex-wrap"}>
    <span className={"font-title-md text-title-md font-semibold text-on-surface"}>Unknown new SDK destination detected</span>
    <span className={"px-space-xs py-0.5 rounded-md bg-outline-variant text-on-surface font-label-sm text-label-sm font-bold"}>
                        Risk 68
                      </span>
    </div>
    <p className={"font-body-md text-body-md text-on-surface-variant mt-0.5"}>
                      Source: Unregistered socket connection to external endpoint <code className={"font-code-block text-code-block text-primary"}>track.ad-telemetry.io</code> blocked at sandbox level.
                    </p>
    </div>
    </div>
    <div className={"flex items-center gap-space-xs flex-shrink-0 self-end lg:self-center"}>
    <button className={"px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-body-md text-body-md font-medium transition-colors"} type={"button"}>
                    Restrict access
                  </button>
    <button className={"px-space-md py-space-xs rounded-lg bg-primary-container hover:bg-primary text-on-primary font-body-md text-body-md font-medium transition-colors"} type={"button"}>
                    Rotate keys
                  </button>
    </div>
    </div>
    </div>
    </div>
    
    <div className={"bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-space-md"}>
    <div className={"flex items-center justify-between"}>
    <div className={"flex items-center gap-space-sm"}>
    <span className={"material-symbols-outlined text-primary text-[24px]"}>terminal</span>
    <div>
    <h2 className={"font-title-md text-title-md font-semibold text-on-surface"}>Quick SDK Setup</h2>
    <p className={"font-body-sm text-body-sm text-on-surface-variant"}>Zero-knowledge envelope injection in 3 lines</p>
    </div>
    </div>
    <span className={"px-space-xs py-0.5 rounded-full bg-secondary-fixed/50 text-on-secondary-container font-label-sm text-label-sm font-semibold"}>
                Integration time: ~10 minutes
              </span>
    </div>
    <div className={"relative bg-on-surface rounded-xl p-space-md overflow-hidden"}>
    <div className={"flex justify-between items-center pb-2 mb-2 border-b border-white/10"}>
    <span className={"font-label-sm text-label-sm text-primary-fixed-dim"}>typescript • client-edge</span>
    <button onClick={copyCode} className={"inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-label-sm text-label-sm transition-all"} id={"copy-btn"} type={"button"}>
    <span className={"material-symbols-outlined text-[14px]"}>content_copy</span>
    <span id={"copy-label"}>{copied ? 'Copied!' : 'Copy Code'}</span>
    </button>
    </div>
    <pre className={"font-code-block text-code-block text-white/90 overflow-x-auto"} id={"code-snippet"}><code><span className={"text-secondary-fixed"}>import</span> {'{'} SurakshaShield {'}'} <span className={"text-secondary-fixed"}>from</span> <span className={"text-primary-fixed-dim"}>'@suraksha-shield/core'</span>;
    
    <span className={"text-outline-variant"}>// Initialize edge runtime with DPDP women's health preset</span>
    <span className={"text-secondary-fixed"}>await</span> SurakshaShield.<span className={"text-primary-fixed"}>init</span>({'{'}
      apiKey: <span className={"text-primary-fixed-dim"}>'sk_live_suraksha_9f7a8b92c4e1...'</span>,
      policy: <span className={"text-primary-fixed-dim"}>'dpdp-women-health'</span>
    {'}'});</code></pre>
    </div>
    </div>
    </section>
    </div>
    </div>
    </div></main>
      <Footer variant="console" />
    </>
  );
}
