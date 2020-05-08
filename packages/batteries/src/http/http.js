import { registerEffectHandler, dispatch as reffectsDispatch } from 'reffects';

export function httpGet({ url, successEvent, errorEvent = []}) {
  return {
    'http.get': {
      url, successEvent, errorEvent
    }
  };
}

export function httpPost({ url, body, config = {}, successEvent = [], errorEvent = [], alwaysEvent = [] }) {
  return {
    'http.post': {
      url, body, config, successEvent, errorEvent, alwaysEvent
    }
  };
}

export function httpPut({ url, body, successEvent = [], errorEvent = [] }) {
  return {
    'http.put': {
      url, body, successEvent, errorEvent
    }
  };
}

export function httpPatch({ url, body, successEvent = [], errorEvent = [] }) {
  return {
    'http.patch': {
      url, body, successEvent, errorEvent
    }
  };
}

export default function registerHttpEffect(
  httpClient,
  dispatch = reffectsDispatch
) {
  registerEffectHandler('http.get', function getEffect({
    url,
    successEvent = [],
    errorEvent = [],
  }) {
    httpClient.get({
      url,
      successFn(response) {
        dispatchEvent(successEvent, response);
      },
      errorFn(error) {
        dispatchEvent(errorEvent, error);
      },
    });
  });

  registerEffectHandler('http.post', function postEffect({
    url,
    body,
    config = {},
    successEvent,
    errorEvent,
    alwaysEvent,
  }) {
    httpClient.post({
      url,
      body,
      config,
      successFn(response) {
        dispatchEvent(successEvent, response);
      },
      errorFn(error) {
        dispatchEvent(errorEvent, error);
      },
      alwaysFn() {
        dispatchEvent(alwaysEvent);
      },
    });
  });

  registerEffectHandler('http.put', function putEffect({
    url,
    body,
    successEvent = [],
    errorEvent = [],
  }) {
    httpClient.put({
      url,
      body,
      successFn(response) {
        dispatchEvent(successEvent, response);
      },
      errorFn(error) {
        dispatchEvent(errorEvent, error);
      },
    });
  });

  registerEffectHandler('http.patch', function patchEffect({
    url,
    body,
    successEvent = [],
    errorEvent = [],
  }) {
    httpClient.patch({
      url,
      body,
      successFn(response) {
        dispatchEvent(successEvent, response);
      },
      errorFn(error) {
        dispatchEvent(errorEvent, error);
      },
    });
  });

  function dispatchEvent(event, ...data) {
    if (!event) {
      return;
    }
    const [id, ...rest] = event;
    dispatch({ id, payload: data.concat(rest) });
  }
}
