import { registerEventHandler, coeffect } from "reffects";

export function register() {
  registerEventHandler(
    "loadTodos", 
    function loadTodos(coeffects, payload) {
      return {
        get: {
          url: coeffects.apiUrl,
          successEvent: ["loadTodosSucceeded"]
        }
      };
    },
    [coeffect("apiUrl")]);

  registerEventHandler(
    "loadTodosSucceeded", 
    function loadTodosSucceeded(coeffects, [response]) {
      function extractTodos(payload) {
        return payload.results.map(item => ({
          id: item.id,
          text: 'Describe: ' + item.name,
          done: !!item.description
        }));
      };

      const todos = extractTodos(response);

      return {
        setState: {"todos": todos}
      };
    });

  registerEventHandler(
    "filterTodos", 
    function filterTodos(coeffects, activeFilter) {
      return {
        setState: {"visibilityFilter": activeFilter}
      };
    });

  registerEventHandler(
    "todoClicked", 
    function todoClicked(coeffects, { id, text, isDone }) {
      const { state: { todos } } = coeffects;

      function toggleTodo(idTodo, todos) {
        return todos.map(todo => {
          if (todo.id === idTodo) {
            return Object.assign({}, todo, { done: !todo.done });
          }
          return todo;
        })
      }

      const newTodos = toggleTodo(id, todos);

      return {
        setState: {
          "todos": newTodos
        },
        toast: {
          text: `"${text}" was marked as ${isDone ? 'undone' : 'done'}.`,
          milliseconds: 3000
        }
      };
    },
    [coeffect('state', {todos: 'todos'})]);
}
