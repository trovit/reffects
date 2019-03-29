import { registerEventHandler } from "../../lib/lib";

function register() {
  registerEventHandler("loadTodos", function loadTodos(coeffects, payload) {
    const url = coeffects["apiUrl"];

    return {
      get: {
        url,
        successEvent: ["loadTodosSucceeded"]
      }
    };
  }, ["apiUrl"])

  registerEventHandler("loadTodosSucceeded", function loadTodosSucceeded(coeffects, response) {
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

  registerEventHandler("toggleTodo", function toggleTodo(coeffects, idTodo) {
    const { state: { todos } } = coeffects;
    function toggleTodo(idTodo, todos) {
      return todos.map(todo => {
        if (todo.id === idTodo) {
          return Object.assign({}, todo, { done: !todo.done });
        }

        return todo;
      })
    }

    const newTodos = toggleTodo(idTodo, todos);

    return {
      mutate: [
        { path: ["todos"], newValue: newTodos },
      ]
    };
  }, [{ id: 'state', data: [{ path: ['todos'], key: 'todos' }] }])

  function createToastEffect(text) {
    return {
      toast: {
        text: text,
        milliseconds: 3000
      }
    };
  }

  registerEventHandler("showToggledTodoToast", function showToggledTodoToast(coeffects, { isDone, text }) {
    var toastText = `"${text}" was marked as ${isDone ? 'undone' : 'done'}.`;
    return createToastEffect(toastText);
  })
}

export default {
  register
};