import { clearHandlers, getEffectHandler } from 'reffects';
import registerSetCookieEffect from './setCookie';

afterEach(() => {
  clearHandlers();
  jest.clearAllMocks();
});

describe('cookie.set effect', () => {
  test('should set value into a cookie', () => {
    const effectId = 'cookie.set';
    const cookiesClient = { set: jest.fn() };

    registerSetCookieEffect(cookiesClient);
    const setCookieHandler = getEffectHandler(effectId);

    const cookieToSet = {
      key: 'cookieKey',
      value: 'newValue',
    };

    setCookieHandler(cookieToSet);

    expect(cookiesClient.set).toHaveBeenCalledWith(cookieToSet);
  });
});
