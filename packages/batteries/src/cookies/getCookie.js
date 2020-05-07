import { coeffect, registerCoeffectHandler } from 'reffects';

export function cookieGet(key) {
  return coeffect('cookie', key);
}

export default function registerGetCookieCoeffect(cookiesClient) {
  registerCoeffectHandler('cookie', function cookie(key) {
    return {
      cookie: {
        [key]: cookiesClient.get(key),
      },
    };
  });
}
