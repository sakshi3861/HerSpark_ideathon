import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConsoleSidebarNav from '../components/ConsoleSidebarNav';
import Skeleton from '../components/Skeleton';
import useLoading from '../hooks/useLoading';
import useNow from '../hooks/useNow';
import useTitle from '../hooks/useTitle';
import { ago } from '../data/traffic';
import { recalculate, useEvents, verifyChain } from '../state/events';

// Tap the status to see, in one sentence, what it means.
// Simple entry numbers. The five examples come first, so your apps' events continue from 6 (kept under 100).
const eventNo = idx => ((5 + idx) % 99) + 1;

const short = h => `0x${h.slice(0, 10)}…${h.slice(-8)}`;

function HashStatus({ ok = true, label, tip, original, changed }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block">
      <button type="button" onClick={() => setOpen(o => !o)} onBlur={() => setOpen(false)} aria-expanded={open} className={`text-t-status underline decoration-dotted underline-offset-4 ${ok ? 'text-secondary' : 'text-error'}`}>{label}</button>
      {open && (
        <span role="tooltip" className="absolute right-0 top-full mt-space-xs z-10 w-72 p-space-sm rounded-lg bg-inverse-surface text-inverse-on-surface text-t-caption normal-case text-left shadow-lg flex flex-col gap-space-xs">
          <span>{tip}</span>
          {original && (
            <>
              <span className="font-mono text-t-mono break-all"><span className="opacity-70">Original: </span>{original}</span>
              <span className="font-mono text-t-mono break-all text-error-container"><span className="opacity-70 text-inverse-on-surface">Changed: </span>{changed}</span>
            </>
          )}
        </span>
      )}
    </span>
  );
}

const OK_TIP = 'Nothing in this event has been changed since it was saved.';
const BAD_TIP = 'This event was changed after it was saved.';
const LINEAGE_TIP = 'An earlier event was changed, so this one can no longer be trusted.';

