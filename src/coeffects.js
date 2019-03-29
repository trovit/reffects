import { registerCoeffectHandler } from "./lib/lib";
import { getState } from "./lib/lib-store";

function register() {
  registerCoeffectHandler("state", function (extractions) {
    const result = extractions.reduce(function (acc, { key, path }) {
      acc[key] = getState(path);
      return acc;
    }, {});
    return {state: result}
  });

  registerCoeffectHandler("datetime", function () {
    return {datetime:  Date.now()};
  });

  registerCoeffectHandler("apiUrl", function () {
    return {apiUrl: "https://gateway.marvel.com/v1/public/characters?ts=thesoer&apikey=001ac6c73378bbfff488a36141458af2&hash=72e5ed53d1398abb831c3ceec263f18b"};
  });
}

export default {
  register
}