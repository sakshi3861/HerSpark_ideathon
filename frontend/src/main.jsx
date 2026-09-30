import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import ClinicDetail from './pages/ClinicDetailShreeDentalCareFixTasks.jsx';
import ClinicPortal from './pages/ClinicPortalSunriseFamilyClinicDesktop.jsx';
import SelectRole from './pages/CyberSakhiBoxSelectRoleDesktop.jsx';
import PartnerHub from './pages/CyberSakhiPartnerHubSnehaKulkarni.jsx';
import PartnerDashboard from './pages/PartnerDashboardCyberSakhiBox.jsx';
import PartnerPortal from './pages/PartnerPortalCyberSakhiHubDesktop.jsx';
import ScamCheck from './pages/ScamCheckSunriseFamilyClinic.jsx';
import SetupHealth from './pages/SetupHealthScoreSunriseFamilyClinic.jsx';
import SecurityOverview from './pages/SunriseFamilyClinicSecurityOverview.jsx';

function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<SelectRole />} />
    <Route path="/clinic-detail" element={<ClinicDetail />} />
    <Route path="/clinic-portal" element={<ClinicPortal />} />
    <Route path="/select-role" element={<SelectRole />} />
    <Route path="/partner-hub" element={<PartnerHub />} />
    <Route path="/partner-dashboard" element={<PartnerDashboard />} />
    <Route path="/partner-portal" element={<PartnerPortal />} />
    <Route path="/scam-check" element={<ScamCheck />} />
    <Route path="/setup-health-score" element={<SetupHealth />} />
    <Route path="/security-overview" element={<SecurityOverview />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></BrowserRouter>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
