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
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-140px)] flex items-center justify-center py-space-xl">
        <div className="w-full max-w-xl mx-auto px-margin-mobile md:px-margin">
          <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-xl flex flex-col gap-space-lg border border-surface-container">
            {/* Logo & Heading */}
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-on-primary text-[24px]">vital_signs</span>
              </div>
              <h1 className="font-headline-md text-headline-md tracking-tight text-primary font-bold">CycleSafe Privacy Consent</h1>
            </div>

            {/* Description */}
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              CycleSafe protects your personal health data using the <strong>SurakshaShield SDK</strong>. Choose what data you want to store or share below. You can change these preferences at any time.
            </p>

            {/* 4 Consent Toggles */}
            <div className="space-y-space-md">
              <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between gap-space-md">
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-on-surface font-semibold">Health & Cycle Tracking</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Log period, symptom, and ovulation data on your device.</span>
                </div>
                <Toggle label="Health and cycle tracking" enabled={consents.health} onChange={() => toggleConsent('health')} />
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between gap-space-md">
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-on-surface font-semibold">Cloud Backup & Sync</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Sync encrypted backup across your registered devices.</span>
                </div>
                <Toggle label="Cloud backup and sync" enabled={consents.sync} onChange={() => toggleConsent('sync')} />
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between gap-space-md">
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-on-surface font-semibold">Advertising & Analytics</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Share anonymous identifiers with marketing networks.</span>
                </div>
                <Toggle label="Advertising and analytics" enabled={consents.ads} onChange={() => toggleConsent('ads')} />
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between gap-space-md">
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-on-surface font-semibold">Anonymous Research Sharing</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Share de-identified data with health research partners.</span>
                </div>
                <Toggle label="Anonymous research sharing" enabled={consents.research} onChange={() => toggleConsent('research')} />
              </div>
            </div>

            {/* Accept Button */}
            <button
              className={`w-full py-space-md px-space-lg ${accepted ? 'bg-secondary' : 'bg-primary hover:bg-primary-container'} text-on-primary font-headline-sm text-headline-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-space-sm mt-space-sm`}
              id="accept-vault-btn"
              type="button"
              onClick={initializeVault}
              disabled={initializing}
            >
              {initializing ? (
                <><span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span><span>Saving Consent Preferences...</span></>
              ) : accepted ? (
                <><span className="material-symbols-outlined text-[20px]">check_circle</span><span>Consent Saved</span></>
              ) : (
                <><span>Accept & Continue</span><span className="material-symbols-outlined text-[20px]">arrow_forward</span></>
              )}
            </button>
          </div>
        </div>
      </main>
      <Footer variant="app" />
    </>
  );
}
