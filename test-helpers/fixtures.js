const { clearHandlers } = require('../packages/reffects');

function destroyAllMocks() {
  jest.restoreAllMocks();
  jest.clearAllMocks();
}

function applyEventsFixture(eventsRegistrar) {
  beforeAll(() => {
    eventsRegistrar();
  });

  afterAll(() => {
    clearHandlers();
    destroyAllMocks();
  });
}

module.exports = {
  destroyAllMocks,
  applyEventsFixture
}
