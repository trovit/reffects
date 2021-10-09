import registerTodoListEvents from './events';
import { getEventHandler } from 'reffects';
import { state } from "reffects-store";
import { applyEventsFixture } from '../../../../../test-helpers/fixtures';

applyEventsFixture(registerTodoListEvents);

describe('events', () => {
  test('filterTodos', () => {
    const givenCoeffects = {};
    const filterTodos = getEventHandler('filterTodos');

    expect(filterTodos(givenCoeffects, 'codorniz')).toEqual(state.set({ visibilityFilter: 'codorniz' }));
  });

  test('todoClicked when todo is done', () => {
    const id = 1;
    const todoClicked = getEventHandler('todoClicked');
    const isDone = true;
    const text = 'Lorem ipsum';
    const givenCoeffects = {
      state: {
        todos: [
          {
            id: id,
            text: 'Describe: Kevin Bacon',
            done: true,
          },
        ],
      },
    };

    expect(todoClicked(givenCoeffects, { id, isDone, text })).toEqual({
      ...state.set({
        todos: [
          {
            id: 1,
            text: 'Describe: Kevin Bacon',
            done: false,
          },
        ],
      }),
    });
  });

  test('todoClicked when todo is undone', () => {
    const id = 1;
    const todoClicked = getEventHandler('todoClicked');
    const isDone = false;
    const text = 'Lorem ipsum';
    const givenCoeffects = {
      state: {
        todos: [
          {
            id: id,
            text: 'Describe: Kevin Bacon',
            done: false,
          },
        ],
      },
    };

    expect(todoClicked(givenCoeffects, { id, isDone, text })).toEqual({
      ...state.set({
        todos: [
          {
            id: 1,
            text: 'Describe: Kevin Bacon',
            done: true,
          },
        ],
      }),
    });
  });
});
