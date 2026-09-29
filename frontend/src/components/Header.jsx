import React from 'react';
import { Link } from 'react-router-dom';
import brandMark from '../assets/brandmark.svg';
import { useShield, toggleShield } from '../state/shield';

const links = [
  { label: 'Home', to: '/home', matches: ['surakshashield_overview', 'cyclesafe_home_dashboard'] },
  { label: 'CycleSafe Demo', to: '/cyclesafe/welcome', matches: ['cyclesafe_welcome_consent', 'cyclesafe_login_duress_pin'] },
  { label: 'Console', to: '/console', matches: ['console_overview', 'console_live_traffic', 'console_audit_ledger'] },
  { label: 'Verified Registry', to: '/registry', matches: ['verified_registry'] },
];

export default function Header({ active }) {
  const shieldOn = useShield();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0E1A]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="h-20 max-w-[1440px] mx-auto px-margin flex items-center justify-between gap-space-lg">
        <div className="flex items-center gap-space-lg flex-shrink-0">
          <Link to="/home" className="flex items-center gap-3">
            <img alt="SurakshaShield logo" className="h-8 w-auto object-contain filter brightness-125" src={brandMark} />
            <span className="flex flex-col">
              <span className="text-t-card text-white">SurakshaShield</span>
              <span className="text-t-caption text-cyan-400">Privacy &amp; Security SDK</span>
            </span>
          </Link>
          <span className="h-8 w-px bg-slate-800 hidden lg:block" />
          <nav className="hidden md:flex items-center gap-1.5">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-xl text-t-nav transition-all ${ link.matches.includes(active) ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' : 'text-slate-300 hover:text-white hover:bg-slate-800/60' }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            type="button"
            role="switch"
            aria-checked={shieldOn}
            aria-label="Toggle shield"
            onClick={toggleShield}
            className={`hidden sm:flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border transition-colors duration-200 ${shieldOn ? 'bg-emerald-950/60 border-emerald-500/40 hover:bg-emerald-950' : 'bg-red-950/60 border-red-500/40 hover:bg-red-950'}`}
          >
            <span className={`relative w-8 h-4 rounded-full transition-colors duration-200 ${shieldOn ? 'bg-emerald-500/40' : 'bg-red-500/40'}`}>
              <span className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full transition-transform duration-200 ${shieldOn ? 'translate-x-4 bg-emerald-400' : 'translate-x-0 bg-red-400'}`} />
            </span>
            <span className={`text-t-status uppercase ${shieldOn ? 'text-emerald-300' : 'text-red-300'}`}>{shieldOn ? 'SHIELD ON' : 'SHIELD OFF'}</span>
          </button>
          <div className="hidden xl:flex items-center px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl">
            <span className="text-t-caption text-slate-400">Env: Sandbox Mode</span>
          </div>
          <Link
            to="/cyclesafe/welcome"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-t-button rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-95"
          >
            Try Integration
          </Link>
          <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center flex-shrink-0 text-white shadow-md">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </span>
        </div>
      </div>
    </header>
  );
}
