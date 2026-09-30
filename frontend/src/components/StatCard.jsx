import React from 'react';

export default function StatCard({ label, value, note, tone }) {
  return (
    <div className="card card-hover flex flex-col justify-between gap-space-md">
      <span className="text-t-card text-on-surface">{label}</span>
      <div>
        <div className={`text-t-title ${tone} tabular-nums`}>{value}</div>
        <div className="text-t-caption text-on-surface-variant mt-space-sm min-h-[2.6em]">{note}</div>
      </div>
    </div>
  );
}
