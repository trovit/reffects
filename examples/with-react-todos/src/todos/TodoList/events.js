import { registerEventHandler } from 'reffects';
import { state } from "reffects-store";
import { globals, http } from "reffects-batteries";
import { toggleTodoReducer } from './mutations'
import { toast } from "../../effects/toast";

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

  registerEventHandler('loadTodosSucceeded', function loadTodosSucceeded(_, [response]) {
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

  registerEventHandler('filterTodos', function filterTodos(_, activeFilter) {
    return state.merge({ visibilityFilter: activeFilter });
  });

  registerEventHandler(
    'todoClicked',
    function todoClicked(_, { id, text, isDone }) {
      return {
        ...state.mutate(toggleTodoReducer, id),
        ...toast.show({
          text: `"${text}" was marked as ${isDone ? 'undone' : 'done'}.`,
          milliseconds: 3000,
        }),
      };
    }
  );
}
