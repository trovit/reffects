import { coeffect, registerEffectHandler } from 'reffects';

export function cookieRemove({ key, path, domain }) {
  return {
    'cookie.remove': {
      key,
      path,
      domain,
    },
  };
}

export default function registerRemoveCookieEffect(cookiesClient) {
  registerEffectHandler('cookie.remove', function removeCookie({
    key,
    path,
    domain,
  }) {
    cookiesClient.remove(key, { path, domain });
  });
}
