import { registerEffectHandler, dispatch, dispatchMany } from "./lib";
import * as store from "./lib-store";

export function registerEffects() {
  registerEffectHandler("mutate", function (mutations) {
    mutations.forEach(function (mutation) {
      store.setState(mutation);
    });
  });

  registerEffectHandler("get", function (requestDescription) {
    const [eventId, ...rest] = requestDescription.successEvent;
    fetch(requestDescription.url)
      .then(res => res.json())
      .then(response => dispatch(eventId, response.data));
  });

  registerEffectHandler("dispatch", function (event) {
    const { eventId, payload, milliseconds } = event;
    dispatch(eventId, payload);
  });

  registerEffectHandler("dispatchMany", dispatchMany);

  registerEffectHandler("dispatchLater", function (event) {
    const { eventId, payload, milliseconds } = event;

    setTimeout(function () {
      dispatch(eventId, payload);
    }, milliseconds);
  });

}
