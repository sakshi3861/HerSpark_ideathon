import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConsoleSidebarNav from '../components/ConsoleSidebarNav';

export default function ConsoleLiveTraffic() {
  const [isStreaming, setIsStreaming] = useState(true);
  const [copied, setCopied] = useState(false);
  const toggleStream = () => setIsStreaming(value => !value);
  const copyBuffer = async () => {
    const buffer = '{\n  "period_day": 14,\n  "ovulation": true,\n  "ad_id": "8f3a91bb-4e20-41",\n  "target_uri": "graph.facebook.com/v19.0/act_99182/events"\n}';
    try { await navigator.clipboard.writeText(buffer); setCopied(true); window.setTimeout(() => setCopied(false), 2000); } catch { setCopied(false); }
  };
  return (
    <>
      <Header active="console_live_traffic" />
    <main className={"w-full pt-20 bg-background min-h-screen"}><div className={"flex flex-col w-full"}>
    <div className={"w-full max-w-[1440px] mx-auto px-margin py-space-lg"}>
    
    <div className={"flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-lg"}>
    <div className={"flex flex-col gap-space-xs"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold"}>CONSOLE</span>
    <span className={"text-outline-variant font-label-sm"}>/</span>
    <span className={"font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold"}>REAL-TIME INTERCEPTOR</span>
    </div>
    <h1 className={"font-headline-md text-headline-md text-on-surface"}>Live Traffic Inspector</h1>
    <p className={"font-body-md text-body-md text-on-surface-variant max-w-3xl"}>
              Streaming runtime network socket interception, AST telemetry classification, and outbound payload filtering under DPDP Act &amp; post-quantum guardrails.
            </p>
    </div>
    
    <div className={"flex items-center gap-space-sm flex-wrap"}>
    <div className={"flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container rounded-lg shadow-sm"}>
    <span className={"w-2.5 h-2.5 rounded-full bg-secondary animate-ping"}></span>
    <span className={"w-2 h-2 rounded-full bg-secondary -ml-3.5"}></span>
    <span className={"font-label-sm text-label-sm text-on-surface font-medium"}>Streaming Live (120ms)</span>
    </div>
    <button onClick={toggleStream} className={`inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg shadow-sm transition-all ${isStreaming ? 'bg-surface-container-lowest hover:bg-surface-container text-on-surface' : 'bg-primary text-on-primary'}`} id={"streamToggleBtn"} type={"button"}>
    <span className={"material-symbols-outlined text-[18px]"} id={"pauseIcon"}>{isStreaming ? 'pause_circle' : 'play_circle'}</span>
    <span className={"font-body-md text-body-md font-medium"} id={"pauseText"}>{isStreaming ? 'Pause Stream' : 'Resume Stream'}</span>
    </button>
    <button className={"inline-flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-lowest hover:bg-surface-container text-primary font-medium rounded-lg shadow-sm transition-all"} type={"button"}>
    <span className={"material-symbols-outlined text-[18px]"}>file_download</span>
    <span className={"font-body-md text-body-md"}>Export PCAP / JSON</span>
    </button>
    </div>
    </div>
    
    <div className={"bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-lg flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-space-md"}>
    <div className={"relative flex-1"}>
    <span className={"material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]"}>search</span>
    <input className={"w-full pl-10 pr-space-md py-space-sm bg-surface-container-low rounded-lg text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest transition-all"} placeholder={"Search payload variables, AST match, token hash, or endpoint..."} type={"text"}/>
    </div>
    <div className={"flex items-center gap-space-sm flex-wrap"}>
    <div className={"relative min-w-[200px]"}>
    <select className={"w-full appearance-none bg-surface-container-low py-space-sm pl-space-md pr-8 rounded-lg font-body-md text-body-md text-on-surface focus:outline-none cursor-pointer"}>
    <option>All Destinations</option>
    <option>Facebook Graph API</option>
    <option>Google Analytics 4</option>
    <option>AppsFlyer Attribution</option>
    <option>Own Health Vault</option>
    <option>TikTok Pixel</option>
    </select>
    <span className={"material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[18px]"}>expand_more</span>
    </div>
    <div className={"relative min-w-[170px]"}>
    <select className={"w-full appearance-none bg-surface-container-low py-space-sm pl-space-md pr-8 rounded-lg font-body-md text-body-md text-on-surface focus:outline-none cursor-pointer"}>
    <option>All Statuses</option>
    <option>Blocked (Egress Drop)</option>
    <option>Masked (H3 / Synthetic)</option>
    <option>Allowed (Sanitized)</option>
    <option>Encrypted (Post-Quantum)</option>
    <option>Leaked (Violation)</option>
    </select>
    <span className={"material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[18px]"}>expand_more</span>
    </div>
    <button className={"px-space-md py-space-sm bg-surface-container hover:bg-surface-container-high text-on-surface-variant rounded-lg font-body-md text-body-md transition-colors"} type={"button"}>
              Clear Filters
            </button>
    </div>
    </div>
    
    <div className={"grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-space-md mb-space-lg"}>
    
    <div className={"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between"}>
    <div className={"flex items-center justify-between mb-space-xs"}>
    <span className={"font-label-sm text-label-sm font-semibold tracking-wider text-on-surface-variant"}>LEAKED</span>
    <span className={"px-space-xs py-0.5 rounded-full bg-secondary-fixed/40 text-on-secondary-container font-label-sm text-label-sm font-medium"}>0 Leaks</span>
    </div>
    <div className={"font-headline-lg text-headline-lg text-secondary font-bold tracking-tight"}>0</div>
    <div className={"font-body-sm text-body-sm text-on-surface-variant mt- space-xs"}>0.0% egress violation</div>
    </div>
    
    <div className={"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between"}>
    <div className={"flex items-center justify-between mb-space-xs"}>
    <span className={"font-label-sm text-label-sm font-semibold tracking-wider text-on-surface-variant"}>BLOCKED</span>
    <span className={"px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-medium"}>Blocked</span>
    </div>
    <div className={"font-headline-lg text-headline-lg text-error font-bold tracking-tight"}>142</div>
    <div className={"font-body-sm text-body-sm text-on-surface-variant mt- space-xs"}>+18 in last hour</div>
    </div>
    
    <div className={"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between"}>
    <div className={"flex items-center justify-between mb-space-xs"}>
    <span className={"font-label-sm text-label-sm font-semibold tracking-wider text-on-surface-variant"}>MASKED</span>
    <span className={"px-space-xs py-0.5 rounded-full bg-surface-container-high text-tertiary font-label-sm text-label-sm font-medium"}>Masked</span>
    </div>
    <div className={"font-headline-lg text-headline-lg text-tertiary font-bold tracking-tight"}>89</div>
    <div className={"font-body-sm text-body-sm text-on-surface-variant mt- space-xs"}>H3 Geo &amp; Rotated IDs</div>
    </div>
    
    <div className={"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between"}>
    <div className={"flex items-center justify-between mb-space-xs"}>
    <span className={"font-label-sm text-label-sm font-semibold tracking-wider text-on-surface-variant"}>ALLOWED</span>
    <span className={"px-space-xs py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-medium"}>Allowed</span>
    </div>
    <div className={"font-headline-lg text-headline-lg text-primary font-bold tracking-tight"}>1,420</div>
    <div className={"font-body-sm text-body-sm text-on-surface-variant mt- space-xs"}>Sanitized Telemetry</div>
    </div>
    
    <div className={"bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between col-span-2 md:col-span-1"}>
    <div className={"flex items-center justify-between mb-space-xs"}>
    <span className={"font-label-sm text-label-sm font-semibold tracking-wider text-on-surface-variant"}>ENCRYPTED</span>
    <span className={"px-space-xs py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-medium"}>ML-KEM-768</span>
    </div>
    <div className={"font-headline-lg text-headline-lg text-primary-container font-bold tracking-tight"}>3,891</div>
    <div className={"font-body-sm text-body-sm text-on-surface-variant mt- space-xs"}>Post-Quantum Vault</div>
    </div>
    </div>
    
    <div className={"grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start"}>
    
    <div className={"lg:col-span-2 bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between min-h-[640px]"}>
    <div className={"flex flex-col gap-space-sm"}>
    <div className={"font-label-sm text-label-sm font-semibold text-outline tracking-wider px-space-sm mb-space-xs"}>CONSOLE WORKSPACES</div>
    <ConsoleSidebarNav active="traffic" variant="traffic" />
    </div>
    
    <div className={"bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-xs mt-space-xl"}>
    <div className={"flex items-center justify-between"}>
    <span className={"font-label-sm text-label-sm font-semibold text-primary"}>ENCLAVE EDGE</span>
    <span className={"w-1.5 h-1.5 rounded-full bg-secondary"}></span>
    </div>
    <div className={"font-body-sm text-body-sm font-medium text-on-surface"}>US-East Edge 04</div>
    <div className={"font-code-block text-code-block text-on-surface-variant text-[11px] leading-tight"}>Crypto: ML-KEM-768 Enforced</div>
    <div className={"font-code-block text-code-block text-on-surface-variant text-[11px] leading-tight"}>Cluster Uptime: 99.99%</div>
    <div className={"mt-space-xs pt-space-xs flex items-center justify-between text-secondary font-label-sm text-label-sm"}>
    <span>Zero AST bypass</span>
    <span className={"material-symbols-outlined text-[16px]"}>verified</span>
    </div>
    </div>
    </div>
    
    <div className={"lg:col-span-6 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col"}>
    
    <div className={"px-space-md py-space-md bg-surface-container-lowest flex items-center justify-between border-b border-surface-container"}>
    <div className={"flex items-center gap-space-sm"}>
    <span className={"font-title-md text-title-md font-semibold text-on-surface"}>Outbound Packet Stream</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>(10 of 5,542 captured)</span>
    </div>
    <div className={"flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-medium"}>
    <span className={"material-symbols-outlined text-[14px]"}>lock_clock</span>
    <span>Auto-scroll Locked</span>
    </div>
    </div>
    
    <div className={"overflow-x-auto"}>
    <table className={"w-full text-left border-collapse"}>
    <thead>
    <tr className={"bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider"}>
    <th className={"py-space-sm px-space-md"}>Time</th>
    <th className={"py-space-sm px-space-md"}>Destination</th>
    <th className={"py-space-sm px-space-md"}>Event</th>
    <th className={"py-space-sm px-space-md"}>Payload Preview</th>
    <th className={"py-space-sm px-space-md text-right"}>Status</th>
    </tr>
    </thead>
    <tbody className={"divide-y divide-surface-container font-body-sm text-body-sm text-on-surface"}>
    
    <tr className={"bg-primary/5 cursor-pointer shadow-[inset_3px_0_0_0_#2a14b4]"}>
    <td className={"py-space-md px-space-md font-code-block text-code-block text-primary whitespace-nowrap font-medium"}>
                      14:28:02.114<br/><span className={"text-on-surface-variant text-[10px]"}>2s ago</span>
    </td>
    <td className={"py-space-md px-space-md whitespace-nowrap"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"w-5 h-5 rounded flex items-center justify-center bg-primary-container text-on-primary font-bold text-[10px]"}>f</span>
    <span className={"font-medium text-on-surface"}>Facebook Graph API</span>
    </div>
    </td>
    <td className={"py-space-md px-space-md whitespace-nowrap"}>
    <span className={"font-code-block text-code-block px-space-xs py-0.5 bg-surface-container rounded text-error font-medium"}>LogFertility</span>
    </td>
    <td className={"py-space-md px-space-md max-w-[180px]"}>
    <span className={"font-code-block text-code-block text-on-surface-variant truncate block"} title={"{\"period_day\":14,\"ovulation\":true,\"ad_id\":\"8f3a...\"}"}>
                        {'{'}"period_day":14,"ovulation":true,"ad_id":"8f3a..."{'}'}
                      </span>
    </td>
    <td className={"py-space-md px-space-md text-right whitespace-nowrap"}>
    <span className={"inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold"}>
    <span className={"material-symbols-outlined text-[13px]"}>gpp_bad</span>
                        Blocked
                      </span>
    </td>
    </tr>
    
    <tr className={"hover:bg-surface-container-low cursor-pointer transition-colors"}>
    <td className={"py-space-sm px-space-md font-code-block text-code-block text-on-surface-variant whitespace-nowrap"}>
                      14:27:58.840<br/><span className={"text-[10px]"}>5s ago</span>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-tertiary text-[18px]"}>ads_click</span>
    <span>AppsFlyer Attribution</span>
    </div>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <span className={"font-code-block text-code-block px-space-xs py-0.5 bg-surface-container rounded text-tertiary"}>install_referrer</span>
    </td>
    <td className={"py-space-sm px-space-md max-w-[180px]"}>
    <span className={"font-code-block text-code-block text-on-surface-variant truncate block"}>
                        {'{'}"lat":"19.07","lng":"72.87","fuzz":"H3_res6"{'}'}
                      </span>
    </td>
    <td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>
    <span className={"inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-surface-container-high text-tertiary font-label-sm text-label-sm font-semibold"}>
    <span className={"material-symbols-outlined text-[13px]"}>visibility_off</span>
                        Masked
                      </span>
    </td>
    </tr>
    
    <tr className={"hover:bg-surface-container-low cursor-pointer transition-colors"}>
    <td className={"py-space-sm px-space-md font-code-block text-code-block text-on-surface-variant whitespace-nowrap"}>
                      14:27:45.021<br/><span className={"text-[10px]"}>19s ago</span>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-secondary text-[18px]"}>analytics</span>
    <span>Google Analytics 4</span>
    </div>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <span className={"font-code-block text-code-block px-space-xs py-0.5 bg-surface-container rounded text-secondary"}>screen_view</span>
    </td>
    <td className={"py-space-sm px-space-md max-w-[180px]"}>
    <span className={"font-code-block text-code-block text-on-surface-variant truncate block"}>
                        {'{'}"screen_name":"CycleSafe_Home","ephemeral_id":"9a4c..."{'}'}
                      </span>
    </td>
    <td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>
    <span className={"inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold"}>
    <span className={"material-symbols-outlined text-[13px]"}>check_circle</span>
                        Allowed
                      </span>
    </td>
    </tr>
    
    <tr className={"hover:bg-surface-container-low cursor-pointer transition-colors"}>
    <td className={"py-space-sm px-space-md font-code-block text-code-block text-on-surface-variant whitespace-nowrap"}>
                      14:27:32.419<br/><span className={"text-[10px]"}>32s ago</span>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-primary-container text-[18px]"}>vpn_key</span>
    <span className={"font-medium text-primary"}>Own Health Vault</span>
    </div>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <span className={"font-code-block text-code-block px-space-xs py-0.5 bg-surface-container rounded text-primary-container font-medium"}>sync_biomarker_vault</span>
    </td>
    <td className={"py-space-sm px-space-md max-w-[180px]"}>
    <span className={"font-code-block text-code-block text-primary truncate block"}>
                        0x4fbc7e1a90d8... [Lattice Ciphertext]
                      </span>
    </td>
    <td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>
    <span className={"inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold"}>
    <span className={"material-symbols-outlined text-[13px]"}>lock</span>
                        Encrypted
                      </span>
    </td>
    </tr>
    
    <tr className={"hover:bg-surface-container-low cursor-pointer transition-colors"}>
    <td className={"py-space-sm px-space-md font-code-block text-code-block text-on-surface-variant whitespace-nowrap"}>
                      14:27:14.992<br/><span className={"text-[10px]"}>49s ago</span>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"w-5 h-5 rounded flex items-center justify-center bg-primary-container text-on-primary font-bold text-[10px]"}>f</span>
    <span>Facebook Graph API</span>
    </div>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <span className={"font-code-block text-code-block px-space-xs py-0.5 bg-surface-container rounded text-error"}>purchase_symptom</span>
    </td>
    <td className={"py-space-sm px-space-md max-w-[180px]"}>
    <span className={"font-code-block text-code-block text-on-surface-variant truncate block"}>
                        {'{'}"item":"ovulation_test_kit","price":24.99{'}'}
                      </span>
    </td>
    <td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>
    <span className={"inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold"}>
    <span className={"material-symbols-outlined text-[13px]"}>gpp_bad</span>
                        Blocked
                      </span>
    </td>
    </tr>
    
    <tr className={"hover:bg-surface-container-low cursor-pointer transition-colors"}>
    <td className={"py-space-sm px-space-md font-code-block text-code-block text-on-surface-variant whitespace-nowrap"}>
                      14:26:55.120<br/><span className={"text-[10px]"}>1m ago</span>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-tertiary text-[18px]"}>ads_click</span>
    <span>AppsFlyer Attribution</span>
    </div>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <span className={"font-code-block text-code-block px-space-xs py-0.5 bg-surface-container rounded text-tertiary"}>device_telemetry_ping</span>
    </td>
    <td className={"py-space-sm px-space-md max-w-[180px]"}>
    <span className={"font-code-block text-code-block text-on-surface-variant truncate block"}>
                        {'{'}"idfa":"SYNTHETIC_ROTATE_492","os":"iOS 18"{'}'}
                      </span>
    </td>
    <td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>
    <span className={"inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-surface-container-high text-tertiary font-label-sm text-label-sm font-semibold"}>
    <span className={"material-symbols-outlined text-[13px]"}>visibility_off</span>
                        Masked
                      </span>
    </td>
    </tr>
    
    <tr className={"hover:bg-surface-container-low cursor-pointer transition-colors"}>
    <td className={"py-space-sm px-space-md font-code-block text-code-block text-on-surface-variant whitespace-nowrap"}>
                      14:26:40.803<br/><span className={"text-[10px]"}>1m ago</span>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-primary-container text-[18px]"}>vpn_key</span>
    <span className={"font-medium text-primary"}>Own Health Vault</span>
    </div>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <span className={"font-code-block text-code-block px-space-xs py-0.5 bg-surface-container rounded text-primary-container"}>period_flow_record</span>
    </td>
    <td className={"py-space-sm px-space-md max-w-[180px]"}>
    <span className={"font-code-block text-code-block text-primary truncate block"}>
                        0x89ab12cf... [ML-KEM-768 Enveloped]
                      </span>
    </td>
    <td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>
    <span className={"inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold"}>
    <span className={"material-symbols-outlined text-[13px]"}>lock</span>
                        Encrypted
                      </span>
    </td>
    </tr>
    
    <tr className={"hover:bg-surface-container-low cursor-pointer transition-colors"}>
    <td className={"py-space-sm px-space-md font-code-block text-code-block text-on-surface-variant whitespace-nowrap"}>
                      14:26:22.410<br/><span className={"text-[10px]"}>2m ago</span>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-secondary text-[18px]"}>analytics</span>
    <span>Google Analytics 4</span>
    </div>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <span className={"font-code-block text-code-block px-space-xs py-0.5 bg-surface-container rounded text-secondary"}>app_background</span>
    </td>
    <td className={"py-space-sm px-space-md max-w-[180px]"}>
    <span className={"font-code-block text-code-block text-on-surface-variant truncate block"}>
                        {'{'}"session_duration_s":142,"os_version":"18.1"{'}'}
                      </span>
    </td>
    <td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>
    <span className={"inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold"}>
    <span className={"material-symbols-outlined text-[13px]"}>check_circle</span>
                        Allowed
                      </span>
    </td>
    </tr>
    
    <tr className={"hover:bg-surface-container-low cursor-pointer transition-colors"}>
    <td className={"py-space-sm px-space-md font-code-block text-code-block text-on-surface-variant whitespace-nowrap"}>
                      14:25:59.001<br/><span className={"text-[10px]"}>2m ago</span>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"w-5 h-5 rounded flex items-center justify-center bg-inverse-surface text-on-primary font-bold text-[10px]"}>tk</span>
    <span>TikTok Pixel / SDK</span>
    </div>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <span className={"font-code-block text-code-block px-space-xs py-0.5 bg-surface-container rounded text-error"}>custom_mood_log</span>
    </td>
    <td className={"py-space-sm px-space-md max-w-[180px]"}>
    <span className={"font-code-block text-code-block text-on-surface-variant truncate block"}>
                        {'{'}"sentiment":"fatigue_cramps","user_id":"hash..."{'}'}
                      </span>
    </td>
    <td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>
    <span className={"inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold"}>
    <span className={"material-symbols-outlined text-[13px]"}>gpp_bad</span>
                        Blocked
                      </span>
    </td>
    </tr>
    
    <tr className={"hover:bg-surface-container-low cursor-pointer transition-colors"}>
    <td className={"py-space-sm px-space-md font-code-block text-code-block text-on-surface-variant whitespace-nowrap"}>
                      14:25:31.782<br/><span className={"text-[10px]"}>3m ago</span>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-primary-container text-[18px]"}>vpn_key</span>
    <span className={"font-medium text-primary"}>Own Health Vault</span>
    </div>
    </td>
    <td className={"py-space-sm px-space-md whitespace-nowrap"}>
    <span className={"font-code-block text-code-block px-space-xs py-0.5 bg-surface-container rounded text-primary-container"}>duress_beacon</span>
    </td>
    <td className={"py-space-sm px-space-md max-w-[180px]"}>
    <span className={"font-code-block text-code-block text-primary truncate block"}>
                        0x9911e3b... [Covert Priority Egress]
                      </span>
    </td>
    <td className={"py-space-sm px-space-md text-right whitespace-nowrap"}>
    <span className={"inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold"}>
    <span className={"material-symbols-outlined text-[13px]"}>lock</span>
                        Encrypted
                      </span>
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    
    <div className={"px-space-md py-space-sm bg-surface-container-lowest flex items-center justify-between border-t border-surface-container"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Live ring buffer: 100 retained in memory</span>
    <div className={"flex items-center gap-space-md"}>
    <button className={"font-label-sm text-label-sm text-error hover:underline transition-all"} type={"button"}>Clear Log</button>
    <button className={"font-label-sm text-label-sm text-primary hover:underline transition-all"} type={"button"}>Snapshot JSON</button>
    </div>
    </div>
    </div>
    
    <div className={"lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-lg"}>
    
    <div className={"flex flex-col gap-space-xs"}>
    <div className={"flex items-center justify-between"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"px-space-xs py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold tracking-wide uppercase"}>
                    EGRESS INTERCEPTED
                  </span>
    <span className={"font-code-block text-code-block text-on-surface-variant"}>#PKT-94821</span>
    </div>
    <button className={"text-on-surface-variant hover:text-on-surface transition-colors"} title={"Expand forensic modal"} type={"button"}>
    <span className={"material-symbols-outlined text-[20px]"}>open_in_full</span>
    </button>
    </div>
    <div className={"flex items-center justify-between mt-space-xs"}>
    <h2 className={"font-title-md text-title-md text-on-surface font-bold"}>Facebook Graph API</h2>
    <span className={"font-code-block text-code-block text-on-surface-variant text-[12px]"}>14:28:02.114 UTC</span>
    </div>
    </div>
    
    <div className={"p-space-md bg-error-container/40 rounded-lg flex items-start gap-space-sm"}>
    <span className={"material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5"}>block</span>
    <p className={"font-body-sm text-body-sm text-on-error-container leading-relaxed"}>
    <strong>TRANSMISSION DROPPED</strong> — Socket severed before HTTP serialization. Zero bytes transmitted to third party.
              </p>
    </div>
    
    <div className={"flex flex-col gap-space-xs"}>
    <div className={"flex items-center justify-between"}>
    <span className={"font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider"}>Classification</span>
    <span className={"px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-medium"}>Tier 1 Sensitive</span>
    </div>
    <div className={"font-body-md text-body-md font-semibold text-on-surface"}>Reproductive Health / Intimacy Telemetry</div>
    <p className={"font-body-sm text-body-sm text-on-surface-variant"}>
                AST Matched identifier <code className={"font-code-block px-1 bg-surface-container rounded text-error"}>LogFertility</code> against forbidden health lexicon v2.4 (DPDP Act §9).
              </p>
    </div>
    
    <div className={"flex flex-col gap-space-xs pt-space-xs"}>
    <div className={"flex items-center justify-between"}>
    <span className={"font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider"}>Active Policy</span>
    <span className={"font-code-block text-code-block text-primary text-[12px]"}>POLICY-DPDP-HEALTH-09</span>
    </div>
    <div className={"font-body-md text-body-md font-semibold text-error"}>HARD BLOCK — Zero Advertising Egress</div>
    <p className={"font-body-sm text-body-sm text-on-surface-variant"}>
                Third-party ad broker SDKs are unconditionally prohibited from harvesting menstrual, pregnancy, ovulation, or reproductive wellness payloads.
              </p>
    </div>
    
    <div className={"bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-xs"}>
    <div className={"flex items-center justify-between"}>
    <span className={"font-label-sm text-label-sm uppercase font-semibold text-on-surface-variant"}>Hardware Consent State</span>
    <span className={"font-code-block text-code-block text-on-surface-variant text-[11px]"}>#SURAKSHA-8842</span>
    </div>
    <div className={"flex items-center justify-between"}>
    <span className={"font-body-sm text-body-sm text-on-surface font-medium"}>Advertising &amp; Personalization</span>
    <span className={"font-label-sm text-label-sm font-bold text-error line-through"}>[DENIED BY USER]</span>
    </div>
    </div>
    
    <div className={"flex flex-col gap-space-xs"}>
    <div className={"flex items-center justify-between"}>
    <span className={"font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider"}>Intercepted JSON Buffer</span>
    <button onClick={copyBuffer} className={"inline-flex items-center gap-1 font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors"} id={"copyJsonBtn"} type={"button"}>
    <span className={"material-symbols-outlined text-[14px]"}>content_copy</span>
    <span id={"copyJsonLabel"}>{copied ? 'Copied!' : 'Copy'}</span>
    </button>
    </div>
    <pre className={"p-space-md bg-inverse-surface text-inverse-on-surface rounded-lg font-code-block text-code-block overflow-x-auto text-[12px] leading-relaxed shadow-inner"} id={"jsonBufferCode"}><code>{'{'}
      "period_day": 14,
      "ovulation": true,
      "ad_id": "8f3a91bb-4e20-41",
      "target_uri": "graph.facebook.com/v19.0/act_99182/events"
    {'}'}</code></pre>
    </div>
    
    <div className={"flex flex-col gap-space-xs text-on-surface-variant"}>
    <span className={"font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider"}>Cryptographic Enclave Proof</span>
    <div className={"font-code-block text-code-block text-[11px] bg-surface-container-low p-space-sm rounded space-y-1"}>
    <div className={"truncate"}><span className={"text-outline"}>SHA-3 Hash:</span> <span className={"text-on-surface"}>e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span></div>
    <div className={"truncate"}><span className={"text-outline"}>ML-DSA Sig:</span> <span className={"text-primary font-medium"}>dsa768:9a0f44bc...712a8e</span></div>
    <div><span className={"text-outline"}>Block Height:</span> <span className={"text-secondary font-medium"}>#104,912</span></div>
    </div>
    </div>
    
    <div className={"flex flex-col gap-space-sm pt-space-xs mt-auto"}>
    <button className={"w-full py-space-sm px-space-md bg-error hover:bg-on-error-container text-on-error rounded-lg font-body-md text-body-md font-medium transition-colors shadow-sm text-center"} type={"button"}>
                Add Destination to Permanent Denylist
              </button>
    <div className={"flex items-center gap-space-sm"}>
    <button className={"flex-1 py-space-sm px-space-md bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-body-md text-body-md font-medium transition-colors text-center"} type={"button"}>
                  Simulate Payload Muting
                </button>
    <a className={"px-space-md py-space-sm text-primary hover:text-primary-container font-body-md text-body-md font-medium transition-colors whitespace-nowrap"} href={"/console/audit-ledger"}>
                  Audit Ledger →
                </a>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </main>
      <Footer variant="console" />
    </>
  );
}
