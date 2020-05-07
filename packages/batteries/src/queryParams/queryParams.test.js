import { clearHandlers, getCoeffectHandler, coeffect } from 'reffects';
import registerQueryParamsCoeffect, { queryParamsGet } from './queryParams';

afterEach(() => {
  clearHandlers();
  jest.clearAllMocks();
});

describe('queryParams.get', () => {
  test('should extract query params from url', () => {
    const selectedQueryParams = ['peanuts', 'chesnuts', 'nuts', 'hazelnuts'];
    const fakeUrlSearch =
      '?peanuts=3&chesnuts=dil%C3%ACc%C3%ADous&nuts=cashew&nuts=pistachios';
    const coeffectDescription = coeffect(
      'queryParams.get',
      selectedQueryParams
    );
    registerQueryParamsCoeffect({ location: { search: fakeUrlSearch } });
    const coeffectHandler = getCoeffectHandler(coeffectDescription.id);

    const result = coeffectHandler(coeffectDescription.data);

    expect(result).toEqual({
      queryParams: {
        peanuts: '3',
        chesnuts: 'dilìcíous',
        nuts: ['cashew', 'pistachios'],
        hazelnuts: null,
      },
    });
  });

  test('should create a queryParams.get coeffect using a builder', () => {
    const selectedQueryParams = ['peanuts', 'chesnuts', 'nuts', 'hazelnuts'];
    const queryParamsCoeffect = queryParamsGet(selectedQueryParams);

    expect(queryParamsCoeffect).toEqual(coeffect('queryParams.get', selectedQueryParams));
  });
});
