import { clearHandlers } from "../src/lib/reffect";

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