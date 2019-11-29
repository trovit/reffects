import registerStateBatteries, {
  registerStateEffect,
  registerStateCoeffect,
} from './index';
import * as effect from './setState';
import * as coeffect from './state';

describe('state battery', () => {
  test('effects and coeffects registrars can be used separatedly', () => {
    expect(registerStateEffect).toBeDefined();
    expect(registerStateCoeffect).toBeDefined();
  });

  test('effects and coeffects are registered at once when calling registerStateBatteries', () => {
    const store = {};
    const registerStateEffectFn = jest.spyOn(effect, 'default');
    const registerStateCoeffectFn = jest.spyOn(coeffect, 'default');

    registerStateBatteries(store);

    expect(registerStateEffectFn).toHaveBeenCalledWith(store);
    expect(registerStateCoeffectFn).toHaveBeenCalledWith(store);
  });
});
