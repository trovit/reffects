import { registerCoeffectHandler } from 'reffects';

export default function register(dateProvider) {
  registerCoeffectHandler('datetime', function() {
    return { datetime: dateProvider.now() };
  });
}
