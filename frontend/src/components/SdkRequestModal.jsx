import React, { useState } from 'react';
import { APP_NAME, PURPOSE, requests, defaultDecisions, applyDecisions, proofHash, saveShared, setPending } from '../data/healthRequest';
import { addEvent } from '../state/events';

// One entry in the shared log for every category the user decided on.
const logDecisions = (decisions, received) => {
  requests.forEach(r => {
    const d = decisions[r.key];
    addEvent({
      source: 'CycleSafe', dest: APP_NAME, event: `share_${r.key}`,
      action: d === 'allow' ? 'shared' : d === 'mask' ? 'masked' : 'blocked',
      note: d === 'block' ? 'You did not allow this' : d === 'mask' ? 'City only' : 'You allowed this',
      payload: received[r.key] ?? {},
    });
  });
};

const SDK = '#005f73';

// SurakshaShield SDK pop-up: reports on a third party's data request and lets the user decide.
export default function SdkRequestModal({ onClose }) {
  const [decisions, setDecisions] = useState(defaultDecisions);
  const [done, setDone] = useState(null);
  const neededCount = requests.filter(r => r.needed).length;
  const sharedCount = Object.values(decisions).filter(d => d !== 'block').length;

  const setOne = (key, value) => setDecisions(cur => ({ ...cur, [key]: value }));

  const submit = async () => {
    const received = applyDecisions(decisions);
    const proof = await proofHash(received);
    saveShared({ received, decisions, proof, at: new Date().toISOString() });
    logDecisions(decisions, received);
    setPending(false);
    setDone({ proof, count: Object.keys(received).length });
  };

  const denyAll = () => {
    const decisions = Object.fromEntries(requests.map(r => [r.key, 'block']));
    saveShared({ received: {}, decisions, proof: null, at: new Date().toISOString() });
    logDecisions(decisions, {});
    setPending(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b2a30]/50" role="dialog" aria-modal="true" aria-label="SurakshaShield data request">
      <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border-2 text-[#0b2a30]" style={{ borderColor: SDK }}>
        <div className="flex items-center gap-3 p-5 text-white rounded-t-xl" style={{ background: SDK }}>
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider opacity-80">SurakshaShield SDK</div>
            <h2 className="text-lg font-bold leading-tight">{done ? 'Your choices were applied' : `${APP_NAME} is asking for your data`}</h2>
          </div>
        </div>

        {!done ? (
          <div className="p-5 flex flex-col gap-4">
            <div className="p-4 rounded-xl text-sm" style={{ background: '#eef7f9' }}>
              <div className="font-semibold mb-1">Report</div>
              <p>Stated purpose: {PURPOSE}</p>
              <p className="mt-1"><b>{neededCount}</b> of {requests.length} requests are needed for that purpose. <b>{requests.length - neededCount}</b> can be ignored.</p>
            </div>

            <div className="flex flex-col gap-3">
              {requests.map(r => {
                const d = decisions[r.key];
                return (
                  <div key={r.key} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: `${SDK}40` }}>
                    <span className="material-symbols-outlined shrink-0" style={{ color: SDK }}>{r.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">{r.label}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${r.needed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{r.needed ? 'Needed' : 'Can be ignored'}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold border" style={{ borderColor: `${SDK}55`, color: SDK }}>{r.sense}</span>
                        <span className="text-[10px] uppercase opacity-60">Risk: {r.risk}</span>
                      </div>
                      <p className="text-xs opacity-70 mt-0.5">{r.reason}</p>
                    </div>
                    {r.canMask ? (
                      <div className="flex rounded-lg overflow-hidden border shrink-0 text-xs font-semibold" style={{ borderColor: SDK }}>
                        {[['allow', 'Exact'], ['mask', 'City only'], ['block', 'Block']].map(([v, label]) => (
                          <button key={v} type="button" onClick={() => setOne(r.key, v)} className="px-2 py-1.5" style={d === v ? { background: SDK, color: '#fff' } : { color: SDK }}>{label}</button>
                        ))}
                      </div>
                    ) : (
                      <button type="button" role="switch" aria-checked={d === 'allow'} aria-label={`Share ${r.label}`} onClick={() => setOne(r.key, d === 'allow' ? 'block' : 'allow')} className="w-11 h-6 rounded-full p-0.5 transition-colors shrink-0" style={{ background: d === 'allow' ? SDK : '#c5d6da' }}>
                        <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${d === 'allow' ? 'translate-x-5' : ''}`} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button type="button" onClick={denyAll} className="h-12 px-5 rounded-xl border font-semibold" style={{ borderColor: SDK, color: SDK }}>Deny all</button>
              <button type="button" onClick={submit} className="flex-1 h-12 rounded-xl text-white font-semibold hover:brightness-110" style={{ background: SDK }}>
                Submit: share {sharedCount} of {requests.length}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 flex flex-col gap-4">
            <p>{APP_NAME} will receive {done.count} of {requests.length} categories. Everything else stays in CycleSafe.</p>
            <div className="flex flex-col gap-2 text-sm">
              {[['lock', 'Encrypted with ECC + ML-KEM hybrid key exchange'], ['draw', 'Signed with ML-DSA'], ['link', 'Recorded in the Proof Chain']].map(([ic, text]) => (
                <div key={text} className="flex items-center gap-2 p-2.5 rounded-lg" style={{ background: '#eef7f9' }}>
                  <span className="material-symbols-outlined text-[20px]" style={{ color: SDK }}>{ic}</span>{text}
                </div>
              ))}
              <div className="font-mono text-[11px] opacity-70 break-all">Proof: 0x{done.proof.slice(0, 40)}</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button type="button" onClick={onClose} className="flex-1 h-12 rounded-xl text-white font-semibold hover:brightness-110" style={{ background: SDK }}>Done</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
