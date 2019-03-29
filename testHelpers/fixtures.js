import effects from "../src/effects";
import coeffects from "../src/coeffects";
import { clearHandlers } from "../src/lib/lib";

export function applyLibFixture(events) {
  beforeAll(() => {
    effects.register();
    coeffects.register();
    if (events) {
      events.register();
    }
  });

  afterAll(() => {
    clearHandlers();
  })
}