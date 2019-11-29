import { clearHandlers, getCoeffectHandler, coeffect } from 'reffects';
import * as cookieCoeffect from './cookies';

afterEach(() => {
  clearHandlers();
  jest.clearAllMocks();
});

describe('cookies', () => {
  test('should extract keys from cookies', () => {
    const fakeKey = 'fakeCookieKey';
    const fakeValue = 'fakeCookieValue';
    const coeffectDescription = coeffect('cookie', fakeKey);
    const cookiesClient = { get: jest.fn() };
    cookiesClient.get.mockReturnValue(fakeValue);
    cookieCoeffect.register(cookiesClient);
    const coeffectHandler = getCoeffectHandler(coeffectDescription.id);

    expect(coeffectHandler(coeffectDescription.data)).toEqual({
      [coeffectDescription.id]: {
        [fakeKey]: fakeValue,
      },
    });
  });

  test("should return undefined when a key doesn't exists", () => {
    const fakeKey = 'fakeCookieKey';
    const fakeValue = undefined;
    const coeffectDescription = coeffect('cookie', fakeKey);
    const cookiesClient = { get: jest.fn() };
    cookiesClient.get.mockReturnValue(fakeValue);
    cookieCoeffect.register(cookiesClient);
    const coeffectHandler = getCoeffectHandler(coeffectDescription.id);

    expect(coeffectHandler(coeffectDescription.data)).toEqual({
      [coeffectDescription.id]: {
        [fakeKey]: fakeValue,
      },
    });
  });
});
