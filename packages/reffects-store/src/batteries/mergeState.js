import { registerEffectHandler } from 'reffects';
import deepmerge from 'deepmerge';

export const MERGE_STATE_EFFECT_ID = 'state.merge';

export default function registerMergeStateEffect(store) {
  registerEffectHandler(MERGE_STATE_EFFECT_ID, function mergeStateEffect(
    deepPartialState
  ) {
    const state = store.getState();
    store.reset(
      deepmerge(state, deepPartialState, {
        arrayMerge: (_, sourceArray) => sourceArray,
      })
    );
  });
}

export function stateMerge(deepPartialState) {
  return {
    [MERGE_STATE_EFFECT_ID]: deepPartialState,
  };
}
