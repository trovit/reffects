import effect from './setState';
import coeffect from './state';
import defaultStore from '../store';

export const registerStateEffect = effect;
export const registerStateCoeffect = coeffect;

export default function registerStateBatteries(store = defaultStore) {
  effect(store);
  coeffect(store);
}
