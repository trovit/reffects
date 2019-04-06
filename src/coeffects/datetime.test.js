import * as reffect from "../lib/reffect";
import * as datetimeCoeffect from "./datetime";
import { destroyAllMocks } from "../../testHelpers/fixtures";
import { callsTo } from "../../testHelpers/mockHelpers";

describe("datetime coeffect", () => {
  afterEach(() => {
    reffect.clearHandlers();
    destroyAllMocks();
  });

  test("should extract the expected date", () => {
    const coeffectId = "datetime";
    const expectedDateTime = "anyDateTime";
    datetimeCoeffect.register({now: () => expectedDateTime});
    const dateTimeHandler = reffect.getCoeffectHandler(coeffectId);

    expect(dateTimeHandler()).toEqual({ [coeffectId]: expectedDateTime });
  });
});