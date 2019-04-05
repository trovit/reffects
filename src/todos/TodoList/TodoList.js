import React from "react";
import { dispatch } from "../../lib/reffect";
import { subscribe } from "../../infrastructure/store/subscriptions";
import { visibleTodosSelector } from "../selectors";
import TodoItem from "./TodoItem";
import { VISIBILITY_FILTERS_SHOW_ALL, VISIBILITY_FILTERS_SHOW_DONE, VISIBILITY_FILTERS_SHOW_UNDONE } from "../constants";

export function TodoList({ todos, handleFilterClick }) {
  return (
    <React.Fragment>
      <ul>
        {todos ? (
          todos.map(function (todo) {
            return (
              <li key={todo.id}>
                <TodoItem id={todo.id} text={todo.text} isDone={todo.done} />
              </li>
            );
          })
        ) : (
            <p> No todos </p>
          )}
      </ul>
      <button onClick={() => handleFilterClick(VISIBILITY_FILTERS_SHOW_ALL)}>All</button>
      <button onClick={() => handleFilterClick(VISIBILITY_FILTERS_SHOW_DONE)}>Done</button>
      <button onClick={() => handleFilterClick(VISIBILITY_FILTERS_SHOW_UNDONE)}>Undone</button>
    </React.Fragment>
  );
}

export default subscribe(function (state) {
  return {
    todos: visibleTodosSelector(state),
    handleFilterClick: activeFilter => {
      dispatch({eventId: 'filterTodos', payload: activeFilter});
    },
  };
})(TodoList);
