import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { auditLog, clinics as seedClinics, initialPending } from './data/demo.js';

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

const WINDOW_MS = 15 * 60 * 1000;
const AUTO_APPROVE_MS = 2000;

// Fix flow for Shree Dental Care: idle -> waiting -> approved -> done.
const initialFixes = { 'FIX-PWD-01': { status: 'done' } };

export function StoreProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [toastMsg, setToastMsg] = useState(null);
  const [pending, setPending] = useState(() => [{ ...initialPending, expiresAt: Date.now() + WINDOW_MS }]);
  const [log, setLog] = useState(auditLog);
  const [fixes, setFixes] = useState(initialFixes);
  const [addedClinics, setAddedClinics] = useState([]);
  const [waAttested, setWaAttested] = useState(false);
  const toastTimer = useRef();
  const pendingRef = useRef(pending);
  pendingRef.current = pending;

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 3200);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const setFix = (fixId, patch) => setFixes((f) => ({ ...f, [fixId]: { ...f[fixId], ...patch } }));

  // Clinic approves a pending request (from the Approvals screen, or simulated after ~2s).
  const approve = useCallback((req, { silent = false } = {}) => {
    setPending((p) => p.filter((r) => r.id !== req.id));
    setLog((l) => [
      { time: 'Just now', who: 'Dr. Mehta', action: `Approved: ${req.title}`, fixId: req.fixId, result: 'Approved' },
      ...l,
    ]);
    if (req.fromFixFlow) setFix(req.fixId, { status: 'approved', expiresAt: Date.now() + WINDOW_MS });
    if (!silent) toast('Approved. Expires in 15 minutes.');
  }, [toast]);

  const deny = useCallback((req) => {
    setPending((p) => p.filter((r) => r.id !== req.id));
    setLog((l) => [
      { time: 'Just now', who: 'Dr. Mehta', action: `Denied: ${req.title}`, fixId: req.fixId, result: 'Denied' },
      ...l,
    ]);
    if (req.fromFixFlow) setFix(req.fixId, { status: 'idle' });
    toast('Request denied.');
  }, [toast]);

  // Partner asks for approval. It shows up in the clinic portal; the clinic side auto-approves after ~2s.
  const requestFix = useCallback((task) => {
    const req = { id: `p-${task.id}`, title: task.title, fixId: task.id, expiresAt: Date.now() + WINDOW_MS, fromFixFlow: true };
    setFix(task.id, { status: 'waiting' });
    setPending((p) => [...p.filter((r) => r.id !== req.id), req]);
    setTimeout(() => {
      if (pendingRef.current.some((r) => r.id === req.id)) approve(req, { silent: true });
    }, AUTO_APPROVE_MS);
  }, [approve]);

  const runFix = useCallback((task) => {
    setFix(task.id, { status: 'done' });
    setLog((l) => [
      { time: 'Just now', who: 'Sneha Kulkarni', action: task.title, fixId: task.id, result: 'Done' },
      ...l,
    ]);
    toast('Signed fix run and logged.');
  }, [toast]);

  const addClinic = useCallback((c) => {
    setAddedClinics((a) => [...a, { id: `new-${a.length + 1}`, score: null, status: 'awaiting', ...c }]);
    toast('Approval link sent to the doctor on WhatsApp');
  }, [toast]);

  const value = useMemo(() => ({
    lang, setLang, toast, toastMsg, pending, log, fixes, approve, deny, requestFix, runFix,
    clinics: [...seedClinics, ...addedClinics], addClinic, waAttested, setWaAttested,
  }), [lang, toast, toastMsg, pending, log, fixes, approve, deny, requestFix, runFix, addedClinics, addClinic, waAttested]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
