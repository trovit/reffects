import { registerEffectHandler } from 'reffects';

export function stateSetBuilder(mutations) {
  return {
    'state.set': mutations,
  };
}

export default function registerSetStateEffect(store) {
  registerEffectHandler('state.set', function setStateEffect(mutations) {
    // eslint-disable-next-line no-param-reassign
    mutations = Object.entries(mutations).map(function([path, newValue]) {
      return { path, newValue };
    });
    store.setState(mutations);
  });
}
