import { createStore } from './store';

// The Live Monitor's shield switch. Shared across tabs, so flipping it in the console
// changes what the CycleSafe tab does with the next request.
const store = createStore('ss-shield', true);

export const getShield = () => store.get();
export const toggleShield = () => store.set(!store.get());
export const useShield = () => store.use();
