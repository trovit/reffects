import stateGetCoeffect, { stateGet } from './getState';
import stateSetEffect, { stateSet } from './setState';
import stateMergeEffect, { stateMerge } from './mergeState';
import defaultStore from '../store';

/**
 * TODO: deprecate effect stand-alone registers, the preference is to register a
 * complete battery.
 */
export const registerStateEffect = stateSetEffect;
export const registerStateCoeffect = stateGetCoeffect;

export const state = {
  get: stateGet,
  set: stateSet,
  merge: stateMerge,
};

export default function registerStateBatteries(store = defaultStore) {
  stateGetCoeffect(store);
  stateSetEffect(store);
  stateMergeEffect(store);
}
