import { loadTodos, loadTodosSucceeded, filterTodos, toggleTodo, todoActivationChanged } from './events'

describe('events', () => {
  test('loadTodos', () => {
    const givenCoeffects = { apiUrl: "sddasds" };

    expect(loadTodos(givenCoeffects)).toEqual({
      get: {
        url: givenCoeffects.apiUrl,
        successEvent: ["loadTodosSucceeded"]
      }
    })
  });
  test('loadTodosSucceeded', () => {
    const givenCoeffects = {};

    expect(loadTodosSucceeded(givenCoeffects, {
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
    })).toEqual({
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
  test('todoActivationChanged', () => {
    const givenCoeffects = {};
    const isDone = true;
    const text = 'Lorem ipsum';

    expect(todoActivationChanged(givenCoeffects, { isDone, text })).toEqual({
      toast: {
        text: '"Lorem ipsum" was marked as undone.',
        milliseconds: 3000
      }
    })
  });
})