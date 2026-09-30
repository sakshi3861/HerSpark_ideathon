import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import { StoreProvider } from './store.jsx';
import Shell from './components/Shell.jsx';
import RoleSelect from './pages/RoleSelect.jsx';
import PartnerDashboard from './pages/PartnerDashboard.jsx';
import ClinicDetail from './pages/ClinicDetail.jsx';
import Earnings from './pages/Earnings.jsx';
import Health from './pages/Health.jsx';
import ScamCheck from './pages/ScamCheck.jsx';
import Backup from './pages/Backup.jsx';
import Approvals from './pages/Approvals.jsx';
import Report from './pages/Report.jsx';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelect />} />
          <Route path="/partner" element={<Shell role="partner" />}>
            <Route index element={<PartnerDashboard />} />
            <Route path="clinic/:id" element={<ClinicDetail />} />
            <Route path="earnings" element={<Earnings />} />
          </Route>
          <Route path="/clinic" element={<Shell role="clinic" />}>
            <Route index element={<Navigate to="health" replace />} />
            <Route path="health" element={<Health />} />
            <Route path="scam-check" element={<ScamCheck />} />
            <Route path="backup" element={<Backup />} />
            <Route path="approvals" element={<Approvals />} />
            <Route path="report" element={<Report />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
