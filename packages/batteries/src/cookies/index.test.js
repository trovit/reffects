import registerCookiesBatteries, { cookies } from './index';
import * as setCookieEffect from './setCookie';
import * as removeCookieEffect from './removeCookie';
import * as getCookieCoeffect from './getCookie';
import * as reffects from 'reffects';

describe('cookies battery', () => {
  test('cookie builders are defined', () => {
    expect(cookies.set).toBeDefined();
    expect(cookies.get).toBeDefined();
    expect(cookies.remove).toBeDefined();
  });

  test('effects and coeffects are registered at once when calling registerStateBatteries', () => {
    const cookieClient = {};
    const registerSetCookieEffectFn = jest.spyOn(setCookieEffect, 'default');
    const registerRemoveCookieEffectFn = jest.spyOn(
      removeCookieEffect,
      'default'
    );
    const registerGetCookieCoeffectFn = jest.spyOn(
      getCookieCoeffect,
      'default'
    );
    registerCookiesBatteries(cookieClient);

    expect(registerSetCookieEffectFn).toHaveBeenCalledWith(cookieClient);
    expect(registerRemoveCookieEffectFn).toHaveBeenCalledWith(cookieClient);
    expect(registerGetCookieCoeffectFn).toHaveBeenCalledWith(cookieClient);
  });
});
