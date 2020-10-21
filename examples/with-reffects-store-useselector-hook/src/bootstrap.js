import { store, registerStateBatteries } from 'reffects-store';
import registerTodoListEvents from './todos/TodoList/events';
import { VISIBILITY_FILTERS_SHOW_ALL } from './todos/constants';

export function startApp() {
  const initialState = {
    todos: [
      {
        id: '1',
        text: 'Fujibayashi Nagato',
        isDone: false,
      },
      {
        id: '2',
        text: 'Momochi Sandayu',
        isDone: false,
      },
      {
        id: '3',
        text: 'Ishikawa Goemon',
        isDone: false,
      },
      {
        id: '4',
        text: 'Fujibayashi Nagato',
        isDone: false,
      },
      {
        id: '5',
        text: 'Hattori Hanzo',
        isDone: false,
      },
      {
        id: '6',
        text: 'Mochizuki Chiyome',
        isDone: false,
      },
      {
        id: '7',
        text: 'Fuma Kotaro',
        isDone: false,
      }
    ],
    visibilityFilter: VISIBILITY_FILTERS_SHOW_ALL,
  };

  store.initialize(initialState);

  // reffects-store' built in batteries
  registerStateBatteries();

  // Custom events
  registerTodoListEvents();
}
