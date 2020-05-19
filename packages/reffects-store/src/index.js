import store from './store';
import subscribe from './subscription';
import registerStateBatteries, { state } from './batteries';

const devToolsOn =
  process.env.NODE_ENV === 'development' && typeof window !== 'undefined';

if (devToolsOn) {
  window['__REFFECTS_DEV_TOOLS__'] = {
    ...window['__REFFECTS_DEV_TOOLS__'],
    getState: store.getState,
    setState: store.setState,
    initialize: store.initialize,
  };
}

export { store, subscribe, registerStateBatteries, state };
