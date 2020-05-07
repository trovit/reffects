import setCookieEffect, { cookieSet } from './setCookie';
import getCookieCoeffect from './getCookie';

export const registerSetCookieEffect = setCookieEffect;
export const registerGetCookieCoeffect = getCookieCoeffect;

export const cookies = {
  set: cookieSet
};

export default function registerCookiesBatteries(cookieClient) {
  setCookieEffect(cookieClient);
  getCookieCoeffect(cookieClient);
}
