import { setIn } from "./storeUtils";

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
    // Should only update references to every reference on the 'path', and no others
    expect(endState).not.toStrictEqual(startState);
    expect(endState.b).not.toStrictEqual(startState.b);
    expect(endState.b.bc).not.toStrictEqual(startState.b.bc);
    expect(endState.b.bd).toStrictEqual(startState.b.bd);
  });
});