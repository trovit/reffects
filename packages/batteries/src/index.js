import registerCookiesBatteries, {
  registerSetCookieEffect,
  registerGetCookieCoeffect,
  cookies,
} from './cookies';
import registerGlobalBatteries, { registerGlobalCoeffect, globals } from './global';
import registerHttpBatteries, { http } from './http';
import registerQueryParamsBatteries, {
  registerQueryParamsCoeffect,
  queryParams,
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
  cookies,
  globals,
  http,
  queryParams,
};
