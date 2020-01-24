import { registerCoeffectHandler } from 'reffects';

export default function registerStateCoeffect(store) {
  registerCoeffectHandler('state', function(extractions) {
    const result = Object.entries(extractions).reduce(function(
      acc,
      [key, path]
    ) {
      acc[key] = store.getState(path);
      return acc;
    },
    {});
    return { state: result };
  });
}
