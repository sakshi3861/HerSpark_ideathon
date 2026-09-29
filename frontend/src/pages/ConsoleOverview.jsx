import React, { useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import Skeleton from '../components/Skeleton';
import ConsoleSidebarNav from '../components/ConsoleSidebarNav';
import useLoading from '../hooks/useLoading';
import useNow from '../hooks/useNow';
import useTitle from '../hooks/useTitle';
import { buildKpis, useMetrics } from '../data/metrics';

const W = 720;
const H = 280;
const PAD = { l: 48, r: 16, t: 16, b: 32 };
const Y_MAX = 4000;
const x = i => PAD.l + (i * (W - PAD.l - PAD.r)) / 23;
const y = v => PAD.t + (1 - v / Y_MAX) * (H - PAD.t - PAD.b);
const line = pts => pts.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');

function useSeries() {
  return useMemo(() => {
    const hour = new Date().getHours();
    const total = [];
    const blocked = [];
    for (let i = 0; i < 24; i++) {
      const h = (hour - 23 + i + 24) % 24;
      const day = 1 - Math.abs(h - 15) / 15; // busier mid-afternoon
      const t = Math.round(900 + day * 1900 + (Math.random() - 0.5) * 520);
      total.push(t);
      blocked.push(Math.round(t * (0.09 + Math.random() * 0.08)));
    }
    return { total, blocked, hour };
  }, []);
}

const baseAlerts = [
  { icon: 'warning', tone: 'bg-error-container text-error', title: 'Bulk export attempt', body: 'SDK queued 4,012 encrypted period entries for a single sync.', ageMin: 12 },
  { icon: 'crisis_alert', tone: 'bg-error text-on-error', title: 'Duress PIN entered', body: 'Decoy log set served. Silent alert sent to console.', ageMin: 47 },
  { icon: 'radar', tone: 'bg-surface-container-highest text-on-surface', title: 'Unregistered destination', body: 'Connection to cdn-edge-7.metrixhub.io blocked at socket level.', ageMin: 126 },
];

const ageLabel = min => (min < 60 ? `${min} min ago` : `${Math.floor(min / 60)} hr ${min % 60} min ago`);

export default function ConsoleOverview() {
  useTitle('Console Overview');
  const loading = useLoading(750);
  const m = useMetrics();
  const now = useNow(1000);
  const { total, blocked, hour } = useSeries();
  const [mountedAt] = useState(() => Date.now());

  const liveTotal = total.map((v, i) => (i === 23 ? Math.min(3900, v + Math.round((m.events - 48214) / 3)) : v));
  const liveBlocked = blocked.map((v, i) => (i === 23 ? v + (m.leaks - 5983) : v));
  const sinceUpdate = Math.max(0, Math.round((now - m.updatedAt) / 1000));
  const circ = 263.9;
  const xLabels = [0, 4, 8, 12, 16, 20, 23].map(i => ({ i, label: `${String((hour - 23 + i + 24) % 24).padStart(2, '0')}:00` }));

  return (
    <>
      <Header active="console_overview" />
      <main className="w-full pt-20 bg-background min-h-screen">
        <div className="page">
          <div className="flex flex-col w-full">
            <div className="flex flex-col lg:flex-row items-start gap-space-lg w-full">
              <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-space-lg">
                <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-space-md">
                  <div className="flex items-center justify-between px-space-xs">
                    <div className="flex flex-col">
                      <span className="text-t-caption text-on-surface-variant tracking-wider uppercase">Console</span>
                      <span className="text-t-section text-on-surface">Overview</span>
                    </div>
                  </div>
                  <ConsoleSidebarNav active="overview" />
                </div>
              </aside>

              <section className="flex-1 min-w-0 flex flex-col gap-space-xl">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-md">
                  <div>
                    <h1 className="page-title">Console Overview</h1>
                    <p className="page-sub">Requests intercepted in the last 24 hours. Showing sandbox data.</p>
                  </div>
                  <span className="inline-flex items-center gap-space-sm text-t-caption text-on-surface-variant sm:mt-space-sm">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    Live · updated {sinceUpdate}s ago
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-lg">
                  {loading
                    ? Array.from({ length: 4 }, (_, i) => (
                      <div key={i} className="card flex flex-col justify-between gap-space-md">
                        <Skeleton className="h-4 w-28" />
                        <div className="flex flex-col gap-space-sm"><Skeleton className="h-10 w-32" /><Skeleton className="h-3 w-40" /></div>
                      </div>
                    ))
                    : buildKpis(m).map(({ key, ...kpi }) => <StatCard key={key} {...kpi} />)}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
                  <div className="lg:col-span-8 card card-hover flex flex-col gap-space-md">
                    <div className="flex flex-wrap items-start justify-between gap-space-md">
                      <div>
                        <h2 className="text-t-card text-on-surface">Requests per hour</h2>
                        <p className="text-t-body text-on-surface-variant">All outbound requests vs. requests blocked, last 24 h</p>
                      </div>
                      <div className="flex items-center gap-space-md text-t-caption text-on-surface-variant">
                        <span className="inline-flex items-center gap-space-sm"><span className="w-4 h-0.5 bg-primary-container" />Inspected</span>
                        <span className="inline-flex items-center gap-space-sm"><span className="w-4 border-t-2 border-dashed border-error" />Blocked</span>
                      </div>
                    </div>
                    {loading ? <Skeleton className="h-56 w-full" /> : (
                      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Requests per hour over the last 24 hours">
                        <defs>
                          <linearGradient id="grad-total" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#4338ca" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="#4338ca" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {[0, 1000, 2000, 3000, 4000].map(v => (
                          <g key={v}>
                            <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} stroke="#dce9ff" strokeWidth="1" />
                            <text x={PAD.l - 8} y={y(v) + 4} textAnchor="end" fontSize="12" fill="#777586" fontFamily="JetBrains Mono, monospace">{v === 0 ? '0' : `${v / 1000}k`}</text>
                          </g>
                        ))}
                        {xLabels.map(({ i, label }) => (
                          <text key={i} x={x(i)} y={H - 10} textAnchor="middle" fontSize="12" fill="#777586" fontFamily="JetBrains Mono, monospace">{label}</text>
                        ))}
                        <path d={`${line(liveTotal)} L${x(23)},${y(0)} L${x(0)},${y(0)} Z`} fill="url(#grad-total)" />
                        <path d={line(liveTotal)} fill="none" stroke="#4338ca" strokeWidth="2" strokeLinejoin="round" />
                        <path d={line(liveBlocked)} fill="none" stroke="#ba1a1a" strokeWidth="2" strokeDasharray="4 3" strokeLinejoin="round" />
                        <circle cx={x(23)} cy={y(liveTotal[23])} r="3.5" fill="#4338ca" />
                      </svg>
                    )}
                  </div>

                  <div className="lg:col-span-4 card card-hover flex flex-col justify-between gap-space-md">
                    <div>
                      <h2 className="text-t-card text-on-surface">Privacy score</h2>
                      <span className="text-t-caption text-secondary">Above the 85 policy threshold</span>
                    </div>
                    <div className="flex items-center justify-center my-auto">
                      {loading ? <Skeleton className="w-32 h-32 rounded-full" /> : (
                        <div className="relative w-32 h-32 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" fill="transparent" r="42" stroke="#e5eeff" strokeWidth="10" />
                            <circle className="transition-all duration-700" cx="50" cy="50" fill="transparent" r="42" stroke="#006b5f" strokeDasharray={circ} strokeDashoffset={circ * (1 - m.score / 100)} strokeLinecap="round" strokeWidth="10" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-t-title text-on-surface tabular-nums">{m.score.toFixed(1)}</span>
                            <span className="text-t-caption text-on-surface-variant">/ 100</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-space-md">
                  <h2 className="text-t-section text-on-surface">Recent alerts</h2>
                  <div className="flex flex-col gap-space-md">
                    {loading
                      ? Array.from({ length: 3 }, (_, i) => (
                        <div key={i} className="card flex items-start gap-space-md">
                          <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
                          <div className="flex flex-col gap-space-sm flex-1"><Skeleton className="h-4 w-48" /><Skeleton className={`h-3 ${i === 1 ? 'w-2/3' : 'w-full'}`} /></div>
                        </div>
                      ))
                      : baseAlerts.map(a => (
                        <div key={a.title} className="card card-hover flex items-start gap-space-md">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${a.tone}`}>
                            <span className="material-symbols-outlined text-[22px]">{a.icon}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-space-md">
                              <span className="text-t-card text-on-surface">{a.title}</span>
                              <span className="text-t-caption text-on-surface-variant whitespace-nowrap" data-now={now}>{ageLabel(a.ageMin + Math.floor((now - mountedAt) / 60000))}</span>
                            </div>
                            <p className="text-t-body text-on-surface-variant mt-space-xs">{a.body}</p>
                          </div>
                        </div>
                      ))}
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
