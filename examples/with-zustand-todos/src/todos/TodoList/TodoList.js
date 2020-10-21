import React from 'react';
import { visibleTodosSelector } from '../selectors';
import TodoItem from './TodoItem';
import {
  VISIBILITY_FILTERS_SHOW_ALL,
  VISIBILITY_FILTERS_SHOW_DONE,
  VISIBILITY_FILTERS_SHOW_UNDONE
} from '../constants';
import { useSelector } from '../../effects/state';
import { dispatch } from 'reffects';

export function TodoList({ 
  handleFilterClick = activeFilter => {
    dispatch({ id: 'filterTodos', payload: activeFilter });
  } 
}) {
  const todos = useSelector(visibleTodosSelector);

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

export default TodoList;
