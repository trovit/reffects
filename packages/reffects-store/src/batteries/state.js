import { coeffect, registerCoeffectHandler } from 'reffects';

export function stateGet(extractions) {
  return coeffect('state.get', extractions);
}

export default function registerStateCoeffect(store) {
  registerCoeffectHandler('state.get', function state(extractions) {
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
