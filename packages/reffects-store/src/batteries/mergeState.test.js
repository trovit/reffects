import { getEffectHandler } from 'reffects';
import { when } from 'jest-when';
import deepFreeze from 'deep-freeze';
import registerMergeStateEffect, {
  MERGE_STATE_EFFECT_ID,
  stateMerge,
} from './mergeState';

const store = { getState: jest.fn(), reset: jest.fn() };
registerMergeStateEffect(store);

describe('state.merge', () => {
  test('should deeply merge the state in the store with the provided partial state', () => {
    const handler = getEffectHandler(MERGE_STATE_EFFECT_ID);
    const currentState = deepFreeze({ a: { b: 1 } });
    when(store.getState).mockReturnValue(currentState);
    const aDeepPartialState = deepFreeze({ a: { c: 2 } });

    handler(aDeepPartialState);

    expect(store.reset).toHaveBeenCalledWith({ a: { b: 1, c: 2 } });
  });

  test('should replace whole array when merging a partial deep state', () => {
    const handler = getEffectHandler(MERGE_STATE_EFFECT_ID);
    const currentState = deepFreeze({
      anArrayThatWouldNotBeMutated: [1, 2, 3],
      anArrayThatWillBeMutated: ['a', 'b', 'c'],
      object: {
        aNestedArrayThatWouldNotBeMutated: [{ a: 1 }, { b: 2 }],
        aNestedArrayThatWillBeMutated: [{ a: 1 }, { b: 2 }],
      },
    });
    when(store.getState).mockReturnValue(currentState);
    const aDeepPartialState = deepFreeze({
      anArrayThatWillBeMutated: ['d', 'e', 'f'],
      object: {
        aNestedArrayThatWillBeMutated: [{ c: 3 }, { d: 4 }],
      },
    });

    handler(aDeepPartialState);

    expect(store.reset).toHaveBeenCalledWith({
      anArrayThatWouldNotBeMutated: [1, 2, 3],
      anArrayThatWillBeMutated: ['d', 'e', 'f'],
      object: {
        aNestedArrayThatWouldNotBeMutated: [{ a: 1 }, { b: 2 }],
        aNestedArrayThatWillBeMutated: [{ c: 3 }, { d: 4 }],
      },
    });
  });

  test('should preserve blobs existing in merged data structures', () => {
    const handler = getEffectHandler(MERGE_STATE_EFFECT_ID);
    const aBlob = new Blob();
    const aFile = new File([], 'name');
    const currentState = deepFreeze({
      anObject: {
        someAttribute: 'a value',
        someBlob: aBlob,
        someFile: aFile,
      },
    });
    when(store.getState).mockReturnValue(currentState);
    const aDeepPartialState = deepFreeze({
      anObject: {
        someAttribute: 'new value',
      },
    });

    handler(aDeepPartialState);

    expect(store.reset).toHaveBeenCalledWith({
      anObject: {
        someAttribute: 'new value',
        someBlob: aBlob,
        someFile: aFile,
      },
    });
  });

  test('should create a state.merge effect using a builder', () => {
    const effect = stateMerge({ a: 1 });

    expect(effect).toEqual({
      'state.merge': { a: 1 },
    });
  });
});
