import coeffects from "./coeffects";
import { applyLibFixture } from "../testHelpers/fixtures";
import * as effectivus from "./lib/lib";

applyLibFixture();

describe('coeffects', () => {

  test('apiUrl', () => {
    var expectedApiUrl = "https://gateway.marvel.com/v1/public/characters?ts=thesoer&apikey=001ac6c73378bbfff488a36141458af2&hash=72e5ed53d1398abb831c3ceec263f18b";
    effectivus.registerEventHandler(
      "eventUsingApiUrlCoeffect",
      function (coeffects, payload) {
        expect(coeffects.apiUrl).toEqual(expectedApiUrl);
        return {};
      },
      ["apiUrl"]
    );

    effectivus.dispatch("eventUsingApiUrlCoeffect");
  });

  test('state', () => {

  })
})