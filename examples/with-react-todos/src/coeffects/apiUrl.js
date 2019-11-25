import { registerCoeffectHandler } from "reffects";

export function register(globals) {
  registerCoeffectHandler("apiUrl", function () {
    return { apiUrl: globals["apiUrl"] };
  });
}