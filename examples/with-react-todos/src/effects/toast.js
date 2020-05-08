import { registerEffectHandler } from 'reffects';

const EFFECT_ID = 'toast';

export const toast = {
  show({ text, milliseconds }) {
    return {
      [EFFECT_ID]: {
        text, milliseconds,
      }
    };
  }
}

export default function registerToastEffect(store, timer) {
  registerEffectHandler(EFFECT_ID, function toast({ text, milliseconds }) {
    const {
      toast: { visible: alreadyShown, timeoutId: toastTimeoutId },
    } = store.getState();

    if (alreadyShown) {
      timer.clear(toastTimeoutId);
    }

    store.setState({
      path: ['toast'],
      newValue: {
        text,
        visible: true,
      },
    });

    const timeoutId = timer.set(function() {
      store.setState({
        path: ['toast'],
        newValue: {
          text: '',
          visible: false,
          timeoutId: null,
        },
      });
    }, milliseconds);

    store.setState({ path: ['toast', 'timeoutId'], newValue: timeoutId });
  });
}
