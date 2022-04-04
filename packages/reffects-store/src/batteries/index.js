import stateGetCoeffect, { stateGet } from './getState';
import stateSetEffect, { stateSet } from './setState';
import stateMutateEffect, { mutateState } from './mutateState';
import defaultStore from '../store';
import stateDeepSetEffect, { stateDeepSet } from './deepSetState';

/**
 * TODO: deprecate effect stand-alone registers, the preference is to register a
 * complete battery.
 */
export const registerStateEffect = stateSetEffect;
export const registerStateCoeffect = stateGetCoeffect;

export const state = {
  get: stateGet,
  set: stateSet,
  deepSet: stateDeepSet,
  mutate: mutateState,
};

export default function registerStateBatteries(store = defaultStore) {
  stateGetCoeffect(store);
  stateSetEffect(store);
  stateDeepSetEffect(store);
  stateMutateEffect(store);
}
