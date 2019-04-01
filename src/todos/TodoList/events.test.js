import * as events from './events';
import { getEventHandler, clearHandlers } from '../../lib/reffect';
import { applyEventsFixture } from '../../../testHelpers/fixtures';

applyEventsFixture(events);

describe('events', () => {
  test('loadTodos', () => {
    const givenCoeffects = { apiUrl: "sddasds" };
    const loadTodos = getEventHandler('loadTodos');
    expect(loadTodos(givenCoeffects)).toEqual({
      get: {
        url: givenCoeffects.apiUrl,
        successEvent: ["loadTodosSucceeded"]
      }
    })
  });
  test('loadTodosSucceeded', () => {
    const givenCoeffects = {};
    const loadTodosSucceeded = getEventHandler('loadTodosSucceeded');
    expect(loadTodosSucceeded(givenCoeffects, [{
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
        }
      ]
    }])).toEqual({
      mutate:
        [{
          path: ["todos"], newValue: [
            {
              id: 1,
              text: 'Describe: Kevin Bacon',
              done: true,
            },
            {
              id: 2,
              text: 'Describe: Alison',
              done: false,
            }
          ]
        }]
    })
  });
  test('filterTodos', () => {
    const givenCoeffects = {};
    const filterTodos = getEventHandler('filterTodos');

    expect(filterTodos(givenCoeffects, 'codorniz')).toEqual({
      mutate: [{ path: ["visibilityFilter"], newValue: 'codorniz' }]
    })
  });
  test('toggleTodo', () => {
    const idTodo = 1;
    const givenCoeffects = {
      state: {
        todos: [{
          id: idTodo,
          text: 'Describe: Kevin Bacon',
          done: true,
        },]
      }
    };
    const toggleTodo = getEventHandler('toggleTodo');

    expect(toggleTodo(givenCoeffects, idTodo)).toEqual({
      mutate: [
        {
          path: ["todos"], newValue: [{
            id: 1,
            text: 'Describe: Kevin Bacon',
            done: false,
          },]
        },
      ]
    })
  });
  test('showToggledTodoToast', () => {
    const givenCoeffects = {};
    const showToggledTodoToast = getEventHandler('showToggledTodoToast');
    const isDone = true;
    const text = 'Lorem ipsum';

    expect(showToggledTodoToast(givenCoeffects, { isDone, text })).toEqual({
      toast: {
        text: '"Lorem ipsum" was marked as undone.',
        milliseconds: 3000
      }
    })
  });
})