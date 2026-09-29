import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConsoleSidebarNav from '../components/ConsoleSidebarNav';

export default function ConsoleLiveTraffic() {
  const [copied, setCopied] = useState(false);
  const copyBuffer = async () => {
    const buffer = '{\n  "period_day": 14,\n  "ovulation": true,\n  "ad_id": "8f3a91bb-4e20-41"\n}';
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
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold tracking-wider uppercase">Console</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">Live Traffic</span>
                </div>
                <ConsoleSidebarNav active="traffic" variant="traffic" />
              </div>
            </aside>

            <section className="flex-1 min-w-0 flex flex-col gap-space-xl">
              <div>
                <h1 className="page-title">Live Traffic Inspector</h1>
                <p className="page-sub">Streaming real-time network interception and data classification.</p>
              </div>

              {/* Filter Bar */}
              <div className="card flex flex-col md:flex-row items-center gap-space-md">
                <input className="field w-full md:flex-1" placeholder="Search payloads or endpoints..." type="text" />
                <select className="field w-full md:w-auto">
                  <option>All Destinations</option>
                  <option>Facebook Graph API</option>
                  <option>Google Analytics 4</option>
                  <option>AppsFlyer Attribution</option>
                  <option>Own Health Vault</option>
                </select>
                <select className="field w-full md:w-auto">
                  <option>All Statuses</option>
                  <option>Blocked</option>
                  <option>Masked</option>
                  <option>Allowed</option>
                  <option>Encrypted</option>
                </select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
                {/* Traffic Table (Trimmed to 6 Rows) */}
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="px-space-lg py-space-md bg-surface-container-lowest border-b border-outline-variant/30">
                <span className="font-title-md text-title-md font-semibold text-on-surface">Outbound Packets</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase">
                      <th className="table-cell">Time</th>
                      <th className="table-cell">Destination</th>
                      <th className="table-cell">Event</th>
                      <th className="table-cell text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30 font-body-sm text-body-sm text-on-surface">
                    <tr className="bg-primary/5">
                      <td className="table-cell font-mono text-primary">14:28:02</td>
                      <td className="table-cell font-medium">Facebook Graph API</td>
                      <td className="table-cell font-mono text-error">LogFertility</td>
                      <td className="table-cell text-right">
                        <span className="px-space-md py-space-xs rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">Blocked</span>
                      </td>
                    </tr>

                    <tr>
                      <td className="table-cell font-mono text-on-surface-variant">14:27:58</td>
                      <td className="table-cell">AppsFlyer Attribution</td>
                      <td className="table-cell font-mono text-tertiary">install_referrer</td>
                      <td className="table-cell text-right">
                        <span className="px-space-md py-space-xs rounded-full bg-surface-container-high text-tertiary font-label-sm text-label-sm font-semibold">Masked</span>
                      </td>
                    </tr>

                    <tr>
                      <td className="table-cell font-mono text-on-surface-variant">14:27:45</td>
                      <td className="table-cell">Google Analytics 4</td>
                      <td className="table-cell font-mono text-secondary">screen_view</td>
                      <td className="table-cell text-right">
                        <span className="px-space-md py-space-xs rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">Allowed</span>
                      </td>
                    </tr>

                    <tr>
                      <td className="table-cell font-mono text-on-surface-variant">14:27:32</td>
                      <td className="table-cell font-medium text-primary">Own Health Vault</td>
                      <td className="table-cell font-mono text-primary-container">sync_biomarker</td>
                      <td className="table-cell text-right">
                        <span className="px-space-md py-space-xs rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold">Encrypted</span>
                      </td>
                    </tr>

                    <tr>
                      <td className="table-cell font-mono text-on-surface-variant">14:27:14</td>
                      <td className="table-cell">Facebook Graph API</td>
                      <td className="table-cell font-mono text-error">purchase_symptom</td>
                      <td className="table-cell text-right">
                        <span className="px-space-md py-space-xs rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">Blocked</span>
                      </td>
                    </tr>

                    <tr>
                      <td className="table-cell font-mono text-on-surface-variant">14:26:55</td>
                      <td className="table-cell">AppsFlyer Attribution</td>
                      <td className="table-cell font-mono text-tertiary">device_ping</td>
                      <td className="table-cell text-right">
                        <span className="px-space-md py-space-xs rounded-full bg-surface-container-high text-tertiary font-label-sm text-label-sm font-semibold">Masked</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            
                {/* Detail Side Panel */}
            <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <span className="px-space-md py-space-xs rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold uppercase">
                  EGRESS INTERCEPTED
                </span>
                <span className="font-mono text-body-sm text-on-surface-variant">#PKT-94821</span>
              </div>

              <h2 className="font-title-md text-title-md text-on-surface font-bold">Facebook Graph API</h2>

              <div className="p-space-md bg-error-container/40 rounded-xl flex items-start gap-space-sm">
                <span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-space-xs">block</span>
                <p className="font-body-sm text-body-sm text-on-error-container">
                  <strong>TRANSMISSION DROPPED</strong> — Socket severed before HTTP serialization. Zero bytes transmitted.
                </p>
              </div>

              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase font-semibold text-outline">JSON Buffer</span>
                  <button onClick={copyBuffer} className="font-label-sm text-label-sm text-primary" type="button">
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="p-space-md bg-inverse-surface text-inverse-on-surface rounded-xl font-mono text-[12px]"><code>{`{\n  "period_day": 14,\n  "ovulation": true,\n  "ad_id": "8f3a91bb-4e20-41"\n}`}</code></pre>
              </div>
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
