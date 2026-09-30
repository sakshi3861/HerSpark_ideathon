import React, { useMemo } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useTitle from '../hooks/useTitle';
import { apps, slugOf } from './VerifiedRegistry';
import { passBadge, revokeBadge, useBadge } from '../state/badge';

// Apps that have a live badge. A revoked badge overrides the registry list at once.
const liveIds = { cyclesafe: 'CycleSafe', finsafe: 'FinSafe' };

// One company's badge: is it trusted, and exactly why or why not.
export default function BadgeCheck() {
  const { app: slug } = useParams();
  const [query] = useSearchParams();
  const auditor = query.get('auditor') === '1';
  const app = apps.find(a => slugOf(a.name) === slug);
  const cycle = useBadge('cyclesafe');
  const fin = useBadge('finsafe');
  const live = { cyclesafe: cycle, finsafe: fin }[slug];
  useTitle(app ? `${app.name} Badge` : 'Badge');
  const checkedAt = useMemo(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), [app, live]);

  if (!app) return <Navigate to="/registry" replace />;

  const revoked = live?.status === 'failed';
  const checks = revoked
    ? [{ ok: false, text: 'A recent test saw private data leave the phone', icon: 'gpp_bad' }, ...app.checks]
    : app.checks;
  const passed = app.checks.filter(c => c.ok).length;
  const total = app.checks.length;
  const trusted = !revoked && app.state === 'trusted';

  const reason = revoked
    ? `${app.name} had its badge taken away because a recent test saw private data leave the phone.`
    : trusted
      ? `${app.name} passed ${passed} of ${total} checks. An app needs at least 3 to be trusted.`
      : `${app.name} passed only ${passed} of ${total} checks. An app needs at least 3 to be trusted.`;

  const rows = [
    ['Company', app.name],
    ['Result', trusted ? 'Trusted' : 'Not trusted'],
    ['Checks passed', revoked ? `${passed} of ${total}, then revoked` : `${passed} of ${total}`],
    ['Last checked', revoked ? 'Just now' : app.checked],
  ];

  return (
    <>
      <Header active="badge_check" />
      <main className="w-full pt-20 bg-background text-on-surface min-h-screen">
        <div className="page">
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-space-lg">
            <div>
              <h1 className="page-title">{app.name} badge</h1>
              <p className="page-sub">Whether {app.name} has earned SurakshaShield&apos;s trust, and why.</p>
            </div>

            <div className={`card-bordered flex items-center gap-space-md ${trusted ? 'border-secondary/40' : 'border-error/50 bg-error-container/30'}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${trusted ? 'bg-secondary-container/60 text-secondary' : 'bg-error text-on-error'}`}>
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{trusted ? 'verified' : 'gpp_bad'}</span>
              </div>
              <div>
                <div className="text-t-title">{trusted ? 'Trusted' : 'Not trusted'}</div>
                <p className="text-t-body text-on-surface-variant">{reason}</p>
              </div>
            </div>

            <div className="card-bordered flex flex-col gap-space-sm">
              {rows.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40">
                  <span className="text-t-body text-on-surface-variant">{k}</span>
                  <span className={`text-t-body ${k === 'Result' ? (trusted ? 'text-secondary' : 'text-error') : 'text-on-surface'}`}>{v}</span>
                </div>
              ))}
              <p className="text-t-caption text-on-surface-variant px-space-xs">This page was opened at {checkedAt}, so it always shows the latest result.</p>
            </div>

            <div className="card-bordered flex flex-col gap-space-sm">
              <h2 className="text-t-section">Why {app.name} is {trusted ? 'trusted' : 'not trusted'}</h2>
              <p className="text-t-body text-on-surface-variant">{app.summary}</p>
              {checks.map(c => (
                <div key={c.text} className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center gap-space-md">
                  <span className="material-symbols-outlined text-lg shrink-0 text-[#002855]" aria-hidden="true">{c.icon}</span>
                  <span className="text-t-body text-on-surface flex-1">{c.text}</span>
                  <span className={`material-symbols-outlined text-lg shrink-0 ${c.ok ? 'text-secondary' : 'text-error'}`} role="img" aria-label={c.ok ? 'Passed' : 'Failed'}>{c.ok ? 'check_circle' : 'cancel'}</span>
                </div>
              ))}
            </div>

            {auditor && liveIds[slug] && (
              <div className="card-bordered flex flex-col gap-space-sm">
                <h2 className="text-t-section">Auditor controls</h2>
                <p className="text-t-body text-on-surface-variant">Our auditors use these after each test. A change shows here, on the Trusted Apps page and inside {app.name}.</p>
                <div className="flex flex-col sm:flex-row gap-space-sm">
                  <button type="button" onClick={() => passBadge(slug)} className="btn-secondary">Record a passed test</button>
                  <button type="button" onClick={() => revokeBadge(slug)} className="btn-secondary text-error">Revoke the badge</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
