import { registerEventHandler } from 'reffects';
import { state } from "reffects-store";

export default function registerTodoListEvents() {
  registerEventHandler('filterTodos', function filterTodos(
    coeffects,
    activeFilter
  ) {
    return state.set({ visibilityFilter: activeFilter });
  });

  registerEventHandler(
    'todoClicked',
    function todoClicked(coeffects, { id }) {
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
        ...state.set({ todos: newTodos }),
      };
    },
    [state.get( { todos: 'todos' })]
  );
}
