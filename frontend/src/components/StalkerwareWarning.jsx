import React from 'react';

// Quiet warning. It never offers a one-tap delete, because removing spyware can alert the person who installed it.
export default function StalkerwareWarning() {
  return (
    <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 flex flex-col gap-3 text-[#4a3200]">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
        <h3 className="text-lg font-bold">Your phone may be monitored</h3>
      </div>
      <p className="text-sm">We found signs that another app could be watching what happens on your screen.</p>
      <ul className="text-sm flex flex-col gap-1.5">
        {[
          'An app you did not install can read your screen',
          'It has permission to control your phone settings',
          'Its icon is hidden from your app list',
        ].map(t => (
          <li key={t} className="flex items-start gap-2"><span className="material-symbols-outlined text-[18px] text-amber-600">error</span>{t}</li>
        ))}
      </ul>
      <div className="rounded-xl bg-white/70 border border-amber-200 p-3 text-sm">
        <b>Please do not delete it yet.</b> Removing it can tell the person who installed it, and that can make things more dangerous. Talk to someone you trust first.
      </div>
      <div className="flex items-center gap-2 text-sm font-semibold">
        <span className="material-symbols-outlined text-[20px]">call</span>
        Women&apos;s helpline: 181
      </div>
    </div>
  );
}
