import { useEffect } from 'react';
import * as store from '../store';
import useForceUpdate from './utils';
import isEqual from "lodash.isequal";

export default function useSelector(selector) {
  const forceUpdate = useForceUpdate();
  let currentSelectedState = selector(store.getState());

  function update() {
    const nextSelectedState = selector(store.getState());

    if (isEqual(nextSelectedState, currentSelectedState)) {
      return;
    }

    currentSelectedState = nextSelectedState;
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
