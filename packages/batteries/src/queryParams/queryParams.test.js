import { clearHandlers, getCoeffectHandler, coeffect } from 'reffects';
import registerQueryParamsCoeffect from './queryParams';

afterEach(() => {
  clearHandlers();
  jest.clearAllMocks();
});

describe('queryParams.get', () => {
  test('should extract query params from url', () => {
    const selectedQueryParams = ['peanuts', 'chesnuts', 'nuts', 'hazelnuts'];
    const fakeUrlSearch =
      '?peanuts=3&chesnuts=dil%C3%ACc%C3%ADous&nuts=cashew&nuts=pistachios';
    const coeffectDescription = coeffect('queryParams.get', selectedQueryParams);
    registerQueryParamsCoeffect({ location: { search: fakeUrlSearch } });
    const coeffectHandler = getCoeffectHandler(coeffectDescription.id);

    const result = coeffectHandler(coeffectDescription.data);

    expect(result).toEqual({
      [coeffectDescription.id]: {
        peanuts: '3',
        chesnuts: 'dilìcíous',
        nuts: ['cashew', 'pistachios'],
        hazelnuts: null,
      },
    });
  });
});
