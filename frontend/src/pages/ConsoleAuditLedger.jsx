import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConsoleSidebarNav from '../components/ConsoleSidebarNav';

export default function ConsoleAuditLedger() {
  const [isTampered, setIsTampered] = useState(true);
  const [isolated, setIsolated] = useState(false);

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
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold tracking-wider uppercase">Console</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">Audit Ledger</span>
                </div>
                <ConsoleSidebarNav active="audit" variant="audit" />
              </div>
            </aside>

            {/* Main Content */}
            <section className="flex-1 min-w-0 flex flex-col gap-space-xl">
              <div className="card flex flex-col gap-space-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                  <div>
                    <h1 className="page-title">Tamper-Evident Audit Ledger</h1>
                    <p className="page-sub">
                      Cryptographically verified, immutable SHA-3 hash chain of outbound telemetry events.
                    </p>
                  </div>

                  {/* 2 Action Buttons */}
                  <div className="flex items-center gap-space-sm">
                    <button
                      onClick={() => setIsTampered(false)}
                      className="btn bg-primary-container hover:bg-primary text-on-primary shadow-sm"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">verified_user</span>
                      <span>Verify Integrity</span>
                    </button>

                    <button
                      onClick={() => setIsTampered(value => !value)}
                      className="btn btn-secondary"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-error text-[18px]">gpp_maybe</span>
                      <span>{isTampered ? 'Active Breach Simulation' : 'Simulate Tampering'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Tamper Alert Banner */}
              {isTampered && (
                <div className="bg-error-container text-on-error-container p-space-lg rounded-2xl shadow-sm transition-all">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
                    <div className="flex items-start gap-space-md">
                      <div className="w-10 h-10 rounded-full bg-error text-on-error flex items-center justify-center flex-shrink-0 mt-space-xs">
                        <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold bg-error text-on-error px-space-sm py-space-xs rounded">CRITICAL BREACH DETECTED</span>
                        <h2 className="font-headline-sm text-headline-sm font-bold text-on-error-container mt-space-xs">
                          Stored hash does not match calculated merkle lineage at Block #104,914.
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-space-xs flex-shrink-0">
                      <button onClick={() => setIsolated(true)} className={`btn bg-error text-on-error ${isolated ? 'opacity-70' : ''}`} type="button">
                        {isolated ? 'Node Isolated' : 'Isolate Node'}
                      </button>
                      <button onClick={() => { setIsTampered(false); setIsolated(false); }} className="btn bg-surface-container-lowest text-on-error-container" type="button">
                        Restore Canonical Chain
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Block Chain Visualization (Trimmed to 4 Blocks) */}
              <div className="relative flex flex-col gap-space-lg">
                {/* Block 1 */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
                  <div className="flex items-center justify-between pb-space-md mb-space-md border-b border-outline-variant/30">
                    <span className="px-space-md py-space-xs rounded-lg bg-primary text-on-primary font-label-md font-semibold">BLOCK #104,912</span>
                    <span className="text-secondary font-label-sm font-semibold">VALID SIGNATURE</span>
                  </div>
                  <div className="font-body-md text-body-md font-medium text-on-surface">Duress PIN silent trigger: Decoy logs served & emergency beacon sent</div>
                  <div className="font-mono text-body-sm text-on-surface-variant mt-space-sm">Hash: 0x9911e3b5a41fd2890b07e8a93ef07a1102e3c7e2</div>
                </div>

                {/* Block 2 */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
                  <div className="flex items-center justify-between pb-space-md mb-space-md border-b border-outline-variant/30">
                    <span className="px-space-md py-space-xs rounded-lg bg-primary text-on-primary font-label-md font-semibold">BLOCK #104,913</span>
                    <span className="text-secondary font-label-sm font-semibold">VALID SIGNATURE</span>
                  </div>
                  <div className="font-body-md text-body-md font-medium text-on-surface">Encrypted sync: Reproductive biomarker vault to Own Server</div>
                  <div className="font-mono text-body-sm text-on-surface-variant mt-space-sm">Hash: 0x89ab12f04ce8e721a9954d6a89c02ff3990099ea</div>
                </div>

                {/* Block 3 - Tamper Point */}
                <div className={`rounded-2xl p-space-lg transition-all ${isTampered ? 'bg-error-container/30 shadow-sm border border-error' : 'bg-surface-container-lowest shadow-sm'}`}>
                  <div className="flex items-center justify-between pb-space-md mb-space-md border-b border-outline-variant/30">
                    <span className={`px-space-md py-space-xs rounded-lg font-label-md font-semibold ${isTampered ? 'bg-error text-on-error' : 'bg-primary text-on-primary'}`}>BLOCK #104,914</span>
                    <span className={`font-label-sm font-semibold ${isTampered ? 'text-error' : 'text-secondary'}`}>{isTampered ? 'HASH MISMATCH DETECTED' : 'VALID SIGNATURE'}</span>
                  </div>
                  <div className="font-body-md text-body-md font-medium text-on-surface">Sensitive event blocked: LogFertility to Facebook Graph API</div>
                  {isTampered && (
                    <div className="mt-space-md p-space-md bg-surface-container-lowest rounded-xl font-mono text-body-sm text-error">
                      Expected: 0x89ab12f04ce8e721a9954d6a89c02ff3990099ea<br />
                      Recalculated: 0xDEADBEEF47710984cca90114009aeeff107710a1 (FORGED)
                    </div>
                  )}
                </div>

                {/* Block 4 */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
                  <div className="flex items-center justify-between pb-space-md mb-space-md border-b border-outline-variant/30">
                    <span className="px-space-md py-space-xs rounded-lg bg-primary text-on-primary font-label-md font-semibold">BLOCK #104,915</span>
                    <span className={`font-label-sm font-semibold ${isTampered ? 'text-error' : 'text-secondary'}`}>{isTampered ? 'BROKEN LINEAGE' : 'VALID SIGNATURE'}</span>
                  </div>
                  <div className="font-body-md text-body-md font-medium text-on-surface">Allowed event: screen_view sanitized telemetry to Google Analytics</div>
                  <div className="font-mono text-body-sm text-on-surface-variant mt-space-sm">Hash: 0x54ec12ab9901178a94ee1800ba</div>
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
