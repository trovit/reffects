import { clearHandlers } from 'reffects';

export function applyEventsFixture(registerEventsCallback) {
  beforeAll(() => {
    registerEventsCallback();
  });

  afterAll(() => {
    clearHandlers();
    destroyAllMocks();
  });
}

export function destroyAllMocks() {
  jest.restoreAllMocks();
  jest.clearAllMocks();
}
