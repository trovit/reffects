import * as store from './store';

afterEach(() => {
  store.initialize();
  store.unsubscribeAllListeners();
});

describe('extracting values from the store', () => {
  test('using a path with no nesting', () => {
    store.initialize({ koko: 'loko' });

    expect(store.getState(['koko'])).toEqual('loko');
    expect(store.getState('koko')).toEqual('loko');
  });

  test('using a path with some nesting', () => {
    store.initialize({ koko: { loko: { moko: 'poko' } } });

    expect(store.getState(['koko', 'loko', 'moko'])).toEqual('poko');
    expect(store.getState('koko.loko.moko')).toEqual('poko');
  });

  test('using an empty path or no path', () => {
    const state = { koko: { loko: { moko: 'poko' } } };
    store.initialize(state);

    expect(store.getState([])).toEqual(state);
    expect(store.getState()).toEqual(state);
  });
});

describe('mutating values in the store', () => {
  test('using a path with no nesting represented as an array', () => {
    const newValue = 'lolo';
    const path = ['koko'];
    store.initialize({ koko: 'loko' });

    store.setState({ path, newValue });

    expect(store.getState(path)).toEqual(newValue);
  });

  test('using a path with no nesting represented as a string', () => {
    const newValue = 'lolo';
    const path = 'koko';
    store.initialize({ koko: 'loko' });

    store.setState({ path, newValue });

    expect(store.getState(path)).toEqual(newValue);
  });

  test('using a path with some nesting represented as an array', () => {
    const newValue = 'lolo';
    const path = ['koko', 'loko', 'moko'];
    store.initialize({ koko: { loko: { moko: 'poko' } } });

    store.setState({ path, newValue });

    expect(store.getState(path)).toEqual(newValue);
  });

  test('using a path with some nesting represented as a string', () => {
    const newValue = 'lolo';
    const path = 'koko.loko.moko';
    store.initialize({ koko: { loko: { moko: 'poko' } } });

    store.setState({ path, newValue });

    expect(store.getState(path)).toEqual(newValue);
  });

  test('using a path which does not exist, adds the new value anyway', () => {
    const state = { koko: { loko: { moko: 'poko' } } };
    const newValue = 'lolo';
    const path = 'koko.loko.pepe';
    store.initialize(state);

    store.setState({ path, newValue });

    expect(store.getState(path)).toEqual(newValue);

    expect(store.getState()).toEqual({
      koko: { loko: { moko: 'poko', pepe: 'lolo' } },
    });
  });

  test('using no mutation throws an error', () => {
    const state = { koko: { loko: { moko: 'poko' } } };
    store.initialize(state);

    expect(() => store.setState()).toThrow(new Error('No mutation'));
    expect(store.getState()).toEqual(state);
  });

  test('using an empty mutation throws an error', () => {
    const state = { koko: { loko: { moko: 'poko' } } };
    store.initialize(state, 'anyValue');

    expect(() => store.setState({})).toThrow(
      new Error('Empty path in mutation')
    );
    expect(store.getState()).toEqual(state);
  });

  test('using a mutation with no path throws an error', () => {
    const state = { koko: { loko: { moko: 'poko' } } };
    store.initialize(state, 'anyValue');

    expect(() => store.setState({ newValue: 42 })).toThrow(
      new Error('Empty path in mutation')
    );

    expect(store.getState()).toEqual(state);
  });

  test('passing an array of mutations', () => {
    const newValue = 'lolo';
    const path = 'koko';
    const path2 = ['momo', 'loko', 'moko'];

    store.initialize({ koko: 'loko', momo: { loko: { moko: 'poko' } } });

    store.setState([{ path, newValue }, { path: path2, newValue }]);

    expect(store.getState(path)).toEqual(newValue);
    expect(store.getState(path2)).toEqual(newValue);
  });

  test('passing an empty array of mutations throws an error', () => {
    const state = {};
    store.initialize(state);

    expect(() => store.setState([])).toThrow(new Error('No mutations'));
  });

  test('passing an array with invalid mutations throws an error', () => {
    const state = {};
    store.initialize(state);

    expect(() => store.setState([undefined])).toThrow(new Error('No mutation'));
  });
});

describe('subscriptions to store changes', () => {
  test('subscribing a listener to store changes', () => {
    const newValue = 'lolo';
    const path = ['koko'];
    store.initialize({ koko: 'loko' });
    const fn = jest.fn(newState =>
      expect(newState).toEqual({ koko: newValue })
    );

    store.subscribeListener(fn);
    store.setState({ path, newValue });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('unsubscribing a listener from store changes', () => {
    const newValue = 'lolo';
    const path = ['koko'];
    store.initialize({ koko: 'loko' });
    const spyToBeUnsubscribed = jest.fn();
    const spyNotUnsubscribed = jest.fn();

    store.subscribeListener(spyNotUnsubscribed);
    store.subscribeListener(spyToBeUnsubscribed);
    store.unsubscribeListener(spyToBeUnsubscribed);
    store.setState({ path, newValue });

    expect(spyToBeUnsubscribed).toHaveBeenCalledTimes(0);
    expect(spyNotUnsubscribed).toHaveBeenCalledTimes(1);
  });

  test('unsubscribing all listeners from store changes', () => {
    const newValue = 'lolo';
    const path = ['koko'];
    store.initialize({ koko: 'loko' });
    const spyToBeUnsubscribed1 = jest.fn();
    const spyToBeUnsubscribed2 = jest.fn();

    store.subscribeListener(spyToBeUnsubscribed1);
    store.subscribeListener(spyToBeUnsubscribed2);
    store.unsubscribeAllListeners();
    store.setState({ path, newValue });

    expect(spyToBeUnsubscribed1).toHaveBeenCalledTimes(0);
    expect(spyToBeUnsubscribed2).toHaveBeenCalledTimes(0);
  });
});
