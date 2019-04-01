import { registerEffectHandler, dispatch } from "./lib/reffect";
import * as store from "./infrastructure/store/store";

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
