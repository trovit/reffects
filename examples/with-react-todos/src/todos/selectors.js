import { createSelector } from 'reselect';
import { VISIBILITY_FILTERS_SHOW_DONE, VISIBILITY_FILTERS_SHOW_UNDONE, VISIBILITY_FILTERS_SHOW_ALL } from './constants';

function todoSelector(state) {
  return state.todos;
}

function visibilityFilterSelector(state) {
  return state.visibilityFilter;
}

export const visibleTodosSelector = createSelector(
  [visibilityFilterSelector, todoSelector], 
  function (filter, todos) {
    switch (filter) {
      case VISIBILITY_FILTERS_SHOW_ALL:
        return todos;
      case VISIBILITY_FILTERS_SHOW_DONE:
        return todos.filter(t => t.done);
      case VISIBILITY_FILTERS_SHOW_UNDONE:
        return todos.filter(t => !t.done);
      default:
        throw new Error('Unknown filter: ' + filter);
  }
});
