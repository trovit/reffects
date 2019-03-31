import { registerCoeffectHandler } from "../lib/reffect";

export function register(dateProvider) {
  registerCoeffectHandler("datetime", function () {
    return { datetime: dateProvider.now() };
  });
}