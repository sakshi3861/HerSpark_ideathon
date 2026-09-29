import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <main className="w-full bg-background text-on-surface">
      <div className="flex flex-col w-full">
          {/* Section 1: Hero (Restyled matching Image 3) */}
          <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-background px-margin py-space-2xl">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center relative z-10">
              {/* Left Column: Headline & Subtext */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <div className="inline-flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-secondary-container/40 border border-secondary/30 text-secondary text-xs font-semibold tracking-wider uppercase mb-space-lg">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  <span>Intimate Data Protection SDK</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-on-surface leading-[1.05]">
                  The Quick Heal for Apps
                </h1>

                <p className="mt-space-lg text-lg sm:text-xl text-on-surface-variant max-w-xl font-normal leading-relaxed">
                  Women's apps leak sensitive data through their own third-party SDKs.
                </p>

                <div className="mt-space-xl flex flex-wrap items-center gap-space-md">
                  <Link
                    className="btn-primary"
                    to="/home"
                  >
                    <span>Get Started</span>
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Editorial Visual + Floating Glass Stat Badge */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container-lowest p-2 border border-outline-variant/40 shadow-sm group">
                  <img
                    src="/hero_woman.jpg"
                    alt="Woman silhouette digital protection visual"
                    className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Floating Glassmorphism Badge */}
                  <div className="absolute top-space-lg right-space-lg bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-space-md shadow-sm flex items-center gap-space-md">
                    <div className="w-10 h-10 rounded-xl bg-secondary-container text-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl">verified_user</span>
                    </div>
                    <div>
                      <div className="text-xs text-on-surface-variant font-medium uppercase">Protection Status</div>
                      <div className="text-sm font-bold text-secondary">Shield Active • 0 Leaks Today</div>
                    </div>
                  </div>

                  <div className="absolute bottom-space-lg left-space-lg right-space-lg p-space-md rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-space-sm text-xs text-on-surface-variant">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                      <span>PQC Lattice Encrypted</span>
                    </div>
                    <span className="text-xs text-secondary font-mono font-semibold">AES-256</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Historical Vulnerabilities (marketing only) */}
          <section className="w-full bg-background section-py px-margin border-t border-outline-variant/40">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-space-xl">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-surface text-center">Historical Vulnerabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                {[
                  { tag: 'FTC Settlement', name: 'Flo Health', body: 'Unencrypted sharing of intimate ovulation dates & cycle timestamps directly with ad platforms.' },
                  { tag: 'FTC Order', name: 'Premom', body: 'Background transmission of hardware MAC addresses & GPS markers to ad consortiums.' },
                  { tag: 'Data Leak', name: 'Tea Period Tracker', body: 'Intimacy frequency & symptom logs leaked via in-app banner ad SDK bridges.' },
                ].map(item => (
                  <div key={item.name} className="card-bordered flex flex-col items-start gap-space-md h-full hover:shadow-md transition-shadow">
                    <span className="text-xs bg-error-container text-on-error-container border border-error/30 px-space-md py-space-xs rounded-full font-semibold uppercase tracking-wider">{item.tag}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-on-surface">{item.name}</h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed mt-space-sm">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
      </div>
    </main>
  );
}
