import { coeffect, registerCoeffectHandler } from 'reffects';

export function cookieGet(key) {
  return coeffect('cookie.get', key);
}

export default function registerGetCookieCoeffect(cookiesClient) {
  registerCoeffectHandler('cookie.get', function cookie(key) {
    return {
      cookie: {
        [key]: cookiesClient.get(key),
      },
    };
  });
}
