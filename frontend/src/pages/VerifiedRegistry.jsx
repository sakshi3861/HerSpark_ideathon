import React, { useMemo, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Skeleton from '../components/Skeleton';
import useLoading from '../hooks/useLoading';
import useTitle from '../hooks/useTitle';

const badge = {
  verified: ['verified', 'Verified', 'bg-secondary-container/40 border-secondary/30 text-secondary'],
  review: ['schedule', 'In review', 'bg-amber-50 border-amber-400 text-amber-800'],
  none: ['warning', 'Not verified', 'bg-error-container border-error/30 text-error'],
};

const apps = [
  {
    name: 'CycleSafe', state: 'verified', score: 94.2, checked: '2 days ago', summary: 'No sensitive fields reached third-party hosts in the last audit.',
    checks: [['check_circle', 'text-secondary', 'No health fields sent to ad SDKs'], ['lock', 'text-secondary', 'ML-KEM-768 for vault sync'], ['gavel', 'text-primary', 'Consent gate enforced before first sync']],
  },
  {
    name: 'GenericTracker', state: 'none', score: 38.6, checked: '9 days ago', summary: 'Ad SDKs receive user inputs in plain text.',
    checks: [['cancel', 'text-error', 'Ovulation date sent to 4 ad hosts'], ['no_encryption', 'text-error', 'Telemetry payload not encrypted'], ['person_off', 'text-error', 'Profiling starts before consent']],
  },
  {
    name: 'PeriodPal', state: 'verified', score: 81.3, checked: '5 days ago', summary: 'Minor finding: crash reports include a device model string.',
    checks: [['check_circle', 'text-secondary', 'No health fields sent to ad SDKs'], ['warning', 'text-amber-700', 'Device model in crash reports'], ['lock', 'text-secondary', 'TLS 1.3 with certificate pinning']],
  },
  {
    name: 'OvuGuide', state: 'review', score: 63.9, checked: '1 day ago', summary: 'Re-audit in progress after an SDK update on 12 Mar.',
    checks: [['schedule', 'text-amber-700', 'New analytics SDK under review'], ['check_circle', 'text-secondary', 'Location coarsened to city level'], ['cancel', 'text-error', 'Advertising ID still collected']],
  },
  {
    name: 'HerHealth Diary', state: 'verified', score: 88.1, checked: '3 weeks ago', summary: 'Audit is older than 30 days; a re-check is scheduled.',
    checks: [['check_circle', 'text-secondary', 'Symptom logs stay on device'], ['lock', 'text-secondary', 'Encrypted cloud backup'], ['schedule', 'text-amber-700', 'Re-audit due in 9 days']],
  },
  {
    name: 'MoonCalendar', state: 'none', score: 41.2, checked: '2 weeks ago', summary: 'Location and cycle data shared with an attribution SDK.',
    checks: [['cancel', 'text-error', 'Precise GPS sent to attribution host'], ['check_circle', 'text-secondary', 'Login uses PKCE'], ['person_off', 'text-error', 'No opt-out for analytics']],
  },
];

export default function VerifiedRegistry() {
  useTitle('Verified Registry');
  const loading = useLoading(700);
  const [query, setQuery] = useState('');
  const [checking, setChecking] = useState(false);
  const inputRef = useRef(null);
  const verifyApp = () => {
    if (checking) return;
    setChecking(true);
    window.setTimeout(() => setChecking(false), 700);
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? apps.filter(a => a.name.toLowerCase().includes(q)) : apps;
  }, [query]);

  return (
    <>
      <Header active="verified_registry" />
      <main className="w-full pt-20 bg-background text-on-surface min-h-screen">
        <div className="page page-stack">
          <section className="flex flex-col items-center text-center max-w-3xl mx-auto w-full">
            <h1 className="page-title">Verified Registry</h1>
            <p className="page-sub">Audit results for health and wellness apps. Scores are from sandbox audits.</p>

            <div className="w-full mt-space-lg card-bordered p-space-sm focus-within:border-primary/40 transition-colors">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm">
                <div className="flex items-center gap-space-md pl-space-md flex-1">
                  <span className="material-symbols-outlined text-outline text-xl">search</span>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    className="w-full h-12 bg-transparent text-t-body text-on-surface placeholder:text-outline focus:outline-none"
                    id="registry-search-input"
                    placeholder="Search app name, e.g. CycleSafe"
                    type="text"
                    aria-label="Search apps"
                  />
                  {query && (
                    <button
                      aria-label="Clear search"
                      className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container px-space-xs py-space-xs rounded-lg transition-colors"
                      id="search-clear-btn"
                      type="button"
                      onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  )}
                </div>
                <button className="btn-primary" id="check-app-btn" type="button" onClick={verifyApp} disabled={checking}>
                  {checking ? (
                    <><span className="material-symbols-outlined text-lg animate-spin">refresh</span><span>Checking…</span></>
                  ) : (
                    <><span className="material-symbols-outlined text-lg">verified_user</span><span>Check app</span></>
                  )}
                </button>
              </div>
            </div>
            {!loading && <p className="text-t-caption text-on-surface-variant mt-space-md">{results.length} of {apps.length} apps</p>}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg items-stretch">
            {loading && Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="card-bordered flex flex-col gap-space-md">
                <div className="flex justify-between"><Skeleton className="h-7 w-40" /><Skeleton className="h-7 w-28 rounded-full" /></div>
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className={`h-10 ${i % 2 ? 'w-3/4' : 'w-full'}`} />
              </div>
            ))}

            {!loading && results.map(app => {
              const [icon, label, tone] = badge[app.state];
              const scoreTone = app.score >= 80 ? 'text-secondary' : app.score >= 60 ? 'text-amber-700' : 'text-error';
              return (
                <article key={app.name} className="card-bordered card-hover flex flex-col gap-space-lg">
                  <div className="flex items-center justify-between pb-space-md border-b border-outline-variant/30">
                    <div>
                      <h2 className="text-t-card text-on-surface">{app.name}</h2>
                      <p className="text-t-caption text-on-surface-variant">Last audited {app.checked}</p>
                    </div>
                    <div className={`inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full border ${tone}`}>
                      <span className="material-symbols-outlined text-base" aria-hidden="true">{icon}</span>
                      <span className="text-t-status uppercase">{label}</span>
                    </div>
                  </div>
                  <div className="p-space-md bg-surface-container-low rounded-xl flex items-center justify-between gap-space-md border border-outline-variant/40">
                    <div>
                      <span className={`text-t-card tabular-nums ${scoreTone}`}>{app.score.toFixed(1)} / 100</span>
                      <p className="text-t-caption text-on-surface-variant mt-space-xs">{app.summary}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-space-sm">
                    {app.checks.map(([ic, color, text]) => (
                      <div key={text} className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center gap-space-md">
                        <span className={`material-symbols-outlined text-lg ${color}`} aria-hidden="true">{ic}</span>
                        <span className="text-t-body text-on-surface">{text}</span>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}

            {!loading && results.length === 0 && (
              <div className="lg:col-span-2 card-bordered flex flex-col items-center text-center gap-space-sm py-space-2xl">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-outline"><span className="material-symbols-outlined">search_off</span></div>
                <div className="text-t-card">No apps match &ldquo;{query}&rdquo;</div>
                <p className="text-t-body text-on-surface-variant">Check the spelling, or apply to have the app audited.</p>
                <button type="button" className="btn-secondary mt-space-sm" onClick={() => setQuery('')}>Clear search</button>
              </div>
            )}
          </section>

          <section className="card-bordered flex flex-col sm:flex-row items-center justify-between gap-space-lg">
            <div>
              <h2 className="text-t-section">Apply for an audit</h2>
              <p className="mt-space-xs text-t-body text-on-surface-variant">Integrate the SDK, run the sandbox audit, and get listed once the score is 80 or above.</p>
            </div>
            <a className="btn-primary shrink-0" data-path="integration-guide" href="#">
              <span className="material-symbols-outlined text-lg">security</span>
              <span>Start audit</span>
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
