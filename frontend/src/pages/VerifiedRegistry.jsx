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
      <main className={"w-full pt-20 bg-surface min-h-[calc(100vh-160px)]"}>
        <div className={"flex flex-col w-full max-w-6xl mx-auto px-6 py-12 gap-space-2xl"}>
          {/* Header & Search Bar */}
          <section className={"flex flex-col items-center text-center max-w-3xl mx-auto w-full"}>
            <h1 className={"font-headline-xl text-headline-xl text-on-surface tracking-tight"}>
              Verified Privacy Registry
            </h1>
            <p className={"mt-space-xs font-body-lg text-body-lg text-on-surface-variant"}>
              Verify whether an app protects user health data or leaks it to third-party ad brokers.
            </p>

            <div className={"w-full mt-space-lg bg-surface-container-lowest shadow-sm rounded-2xl p-2 transition-all border border-outline-variant/30"}>
              <div className={"flex flex-col sm:flex-row items-stretch sm:items-center gap-2"}>
                <div className={"flex items-center gap-space-sm pl-space-md flex-1 py-1"}>
                  <span className={"material-symbols-outlined text-outline text-[22px]"}>search</span>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    className={"w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:outline-none"}
                    id={"registry-search-input"}
                    placeholder={"Search app name (e.g. CycleSafe, GenericTracker)..."}
                    type={"text"}
                  />
                  {query && (
                    <button
                      aria-label={"Clear search"}
                      className={"text-outline-variant hover:text-on-surface px-1 py-1 rounded transition-colors"}
                      id={"search-clear-btn"}
                      type={"button"}
                      onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                    >
                      <span className={"material-symbols-outlined text-[18px]"}>close</span>
                    </button>
                  )}
                </div>
                <button
                  className={"inline-flex items-center justify-center gap-space-xs px-space-xl py-3 rounded-xl bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all"}
                  id={"check-app-btn"}
                  type={"button"}
                  onClick={verifyApp}
                  disabled={checking}
                >
                  {checking ? (
                    <><span className="material-symbols-outlined text-[20px] animate-spin">refresh</span><span>Verifying...</span></>
                  ) : (
                    <><span className={"material-symbols-outlined text-[20px]"}>verified_user</span><span>Check App</span></>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Comparison Cards */}
          <section className={"grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"}>
            {/* CycleSafe Card */}
            <article className={"bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm border border-secondary/20 flex flex-col justify-between"}>
              <div>
                <div className={"flex items-center justify-between pb-space-md border-b border-outline-variant/20"}>
                  <div>
                    <h2 className={"font-headline-md text-headline-md text-on-surface"}>CycleSafe</h2>
                    <p className={"font-body-sm text-body-sm text-on-surface-variant"}>Verified Protection</p>
                  </div>
                  <div className={"inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed shadow-sm"}>
                    <span className={"material-symbols-outlined text-[16px]"} style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className={"font-label-sm text-label-sm font-semibold uppercase tracking-wider"}>Gold Verified</span>
                  </div>
                </div>

                <div className={"mt-space-md p-space-md bg-surface-container-low rounded-xl flex items-center justify-between"}>
                  <div>
                    <span className={"text-secondary font-title-md text-title-md font-bold"}>94 / 100 Privacy Score</span>
                    <p className={"font-body-sm text-body-sm text-on-surface-variant"}>Zero-knowledge encrypted telemetry.</p>
                  </div>
                  <span className={"font-label-sm text-label-sm text-secondary bg-surface-container-lowest px-2.5 py-1 rounded-md"}>Passed</span>
                </div>

                <div className={"mt-space-md flex flex-col gap-2"}>
                  <div className={"p-3 rounded-xl bg-surface-container-low flex items-center gap-3"}>
                    <span className={"material-symbols-outlined text-secondary text-[20px]"}>check_circle</span>
                    <span className={"font-body-sm text-body-sm text-on-surface font-semibold"}>No sensitive data sent to ad SDKs</span>
                  </div>
                  <div className={"p-3 rounded-xl bg-surface-container-low flex items-center gap-3"}>
                    <span className={"material-symbols-outlined text-secondary text-[20px]"}>lock</span>
                    <span className={"font-body-sm text-body-sm text-on-surface font-semibold"}>Quantum-safe lattice encryption</span>
                  </div>
                  <div className={"p-3 rounded-xl bg-surface-container-low flex items-center gap-3"}>
                    <span className={"material-symbols-outlined text-secondary text-[20px]"}>gavel</span>
                    <span className={"font-body-sm text-body-sm text-on-surface font-semibold"}>Hardware enclave consent gate</span>
                  </div>
                </div>
              </div>
            </article>

            {/* GenericTracker Card */}
            <article className={"bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm border border-error/20 flex flex-col justify-between"}>
              <div>
                <div className={"flex items-center justify-between pb-space-md border-b border-outline-variant/20"}>
                  <div>
                    <h2 className={"font-headline-md text-headline-md text-on-surface"}>GenericTracker</h2>
                    <p className={"font-body-sm text-body-sm text-on-surface-variant"}>Unverified App</p>
                  </div>
                  <div className={"inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-error-container text-on-error-container shadow-sm"}>
                    <span className={"material-symbols-outlined text-[16px]"}>warning</span>
                    <span className={"font-label-sm text-label-sm font-semibold uppercase tracking-wider"}>Not Verified</span>
                  </div>
                </div>

                <div className={"mt-space-md p-space-md bg-surface-container-low rounded-xl flex items-center justify-between"}>
                  <div>
                    <span className={"text-error font-title-md text-title-md font-bold"}>38 / 100 Privacy Score</span>
                    <p className={"font-body-sm text-body-sm text-on-surface-variant"}>Ad trackers actively exfiltrate user inputs.</p>
                  </div>
                  <span className={"font-label-sm text-label-sm text-error bg-surface-container-lowest px-2.5 py-1 rounded-md"}>High Egress Risk</span>
                </div>

                <div className={"mt-space-md flex flex-col gap-2"}>
                  <div className={"p-3 rounded-xl bg-surface-container-low flex items-center gap-3"}>
                    <span className={"material-symbols-outlined text-error text-[20px]"}>cancel</span>
                    <span className={"font-body-sm text-body-sm text-on-surface"}>Leaks ovulation data to 4 ad networks</span>
                  </div>
                  <div className={"p-3 rounded-xl bg-surface-container-low flex items-center gap-3"}>
                    <span className={"material-symbols-outlined text-error text-[20px]"}>no_encryption</span>
                    <span className={"font-body-sm text-body-sm text-on-surface"}>Unencrypted telemetry payload</span>
                  </div>
                  <div className={"p-3 rounded-xl bg-surface-container-low flex items-center gap-3"}>
                    <span className={"material-symbols-outlined text-error text-[20px]"}>person_off</span>
                    <span className={"font-body-sm text-body-sm text-on-surface"}>Consent bypassed for profiling</span>
                  </div>
                </div>
              </div>
            </article>
          </section>

          {/* Certify CTA Strip */}
          <section className={"rounded-2xl bg-gradient-to-r from-primary via-primary-container to-tertiary text-on-primary p-space-xl flex flex-col sm:flex-row items-center justify-between gap-space-lg shadow-md"}>
            <div>
              <h2 className={"font-headline-md text-headline-md font-bold"}>Protect your users and earn trust</h2>
              <p className={"mt-1 font-body-md text-body-md text-inverse-on-surface/90"}>
                Integrate SurakshaShield SDK to eliminate data leaks and get verified.
              </p>
            </div>
            <a
              className={"inline-flex items-center justify-center gap-space-xs px-space-xl py-3 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-bright font-title-md text-title-md font-semibold shrink-0 transition-all"}
              data-path={"integration-guide"}
              href={"#"}
            >
              <span className={"material-symbols-outlined text-[20px] text-primary"} style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              <span>Get certified</span>
            </a>
          </section>
        </div>
      </main>
      <Footer variant="registry" />
    </>
  );
}
