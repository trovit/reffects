import isEqual from 'lodash.isequal';
import { createElement, memo, useEffect } from 'react';
import * as storeModule from '../store';
import useForceUpdate from './utils';

function subscribe(
  ComponentToSubscribe,
  mapStateToProps,
  injectedProps = {},
  store = storeModule
) {
  function subscribeChild(Child) {
    function Subscriber(props) {
      const forceUpdate = useForceUpdate();
      let currentMappedProps = mapStateToProps(store.getState(), props);

      function update() {
        const nextMappedProps = mapStateToProps(store.getState(), props);

        if (!isEqual(nextMappedProps, currentMappedProps)) {
          currentMappedProps = nextMappedProps;
          forceUpdate();
        }
      }

      // Will receive props
      useEffect(() => {
        update();
      }, [props]);

      useEffect(() => {
        // Did mount
        store.subscribeListener(update);

        // Will unmount
        return () => store.unsubscribeListener(update);
      }, []);

      return createElement(Child, {
        ...props,
        ...currentMappedProps,
        ...injectedProps,
      });
    }

    return memo(Subscriber);
  }

  return subscribeChild(ComponentToSubscribe);
}

export default subscribe;
