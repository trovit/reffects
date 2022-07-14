import { withProfiler } from 'jest-react-profiler';
import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import * as storeModule from '../store';
import useSelector from './useSelector';
import '@testing-library/jest-dom';

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

    const { getByText } = render(<ComponentUsingSelector />);

    expect(getByText('b')).toBeInTheDocument();
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

    const { unmount } = render(<ComponentUsingSelector />);

    expect(store.unsubscribeListener).not.toHaveBeenCalled();
    unmount();
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

    const { getByText } = render(<ComponentUsingSelector />);
    expect(getByText('a')).toBeInTheDocument();

    act(() => {
      store.setState({ path: ['a'], newValue: 'b' });
    });

    expect(getByText('b')).toBeInTheDocument();

    act(() => {
      store.setState({ path: ['a'], newValue: 'a' });
    });

    expect(getByText('a')).toBeInTheDocument();
    expect(ComponentUsingSelector).toHaveCommittedTimes(3);
  });

  it.each([
    ['primitive', 1, '1'],
    ['array', [1, 2], '[1,2]'],
    ['object', { b: 2 }, '{"b":2}'],
  ])(
    "shouldn't update the component using it when the state is the same using %s",
    (_, value, expected) => {
      const initialProps = { a: value };
      const store = storeModule;
      store.initialize(initialProps);
      const ComponentUsingSelector = withProfiler(() => {
        const a = useSelector(state => state.a);
        return <div>{JSON.stringify(a)}</div>;
      });

      const { getByText } = render(<ComponentUsingSelector />);
      expect(getByText(expected)).toBeInTheDocument();

      act(() => {
        store.setState({ path: ['a'], newValue: value });
        store.setState({ path: ['koko'], newValue: 'loko' });
      });

      expect(getByText(expected)).toBeInTheDocument();
      expect(ComponentUsingSelector).toHaveCommittedTimes(1);
    }
  );

  it('should render the component once despite of the times useSelector is called in a component', () => {
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

    const { getByText } = render(<ComponentUsingSelector />);
    expect(getByText('1koko1')).toBeInTheDocument();

    act(() => {
      store.setState({ path: ['a'], newValue: 2 });
      store.setState({ path: ['b'], newValue: 'loko' });
      store.setState({ path: ['c'], newValue: [2] });
    });

    expect(getByText('2loko2')).toBeInTheDocument();
    expect(ComponentUsingSelector).toHaveCommittedTimes(2);
  });
});
