import React from "react";
import TodoItem from "./TodoItem";
import { subscribe } from "./lib-subscribe";

import { createSelector } from 'reselect'
import { dispatch } from "./lib";

function handleFilterClick(activeFilter) {
  dispatch('filterTodos', activeFilter);
}

function TodoList({ todos }) {
  return (
    <React.Fragment>
      <ul>
        {todos ? (
          todos.map(function (todo) {
            return (
              <li key={todo.id}>
                <TodoItem text={todo.text} isDone={todo.done} />
              </li>
            );
          })
        ) : (
            <p> No todos </p>
          )}
      </ul>
      <button onClick={() => handleFilterClick('all')}>All</button>
      <button onClick={() => handleFilterClick('done')}>Done</button>
      <button onClick={() => handleFilterClick('undone')}>Undone</button>
    </React.Fragment>
  );
}

export function todoSelector(state) {
  return state.todos;
}

export function visibilityFilterSelector(state) {
  return state.visibilityFilter;
}

export const visibleTodosSelector = createSelector(
  [visibilityFilterSelector, todoSelector],
  function (filter, todos) {
    switch (filter) {
      case 'all':
        return todos;
      case 'done':
        return todos.filter(t => t.done);
      case 'undone':
        return todos.filter(t => !t.done);
      default:
        throw new Error('Unknown filter: ' + filter);
    }
  }
);


export default subscribe(function (state) {
  return {
    todos: visibleTodosSelector(state),
  };
})(TodoList);
