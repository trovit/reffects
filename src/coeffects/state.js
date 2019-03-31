import { registerCoeffectHandler } from "../lib/reffect";

export function register(store) {
  registerCoeffectHandler("state", function (extractions) {
    const result = extractions.reduce(function (acc, { key, path }) {
      acc[key] = store.getState(path);
      return acc;
    }, {});
    return { state: result }
  });
}