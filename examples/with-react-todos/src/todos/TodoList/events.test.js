import { getEventHandler } from 'reffects';
import { state } from "reffects-store";
import { http } from "reffects-batteries";
import { applyEventsFixture } from '../../../../../test-helpers/fixtures';
import { toast } from "../../effects/toast";
import { toggleTodoReducer } from './mutations'
import registerTodoListEvents from './events';

applyEventsFixture(registerTodoListEvents);

describe('events', () => {
  test('loadTodos', () => {
    const givenCoeffects = { globals: { apiUrl: 'http://someurl' } };
    const loadTodos = getEventHandler('loadTodos');

    expect(loadTodos(givenCoeffects)).toEqual(http.get({
      url: 'http://someurl',
      successEvent: ['loadTodosSucceeded'],
    }));
  });

  test('loadTodosSucceeded', () => {
    const givenCoeffects = {};
    const loadTodosSucceeded = getEventHandler('loadTodosSucceeded');

    expect(
      loadTodosSucceeded(givenCoeffects, [
        {
          results: [
            {
              id: 1,
              name: 'Kevin Bacon',
              description: 'Super sexy',
            },
            {
              id: 2,
              name: 'Alison',
              description: '',
            },
          ],
        },
      ])
    ).toEqual(
      state.set({
        todos: [
          {
            id: 1,
            text: 'Describe: Kevin Bacon',
            done: true,
          },
          {
            id: 2,
            text: 'Describe: Alison',
            done: false,
          },
        ],
      })
    );
  });

  test('filterTodos', () => {
    const filterTodos = getEventHandler('filterTodos');

    const result = filterTodos(undefined, 'codorniz')

    expect(result).toEqual(state.deepSet({ visibilityFilter: 'codorniz' }));
  });

  test('todoClicked when todo is done', () => {
    const id = 1;
    const todoClicked = getEventHandler('todoClicked');
    const isDone = true;
    const text = 'Lorem ipsum';

    const result = todoClicked(undefined, { id, isDone, text })

    expect(result).toEqual({
      ...toast.show({
        text: '"Lorem ipsum" was marked as undone.',
        milliseconds: 3000,
      }),
      ...state.mutate(toggleTodoReducer, id),
    });
  });

  test('todoClicked when todo is not done', () => {
    const id = 1;
    const todoClicked = getEventHandler('todoClicked');
    const isDone = false;
    const text = 'Lorem ipsum';

    const result = todoClicked(undefined, { id, isDone, text })

    expect(result).toEqual({
      ...toast.show({
        text: '"Lorem ipsum" was marked as done.',
        milliseconds: 3000,
      }),
      ...state.mutate(toggleTodoReducer, id),
    });
  });
});
