import React from 'react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const plans = { 3: 'Dentist', 6: 'Team lunch', 9: 'Call Mum', 12: 'Gym', 15: 'Electricity bill', 19: 'Book club', 23: 'Car service', 27: 'Groceries' };

// The harmless vault. It holds nothing from the real vault and has no sharing or sync.
export default function DecoyCalendar({ onLock }) {
  const now = new Date();
  const first = (new Date(now.getFullYear(), now.getMonth(), 1).getDay() + 6) % 7;
  const total = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  const upcoming = Object.entries(plans).filter(([d]) => +d >= now.getDate()).slice(0, 4);

  return (
    <div className="h-screen w-screen overflow-y-auto p-5 md:p-8 text-slate-800 bg-slate-50" style={{ colorScheme: 'light' }}>
      <div className="max-w-3xl mx-auto flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl text-slate-600">calendar_month</span>
            <h1 className="text-2xl font-bold">Calendar</h1>
          </div>
          <button type="button" onClick={onLock} aria-label="Lock" className="w-10 h-10 rounded-xl border border-slate-300 bg-white flex items-center justify-center hover:bg-slate-100">
            <span className="material-symbols-outlined text-[20px] text-slate-600">lock</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-3">
          <div className="text-lg font-semibold">{now.toLocaleString([], { month: 'long', year: 'numeric' })}</div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500">{days.map(d => <div key={d}>{d}</div>)}</div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => (
              <div key={i} className={`h-12 rounded-lg text-sm flex flex-col items-center justify-center ${d === now.getDate() ? 'bg-slate-700 text-white' : d ? 'bg-slate-50' : ''}`}>
                {d}
                {d && plans[d] && <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${d === now.getDate() ? 'bg-white' : 'bg-slate-500'}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-2">
          <div className="text-lg font-semibold">Coming up</div>
          {upcoming.map(([d, t]) => (
            <div key={d} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-sm">
              <span className="font-semibold w-8">{d}</span>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
