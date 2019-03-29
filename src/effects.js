import { registerEffectHandler, dispatch } from "./lib/lib";
import * as store from "./lib/lib-store";

function dispatchMany(events) {
  events.forEach(function (event) {
    const [eventId, payload] = event;
    dispatch(eventId, payload);
  });
}

function dispatchLater(event) {
  const { eventId, payload, milliseconds } = event;

  setTimeout(function () {
    dispatch(eventId, payload);
  }, milliseconds);
}

export function register() {
  registerEffectHandler("mutate", function mutateEffect(mutations) {
    mutations.forEach(function (mutation) {
      store.setState(mutation);
    });
  });

  registerEffectHandler("get", function getEffect(requestDescription) {
    const [eventId, ...rest] = requestDescription.successEvent;
    fetch(requestDescription.url)
      .then(res => res.json())
      .then(response => dispatch(eventId, response.data));
  });

  registerEffectHandler("dispatch", function dispatchEffect(event) {
    const { eventId, payload } = event;
    dispatch(eventId, payload);
  });

  registerEffectHandler("dispatchMany", function dispatchManyEffect(events) {
    return dispatchMany(events)
  });

  registerEffectHandler("dispatchLater", function dispatchLaterEffect(event) {
    dispatchLater(event);
  });

  registerEffectHandler("toast", function ({ text, milliseconds }) {
    const { toast: { visible: alreadyShown, timeoutId: toastTimeoutId } } = store.getState();

    if (alreadyShown) {
      clearTimeout(toastTimeoutId);
    }

    store.setState({
      path: ['toast'], newValue: {
        text, visible: true
      }
    });

    const timeoutId = setTimeout(
      function () {
        store.setState({
          path: ['toast'], newValue: {
            text: '', visible: false, timeoutId: null
          }
        });
      },
      milliseconds
    );

    store.setState({ path: ['toast', 'timeoutId'], newValue: timeoutId });
  });
}
