import setCookieEffect, { cookieSet } from './setCookie';
import getCookieCoeffect, { cookieGet } from './getCookie';

export const registerSetCookieEffect = setCookieEffect;
export const registerGetCookieCoeffect = getCookieCoeffect;

export const cookies = {
  get: cookieGet,
  set: cookieSet
};

export default function registerCookiesBatteries(cookieClient) {
  setCookieEffect(cookieClient);
  getCookieCoeffect(cookieClient);
}
