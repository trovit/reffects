import { registerCoeffectHandler } from "./lib/reffect";
import { getState } from "./infrastructure/store/store";

export function register(globals = {}) {
  registerCoeffectHandler("state", function (extractions) {
    const result = extractions.reduce(function (acc, { key, path }) {
      acc[key] = getState(path);
      return acc;
    }, {});
    return { state: result }
  });

  registerCoeffectHandler("datetime", function () {
    return { datetime: Date.now() };
  });

  function getGlobalVariable(id) {
    return globals[id];
  }

  registerCoeffectHandler("apiUrl", function () {
    return { apiUrl: getGlobalVariable("apiUrl") };
  });
}