import { registerEventHandler } from "./lib";

export function registerEvents() {
  registerEventHandler(
    "loadTodos",
    function loadTodos(coeffects, payload) {
      const url = coeffects["apiUrl"];

      return {
        get: {
          url,
          successEvent: ["loadTodosSucceeded"]
        }
      };
    },
    [["apiUrl"]]
  );

  registerEventHandler(
    "loadTodosSucceeded",
    function loadTodosSucceeded(coeffects, response) {
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
    },
    []
  );



  registerEventHandler(
    "filterTodos",
    function filterTodos(coeffects, activeFilter) {
      return {
        mutate: [{ path: ["visibilityFilter"], newValue: activeFilter }]
      };
    },
    []
  );

  registerEventHandler(
    "toggleTodo",
    function toggleTodo(coeffects, idTodo) {
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
    },
    [['state', [{ path: ['todos'], key: 'todos' }]]]
  );

  registerEventHandler(
    "showToast",
    function showToast(coeffects, text) {
      return {
        mutate: [
          { path: ["isToastShown"], newValue: true },
          { path: ["toastText"], newValue: text },
        ],
        dispatchLater: {
          eventId: 'hideToast', payload: text, milliseconds: 3000
        }
      };
    },
    []
  );
}
registerEventHandler(
  "hideToast",
  function showToast(coeffects, payload) {
    return {
      mutate: [
        { path: ["isToastShown"], newValue: false },
        { path: ["toastText"], newValue: '' },
      ],
    };
  },
  []
);

