import { registerCoeffectHandler } from 'reffects';

export default function registerGetCookieCoeffect(cookiesClient) {
  registerCoeffectHandler('cookie', function cookie(key) {
    return {
      cookie: {
        [key]: cookiesClient.get(key),
      },
    };
  });
}
