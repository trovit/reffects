import { clearHandlers, coeffect, getCoeffectHandler, getEffectHandler } from 'reffects';
import { applyEventsFixture } from '../../../../test-helpers/fixtures';
import { callsTo } from '../../../../test-helpers/mockHelpers';
import { registerStateBatteries, state } from './state';

const store = { setState: jest.fn() };
applyEventsFixture(() => registerStateBatteries(store));

describe('state effect', () => {
  test('should state.set the state in the store', () => {
    const effectId = 'state.set';
    const setStateHandler = getEffectHandler(effectId);
    const firstMutation = { visibilityFilter: 'all' };
    const secondMutation = { toast: { isShown: true } };
    const mutations = [
        firstMutation,
        secondMutation,
    ];

    setStateHandler(mutations);

    expect(store.setState).toHaveBeenCalledTimes(2);
    expect(callsTo(store.setState)).toEqual([
      [firstMutation], [secondMutation],
    ]);
  });

  test('should create a state.set effect using a builder', () => {
    const effect = state.set([{
      aKey: 'hello',
      anotherKey: 1,
      objectKey: { a: 1 },
    }]);

    expect(effect).toEqual({
      'state.set': [{
        aKey: 'hello',
        anotherKey: 1,
        objectKey: { a: 1 },
      }],
    });
  });
});

describe('state coeffect', () => {
  test('should extract the expected values from the store', () => {
    const state = {
      todos: [{ id: '123', text: 'saludos', isDone: true }],
      toast: { id: 'pepe' },
    };
    const coeffectDescription = coeffect('state', [
      state => state.todos,
      state => state.toast.id,
    ]);
    const store = {};
    store.getState = jest
      .fn()
      .mockReturnValueOnce(state)
      .mockReturnValueOnce(state);
    registerStateBatteries(store);

    const stateHandler = getCoeffectHandler(coeffectDescription.id);

    expect(stateHandler(coeffectDescription.data)).toEqual({
      state: [
        state.todos,
        state.toast.id,
      ],
    });
    expect(store.getState).toHaveBeenCalledTimes(2);
  });

  test('should create a state coeffect from a builder', () => {
    const stateGetCoeffect = state.get({
      todosRenamed: 'todos',
      toastId: 'toast.id',
    });

    expect(stateGetCoeffect).toEqual(
        coeffect('state', {
          todosRenamed: 'todos',
          toastId: 'toast.id',
        })
    );
  });
});
