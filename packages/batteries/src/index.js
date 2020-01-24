import registerCookiesBatteries, {
  registerSetCookieEffect,
  registerGetCookieCoeffect,
} from './cookies';
import registerGlobalBatteries, { registerGlobalCoeffect } from './global';
import registerHttpBatteries from './http';
import registerQueryParamsBatteries, {
  registerQueryParamsCoeffect,
} from './queryParams';

export {
  registerSetCookieEffect,
  registerGetCookieCoeffect,
  registerCookiesBatteries,
  registerGlobalCoeffect,
  registerGlobalBatteries,
  registerHttpBatteries,
  registerQueryParamsCoeffect,
  registerQueryParamsBatteries,
};
