import * as reffect from "../lib/reffect";
import * as stateCoeffect from "./state";
import * as storeModule from "../lib/lib-store";
import { destroyAllMocks } from "../../testHelpers/fixtures";
import { callsTo } from "../../testHelpers/mockHelpers";

describe("state coeffect", () => {
  expect(storeModule.getState).toBeDefined();

  afterEach(() => {
    reffect.clearHandlers();
    destroyAllMocks();
  })

  test("should extract the expected values from the store", () => {
    const state = {todos: [{ id: "123", text: "saludos", isDone: true }], toast: {id: "pepe"}};
    const pathToTodos = ["todos"];
    const pathToToastId = ["toast", "id"];
    const coeffectDescription = {
      id: "state",
      data: [{ path: pathToTodos, key: "todosRenamed" }, { path: pathToToastId, key: "toastId" }]
    };
    const store = {};
    store.getState = jest.fn()
    .mockReturnValueOnce(state.todos)
    .mockReturnValueOnce(state.toast.id);
    stateCoeffect.register(store);
    const stateHandler = reffect.getCoeffectHandler(coeffectDescription.id);

    expect(stateHandler(coeffectDescription.data)).toEqual({ 
      [coeffectDescription.id]: {todosRenamed: state.todos, toastId: state.toast.id} 
    });
    expect(store.getState).toHaveBeenCalledTimes(2);
    expect(callsTo(store.getState)).toEqual([[pathToTodos], [pathToToastId]]);
  });
});