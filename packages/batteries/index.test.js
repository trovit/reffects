import {
    registerSetCookieEffect,
    registerGetCookieCoeffect,
    registerCookiesBatteries,
  
    registerGlobalCoeffect,
    registerGlobalBatteries,
  
    registerHttpBatteries,
  
    registerQueryParamsCoeffect,
    registerQueryParamsBatteries,
} from '.';

describe('batteries', () => {
    test('effects and coeffects registrars are defined', () => {
      expect(registerSetCookieEffect).toBeDefined();
      expect(registerGetCookieCoeffect).toBeDefined();
      expect(registerCookiesBatteries).toBeDefined();
      expect(registerGlobalCoeffect).toBeDefined();
      expect(registerGlobalBatteries).toBeDefined();
      expect(registerHttpBatteries).toBeDefined();
      expect(registerQueryParamsCoeffect).toBeDefined();
      expect(registerQueryParamsBatteries).toBeDefined();
    });
});
  