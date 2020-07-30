import { clearHandlers, getEffectHandler } from 'reffects';
import registerRemoveCookieEffect, { cookieRemove } from './removeCookie';

afterEach(() => {
  clearHandlers();
  jest.clearAllMocks();
});

describe('cookie.remove effect', () => {
  test('should remove a cookie', () => {
    const effectId = 'cookie.remove';
    const cookiesClient = { remove: jest.fn() };

    registerRemoveCookieEffect(cookiesClient);
    const setCookieHandler = getEffectHandler(effectId);

    const cookieToRemove = {
      key: 'cookieKey',
      path: '/path',
      domain: '.domain.com',
    };

    setCookieHandler(cookieToRemove);

    const { key, path, domain } = cookieToRemove;
    expect(cookiesClient.remove).toHaveBeenCalledWith(key, {
      path,
      domain,
    });
  });

  test('should create a cookie.remove effect from a builder', () => {
    const cookieToRemove = {
      key: 'cookieKey',
      path: '/path',
      domain: '.domain.com',
    };

    const cookieRemoveEffect = cookieRemove(cookieToRemove);

    expect(cookieRemoveEffect).toEqual({
      'cookie.remove': cookieToRemove,
    });
  });
});
