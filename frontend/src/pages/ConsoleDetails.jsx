import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConsoleSidebarNav from '../components/ConsoleSidebarNav';
import StatusPill from '../components/StatusPill';
import useTitle from '../hooks/useTitle';
import { useMetrics } from '../data/metrics';
import { baseAlerts } from '../data/alerts';
import { useEvents } from '../state/events';
import { ago } from '../data/traffic';

// One short list behind each number on the Overview page.
const pages = {
  checks: { title: 'Data checks', sub: 'Every time an app tried to send data out in the last 24 hours.', count: m => m.events },
  stopped: { title: 'Stopped', sub: 'Private data that never left the phone.', count: m => m.leaks, only: 'Blocked' },
  blurred: { title: 'Blurred', sub: 'Private details made less exact before sharing.', count: m => m.masked, only: 'Masked' },
  encrypted: { title: 'Encrypted', sub: 'Data sent out sealed, so only the receiver can read it.', count: m => m.encrypted, only: 'Encrypted' },
  attention: { title: 'Needs attention', sub: 'Privacy warnings active right now.', count: () => 3 },
};

// Typical background activity, so the list is never empty. Newest first.
const background = [
  { ageMin: 4, who: 'Facebook Graph API', what: 'Tried to send a fertility event', status: 'Blocked' },
  { ageMin: 7, who: 'Google Analytics 4', what: 'Screen view', status: 'Allowed' },
  { ageMin: 11, who: 'AppsFlyer', what: 'Tried to read your phone’s ID', status: 'Masked' },
  { ageMin: 13, who: 'Own Health Vault', what: 'Saved a log entry', status: 'Encrypted' },
  { ageMin: 18, who: 'Facebook Graph API', what: 'Tried to send a symptom event', status: 'Blocked' },
  { ageMin: 22, who: 'AppsFlyer', what: 'Asked for exact location, city shared', status: 'Masked' },
  { ageMin: 26, who: 'HealthPlus', what: 'Approved data shared', status: 'Encrypted' },
  { ageMin: 29, who: 'Google Analytics 4', what: 'App opened', status: 'Allowed' },
  { ageMin: 33, who: 'Unknown website', what: 'Tried to receive app data', status: 'Blocked' },
  { ageMin: 38, who: 'Own Health Vault', what: 'Saved a log entry', status: 'Encrypted' },
  { ageMin: 44, who: 'Firebase Crashlytics', what: 'Crash report', status: 'Allowed' },
  { ageMin: 51, who: 'Ad company', what: 'Tried to send your balance and phone ID', status: 'Blocked' },
  { ageMin: 55, who: 'QuickBite', what: 'Approved money details shared', status: 'Encrypted' },
  { ageMin: 58, who: 'Ad company', what: 'Asked for exact location, city shared', status: 'Masked' },
];

const statusOf = { blocked: 'Blocked', masked: 'Masked', shared: 'Encrypted', allowed: 'Allowed', leaked: 'Leaked' };
const SHOWN = 10;

export default function ConsoleDetails() {
  const { kind } = useParams();
  const page = pages[kind];
  useTitle(page ? page.title : 'Details');
  const m = useMetrics();
  const real = useEvents();
  if (!page) return <Navigate to="/console" replace />;

  const now = Date.now();
  const fromApps = real
    .filter(e => statusOf[e.action] && (!page.only || statusOf[e.action] === page.only))
    .map(e => ({ key: e.id, when: ago(e.ts, now), who: e.dest, what: e.note || e.event, status: statusOf[e.action] }))
    .reverse();
  const pool = background.filter(b => !page.only || b.status === page.only);
  const total = page.count(m);
  // Repeat the typical activity, a little older each round, until the list is as long as the number says (up to 10).
  const canned = Array.from({ length: Math.max(0, Math.min(SHOWN, total) - fromApps.length) }, (_, i) => {
    const b = pool[i % pool.length];
    const age = b.ageMin + Math.floor(i / pool.length) * 17;
    return { key: `bg-${i}`, when: age < 60 ? `${age} min ago` : `1 hr ${age - 60} min ago`, who: b.who, what: b.what, status: b.status };
  });
  const rows = [...fromApps, ...canned].slice(0, SHOWN);
  const warnings = baseAlerts.filter(a => a.tone.includes('error')).concat(baseAlerts.filter(a => !a.tone.includes('error'))).slice(0, 3);

  return (
    <>
      <Header active="console_overview" />
      <main className="w-full pt-20 bg-background min-h-screen">
        <div className="page">
          <div className="flex flex-col lg:flex-row items-start gap-space-lg w-full">
            <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-space-md">
                <div className="flex flex-col px-space-xs">
                  <span className="text-t-caption text-on-surface-variant tracking-wider uppercase">Live Monitor</span>
                  <span className="text-t-section text-on-surface">Overview</span>
                </div>
                <ConsoleSidebarNav active="overview" />
              </div>
            </aside>

            <section className="flex-1 min-w-0 flex flex-col gap-space-lg">
              <div>
                <Link to="/console" className="inline-flex items-center gap-space-xs text-t-caption text-primary hover:underline">
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>Back to Overview
                </Link>
                <h1 className="page-title mt-space-sm">{page.title}</h1>
                <p className="page-sub">{page.sub}</p>
              </div>

              <div className="card-bordered flex flex-col gap-space-sm">
                {kind === 'attention' ? (
                  warnings.map(a => (
                    <div key={a.title} className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${a.tone}`}>
                        <span className="material-symbols-outlined text-[22px]">{a.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-t-card text-on-surface">{a.title}</div>
                        <p className="text-t-body text-on-surface-variant">{a.body}</p>
                      </div>
                      <span className="text-t-caption text-on-surface-variant whitespace-nowrap">{a.ageMin} min ago</span>
                    </div>
                  ))
                ) : (
                  <>
                    <p className="text-t-caption text-on-surface-variant">Showing {rows.length} of {total}, newest first</p>
                    {rows.map(r => (
                      <div key={r.key} className="flex items-center gap-space-md p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40">
                        <div className="flex-1 min-w-0">
                          <div className="text-t-card text-on-surface truncate">{r.who}</div>
                          <p className="text-t-body text-on-surface-variant truncate">{r.what}</p>
                        </div>
                        <span className="text-t-caption text-on-surface-variant whitespace-nowrap hidden sm:inline">{r.when}</span>
                        <StatusPill status={r.status} />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
