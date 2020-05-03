import coeffect, { globalGetBuilder } from './global';

export const registerGlobalCoeffect = coeffect;

export const globalBuilder = {
  get: globalGetBuilder
};

export default function registerGlobalBatteries(store) {
  coeffect(store);
}
