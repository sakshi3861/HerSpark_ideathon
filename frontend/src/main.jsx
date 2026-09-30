import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ConsoleOverview from './pages/ConsoleOverview.jsx';
import ConsoleLiveTraffic from './pages/ConsoleLiveTraffic.jsx';
import ConsoleAuditLedger from './pages/ConsoleAuditLedger.jsx';
import VerifiedRegistry from './pages/VerifiedRegistry.jsx';
import Landing from './pages/Landing.jsx';
import SurakshaShieldOverview from './pages/SurakshaShieldOverview.jsx';
import NotFound from './pages/NotFound.jsx';
import SafeAppDashboard from './pages/SafeAppDashboard.jsx';
import PartnerAppDashboard from './pages/PartnerAppDashboard.jsx';
import BadgeCheck from './pages/BadgeCheck.jsx';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<SurakshaShieldOverview />} />
        <Route path="/cyclesafe" element={<Navigate to="/cyclesafe/home" replace />} />
        <Route path="/badge/:app" element={<BadgeCheck />} />
        <Route path="/cyclesafe/home" element={<SafeAppDashboard appId="cyclesafe" />} />
        <Route path="/finsafe" element={<Navigate to="/finsafe/home" replace />} />
        <Route path="/finsafe/home" element={<SafeAppDashboard appId="finsafe" />} />
        <Route path="/healthapp" element={<PartnerAppDashboard appId="cyclesafe" />} />
        <Route path="/foodapp" element={<PartnerAppDashboard appId="finsafe" />} />
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
