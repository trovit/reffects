import { registerEventHandler, dispatch } from "./lib";

export function loadTodos(coeffects, payload) {
  const url = coeffects["apiUrl"];

  return {
    get: {
      url,
      successEvent: ["loadTodosSucceeded"]
    }
  };
}

export function loadTodosSucceeded(coeffects, response) {
  function extractTodos(payload) {
    return payload.results.map(item => ({
      id: item.id,
      text: 'Describe: ' + item.name,
      done: !!item.description
    }));
  }

  const todos = extractTodos(response);

  return {
    mutate:
      [{ path: ["todos"], newValue: todos }]
  };
}

export function filterTodos(coeffects, activeFilter) {
  return {
    mutate: [{ path: ["visibilityFilter"], newValue: activeFilter }]
  };
}

export function toggleTodo(coeffects, idTodo) {
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
}

function createToastEffect(text) {
  return {
    toast: {
      text: text,
      milliseconds: 3000
    }
  };
}

export function todoActivationChanged(coeffects, { isDone, text }) {
  var toastText = `"${text}" was marked as ${isDone ? 'undone' : 'done'}.`;
  return createToastEffect(toastText);
}

export function registerEvents() {
  registerEventHandler("loadTodos", loadTodos, [["apiUrl"]]);
  registerEventHandler("loadTodosSucceeded", loadTodosSucceeded);
  registerEventHandler("filterTodos", filterTodos);
  registerEventHandler("toggleTodo", toggleTodo, [['state', [{ path: ['todos'], key: 'todos' }]]]);
  registerEventHandler("todoActivationChanged", todoActivationChanged);
}

