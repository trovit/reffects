import coeffect, { globalGet } from './global';

export const registerGlobalCoeffect = coeffect;

export const globalVariable = {
  get: globalGet
};

export default function registerGlobalBatteries(store) {
  coeffect(store);
}
