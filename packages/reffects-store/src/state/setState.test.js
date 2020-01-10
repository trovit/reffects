import { getEffectHandler } from 'reffects';
import registerSetStateEffect from './setState';
import { applyEventsFixture } from '../test-helpers/fixtures';
import { callsTo } from '../test-helpers/mockHelpers';

const store = { setState: jest.fn() };
applyEventsFixture(() => registerSetStateEffect(store));

describe('setState effect', () => {
  test('should setState the state in the store', () => {
    const effectId = 'setState';
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
});
