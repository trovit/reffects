import { setIn, getIn } from "./lib-utils";

let state = {};
let listeners = [];

export function getState(path = []) {
  return getIn(state, path, state);
}

export function setState({ path = [], newValue }) {
  if (!path.length) {
    return;
  }

  state = setIn(state, path, newValue);

  let currentListeners = listeners;
  for (let i = 0; i < currentListeners.length; i++) currentListeners[i](state);
}

export function subscribe(listener) {
  listeners.push(listener);
}

export function unsubscribe(listener) {
  let out = [];
  for (let i = 0; i < listeners.length; i++) {
    if (listeners[i] === listener) {
      listener = null;
    } else {
      out.push(listeners[i]);
    }
  }
  listeners = out;
}

export function initializeStore(initialState = {}) {
  state = initialState;
}
