import { registerEffectHandler, dispatch } from "./lib/reffect";
import * as store from "./lib/lib-store";

export function registerEffects() {
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
