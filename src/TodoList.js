import React from "react";
import TodoItem from "./TodoItem";
import { subscribe } from "./lib-subscribe";

function TodoList({ todos }) {
  return (
    <ul>
      {todos ? (
        todos.map(function(todo) {
          return (
            <li key={todo.id}>
              <TodoItem text={todo.text} />
            </li>
          );
        })
      ) : (
        <p> No todos </p>
      )}
    </ul>
  );
}

export default subscribe(function(state) {
  return {
    todos: state.todos
  };
})(TodoList);
