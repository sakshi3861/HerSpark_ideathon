import React, { useEffect, useState } from 'react';
import { APPS } from '../data/apps';
import { kitFor } from '../data/kit';
import { addEvent } from '../state/events';

const card = 'bg-white rounded-2xl border border-[color-mix(in_srgb,var(--p)_20%,transparent)] shadow-sm';
const mono = 'text-[11px] leading-tight font-mono bg-[var(--p-bg)] p-3 rounded-lg overflow-auto border border-[color-mix(in_srgb,var(--p)_20%,transparent)]';

const labelFor = { allow: 'Shared', block: 'Blocked' };

// The partner app that asks the safe app for data. appId is the app it asks.
export default function PartnerAppDashboard({ appId }) {
  const kit = kitFor(appId);
  const { app, partner, requests, APP_NAME, PURPOSE, STORE_KEY, loadShared, setPending } = kit;
  const TEAL = partner.color;
  const BG = partner.bg;
  useEffect(() => { document.title = APP_NAME; }, []);
  const [tab, setTab] = useState('home');
  const [shared, setShared] = useState(loadShared);
  const waiting = kit.usePending();

  // The request goes to the safe app and waits there until the user approves it on the real vault.
  const requestData = () => {
    setPending(true);
    addEvent({ source: APP_NAME, dest: app.name, event: 'data_request', action: 'info', note: `Asked for ${requests.length} categories` });
    window.open(app.route, '_blank', 'noopener');
  };

  // The approval happens in the safe app's tab; pick it up when it lands.
  useEffect(() => {
    const onStorage = e => { if (e.key === STORE_KEY) setShared(loadShared()); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const tabs = [['home', 'Home', 'home'], ['connect', app.name, 'sync_alt']];

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden " style={{ background: BG, color: partner.ink, colorScheme: 'light', '--p': TEAL, '--p-bg': BG, '--p-on': partner.on, '--p-accent': partner.accent }}>
      <aside className="text-[color:var(--p-on)] md:w-56 shrink-0 flex md:flex-col gap-2 p-4 md:p-5" style={{ background: TEAL }}>
        <div className="flex items-center gap-2 md:mb-6">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{partner.icon}</span>
          <span className="text-xl font-bold leading-tight">{APP_NAME}</span>
        </div>
        <nav className="flex md:flex-col gap-1 ml-auto md:ml-0 md:flex-1">
          {tabs.map(([key, label, icon]) => (
            <button key={key} type="button" onClick={() => setTab(key)} className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-colors ${tab === key ? 'bg-white text-[color:var(--p-accent)] shadow-sm' : 'hover:bg-white/15'}`}>
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-5 md:p-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {tab === 'home' && (
            <>
              <div className={`${card} p-6 flex flex-col gap-2`}>
                <h1 className="text-3xl font-bold">Welcome to {APP_NAME}</h1>
                <p className="opacity-75">{partner.intro}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {partner.tiles(shared).map(([t, v, ic]) => (
                  <div key={t} className={`${card} p-4 flex items-center gap-3`}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[color:var(--p-on)]" style={{ background: TEAL }}>
                      <span className="material-symbols-outlined">{ic}</span>
                    </div>
                    <div>
                      <div className="text-xs opacity-60">{t}</div>
                      <div className="font-semibold">{v}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`${card} p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between`}>
                <div>
                  <h2 className="text-lg font-semibold">{partner.connectTitle}</h2>
                  <p className="opacity-75">{partner.connectText}</p>
                </div>
                <button type="button" onClick={() => setTab('connect')} className="h-11 px-5 rounded-xl text-[color:var(--p-on)] font-semibold hover:brightness-110" style={{ background: TEAL }}>Get started</button>
              </div>
            </>
          )}

          {tab === 'connect' && (
            <div className={`${card} p-6 flex flex-col gap-4 max-w-3xl`}>
              <h1 className="text-2xl font-bold">{app.name}</h1>
              <p className="opacity-75">{PURPOSE}</p>

              {waiting && (
                <div className="p-4 rounded-xl border border-[color-mix(in_srgb,var(--p)_30%,transparent)] flex items-start gap-3" style={{ background: BG }}>
                  <span className="material-symbols-outlined animate-spin" style={{ color: partner.accent }}>progress_activity</span>
                  <div>
                    <div className="font-semibold">Waiting for approval</div>
                    <p className="text-sm opacity-75">The request is with the {app.name} owner. It appears in {app.name}, where they choose what to share.</p>
                  </div>
                </div>
              )}

              {!shared && !waiting && (
                <>
                  <p className="text-sm opacity-70">{APP_NAME} {partner.askText}. The request opens in {app.name}, where SurakshaShield shows you what is asked and lets you decide.</p>
                  <button type="button" onClick={requestData} className="h-12 rounded-xl text-[color:var(--p-on)] font-semibold hover:brightness-110" style={{ background: TEAL }}>Request data from {app.name}</button>
                </>
              )}

              {shared && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined" style={{ color: partner.accent, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span className="font-semibold">Response received from {app.name}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {requests.map(r => (
                      <div key={r.key} className="flex items-center justify-between text-sm p-2 rounded-md bg-white border border-[color-mix(in_srgb,var(--p)_20%,transparent)]">
                        <span className="font-medium">{r.label}</span>
                        <span className={`px-2 py-0.5 rounded uppercase text-[10px] font-bold ${shared.decisions[r.key] === 'block' ? 'bg-gray-100 text-gray-600' : ''}`} style={shared.decisions[r.key] === 'block' ? undefined : { background: 'color-mix(in srgb, var(--p) 15%, white)', color: 'var(--p-accent)' }}>{shared.decisions[r.key] === 'mask' ? r.maskLabel : labelFor[shared.decisions[r.key]]}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">What {APP_NAME} received</h3>
                    <pre className={mono}>{JSON.stringify(shared.received, null, 2)}</pre>
                  </div>
                  <button type="button" onClick={requestData} className="self-start h-11 px-5 rounded-xl border font-semibold" style={{ borderColor: TEAL, color: partner.accent }}>Request again</button>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
