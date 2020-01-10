import { registerEffectHandler } from 'reffects';

export default function registerSetCookieEffect(cookiesClient) {
  registerEffectHandler('setCookie', function setCookie(newCookie) {
    cookiesClient.set(newCookie);
  });
}
