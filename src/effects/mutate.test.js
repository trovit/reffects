import * as reffect from "../lib/lib";
import * as mutateEffect from "./mutate";
import * as storeModule from "../lib/lib-store";
import { destroyAllMocks } from "../../testHelpers/fixtures";
import { callsTo } from "../../testHelpers/mockHelpers";

describe("mutate effect", () => {
  expect(storeModule.setState).toBeDefined();

  afterEach(() => {
    reffect.clearHandlers();
    destroyAllMocks();
  })

  test("should mutate the state in the store", () => {
    const effectId = "mutate";
    const store = {setState: jest.fn()};
    mutateEffect.register(store);
    const mutateHandler = reffect.getEffectHandler(effectId);
    const firstMutation = { path: ["visibilityFilter"], newValue: "all" };
    const secondMutation = { path: ["toast", "isShown"], newValue: true };
    const mutations = [firstMutation, secondMutation];

    mutateHandler(mutations);
    
    expect(store.setState).toHaveBeenCalledTimes(2);
    expect(callsTo(store.setState)).toEqual([[firstMutation], [secondMutation]])
  });
});