import React, { useEffect, useRef, useState } from 'react';
import brandMark from '../assets/brandmark.svg';
import SdkRequestModal from '../components/SdkRequestModal';
import StalkerwareWarning from '../components/StalkerwareWarning';
import PinLock from '../components/PinLock';
import DecoyCalendar from '../components/DecoyCalendar';
import DecoyCalculator from '../components/DecoyCalculator';
import { sha256 } from '../util/sha256';
import { send as shieldSend } from '../state/engine';
import { APPS } from '../data/apps';
import { kitFor } from '../data/kit';
import { addEvent, useEvents } from '../state/events';
import { getShield, useShield } from '../state/shield';
import { saveVault, useVault } from '../state/vault';
import { useBadge } from '../state/badge';

const card = 'bg-white rounded-2xl border border-[color-mix(in_srgb,var(--app)_25%,transparent)] shadow-sm';
const fmt = iso => new Date(iso).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

const pillTone = {
  shared: 'text-[color:var(--on)]', masked: 'text-[color:var(--on)]', allowed: 'bg-emerald-100 text-emerald-800',
  blocked: 'bg-gray-100 text-gray-600', leaked: 'bg-red-100 text-red-700',
};
const pillText = { shared: 'Shared', masked: 'Blurred', allowed: 'Sent (anonymous)', blocked: 'Blocked', leaked: 'Leaked' };

