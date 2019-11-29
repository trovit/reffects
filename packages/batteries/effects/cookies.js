import { registerEffectHandler } from 'reffects';

export function register(cookiesClient) {
  registerEffectHandler('setCookie', function setCookie(newCookies) {
    cookiesClient.set(newCookies);
  });
}
