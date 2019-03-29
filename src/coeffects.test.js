import coeffects from "./coeffects";
jest.mock("./lib/lib-store");

import * as store from "./lib/lib-store";
import { applyLibFixture } from "../testHelpers/fixtures";
import * as effectivus from "./lib/lib";

applyLibFixture();

describe("coeffects", () => {
  describe("apiUrl", () => {
    test("should inject the expected api url in the coeffects object", () => {
      var expectedApiUrl =
        "https://gateway.marvel.com/v1/public/characters?ts=thesoer&apikey=001ac6c73378bbfff488a36141458af2&hash=72e5ed53d1398abb831c3ceec263f18b";
      effectivus.registerEventHandler(
        "eventUsingApiUrlCoeffect",
        function(coeffects, payload) {
          expect(coeffects.apiUrl).toEqual(expectedApiUrl);
          return {};
        },
        ["apiUrl"]
      );

      effectivus.dispatch("eventUsingApiUrlCoeffect");
    });
  });

  describe("state", () => {
    test("state", () => {
      const expectedState = {
        todosRenamed: [{ id: "123", text: "saludos", isDone: true }]
      };

      store.getState.mockImplementation(() => [
        { id: "123", text: "saludos", isDone: true }
      ]);

      effectivus.registerEventHandler(
        "eventUsingStateCoeffect",
        function(coeffects, payload) {
          expect(coeffects.state).toEqual(expectedState);
          return {};
        },
        [{ id: "state", data: [{ path: ["todos"], key: "todosRenamed" }] }]
      );

      effectivus.dispatch("eventUsingStateCoeffect");
    });
  });
});

// registerCoeffectHandler("state", function (coeffects, extractions) {
//     const result = extractions.reduce(function (acc, extraction) {
//       const path = extraction.path;
//       const key = extraction.key;
//       const state = getState();

//       acc[key] = state[path[0]];
//       return acc;
//     }, {});
//     coeffects["state"] = result;
//     return coeffects;
//   });
