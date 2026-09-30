import { createStore } from './store';
import { sha256 } from '../util/sha256';

// The public record for CycleSafe's SurakshaShield badge. The proof ties the build and the
// test date together, so the badge page can check it live when it opens.
export const proofOf = (build, testedAt) => sha256(`${build}|${testedAt}|cyclesafe`);

const BUILD = '3.2.0 (7c41e9)';
const TESTED = '2026-09-27';

const store = createStore('ss-badge', { status: 'passed', build: BUILD, testedAt: TESTED, proof: proofOf(BUILD, TESTED), reason: '' });

export const getBadge = () => store.get();
export const useBadge = () => store.use();

// Independent traffic test caught data leaving the phone.
export const revokeBadge = () => store.set({ ...store.get(), status: 'failed', reason: 'An independent test saw data leave the phone.' });

// A new test on a new build passes again.
export function passBadge() {
  const build = '3.2.1 (b83f02)';
  const testedAt = new Date().toISOString().slice(0, 10);
  store.set({ status: 'passed', build, testedAt, proof: proofOf(build, testedAt), reason: '' });
}
