import React from 'react';
import { Link } from 'react-router-dom';
import brandMark from '../assets/brandmark.svg';

const columns = [
  { title: 'Product', links: [['Overview', '/home'], ['Console', '/console'], ['Registry', '/registry']] },
  { title: 'Resources', links: [['Docs', '#'], ['API Reference', '#'], ['Status', '#']] },
  { title: 'Company', links: [['About', '#'], ['Contact', '#'], ['Terms', '#'], ['Privacy Policy', '#']] },
];

const linkClass = 'text-t-caption text-on-surface-variant hover:text-primary hover:underline underline-offset-4 transition-colors';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/40">
      <div className="max-w-[1440px] mx-auto px-margin py-space-xl grid grid-cols-2 md:grid-cols-4 gap-space-lg">
        <div className="col-span-2 md:col-span-1 flex flex-col gap-space-md">
          <Link to="/home" className="flex items-center gap-space-sm">
            <img alt="" className="h-6 w-auto" src={brandMark} />
            <span className="text-t-card text-on-surface">SurakshaShield</span>
          </Link>
          <p className="text-t-body text-on-surface-variant max-w-xs">Runtime data-egress controls for health and wellness apps.</p>
        </div>
        {columns.map(col => (
          <div key={col.title} className="flex flex-col gap-space-sm">
            <span className="text-t-caption uppercase tracking-wider text-on-surface">{col.title}</span>
            {col.links.map(([label, to]) => (
              to.startsWith('/')
                ? <Link key={label} to={to} className={linkClass}>{label}</Link>
                : <a key={label} href={to} className={linkClass}>{label}</a>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-outline-variant/40">
        <div className="max-w-[1440px] mx-auto px-margin py-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm">
          <span className="text-t-body text-on-surface-variant">© {new Date().getFullYear()} SurakshaShield Cryptographic Systems</span>
          <span className="inline-flex items-center gap-space-xs text-t-caption text-on-surface-variant"><span className="w-2 h-2 rounded-full bg-secondary" />ML-KEM-768 / AES-256-GCM</span>
        </div>
      </div>
    </footer>
  );
}
