jest.mock("./infrastructure/store/store");
import * as coeffects from './coeffects';
import * as store from "./infrastructure/store/store";
import { applyCoeffectsFixture } from "../testHelpers/fixtures";
import * as reffect from "./lib/reffect";

var apiUrl = "https://gateway.marvel.com/v1/public/characters?ts=thesoer&apikey=001ac6c73378bbfff488a36141458af2&hash=72e5ed53d1398abb831c3ceec263f18b"

applyCoeffectsFixture({ apiUrl: apiUrl });

describe("coeffects", () => {
  describe("apiUrl coeffect", () => {
    test("should return the expected api url", () => {
      const coeffectId = "apiUrl",
        apiUrlHandler = reffect.getCoeffectHandler(coeffectId);

      expect(apiUrlHandler()).toEqual({ [coeffectId]: apiUrl });
    });
  });

  describe("state coeffect", () => {
    test("should extract the expected values", () => {
      const coeffectDescription = {
        id: "state",
        data: [{ path: ["todos"], key: "todosRenamed" },
        { path: ["toast", "id"], key: "toastId" }]
      },
        stateHandler = reffect.getCoeffectHandler(coeffectDescription.id),
        expectedState = {
          todosRenamed: [{ id: "123", text: "saludos", isDone: true }],
          toastId: "pepe"
        };

      store.getState.mockImplementationOnce(() => [
        { id: "123", text: "saludos", isDone: true }
      ]).mockImplementationOnce(() => {
        return "pepe";
      });

      expect(stateHandler(coeffectDescription.data)).toEqual({ [coeffectDescription.id]: expectedState });
    });
  });

  describe("datetime coeffect", () => {
    test("should extract the expected date", () => {
      const coeffectDescription = "datetime";
      const expectedDateTime = "anyDateTime";
      const dateTimeHandler = reffect.getCoeffectHandler(coeffectDescription);
      Date.now = jest.fn().mockReturnValue(expectedDateTime);

      expect(dateTimeHandler()).toEqual({ [coeffectDescription]: expectedDateTime });
    });
  });
});

