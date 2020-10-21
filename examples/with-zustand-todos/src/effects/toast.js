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
      toast: {
        text,
        visible: true,
        timeoutId: null,
      },
    });

    const timeoutId = timer.set(function() {
      store.setState({
        toast: {
          text: '',
          visible: false,
          timeoutId: null,
        },
      });
    }, milliseconds);

    store.setState({
      toast: {
        text,
        visible: true,
        timeoutId,
      },
    });
  });
}
