import { registerCoeffectHandler } from "../lib/reffect";

export function register(globals) {
  registerCoeffectHandler("apiUrl", function () {
    return { apiUrl: globals["apiUrl"] };
  });
}