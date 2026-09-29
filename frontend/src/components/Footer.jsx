import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1440px] mx-auto px-margin py-space-xl flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex flex-col sm:flex-row items-center gap-space-md text-center sm:text-left">
          <span className="font-body-sm text-body-sm text-on-surface-variant">© 2025 SurakshaShield Cryptographic Systems. Zero-Knowledge Infrastructure for Women&apos;s Health &amp; Safety.</span>
          <span className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container text-tertiary font-label-sm text-label-sm font-medium"><span className="material-symbols-outlined text-[14px]">verified_user</span>ML-KEM 768 / AES-256-GCM Verified</span>
        </div>
        <div className="flex items-center gap-space-lg">
          <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="/registry">Certificates Registry</Link>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#developer-docs">Developer Docs</a>
        </div>
      </div>
    </footer>
  );
}
