import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import { kpis } from '../data/metrics';
import ConsoleSidebarNav from '../components/ConsoleSidebarNav';

export default function ConsoleOverview() {
  return (
    <>
      <Header active="console_overview" />
      <main className="w-full pt-20 bg-background min-h-screen">
        <div className="page">
          <div className="flex flex-col w-full">
            <div className="flex flex-col lg:flex-row items-start gap-space-lg w-full">
              {/* Sidebar */}
              <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-space-lg">
                <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-space-md">
                  <div className="flex items-center justify-between px-space-xs">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold tracking-wider uppercase">Console</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface">Overview</span>
                    </div>
                  </div>
                  <ConsoleSidebarNav active="overview" />
                </div>
              </aside>

              {/* Main Content */}
              <section className="flex-1 min-w-0 flex flex-col gap-space-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                  <div>
                    <h1 className="page-title">Console Overview</h1>
                    <p className="page-sub">
                      Real-time threat monitoring and privacy score matrix.
                    </p>
                  </div>
                </div>

                {/* 4 KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-lg">
                  {kpis.map(({ key, ...kpi }) => <StatCard key={key} {...kpi} />)}
                </div>

                {/* 1 Chart + Privacy Score Gauge */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
                  {/* Line Chart */}
                  <div className="lg:col-span-8 bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between gap-space-md">
                    <div>
                      <h2 className="font-title-md text-title-md font-semibold text-on-surface">Events Over 24 Hours</h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Hourly distribution of classified vs. blocked packets</p>
                    </div>

                    <div className="w-full h-56 relative pt-2">
                      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 180">
                        <defs>
                          <linearGradient id="grad-total" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#4338ca" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#4338ca" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="grad-blocked" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#ba1a1a" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#ba1a1a" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <line stroke="#eff4ff" strokeWidth="1.5" x1="0" x2="700" y1="40" y2="40" />
                        <line stroke="#eff4ff" strokeWidth="1.5" x1="0" x2="700" y1="90" y2="90" />
                        <line stroke="#eff4ff" strokeWidth="1.5" x1="0" x2="700" y1="140" y2="140" />
                        <path d="M0,130 C60,110 110,60 175,70 C240,80 300,30 380,45 C460,60 520,20 600,35 C650,45 680,25 700,30 L700,170 L0,170 Z" fill="url(#grad-total)" />
                        <path d="M0,130 C60,110 110,60 175,70 C240,80 300,30 380,45 C460,60 520,20 600,35 C650,45 680,25 700,30" fill="none" stroke="#4338ca" strokeWidth="2.5" />
                        <path d="M0,165 C60,160 110,145 175,150 C240,155 300,130 380,138 C460,145 520,120 600,130 C650,138 680,125 700,128 L700,170 L0,170 Z" fill="url(#grad-blocked)" />
                        <path d="M0,165 C60,160 110,145 175,150 C240,155 300,130 380,138 C460,145 520,120 600,130 C650,138 680,125 700,128" fill="none" stroke="#ba1a1a" strokeDasharray="4 3" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>

                  {/* Privacy Score Gauge */}
                  <div className="lg:col-span-4 bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between gap-space-md">
                    <div>
                      <h2 className="font-title-md text-title-md font-semibold text-on-surface">Privacy Score</h2>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold">DPDP Compliant</span>
                    </div>
                    <div className="flex items-center justify-center my-auto">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" fill="transparent" r="42" stroke="#e5eeff" strokeWidth="10" />
                          <circle cx="50" cy="50" fill="transparent" r="42" stroke="#006b5f" strokeDasharray="263.8" strokeDashoffset="21.1" strokeLinecap="round" strokeWidth="10" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-headline-lg text-headline-lg font-bold text-on-surface">92</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">/ 100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Threat Alerts List (Max 3 Cards) */}
                <div className="flex flex-col gap-space-md">
                  <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Recent Threat Alerts</h2>
                  <div className="flex flex-col gap-space-md">
                    <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex items-start gap-space-md">
                      <div className="w-10 h-10 rounded-xl bg-error-container text-error flex items-center justify-center flex-shrink-0 mt-space-xs">
                        <span className="material-symbols-outlined text-[22px]">warning</span>
                      </div>
                      <div>
                        <span className="font-title-md text-title-md font-semibold text-on-surface block">Abnormal bulk export attempt</span>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                          SDK attempted batch sync of 4,000 encrypted period entries.
                        </p>
                      </div>
                    </div>

                    <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex items-start gap-space-md">
                      <div className="w-10 h-10 rounded-xl bg-error text-on-error flex items-center justify-center flex-shrink-0 mt-space-xs">
                        <span className="material-symbols-outlined text-[22px]">crisis_alert</span>
                      </div>
                      <div>
                        <span className="font-title-md text-title-md font-semibold text-on-surface block">Duress PIN used silently</span>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                          Decoy logs served; silent panic beacon transmitted.
                        </p>
                      </div>
                    </div>

                    <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex items-start gap-space-md">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-highest text-on-surface flex items-center justify-center flex-shrink-0 mt-space-xs">
                        <span className="material-symbols-outlined text-[22px]">radar</span>
                      </div>
                      <div>
                        <span className="font-title-md text-title-md font-semibold text-on-surface block">Unknown SDK destination detected</span>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                          Unregistered socket connection blocked at sandbox level.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
