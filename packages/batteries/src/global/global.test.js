import { clearHandlers, getCoeffectHandler, coeffect } from 'reffects';
import registeGlobalCoeffect, { globalsGet } from './global';

afterEach(() => {
  clearHandlers();
  jest.clearAllMocks();
});

describe('globals', () => {
  test('should extract global variable', () => {
    const fakeVariable = 'fakeVariable';
    const fakeValue = 'fakeValue';
    const coeffectDescription = coeffect('globals', fakeVariable);
    registeGlobalCoeffect({ [fakeVariable]: fakeValue });
    const coeffectHandler = getCoeffectHandler(coeffectDescription.id);

    const result = coeffectHandler(coeffectDescription.data);

    expect(result).toEqual({
      globals: {
        [fakeVariable]: fakeValue,
      },
    });
  });

  test('should extract a nested global variable by path', () => {
    const fakeVariablePath = 'fake.path';
    const fakeValue = 'fakeValue';
    const global = {
      fake: { path: fakeValue },
    };
    const coeffectDescription = coeffect('globals', fakeVariablePath);
    registeGlobalCoeffect(global);
    const coeffectHandler = getCoeffectHandler(coeffectDescription.id);

    const result = coeffectHandler(coeffectDescription.data);

    expect(result).toEqual({
      globals: { [fakeVariablePath]: fakeValue },
    });
  });

  test('should create a globals coeffect using a builder', () => {
    const fakeVariablePath = 'fake.path';
    const globalsGetCoeffect = globalsGet(fakeVariablePath);

    expect(globalsGetCoeffect).toEqual(coeffect('globals', fakeVariablePath));
  });
});
