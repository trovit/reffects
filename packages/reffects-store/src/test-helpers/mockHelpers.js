export function callsTo(spyFn) {
  return spyFn.mock.calls;
}

export default callsTo;
