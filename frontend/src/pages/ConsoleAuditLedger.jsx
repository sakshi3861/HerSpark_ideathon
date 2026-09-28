import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConsoleSidebarNav from '../components/ConsoleSidebarNav';

export default function ConsoleAuditLedger() {
  const [isTampered, setIsTampered] = useState(true);
  const [isolated, setIsolated] = useState(false);
  const [exporting, setExporting] = useState(false);
  const exportReport = () => { setExporting(true); window.setTimeout(() => setExporting(false), 800); };
  return (
    <>
      <Header active="console_audit_ledger" />
    <main className={"w-full pt-20 bg-background min-h-screen"}><div className={"flex flex-col w-full"}>
    <div className={"max-w-[1440px] w-full mx-auto px-margin py-space-xl"}>
    
    <div className={"grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start"}>
    
    <aside className={"lg:col-span-3 flex flex-col gap-space-lg sticky top-28"}>
    
    <div className={"bg-surface-container-lowest rounded-xl p-space-md shadow-sm"}>
    <div className={"px-space-sm pb-space-sm mb-space-xs"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider"}>Console Workspace</span>
    </div>
    <ConsoleSidebarNav active="audit" variant="audit" />
    </div>
    
    <div className={"bg-surface-container-lowest rounded-xl p-space-lg shadow-sm"}>
    <div className={"flex items-center justify-between pb-space-sm mb-space-sm bg-surface-container-low p-space-sm rounded-lg"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"}></span>
    <span className={"font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider"}>GATEWAY OPERATIONAL</span>
    </div>
    <span className={"material-symbols-outlined text-secondary text-[18px]"}>verified</span>
    </div>
    <div className={"space-y-space-sm"}>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant"}>Cluster Node</span>
    <span className={"font-label-sm text-label-sm font-medium text-on-surface"}>US-East Edge 04</span>
    </div>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant"}>Attestation</span>
    <span className={"font-label-sm text-label-sm font-medium text-tertiary"}>ML-KEM-768 Enforced</span>
    </div>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant"}>Uptime</span>
    <span className={"font-label-sm text-label-sm font-medium text-on-surface"}>99.992% SLA</span>
    </div>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant"}>Compliance Mode</span>
    <span className={"px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm"}>DPDP-Strict</span>
    </div>
    </div>
    <div className={"mt-space-md pt-space-md bg-surface-container-low rounded-lg p-space-sm"}>
    <div className={"flex items-center justify-between mb-1"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Consensus Heartbeat</span>
    <span className={"font-label-sm text-label-sm text-secondary font-medium"}>Synced (14ms)</span>
    </div>
    <div className={"w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden"}>
    <div className={"h-full bg-secondary w-full"}></div>
    </div>
    </div>
    </div>
    
    <div className={"bg-surface-container-lowest rounded-xl p-space-lg shadow-sm"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-space-sm"}>Audit Verification Metrics</span>
    <div className={"grid grid-cols-2 gap-space-sm"}>
    <div className={"p-space-sm bg-surface-container-low rounded-lg"}>
    <span className={"block font-label-sm text-label-sm text-on-surface-variant"}>Blocks Synced</span>
    <span className={"font-headline-sm text-headline-sm text-primary font-bold"}>104,917</span>
    </div>
    <div className={"p-space-sm bg-surface-container-low rounded-lg"}>
    <span className={"block font-label-sm text-label-sm text-on-surface-variant"}>Merkle Root</span>
    <span className={"font-label-sm text-label-sm text-tertiary font-mono truncate block"} title={"0x4d8a11bc901"}>0x4d8a...901</span>
    </div>
    </div>
    </div>
    </aside>
    
    <section className={"lg:col-span-9 flex flex-col gap-space-lg"}>
    
    <div className={"bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col gap-space-md"}>
    <div className={"flex flex-col md:flex-row md:items-center justify-between gap-space-md"}>
    <div>
    <div className={"flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant mb-space-xs tracking-wider"}>
    <span>CONSOLE</span>
    <span>/</span>
    <span className={"text-primary font-semibold"}>CRYPTOGRAPHIC AUDIT</span>
    </div>
    <h1 className={"font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight"}>Tamper-Evident Audit Ledger</h1>
    </div>
    
    <div className={"flex flex-wrap items-center gap-space-sm"}>
    
    <button onClick={() => setIsTampered(false)} className={"inline-flex items-center gap-space-xs px-space-md py-space-sm bg-primary-container hover:bg-primary text-on-primary font-body-md text-body-md font-medium rounded-lg transition-colors shadow-sm"} id={"btn-verify"} type={"button"}>
    <span className={"material-symbols-outlined text-[18px]"}>verified_user</span>
    <span>Verify Integrity</span>
    </button>
    
    <button onClick={() => setIsTampered(value => !value)} className={"inline-flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-high hover:bg-surface-variant text-on-surface font-body-md text-body-md font-medium rounded-lg transition-colors shadow-sm"} id={"btn-simulate"} type={"button"}>
    <span className={"material-symbols-outlined text-error text-[18px]"}>gpp_maybe</span>
    <span id={"simulate-label"}>{isTampered ? 'Active Breach Simulation' : 'Simulate Tampering'}</span>
    </button>
    
    <button onClick={exportReport} className={"inline-flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-body-md text-body-md font-medium rounded-lg transition-colors"} id={"btn-export"} type={"button"}>
    <span className={`material-symbols-outlined text-[18px] ${exporting ? 'animate-spin' : ''}`}>{exporting ? 'sync' : 'download'}</span>
    <span>{exporting ? 'Exporting...' : 'Export Report'}</span>
    </button>
    </div>
    </div>
    <p className={"font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-4xl"}>
                Cryptographically verified, immutable SHA-3 hash chain of all outbound interception events, duress alerts, and policy enforcements signed with ML-DSA post-quantum primitives.
              </p>
    
    <div className={"flex flex-wrap items-center justify-between gap-space-md pt-space-md bg-surface-container-low p-space-md rounded-xl"}>
    <div className={"flex items-center gap-space-sm"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant font-medium"}>Chain State Preview:</span>
    <div className={"inline-flex p-1 bg-surface-container-highest rounded-lg gap-1"}>
    <button onClick={() => setIsTampered(true)} className={`px-space-md py-1 rounded font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1.5 ${isTampered ? 'bg-error text-on-error shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`} id={"toggle-tampered"} type={"button"}>
    <span className={"material-symbols-outlined text-[15px]"}>warning</span>
    <span>Tampered Chain (Simulated Breach)</span>
    </button>
    <button onClick={() => setIsTampered(false)} className={`px-space-md py-1 rounded font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1.5 ${isTampered ? 'text-on-surface-variant hover:text-on-surface' : 'bg-secondary text-on-secondary shadow-sm'}`} id={"toggle-valid"} type={"button"}>
    <span className={"material-symbols-outlined text-[15px]"}>check_circle</span>
    <span>Valid Chain (All Verified)</span>
    </button>
    </div>
    </div>
    
    <div className={"flex items-center gap-space-lg text-body-sm font-body-sm"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"text-on-surface-variant"}>Ledger Health:</span>
    <span className={`font-semibold px-2 py-0.5 rounded ${isTampered ? 'text-error bg-error-container/40' : 'text-secondary bg-secondary-fixed/40'}`} id={"metric-health"}>{isTampered ? 'COMPROMISED' : 'CANONICAL VALID'}</span>
    </div>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"text-on-surface-variant"}>Verified Depth:</span>
    <span className={"font-label-sm text-label-sm font-bold text-on-surface"} id={"metric-verified"}>{isTampered ? '2 / 6 Blocks' : '6 / 6 Blocks'}</span>
    </div>
    </div>
    </div>
    </div>
    
    <div className={`bg-error-container text-on-error-container p-space-lg rounded-2xl shadow-md transition-all ${isTampered ? '' : 'hidden'}`} id={"tamper-alert-banner"}>
    <div className={"flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md"}>
    <div className={"flex items-start gap-space-md"}>
    <div className={"w-10 h-10 rounded-full bg-error text-on-error flex items-center justify-center flex-shrink-0 mt-0.5"}>
    <span className={"material-symbols-outlined text-[24px]"}>crisis_alert</span>
    </div>
    <div>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"font-label-sm text-label-sm uppercase tracking-wider font-bold bg-error text-on-error px-2 py-0.5 rounded"}>CRITICAL SECURITY BREACH</span>
    <span className={"font-label-sm text-label-sm font-mono text-on-error-container"}>EVENT_ID #SS-99201</span>
    </div>
    <h2 className={"font-headline-sm text-headline-sm font-bold text-on-error-container mt-1"}>
                      CRITICAL TAMPERING DETECTED: Stored hash does not match calculated merkle lineage at Block #104,914.
                    </h2>
    <p className={"font-body-md text-body-md text-on-error-container mt-1 opacity-90"}>
                      Zero-knowledge verification failure • Egress socket locked • Lineage severed for 4 subsequent blocks • Incident dispatched to SOC.
                    </p>
    </div>
    </div>
    
    <div className={"flex items-center gap-space-xs flex-shrink-0 self-end md:self-center"}>
    <button onClick={() => setIsolated(true)} className={`px-space-md py-space-sm bg-error text-on-error rounded-lg font-body-md text-body-md font-semibold hover:opacity-90 transition-opacity ${isolated ? 'opacity-70' : ''}`} id={"btn-isolate"} type={"button"}>
                    {isolated ? 'Node Isolated' : 'Isolate Node'}
                  </button>
    <button onClick={() => { setIsTampered(false); setIsolated(false); }} className={"px-space-md py-space-sm bg-surface-container-lowest text-on-error-container rounded-lg font-body-md text-body-md font-semibold hover:bg-surface-container-high transition-colors"} id={"btn-restore"} type={"button"}>
                    Restore Canonical Chain
                  </button>
    </div>
    </div>
    </div>
    
    <div className={"relative flex flex-col gap-space-lg"}>
    
    <div className={"relative bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md transition-shadow"}>
    <div className={"flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm mb-space-sm bg-surface-container-low p-space-sm rounded-xl"}>
    <div className={"flex items-center gap-space-sm"}>
    <span className={"px-space-sm py-1 rounded-md bg-primary text-on-primary font-label-md text-label-md font-semibold"}>BLOCK #104,912</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>14:25:31 UTC (3m ago)</span>
    <span className={"text-outline-variant"}>•</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Height 104,912</span>
    </div>
    <div className={"inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-secondary-fixed/40 text-secondary font-label-sm text-label-sm font-semibold"}>
    <span className={"material-symbols-outlined text-[16px]"}>check_circle</span>
    <span>VALID SIGNATURE</span>
    </div>
    </div>
    <div className={"grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center"}>
    <div className={"lg:col-span-5"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1"}>Payload Event Action</span>
    <p className={"font-body-md text-body-md text-on-surface font-medium"}>
                      Duress PIN silent trigger: Decoy logs served &amp; emergency beacon sent
                    </p>
    <div className={"flex items-center gap-space-xs mt-space-xs"}>
    <span className={"px-2 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm"}>Policy: Zero-Trace Beacon</span>
    <span className={"px-2 py-0.5 rounded bg-surface-container text-tertiary font-label-sm text-label-sm"}>Priority: Emergency</span>
    </div>
    </div>
    <div className={"lg:col-span-7 bg-surface-container-low p-space-md rounded-xl space-y-2"}>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant font-label-sm text-label-sm"}>SHA-3 Hash:</span>
    <span className={"font-label-sm text-label-sm font-mono text-secondary font-medium"}>0x9911e3b5a41fd2890b07e8a93ef07a1102e3c7e2</span>
    </div>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant font-label-sm text-label-sm"}>Previous Hash:</span>
    <span className={"font-label-sm text-label-sm font-mono text-on-surface-variant"}>0x82f10ca9144bb21aef7018cbb421098a881944a1</span>
    </div>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant font-label-sm text-label-sm"}>ML-DSA Signature:</span>
    <span className={"font-label-sm text-label-sm font-mono text-tertiary"}>sig_mldsa_87af92b0c1...492ef33b</span>
    </div>
    </div>
    </div>
    </div>
    
    <div className={"flex justify-center -my-space-sm z-10"}>
    <div className={"flex items-center gap-2 px-space-md py-1 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm font-medium shadow-sm"}>
    <span className={"material-symbols-outlined text-[16px]"}>south</span>
    <span>SHA-3 Lineage Verified (0x9911e3b...)</span>
    </div>
    </div>
    
    <div className={"relative bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md transition-shadow"}>
    <div className={"flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm mb-space-sm bg-surface-container-low p-space-sm rounded-xl"}>
    <div className={"flex items-center gap-space-sm"}>
    <span className={"px-space-sm py-1 rounded-md bg-primary text-on-primary font-label-md text-label-md font-semibold"}>BLOCK #104,913</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>14:26:40 UTC (2m ago)</span>
    <span className={"text-outline-variant"}>•</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Height 104,913</span>
    </div>
    <div className={"inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-secondary-fixed/40 text-secondary font-label-sm text-label-sm font-semibold"}>
    <span className={"material-symbols-outlined text-[16px]"}>check_circle</span>
    <span>VALID SIGNATURE</span>
    </div>
    </div>
    <div className={"grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center"}>
    <div className={"lg:col-span-5"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1"}>Payload Event Action</span>
    <p className={"font-body-md text-body-md text-on-surface font-medium"}>
                      Encrypted sync: Reproductive biomarker vault to Own Server (ML-KEM-768)
                    </p>
    <div className={"flex items-center gap-space-xs mt-space-xs"}>
    <span className={"px-2 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm"}>Enclave: Kyber768 Encapsulated</span>
    <span className={"px-2 py-0.5 rounded bg-surface-container text-secondary font-label-sm text-label-sm"}>Egress Authorized</span>
    </div>
    </div>
    <div className={"lg:col-span-7 bg-surface-container-low p-space-md rounded-xl space-y-2"}>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant font-label-sm text-label-sm"}>SHA-3 Hash:</span>
    <span className={"font-label-sm text-label-sm font-mono text-secondary font-medium"}>0x89ab12f04ce8e721a9954d6a89c02ff3990099ea</span>
    </div>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant font-label-sm text-label-sm"}>Previous Hash:</span>
    <span className={"font-label-sm text-label-sm font-mono text-secondary font-semibold"}>0x9911e3b5a41fd2890b07e8a93ef07a1102e3c7e2</span>
    </div>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant font-label-sm text-label-sm"}>ML-DSA Signature:</span>
    <span className={"font-label-sm text-label-sm font-mono text-tertiary"}>sig_mldsa_11c40b8a21...bb892e</span>
    </div>
    </div>
    </div>
    </div>
    
    <div className={"flex justify-center -my-space-sm z-10"}>
    <div className={`flex items-center gap-2 px-space-md py-1 rounded-full font-label-sm text-label-sm shadow-sm ${isTampered ? 'bg-error-container text-on-error-container font-bold' : 'bg-surface-container text-secondary font-medium'}`} id={"connector-line-2-3"}>
    <span className={`material-symbols-outlined text-[16px] ${isTampered ? 'text-error' : ''}`}>{isTampered ? 'close' : 'south'}</span>
    <span id={"connector-text-2-3"}>{isTampered ? 'HASH LINEAGE SEVERED HERE' : 'SHA-3 Lineage Verified (0x89ab12f...)'}</span>
    </div>
    </div>
    
    <div className={`relative rounded-2xl p-space-lg transition-all ${isTampered ? 'bg-error-container/30 shadow-md' : 'bg-surface-container-lowest shadow-sm'}`} id={"block-3-card"}>
    
    <div className={"flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm mb-space-sm bg-surface-container-lowest p-space-sm rounded-xl"}>
    <div className={"flex items-center gap-space-sm"}>
    <span className={"px-space-sm py-1 rounded-md bg-error text-on-error font-label-md text-label-md font-semibold"} id={"block-3-badge"}>BLOCK #104,914</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>14:27:14 UTC (1m ago)</span>
    <span className={"text-outline-variant"}>•</span>
    <span className={"font-label-sm text-label-sm text-error font-semibold"}>Tampering Point</span>
    </div>
    <div className={`inline-flex items-center gap-1.5 px-space-md py-1 rounded-full font-label-sm text-label-sm font-semibold ${isTampered ? 'bg-error text-on-error' : 'bg-secondary-fixed/40 text-secondary'}`} id={"block-3-status"}>
    <span className={"material-symbols-outlined text-[16px]"}>{isTampered ? 'error' : 'check_circle'}</span>
    <span>{isTampered ? 'HASH MISMATCH DETECTED' : 'VALID SIGNATURE'}</span>
    </div>
    </div>
    
    <div className={"space-y-space-md"}>
    <div className={"flex flex-col md:flex-row md:items-center justify-between gap-space-sm"}>
    <div>
    <span className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1"}>Payload Event Action</span>
    <p className={"font-body-md text-body-md text-on-surface font-semibold"}>
                        Sensitive event blocked: LogFertility to Facebook Graph API
                      </p>
    </div>
    <div className={"flex items-center gap-space-xs"}>
    <span className={`px-space-sm py-1 rounded font-label-sm text-label-sm font-bold flex items-center gap-1 ${isTampered ? 'bg-error-container text-on-error-container' : 'bg-surface-container text-secondary'}`} id={"block-3-sig-chip"}>
    <span className={"material-symbols-outlined text-[14px]"}>{isTampered ? 'lock_open' : 'lock'}</span>
    <span>{isTampered ? 'INVALID (ML-DSA verification failed)' : 'VALID (ML-DSA-65 Verified)'}</span>
    </span>
    </div>
    </div>
    
    <div className={`p-space-md bg-surface-container-lowest rounded-xl ${isTampered ? '' : 'hidden'}`} id={"hash-comparison-view"}>
    <div className={"flex items-center justify-between mb-space-xs"}>
    <span className={"font-label-sm text-label-sm text-error font-bold uppercase tracking-wider flex items-center gap-1"}>
    <span className={"material-symbols-outlined text-[16px]"}>compare_arrows</span>
    <span>Cryptographic Lineage Discrepancy</span>
    </span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Attestation Node: US-East Edge 04</span>
    </div>
    <div className={"grid grid-cols-1 md:grid-cols-2 gap-space-md mt-space-sm"}>
    
    <div className={"p-space-md rounded-lg bg-surface-container-low"}>
    <span className={"block font-label-sm text-label-sm text-on-surface-variant mb-1"}>Stored / Expected Prev Hash:</span>
    <span className={"font-label-sm text-label-sm font-mono text-secondary font-bold block select-all break-all"}>
                          0x89ab12f04ce8e721a9954d6a89c02ff3990099ea
                        </span>
    <span className={"text-body-sm font-body-sm text-on-surface-variant mt-2 block"}>
                          Matches canonical state signed at Block #104,913
                        </span>
    </div>
    
    <div className={`p-space-md rounded-lg bg-error-container/60 text-on-error-container ${isTampered ? '' : 'hidden'}`} id={"recalc-box"}>
    <div className={"flex items-center justify-between mb-1"}>
    <span className={"font-label-sm text-label-sm font-bold"}>Recalculated Attested Hash:</span>
    <span className={"px-1.5 py-0.5 rounded bg-error text-on-error font-label-sm text-label-sm font-bold uppercase"}>FORGED</span>
    </div>
    <span className={"font-label-sm text-label-sm font-mono font-bold block select-all break-all text-error"}>
                          0xDEADBEEF47710984cca90114009aeeff107710a1
                        </span>
    <span className={"text-body-sm font-body-sm mt-2 block opacity-90"}>
                          Byte payload altered post-signing at memory address 0x7FFF801B
                        </span>
    </div>
    </div>
    
    <div className={"mt-space-md flex flex-wrap items-center justify-between text-body-sm font-body-sm bg-surface-container-high/40 p-space-sm rounded-lg"}>
    <span className={"text-on-surface-variant"}>Zero-Knowledge Proof: <strong className={"font-mono text-error"}>INVALID_WITNESS</strong></span>
    <span className={"text-on-surface-variant"}>Tampering Method: <strong className={"text-on-surface"}>Offline Payload Byte Inversion</strong></span>
    <span className={"text-on-surface-variant"}>Severity: <strong className={"text-error uppercase"}>Level 1 Fatal</strong></span>
    </div>
    </div>
    </div>
    </div>
    
    <div className={"flex justify-center -my-space-sm z-10"}>
    <div className={`flex items-center gap-2 px-space-md py-1 rounded-full font-label-sm text-label-sm shadow-sm ${isTampered ? 'bg-error-container text-on-error-container font-semibold' : 'bg-surface-container text-secondary font-medium'}`} id={"connector-line-3-4"}>
    <span className={`material-symbols-outlined text-[16px] ${isTampered ? 'text-error' : ''}`}>south</span>
    <span id={"connector-text-3-4"}>{isTampered ? 'Propagating Broken Lineage Downstream' : 'SHA-3 Lineage Verified'}</span>
    </div>
    </div>
    
    <div className={"relative bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm transition-all"} id={"block-4-card"}>
    <div className={"flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm mb-space-sm bg-surface-container-low p-space-sm rounded-xl"}>
    <div className={"flex items-center gap-space-sm"}>
    <span className={"px-space-sm py-1 rounded-md bg-primary text-on-primary font-label-md text-label-md font-semibold"}>BLOCK #104,915</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>14:27:45 UTC (45s ago)</span>
    <span className={"text-outline-variant"}>•</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Height 104,915</span>
    </div>
    <div className={`inline-flex items-center gap-1.5 px-space-md py-1 rounded-full font-label-sm text-label-sm font-semibold ${isTampered ? 'bg-error text-on-error' : 'bg-secondary-fixed/40 text-secondary'}`} id={"block-4-status"}>
    <span className={"material-symbols-outlined text-[16px]"}>{isTampered ? 'link_off' : 'check_circle'}</span>
    <span>{isTampered ? 'BROKEN CHAIN LINEAGE' : 'VALID SIGNATURE'}</span>
    </div>
    </div>
    <div className={"grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center"}>
    <div className={"lg:col-span-5"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1"}>Payload Event Action</span>
    <p className={"font-body-md text-body-md text-on-surface font-medium"}>
                      Allowed event: screen_view sanitized telemetry to Google Analytics
                    </p>
    <div className={"flex items-center gap-space-xs mt-space-xs"}>
    <span className={"px-2 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm"}>Sanitized &amp; Stripped</span>
    <span className={`px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold ${isTampered ? 'bg-error-container text-on-error-container' : 'bg-surface-container text-secondary'}`} id={"block-4-subchip"}>{isTampered ? 'Parent Tampered' : 'Lineage Intact'}</span>
    </div>
    </div>
    <div className={"lg:col-span-7 bg-surface-container-low p-space-md rounded-xl space-y-2"}>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant font-label-sm text-label-sm"}>SHA-3 Hash:</span>
    <span className={"font-label-sm text-label-sm font-mono text-on-surface font-medium"}>0x54ec12ab9901178a94ee...1800ba</span>
    </div>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant font-label-sm text-label-sm"}>Previous Hash:</span>
    <span className={`font-label-sm text-label-sm font-mono font-semibold ${isTampered ? 'text-error' : 'text-secondary'}`} id={"block-4-prevhash"}>{isTampered ? '0xDEADBEEF47710984...7710 (INVALID)' : '0x104a91b...9021 (MATCH)'}</span>
    </div>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant font-label-sm text-label-sm"}>ML-DSA Signature:</span>
    <span className={"font-label-sm text-label-sm font-mono text-on-surface-variant"}>sig_mldsa_48c291e0...01ea99</span>
    </div>
    </div>
    </div>
    </div>
    
    <div className={"flex justify-center -my-space-sm z-10"}>
    <div className={`flex items-center gap-2 px-space-md py-1 rounded-full font-label-sm text-label-sm shadow-sm ${isTampered ? 'bg-error-container text-on-error-container font-semibold' : 'bg-surface-container text-secondary font-medium'}`} id={"connector-line-4-5"}>
    <span className={`material-symbols-outlined text-[16px] ${isTampered ? 'text-error' : ''}`}>south</span>
    <span id={"connector-text-4-5"}>{isTampered ? 'Propagating Broken Lineage' : 'SHA-3 Lineage Verified'}</span>
    </div>
    </div>
    
    <div className={"relative bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm transition-all"} id={"block-5-card"}>
    <div className={"flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm mb-space-sm bg-surface-container-low p-space-sm rounded-xl"}>
    <div className={"flex items-center gap-space-sm"}>
    <span className={"px-space-sm py-1 rounded-md bg-primary text-on-primary font-label-md text-label-md font-semibold"}>BLOCK #104,916</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>14:27:58 UTC (20s ago)</span>
    <span className={"text-outline-variant"}>•</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Height 104,916</span>
    </div>
    <div className={`inline-flex items-center gap-1.5 px-space-md py-1 rounded-full font-label-sm text-label-sm font-semibold ${isTampered ? 'bg-error text-on-error' : 'bg-secondary-fixed/40 text-secondary'}`} id={"block-5-status"}>
    <span className={"material-symbols-outlined text-[16px]"}>{isTampered ? 'link_off' : 'check_circle'}</span>
    <span>{isTampered ? 'BROKEN CHAIN LINEAGE' : 'VALID SIGNATURE'}</span>
    </div>
    </div>
    <div className={"grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center"}>
    <div className={"lg:col-span-5"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1"}>Payload Event Action</span>
    <p className={"font-body-md text-body-md text-on-surface font-medium"}>
                      Masked payload: GPS fuzzed to H3 Cell 886018 to AppsFlyer
                    </p>
    <div className={"flex items-center gap-space-xs mt-space-xs"}>
    <span className={"px-2 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm"}>Differential Noise Added</span>
    <span className={`px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold ${isTampered ? 'bg-error-container text-on-error-container' : 'bg-surface-container text-secondary'}`} id={"block-5-subchip"}>{isTampered ? 'Ancestor Compromised' : 'Lineage Intact'}</span>
    </div>
    </div>
    <div className={"lg:col-span-7 bg-surface-container-low p-space-md rounded-xl space-y-2"}>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant font-label-sm text-label-sm"}>SHA-3 Hash:</span>
    <span className={"font-label-sm text-label-sm font-mono text-on-surface font-medium"}>0x33b1e90ac91987...881f20</span>
    </div>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant font-label-sm text-label-sm"}>Previous Hash:</span>
    <span className={`font-label-sm text-label-sm font-mono font-semibold ${isTampered ? 'text-error' : 'text-secondary'}`} id={"block-5-prevhash"}>{isTampered ? '0x54ec12ab9901178a...1800ba (UNATTESTED)' : '0x54ec12ab...1800ba (MATCH)'}</span>
    </div>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant font-label-sm text-label-sm"}>ML-DSA Signature:</span>
    <span className={"font-label-sm text-label-sm font-mono text-on-surface-variant"}>sig_mldsa_098bb12c...716021</span>
    </div>
    </div>
    </div>
    </div>
    
    <div className={"flex justify-center -my-space-sm z-10"}>
    <div className={`flex items-center gap-2 px-space-md py-1 rounded-full font-label-sm text-label-sm shadow-sm ${isTampered ? 'bg-error-container text-on-error-container font-semibold' : 'bg-surface-container text-secondary font-medium'}`} id={"connector-line-5-6"}>
    <span className={`material-symbols-outlined text-[16px] ${isTampered ? 'text-error' : ''}`}>south</span>
    <span id={"connector-text-5-6"}>{isTampered ? 'Propagating Broken Lineage' : 'SHA-3 Lineage Verified'}</span>
    </div>
    </div>
    
    <div className={"relative bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm transition-all"} id={"block-6-card"}>
    <div className={"flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm mb-space-sm bg-surface-container-low p-space-sm rounded-xl"}>
    <div className={"flex items-center gap-space-sm"}>
    <span className={"px-space-sm py-1 rounded-md bg-primary text-on-primary font-label-md text-label-md font-semibold"}>BLOCK #104,917</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>14:28:02 UTC (2s ago)</span>
    <span className={"px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-medium"}>LATEST BLOCK</span>
    </div>
    <div className={`inline-flex items-center gap-1.5 px-space-md py-1 rounded-full font-label-sm text-label-sm font-semibold ${isTampered ? 'bg-error text-on-error' : 'bg-secondary-fixed/40 text-secondary'}`} id={"block-6-status"}>
    <span className={"material-symbols-outlined text-[16px]"}>{isTampered ? 'link_off' : 'check_circle'}</span>
    <span>{isTampered ? 'BROKEN CHAIN LINEAGE' : 'VALID SIGNATURE'}</span>
    </div>
    </div>
    <div className={"grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center"}>
    <div className={"lg:col-span-5"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1"}>Payload Event Action</span>
    <p className={"font-body-md text-body-md text-on-surface font-medium"}>
                      Sensitive event blocked: purchase_symptom egress dropped
                    </p>
    <div className={"flex items-center gap-space-xs mt-space-xs"}>
    <span className={"px-2 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm"}>Egress Firewall Dropped</span>
    <span className={`px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold ${isTampered ? 'bg-error-container text-on-error-container' : 'bg-surface-container text-secondary'}`} id={"block-6-subchip"}>{isTampered ? 'Ancestor Compromised' : 'Lineage Intact'}</span>
    </div>
    </div>
    <div className={"lg:col-span-7 bg-surface-container-low p-space-md rounded-xl space-y-2"}>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant font-label-sm text-label-sm"}>SHA-3 Hash:</span>
    <span className={"font-label-sm text-label-sm font-mono text-on-surface font-medium"}>0x12bbac00199fe231...4401fe</span>
    </div>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant font-label-sm text-label-sm"}>Previous Hash:</span>
    <span className={`font-label-sm text-label-sm font-mono font-semibold ${isTampered ? 'text-error' : 'text-secondary'}`} id={"block-6-prevhash"}>{isTampered ? '0x33b1e90ac91987...881f20 (UNVERIFIED)' : '0x33b1e90ac...881f20 (MATCH)'}</span>
    </div>
    <div className={"flex items-center justify-between text-body-sm font-body-sm"}>
    <span className={"text-on-surface-variant font-label-sm text-label-sm"}>ML-DSA Signature:</span>
    <span className={"font-label-sm text-label-sm font-mono text-on-surface-variant"}>sig_mldsa_ff918712...9902ba</span>
    </div>
    </div>
    </div>
    </div>
    </div>
    
    <div className={"bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md"}>
    <div className={"flex items-center gap-space-md"}>
    <div className={"w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary"}>
    <span className={"material-symbols-outlined text-[24px]"}>security</span>
    </div>
    <div>
    <span className={"font-headline-sm text-headline-sm text-on-surface block font-semibold"}>Continuous Hardware Root of Trust</span>
    <p className={"font-body-sm text-body-sm text-on-surface-variant"}>
                    Every SHA-3 chain mutation commits an append-only transaction verified by an isolated Intel SGX / AMD SEV enclave with dual remote attestation.
                  </p>
    </div>
    </div>
    <div className={"flex items-center gap-space-sm flex-shrink-0"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Hardware ID:</span>
    <span className={"font-label-sm text-label-sm font-mono bg-surface-container-low px-2 py-1 rounded text-on-surface"}>SGX_NODE_US_E4_0089</span>
    </div>
    </div>
    </section>
    </div>
    </div>
    </div>
    
    </main>
      <Footer variant="console" />
    </>
  );
}
