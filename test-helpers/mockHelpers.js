function callsTo(spyFn) {
  return spyFn.mock.calls;
}

module.exports = {
  callsTo
}
