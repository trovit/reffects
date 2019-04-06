import { registerEventHandler } from "../../lib/reffect";
import * as coeffects from '../../coeffects/factories';

export function register() {
  registerEventHandler("loadTodos", function loadTodos(coeffects, payload) {
    return {
      get: {
        url: coeffects.apiUrl,
        successEvent: ["loadTodosSucceeded"]
      }
    };
  }, 
  [coeffects.apiUrl()]);

  registerEventHandler("loadTodosSucceeded", function loadTodosSucceeded(coeffects, [response]) {
    function extractTodos(payload) {
      return payload.results.map(item => ({
        id: item.id,
        text: 'Describe: ' + item.name,
        done: !!item.description
      }));
    };

    const todos = extractTodos(response);

    return {
      mutate:
        [{ path: ["todos"], newValue: todos }]
    };
  });

  registerEventHandler("filterTodos", function filterTodos(coeffects, activeFilter) {
    return {
      mutate: [{ path: ["visibilityFilter"], newValue: activeFilter }]
    };
  });
 
  registerEventHandler("todoClicked", function toggleTodo(coeffects, { id, text, isDone }) {
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
      mutate: [
        { path: ["todos"], newValue: newTodos },
      ],
      toast: {
        text:  `"${text}" was marked as ${isDone ? 'undone' : 'done'}.`,
        milliseconds: 3000
      }
    };
  }, 
  [coeffects.state({ path: ['todos'], key: 'todos' })]);
}