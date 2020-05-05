import effect, { stateSet } from './setState';
import coeffect, { stateGet } from './state';
import defaultStore from '../store';

export const registerStateEffect = effect;
export const registerStateCoeffect = coeffect;

export const state = {
  get: stateGet,
  set: stateSet,
};

export default function registerStateBatteries(store = defaultStore) {
  effect(store);
  coeffect(store);
}
