import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { withProfiler } from 'jest-react-profiler';
import subscribe from '.';
import * as storeModule from '../store';

configure({ adapter: new Adapter() });

describe('subscriptions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  function Child() {
    return <div />;
  }

  it('should pass mapped state as props', () => {
    const store = storeModule;
    store.initialize({ a: 'b' });
    const SubscribedChild = withProfiler(
      subscribe(Child, state => ({ a: state.a }), null, store)
    );

    const wrapper = mount(<SubscribedChild />);
    const child = wrapper.find(Child).first();

    expect(child.props()).toEqual({
      a: 'b',
    });
    expect(SubscribedChild).toHaveCommittedTimes(1);
  });

  it('should use the store module by default', () => {
    const store = storeModule;
    store.initialize({ a: 'b' });
    const SubscribedChild = withProfiler(
      subscribe(Child, state => ({ a: state.a }))
    );

    const wrapper = mount(<SubscribedChild />);
    const child = wrapper.find(Child).first();

    expect(child.props()).toEqual({
      a: 'b',
    });
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

    const mountedProvider = mount(<SubscribedChild />);

    expect(store.subscribeListener).toBeCalledWith(expect.any(Function));

    act(() => {
      store.setState({ path: ['a'], newValue: 'b' });
    });

    expect(store.unsubscribeListener).not.toHaveBeenCalled();
    mountedProvider.unmount();
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

    const wrapper = mount(<SubscribedChild />);
    expect(wrapper.find(Child).props()).toMatchObject(initialProps);

    act(() => {
      store.setState({ path: ['a'], newValue: 'b' });
    });
    wrapper.update();

    expect(wrapper.find(Child).props()).toMatchObject(expectedProps);
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

    const wrapper = mount(<SubscribedChild />);
    expect(wrapper.find(Child).props()).toMatchObject(initialProps);

    act(() => {
      store.setState({ path: ['a'], newValue: 'b' });
    });

    wrapper.update();

    act(() => {
      store.setState({ path: ['a'], newValue: 'a' });
    });

    wrapper.update();

    expect(wrapper.find(Child).props()).toMatchObject(expectedProps);
    expect(SubscribedChild).toHaveCommittedTimes(3);
  });

  it("shouldn't update the subscribed component props when the state is the same", () => {
    const initialProps = { a: 1 };
    const store = storeModule;
    store.initialize(initialProps);

    const SubscribedChild = withProfiler(
      subscribe(Child, state => ({ a: state.a }), null, store)
    );

    const wrapper = mount(<SubscribedChild />);

    expect(wrapper.find(Child).props()).toMatchObject(initialProps);

    act(() => {
      store.setState({ path: ['a'], newValue: 1 });
      store.setState({ path: ['koko'], newValue: 'loko' });
    });
    wrapper.update();

    expect(wrapper.find(Child).props()).toMatchObject(initialProps);
    expect(SubscribedChild).toHaveCommittedTimes(1);
  });

  it('should change subscribed component props when the parent pass new props', () => {
    const store = storeModule;
    store.initialize({ a: null });
    const initialExpectedProps = { a: null, b: 'a' };
    const finalExpectedProps = { a: null, b: 'koko' };

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

    const wrapper = mount(<Parent b={'a'} />);
    expect(wrapper.find(Child).props()).toMatchObject(initialExpectedProps);

    act(() => {
      wrapper.setProps({ b: 'koko' });
    });
    wrapper.update();

    expect(wrapper.find(Child).props()).toMatchObject(finalExpectedProps);
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
    function Parent() {
      return <SubscribedChild />;
    }
    const SubscribedParent = withProfiler(
      subscribe(Parent, state => ({ a: state.a }), null, store)
    );

    const wrapper = mount(<SubscribedParent />);
    expect(wrapper.find(Parent).props()).toMatchObject(initialProps);
    expect(wrapper.find(Child).props()).toMatchObject(initialProps);

    act(() => {
      store.setState({ path: ['a'], newValue: 'loko' });
    });

    wrapper.update();

    expect(wrapper.find(Parent).props()).toMatchObject(expectedProps);
    expect(wrapper.find(Child).props()).toMatchObject(expectedProps);
    expect(SubscribedParent).toHaveCommittedTimes(2);
    expect(SubscribedChild).toHaveCommittedTimes(2);
  });

  it('should return a Component with injected props if some are passed in', () => {
    const expectedProps = { a: 'loko' };

    const SubscribedChild = withProfiler(
      subscribe(Child, () => {}, { a: 'loko' })
    );
    const wrapper = mount(<SubscribedChild />);
    const props = wrapper.find(Child).props();

    expect(props).toMatchObject(expectedProps);
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
    const wrapper = mount(<SubscribedChild a={'loko'} />);
    const props = wrapper.find(Child).props();

    expect(props).toMatchObject(expectedProps);
    expect(SubscribedChild).toHaveCommittedTimes(1);
  });

  it('should force update when will receive props', () => {
    const store = storeModule;
    let prop = 0;
    store.initialize({});
    const spy = jest.fn();
    const SubscribedChild = withProfiler(subscribe(Child, spy, store));

    const wrapper = mount(<SubscribedChild a={prop} />);

    prop = 1;

    wrapper.setProps({ a: prop });

    expect(spy).toHaveBeenCalledTimes(4);
    expect(SubscribedChild).toHaveCommittedTimes(2);
  });
});
