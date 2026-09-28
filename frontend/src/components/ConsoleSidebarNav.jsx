import React from 'react';
import { Link } from 'react-router-dom';

const items = [
  { label: 'Overview', path: '/console', icon: 'dashboard', key: 'overview' },
  { label: 'Live Traffic', path: '/console/live-traffic', icon: 'query_stats', key: 'traffic' },
  { label: 'Audit Ledger', path: '/console/audit-ledger', icon: 'history_edu', key: 'audit' },
];

export default function ConsoleSidebarNav({ active, variant = 'overview' }) {
  const spacing = variant === 'audit' ? 'gap-space-md px-space-md py-space-sm rounded-lg' : variant === 'traffic' ? 'gap-space-sm px-space-md py-space-sm rounded-lg' : 'gap-space-sm px-space-md py-space-sm rounded-xl';
  return (
    <nav className={`flex flex-col gap-space-xs ${variant === 'overview' ? 'mt-space-xs' : ''}`} aria-label="Console pages">
      {items.map(item => {
        const selected = active === item.key;
        const activeClass = selected ? 'bg-primary-container text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors';
        return (
          <Link key={item.key} to={item.path} aria-current={selected ? 'page' : undefined} className={`flex items-center ${spacing} ${activeClass} font-body-md text-body-md font-medium transition-all`}>
            <span className={`material-symbols-outlined ${selected ? 'text-on-primary' : 'text-outline'}`}>{item.icon}</span>
            <span>{item.label}</span>
            {selected && variant === 'traffic' && <span className="ml-auto w-2 h-2 rounded-full bg-secondary animate-pulse" />}
            {selected && variant === 'audit' && <span className="ml-auto px-1.5 py-0.5 rounded-full bg-surface-container-lowest/20 text-on-primary font-label-sm text-label-sm">LIVE</span>}
          </Link>
        );
      })}
    </nav>
  );
}
