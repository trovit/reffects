import coeffect, { queryParamsGet } from './queryParams';

export const registerQueryParamsCoeffect = coeffect;

export const queryParams = {
  get: queryParamsGet
};

export default function registerQueryParamsBatteries(store) {
  coeffect(store);
}
