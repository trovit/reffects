import registerGlobalBatteries from './index';
import * as reffects from 'reffects';
import * as coeffect from './global';

describe('global battery', () => {
  test('effects and coeffects are registered at once when calling registerGlobalBatteries', () => {
    const globalObject = {};
    const registerGlobalCoeffectFn = jest.spyOn(coeffect, 'default');
    const registerEffectHandlerFn = jest.spyOn(
      reffects,
      'registerEffectHandler'
    );
    const registerCoeffectHandlerFn = jest.spyOn(
      reffects,
      'registerCoeffectHandler'
    );

    registerGlobalBatteries(globalObject);

    expect(registerEffectHandlerFn).toHaveBeenCalledTimes(0);
    expect(registerCoeffectHandlerFn).toHaveBeenCalledTimes(1);
    expect(registerGlobalCoeffectFn).toHaveBeenCalledWith(globalObject);
  });
});
