import { registerCoeffectHandler } from "../lib/lib";

export function register(globals) {
  registerCoeffectHandler("apiUrl", function () {
    return { apiUrl: globals["apiUrl"] };
  });
}