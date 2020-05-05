import { registerEventHandler } from 'reffects';
import { globalBuilder } from "reffects-batteries/src/global";
import { state } from "reffects-store/src/batteries";

export default function registerTodoListEvents() {
  registerEventHandler(
    'loadTodos',
    function loadTodos(coeffects, payload) {
      return {
        'http.get': {
          url: coeffects.global.apiUrl,
          successEvent: ['loadTodosSucceeded'],
        },
      };
    },
    [globalBuilder.get('apiUrl')]
  );

  registerEventHandler('loadTodosSucceeded', function loadTodosSucceeded(
    coeffects,
    [response]
  ) {
    function extractTodos(payload) {
      return payload.results.map(item => ({
        id: item.id,
        text: 'Describe: ' + item.name,
        done: !!item.description,
      }));
    }

    const todos = extractTodos(response);

    return state.set({ todos: todos });
  });

  registerEventHandler('filterTodos', function filterTodos(
    coeffects,
    activeFilter
  ) {
    return state.set({ visibilityFilter: activeFilter });
  });

  registerEventHandler(
    'todoClicked',
    function todoClicked(coeffects, { id, text, isDone }) {
      const {
        state: { todos },
      } = coeffects;

      function toggleTodo(idTodo, todos) {
        return todos.map(todo => {
          if (todo.id === idTodo) {
            return Object.assign({}, todo, { done: !todo.done });
          }
          return todo;
        });
      }

      const newTodos = toggleTodo(id, todos);

      return {
        ...state.set({
          todos: newTodos,
        }),
        toast: {
          text: `"${text}" was marked as ${isDone ? 'undone' : 'done'}.`,
          milliseconds: 3000,
        },
      };
    },
    [state.get({ todos: 'todos' })]
  );
}
