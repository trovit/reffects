import { clearHandlers } from 'reffects';

export function destroyAllMocks() {
  jest.restoreAllMocks();
  jest.clearAllMocks();
}

export function applyEventsFixture(eventsRegistrar) {
  beforeAll(() => {
    eventsRegistrar();
  });

  afterAll(() => {
    clearHandlers();
    destroyAllMocks();
  });
}
