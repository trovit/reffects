import { clearHandlers, coeffect, getCoeffectHandler } from 'reffects';
import registerStateCoeffect, { stateGet } from './getState';
import { destroyAllMocks } from '../../../../test-helpers/fixtures';
import { callsTo } from '../../../../test-helpers/mockHelpers';

describe('state coeffect', () => {
  afterEach(() => {
    clearHandlers();
    destroyAllMocks();
  });

  test('should extract the expected values from the store', () => {
    const state = {
      todos: [{ id: '123', text: 'saludos', isDone: true }],
      toast: { id: 'pepe' },
    };
    const pathToTodos = 'todos';
    const pathToToastId = 'toast.id';
    const coeffectDescription = coeffect('state', {
      todosRenamed: 'todos',
      toastId: 'toast.id',
    });
    const store = {};
    store.getState = jest
      .fn()
      .mockReturnValueOnce(state.todos)
      .mockReturnValueOnce(state.toast.id);
    registerStateCoeffect(store);
    const stateHandler = getCoeffectHandler(coeffectDescription.id);

    expect(stateHandler(coeffectDescription.data)).toEqual({
      state: {
        todosRenamed: state.todos,
        toastId: state.toast.id,
      },
    });
    expect(store.getState).toHaveBeenCalledTimes(2);
    expect(callsTo(store.getState)).toEqual([[pathToTodos], [pathToToastId]]);
  });

  test('should create a state coeffect from a builder', () => {
    const stateGetCoeffect = stateGet({
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
