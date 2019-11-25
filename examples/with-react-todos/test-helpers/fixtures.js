import { clearHandlers } from "reffects";

export function applyEventsFixture(events) {
  beforeAll(() => {
    events.register();
  });

  afterAll(() => {
    clearHandlers();
    destroyAllMocks();
  })
}

export function destroyAllMocks() {
  jest.restoreAllMocks();
  jest.clearAllMocks();
}