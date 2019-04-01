jest.mock("./infrastructure/store/store");
import * as store from "./infrastructure/store/store";
import { applyEffectsFixture } from "../testHelpers/fixtures";
import * as reffect from "./lib/reffect";

applyEffectsFixture();

describe("effects", () => {
  describe("mutate effect", () => {
    test("should mutate the state in the store", () => {
      const effectId = "mutate";
      const mutateHandler = reffect.getEffectHandler(effectId);
      const aMutation = { path: ["visibilityFilter"], newValue: "all" };
      const anotherMutation = { path: ["toast", "isShown"], newValue: true };
      const mutations = [aMutation, anotherMutation];
      var calls = [];
      store.setState.mockImplementation((...args) => calls.push(args));

      mutateHandler(mutations);

      expect(calls.length).toEqual(2);
      expect(calls).toEqual([[aMutation], [anotherMutation]]);
    });
  });

  describe("toast effect", () => {
    test("should show and hide a toast by mutating its state in the store", () => {

    });
  });
});
