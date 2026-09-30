import { createStore } from './store';
import { sha256 } from '../util/sha256';
import { APPS } from '../data/apps';

// The public record for an app's SurakshaShield badge. The proof ties the build and the
// test date together, so the badge page can check it live when it opens.
export const proofOf = (build, testedAt, app = 'cyclesafe') => sha256(`${build}|${testedAt}|${app}`);

const stores = {};
const storeOf = id => {
  if (!stores[id]) {
    const a = APPS[id];
    stores[id] = createStore(a.badgeKey, { status: 'passed', build: a.build, testedAt: a.tested, proof: proofOf(a.build, a.tested, id), reason: '' });
  }
  return stores[id];
};

export const getBadge = id => storeOf(id).get();
export const useBadge = id => storeOf(id).use();

// Independent traffic test caught data leaving the phone.
export const revokeBadge = id => storeOf(id).set({ ...storeOf(id).get(), status: 'failed', reason: 'An independent test saw data leave the phone.' });

// A new test on a new build passes again.
export function passBadge(id) {
  const build = APPS[id].passBuild;
  const testedAt = new Date().toISOString().slice(0, 10);
  storeOf(id).set({ status: 'passed', build, testedAt, proof: proofOf(build, testedAt, id), reason: '' });
}
