import registerQueryParamsBatteries, {
  registerQueryParamsCoeffect,
} from './index';
import * as reffects from 'reffects';
import * as coeffect from './queryParams';

describe('query params battery', () => {
  test('effects and coeffects registrars can be used separatedly', () => {
    expect(registerQueryParamsCoeffect).toBeDefined();
  });

  test('effects and coeffects are registered at once when calling registerQueryParamsBatteries', () => {
    const globalOject = {};
    const registerQueryParamsCoeffectFn = jest.spyOn(coeffect, 'default');
    const registerEffectHandlerFn = jest.spyOn(reffects, 'registerEffectHandler');
    const registerCoeffectHandlerFn = jest.spyOn(reffects, 'registerCoeffectHandler');

    registerQueryParamsBatteries(globalOject);

    expect(registerEffectHandlerFn).toHaveBeenCalledTimes(0);
    expect(registerCoeffectHandlerFn).toHaveBeenCalledTimes(1);
    expect(registerQueryParamsCoeffectFn).toHaveBeenCalledWith(globalOject);
  });
});
