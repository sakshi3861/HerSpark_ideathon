import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useTitle from '../hooks/useTitle';
import FoldText from '../components/FoldText';

export default function Landing() {
  useTitle('Privacy controls for health apps');
  return (
    <>
    <Header />
    <main className="w-full pt-20 bg-background text-on-surface">
      <div className="flex flex-col w-full">
          {/* Section 1: Hero (Restyled matching Image 3) */}
          <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-background to-primary-fixed/60 px-margin py-space-2xl">
            <div aria-hidden="true" className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-secondary-container/40 blur-3xl pointer-events-none" />
            <div aria-hidden="true" className="absolute -bottom-40 right-0 w-[560px] h-[560px] rounded-full bg-primary-fixed-dim/40 blur-3xl pointer-events-none" />
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center relative z-10">
              {/* Left Column: Headline & Subtext */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <div className="inline-flex items-center gap-space-sm px-space-md py-space-sm rounded-full bg-secondary-container/50 border border-secondary/30 text-secondary text-sm font-semibold tracking-wider uppercase mb-space-lg shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  <span>Intimate Data Protection SDK</span>
                </div>

                {/* Each letter folds down into place once */}
                <div>
                  <FoldText
                    text="SurakshaShield"
                    splitBy="char"
                    hinge="top"
                    duration={0.7}
                    stagger={0.05}
                    fontSize="clamp(44px, 6.4vw, 96px)"
                    fontWeight={800}
                    color="#012e32"
                    creaseShading={0}
                    style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}
                  />
                </div>

                <h1 className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.03] text-on-surface">
                  <span className="block">The Protector for</span>
                  <span className="block bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent">Women's Sensitive Data</span>
                </h1>

                <div className="mt-space-xl flex flex-wrap items-center gap-space-md">
                  <Link
                    className="btn-primary !h-14 !px-space-xl !text-lg shadow-lg hover:shadow-xl"
                    to="/home"
                  >
                    <span>Get Started</span>
                    <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Editorial Visual + Floating Glass Stat Badge */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-2xl aspect-[53/31] rounded-3xl overflow-hidden bg-surface-container-lowest p-2 border border-outline-variant/40 shadow-2xl shadow-primary/20 group">
                  <img
                    src="/hero_desk.jpg"
                    alt="Woman engineer watching a data protection dashboard"
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Floating Glassmorphism Badge */}
                  <div className="absolute top-space-lg left-space-lg bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-space-md shadow-sm flex items-center gap-space-md">
                    <div className="w-10 h-10 rounded-xl bg-secondary-container text-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl">verified_user</span>
                    </div>
                    <div>
                      <div className="text-xs font-medium tracking-wider text-on-surface-variant uppercase">Protection Status</div>
                      <div className="text-base font-bold text-secondary">Shield Active • 0 Leaks Today</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

      </div>
    </main>
    <Footer />
    </>
  );
}
