import setCookieEffect from './setCookie';
import getCookieCoeffect from './getCookie';

export const registerSetCookieEffect = setCookieEffect;
export const registerGetCookieCoeffect = getCookieCoeffect;

export default function registerCookiesBatteries(cookieClient) {
  setCookieEffect(cookieClient);
  getCookieCoeffect(cookieClient);
}
