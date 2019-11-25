import { registerEffectHandler } from "reffects";

export function register(store, timer) {
  registerEffectHandler("toast", function toast({ text, milliseconds }) {
    const { toast: { visible: alreadyShown, timeoutId: toastTimeoutId } } = store.getState();

    if (alreadyShown) {
      timer.clear(toastTimeoutId);
    }

    store.setState({
      path: ['toast'], newValue: {
        text, visible: true
      }
    });

    const timeoutId = timer.set(
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
