import { registerEffectHandler } from "../lib/lib";

export function register(store, timer) {
  registerEffectHandler("toast", function ({ text, milliseconds }) {
    const { toast: { visible: alreadyShown, timeoutId: toastTimeoutId } } = store.getState();

    if (alreadyShown) {
      timer.clearTimeout(toastTimeoutId);
    }

    store.setState({
      path: ['toast'], newValue: {
        text, visible: true
      }
    });

    const timeoutId = timer.setTimeout(
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
