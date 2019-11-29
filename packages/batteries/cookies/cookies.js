import { registerCoeffectHandler } from 'reffects';

export function register(cookiesClient) {
  registerCoeffectHandler('cookie', function cookie(key) {
    return {
      cookie: {
        [key]: cookiesClient.get(key),
      },
    };
  });
}
