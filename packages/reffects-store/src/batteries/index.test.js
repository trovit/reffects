import * as reffects from 'reffects';
import registerStateBatteries, {
  registerStateEffect,
  registerStateCoeffect,
  state,
} from './index';
import * as effect from './setState';
import * as coeffect from './state';

describe('state battery', () => {
  test('effects and coeffects registrars can be used separatedly', () => {
    expect(registerStateEffect).toBeDefined();
    expect(registerStateCoeffect).toBeDefined();
    expect(state.get).toBeDefined();
    expect(state.set).toBeDefined();
  });

  test('effects and coeffects are registered at once when calling registerStateBatteries', () => {
    const store = {};
    const registerStateEffectFn = jest.spyOn(effect, 'default');
    const registerStateCoeffectFn = jest.spyOn(coeffect, 'default');
    const registerEffectHandlerFn = jest.spyOn(
      reffects,
      'registerEffectHandler'
    );
    const registerCoeffectHandlerFn = jest.spyOn(
      reffects,
      'registerCoeffectHandler'
    );

    registerStateBatteries(store);

    expect(registerEffectHandlerFn).toHaveBeenCalledTimes(1);
    expect(registerCoeffectHandlerFn).toHaveBeenCalledTimes(1);
    expect(registerStateEffectFn).toHaveBeenCalledWith(store);
    expect(registerStateCoeffectFn).toHaveBeenCalledWith(store);
  });
});
