import React, { useState } from 'react';
import Header from '../components/Header';
import useTitle from '../hooks/useTitle';
import Footer from '../components/Footer';
import ActionCard from '../components/ActionCard';

export default function CycleSafeHomeDashboard() {
  useTitle('CycleSafe Home');
  const [pressedLog, setPressedLog] = useState('');
  const animateLog = key => {
    setPressedLog(key);
    window.setTimeout(() => setPressedLog(current => current === key ? '' : current), 150);
  };

  return (
    <>
      <Header active="cyclesafe_home_dashboard" />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-140px)]">
        <div className="page">
          <div className="grid grid-cols-12 gap-gutter">
            {/* Sidebar - Home only */}
            <aside className="col-span-12 lg:col-span-2 flex lg:flex-col gap-space-xs bg-surface-container-lowest rounded-2xl p-space-sm shadow-sm">
              <a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-xl bg-primary text-on-primary text-t-nav transition-all shadow-sm" href="#">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                <span>Home</span>
              </a>
            </aside>

            {/* Main Content Area */}
            <section className="col-span-12 lg:col-span-6 flex flex-col gap-space-lg">
              {/* Cycle Ring Card */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col md:flex-row items-center gap-space-xl">
                <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                    <circle className="text-surface-container" cx="100" cy="100" fill="none" r="82" stroke="currentColor" strokeWidth="14" />
                    <circle className="opacity-70" cx="100" cy="100" fill="none" r="82" stroke="#ba1a1a" strokeDasharray="92 515" strokeDashoffset="0" strokeLinecap="round" strokeWidth="14" />
                    <circle cx="100" cy="100" fill="none" r="82" stroke="#006b5f" strokeDasharray="108 515" strokeDashoffset="-160" strokeLinecap="round" strokeWidth="15" />
                    <circle cx="100" cy="100" fill="none" r="82" stroke="#4338ca" strokeDasharray="257 515" strokeDashoffset="0" strokeLinecap="round" strokeWidth="6" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-space-sm">
                    <span className="text-t-caption text-on-surface-variant uppercase tracking-wider">Today</span>
                    <span className="text-t-title text-primary -my-1">14</span>
                    <span className="text-t-caption text-secondary">Peak Fertility</span>
                  </div>
                </div>

                <div className="flex flex-col gap-space-sm flex-1 w-full">
                  <h1 className="text-t-title text-on-surface">Good afternoon, Ananya 👋</h1>
                  <p className="text-t-body text-on-surface-variant">
                    Cycle Day 14 of 28 • Luteal Phase • Next period in <span className="text-primary">14 days</span>
                  </p>
                </div>
              </div>

              {/* 4 Quick Log Tiles */}
              <div>
                <h2 className="text-t-section text-on-surface mb-space-sm">Quick Log</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
                  <ActionCard onClick={() => animateLog('period')} pressed={pressedLog === 'period'}>
                    <div className="w-9 h-9 rounded-xl bg-error-container text-error flex items-center justify-center mb-space-sm">
                      <span className="material-symbols-outlined text-[20px]">water_drop</span>
                    </div>
                    <span className="text-t-card text-on-surface">Log Period</span>
                  </ActionCard>

                  <ActionCard onClick={() => animateLog('symptoms')} pressed={pressedLog === 'symptoms'}>
                    <div className="w-9 h-9 rounded-xl bg-surface-container-high text-primary flex items-center justify-center mb-space-sm">
                      <span className="material-symbols-outlined text-[20px]">pulse_alert</span>
                    </div>
                    <span className="text-t-card text-on-surface">Symptoms</span>
                  </ActionCard>

                  <ActionCard onClick={() => animateLog('mood')} pressed={pressedLog === 'mood'}>
                    <div className="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-space-sm">
                      <span className="material-symbols-outlined text-[20px]">mood</span>
                    </div>
                    <span className="text-t-card text-on-surface">Mood & Energy</span>
                  </ActionCard>

                  <ActionCard onClick={() => animateLog('intercourse')} pressed={pressedLog === 'intercourse'}>
                    <div className="w-9 h-9 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-space-sm">
                      <span className="material-symbols-outlined text-[20px]">favorite</span>
                    </div>
                    <span className="text-t-card text-on-surface">Intercourse</span>
                  </ActionCard>
                </div>
              </div>

              {/* Weekly Calendar Strip */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="text-t-section text-on-surface">Weekly Schedule</span>
                  <span className="text-t-caption text-on-surface-variant">October 2025</span>
                </div>
                <div className="grid grid-cols-7 gap-space-xs pt-space-xs">
                  <div className="flex flex-col items-center p-space-xs rounded-xl bg-primary text-on-primary shadow-sm">
                    <span className="text-t-caption opacity-80">Mon</span>
                    <span className="text-t-card">14</span>
                    <span className="text-t-caption mt-space-xs">Peak</span>
                  </div>
                  {['Tue 15', 'Wed 16', 'Thu 17', 'Fri 18', 'Sat 19', 'Sun 20'].map((day, idx) => {
                    const [dName, dNum] = day.split(' ');
                    return (
                      <div key={idx} className="flex flex-col items-center p-space-xs rounded-xl bg-surface-container-low">
                        <span className="text-t-caption text-on-surface-variant">{dName}</span>
                        <span className="text-t-card text-on-surface">{dNum}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Live Network Inspector Panel */}
            <section className="col-span-12 lg:col-span-4 flex flex-col gap-space-md">
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col h-full">
                <div className="flex items-center justify-between pb-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[20px]">security</span>
                    <span className="text-t-section text-on-surface">Live Network Inspector</span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping" />
                </div>

                {/* Counters */}
                <div className="grid grid-cols-4 gap-space-xs my-space-sm">
                  <div className="p-space-xs rounded-xl bg-surface-container-low flex flex-col items-center text-center">
                    <span className="text-t-caption text-secondary">Leaked</span>
                    <span className="text-t-card text-secondary">0</span>
                  </div>
                  <div className="p-space-xs rounded-xl bg-error-container/30 flex flex-col items-center text-center">
                    <span className="text-t-caption text-error">Blocked</span>
                    <span className="text-t-card text-error">14</span>
                  </div>
                  <div className="p-space-xs rounded-xl bg-surface-container flex flex-col items-center text-center">
                    <span className="text-t-caption text-on-surface">Masked</span>
                    <span className="text-t-card text-tertiary-container">8</span>
                  </div>
                  <div className="p-space-xs rounded-xl bg-surface-container-high flex flex-col items-center text-center">
                    <span className="text-t-caption text-primary">Encrypted</span>
                    <span className="text-t-card text-primary">22</span>
                  </div>
                </div>

                {/* Intercept Row List */}
                <div className="flex flex-col gap-space-sm flex-1 overflow-y-auto">
                  <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-t-card text-on-surface">Facebook Graph API</span>
                      <span className="px-space-xs py-space-xs rounded text-t-status bg-error-container text-error">BLOCKED</span>
                    </div>
                    <span className="font-mono text-t-mono text-on-surface-variant">LogFertility payload intercepted</span>
                  </div>

                  <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-t-card text-on-surface">AppsFlyer Attribution</span>
                      <span className="px-space-xs py-space-xs rounded text-t-status bg-surface-variant text-on-surface">MASKED</span>
                    </div>
                    <span className="font-mono text-t-mono text-on-surface-variant">GPS fuzzed to coarse H3 cell</span>
                  </div>

                  <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-t-card text-on-surface">Google Analytics</span>
                      <span className="px-space-xs py-space-xs rounded text-t-status bg-secondary-container text-on-secondary-container">ALLOWED</span>
                    </div>
                    <span className="font-mono text-t-mono text-on-surface-variant">Sanitized screen_view telemetry</span>
                  </div>

                  <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-t-card text-on-surface">Own Health Vault Sync</span>
                      <span className="px-space-xs py-space-xs rounded text-t-status bg-primary-container text-on-primary">ENCRYPTED</span>
                    </div>
                    <span className="font-mono text-t-mono text-on-surface-variant">ML-KEM-768 ciphertext</span>
                  </div>
                </div>

                {/* Button */}
                <div className="pt-space-md mt-auto">
                  <a className="w-full flex items-center justify-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary text-t-button py-space-sm px-space-md rounded-xl shadow-sm text-center" href="/console">
                    <span>Open Full Console</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
