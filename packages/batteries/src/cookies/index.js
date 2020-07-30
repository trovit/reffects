import setCookieEffect, { cookieSet } from './setCookie';
import removeCookieEffect, { cookieRemove } from './removeCookie';
import getCookieCoeffect, { cookieGet } from './getCookie';

export const registerSetCookieEffect = setCookieEffect;
export const registerGetCookieCoeffect = getCookieCoeffect;

export const cookies = {
  get: cookieGet,
  set: cookieSet,
  remove: cookieRemove,
};

export default function registerCookiesBatteries(cookieClient) {
  setCookieEffect(cookieClient);
  removeCookieEffect(cookieClient);
  getCookieCoeffect(cookieClient);
}
