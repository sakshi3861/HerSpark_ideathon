import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import Skeleton from '../components/Skeleton';
import ConsoleSidebarNav from '../components/ConsoleSidebarNav';
import useLoading from '../hooks/useLoading';
import useNow from '../hooks/useNow';
import useTitle from '../hooks/useTitle';
import { Link } from 'react-router-dom';
import { buildKpis, fmt, kindOf, useMetrics } from '../data/metrics';
import { baseAlerts } from '../data/alerts';

const ageLabel = min => (min < 60 ? `${min} min ago` : `${Math.min(99, Math.floor(min / 60))} hr ${min % 60} min ago`);

export default function ConsoleOverview() {
  useTitle('Live Monitor');
  const loading = useLoading(750);
  const m = useMetrics();
  const now = useNow(1000);
  const [mountedAt] = useState(() => Date.now());
  const outcomes = [
    { kind: 'encrypted', label: 'Encrypted', value: m.encrypted, color: '#b9b4f0', note: 'Sent out sealed, so only the receiver can read it.' },
    { kind: 'blurred', label: 'Blurred', value: m.masked, color: '#a9c8f5', note: 'Private details made less exact first, like city instead of address.' },
    { kind: 'stopped', label: 'Stopped', value: m.leaks, color: '#a8dccf', note: 'Private data that never left the phone.' },
  ];
  const maxOutcome = Math.max(1, ...outcomes.map(o => o.value));
  const sinceUpdate = Math.min(99, Math.max(0, Math.round((now - m.updatedAt) / 1000)));
  const circ = 263.9;

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
                      <span className="text-t-caption text-on-surface-variant tracking-wider uppercase">Live Monitor</span>
                      <span className="text-t-section text-on-surface">Overview</span>
                    </div>
                  </div>
                  <ConsoleSidebarNav active="overview" />
                </div>
              </aside>

              <section className="flex-1 min-w-0 flex flex-col gap-space-xl">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-md">
                  <div>
                    <h1 className="page-title">Live Monitor Overview</h1>
                    <p className="page-sub">Requests intercepted in the last 24 hours.</p>
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
                    : buildKpis(m).map(({ key, ...kpi }) => <Link key={key} to={`/console/details/${kindOf[key]}`} className="block"><StatCard {...kpi} /></Link>)}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
                  <div className="lg:col-span-8 card card-hover flex flex-col gap-space-md">
                    <div>
                      <h2 className="text-t-card text-on-surface">What happened to each request</h2>
                      <p className="text-t-body text-on-surface-variant">What we did with the private data apps tried to send in the last 24 hours.</p>
                    </div>
                    {loading ? <Skeleton className="h-56 w-full" /> : (
                      <div className="flex flex-col gap-space-md justify-center flex-1">
                        {outcomes.map(o => (
                          <Link key={o.label} to={`/console/details/${o.kind}`} className="flex flex-col gap-space-xs rounded-xl -mx-space-sm px-space-sm py-space-xs hover:bg-surface-container-low transition-colors">
                            <div className="flex items-baseline justify-between gap-space-md">
                              <span className="text-t-body text-on-surface">{o.label}</span>
                              <span className="text-t-card text-on-surface tabular-nums">{fmt(o.value)}</span>
                            </div>
                            <div className="h-3 rounded-full bg-[#f1f2f7] overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(o.value ? 2 : 0, (o.value / maxOutcome) * 100)}%`, background: o.color }} />
                            </div>
                            <span className="text-t-caption text-on-surface-variant">{o.note}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-4 card card-hover flex flex-col justify-between gap-space-md">
                    <div>
                      <h2 className="text-t-card text-on-surface">Privacy score</h2>
                      <span className={`text-t-caption ${m.score >= 85 ? 'text-secondary' : 'text-error'}`}>{m.score >= 85 ? 'Above' : 'Below'} the 85 policy threshold</span>
                    </div>
                    <div className="flex items-center justify-center my-auto">
                      {loading ? <Skeleton className="w-32 h-32 rounded-full" /> : (
                        <div className="relative w-32 h-32 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" fill="transparent" r="42" stroke="#e5eeff" strokeWidth="10" />
                            <circle className="transition-all duration-700" cx="50" cy="50" fill="transparent" r="42" stroke="#006b5f" strokeDasharray={circ} strokeDashoffset={circ * (1 - m.score / 100)} strokeLinecap="round" strokeWidth="10" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-t-title text-on-surface tabular-nums">{m.score}%</span>
                            <span className="text-t-caption text-on-surface-variant">kept private</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-t-caption text-on-surface-variant">Out of all requests for private data, the share we stopped or blurred.</p>
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
