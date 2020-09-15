import registerToastEffect, { toast } from './toast';
import { store as storeModule } from './state';
import * as timerModule from '../infrastructure/timer';
import { destroyAllMocks } from '../../test-helpers/fixtures';
import { callsTo } from '../../test-helpers/mockHelpers';
import { clearHandlers, getEffectHandler } from 'reffects';

describe('toast effect', () => {
  expect(storeModule.setState).toBeDefined();
  expect(storeModule.getState).toBeDefined();
  expect(timerModule.set).toBeDefined();
  expect(timerModule.clear).toBeDefined();

  afterEach(() => {
    clearHandlers();
    destroyAllMocks();
  });

  const effectId = 'toast';

  test('when another toast is already being shown it should show a toast by mutating its visibility, store the the timeout id and hide the toast after some time passes', () => {
    const newToastId = 38;
    const store = createStore({ toast: { visible: false, timeoutId: null } });
    const timer = createInstantaneousTimer(newToastId);
    registerToastEffect(store, timer);
    const toastHandler = getEffectHandler(effectId);
    const toastData = { text: 'toastText', milliseconds: 'milliseconds' };

    toastHandler(toastData);

    expect(timer.clear).not.toBeCalled();
    expect(timer.set).toHaveBeenCalledTimes(1);
    expect(store.setState).toHaveBeenCalledTimes(3);
    expect(callsTo(store.setState)).toEqual([
      [{ toast: { text: 'toastText', timeoutId: null, visible: true } }],
      [
        {
          toast: { text: '', timeoutId: null, visible: false },
        },
      ], // using a real timer this one should be the last one
      [{ toast: { text: 'toastText', timeoutId: newToastId, visible: true }}],
    ]);
  });

  test('when another toast is already being shown it should close it before showing the new one', () => {
    const idOfPreviousToast = 'idOfPreviousToast';
    const newToastId = 38;
    const store = createStore({
      toast: { visible: true, timeoutId: idOfPreviousToast },
    });
    const timer = createInstantaneousTimer(newToastId);
    registerToastEffect(store, timer);
    const toastHandler = getEffectHandler(effectId);
    const toastData = { text: 'toastText', milliseconds: 'milliseconds' };

    toastHandler(toastData);

    expect(timer.clear).toHaveBeenCalledTimes(1);
    expect(callsTo(timer.clear)).toEqual([[idOfPreviousToast]]);
    expect(timer.set).toHaveBeenCalledTimes(1);
    expect(store.setState).toHaveBeenCalledTimes(3);
    expect(callsTo(store.setState)).toEqual([
      [{ toast: { text: 'toastText', timeoutId: null, visible: true } }],
      [
        {
          toast: { text: '', timeoutId: null, visible: false },
        },
      ], // using a real timer this one should be the last one
      [{ toast: {  text: 'toastText', timeoutId: newToastId, visible: true }}],
    ]);
  });

  test('should create a toast effect using a builder', () => {
    const toastEffect = toast.show({ text: 'Hello', milliseconds: 100 });

    expect(toastEffect).toEqual({
      [effectId]: {
        text: 'Hello',
        milliseconds: 100
      }
    })
  });
});

function createStore(initialState) {
  const store = {};
  store.setState = jest.fn();
  store.getState = function() {
    return initialState;
  };
  return store;
}

function createInstantaneousTimer(newToastId) {
  const timer = {};
  timer.set = jest.fn(callback => {
    callback();
    return newToastId;
  });
  timer.clear = jest.fn();
  return timer;
}
