import effect, { stateSetBuilder } from './setState';
import coeffect, { stateGetBuilder } from './state';
import defaultStore from '../store';

export const registerStateEffect = effect;
export const registerStateCoeffect = coeffect;

export const stateBuilder = {
  get: stateGetBuilder,
  set: stateSetBuilder,
};

export default function registerStateBatteries(store = defaultStore) {
  effect(store);
  coeffect(store);
}
