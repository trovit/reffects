import { registerCoeffectHandler } from 'reffects';

export default function registerStateCoeffect(store) {
  registerCoeffectHandler('state', function state(extractions) {
    const result = Object.entries(extractions).reduce(
      function extractStateParts(acc, [key, path]) {
        acc[key] = store.getState(path);
        return acc;
      },
      {}
    );
    return { state: result };
  });
}
