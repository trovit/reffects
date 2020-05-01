import { useEffect } from 'react';
import * as store from '../store';

export default function useSelector(selector) {
  function update() {}

  useEffect(() => {
    // Did mount
    store.subscribeListener(update);

    // Will unmount
    return () => store.unsubscribeListener(update);
  }, []);

  return selector(store.getState());
}
