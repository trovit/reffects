export function set(fn, milliseconds) {
  return setTimeout(fn, milliseconds);
}

export function clear(timeoutId) {
  clearTimeout(timeoutId);
}

export default {
  clear,
  set,
};
