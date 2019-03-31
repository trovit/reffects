import { registerCoeffectHandler } from "../lib/lib";

export function register(dateProvider) {
  registerCoeffectHandler("datetime", function () {
    return { datetime: dateProvider.now() };
  });
}