import React, { useState } from 'react';
import brandMark from '../assets/brandmark.svg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ActionCard from '../components/ActionCard';

export default function CycleSafeHomeDashboard() {
  const [pressedLog, setPressedLog] = useState('');
  const animateLog = key => {
    setPressedLog(key);
    window.setTimeout(() => setPressedLog(current => current === key ? '' : current), 150);
  };
  return (
    <>
      <Header active="cyclesafe_home_dashboard" />
    <main className={"w-full pt-20 bg-surface min-h-[calc(100vh-140px)]"}><div className={"flex flex-col w-full"}>
    <div className={"max-w-[1440px] w-full mx-auto px-margin py-space-lg"}>
    
    <div className={"flex flex-wrap items-center justify-between gap-space-sm mb-space-lg bg-surface-container-lowest rounded-xl p-space-sm shadow-sm"}>
    <div className={"flex items-center gap-space-sm"}>
    <div className={"flex items-center justify-center w-7 h-7 rounded-lg bg-primary-container text-on-primary"}>
    <span className={"material-symbols-outlined text-[18px]"}>health_and_safety</span>
    </div>
    <span className={"font-headline-sm text-headline-sm text-primary"}>CycleSafe</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>/</span>
    <span className={"font-label-md text-label-md text-on-surface font-medium"}>Personal Health Telemetry &amp; Shield Interceptor</span>
    </div>
    <div className={"flex items-center gap-space-md"}>
    <div className={"flex items-center gap-space-xs bg-surface-container px-space-sm py-1 rounded-full"}>
    <span className={"w-2 h-2 rounded-full bg-secondary animate-pulse"}></span>
    <span className={"font-label-sm text-label-sm text-secondary font-semibold"}>SurakshaShield Engine v2.4 Active</span>
    </div>
    <span className={"font-label-sm text-label-sm text-on-surface-variant font-code-block"}>ID: 0x8F9B…768E</span>
    </div>
    </div>
    
    <div className={"grid grid-cols-12 gap-gutter"}>
    
    <aside className={"col-span-12 lg:col-span-2 flex lg:flex-col gap-space-xs bg-surface-container-lowest rounded-2xl p-space-sm shadow-sm"}>
    <a className={"flex items-center gap-space-sm px-space-md py-space-sm rounded-xl bg-primary text-on-primary font-body-md text-body-md font-medium transition-all shadow-sm"} href={"#"}>
    <span className={"material-symbols-outlined text-[20px]"} style={{"fontVariationSettings": "'FILL' 1"}}>dashboard</span>
    <span className={""}>Home</span>
    </a>
    
    
    
    
    <div className={"lg:mt-auto pt-space-md border-t border-transparent lg:flex flex-col gap-space-xs hidden"}>
    <a className={"flex items-center gap-space-sm px-space-md py-space-sm rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all font-body-md text-body-md"} href={"#"}>
    <span className={"material-symbols-outlined text-[20px]"}>account_circle</span>
    <span className={""}>Profile</span>
    </a>
    <div className={"p-space-sm bg-surface-container-low rounded-xl flex items-center gap-space-sm"}>
    <span className={"material-symbols-outlined text-secondary text-[22px]"}>enhanced_encryption</span>
    <div className={"flex flex-col min-w-0"}>
    <span className={"font-label-sm text-label-sm text-on-surface font-semibold truncate"}>Hardware Vault</span>
    <span className={"font-label-sm text-label-sm text-secondary truncate"}>Secure Enclave Locked</span>
    </div>
    </div>
    </div>
    </aside>
    
    <section className={"col-span-12 lg:col-span-6 flex flex-col gap-space-lg"}>
    
    <div className={"bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-md relative overflow-hidden"}>
    <div className={"absolute -right-12 -top-12 w-48 h-48 rounded-full bg-surface-container-highest/40 blur-2xl pointer-events-none"}></div>
    <div>
    <div className={"flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md mb-1"}>
    <span className={""}>Cycle Day 14 of 28</span>
    <span className={""}>•</span>
    <span className={"text-primary font-semibold"}>Luteal Phase</span>
    </div>
    <h1 className={"font-headline-md text-headline-md text-on-surface font-bold tracking-tight"}>
                  Good afternoon, Ananya 👋
                </h1>
    <p className={"font-body-sm text-body-sm text-on-surface-variant mt-1"}>
                  Next period in <span className={"font-semibold text-primary"}>14 days</span> (Estimated Oct 28)
                </p>
    </div>
    <div className={"flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-xs rounded-xl self-start sm:self-center shadow-sm"}>
    <span className={"material-symbols-outlined text-secondary text-[18px]"}>verified</span>
    <span className={"font-label-sm text-label-sm text-on-surface font-medium"}>Local-Only Calculation</span>
    </div>
    </div>
    
    <div className={"bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col md:flex-row items-center gap-space-xl"}>
    
    <div className={"relative w-56 h-56 flex items-center justify-center shrink-0"}>
    <svg className={"w-full h-full -rotate-90"} viewBox={"0 0 200 200"}>
    
    <circle className={"text-surface-container"} cx={"100"} cy={"100"} fill={"none"} r={"82"} stroke={"currentColor"} strokeWidth={"14"}></circle>
    
    <circle className={"opacity-70"} cx={"100"} cy={"100"} fill={"none"} r={"82"} stroke={"#ba1a1a"} strokeDasharray={"92 515"} strokeDashoffset={"0"} strokeLinecap={"round"} strokeWidth={"14"}></circle>
    
    <circle cx={"100"} cy={"100"} fill={"none"} r={"82"} stroke={"#006b5f"} strokeDasharray={"108 515"} strokeDashoffset={"-160"} strokeLinecap={"round"} strokeWidth={"15"}></circle>
    
    <circle cx={"100"} cy={"100"} fill={"none"} r={"82"} stroke={"#4338ca"} strokeDasharray={"257 515"} strokeDashoffset={"0"} strokeLinecap={"round"} strokeWidth={"6"}></circle>
    </svg>
    
    <div className={"absolute inset-0 flex flex-col items-center justify-center text-center p-space-sm"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider"}>Today</span>
    <span className={"font-headline-xl text-headline-xl text-primary font-bold tracking-tight -my-1"}>14</span>
    <span className={"font-label-sm text-label-sm text-secondary font-semibold"}>Peak Fertility</span>
    </div>
    </div>
    
    <div className={"flex flex-col gap-space-md flex-1 w-full"}>
    <div className={"p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs"}>
    <div className={"flex items-center justify-between"}>
    <span className={"font-label-md text-label-md text-on-surface font-semibold flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-secondary text-[18px]"}>egg_alt</span>
                      Fertile Window Active
                    </span>
    <span className={"px-space-xs py-0.5 rounded font-label-sm text-label-sm bg-secondary text-on-secondary font-medium"}>Day 5 of 6</span>
    </div>
    <p className={"font-body-sm text-body-sm text-on-surface-variant"}>
                    High chance of conception today based on basal biomarker curve.
                  </p>
    
    <div className={"w-full bg-surface-container rounded-full h-2 mt-space-xs overflow-hidden flex"}>
    <div className={"bg-secondary h-full rounded-full transition-all"} style={{"width": "82%"}}></div>
    </div>
    </div>
    
    <div className={"grid grid-cols-3 gap-space-xs text-center"}>
    <div className={"p-space-xs rounded-lg bg-surface-container"}>
    <span className={"font-label-sm text-label-sm text-error font-semibold block"}>Period</span>
    <span className={"font-body-sm text-body-sm text-on-surface-variant"}>5 Days (Past)</span>
    </div>
    <div className={"p-space-xs rounded-lg bg-surface-container"}>
    <span className={"font-label-sm text-label-sm text-secondary font-semibold block"}>Ovulation</span>
    <span className={"font-body-sm text-body-sm text-on-surface-variant"}>Today (Peak)</span>
    </div>
    <div className={"p-space-xs rounded-lg bg-surface-container"}>
    <span className={"font-label-sm text-label-sm text-primary font-semibold block"}>Next Phase</span>
    <span className={"font-body-sm text-body-sm text-on-surface-variant"}>Luteal Rest</span>
    </div>
    </div>
    </div>
    </div>
    
    <div>
    <div className={"flex items-center justify-between mb-space-sm"}>
    <h2 className={"font-headline-sm text-headline-sm text-on-surface"}>Daily Log &amp; Biomarkers</h2>
    <span className={"font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1"}>
    <span className={"material-symbols-outlined text-[16px] text-secondary"}>shield</span> Zero-Knowledge Vaulted
                </span>
    </div>
    <div className={"grid grid-cols-2 sm:grid-cols-4 gap-space-sm"}>
    
    <ActionCard onClick={() => animateLog('period')} pressed={pressedLog === 'period'}>
    <div className={"w-9 h-9 rounded-xl bg-error-container text-error flex items-center justify-center mb-space-sm group-hover:scale-105 transition-transform"}>
    <span className={"material-symbols-outlined text-[20px]"}>water_drop</span>
    </div>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Log Period</span>
    <div className={"flex items-center gap-1 mt-space-xs"}>
    <span className={"material-symbols-outlined text-[14px] text-primary"}>lock</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant text-[11px] truncate"}>Reproductive</span>
    </div>
    </ActionCard>
    
    <ActionCard onClick={() => animateLog('symptoms')} pressed={pressedLog === 'symptoms'}>
    <div className={"w-9 h-9 rounded-xl bg-surface-container-high text-primary flex items-center justify-center mb-space-sm group-hover:scale-105 transition-transform"}>
    <span className={"material-symbols-outlined text-[20px]"}>pulse_alert</span>
    </div>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Symptoms</span>
    <div className={"flex items-center gap-1 mt-space-xs"}>
    <span className={"material-symbols-outlined text-[14px] text-primary"}>lock</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant text-[11px] truncate"}>Medical Sens.</span>
    </div>
    </ActionCard>
    
    <ActionCard onClick={() => animateLog('mood')} pressed={pressedLog === 'mood'}>
    <div className={"w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-space-sm group-hover:scale-105 transition-transform"}>
    <span className={"material-symbols-outlined text-[20px]"}>mood</span>
    </div>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Mood &amp; Energy</span>
    <div className={"flex items-center gap-1 mt-space-xs"}>
    <span className={"material-symbols-outlined text-[14px] text-primary"}>lock</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant text-[11px] truncate"}>Personal Well.</span>
    </div>
    </ActionCard>
    
    <ActionCard onClick={() => animateLog('intercourse')} pressed={pressedLog === 'intercourse'}>
    <div className={"w-9 h-9 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-space-sm group-hover:scale-105 transition-transform"}>
    <span className={"material-symbols-outlined text-[20px]"}>favorite</span>
    </div>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Intercourse</span>
    <div className={"flex items-center gap-1 mt-space-xs"}>
    <span className={"material-symbols-outlined text-[14px] text-error"}>lock_clock</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant text-[11px] truncate"}>Strictly Private</span>
    </div>
    </ActionCard>
    </div>
    </div>
    
    <div className={"bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-sm"}>
    <div className={"flex items-center justify-between"}>
    <span className={"font-headline-sm text-headline-sm text-on-surface font-semibold"}>Weekly Schedule &amp; Logged Flow</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant font-medium"}>October 2025</span>
    </div>
    <div className={"grid grid-cols-7 gap-space-xs pt-space-xs"}>
    
    <div className={"flex flex-col items-center p-space-xs rounded-xl bg-primary text-on-primary shadow-sm ring-offset-2"}>
    <span className={"font-label-sm text-label-sm opacity-80"}>Mon</span>
    <span className={"font-headline-sm text-headline-sm font-bold"}>14</span>
    <div className={"flex items-center gap-1 mt-1"}>
    <span className={"w-1.5 h-1.5 rounded-full bg-secondary-fixed"}></span>
    <span className={"w-1.5 h-1.5 rounded-full bg-on-primary"}></span>
    </div>
    <span className={"font-label-sm text-label-sm text-[10px] mt-1 opacity-90"}>Peak</span>
    </div>
    
    <div className={"flex flex-col items-center p-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container transition-all"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Tue</span>
    <span className={"font-headline-sm text-headline-sm text-on-surface font-semibold"}>15</span>
    <div className={"flex items-center gap-1 mt-1"}>
    <span className={"w-1.5 h-1.5 rounded-full bg-secondary"}></span>
    </div>
    <span className={"font-label-sm text-label-sm text-[10px] text-on-surface-variant mt-1"}>Fertile</span>
    </div>
    
    <div className={"flex flex-col items-center p-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container transition-all"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Wed</span>
    <span className={"font-headline-sm text-headline-sm text-on-surface font-semibold"}>16</span>
    <div className={"flex items-center gap-1 mt-1"}>
    <span className={"w-1.5 h-1.5 rounded-full bg-surface-variant"}></span>
    </div>
    <span className={"font-label-sm text-label-sm text-[10px] text-on-surface-variant mt-1"}>Luteal</span>
    </div>
    
    <div className={"flex flex-col items-center p-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container transition-all"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Thu</span>
    <span className={"font-headline-sm text-headline-sm text-on-surface font-semibold"}>17</span>
    <div className={"flex items-center gap-1 mt-1 opacity-0"}>
    <span className={"w-1.5 h-1.5 rounded-full"}></span>
    </div>
    <span className={"font-label-sm text-label-sm text-[10px] text-on-surface-variant mt-1"}>Normal</span>
    </div>
    
    <div className={"flex flex-col items-center p-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container transition-all"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Fri</span>
    <span className={"font-headline-sm text-headline-sm text-on-surface font-semibold"}>18</span>
    <div className={"flex items-center gap-1 mt-1 opacity-0"}>
    <span className={"w-1.5 h-1.5 rounded-full"}></span>
    </div>
    <span className={"font-label-sm text-label-sm text-[10px] text-on-surface-variant mt-1"}>Normal</span>
    </div>
    
    <div className={"flex flex-col items-center p-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container transition-all"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Sat</span>
    <span className={"font-headline-sm text-headline-sm text-on-surface font-semibold"}>19</span>
    <div className={"flex items-center gap-1 mt-1 opacity-0"}>
    <span className={"w-1.5 h-1.5 rounded-full"}></span>
    </div>
    <span className={"font-label-sm text-label-sm text-[10px] text-on-surface-variant mt-1"}>Rest</span>
    </div>
    
    <div className={"flex flex-col items-center p-space-xs rounded-xl bg-surface-container-low hover:bg-surface-container transition-all"}>
    <span className={"font-label-sm text-label-sm text-on-surface-variant"}>Sun</span>
    <span className={"font-headline-sm text-headline-sm text-on-surface font-semibold"}>20</span>
    <div className={"flex items-center gap-1 mt-1 opacity-0"}>
    <span className={"w-1.5 h-1.5 rounded-full"}></span>
    </div>
    <span className={"font-label-sm text-label-sm text-[10px] text-on-surface-variant mt-1"}>Rest</span>
    </div>
    </div>
    </div>
    
    
    </section>
    
    <section className={"col-span-12 lg:col-span-4 flex flex-col gap-space-md"}>
    <div className={"bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col h-full"}>
    
    <div className={"flex flex-col gap-space-xs pb-space-md"}>
    <div className={"flex items-center justify-between"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-primary text-[20px]"}>security</span>
    <span className={"font-headline-sm text-headline-sm text-on-surface font-bold"}>Live Network Inspector</span>
    </div>
    <span className={"w-2.5 h-2.5 rounded-full bg-secondary animate-ping"}></span>
    </div>
    
    <div className={"flex items-center gap-space-xs bg-surface-container-low p-space-xs px-space-sm rounded-xl"}>
    <span className={"text-[16px]"}>🛡️</span>
    <span className={"font-label-sm text-label-sm text-on-surface font-semibold"}>SurakshaShield: ACTIVE</span>
    <span className={"font-label-sm text-label-sm text-secondary font-medium ml-auto"}>Intercepting Outbound Calls</span>
    </div>
    </div>
    
    <div className={"grid grid-cols-4 gap-space-xs my-space-sm"}>
    
    <div className={"p-space-xs rounded-xl bg-surface-container-low flex flex-col items-center text-center"}>
    <span className={"font-label-sm text-label-sm text-secondary font-semibold"}>Leaked</span>
    <span className={"font-headline-md text-headline-md text-secondary font-bold"}>0</span>
    <span className={"font-label-sm text-label-sm text-[10px] text-on-surface-variant"}>Clean</span>
    </div>
    
    <div className={"p-space-xs rounded-xl bg-error-container/30 flex flex-col items-center text-center"}>
    <span className={"font-label-sm text-label-sm text-error font-semibold"}>Blocked</span>
    <span className={"font-headline-md text-headline-md text-error font-bold"}>14</span>
    <span className={"font-label-sm text-label-sm text-[10px] text-error"}>Ad Trackers</span>
    </div>
    
    <div className={"p-space-xs rounded-xl bg-surface-container flex flex-col items-center text-center"}>
    <span className={"font-label-sm text-label-sm text-on-surface font-semibold"}>Masked</span>
    <span className={"font-headline-md text-headline-md text-tertiary-container font-bold"}>8</span>
    <span className={"font-label-sm text-label-sm text-[10px] text-on-surface-variant"}>Coarse Geo</span>
    </div>
    
    <div className={"p-space-xs rounded-xl bg-surface-container-high flex flex-col items-center text-center"}>
    <span className={"font-label-sm text-label-sm text-primary font-semibold"}>Encrypted</span>
    <span className={"font-headline-md text-headline-md text-primary font-bold"}>22</span>
    <span className={"font-label-sm text-label-sm text-[10px] text-on-surface-variant"}>ML-KEM 768</span>
    </div>
    </div>
    
    <div className={"flex items-center justify-between mt-space-md mb-space-xs"}>
    <span className={"font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider"}>Outbound SDK Intercepts</span>
    <span className={"font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1"}>
    <span className={"material-symbols-outlined text-[14px]"}>sensors</span> Real-time stream
                </span>
    </div>
    <div className={"flex flex-col gap-space-sm flex-1 overflow-y-auto"}>
    <div className={"p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1 transition-all hover:bg-surface-container"}>
    <div className={"flex items-center justify-between"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-error text-[20px]"}>cancel</span>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Facebook Graph API</span>
    </div>
    <span className={"px-space-xs py-0.5 rounded font-label-sm text-label-sm bg-error-container text-error font-medium"}>BLOCKED</span>
    </div>
    <div className={"font-code-block text-body-sm text-on-surface-variant bg-surface-container-lowest p-space-xs rounded-lg overflow-x-auto"}>
    <span className={"text-tertiary font-medium"}>event:</span> LogFertility | <span className={"text-error font-medium"}>Advertising Policy Violation</span>
    </div>
    <div className={"flex items-center justify-between text-on-surface-variant font-label-md text-label-md pt-1"}>
    <span className={""}>Rule: SurakshaHealth#09</span>
    <span className={""}>2s ago</span>
    </div>
    </div>
    
    <div className={"p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1 transition-all hover:bg-surface-container"}>
    <div className={"flex items-center justify-between"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-tertiary text-[20px]"}>location_searching</span>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>AppsFlyer Attribution</span>
    </div>
    <span className={"px-space-xs py-0.5 rounded font-label-sm text-label-sm bg-surface-variant text-on-surface font-medium"}>MASKED</span>
    </div>
    <div className={"font-code-block text-body-sm text-on-surface-variant bg-surface-container-lowest p-space-xs rounded-lg overflow-x-auto"}>
    <span className={"text-tertiary font-medium"}>payload:</span> lat 19.07, lng 72.87 → <span className={"text-secondary font-semibold"}>H3 cell 886018 (Coarse Geo)</span>
    </div>
    <div className={"flex items-center justify-between text-on-surface-variant font-label-md text-label-md pt-1"}>
    <span className={""}>Noise: Differential Laplace ε=0.8</span>
    <span className={""}>14s ago</span>
    </div>
    </div>
    
    <div className={"p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1 transition-all hover:bg-surface-container"}>
    <div className={"flex items-center justify-between"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-secondary text-[20px]"}>check_circle</span>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Google Analytics</span>
    </div>
    <span className={"px-space-xs py-0.5 rounded font-label-sm text-label-sm bg-secondary-container text-on-secondary-container font-medium"}>ALLOWED</span>
    </div>
    <div className={"font-code-block text-body-sm text-on-surface-variant bg-surface-container-lowest p-space-xs rounded-lg overflow-x-auto"}>
    <span className={"text-tertiary font-medium"}>event:</span> screen_view (CycleSafe_Home) • <span className={"text-secondary font-medium"}>De-identified</span>
    </div>
    <div className={"flex items-center justify-between text-on-surface-variant font-label-md text-label-md pt-1"}>
    <span className={""}>Telemetry: Ephemeral UUID Stripped</span>
    <span className={""}>45s ago</span>
    </div>
    </div>
    
    <div className={"p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1 transition-all hover:bg-surface-container"}>
    <div className={"flex items-center justify-between"}>
    <div className={"flex items-center gap-space-xs"}>
    <span className={"material-symbols-outlined text-primary text-[20px]"}>key</span>
    <span className={"font-title-md text-title-md text-on-surface font-semibold"}>Own Health Vault Sync</span>
    </div>
    <span className={"px-space-xs py-0.5 rounded font-label-sm text-label-sm bg-primary-container text-on-primary font-medium"}>ENCRYPTED</span>
    </div>
    <div className={"font-code-block text-body-sm text-on-surface-variant bg-surface-container-lowest p-space-xs rounded-lg overflow-x-auto"}>
    <span className={"text-primary font-semibold"}>[ML-KEM-768 Ciphertext: 0x4fbc7e1a90d8...]</span>
    </div>
    <div className={"flex items-center justify-between text-on-surface-variant font-label-md text-label-md pt-1"}>
    <span className={""}>E2EE: Post-Quantum Lattice Encapsulation</span>
    <span className={""}>1m ago</span>
    </div>
    </div></div>
    
    <div className={"pt-space-md mt-auto"}>
    <a className={"w-full flex items-center justify-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-space-sm px-space-md rounded-xl shadow-sm transition-all text-center"} href={"/console"}>
    <span className={""}>Open Full Network Inspector Console</span>
    <span className={"material-symbols-outlined text-[18px]"}>arrow_forward</span>
    </a>
    </div>
    </div>
    </section>
    </div>
    </div>
    </div>
    </main>
      <Footer variant="app" />
    </>
  );
}
