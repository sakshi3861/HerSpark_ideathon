import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Skeleton from '../components/Skeleton';
import useLoading from '../hooks/useLoading';
import useTitle from '../hooks/useTitle';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import { buildKpis, useMetrics } from '../data/metrics';

const areas = [
  { to: '/cyclesafe/welcome', icon: 'vital_signs', title: 'CycleSafe Demo', body: 'See SurakshaShield protecting a real app in action' },
  { to: '/console', icon: 'terminal', title: 'Console', body: 'Monitor live traffic, threats, and audit logs' },
  { to: '/registry', icon: 'verified_user', title: 'Verified Registry', body: 'Check if an app is SurakshaShield certified' },
];

const steps = [
  { n: '01', title: 'Classify', body: 'Detects cycle, fertility and location fields in outbound payloads.', tone: 'bg-secondary-container/40 text-secondary' },
  { n: '02', title: 'Block or Mask', body: 'Drops ad beacons, or replaces values with noise and coarse location.', tone: 'bg-primary-fixed text-primary' },
  { n: '03', title: 'Encrypt & Sign', body: 'Encrypts vault sync with ML-KEM-768 and appends each event to the audit chain.', tone: 'bg-secondary-container/40 text-secondary' },
];

export default function SurakshaShieldOverview() {
  useTitle('Overview');
  const metrics = useMetrics();
  const loading = useLoading(600);
  return (
    <>
      <Header active="surakshashield_overview" />
      <main className="w-full pt-20 bg-background min-h-screen">
        <div className="page page-stack">
          <div>
            <h1 className="page-title">Welcome to SurakshaShield</h1>
            <p className="page-sub">SDK egress controls and audit status</p>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-lg">
            {loading
              ? Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="card flex flex-col justify-between gap-space-md">
                  <Skeleton className="h-4 w-28" />
                  <div className="flex flex-col gap-space-sm"><Skeleton className="h-10 w-32" /><Skeleton className="h-3 w-40" /></div>
                </div>
              ))
              : buildKpis(metrics).map(({ key, ...kpi }) => <StatCard key={key} {...kpi} />)}
          </section>

          <section className="flex flex-col gap-space-md">
            <h2 className="text-t-section text-on-surface">Workspace</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              {areas.map(area => (
                <Link key={area.to} to={area.to} className="card card-hover flex flex-col gap-space-md h-full group hover:ring-1 hover:ring-primary/30">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">{area.icon}</span>
                    </div>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">arrow_forward</span>
                  </div>
                  <div>
                    <h3 className="text-t-card text-on-surface">{area.title}</h3>
                    <p className="text-t-body text-on-surface-variant mt-space-xs">{area.body}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-space-md">
            <h2 className="text-t-section text-on-surface">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              {steps.map(step => (
                <div key={step.n} className="card card-hover flex items-start gap-space-md h-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-t-card flex-shrink-0 ${step.tone}`}>{step.n}</div>
                  <div>
                    <h3 className="text-t-card text-on-surface">{step.title}</h3>
                    <p className="text-t-body text-on-surface-variant mt-space-xs">{step.body}</p>
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
