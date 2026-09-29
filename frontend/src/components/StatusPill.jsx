import React from 'react';

const styles = {
  Blocked: ['block', 'bg-error-container text-on-error-container'],
  Masked: ['blur_on', 'bg-surface-container-high text-tertiary'],
  Allowed: ['check_circle', 'bg-secondary-container/60 text-on-secondary-container'],
  Encrypted: ['lock', 'bg-primary-fixed text-primary'],
  Leaked: ['warning', 'bg-error text-on-error'],
};

export default function StatusPill({ status }) {
  const [icon, tone] = styles[status] || ['help', 'bg-surface-container text-on-surface'];
  return (
    <span className={`inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full text-t-status uppercase ${tone}`}>
      <span className="material-symbols-outlined text-[14px]" aria-hidden="true">{icon}</span>
      {status}
    </span>
  );
}
