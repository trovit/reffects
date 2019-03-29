import * as effects from "../src/effects";
import * as coeffects from "../src/coeffects";
import { clearHandlers } from "../src/lib/lib";

export function applyEventsFixture(events) {
  beforeAll(() => {
    events.register();
  });

  afterAll(() => {
    clearHandlers();
    destroyAllMocks();
  })
}

export function applyCoeffectsFixture(globals) {
  beforeAll(() => {
    coeffects.register(globals);
  });

  afterAll(() => {
    clearHandlers();
    destroyAllMocks();
  })
}

function destroyAllMocks() {
  jest.restoreAllMocks();
  jest.clearAllMocks();
}