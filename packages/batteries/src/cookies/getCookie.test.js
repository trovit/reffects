import { clearHandlers, getCoeffectHandler, coeffect } from 'reffects';
import registerGetCookieCoeffect, { cookieGet } from './getCookie';

afterEach(() => {
  clearHandlers();
  jest.clearAllMocks();
});

describe('cookie coeffect', () => {
  test('should extract keys from cookies', () => {
    const fakeKey = 'fakeCookieKey';
    const fakeValue = 'fakeCookieValue';
    const coeffectDescription = coeffect('cookie', fakeKey);
    const cookiesClient = { get: jest.fn() };
    cookiesClient.get.mockReturnValue(fakeValue);
    registerGetCookieCoeffect(cookiesClient);
    const coeffectHandler = getCoeffectHandler(coeffectDescription.id);

    expect(coeffectHandler(coeffectDescription.data)).toEqual({
      cookie: {
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
    registerGetCookieCoeffect(cookiesClient);
    const coeffectHandler = getCoeffectHandler(coeffectDescription.id);

    expect(coeffectHandler(coeffectDescription.data)).toEqual({
      cookie: {
        [fakeKey]: fakeValue,
      },
    });
  });

  test('should create a cookie coeffect using a builder', () => {
    const fakeKey = 'fakeCookieKey';
    const cookieGetCoeffect = cookieGet(fakeKey);

    expect(cookieGetCoeffect).toEqual(coeffect('cookie', fakeKey));
  });
});
