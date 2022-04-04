import { registerEffectHandler } from 'reffects';

export const MUTATE_STATE_EFFECT_ID = 'state.mutate'

export function mutateState(fn, ...args) {
  return {
    [MUTATE_STATE_EFFECT_ID]: { fn, args },
  };
}

export default function registerMutateStateEffect(store) {
  registerEffectHandler(MUTATE_STATE_EFFECT_ID, function mutateStateEffect({ fn, args }) {
    const state = store.getState()
    const newState = fn(state, ...args)
    store.reset(newState);
  });
}
