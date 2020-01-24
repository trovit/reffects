import { store } from 'reffects-store';
import {
  registerHttpBatteries,
  registerGlobalBatteries,
} from 'reffects-batteries';
import * as setStateEffect from './effects/setState';
import * as toastEffect from './effects/toast';

import * as stateCoeffect from './coeffects/state';
import * as dateTimeCoeffect from './coeffects/datetime';

import * as httpClient from './infrastructure/httpClient';
import * as timer from './infrastructure/timer';

import * as todoListEvents from './todos/TodoList/events';

import { VISIBILITY_FILTERS_SHOW_ALL } from './todos/constants';

export function startApp() {
  window.apiUrl =
    'https://gateway.marvel.com/v1/public/characters?ts=thesoer&apikey=001ac6c73378bbfff488a36141458af2&hash=72e5ed53d1398abb831c3ceec263f18b';

  const initialState = {
    todos: [],
    visibilityFilter: VISIBILITY_FILTERS_SHOW_ALL,
    toast: {
      text: '',
      timeoutId: null,
      visible: false,
    },
  };

  store.initialize(initialState);

  registerHttpBatteries(httpClient);
  registerGlobalBatteries();

  registerEffects();
  registerCoeffects();
  registerEvents();
}

function registerEffects() {
  setStateEffect.register(store);
  toastEffect.register(store, timer);
}

function registerCoeffects() {
  stateCoeffect.register(store);
  dateTimeCoeffect.register(Date);
}

function registerEvents() {
  todoListEvents.register();
}
