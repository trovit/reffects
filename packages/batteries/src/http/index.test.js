import registerQueryParamsBatteries from './index';
import * as reffects from 'reffects';
import * as registerBatteries from './http';

describe('http battery', () => {
  test('effects and coeffects are registered at once when calling registerQueryParamsBatteries', () => {
    const httpClient = jest.fn();
    const registerBatteriesFn = jest.spyOn(registerBatteries, 'default');
    const registerEffectHandlerFn = jest.spyOn(
      reffects,
      'registerEffectHandler'
    );
    const registerCoeffectHandlerFn = jest.spyOn(
      reffects,
      'registerCoeffectHandler'
    );

    registerQueryParamsBatteries(httpClient);

    expect(registerEffectHandlerFn).toHaveBeenCalledTimes(5);
    expect(registerCoeffectHandlerFn).toHaveBeenCalledTimes(0);
    expect(registerBatteriesFn).toHaveBeenCalledWith(httpClient);
  });
});
