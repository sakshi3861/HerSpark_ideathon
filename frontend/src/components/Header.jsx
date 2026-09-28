import React from 'react';
import { Link } from 'react-router-dom';
import brandMark from '../assets/brandmark.svg';

const links = [
  { label: 'Overview / Home', to: '/', matches: ['surakshashield_overview', 'cyclesafe_home_dashboard'] },
  { label: 'CycleSafe Demo', to: '/cyclesafe/welcome', matches: ['cyclesafe_welcome_consent', 'cyclesafe_login_duress_pin'] },
  { label: 'Console', to: '/console', matches: ['console_overview', 'console_live_traffic', 'console_audit_ledger'] },
  { label: 'Verified Registry', to: '/registry', matches: ['verified_registry'] },
];

export default function Header({ active }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1440px] mx-auto px-margin flex items-center justify-between gap-space-lg">
        <div className="flex items-center gap-space-lg flex-shrink-0">
          <Link to="/" className="flex items-center gap-space-sm">
            <img alt="SurakshaShield logo" className="h-8 w-auto object-contain" src={brandMark} />
            <span className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary leading-tight tracking-tight">SurakshaShield</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium tracking-normal">Privacy &amp; Security SDK</span>
            </span>
          </Link>
          <span className="h-8 w-px bg-surface-container-high hidden lg:block" />
          <nav className="hidden md:flex items-center gap-space-xs">
            {links.map(link => (
              <Link key={link.to} to={link.to} className={`px-space-md py-space-sm rounded-lg font-body-md text-body-md transition-all ${link.matches.includes(active) ? 'bg-primary-container text-on-primary font-medium' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-space-md flex-shrink-0">
          <div className="hidden sm:flex items-center gap-space-xs px-space-md py-space-xs bg-secondary-fixed/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-label-sm text-label-sm font-semibold tracking-wider uppercase text-secondary">SHIELD ON</span>
          </div>
          <div className="hidden xl:flex items-center px-space-sm py-space-xs bg-surface-container rounded-lg">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Env: Sandbox Mode</span>
          </div>
          <Link to="/cyclesafe/welcome" className="hidden sm:inline-flex items-center justify-center px-space-md py-space-sm bg-primary-container hover:bg-primary text-on-primary font-body-md text-body-md font-medium rounded-lg transition-colors shadow-sm">Try Integration</Link>
          <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </span>
        </div>
      </div>
    </header>
  );
}
