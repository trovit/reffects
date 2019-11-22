import { setIn, getIn } from './utils';

describe('getIn', () => {
  it('can get values located in a deep object structure', () => {
    const expected = 3;
    const startState = { a: { b: { c: expected } } };

    const result = getIn(startState, ['a', 'b', 'c']);

    expect(result).toEqual(expected);
  });

  it('can get values located in a deep object structure with arrays in it', () => {
    const expected = 3;
    const startState = { a: [{ c: expected }] };

    const result = getIn(startState, ['a', 0, 'c']);

    expect(result).toEqual(expected);
  });

  it('should return a value even if it is false', () => {
    const expected = false;
    const startState = {
      otherData: 'imma string',
      falsyValue: expected
   };

    const result = getIn(startState, 'falsyValue', expected);

    expect(result).toEqual(expected);
  });

  it('should return default value when path is undefined', () => {
    const expected = 'moko';
    const startState = { a: { b: { c: 'nain' } } };

    const defaultResult = getIn(startState);
    const result = getIn(startState, undefined, expected);

    expect(defaultResult).toStrictEqual(null);
    expect(result).toEqual(expected);
  });
});

describe('setIn', () => {
  it('can set objects when path is empty', () => {
    const startState = { a: 1, b: 3 };

    const endState = setIn(startState, [], { a: 'a' });

    expect(endState).toEqual(startState);
  });

  it('can set (replace) primitives', () => {
    const startState = { a: 1, b: 3 };

    const endState = setIn(startState, ['a'], 'a');

    expect(endState).toEqual({
      a: 'a',
      b: 3,
    });
  });

  it('can set (replace) nested objects', () => {
    const startState = {
      a: 1,
      b: {
        ba: 2,
        bb: 3,
        bc: {
          bca: 4,
          bcb: 5,
        },
        bd: {
          bda: 6,
        },
      },
      c: 7,
    };

    const endState = setIn(startState, ['b', 'bc'], { bca: 44, bcc: 8 });

    expect(endState).toEqual({
      a: 1,
      b: {
        ba: 2,
        bb: 3,
        bc: {
          bca: 44,
          bcc: 8,
        },
        bd: {
          bda: 6,
        },
      },
      c: 7,
    });
  });

  it('can set a nested key while only changing necessary references', () => {
    const startState = {
      a: 1,
      b: {
        ba: 2,
        bb: 3,
        bc: {
          bca: 4,
          bcb: 5,
        },
        bd: {
          bda: 6,
        },
      },
      c: 7,
    };

    const endState = setIn(startState, ['b', 'bc'], [44, 8]);

    expect(endState).toEqual({
      a: 1,
      b: {
        ba: 2,
        bb: 3,
        bc: [44, 8],
        bd: {
          bda: 6,
        },
      },
      c: 7,
    });
    // Should only update references to every reference on the 'path', and no others
    expect(endState).not.toStrictEqual(startState);
    expect(endState.b).not.toStrictEqual(startState.b);
    expect(endState.b.bc).not.toStrictEqual(startState.b.bc);
    expect(endState.b.bd).toStrictEqual(startState.b.bd);
  });

  it('we can set values in when there are arrays inside the object structure', () => {
    const startState = {
      a: [{ b: 1 }, 'koko', { c: 2 }],
    };

    const endState = setIn(startState, ['a', 0, 'b'], 2);

    expect(endState).toEqual({
      a: [{ b: 2 }, 'koko', { c: 2 }],
    });
    expect(endState).not.toStrictEqual(startState);
    expect(endState.a).not.toStrictEqual(startState.a);
    expect(endState.a[0]).not.toStrictEqual(startState.a[0]);
  });
});
