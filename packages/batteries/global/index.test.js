import registerGlobalBatteries, {
  registerGlobalCoeffect,
} from './index';
import * as reffects from 'reffects';
import * as coeffect from './global';

describe('global battery', () => {
  test('effects and coeffects registrars can be used separatedly', () => {
    expect(registerGlobalCoeffect).toBeDefined();
  });

  test('effects and coeffects are registered at once when calling registerGlobalBatteries', () => {
    const globalOject = {};
    const registerGlobalCoeffectFn = jest.spyOn(coeffect, 'default');
    const registerEffectHandlerFn = jest.spyOn(reffects, 'registerEffectHandler');
    const registerCoeffectHandlerFn = jest.spyOn(reffects, 'registerCoeffectHandler');

    registerGlobalBatteries(globalOject);

    expect(registerEffectHandlerFn).toHaveBeenCalledTimes(0);
    expect(registerCoeffectHandlerFn).toHaveBeenCalledTimes(1);
    expect(registerGlobalCoeffectFn).toHaveBeenCalledWith(globalOject);
  });
});
