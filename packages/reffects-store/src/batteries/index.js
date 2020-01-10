import effect from './setState';
import coeffect from './state';

export const registerStateEffect = effect;
export const registerStateCoeffect = coeffect;

export default function registerStateBatteries(store) {
  effect(store);
  coeffect(store);
}
