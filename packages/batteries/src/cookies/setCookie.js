import { registerEffectHandler } from 'reffects';

export function cookieSet(cookieToSet) {
  return {
    'cookie.set': cookieToSet
  };
}

export default function registerSetCookieEffect(cookiesClient) {
  registerEffectHandler('cookie.set', function setCookie(newCookie) {
    cookiesClient.set(newCookie);
  });
}
