import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SurakshaShieldOverview() {
  return (
    <>
      <Header active="surakshashield_overview" />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-140px)]">
        <div className="flex flex-col w-full">
          {/* Section 1: Hero */}
          <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-lowest via-surface to-surface-container-low px-margin py-space-2xl text-center">
            <div className="max-w-[1440px] mx-auto flex flex-col items-center">
              <h1 className="font-headline-xl text-headline-xl text-on-surface max-w-4xl tracking-tight mb-space-md">
                The Quick Heal for Apps
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mb-space-xl">
                Women's apps leak sensitive data through their own third-party SDKs.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-space-md">
                <a className="inline-flex items-center gap-space-sm bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-space-xl py-space-md rounded-lg shadow-md transition-all" href="/cyclesafe/welcome">
                  <span>Try the demo</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
                <a className="inline-flex items-center gap-space-sm bg-surface-container-lowest hover:bg-surface-container-low text-primary font-label-md text-label-md px-space-lg py-space-md rounded-lg shadow-sm transition-all" href="/console">
                  <span className="material-symbols-outlined text-[18px]">terminal</span>
                  <span>Open Console</span>
                </a>
              </div>
            </div>
          </section>

          {/* Section 2: Incident Cards */}
          <section className="w-full bg-surface py-space-xl px-margin">
            <div className="max-w-[1440px] mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-space-lg">
                <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Historical Vulnerabilities
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-md flex flex-col justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm bg-error-container text-on-error-container px-space-xs py-0.5 rounded font-semibold">
                      FTC SETTLEMENT
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface my-space-xs">Flo Health</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Unencrypted sharing of intimate ovulation dates & cycle timestamps directly with ad platforms.
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-md flex flex-col justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm bg-error-container text-on-error-container px-space-xs py-0.5 rounded font-semibold">
                      FTC ORDER
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface my-space-xs">Premom</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Background transmission of hardware MAC addresses & GPS markers to ad consortiums.
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-md flex flex-col justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm bg-error-container text-on-error-container px-space-xs py-0.5 rounded font-semibold">
                      DATA LEAK
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface my-space-xs">Tea Period Tracker</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Intimacy frequency & symptom logs leaked via in-app banner ad SDK bridges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: 3-Step Protection Pipeline */}
          <section className="w-full bg-surface-container-low py-space-xl px-margin">
            <div className="max-w-[1440px] mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-space-lg">
                <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">3-Step Protection Pipeline</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center font-headline-md text-headline-md font-bold mb-space-sm">01</div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">Classify</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Inspects runtime memory heaps to identify menstrual tracking fields, fertility symptoms, and GPS coordinates.
                  </p>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-md text-headline-md font-bold mb-space-sm">02</div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">Block or Mask</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Intercepts ad beacons, dropping unauthorized packets or substituting synthetic noise & coarse geo cells.
                  </p>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-md text-headline-md font-bold mb-space-sm">03</div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">Encrypt and Sign</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Seals internal backend data in a quantum-safe encryption envelope with immutable tamper-evident audit logs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Get Certified Strip */}
          <section className="w-full bg-gradient-to-r from-primary to-primary-container py-space-xl px-margin text-on-primary">
            <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-space-md">
              <div>
                <h2 className="font-headline-lg text-headline-lg font-bold tracking-tight text-on-primary">Get certified on the SurakshaShield Verified Registry</h2>
                <p className="font-body-md text-body-md text-on-primary/80 mt-space-xs">
                  Prove data stewardship to your users.
                </p>
              </div>
              <a className="inline-flex items-center gap-space-sm bg-surface-container-lowest text-primary font-label-md text-label-md px-space-xl py-space-md rounded-lg shadow-lg transition-all" href="/registry">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>View Verified Registry</span>
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer variant="app" />
    </>
  );
}
