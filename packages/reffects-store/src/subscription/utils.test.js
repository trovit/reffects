import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import useForceUpdate from './utils';

describe('useForceUpdate', () => {
  const forceUpdates = [];
  let renders;
  let TestComponent = () => null;

  beforeEach(() => {
    forceUpdates.splice(0, forceUpdates.length);
    renders = 0;
    TestComponent = () => {
      forceUpdates.push(useForceUpdate());
      renders += 1;
      return null;
    };
  });

  it('should accept no parameters', () => {
    render(<TestComponent />);
    expect(forceUpdates[0].length).toEqual(0);
  });

  it('should maintain the same reference', () => {
    render(<TestComponent />);
    act(() => {
      forceUpdates[0]();
    });
    expect(forceUpdates[0]).toEqual(forceUpdates[1]);
  });

  it('should return undefined', () => {
    render(<TestComponent />);
    act(() => {
      expect(forceUpdates[0]()).toBe(undefined);
    });
  });

  it('should update the component', () => {
    expect(renders).toEqual(0);
    render(<TestComponent />);
    expect(renders).toEqual(1);
    act(() => {
      forceUpdates[0]();
    });
    expect(renders).toEqual(2);
    act(() => {
      forceUpdates[1]();
    });
    expect(renders).toEqual(3);
  });
});
