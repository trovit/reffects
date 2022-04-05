import { getEffectHandler } from 'reffects';
import { when } from 'jest-when';
import deepFreeze from 'deep-freeze';
import registerDeepSetStateEffect, {
  DEEP_SET_STATE_EFFECT_ID,
  stateDeepSet,
} from './deepSetState';

const store = { getState: jest.fn(), reset: jest.fn() };
registerDeepSetStateEffect(store);

describe('state.deepSet', () => {
  test('should deeply merge the state in the store with the provided partial state', () => {
    const handler = getEffectHandler(DEEP_SET_STATE_EFFECT_ID);
    const currentState = deepFreeze({ a: { b: 1 } });
    when(store.getState).mockReturnValue(currentState);
    const aDeepPartialState = deepFreeze({ a: { c: 2 } });

    handler(aDeepPartialState);

    expect(store.reset).toHaveBeenCalledWith({ a: { b: 1, c: 2 } });
  });

  test('should replace whole array of a partial deep state', () => {
    const handler = getEffectHandler(DEEP_SET_STATE_EFFECT_ID);
    const currentState = deepFreeze({
      anArrayThatWouldNotBeMutated: [1, 2, 3],
      anArrayThatWillBeMutated: ['a', 'b', 'c'],
      object: {
        aNestedArrayThatWouldNotBeMutated: [{ a: 1 }, { b: 2 }],
        aNestedArrayThatWillBeMutated: [{ a: 1 }, { b: 2 }],
      },
    });
    when(store.getState).mockReturnValue(currentState);
    const aDeepPartialState = deepFreeze({
      anArrayThatWillBeMutated: ['d', 'e', 'f'],
      object: {
        aNestedArrayThatWillBeMutated: [{ c: 3 }, { d: 4 }],
      },
    });

    handler(aDeepPartialState);

    expect(store.reset).toHaveBeenCalledWith({
      anArrayThatWouldNotBeMutated: [1, 2, 3],
      anArrayThatWillBeMutated: ['d', 'e', 'f'],
      object: {
        aNestedArrayThatWouldNotBeMutated: [{ a: 1 }, { b: 2 }],
        aNestedArrayThatWillBeMutated: [{ c: 3 }, { d: 4 }],
      },
    });
  });

  test('should create a state.deepSet effect using a builder', () => {
    const effect = stateDeepSet({ a: 1 });

    expect(effect).toEqual({
      'state.deepSet': { a: 1 },
    });
  });
});
