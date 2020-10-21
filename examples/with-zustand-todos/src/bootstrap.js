import {
  registerHttpBatteries,
  registerGlobalBatteries,
} from 'reffects-batteries';
import registerToastEffect from './effects/toast';
import httpClient from './infrastructure/httpClient';
import timer from './infrastructure/timer';
import registerTodoListEvents from './todos/TodoList/events';
import { VISIBILITY_FILTERS_SHOW_ALL } from './todos/constants';
import { registerEventHandler } from 'reffects';
import { state, registerStateBatteries, store } from './effects/state';
 
export function startApp() {
  window.apiUrl =
    'https://gateway.marvel.com/v1/public/characters?ts=thesoer&apikey=001ac6c73378bbfff488a36141458af2&hash=72e5ed53d1398abb831c3ceec263f18b';

  // Reffects' built in batteries
  registerHttpBatteries(httpClient);
  registerGlobalBatteries();
  registerStateBatteries();

  // Custom effects/coeffects & events
  registerToastEffect(store, timer);
  registerInitialEvents();
  registerTodoListEvents();
}


function registerInitialEvents() {
  registerEventHandler('appAccessed', function appAccessed() {
    return state.set([() => ({
        todos: [], 
        visibilityFilter: VISIBILITY_FILTERS_SHOW_ALL,
        toast: {
          text: '',
          timeoutId: null,
          visible: false,
        },
      })])
  })
}