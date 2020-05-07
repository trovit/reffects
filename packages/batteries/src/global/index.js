import coeffect, { globalsGet } from './global';

export const registerGlobalCoeffect = coeffect;

export const globals = {
  get: globalsGet
};

export default function registerGlobalBatteries(store) {
  coeffect(store);
}
