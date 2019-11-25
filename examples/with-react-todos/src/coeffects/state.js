import { registerCoeffectHandler } from "reffects";

export function register(store) {
  registerCoeffectHandler("state", function (extractions) {
    const result = Object.entries(extractions).reduce(function (acc, [key, path] ) {
      acc[key] = store.getState(path);
      return acc;
    }, {});
    return { state: result };
  });
}
