import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function VerifiedRegistry() {
  const [query, setQuery] = useState('');
  const [checking, setChecking] = useState(false);
  const inputRef = useRef(null);
  const verifyApp = () => {
    if (checking) return;
    setChecking(true);
    window.setTimeout(() => setChecking(false), 700);
  };

  return (
    <>
      <Header active="verified_registry" />
      <main className={"w-full pt-20 bg-background text-on-surface min-h-screen"}>
        <div className={"page page-stack"}>
          {/* Header & Search Bar */}
          <section className={"flex flex-col items-center text-center max-w-3xl mx-auto w-full"}>
            <h1 className={"page-title"}>
              Verified Privacy Registry
            </h1>
            <p className={"page-sub"}>
              Verify whether an app protects user health data or leaks it to third-party ad brokers.
            </p>

            <div className={"w-full mt-space-lg card-bordered p-space-sm"}>
              <div className={"flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm"}>
                <div className={"flex items-center gap-space-md pl-space-md flex-1"}>
                  <span className={"material-symbols-outlined text-secondary text-xl"}>search</span>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    className={"w-full h-12 bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none"}
                    id={"registry-search-input"}
                    placeholder={"Search app name (e.g. CycleSafe, GenericTracker)..."}
                    type={"text"}
                  />
                  {query && (
                    <button
                      aria-label={"Clear search"}
                      className={"text-on-surface-variant hover:text-on-surface px-space-xs py-space-xs rounded transition-colors"}
                      id={"search-clear-btn"}
                      type={"button"}
                      onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                    >
                      <span className={"material-symbols-outlined text-[18px]"}>close</span>
                    </button>
                  )}
                </div>
                <button
                  className={"btn-primary"}
                  id={"check-app-btn"}
                  type={"button"}
                  onClick={verifyApp}
                  disabled={checking}
                >
                  {checking ? (
                    <><span className="material-symbols-outlined text-lg animate-spin">refresh</span><span>Verifying...</span></>
                  ) : (
                    <><span className={"material-symbols-outlined text-lg"}>verified_user</span><span>Check App</span></>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Comparison Cards */}
          <section className={"grid grid-cols-1 lg:grid-cols-2 gap-space-lg items-stretch"}>
            {/* CycleSafe Card */}
            <article className={"card-bordered flex flex-col justify-between h-full"}>
              <div>
                <div className={"flex items-center justify-between pb-space-md border-b border-outline-variant/30"}>
                  <div>
                    <h2 className={"text-2xl font-bold text-on-surface"}>CycleSafe</h2>
                    <p className={"text-xs text-secondary font-medium"}>Verified Protection</p>
                  </div>
                  <div className={"inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-secondary-container/40 border border-secondary/30 text-secondary shadow-sm"}>
                    <span className={"material-symbols-outlined text-base"} style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className={"text-xs font-semibold uppercase tracking-wider"}>Gold Verified</span>
                  </div>
                </div>

                <div className={"mt-space-lg p-space-md bg-surface-container-low rounded-xl flex items-center justify-between border border-outline-variant/40"}>
                  <div>
                    <span className={"text-secondary text-base font-bold"}>94 / 100 Privacy Score</span>
                    <p className={"text-xs text-on-surface-variant mt-space-xs"}>Zero-knowledge encrypted telemetry.</p>
                  </div>
                  <span className={"text-xs text-secondary bg-secondary-container/40 px-space-sm py-space-xs rounded-md border border-secondary/30 font-semibold"}>Passed</span>
                </div>

                <div className={"mt-space-lg flex flex-col gap-space-md"}>
                  <div className={"p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center gap-space-md"}>
                    <span className={"material-symbols-outlined text-secondary text-lg"}>check_circle</span>
                    <span className={"text-xs text-on-surface font-medium"}>No sensitive data sent to ad SDKs</span>
                  </div>
                  <div className={"p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center gap-space-md"}>
                    <span className={"material-symbols-outlined text-secondary text-lg"}>lock</span>
                    <span className={"text-xs text-on-surface font-medium"}>Quantum-safe lattice encryption</span>
                  </div>
                  <div className={"p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center gap-space-md"}>
                    <span className={"material-symbols-outlined text-primary-container text-lg"}>gavel</span>
                    <span className={"text-xs text-on-surface font-medium"}>Hardware enclave consent gate</span>
                  </div>
                </div>
              </div>
            </article>

            {/* GenericTracker Card */}
            <article className={"card-bordered flex flex-col justify-between h-full"}>
              <div>
                <div className={"flex items-center justify-between pb-space-md border-b border-outline-variant/30"}>
                  <div>
                    <h2 className={"text-2xl font-bold text-on-surface"}>GenericTracker</h2>
                    <p className={"text-xs text-error font-medium"}>Unverified App</p>
                  </div>
                  <div className={"inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-error-container border border-error/30 text-error shadow-sm"}>
                    <span className={"material-symbols-outlined text-base"}>warning</span>
                    <span className={"text-xs font-semibold uppercase tracking-wider"}>Not Verified</span>
                  </div>
                </div>

                <div className={"mt-space-lg p-space-md bg-surface-container-low rounded-xl flex items-center justify-between border border-outline-variant/40"}>
                  <div>
                    <span className={"text-error text-base font-bold"}>38 / 100 Privacy Score</span>
                    <p className={"text-xs text-on-surface-variant mt-space-xs"}>Ad trackers actively exfiltrate user inputs.</p>
                  </div>
                  <span className={"text-xs text-error bg-error-container px-space-sm py-space-xs rounded-md border border-error/30 font-semibold"}>High Egress Risk</span>
                </div>

                <div className={"mt-space-lg flex flex-col gap-space-md"}>
                  <div className={"p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center gap-space-md"}>
                    <span className={"material-symbols-outlined text-error text-lg"}>cancel</span>
                    <span className={"text-xs text-on-surface-variant"}>Leaks ovulation data to 4 ad networks</span>
                  </div>
                  <div className={"p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center gap-space-md"}>
                    <span className={"material-symbols-outlined text-error text-lg"}>no_encryption</span>
                    <span className={"text-xs text-on-surface-variant"}>Unencrypted telemetry payload</span>
                  </div>
                  <div className={"p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center gap-space-md"}>
                    <span className={"material-symbols-outlined text-error text-lg"}>person_off</span>
                    <span className={"text-xs text-on-surface-variant"}>Consent bypassed for profiling</span>
                  </div>
                </div>
              </div>
            </article>
          </section>

          {/* Certify CTA Strip */}
          <section className={"card-bordered flex flex-col sm:flex-row items-center justify-between gap-space-lg"}>
            <div>
              <h2 className={"text-2xl font-bold"}>Protect your users and earn trust</h2>
              <p className={"mt-space-xs text-sm text-on-surface-variant"}>
                Integrate SurakshaShield SDK to eliminate data leaks and get verified.
              </p>
            </div>
            <a
              className={"btn-primary"}
              data-path={"integration-guide"}
              href={"#"}
            >
              <span className={"material-symbols-outlined text-lg"} style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              <span>Get certified</span>
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
