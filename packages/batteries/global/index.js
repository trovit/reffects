import coeffect from './global';

export const registerGlobalCoeffect = coeffect;

export default function registerGlobalBatteries(store) {
  coeffect(store);
}
