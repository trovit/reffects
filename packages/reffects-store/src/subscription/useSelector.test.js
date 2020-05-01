import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { withProfiler } from 'jest-react-profiler';
import React from 'react';
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
    const child = wrapper.find(ComponentUsingSelector).first();

    expect(child.text()).toEqual('b');
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
});
