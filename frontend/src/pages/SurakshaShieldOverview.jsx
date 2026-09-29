import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import { kpis } from '../data/metrics';

const areas = [
  { to: '/cyclesafe/welcome', icon: 'vital_signs', title: 'CycleSafe Demo', body: 'See SurakshaShield protecting a real app in action' },
  { to: '/console', icon: 'terminal', title: 'Console', body: 'Monitor live traffic, threats, and audit logs' },
  { to: '/registry', icon: 'verified_user', title: 'Verified Registry', body: 'Check if an app is SurakshaShield certified' },
];

const steps = [
  { n: '01', title: 'Classify', body: 'Spot cycle, fertility and location fields in runtime memory.', tone: 'bg-secondary-container/40 text-secondary' },
  { n: '02', title: 'Block or Mask', body: 'Drop ad beacons or swap in synthetic noise and coarse geo cells.', tone: 'bg-primary-fixed text-primary' },
  { n: '03', title: 'Encrypt & Sign', body: 'Seal backend data in a quantum-safe envelope with tamper-evident logs.', tone: 'bg-secondary-container/40 text-secondary' },
];

export default function SurakshaShieldOverview() {
  return (
    <>
      <Header active="surakshashield_overview" />
      <main className="w-full pt-20 bg-background min-h-screen">
        <div className="page page-stack">
          <div>
            <h1 className="page-title">Welcome to SurakshaShield</h1>
            <p className="page-sub">Your privacy and security control center</p>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-lg">
            {kpis.map(({ key, ...kpi }) => <StatCard key={key} {...kpi} />)}
          </section>

          <section className="flex flex-col gap-space-md">
            <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Jump in</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              {areas.map(area => (
                <Link key={area.to} to={area.to} className="card flex flex-col gap-space-md h-full hover:shadow-md transition-shadow group">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">{area.icon}</span>
                    </div>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">arrow_forward</span>
                  </div>
                  <div>
                    <h3 className="font-title-md text-title-md font-semibold text-on-surface">{area.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">{area.body}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-space-md">
            <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              {steps.map(step => (
                <div key={step.n} className="card flex items-start gap-space-md h-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold flex-shrink-0 ${step.tone}`}>{step.n}</div>
                  <div>
                    <h3 className="font-title-md text-title-md font-semibold text-on-surface">{step.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
