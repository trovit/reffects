let state = {};
let listeners = [];

export function getState() {
  return state;
}

export function setState({ path, newValue }) {
  state[path[0]] = newValue;
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
