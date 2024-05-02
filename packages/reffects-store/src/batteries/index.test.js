import * as reffects from 'reffects';
import registerStateBatteries, {
  registerStateEffect,
  registerStateCoeffect,
  state,
} from './index';
import * as setStateEffect from './setState';
import * as mergeStateEffect from './mergeState';
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
    const registerStateMergeEffectFn = jest.spyOn(
      mergeStateEffect,
      'default'
    );
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

    expect(registerEffectHandlerFn).toHaveBeenCalledTimes(3);
    expect(registerCoeffectHandlerFn).toHaveBeenCalledTimes(1);
    expect(registerStateSetEffectFn).toHaveBeenCalledWith(store);
    expect(registerStateMergeEffectFn).toHaveBeenCalledWith(store);
    expect(registerStateGetCoeffectFn).toHaveBeenCalledWith(store);
  });
});
