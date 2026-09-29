import React, { useEffect, useMemo, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConsoleSidebarNav from '../components/ConsoleSidebarNav';
import StatusPill from '../components/StatusPill';
import Skeleton from '../components/Skeleton';
import useLoading from '../hooks/useLoading';
import useNow from '../hooks/useNow';
import useTitle from '../hooks/useTitle';
import { useShield } from '../state/shield';
import { ago, clock, destinations, makeEvent, payloadFor, seedEvents, statuses } from '../data/traffic';

const PAGE_SIZE = 10;

const outcome = {
  Blocked: 'Request dropped before serialization. No bytes left the device.',
  Masked: 'Identifiers were coarsened before the request was sent.',
  Allowed: 'No sensitive fields detected. Sent unchanged.',
  Encrypted: 'Payload sealed with ML-KEM-768 before leaving the app.',
  Leaked: 'Shield was off. The original payload was sent to the destination.',
};

export default function ConsoleLiveTraffic() {
  useTitle('Live Traffic');
  const loading = useLoading(800);
  const now = useNow(1000);
  const shieldOn = useShield();
  const shieldRef = useRef(shieldOn);
  shieldRef.current = shieldOn;

  const [events, setEvents] = useState(() => seedEvents());
  const [query, setQuery] = useState('');
  const [dest, setDest] = useState('All destinations');
  const [status, setStatus] = useState('All statuses');
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [selectedId, setSelectedId] = useState(null);
  const [paused, setPaused] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    let id;
    const schedule = () => {
      id = window.setTimeout(() => {
        setEvents(current => [makeEvent(Date.now(), shieldRef.current), ...current].slice(0, 200));
        schedule();
      }, 3500 + Math.random() * 5000);
    };
    schedule();
    return () => window.clearTimeout(id);
  }, [paused]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter(e =>
      (dest === 'All destinations' || e.dest === dest) &&
      (status === 'All statuses' || e.status === status) &&
      (!q || `${e.dest} ${e.event} ${e.id} ${e.host || ''}`.toLowerCase().includes(q)));
  }, [events, query, dest, status]);

  const visible = filtered.slice(0, limit);
  const selected = filtered.find(e => e.id === selectedId) || filtered[0];
  const filtersActive = query || dest !== 'All destinations' || status !== 'All statuses';
  const clearFilters = () => { setQuery(''); setDest('All destinations'); setStatus('All statuses'); setLimit(PAGE_SIZE); };

  const buffer = selected ? JSON.stringify(payloadFor(selected), null, 2) : '';
  const copyBuffer = async () => {
    try { await navigator.clipboard.writeText(buffer); setCopied(true); window.setTimeout(() => setCopied(false), 2000); } catch { setCopied(false); }
  };

  return (
    <>
      <Header active="console_live_traffic" />
      <main className="w-full pt-20 bg-background min-h-screen">
        <div className="page">
          <div className="flex flex-col lg:flex-row items-start gap-space-lg w-full">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-space-md">
                <div className="flex flex-col px-space-xs">
                  <span className="text-t-caption text-on-surface-variant tracking-wider uppercase">Console</span>
                  <span className="text-t-section text-on-surface">Live Traffic</span>
                </div>
                <ConsoleSidebarNav active="traffic" variant="traffic" />
              </div>
            </aside>

            <section className="flex-1 min-w-0 flex flex-col gap-space-xl">
              <div>
                <h1 className="page-title">Live Traffic</h1>
                <p className="page-sub">Outbound requests from instrumented SDKs, newest first. Showing sandbox data.</p>
              </div>

              <div className="card flex flex-col md:flex-row items-center gap-space-md">
                <input
                  className="field w-full md:flex-1 border border-transparent focus:border-primary/40 transition-colors"
                  placeholder="Search host, event or request ID"
                  type="text"
                  value={query}
                  onChange={e => { setQuery(e.target.value); setLimit(PAGE_SIZE); }}
                  aria-label="Search requests"
                />
                <select className="field w-full md:w-auto cursor-pointer hover:bg-surface-container transition-colors" value={dest} onChange={e => { setDest(e.target.value); setLimit(PAGE_SIZE); }} aria-label="Destination">
                  <option>All destinations</option>
                  {destinations.map(d => <option key={d}>{d}</option>)}
                </select>
                <select className="field w-full md:w-auto cursor-pointer hover:bg-surface-container transition-colors" value={status} onChange={e => { setStatus(e.target.value); setLimit(PAGE_SIZE); }} aria-label="Status">
                  <option>All statuses</option>
                  {statuses.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
                <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col">
                  <div className="px-space-lg py-space-md border-b border-outline-variant/30 flex items-center justify-between gap-space-md">
                    <span className="text-t-card text-on-surface">Outbound requests</span>
                    <div className="flex items-center gap-space-md">
                      <span className="inline-flex items-center gap-space-sm text-t-caption text-on-surface-variant">
                        <span className={`w-2 h-2 rounded-full ${paused ? 'bg-outline' : 'bg-secondary animate-pulse'}`} />
                        {paused ? 'Paused' : 'Live'}
                      </span>
                      <button type="button" onClick={() => setPaused(p => !p)} className="inline-flex items-center gap-space-xs h-8 px-space-md rounded-lg text-t-button text-primary hover:bg-primary-fixed transition-colors">
                        <span className="material-symbols-outlined text-[16px]">{paused ? 'play_arrow' : 'pause'}</span>
                        {paused ? 'Resume' : 'Pause'}
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container-low text-on-surface-variant">
                          <th className="text-t-status uppercase py-space-sm px-space-lg">Time</th>
                          <th className="text-t-status uppercase py-space-sm px-space-lg">Destination</th>
                          <th className="text-t-status uppercase py-space-sm px-space-lg">Event</th>
                          <th className="text-t-status uppercase py-space-sm px-space-lg text-right">Latency</th>
                          <th className="text-t-status uppercase py-space-sm px-space-lg text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/30 text-t-body text-on-surface">
                        {loading && Array.from({ length: 8 }, (_, i) => (
                          <tr key={i}>
                            <td className="table-cell"><Skeleton className="h-4 w-16" /></td>
                            <td className="table-cell"><Skeleton className={`h-4 ${i % 3 ? 'w-36' : 'w-28'}`} /></td>
                            <td className="table-cell"><Skeleton className="h-4 w-24" /></td>
                            <td className="table-cell"><Skeleton className="h-4 w-12 ml-auto" /></td>
                            <td className="table-cell"><Skeleton className="h-6 w-20 ml-auto rounded-full" /></td>
                          </tr>
                        ))}
                        {!loading && visible.map(e => (
                          <tr
                            key={e.id}
                            onClick={() => setSelectedId(e.id)}
                            className={`cursor-pointer transition-colors ${selected && selected.id === e.id ? 'bg-primary/5' : 'hover:bg-surface-container-low'}`}
                          >
                            <td className="table-cell whitespace-nowrap font-mono text-t-mono text-on-surface-variant" title={clock(e.ts)}>{ago(e.ts, now)}</td>
                            <td className="table-cell">
                              <div className={`${e.dest === 'Own Health Vault' ? 'text-primary' : ''}`}>{e.dest}</div>
                              {e.host && <div className="font-mono text-t-mono text-on-surface-variant">{e.host}</div>}
                              {e.note && <div className="text-t-caption text-on-surface-variant">{e.note}{e.retries ? ` (${e.retries} retries)` : ''}</div>}
                            </td>
                            <td className="table-cell font-mono text-t-mono">{e.event}</td>
                            <td className={`table-cell text-right font-mono text-t-mono whitespace-nowrap ${e.latency > 1500 ? 'text-error' : 'text-on-surface-variant'}`}>{e.latency} ms</td>
                            <td className="table-cell text-right"><StatusPill status={e.status} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {!loading && filtered.length === 0 && (
                    <div className="flex flex-col items-center text-center gap-space-sm py-space-2xl px-space-lg">
                      <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-outline">
                        <span className="material-symbols-outlined">filter_list_off</span>
                      </div>
                      <div className="text-t-card text-on-surface">
                        {status !== 'All statuses' ? `No ${status.toLowerCase()} requests match this filter` : 'No requests match this filter'}
                      </div>
                      <p className="text-t-body text-on-surface-variant">Try a different destination or clear the search.</p>
                      <button type="button" onClick={clearFilters} className="btn-secondary mt-space-sm">Clear filters</button>
                    </div>
                  )}

                  {!loading && filtered.length > 0 && (
                    <div className="px-space-lg py-space-md border-t border-outline-variant/30 flex items-center justify-between gap-space-md">
                      <span className="text-t-body text-on-surface-variant">Showing {visible.length} of {filtered.length}{filtersActive ? ' matching' : ''} requests</span>
                      {visible.length < filtered.length && (
                        <button type="button" onClick={() => setLimit(l => l + PAGE_SIZE)} className="btn-secondary">Load more</button>
                      )}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md lg:sticky lg:top-28">
                  {loading ? (
                    <>
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-28 w-full" />
                    </>
                  ) : !selected ? (
                    <div className="flex flex-col items-center text-center gap-space-sm py-space-xl text-on-surface-variant">
                      <span className="material-symbols-outlined text-outline">touch_app</span>
                      <span className="text-t-body">Select a request to see its payload.</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <StatusPill status={selected.status} />
                        <span className="font-mono text-t-mono text-on-surface-variant">#{selected.id}</span>
                      </div>
                      <h2 className="text-t-card text-on-surface">{selected.dest}</h2>
                      <p className="text-t-body text-on-surface-variant">{outcome[selected.status]}</p>
                      <dl className="grid grid-cols-2 gap-space-md text-t-body">
                        <div><dt className="text-t-caption text-on-surface-variant">Latency</dt><dd className="font-mono text-t-mono text-on-surface">{selected.latency} ms</dd></div>
                        <div><dt className="text-t-caption text-on-surface-variant">Size</dt><dd className="font-mono text-t-mono text-on-surface">{selected.bytes} B</dd></div>
                        <div><dt className="text-t-caption text-on-surface-variant">Retries</dt><dd className="font-mono text-t-mono text-on-surface">{selected.retries}</dd></div>
                        <div><dt className="text-t-caption text-on-surface-variant">Seen</dt><dd className="font-mono text-t-mono text-on-surface">{clock(selected.ts)}</dd></div>
                      </dl>
                      <div className="flex flex-col gap-space-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-t-status uppercase text-outline">Payload</span>
                          <button onClick={copyBuffer} className="text-t-caption text-primary hover:underline underline-offset-4" type="button">{copied ? 'Copied' : 'Copy'}</button>
                        </div>
                        <pre className="p-space-md bg-inverse-surface text-inverse-on-surface rounded-xl font-mono text-t-mono overflow-x-auto"><code>{buffer}</code></pre>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
