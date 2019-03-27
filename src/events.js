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
    function normalizeTodos(coeffects, response) {
      const todos = extractTodos(response);

      return {
        mutate:
          [{ path: ["todos"], newValue: todos }]
      };
    },
    []
  );

  function extractTodos(payload) {
    return payload.results.map(item => ({
      id: item.id,
      text: 'Describe: ' + item.name,
      done: !!item.description
    }));
  }


  registerEventHandler(
    "filterTodos",
    function loadTodosSucceeded(coeffects, activeFilter) {
      return {
        mutate: [{ path: ["visibilityFilter"], newValue: activeFilter }]
      };
    },
    []
  );
}
