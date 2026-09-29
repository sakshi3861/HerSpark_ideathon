import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ConsoleOverview from './pages/ConsoleOverview.jsx';
import ConsoleLiveTraffic from './pages/ConsoleLiveTraffic.jsx';
import ConsoleAuditLedger from './pages/ConsoleAuditLedger.jsx';
import VerifiedRegistry from './pages/VerifiedRegistry.jsx';
import Landing from './pages/Landing.jsx';
import SurakshaShieldOverview from './pages/SurakshaShieldOverview.jsx';
import CycleSafeWelcomeConsent from './pages/CycleSafeWelcomeConsent.jsx';
import CycleSafeLoginDuressPin from './pages/CycleSafeLoginDuressPin.jsx';
import NotFound from './pages/NotFound.jsx';
import CycleSafeHomeDashboard from './pages/CycleSafeHomeDashboard.jsx';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<SurakshaShieldOverview />} />
        <Route path="/cyclesafe/welcome" element={<CycleSafeWelcomeConsent />} />
        <Route path="/cyclesafe/login" element={<CycleSafeLoginDuressPin />} />
        <Route path="/cyclesafe/home" element={<CycleSafeHomeDashboard />} />
        <Route path="/console" element={<ConsoleOverview />} />
        <Route path="/console/live-traffic" element={<ConsoleLiveTraffic />} />
        <Route path="/console/audit-ledger" element={<ConsoleAuditLedger />} />
        <Route path="/registry" element={<VerifiedRegistry />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
