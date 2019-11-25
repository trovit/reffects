import { registerCoeffectHandler } from "reffects";

export function register(dateProvider) {
  registerCoeffectHandler("datetime", function () {
    return { datetime: dateProvider.now() };
  });
}