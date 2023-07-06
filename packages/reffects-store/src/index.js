import store from './store';
import subscribe from './subscription';
import useSelector from './subscription/useSelector';
import registerStateBatteries, { state } from './batteries';

const globalObject = globalThis || window;
const devToolsOn =
  process.env.NODE_ENV === 'development' && typeof globalObject !== 'undefined';

if (devToolsOn) {
  globalObject['__REFFECTS_DEV_TOOLS__'] = {
    ...globalObject['__REFFECTS_DEV_TOOLS__'],
    getState: store.getState,
    setState: store.setState,
    initialize: store.initialize,
    reset: store.reset,
  };
}

export { store, subscribe, useSelector, registerStateBatteries, state };
