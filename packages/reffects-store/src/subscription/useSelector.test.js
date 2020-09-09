import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { withProfiler } from 'jest-react-profiler';
import React from 'react';
import { act } from 'react-dom/test-utils';
import * as storeModule from '../store';
import useSelector from './useSelector';

configure({ adapter: new Adapter() });

describe('useSelector hook', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should return selected state region', () => {
    const store = storeModule;
    store.initialize({ a: 'b' });
    const ComponentUsingSelector = withProfiler(() => {
      const a = useSelector(state => state.a);
      return <div>{a}</div>;
    });

    const wrapper = mount(<ComponentUsingSelector />);
    const text = wrapper
      .find(ComponentUsingSelector)
      .first()
      .text();

    expect(text).toEqual('b');
    expect(ComponentUsingSelector).toHaveCommittedTimes(1);
  });

  it('should subscribe and unsubscribe to store', () => {
    const store = storeModule;
    store.initialize({ a: null });
    jest.spyOn(store, 'subscribeListener');
    jest.spyOn(store, 'unsubscribeListener');
    const ComponentUsingSelector = withProfiler(() => {
      const a = useSelector(state => state.a);
      return <div>{a}</div>;
    });

    expect(store.subscribeListener).not.toHaveBeenCalled();

    const mountedProvider = mount(<ComponentUsingSelector />);

    expect(store.unsubscribeListener).not.toHaveBeenCalled();
    mountedProvider.unmount();
    expect(store.unsubscribeListener).toBeCalled();
    expect(ComponentUsingSelector).toHaveCommittedTimes(1);
  });

  it('should update the component using it when the state changes', () => {
    const store = storeModule;
    const initialProps = { a: 'a' };
    store.initialize(initialProps);
    const ComponentUsingSelector = withProfiler(() => {
      const a = useSelector(state => state.a);
      return <div>{a}</div>;
    });

    const wrapper = mount(<ComponentUsingSelector />);
    expect(extractTextFrom(wrapper, ComponentUsingSelector)).toBe('a');

    act(() => {
      store.setState({ path: ['a'], newValue: 'b' });
    });
    wrapper.update();

    expect(extractTextFrom(wrapper, ComponentUsingSelector)).toBe('b');

    act(() => {
      store.setState({ path: ['a'], newValue: 'a' });
    });
    wrapper.update();

    expect(extractTextFrom(wrapper, ComponentUsingSelector)).toBe('a');
    expect(ComponentUsingSelector).toHaveCommittedTimes(3);
  });
});

it("shouldn't update the component using it when the state is the same", () => {
  const initialProps = { a: 1 };
  const store = storeModule;
  store.initialize(initialProps);
  const ComponentUsingSelector = withProfiler(() => {
    const a = useSelector(state => state.a);
    return <div>{a}</div>;
  });

  const wrapper = mount(<ComponentUsingSelector />);
  expect(extractTextFrom(wrapper, ComponentUsingSelector)).toBe('1');

  act(() => {
    store.setState({ path: ['a'], newValue: 1 });
    store.setState({ path: ['koko'], newValue: 'loko' });
  });
  wrapper.update();

  expect(extractTextFrom(wrapper, ComponentUsingSelector)).toBe('1');
  expect(ComponentUsingSelector).toHaveCommittedTimes(1);
});

it('renders the component once despite of the times useSelector is called in a component', () => {
  const initialProps = { a: 1, b: 'koko', c: [1] };
  const store = storeModule;
  store.initialize(initialProps);
  const ComponentUsingSelector = withProfiler(() => {
    const a = useSelector(state => state.a);
    const b = useSelector(state => state.b);
    const c = useSelector(state => state.c);

    return (
      <div>
        {a}
        {b}
        {c}
      </div>
    );
  });

  const wrapper = mount(<ComponentUsingSelector />);
  expect(extractTextFrom(wrapper, ComponentUsingSelector)).toBe('1koko1');

  act(() => {
    store.setState({ path: ['a'], newValue: 2 });
    store.setState({ path: ['b'], newValue: 'loko' });
    store.setState({ path: ['c'], newValue: [2] });
  });
  wrapper.update();

  expect(extractTextFrom(wrapper, ComponentUsingSelector)).toBe('2loko2');
  expect(ComponentUsingSelector).toHaveCommittedTimes(2);
});

function extractTextFrom(wrapper, component) {
  return wrapper
    .find(component)
    .first()
    .text();
}
