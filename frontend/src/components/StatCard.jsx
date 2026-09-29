import React from 'react';

export default function StatCard({ label, value, note, tone }) {
  return (
    <div className="card flex flex-col justify-between gap-space-md">
      <span className="font-body-md text-body-md font-medium text-on-surface-variant">{label}</span>
      <div>
        <div className={`font-headline-xl text-headline-xl font-bold tracking-tight leading-none ${tone}`}>{value}</div>
        <div className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm">{note}</div>
      </div>
    </div>
  );
}
