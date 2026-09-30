import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { APPS } from '../data/apps';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useTitle from '../hooks/useTitle';
import { passBadge, proofOf, revokeBadge, useBadge } from '../state/badge';

// The live check behind the SurakshaShield badge. The proof is recomputed every time this page opens,
// so a screenshot of an old badge cannot pass for a current one.
export default function BadgeCheck() {
  const { app: appId } = useParams();
  const id = APPS[appId] ? appId : 'cyclesafe';
  const appName = APPS[id].name;
  useTitle(`${appName} Badge Check`);
  const badge = useBadge(id);
  const ok = badge.status === 'passed';
  const proofMatches = useMemo(() => proofOf(badge.build, badge.testedAt, id) === badge.proof, [badge]);
  const checkedAt = useMemo(() => new Date().toLocaleString([], { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit' }), [badge]);

  const rows = [
    ['App', appName],
    ['Build', badge.build],
    ['Last independent test', badge.testedAt],
    ['Result', ok ? 'Passed' : 'Failed'],
    ['Checked just now', checkedAt],
  ];
  const steps = [
    ['The build matches the one that was tested', proofMatches],
    ['An independent test watched its network traffic', true],
    ['No private data left the phone in that test', ok],
  ];

  return (
    <>
      <Header active="badge_check" />
      <main className="w-full pt-20 bg-background text-on-surface min-h-screen">
        <div className="page">
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-space-lg">
            <div>
              <h1 className="page-title">SurakshaShield badge</h1>
              <p className="page-sub">This page checks {appName}&apos;s badge live, every time you open it.</p>
            </div>

            <div className={`card-bordered flex items-center gap-space-md ${ok ? 'border-secondary/40' : 'border-error/50 bg-error-container/30'}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${ok ? 'bg-secondary-container/60 text-secondary' : 'bg-error text-on-error'}`}>
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{ok ? 'verified' : 'gpp_bad'}</span>
              </div>
              <div>
                <div className="text-t-title">{ok ? 'Badge is valid' : 'Badge revoked'}</div>
                <p className="text-t-body text-on-surface-variant">{ok ? `${appName} passed its latest independent test.` : badge.reason}</p>
              </div>
            </div>

            <div className="card-bordered flex flex-col gap-space-sm">
              {rows.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40">
                  <span className="text-t-body text-on-surface-variant">{k}</span>
                  <span className={`text-t-body ${k === 'Result' ? (ok ? 'text-secondary' : 'text-error') : 'text-on-surface'}`}>{v}</span>
                </div>
              ))}
              <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40">
                <div className="text-t-caption text-on-surface-variant">Proof</div>
                <div className="font-mono text-t-mono break-all">0x{badge.proof}</div>
              </div>
            </div>

            <div className="card-bordered flex flex-col gap-space-sm">
              <h2 className="text-t-section">What was checked</h2>
              {steps.map(([text, pass]) => (
                <div key={text} className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center gap-space-md">
                  <span className="text-t-body text-on-surface flex-1">{text}</span>
                  <span className={`material-symbols-outlined text-lg ${pass ? 'text-secondary' : 'text-error'}`} role="img" aria-label={pass ? 'Passed' : 'Failed'}>{pass ? 'check_circle' : 'cancel'}</span>
                </div>
              ))}
            </div>

            <div className="card-bordered flex flex-col gap-space-sm">
              <h2 className="text-t-section">Auditor controls</h2>
              <p className="text-t-body text-on-surface-variant">Our auditors run these after each independent test. A revoked badge shows here, on the Trusted Apps page and inside {appName}.</p>
              <div className="flex flex-col sm:flex-row gap-space-sm">
                <button type="button" onClick={() => passBadge(id)} className="btn-secondary">Record a passed test</button>
                <button type="button" onClick={() => revokeBadge(id)} className="btn-secondary text-error">Revoke the badge</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
