import { registerEffectHandler } from 'reffects';
import deepmerge from 'deepmerge';

export const DEEP_SET_STATE_EFFECT_ID = 'state.deepSet';

export default function registerDeepSetStateEffect(store) {
  registerEffectHandler(DEEP_SET_STATE_EFFECT_ID, function deepSetStateEffect(
    deepPartialState
  ) {
    const state = store.getState();
    store.reset(deepmerge(state, deepPartialState));
  });
}

export function stateDeepSet(deepPartialState) {
  return {
    'state.deepSet': deepPartialState,
  };
}
