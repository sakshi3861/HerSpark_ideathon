import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toggle from '../components/Toggle';

export default function CycleSafeWelcomeConsent() {
  const navigate = useNavigate();
  const [consents, setConsents] = useState({ health: true, sync: true, ads: false, research: false });
  const [initializing, setInitializing] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const toggleConsent = key => setConsents(current => ({ ...current, [key]: !current[key] }));
  const initializeVault = () => {
    if (initializing) return;
    setInitializing(true);
    window.setTimeout(() => {
      setInitializing(false);
      setAccepted(true);
      window.setTimeout(() => navigate('/cyclesafe/login'), 1000);
    }, 1200);
  };

  return (
    <>
      <Header active="cyclesafe_welcome_consent" />
      <main className="w-full pt-20 bg-background text-on-surface min-h-screen">
        <div className="page">
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
          {/* Left Visual: Serene Editorial Photo */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative w-full h-full min-h-[480px] rounded-2xl overflow-hidden bg-surface-container-lowest p-2 border border-outline-variant/40 shadow-sm">
              <img
                src="/calm_woman.jpg"
                alt="Serene woman portrait"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-space-lg left-space-lg right-space-lg p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm">
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider">Your Body. Your Privacy.</p>
                <p className="text-xs text-on-surface-variant mt-space-xs">Zero unauthorized tracking or advertising egress.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Consent Card */}
          <div className="lg:col-span-7">
            <div className="card-bordered h-full flex flex-col gap-space-lg">
              {/* Logo & Heading */}
              <div className="flex items-center gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-white text-2xl">vital_signs</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-on-surface">Your Data, Your Choice</h1>
                  <p className="text-xs text-secondary font-medium">CycleSafe Privacy Controls</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-on-surface-variant text-sm leading-relaxed font-normal">
                CycleSafe protects your personal health data using <strong className="text-secondary font-normal">SurakshaShield</strong> socket-level encryption. You control what stays on your device.
              </p>

              {/* 4 Consent Toggles */}
              <div className="flex flex-col gap-space-md">
                <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between gap-space-md">
                  <div className="flex flex-col">
                    <span className="text-sm text-on-surface font-semibold">Health & Cycle Tracking</span>
                    <span className="text-xs text-on-surface-variant">Log period & ovulation data on your device.</span>
                  </div>
                  <Toggle label="Health and cycle tracking" enabled={consents.health} onChange={() => toggleConsent('health')} />
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between gap-space-md">
                  <div className="flex flex-col">
                    <span className="text-sm text-on-surface font-semibold">Cloud Backup & Sync</span>
                    <span className="text-xs text-on-surface-variant">Sync encrypted backup across registered devices.</span>
                  </div>
                  <Toggle label="Cloud backup and sync" enabled={consents.sync} onChange={() => toggleConsent('sync')} />
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between gap-space-md">
                  <div className="flex flex-col">
                    <span className="text-sm text-on-surface font-semibold">Advertising & Analytics</span>
                    <span className="text-xs text-on-surface-variant font-normal">Share identifiers with ad networks.</span>
                  </div>
                  <Toggle label="Advertising and analytics" enabled={consents.ads} onChange={() => toggleConsent('ads')} />
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between gap-space-md">
                  <div className="flex flex-col">
                    <span className="text-sm text-on-surface font-semibold">Anonymous Research Sharing</span>
                    <span className="text-xs text-on-surface-variant font-normal">Share de-identified data with health partners.</span>
                  </div>
                  <Toggle label="Anonymous research sharing" enabled={consents.research} onChange={() => toggleConsent('research')} />
                </div>
              </div>

              {/* Accept Button */}
              <button
                className={`w-full ${accepted ? 'btn bg-secondary text-white' : 'btn-primary'}`}
                id="accept-vault-btn"
                type="button"
                onClick={initializeVault}
                disabled={initializing}
              >
                {initializing ? (
                  <><span className="material-symbols-outlined animate-spin text-xl">progress_activity</span><span>Saving Consent Preferences...</span></>
                ) : accepted ? (
                  <><span className="material-symbols-outlined text-xl">check_circle</span><span>Consent Saved</span></>
                ) : (
                  <><span>Accept & Continue</span><span className="material-symbols-outlined text-xl">arrow_forward</span></>
                )}
              </button>
            </div>
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
