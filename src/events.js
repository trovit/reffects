import { registerEventHandler } from "./lib";

export function registerEvents() {
  registerEventHandler(
    "loadTodos",
    function loadTodos(coeffects, payload) {
      var url = coeffects["apiUrl"],
        state = coeffects["state"];

      return {
        get: {
          url,
          successEvent: ["normalizeTodos"]
        }
      };
    },
    [["apiUrl"]]
  );

  registerEventHandler(
    "normalizeTodos",
    function normalizeTodos(coeffects, payload) {
      return {
        normalizeTodos: {
          todos: payload,
          successEvent: ["loadTodosSucceeded"]
        }
      };
    },
    []
  );

  registerEventHandler(
    "loadTodosSucceeded",
    function loadTodosSucceeded(coeffects, responseData) {
      return {
        mutate: [{ path: ["todos"], newValue: responseData }]
      };
    },
    []
  );
}
