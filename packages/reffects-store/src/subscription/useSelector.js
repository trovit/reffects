import { useEffect } from 'react';
import * as store from '../store';
import useForceUpdate from './utils';

export default function useSelector(selector) {
  const forceUpdate = useForceUpdate();

  function update() {
    forceUpdate();
  }

  useEffect(() => {
    // Did mount
    store.subscribeListener(update);

    // Will unmount
    return () => store.unsubscribeListener(update);
  }, []);

  return selector(store.getState());
}