export default function SafeAppDashboard({ appId }) {
  const app = APPS[appId];
  const kit = kitFor(appId);
  const { requests, APP_NAME, STORE_KEY, loadShared, saveShared, isPending, setPending } = kit;
  const pending = kit.usePending();
  const PINK = app.color;
  const ACC = app.accent;
  const BG = app.bg;
  const { logTypes, facts } = app;
  const loadEntries = () => { try { return JSON.parse(localStorage.getItem(app.logKey) || '[]'); } catch { return []; } };
  const vault = useVault(appId);
  const badge = useBadge(appId);
  const shieldOn = useShield();
  const events = useEvents();

  const [session, setSession] = useState('locked'); // locked | real | decoy
  const [tab, setTab] = useState('home');
  const [sdkOpen, setSdkOpen] = useState(false);
  const [shared, setShared] = useState(loadShared);
  const [logType, setLogType] = useState(Object.keys(logTypes)[0]);
  const [picked, setPicked] = useState([]);
  const [entries, setEntries] = useState(loadEntries);
  const [scan, setScan] = useState('idle'); // idle | scanning | found
  const [confirmWipe, setConfirmWipe] = useState(false);
  const [probe, setProbe] = useState(() => JSON.stringify({ event: 'screen_view', email: 'priya@mail.com', city: 'Mumbai' }));
  const [probeResult, setProbeResult] = useState(null);
  const taps = useRef({ n: 0, t: 0 });

  // The tab title must not give the app away while it is locked or showing the decoy.
  useEffect(() => {
    document.title = session === 'locked' ? 'SurakshaShield' : session === 'decoy' ? (app.decoy === 'calculator' ? 'Calculator' : 'Calendar') : app.title;
  }, [app, session]);

  useEffect(() => {
    try { localStorage.setItem(app.logKey, JSON.stringify(entries)); } catch { /* ignore */ }
  }, [entries]);

  // First time in: the partner app's request is already waiting.
  useEffect(() => {
    if (!loadShared() && !isPending()) setPending(true);
  }, []);

  // A waiting request opens as soon as {app.name} is open.
  useEffect(() => {
    // Requests wait while the app is locked or showing the harmless calendar.
    if (!vault.wiped && session === 'real' && pending) setSdkOpen(true);
    if (session !== 'real') setSdkOpen(false);
  }, [pending, vault.wiped, session]);

  useEffect(() => {
    const onStorage = e => { if (e.key === STORE_KEY) setShared(loadShared()); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const openLog = type => { setLogType(type); setPicked([]); setTab('log'); };
  const pick = value => setPicked(cur => logTypes[logType].single ? [value] : cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value]);
  const saveEntry = () => {
    if (!picked.length) return;
    const entry = { id: Date.now(), type: logType, values: picked, at: new Date().toISOString() };
    setEntries(cur => [entry, ...cur]);
    const cipher = sha256(JSON.stringify(entry));
    addEvent({ source: app.name, dest: app.vaultName, event: 'sync_log', action: 'shared', note: 'Saved to your own vault', payload: { entry_digest: `${cipher.slice(0, 8)}…`, bytes: 480 + picked.length * 32 } });
    setPicked([]);
    setTab('history');
  };
  const closeSdk = () => { setSdkOpen(false); setShared(loadShared()); };

  const revoke = () => {
    const decisions = Object.fromEntries(requests.map(r => [r.key, 'block']));
    requests.forEach(r => {
      if (shared?.decisions?.[r.key] && shared.decisions[r.key] !== 'block') {
        addEvent({ source: app.name, dest: APP_NAME, event: `revoke_${r.key}`, action: 'blocked', note: 'You stopped sharing this' });
      }
    });
    const next = { received: {}, decisions, proof: null, at: new Date().toISOString() };
    saveShared(next);
    setShared(next);
  };

  // Case 5: a third-party ad SDK inside the app tries to send private data and the device ID.
  const runAdSdk = () => {
    // No consent was ever given to this company, so every sensitive field is stopped.
    shieldSend({ source: 'SampleAds SDK', dest: 'ads.sampleads.io', event: app.ad.event, payload: app.ad.full, blockedNote: app.ad.blocked });
  };

  // Try any request and watch it being sorted.
  const runProbe = () => {
    let payload;
    try { payload = JSON.parse(probe); if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('bad'); } catch { setProbeResult({ error: 'Enter the request as JSON, for example {"email": "a@b.com"}' }); return; }
    setProbeResult(shieldSend({ source: 'Test request', dest: 'custom.example.com', event: 'custom_request', payload }));
  };

  // Case 8: look for signs of stalkerware.
  const runScan = () => {
    setScan('scanning');
    window.setTimeout(() => {
      setScan('found');
      addEvent({ source: app.name, dest: 'On this phone', event: 'stalkerware_check', action: 'info', note: 'Warning shown. Nothing was removed automatically' });
    }, 1500);
  };

  // Same note for both PINs, so the ledger never shows which vault was opened.
  const unlock = (mode, fresh) => {
    addEvent({ source: app.name, dest: 'On this phone', event: 'app_unlock', action: 'info', note: 'App opened' });
    setTab('home');
    setSession(mode);
    if (fresh) setPending(true);
  };
  const lock = () => { setSession('locked'); setSdkOpen(false); };

  // Hide instead of wipe: show the harmless calendar now, keep the real data safe.
  const hide = () => {
    addEvent({ source: app.name, dest: 'On this phone', event: 'app_hidden', action: 'info', note: 'App opened' });
    setSession('decoy');
  };

  // Case 9: panic. The key is destroyed, so the old data can never be read again.
  const panic = () => {
    setConfirmWipe(false);
    try { localStorage.removeItem(app.logKey); localStorage.removeItem(STORE_KEY); } catch { /* ignore */ }
    setPending(false);
    setEntries([]);
    setShared(null);
    setTab('home');
    saveVault(appId, { wiped: true, realPin: null, decoyPin: null });
    addEvent({ source: app.name, dest: 'On this phone', event: 'panic_wipe', action: 'info', note: 'Encryption key destroyed. Real data is unreadable' });
  };

  // Five quick taps on the logo is the secret panic gesture.
  const logoTap = () => {
    const now = Date.now();
    taps.current = { n: now - taps.current.t < 2500 ? taps.current.n + 1 : 1, t: now };
    if (taps.current.n >= 5) { taps.current = { n: 0, t: 0 }; panic(); }
  };

  const leaving = events.filter(e => e.action !== 'info').slice(-12).reverse();

  const tabs = [
    ['home', 'Home', 'home'],
    ['log', 'Log', 'edit_note'],
    ['history', 'History', 'history'],
    ['sharing', 'Sharing', 'share'],
    ['security', 'Security', 'shield_lock'],
  ];
  const badgeOk = badge.status === 'passed';

  if (!vault.wiped && session === 'locked') return <PinLock appId={appId} onUnlock={unlock} />;
  if (!vault.wiped && session === 'decoy') return app.decoy === 'calculator' ? <DecoyCalculator onLock={lock} /> : <DecoyCalendar onLock={lock} />;

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden" style={{ background: BG, color: app.ink, colorScheme: 'light', '--app': PINK, '--app-soft': app.soft, '--on': app.on, '--accent': app.accent }}>
      {sdkOpen && <SdkRequestModal appId={appId} onClose={closeSdk} />}
      <aside className="text-[color:var(--on)] md:w-56 shrink-0 flex md:flex-col gap-2 p-4 md:p-5" style={{ background: PINK }}>
        <button type="button" onClick={logoTap} className="flex items-center gap-2 md:mb-6 text-left select-none" aria-label={app.name}>
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{app.icon}</span>
          <span className="text-xl font-bold">{app.name}</span>
        </button>
        <a href={app.badgeRoute} target="_blank" rel="noopener" className="hidden md:flex flex-col gap-1 self-start px-3 py-1.5 rounded-xl bg-[#0B0E1A] shadow-sm -mt-3 mb-3" title="Check this badge live">
          <span className="flex items-center gap-2">
            <img alt="" className="h-6 w-auto rounded-md" src={brandMark} />
            <span className="text-sm font-bold text-white tracking-wide">SurakshaShield</span>
          </span>
          <span className={`text-[10px] font-semibold uppercase tracking-wide ${badgeOk ? 'text-emerald-300' : 'text-red-300'}`}>{badgeOk ? 'Badge active' : 'Badge revoked'}</span>
        </a>
        <nav className="flex md:flex-col gap-1 ml-auto md:ml-0 md:flex-1">
          {tabs.map(([key, label, icon]) => (
            <button key={key} type="button" onClick={() => setTab(key)} className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-colors ${tab === key ? 'bg-white text-[color:var(--accent)] shadow-sm' : 'hover:bg-white/15'}`}>
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
          {!vault.wiped && (
            <button type="button" onClick={lock} className="flex items-center gap-2 px-3 py-2 rounded-xl font-medium hover:bg-white/15 md:mt-auto">
              <span className="material-symbols-outlined text-[20px]">lock</span>
              <span className="hidden sm:inline">Lock</span>
            </button>
          )}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-5 md:p-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {vault.wiped && (
            <div className={`${card} p-8 flex flex-col items-center text-center gap-3 max-w-xl mx-auto`}>
              <span className="material-symbols-outlined text-5xl" style={{ color: ACC }}>key_off</span>
              <h1 className="text-2xl font-bold">This vault was wiped</h1>
              <p className="opacity-75">The encryption key was destroyed, so the old data cannot be read by anyone. You can start a new, empty vault.</p>
              <button type="button" onClick={() => { saveVault(appId, { wiped: false }); setSession('locked'); }} className="h-11 px-5 rounded-xl text-[color:var(--on)] font-semibold" style={{ background: PINK }}>Start a new vault</button>
            </div>
          )}

          {!vault.wiped && tab === 'home' && (
            <>
              <div className={`${card} p-6 flex flex-col md:flex-row items-center gap-8`}>
                <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" fill="none" r="82" stroke={app.soft} strokeWidth="14" />
                    <circle cx="100" cy="100" fill="none" r="82" stroke={PINK} strokeDasharray={`${app.ring.dash} 515`} strokeLinecap="round" strokeWidth="14" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs uppercase tracking-wider opacity-60">{app.ring.top}</span>
                    <span className="text-4xl font-bold -my-0.5">{app.ring.mid}</span>
                    <span className="text-xs opacity-70">{app.ring.bot}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <h1 className="text-3xl font-bold">{app.welcome}</h1>
                  <p className="opacity-75">{app.intro}</p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-3">Quick Log</h2>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(logTypes).map(([key, t]) => (
                    <button key={key} type="button" onClick={() => openLog(key)} className={`${card} p-4 text-left flex flex-col gap-3 hover:brightness-95 transition-all`}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[color:var(--on)]" style={{ background: PINK }}>
                        <span className="material-symbols-outlined text-[20px]">{t.icon}</span>
                      </div>
                      <span className="font-medium">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={`${card} p-6 flex flex-col gap-3`}>
                <span className="text-lg font-semibold">About this app</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {facts.map(([k, v]) => (
                    <div key={k} className="p-3 rounded-xl border border-[color-mix(in_srgb,var(--app)_25%,transparent)]" style={{ background: BG }}>
                      <div className="text-xs opacity-60">{k}</div>
                      <div className="font-medium mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {!vault.wiped && tab === 'log' && (
            <div className={`${card} p-6 flex flex-col gap-5 max-w-2xl`}>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(logTypes).map(([key, t]) => (
                  <button key={key} type="button" onClick={() => { setLogType(key); setPicked([]); }} className={`px-4 py-2 rounded-full font-medium border transition-colors ${logType === key ? 'border-transparent text-[color:var(--on)]' : 'border-[color-mix(in_srgb,var(--app)_40%,transparent)] bg-white hover:bg-[var(--app-soft)]'}`} style={logType === key ? { background: PINK } : undefined}>
                    {t.label}
                  </button>
                ))}
              </div>
              <h2 className="text-xl font-semibold">{logTypes[logType].title}</h2>
              <div className="flex flex-wrap gap-2">
                {logTypes[logType].options.map(o => (
                  <button key={o} type="button" onClick={() => pick(o)} className={`px-4 py-2 rounded-xl border font-medium transition-colors ${picked.includes(o) ? 'border-transparent text-[color:var(--on)]' : 'border-[color-mix(in_srgb,var(--app)_40%,transparent)] bg-white hover:bg-[var(--app-soft)]'}`} style={picked.includes(o) ? { background: PINK } : undefined}>
                    {o}
                  </button>
                ))}
              </div>
              <button type="button" onClick={saveEntry} disabled={!picked.length} className="h-12 rounded-xl text-[color:var(--on)] font-semibold shadow-sm transition-all disabled:opacity-40 hover:brightness-95" style={{ background: PINK }}>
                Save entry
              </button>
            </div>
          )}

          {!vault.wiped && tab === 'history' && (
            <div className={`${card} p-6 flex flex-col gap-4`}>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">History</span>
                {entries.length > 0 && <button type="button" className="text-sm font-medium underline" onClick={() => setEntries([])}>Clear all</button>}
              </div>
              {entries.length === 0 && <p className="opacity-70">Nothing logged yet. Use the Log tab to add your first entry.</p>}
              {entries.map(e => (
                <div key={e.id} className="flex items-center gap-3 p-3 rounded-xl border border-[color-mix(in_srgb,var(--app)_25%,transparent)]" style={{ background: BG }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[color:var(--on)]" style={{ background: PINK }}>
                    <span className="material-symbols-outlined text-[20px]">{logTypes[e.type].icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{logTypes[e.type].label}: {e.values.join(', ')}</div>
                    <div className="text-xs opacity-60">{fmt(e.at)}</div>
                  </div>
                  <button type="button" aria-label="Delete entry" onClick={() => setEntries(cur => cur.filter(x => x.id !== e.id))}>
                    <span className="material-symbols-outlined text-[20px] opacity-60 hover:opacity-100">close</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {!vault.wiped && tab === 'sharing' && (
            <div className="flex flex-col gap-4 max-w-3xl">
              <div>
                <h1 className="text-2xl font-bold">Who gets your data</h1>
                <p className="opacity-70 mt-1">Every company that receives information from {app.name}, and exactly what they get.</p>
              </div>

              <div className={`${card} p-5 flex flex-col gap-3`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[color:var(--on)]" style={{ background: kit.partner.color }}>
                      <span className="material-symbols-outlined">{kit.partner.icon}</span>
                    </div>
                    <div>
                      <div className="font-semibold">{APP_NAME}</div>
                      <div className="text-xs opacity-60">{shared ? `Updated ${fmt(shared.at)}` : 'No decision yet'}</div>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${shared && Object.keys(shared.received).length ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
                    {shared && Object.keys(shared.received).length ? 'Sharing' : 'Nothing shared'}
                  </span>
                </div>
                <p className="text-sm opacity-70">Purpose: {kit.partner.sharingPurpose}</p>
                <div className="flex flex-col gap-1">
                  {requests.map(r => {
                    const d = shared?.decisions?.[r.key] ?? 'block';
                    return (
                      <div key={r.key} className="flex items-center justify-between text-sm p-2 rounded-md border border-[color-mix(in_srgb,var(--app)_20%,transparent)]">
                        <span className="font-medium">{r.label}</span>
                        <span className={`px-2 py-0.5 rounded uppercase text-[10px] font-bold ${d === 'block' ? 'bg-gray-100 text-gray-600' : 'text-[color:var(--on)]'}`} style={d === 'block' ? undefined : { background: PINK }}>{d === 'allow' ? 'Shared' : d === 'mask' ? r.maskLabel : 'Blocked'}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setSdkOpen(true)} className="h-10 px-4 rounded-xl border font-semibold" style={{ borderColor: PINK, color: ACC }}>Change choices</button>
                  {shared && Object.keys(shared.received).length > 0 && (
                    <button type="button" onClick={revoke} className="h-10 px-4 rounded-xl border border-red-300 text-red-700 font-semibold">Stop sharing</button>
                  )}
                </div>
              </div>

              <div className={`${card} p-5 flex flex-col gap-3`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[color:var(--on)]" style={{ background: PINK }}>
                    <span className="material-symbols-outlined">campaign</span>
                  </div>
                  <div>
                    <div className="font-semibold">Ad and analytics companies inside {app.name}</div>
                    <div className="text-xs opacity-60">SampleAds SDK</div>
                  </div>
                </div>
                <p className="text-sm opacity-70">This company tries to send {app.ad.what} to its servers. SurakshaShield is {shieldOn ? 'on, so private data is stopped and only an anonymous count is sent' : 'off, so everything is sent unchanged'}. You can switch it in the Live Monitor.</p>
                <button type="button" onClick={runAdSdk} className="self-start h-10 px-4 rounded-xl text-[color:var(--on)] font-semibold hover:brightness-95" style={{ background: PINK }}>Let SampleAds send data</button>
              </div>

              <div className={`${card} p-5 flex flex-col gap-3`}>
                <div className="font-semibold">Test a request</div>
                <p className="text-sm opacity-70">Type any request as JSON. SurakshaShield sorts each field by what it is, then stops or lets it through.</p>
                <textarea value={probe} onChange={e => setProbe(e.target.value)} rows={3} spellCheck={false} aria-label="Request" className="w-full p-3 rounded-xl border border-[color-mix(in_srgb,var(--app)_40%,transparent)] bg-white font-mono text-xs outline-none" />
                <button type="button" onClick={runProbe} className="self-start h-10 px-4 rounded-xl border font-semibold" style={{ borderColor: PINK, color: ACC }}>Send through SurakshaShield</button>
                {probeResult?.error && <p className="text-sm text-red-700">{probeResult.error}</p>}
                {probeResult?.fields && (
                  <div className="flex flex-col gap-1">
                    {probeResult.fields.map(f => (
                      <div key={f.key} className="flex items-center justify-between gap-3 text-sm p-2 rounded-md border border-[color-mix(in_srgb,var(--app)_20%,transparent)]">
                        <span className="font-medium truncate">{f.key}</span>
                        <span className="text-xs opacity-60 whitespace-nowrap">{f.tag}</span>
                        <span className={`px-2 py-0.5 rounded uppercase text-[10px] font-bold ${f.result === 'block' ? 'bg-gray-100 text-gray-600' : f.sensitive ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'}`}>{f.result === 'block' ? 'Stopped' : probeResult.action === 'leaked' && f.sensitive ? 'Leaked' : 'Sent'}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={`${card} p-5 flex flex-col gap-2`}>
                <div className="font-semibold">What tried to leave my phone</div>
                {leaving.length === 0 && <p className="text-sm opacity-70">Nothing yet.</p>}
                {leaving.map(e => (
                  <div key={e.id} className="flex items-center gap-3 p-2.5 rounded-lg border border-[color-mix(in_srgb,var(--app)_20%,transparent)] text-sm">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{e.dest}</div>
                      <div className="text-xs opacity-60 truncate">{e.note || e.event}</div>
                    </div>
                    <span className="text-xs opacity-60 whitespace-nowrap">{fmt(new Date(e.ts).toISOString())}</span>
                    <span className={`px-2 py-0.5 rounded uppercase text-[10px] font-bold ${pillTone[e.action] || ''}`} style={e.action === 'shared' || e.action === 'masked' ? { background: PINK } : undefined}>{e.action === 'masked' ? app.maskPill : pillText[e.action] || e.action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!vault.wiped && tab === 'security' && (
            <div className="flex flex-col gap-4 max-w-3xl">
              <div>
                <h1 className="text-2xl font-bold">Security</h1>
                <p className="opacity-70 mt-1">Protection against someone watching your phone.</p>
              </div>

              <div className={`${card} p-5 flex flex-col gap-3`}>
                <div className="font-semibold">Is someone watching my phone?</div>
                <p className="text-sm opacity-70">We look for apps with hidden icons or with permission to read your screen.</p>
                {scan === 'idle' && <button type="button" onClick={runScan} className="self-start h-10 px-4 rounded-xl text-[color:var(--on)] font-semibold hover:brightness-95" style={{ background: PINK }}>Run a security check</button>}
                {scan === 'scanning' && <div className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined animate-spin" style={{ color: ACC }}>progress_activity</span>Checking your phone quietly...</div>}
                {scan === 'found' && <StalkerwareWarning />}
              </div>

              <div className={`${card} p-5 flex flex-col gap-3`}>
                <div className="font-semibold">Hide the app for now</div>
                <p className="text-sm opacity-70">Shows a plain {app.decoy} right away. Nothing is deleted. Your real data opens again when you lock the app and enter your real PIN.</p>
                <button type="button" onClick={hide} className="self-start h-10 px-4 rounded-xl border font-semibold" style={{ borderColor: PINK, color: ACC }}>Hide now</button>
              </div>

              <div className={`${card} p-5 flex flex-col gap-3`}>
                <div className="font-semibold">Panic wipe</div>
                <p className="text-sm opacity-70">In an emergency, tap the {app.name} logo five times quickly, or use the button below. The encryption key is deleted, so nobody can read your data again.</p>
                {!confirmWipe
                  ? <button type="button" onClick={() => setConfirmWipe(true)} className="self-start h-10 px-4 rounded-xl border border-red-300 text-red-700 font-semibold">Use panic wipe now</button>
                  : (
                    <div className="flex gap-2">
                      <button type="button" onClick={panic} className="h-10 px-4 rounded-xl bg-red-600 text-white font-semibold">Yes, do it</button>
                      <button type="button" onClick={() => setConfirmWipe(false)} className="h-10 px-4 rounded-xl border font-semibold">Cancel</button>
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
