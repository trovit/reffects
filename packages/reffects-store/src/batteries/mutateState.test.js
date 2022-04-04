import { when } from 'jest-when'
import { getEffectHandler } from 'reffects';
import deepFreeze from 'deep-freeze'

import registerMutateStateEffect, { mutateState, MUTATE_STATE_EFFECT_ID } from './mutateState';
import { applyEventsFixture } from '../../../../test-helpers/fixtures';

const store = {
  getState: jest.fn(),
  reset: jest.fn()
};

applyEventsFixture(() => registerMutateStateEffect(store));

describe(`${MUTATE_STATE_EFFECT_ID} effect`, () => {
  test('should use the effect function with its arguments to generate a new state and reset the state with it', () => {
    registerMutateStateEffect(store);
    const stateMutateHandler = getEffectHandler(MUTATE_STATE_EFFECT_ID);
    const state = deepFreeze({
      scalar: 'frozen scalar',
      object: {
        value: 'frozen object'
      }
    })
    when(store.getState)
      .mockReturnValue(state)
    const newState = deepFreeze({
      a: 'new state'
    })
    const fn = jest.fn(() => newState)
    const args = ['an-argument', 'another-argument']

    stateMutateHandler({ fn, args });

    expect(fn).toHaveBeenCalledWith(state, ...args);
    expect(store.reset).toHaveBeenCalledWith(newState)
  });

  test(`should create a ${MUTATE_STATE_EFFECT_ID} effect using a builder`, () => {
    const fn = () => {}
    const args = ['an-argument', 'another-argument']

    const effect = mutateState(fn, ...args);

    expect(effect).toEqual({
      [MUTATE_STATE_EFFECT_ID]: {
        fn,
        args
      }
    });
  });
});
