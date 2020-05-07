import { coeffect, registerCoeffectHandler } from 'reffects';

export function stateGet(extractions) {
    return coeffect('state', extractions);
}

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
