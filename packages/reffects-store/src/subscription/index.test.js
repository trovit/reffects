import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import withProfiler from './rendererProfiler';
import subscribe from '.';
import * as storeModule from '../store';
import '@testing-library/jest-dom';

describe('subscriptions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  function Child(props) {
    return <div>{JSON.stringify(props)}</div>;
  }

  it('should pass mapped state as props', () => {
    const store = storeModule;
    store.initialize({ a: 'b' });
    const SubscribedChild = withProfiler(
      subscribe(Child, state => ({ a: state.a }), null, store)
    );

    const { getByText } = render(<SubscribedChild />);

    expect(getByText(JSON.stringify({ a: 'b' }))).toBeInTheDocument();
    expect(SubscribedChild).toHaveCommittedTimes(1);
  });

  it('should use the store module by default', () => {
    const store = storeModule;
    store.initialize({ a: 'b' });
    const SubscribedChild = withProfiler(
      subscribe(Child, state => ({ a: state.a }))
    );

    const { getByText } = render(<SubscribedChild />);

    expect(getByText(JSON.stringify({ a: 'b' }))).toBeInTheDocument();
    expect(SubscribedChild).toHaveCommittedTimes(1);
  });

  it('should subscribe and unsubscribe to store', () => {
    const store = storeModule;
    store.initialize({ a: null });
    jest.spyOn(store, 'subscribeListener');
    jest.spyOn(store, 'unsubscribeListener');
    const SubscribedChild = withProfiler(
      subscribe(Child, state => ({ a: state.a }), null, store)
    );

    expect(store.subscribeListener).not.toHaveBeenCalled();

    const { unmount } = render(<SubscribedChild />);

    expect(store.subscribeListener).toBeCalledWith(expect.any(Function));

    act(() => {
      store.setState({ path: ['a'], newValue: 'b' });
    });

    expect(store.unsubscribeListener).not.toHaveBeenCalled();
    unmount();
    expect(store.unsubscribeListener).toBeCalled();
    expect(SubscribedChild).toHaveCommittedTimes(2);
  });

  it('should update subscribed component props when the state changes', () => {
    const store = storeModule;
    const initialProps = { a: null };
    store.initialize(initialProps);
    const expectedProps = { a: 'b' };

    const SubscribedChild = withProfiler(
      subscribe(Child, state => ({ a: state.a }), null, store)
    );

    const { getByText } = render(<SubscribedChild />);
    expect(getByText(JSON.stringify(initialProps))).toBeInTheDocument();

    act(() => {
      store.setState({ path: ['a'], newValue: 'b' });
    });

    expect(getByText(JSON.stringify(expectedProps))).toBeInTheDocument();
    expect(SubscribedChild).toHaveCommittedTimes(2);
  });

  it('should update subscribed component props when the state changes consecutively when a initial state value is set', () => {
    const store = storeModule;
    const initialProps = { a: 'a' };
    store.initialize(initialProps);
    const expectedProps = { a: 'a' };

    const SubscribedChild = withProfiler(
      subscribe(Child, state => ({ a: state.a }), null, store)
    );

    const { getByText } = render(<SubscribedChild />);
    expect(getByText(JSON.stringify(initialProps))).toBeInTheDocument();

    act(() => {
      store.setState({ path: ['a'], newValue: 'b' });
    });

    act(() => {
      store.setState({ path: ['a'], newValue: 'a' });
    });

    expect(getByText(JSON.stringify(expectedProps))).toBeInTheDocument();
    expect(SubscribedChild).toHaveCommittedTimes(3);
  });

  it("shouldn't update the subscribed component props when the state is the same", () => {
    const initialProps = {
      a: {
        b: [1, 2],
        c: { d: null, e: undefined, f: [{ g: 1 }] },
      },
    };
    const store = storeModule;
    store.initialize(initialProps);

    const SubscribedChild = withProfiler(
      subscribe(Child, state => ({ a: state.a }), null, store)
    );

    const { getByText } = render(<SubscribedChild />);
    expect(getByText(JSON.stringify(initialProps))).toBeInTheDocument();

    act(() => {
      store.setState({
        path: ['a'],
        newValue: {
          b: [1, 2],
          c: { d: null, e: undefined, f: [{ g: 1 }] },
        },
      });
      store.setState({ path: ['koko'], newValue: 'loko' });
    });

    expect(getByText(JSON.stringify(initialProps))).toBeInTheDocument();

    act(() => {
      store.setState({
        path: 'a.c.f',
        newValue: [{ g: 1 }],
      });
      store.setState({ path: ['koko'], newValue: 'loko' });
    });

    expect(getByText(JSON.stringify(initialProps))).toBeInTheDocument();
    expect(SubscribedChild).toHaveCommittedTimes(1);
  });

  it('should change subscribed component props when the parent pass new props', () => {
    const store = storeModule;
    store.initialize({ a: null });
    const initialExpectedProps = { b: 'a', a: null };
    const finalExpectedProps = { b: 'koko', a: null };

    const SubscribedChild = withProfiler(
      subscribe(
        Child,
        (state, ownProps) => ({ a: state.a, b: ownProps.b }),
        null,
        store
      )
    );

    function Parent({ b }) {
      return <SubscribedChild b={b} />;
    }

    const { rerender, getByText } = render(<Parent b={'a'} />);
    expect(getByText(JSON.stringify(initialExpectedProps))).toBeInTheDocument();

    rerender(<Parent b={'koko'} />);

    expect(getByText(JSON.stringify(finalExpectedProps))).toBeInTheDocument();
    expect(SubscribedChild).toHaveCommittedTimes(2);
  });

  it('should update parent and child components props when are subscribed to the same part of the state', () => {
    const store = storeModule;
    const initialProps = { a: 'koko' };
    store.initialize(initialProps);
    const expectedProps = { a: 'loko' };
    const SubscribedChild = withProfiler(
      subscribe(Child, state => ({ a: state.a }), null, store)
    );
    function Parent(props) {
      return (
        <>
          <div>Parent props {JSON.stringify(props)}</div>
          <SubscribedChild />
        </>
      );
    }
    const SubscribedParent = withProfiler(
      subscribe(Parent, state => ({ a: state.a }), null, store)
    );

    const { container } = render(<SubscribedParent />);
    expect(container.children[0].textContent).toStrictEqual(
      `Parent props ${JSON.stringify(initialProps)}`
    );
    expect(container.children[1].textContent).toStrictEqual(
      JSON.stringify(initialProps)
    );

    act(() => {
      store.setState({ path: ['a'], newValue: 'loko' });
    });

    expect(container.children[0].textContent).toStrictEqual(
      `Parent props ${JSON.stringify(expectedProps)}`
    );
    expect(container.children[1].textContent).toStrictEqual(
      JSON.stringify(expectedProps)
    );
    expect(SubscribedParent).toHaveCommittedTimes(2);
    expect(SubscribedChild).toHaveCommittedTimes(2);
  });

  it('should return a Component with injected props if some are passed in', () => {
    const expectedProps = { a: 'loko' };

    const SubscribedChild = withProfiler(
      subscribe(Child, () => {}, { a: 'loko' })
    );
    const { getByText } = render(<SubscribedChild />);

    expect(getByText(JSON.stringify(expectedProps))).toBeInTheDocument();
    expect(SubscribedChild).toHaveCommittedTimes(1);
  });

  it('should return a Component with injected props if some are passed in, and prevail any other prop', () => {
    const store = storeModule;
    store.initialize({ a: 'koko' });
    const expectedProps = { a: 'moko' };

    const SubscribedChild = withProfiler(
      subscribe(
        Child,
        state => ({
          a: state.a,
        }),
        { a: 'moko' },
        store
      )
    );
    const { getByText } = render(<SubscribedChild a={'loko'} />);

    expect(getByText(JSON.stringify(expectedProps))).toBeInTheDocument();
    expect(SubscribedChild).toHaveCommittedTimes(1);
  });

  it('should force update when will receive props', () => {
    const store = storeModule;
    store.initialize({});
    const spy = jest.fn();
    const SubscribedChild = withProfiler(subscribe(Child, spy, store));

    const { rerender } = render(<SubscribedChild a={0} />);

    rerender(<SubscribedChild a={1} />);

    expect(spy).toHaveBeenCalledTimes(4);
    expect(SubscribedChild).toHaveCommittedTimes(2);
  });
});
