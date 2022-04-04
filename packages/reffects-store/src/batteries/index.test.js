import * as reffects from 'reffects';
import registerStateBatteries, {
  registerStateEffect,
  registerStateCoeffect,
  state,
} from './index';
import * as setStateEffect from './setState';
import * as mutateStateEffect from './mutateState';
import * as getStateCoeffect from './getState';

describe('state battery', () => {
  test('effects and coeffects registrars can be used separatedly', () => {
    expect(registerStateEffect).toBeDefined();
    expect(registerStateCoeffect).toBeDefined();
    expect(state).toBeDefined();
  });

  test('effects and coeffects are registered at once when calling registerStateBatteries', () => {
    const store = {};
    const registerStateSetEffectFn = jest.spyOn(setStateEffect, 'default');
    const registerStateMutateEffectFn = jest.spyOn(mutateStateEffect, 'default');
    const registerStateGetCoeffectFn = jest.spyOn(getStateCoeffect, 'default');
    const registerEffectHandlerFn = jest.spyOn(
      reffects,
      'registerEffectHandler'
    );
    const registerCoeffectHandlerFn = jest.spyOn(
      reffects,
      'registerCoeffectHandler'
    );

    registerStateBatteries(store);

    expect(registerEffectHandlerFn).toHaveBeenCalledTimes(2);
    expect(registerCoeffectHandlerFn).toHaveBeenCalledTimes(1);
    expect(registerStateSetEffectFn).toHaveBeenCalledWith(store);
    expect(registerStateMutateEffectFn).toHaveBeenCalledWith(store);
    expect(registerStateGetCoeffectFn).toHaveBeenCalledWith(store);
  });
});
