import registerCookiesBatteries, {
  registerSetCookieEffect,
  registerGetCookieCoeffect,
  cookies,
} from './cookies';
import registerGlobalBatteries, { registerGlobalCoeffect, globalVariable } from './global';
import registerHttpBatteries from './http';
import registerQueryParamsBatteries, {
  registerQueryParamsCoeffect,
  queryParams,
} from './queryParams';

export {
  cookies,
  globalVariable,
  queryParams,
  registerSetCookieEffect,
  registerGetCookieCoeffect,
  registerCookiesBatteries,
  registerGlobalCoeffect,
  registerGlobalBatteries,
  registerHttpBatteries,
  registerQueryParamsCoeffect,
  registerQueryParamsBatteries,
};
