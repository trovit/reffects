import React from 'react';
import { dispatch } from 'reffects';
import { subscribe } from 'reffects-store';
import { visibleTodosSelector } from '../selectors';
import TodoItem from './TodoItem';
import {
  VISIBILITY_FILTERS_SHOW_ALL,
  VISIBILITY_FILTERS_SHOW_DONE,
  VISIBILITY_FILTERS_SHOW_UNDONE
} from '../constants';

export function TodoList({ todos, handleFilterClick }) {
  return (
    <React.Fragment>
      <ul>
        {todos ? (
          todos.map(function(todo) {
            return (
              <li key={todo.id} className={`${todo.done ? 'done' : 'undone'}`}>
                <TodoItem id={todo.id} text={todo.text} isDone={todo.done} />
              </li>
            );
          })
        ) : (
          <p> No todos </p>
        )}
      </ul>
      <section>
        <button onClick={() => handleFilterClick(VISIBILITY_FILTERS_SHOW_ALL)}>
          All
        </button>
        <button onClick={() => handleFilterClick(VISIBILITY_FILTERS_SHOW_DONE)}>
          Done
        </button>
        <button
          onClick={() => handleFilterClick(VISIBILITY_FILTERS_SHOW_UNDONE)}
        >
          Undone
        </button>
      </section>
    </React.Fragment>
  );
}

export default subscribe(
  TodoList, 
  function(state) {
    return {
      todos: visibleTodosSelector(state),
      handleFilterClick: activeFilter => {
        dispatch({ id: 'filterTodos', payload: activeFilter });
      }
    };
  }
);
