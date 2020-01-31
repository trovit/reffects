import { clearHandlers, getCoeffectHandler, coeffect } from 'reffects';
import registeGlobalCoeffect from './global';

afterEach(() => {
  clearHandlers();
  jest.clearAllMocks();
});

describe('global.get', () => {
  test('should extract global variable', () => {
    const fakeVariable = 'fakeVariable';
    const fakeValue = 'fakeValue';
    const coeffectDescription = coeffect('global.get', fakeVariable);
    registeGlobalCoeffect({ [fakeVariable]: fakeValue });
    const coeffectHandler = getCoeffectHandler(coeffectDescription.id);

    const result = coeffectHandler(coeffectDescription.data);

    expect(result).toEqual({
      global: {
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
    const coeffectDescription = coeffect('global.get', fakeVariablePath);
    registeGlobalCoeffect(global);
    const coeffectHandler = getCoeffectHandler(coeffectDescription.id);

    const result = coeffectHandler(coeffectDescription.data);

    expect(result).toEqual({
      global: { [fakeVariablePath]: fakeValue },
    });
  });
});
