import registerCookiesBatteries from './index';
import * as effect from './setCookie';
import * as coeffect from './getCookie';
import * as reffects from 'reffects';

describe('cookies battery', () => {
  test('effects and coeffects are registered at once when calling registerStateBatteries', () => {
    const cookieClient = {};
    const registerCookieEffectFn = jest.spyOn(effect, 'default');
    const registerCookieCoeffectFn = jest.spyOn(coeffect, 'default');
    const registerEffectHandlerFn = jest.spyOn(
      reffects,
      'registerEffectHandler'
    );
    const registerCoeffectHandlerFn = jest.spyOn(
      reffects,
      'registerCoeffectHandler'
    );

    registerCookiesBatteries(cookieClient);

    expect(registerEffectHandlerFn).toHaveBeenCalledTimes(1);
    expect(registerCoeffectHandlerFn).toHaveBeenCalledTimes(1);
    expect(registerCookieEffectFn).toHaveBeenCalledWith(cookieClient);
    expect(registerCookieCoeffectFn).toHaveBeenCalledWith(cookieClient);
  });
});
