import { registerEventHandler } from 'reffects';
import { state } from "../../effects/state";
import { globals, http } from "reffects-batteries";
import { toast } from "../../effects/toast";
import { todoSelector } from '../selectors';

export default function registerTodoListEvents() {
  registerEventHandler(
    'loadTodos',
    function loadTodos({ globals }) {
      return http.get({
        url: globals.apiUrl,
        successEvent: { id: 'loadTodosSucceeded' },
      });
    },
    [globals.get('apiUrl')]
  );

  registerEventHandler('loadTodosSucceeded', function loadTodosSucceeded(
    _,
    [response]
  ) {
    function extractTodos(payload) {
      return payload.results.map(item => ({
        id: item.id,
        text: 'Describe: ' + item.name,
        done: !!item.description,
      }));
    }

    return state.set([
      { todos: extractTodos(response) }
    ]);
  });

  registerEventHandler('filterTodos', function filterTodos(
    _,
    activeFilter
  ) {
      return state.set([
        { visibilityFilter: activeFilter }
      ]);
  });

  registerEventHandler(
    'todoClicked',
    function todoClicked(coeffects, { id, text, isDone }) {
      const {
        state: [ todos ],
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
        ...state.set([
          { todos: newTodos }
        ]),
        ...toast.show({
          text: `"${text}" was marked as ${isDone ? 'undone' : 'done'}.`,
          milliseconds: 3000,
        }),
      };
    },
    [state.get([todoSelector])]
  );
}
