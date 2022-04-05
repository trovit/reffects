import { getEffectHandler } from 'reffects';
import { when } from 'jest-when';
import deepFreeze from 'deep-freeze';
import registerDeepSetStateEffect, {
  DEEP_SET_STATE_EFFECT_ID,
  stateDeepSet,
} from './deepSetState';

const store = { getState: jest.fn(), reset: jest.fn() };

describe('state.deepSet', () => {
  test('should deeply merge the state in the store with the provided partial state', () => {
    registerDeepSetStateEffect(store);
    const handler = getEffectHandler(DEEP_SET_STATE_EFFECT_ID);
    const currentState = deepFreeze({ a: { b: 1 } });
    when(store.getState).mockReturnValue(currentState);
    const aDeepPartialState = deepFreeze({ a: { c: 2 } });

    handler(aDeepPartialState);

    expect(store.reset).toHaveBeenCalledWith({ a: { b: 1, c: 2 } });
  });

  test('should create a state.deepSet effect using a builder', () => {
    const effect = stateDeepSet({ a: 1 });

    expect(effect).toEqual({
      'state.deepSet': { a: 1 },
    });
  });
});
