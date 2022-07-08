import { dispatch as defaultDispatch } from 'reffects';
import isEqual from 'lodash.isequal';
import * as storeModule from '../store';

export default function subscribeEvent(
  eventId,
  mapStateToPayload,
  store = storeModule,
  dispatch = defaultDispatch
) {
  let currentSelection = mapStateToPayload(store.getState());

  function update() {
    const nextSelection = mapStateToPayload(store.getState());

    if (isEqual(currentSelection, nextSelection)) {
      return;
    }

    currentSelection = nextSelection;
    dispatch({ id: eventId, payload: nextSelection });
  }

  store.subscribeListener(update);

  return function unsubscribe() {
    store.unsubscribeListener(update);
  };
}
