import vanillaCreate from 'zustand/vanilla';
import create from 'zustand';
import { coeffect, registerCoeffectHandler, registerEffectHandler } from 'reffects';

const { store: defaultStore, useSelector } = registerStore()

function registerStore() {
  const store = vanillaCreate(() => ({}));
  const useSelector = create(store);

  return { store, useSelector };
}

function registerStateCoeffect(store) {
    registerCoeffectHandler('state', function state(selectors) {
        return { state: selectors.map(selector => selector(store.getState())) };
    });
}

function registerStateEffect(store) {
    registerEffectHandler('state.set', function setStateEffect(mutations) {
        mutations.forEach(mutation => store.setState(mutation))
    });
}

function registerStateBatteries(store = defaultStore) {
    registerStateCoeffect(store)
    registerStateEffect(store)
}

const state = {
    get(extractions) {
        return coeffect('state', extractions);
    },
    set(mutations) {
        return {
          'state.set': mutations,
        };
    }
}

export { 
    registerStateBatteries, 
    defaultStore as store, 
    useSelector, 
    state 
};
