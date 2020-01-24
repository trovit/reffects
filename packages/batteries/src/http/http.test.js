import { clearHandlers, getEffectHandler } from 'reffects';
import { destroyAllMocks } from '../../test-helpers/fixtures';
import { callsTo } from '../../test-helpers/mockHelpers';
import registerHttpEffect from './http';

describe('http effects', () => {
  afterEach(() => {
    clearHandlers();
    destroyAllMocks();
  });

  const eventRestOfPayload = ['arg1', 'arg2'];

  describe('httpGet', () => {
    const effectId = 'httpGet';

    test('request success', () => {
      const responseData = 'responseData';
      const fakeHttpClient = {
        get: jest.fn().mockImplementation(function get({ successFn }) {
          return successFn(responseData);
        }),
      };
      const dispatchFake = jest.fn();
      registerHttpEffect(fakeHttpClient, dispatchFake);
      const httpEffectHandler = getEffectHandler(effectId);
      const url = 'fakeUrl';
      const successEventId = 'successEventId';

      httpEffectHandler({
        url,
        successEvent: [
          successEventId,
          eventRestOfPayload[0],
          eventRestOfPayload[1],
        ],
      });

      expect(fakeHttpClient.get).toHaveBeenCalledWith({
        url,
        successFn: expect.any(Function),
        errorFn: expect.any(Function),
      });
      expect(dispatchFake).toHaveBeenCalledTimes(1);
      expect(callsTo(dispatchFake)).toEqual([
        [{ id: successEventId, payload: ['responseData', 'arg1', 'arg2'] }],
      ]);
    });

    test('request error', () => {
      const errorData = 'errorData';
      const fakeHttpClient = {
        get: jest.fn().mockImplementation(function get({ errorFn }) {
          return errorFn(errorData);
        }),
      };
      const dispatchFake = jest.fn();
      registerHttpEffect(fakeHttpClient, dispatchFake);
      const httpEffectHandler = getEffectHandler(effectId);
      const url = 'fakeUrl';
      const errorEventId = 'errorEventId';

      httpEffectHandler({
        url,
        errorEvent: [
          errorEventId,
          eventRestOfPayload[0],
          eventRestOfPayload[1],
        ],
      });

      expect(fakeHttpClient.get).toHaveBeenCalledWith({
        url,
        successFn: expect.any(Function),
        errorFn: expect.any(Function),
      });
      expect(dispatchFake).toHaveBeenCalledTimes(1);
      expect(callsTo(dispatchFake)).toEqual([
        [{ id: errorEventId, payload: ['errorData', 'arg1', 'arg2'] }],
      ]);
    });
  });

  describe('httpPost', () => {
    const effectId = 'httpPost';
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    test('request success', () => {
      const responseData = 'responseData';
      const fakeHttpClient = {
        post: jest.fn().mockImplementation(function post({ successFn }) {
          return successFn(responseData);
        }),
      };
      const dispatchFake = jest.fn();
      registerHttpEffect(fakeHttpClient, dispatchFake);
      const httpEffectHandler = getEffectHandler(effectId);
      const successEventId = 'successEventId';
      const body = {
        param: 'peanut',
      };
      const url = 'fakeUrl';

      httpEffectHandler({
        url,
        body,
        config,
        successEvent: [
          successEventId,
          eventRestOfPayload[0],
          eventRestOfPayload[1],
        ],
      });

      expect(fakeHttpClient.post).toHaveBeenCalledWith({
        url,
        body,
        config,
        successFn: expect.any(Function),
        errorFn: expect.any(Function),
        alwaysFn: expect.any(Function),
      });
      expect(dispatchFake).toHaveBeenCalledTimes(1);
      expect(callsTo(dispatchFake)).toEqual([
        [{ id: successEventId, payload: ['responseData', 'arg1', 'arg2'] }],
      ]);
    });

    test('request error', () => {
      const errorData = 'errorData';
      const fakeHttpClient = {
        post: jest.fn().mockImplementation(function post({ errorFn }) {
          return errorFn(errorData);
        }),
      };
      const dispatchFake = jest.fn();
      registerHttpEffect(fakeHttpClient, dispatchFake);
      const httpEffectHandler = getEffectHandler(effectId);
      const errorEventId = 'errorEventId';
      const body = {
        param: 'peanut',
      };
      const url = 'fakeUrl';

      httpEffectHandler({
        url,
        body,
        config,
        errorEvent: [
          errorEventId,
          eventRestOfPayload[0],
          eventRestOfPayload[1],
        ],
      });

      expect(fakeHttpClient.post).toHaveBeenCalledWith({
        url,
        body,
        config,
        successFn: expect.any(Function),
        errorFn: expect.any(Function),
        alwaysFn: expect.any(Function),
      });
      expect(dispatchFake).toHaveBeenCalledTimes(1);
      expect(callsTo(dispatchFake)).toEqual([
        [{ id: errorEventId, payload: ['errorData', 'arg1', 'arg2'] }],
      ]);
    });
    test('request always action', () => {
      const fakeHttpClient = {
        post: jest.fn().mockImplementation(function post({ alwaysFn }) {
          return alwaysFn();
        }),
      };
      const dispatchFake = jest.fn();
      registerHttpEffect(fakeHttpClient, dispatchFake);
      const httpEffectHandler = getEffectHandler(effectId);
      const alwaysEventId = 'alwaysEventId';
      const body = {
        param: 'peanut',
      };
      const url = 'fakeUrl';

      httpEffectHandler({
        url,
        body,
        config,
        alwaysEvent: [
          alwaysEventId,
          eventRestOfPayload[0],
          eventRestOfPayload[1],
        ],
      });

      expect(fakeHttpClient.post).toHaveBeenCalledWith({
        url,
        body,
        config,
        successFn: expect.any(Function),
        errorFn: expect.any(Function),
        alwaysFn: expect.any(Function),
      });
      expect(dispatchFake).toHaveBeenCalledTimes(1);
      expect(callsTo(dispatchFake)).toEqual([
        [{ id: alwaysEventId, payload: ['arg1', 'arg2'] }],
      ]);
    });
  });

  describe('httpPut', () => {
    const effectId = 'httpPut';

    test('request success', () => {
      const responseData = 'responseData';
      const fakeHttpClient = {
        put: jest.fn().mockImplementation(function put({ successFn }) {
          return successFn(responseData);
        }),
      };
      const dispatchFake = jest.fn();
      registerHttpEffect(fakeHttpClient, dispatchFake);
      const httpEffectHandler = getEffectHandler(effectId);
      const successEventId = 'successEventId';
      const body = {
        param: 'peanut',
      };
      const url = 'fakeUrl';

      httpEffectHandler({
        url,
        body,
        successEvent: [
          successEventId,
          eventRestOfPayload[0],
          eventRestOfPayload[1],
        ],
      });

      expect(fakeHttpClient.put).toHaveBeenCalledWith({
        url,
        body,
        successFn: expect.any(Function),
        errorFn: expect.any(Function),
      });
      expect(dispatchFake).toHaveBeenCalledTimes(1);
      expect(callsTo(dispatchFake)).toEqual([
        [{ id: successEventId, payload: ['responseData', 'arg1', 'arg2'] }],
      ]);
    });

    test('request error', () => {
      const errorData = 'errorData';
      const fakeHttpClient = {
        put: jest.fn().mockImplementation(function put({ errorFn }) {
          return errorFn(errorData);
        }),
      };
      const dispatchFake = jest.fn();
      registerHttpEffect(fakeHttpClient, dispatchFake);
      const httpEffectHandler = getEffectHandler(effectId);
      const errorEventId = 'errorEventId';
      const body = {
        param: 'peanut',
      };
      const url = 'fakeUrl';

      httpEffectHandler({
        url,
        body,
        errorEvent: [
          errorEventId,
          eventRestOfPayload[0],
          eventRestOfPayload[1],
        ],
      });

      expect(fakeHttpClient.put).toHaveBeenCalledWith({
        url,
        body,
        successFn: expect.any(Function),
        errorFn: expect.any(Function),
      });
      expect(dispatchFake).toHaveBeenCalledTimes(1);
      expect(callsTo(dispatchFake)).toEqual([
        [{ id: errorEventId, payload: ['errorData', 'arg1', 'arg2'] }],
      ]);
    });
  });
});
