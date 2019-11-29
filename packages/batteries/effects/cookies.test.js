import { clearHandlers, getEffectHandler } from 'reffects';
import * as setCookieEffect from './cookies';

afterEach(() => {
  clearHandlers();
  jest.clearAllMocks();
});

describe('setCookie effect', () => {
  test('should set value into a cookie', () => {
    const effectId = 'setCookie';
    const cookiesClient = { set: jest.fn() };

    setCookieEffect.register(cookiesClient);
    const setCookieHandler = getEffectHandler(effectId);

    const cookieToSet = {
      key: 'cookieKey',
      value: 'newValue',
    };

    setCookieHandler(cookieToSet);

    expect(cookiesClient.set).toHaveBeenCalledWith(cookieToSet);
  });
});