export default function ConsoleAuditLedger() {
  useTitle('Audit Ledger');
  const loading = useLoading(850);
  const now = useNow(15000);
  const [base] = useState(() => Date.now());
  const age = sec => ago(base - sec * 1000, now);
  const [checked, setChecked] = useState(false);
  const live = useEvents();
  const badAt = verifyChain(live);
  const liveBlocks = live.slice(-8).map((e, i, arr) => ({ ...e, no: 104917 + live.length - arr.length + i, idx: live.length - arr.length + i, valid: badAt === -1 || live.length - arr.length + i < badAt }));
  // The first changed entry. Every block after it can no longer be trusted either.
  const broken = badAt === -1 ? null : { original: short(live[badAt].hash), changed: short(recalculate(live[badAt])) };

  return (
    <>
      <Header active="console_audit_ledger" />
      <main className="w-full pt-20 bg-background min-h-screen">
        <div className="page">
          <div className="flex flex-col lg:flex-row items-start gap-space-lg w-full">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-space-md">
                <div className="flex flex-col px-space-xs">
                  <span className="text-t-caption text-on-surface-variant tracking-wider uppercase">Live Monitor</span>
                  <span className="text-t-section text-on-surface">Audit Ledger</span>
                </div>
                <ConsoleSidebarNav active="audit" variant="audit" />
              </div>
            </aside>

            {/* Main Content */}
            <section className="flex-1 min-w-0 flex flex-col gap-space-xl">
              <div className="card flex flex-col gap-space-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                  <div>
                    <h1 className="page-title">Audit Ledger</h1>
                    <p className="page-sub">
                      A record of everything your apps did. Each event is linked to the one before it, so any change shows up.
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-space-xs">
                    <button
                      onClick={() => setChecked(true)}
                      className="btn bg-primary-container hover:bg-primary text-on-primary shadow-sm"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">fact_check</span>
                      <span>Check the record</span>
                    </button>
                    {checked && (
                      <span className={`text-t-caption ${badAt === -1 ? 'text-secondary' : 'text-error'}`}>
                        {badAt === -1 ? 'All events check out. Nothing was changed.' : `Event ${eventNo(badAt)} was changed after it was saved.`}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Block Chain Visualization (Trimmed to 4 Blocks) */}
              {loading ? (
                <div className="flex flex-col gap-space-lg">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className="card flex flex-col gap-space-md">
                      <div className="flex justify-between"><Skeleton className="h-6 w-36" /><Skeleton className="h-4 w-24" /></div>
                      <Skeleton className={`h-4 ${i % 2 ? 'w-2/3' : 'w-5/6'}`} />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : (
              <div className="relative flex flex-col gap-space-lg">
                {/* Block 1 */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
                  <div className="flex items-center justify-between pb-space-md mb-space-md border-b border-outline-variant/30">
                    <div className="flex items-center"><span className="px-space-md py-space-xs rounded-lg bg-primary text-on-primary text-t-card">Event 1</span><span className="text-t-caption text-on-surface-variant ml-space-md">{age(840)}</span></div>
                    <HashStatus label="HASH VALID" tip={OK_TIP} />
                  </div>
                  <div className="text-t-body text-on-surface">Consent update: Analytics Provider access to precise location revoked</div>
                </div>

                {/* Block 2 */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
                  <div className="flex items-center justify-between pb-space-md mb-space-md border-b border-outline-variant/30">
                    <div className="flex items-center"><span className="px-space-md py-space-xs rounded-lg bg-primary text-on-primary text-t-card">Event 2</span><span className="text-t-caption text-on-surface-variant ml-space-md">{age(540)}</span></div>
                    <HashStatus label="HASH VALID" tip={OK_TIP} />
                  </div>
                  <div className="text-t-body text-on-surface">Encrypted sync: Reproductive biomarker vault to Own Server</div>
                </div>

                {/* Block 3 */}
                <div className="rounded-2xl p-space-lg bg-error-container/30 shadow-sm border border-error">
                  <div className="flex items-center justify-between pb-space-md mb-space-md border-b border-outline-variant/30">
                    <div className="flex items-center"><span className="px-space-md py-space-xs rounded-lg bg-error text-on-error text-t-card">Event 3</span><span className="text-t-caption text-on-surface-variant ml-space-md">{age(360)}</span></div>
                    <HashStatus ok={false} label="HASH MISMATCH DETECTED" tip={BAD_TIP} original="0x89ab12f04c…990099ea" changed="0x4f1c07be92…a1f0b2c3" />
                  </div>
                  <div className="text-t-body text-on-surface">Sensitive event blocked: LogFertility to Facebook Graph API</div>
                </div>

                {/* Block 4 */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
                  <div className="flex items-center justify-between pb-space-md mb-space-md border-b border-outline-variant/30">
                    <div className="flex items-center"><span className="px-space-md py-space-xs rounded-lg bg-primary text-on-primary text-t-card">Event 4</span><span className="text-t-caption text-on-surface-variant ml-space-md">{age(130)}</span></div>
                    <HashStatus label="HASH VALID" tip={OK_TIP} />
                  </div>
                  <div className="text-t-body text-on-surface">Allowed event: screen_view sanitized telemetry to Google Analytics</div>
                </div>

                {/* Block 5 */}
                <div className="rounded-2xl p-space-lg bg-error-container/30 shadow-sm border border-error">
                  <div className="flex items-center justify-between pb-space-md mb-space-md border-b border-outline-variant/30">
                    <div className="flex items-center"><span className="px-space-md py-space-xs rounded-lg bg-error text-on-error text-t-card">Event 5</span><span className="text-t-caption text-on-surface-variant ml-space-md">{age(45)}</span></div>
                    <HashStatus ok={false} label="HASH MISMATCH DETECTED" tip={BAD_TIP} original="0x54ec12ab99…1ee1800b" changed="0xc90d3e7a15…d24f6e08" />
                  </div>
                  <div className="text-t-body text-on-surface">Consent update: Ad company access to account balance revoked</div>
                </div>
              </div>
              )}

              {/* Blocks written by the apps in the other tabs. Each one is chained to the one before it. */}
              {!loading && (
                <div className="flex flex-col gap-space-lg">
                  {[...liveBlocks].reverse().map(e => (
                    <div key={e.id} className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
                      <div className="flex items-center justify-between pb-space-md mb-space-md border-b border-outline-variant/30">
                        <div className="flex items-center"><span className="px-space-md py-space-xs rounded-lg bg-primary text-on-primary text-t-card">Event {eventNo(e.idx)}</span><span className="text-t-caption text-on-surface-variant ml-space-md">{ago(e.ts, now)}</span></div>
                        <HashStatus ok={e.valid} label={e.valid ? 'HASH VALID' : 'HASH MISMATCH DETECTED'} tip={e.valid ? OK_TIP : e.idx === badAt ? BAD_TIP : LINEAGE_TIP} original={broken && !e.valid ? broken.original : undefined} changed={broken && !e.valid ? broken.changed : undefined} />
                      </div>
                      <div className="text-t-body text-on-surface">{e.source}: {e.event.replace(/_/g, ' ')} to {e.dest} ({e.action}){e.note ? `. ${e.note}` : ''}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
