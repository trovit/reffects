import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { withProfiler } from 'jest-react-profiler';
import React from 'react';
import * as storeModule from '../store';
import useSelector from './useSelector';

configure({ adapter: new Adapter() });

describe('subscriptions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should return selected state region', () => {
    const store = storeModule;
    store.initialize({ a: 'b' });

    function ComponentUsingSelector() {
      const a = useSelector(state => state.a);
      return <div>{a}</div>;
    }

    const ComponentUsingSelectorWithProfiler = withProfiler(
      ComponentUsingSelector
    );

    const wrapper = mount(<ComponentUsingSelectorWithProfiler />);
    const child = wrapper.find(ComponentUsingSelectorWithProfiler).first();

    expect(child.text()).toEqual('b');
    expect(ComponentUsingSelectorWithProfiler).toHaveCommittedTimes(1);
  });
});
