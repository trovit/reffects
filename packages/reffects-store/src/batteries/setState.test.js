import { getEffectHandler } from 'reffects';
import registerSetStateEffect, { stateSet } from './setState';
import { applyEventsFixture } from '../test-helpers/fixtures';
import { callsTo } from '../test-helpers/mockHelpers';

const store = { setState: jest.fn() };
applyEventsFixture(() => registerSetStateEffect(store));

describe('state.set effect', () => {
  test('should state.set the state in the store', () => {
    const effectId = 'state.set';
    registerSetStateEffect(store);
    const setStateHandler = getEffectHandler(effectId);
    const firstMutation = { path: 'visibilityFilter', newValue: 'all' };
    const secondMutation = { path: 'toast.isShown', newValue: true };
    const mutations = {
      [firstMutation.path]: firstMutation.newValue,
      [secondMutation.path]: secondMutation.newValue,
    };

    setStateHandler(mutations);

    expect(store.setState).toHaveBeenCalledTimes(1);
    expect(callsTo(store.setState)).toEqual([
      [[firstMutation, secondMutation]],
    ]);
  });

  test('should create a state.set effect using a builder', () => {
    const effect = stateSet({
      aKey: 'hello',
      anotherKey: 1,
      objectKey: { a: 1 },
    });

    expect(effect).toEqual({
      'state.set': {
        aKey: 'hello',
        anotherKey: 1,
        objectKey: { a: 1 },
      },
    });
  });
});
