import { clearHandlers, getEffectHandler } from 'reffects';
import { destroyAllMocks } from '../../test-helpers/fixtures';
import { callsTo } from '../../test-helpers/mockHelpers';
import registerHttpEffect, { httpGet, httpPost, httpPut, httpPatch, httpDelete } from './http';

describe('http effects', () => {
  afterEach(() => {
    clearHandlers();
    destroyAllMocks();
  });

  const eventRestOfPayload = ['arg1', 'arg2'];

  describe('http.get', () => {
    const effectId = 'http.get';
    const config = { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' } };

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
        config
      });

      expect(fakeHttpClient.get).toHaveBeenCalledWith({
        url,
        successFn: expect.any(Function),
        errorFn: expect.any(Function),
        config
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
        config
      });

      expect(fakeHttpClient.get).toHaveBeenCalledWith({
        url,
        successFn: expect.any(Function),
        errorFn: expect.any(Function),
        config
      });
      expect(dispatchFake).toHaveBeenCalledTimes(1);
      expect(callsTo(dispatchFake)).toEqual([
        [{ id: errorEventId, payload: ['errorData', 'arg1', 'arg2'] }],
      ]);
    });

    test('fail when successEvent is not defined', () => {
      const responseData = 'responseData';
      const fakeHttpClient = {
        get: jest.fn().mockImplementation(({successFn}) => successFn(responseData)),
      };
      const dispatchFake = jest.fn();
      registerHttpEffect(fakeHttpClient, dispatchFake);
      const httpEffectHandler = getEffectHandler(effectId);
      const url = 'fakeUrl';

      expect(() => {
        httpEffectHandler({ url });
      }).toThrowError('Missing successEvent');
    });

    test('do nothing if request fails and errorEvent is not defined', () => {
      const errorData = 'errorData';
      const fakeHttpClient = {
        get: jest.fn().mockImplementation(({errorFn}) => errorFn(errorData)),
      };
      const dispatchFake = jest.fn();
      registerHttpEffect(fakeHttpClient, dispatchFake);
      const httpEffectHandler = getEffectHandler(effectId);
      const url = 'fakeUrl';

      httpEffectHandler({ url });

      expect(dispatchFake).not.toHaveBeenCalled();
    });

    test('default config is empty object', () => {
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
        config: {}
      });
    });

    test('should create an http.get effect using a builder', () => {
      const httpGetEffect = httpGet({
        url: 'https://github.com/trovit/reffects',
        successEvent: ['callbackEvent', 'arg1'],
        errorEvent: ['failureEvent', 'arg1'],
        config
      });

      expect(httpGetEffect).toEqual({
        'http.get': {
          url: 'https://github.com/trovit/reffects',
          successEvent: ['callbackEvent', 'arg1'],
          errorEvent: ['failureEvent', 'arg1'],
          config
        }
      });
    });

    test('should create an http.get effect using a builder with events as objects', () => {
      const httpGetEffect = httpGet({
        url: 'https://github.com/trovit/reffects',
        successEvent: { id: 'callbackEvent', payload: { arg1: 'arg1' } },
        errorEvent: { id: 'failureEvent', payload: { arg1: 'arg1' } },
        config
      });

      expect(httpGetEffect).toEqual({
        'http.get': {
          url: 'https://github.com/trovit/reffects',
          successEvent: ['callbackEvent', { arg1: 'arg1' }],
          errorEvent: ['failureEvent', { arg1: 'arg1' }],
          config
        }
      });
    });
  });

  describe('http.post', () => {
    const effectId = 'http.post';
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

    test('do nothing if request fails and errorEvent is not defined', () => {
      const errorData = 'errorData';
      const fakeHttpClient = {
        post: jest.fn().mockImplementation(({errorFn}) => errorFn(errorData)),
      };
      const dispatchFake = jest.fn();
      registerHttpEffect(fakeHttpClient, dispatchFake);
      const httpEffectHandler = getEffectHandler(effectId);
      const url = 'fakeUrl';

      httpEffectHandler({ url });

      expect(dispatchFake).not.toHaveBeenCalled();
    });

    test('should create an http.post effect using a builder', () => {
      const httpPostEffect = httpPost({
        url: 'https://github.com/trovit/reffects',
        body: {hello: 'world'},
        config: {contentType: 'application/json'},
        successEvent: ['callbackEvent', 'arg1'],
        errorEvent: ['failureEvent', 'arg1']
      });

      expect(httpPostEffect).toEqual({
        'http.post': {
          url: 'https://github.com/trovit/reffects',
          body: {hello: 'world'},
          config: {contentType: 'application/json'},
          successEvent: ['callbackEvent', 'arg1'],
          errorEvent: ['failureEvent', 'arg1'],
          alwaysEvent: []
        }
      });
    });

    test('should create an http.post effect using a builder with events as objects', () => {
      const httpPostEffect = httpPost({
        url: 'https://github.com/trovit/reffects',
        body: {hello: 'world'},
        config: {contentType: 'application/json'},
        successEvent: { id: 'callbackEvent', payload: { arg1: 'arg1' } },
        errorEvent: { id: 'failureEvent', payload: { arg1: 'arg1' } }
      });

      expect(httpPostEffect).toEqual({
        'http.post': {
          url: 'https://github.com/trovit/reffects',
          body: {hello: 'world'},
          config: {contentType: 'application/json'},
          successEvent: ['callbackEvent', { arg1: 'arg1' }],
          errorEvent: ['failureEvent', { arg1: 'arg1' }],
          alwaysEvent: []
        }
      });
    });
  });

  describe('http.put', () => {
    const effectId = 'http.put';

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

    test('do nothing if request fails and errorEvent is not defined', () => {
      const errorData = 'errorData';
      const fakeHttpClient = {
        put: jest.fn().mockImplementation(({errorFn}) => errorFn(errorData)),
      };
      const dispatchFake = jest.fn();
      registerHttpEffect(fakeHttpClient, dispatchFake);
      const httpEffectHandler = getEffectHandler(effectId);
      const url = 'fakeUrl';

      httpEffectHandler({ url });

      expect(dispatchFake).not.toHaveBeenCalled();
    });

    test('should create an http.put effect using a builder', () => {
      const httpPutEffect = httpPut({
        url: 'https://github.com/trovit/reffects',
        body: {hello: 'world'},
        successEvent: ['callbackEvent', 'arg1']
      });

      expect(httpPutEffect).toEqual({
        'http.put': {
          url: 'https://github.com/trovit/reffects',
          body: {hello: 'world'},
          successEvent: ['callbackEvent', 'arg1'],
          errorEvent: [],
        }
      });
    });

    test('should create an http.put effect using a builder  with events as objects', () => {
      const httpPutEffect = httpPut({
        url: 'https://github.com/trovit/reffects',
        body: {hello: 'world'},
        successEvent: { id: 'callbackEvent', payload: { arg1: 'arg1' } }
      });

      expect(httpPutEffect).toEqual({
        'http.put': {
          url: 'https://github.com/trovit/reffects',
          body: {hello: 'world'},
          successEvent: ['callbackEvent', { arg1: 'arg1' }],
          errorEvent: [],
        }
      });
    });
  });

  describe('http.patch', () => {
    const effectId = 'http.patch';

    test('request success', () => {
      const responseData = 'responseData';
      const fakeHttpClient = {
        patch: jest.fn().mockImplementation(function patch({ successFn }) {
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

      expect(fakeHttpClient.patch).toHaveBeenCalledWith({
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
        patch: jest.fn().mockImplementation(function patch({ errorFn }) {
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

      expect(fakeHttpClient.patch).toHaveBeenCalledWith({
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

    test('do nothing if request fails and errorEvent is not defined', () => {
      const errorData = 'errorData';
      const fakeHttpClient = {
        patch: jest.fn().mockImplementation(({errorFn}) => errorFn(errorData)),
      };
      const dispatchFake = jest.fn();
      registerHttpEffect(fakeHttpClient, dispatchFake);
      const httpEffectHandler = getEffectHandler(effectId);
      const url = 'fakeUrl';

      httpEffectHandler({ url });

      expect(dispatchFake).not.toHaveBeenCalled();
    });

    test('should create an http.patch effect using a builder', () => {
      const httpPatchEffect = httpPatch({
        url: 'https://github.com/trovit/reffects',
        body: {hello: 'world'},
        successEvent: ['callbackEvent', 'arg1']
      });

      expect(httpPatchEffect).toEqual({
        'http.patch': {
          url: 'https://github.com/trovit/reffects',
          body: {hello: 'world'},
          successEvent: ['callbackEvent', 'arg1'],
          errorEvent: [],
        }
      });
    });

    test('should create an http.patch effect using a builder with events as objects', () => {
      const httpPatchEffect = httpPatch({
        url: 'https://github.com/trovit/reffects',
        body: {hello: 'world'},
        successEvent: { id: 'callbackEvent', payload: { arg1: 'arg1' } }
      });

      expect(httpPatchEffect).toEqual({
        'http.patch': {
          url: 'https://github.com/trovit/reffects',
          body: {hello: 'world'},
          successEvent: ['callbackEvent', { arg1: 'arg1' }],
          errorEvent: [],
        }
      });
    });
  });

  describe('http.delete', () => {
    const effectId = 'http.delete';

    test('request success', () => {
      const responseData = 'responseData';
      const fakeHttpClient = {
        delete: jest.fn().mockImplementation(function deleteFn({ successFn }) {
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

      expect(fakeHttpClient.delete).toHaveBeenCalledWith({
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
        delete: jest.fn().mockImplementation(function deleteFn({ errorFn }) {
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

      expect(fakeHttpClient.delete).toHaveBeenCalledWith({
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

    test('do nothing if request fails and errorEvent is not defined', () => {
      const errorData = 'errorData';
      const fakeHttpClient = {
        delete: jest.fn().mockImplementation(({errorFn}) => errorFn(errorData)),
      };
      const dispatchFake = jest.fn();
      registerHttpEffect(fakeHttpClient, dispatchFake);
      const httpEffectHandler = getEffectHandler(effectId);
      const url = 'fakeUrl';

      httpEffectHandler({ url });

      expect(dispatchFake).not.toHaveBeenCalled();
    });

    test('should create an http.delete effect using a builder', () => {
      const httpDeleteEffect = httpDelete({
        url: 'https://github.com/trovit/reffects',
        body: {hello: 'world'},
        successEvent: ['callbackEvent', 'arg1']
      });

      expect(httpDeleteEffect).toEqual({
        'http.delete': {
          url: 'https://github.com/trovit/reffects',
          body: {hello: 'world'},
          successEvent: ['callbackEvent', 'arg1'],
          errorEvent: [],
        }
      });
    });

    test('should create an http.delete effect using a builder with events as objects', () => {
      const httpDeleteEffect = httpDelete({
        url: 'https://github.com/trovit/reffects',
        body: {hello: 'world'},
        successEvent: { id: 'callbackEvent', payload: { arg1: 'arg1' } }
      });

      expect(httpDeleteEffect).toEqual({
        'http.delete': {
          url: 'https://github.com/trovit/reffects',
          body: {hello: 'world'},
          successEvent: ['callbackEvent', { arg1: 'arg1' }],
          errorEvent: [],
        }
      });
    });
  });
});
