import { registerEffectHandler } from 'reffects';

export default function registerSetCookieEffect(cookiesClient) {
  registerEffectHandler('cookie.set', function setCookie(newCookie) {
    cookiesClient.set(newCookie);
  });
}
