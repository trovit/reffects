import { registerCoeffectHandler } from "./lib";

export function registerCoeffects() {
  registerCoeffectHandler("state", function(coeffects, extractions) {
    var result = extractions.reduce(function(acc, extraction) {
      var path = extraction.path,
        key = extraction.key;
      acc[key] = window.state[path[0]];
      return acc;
    }, {});
    coeffects["state"] = result;
    return coeffects;
  });

  registerCoeffectHandler("datetime", function(coeffects) {
    coeffects["datetime"] = Date.now();
    return coeffects;
  });

  registerCoeffectHandler("apiUrl", function(coeffects) {
    coeffects["apiUrl"] =
      "https://gateway.marvel.com/v1/public/characters?ts=thesoer&apikey=001ac6c73378bbfff488a36141458af2&hash=72e5ed53d1398abb831c3ceec263f18b";
    return coeffects;
  });
}
