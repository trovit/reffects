import { registerEffectHandler, dispatch as reffectsDispatch } from 'reffects';

function adaptEvent(event) {
  if (Array.isArray(event)) {
    return event;
  }
  if (typeof event === 'string') {
    return [event];
  }
  if (event.payload) {
    return [event.id, event.payload];
  }
  return [event.id];
}

export function httpGet({ url, successEvent, errorEvent = [], config}) {
  return {
    'http.get': {
      url,
      successEvent: adaptEvent(successEvent),
      errorEvent: adaptEvent(errorEvent),
      config,
    }
  };
}

export function httpPost({ url, body, config = {}, successEvent = [], errorEvent = [], alwaysEvent = [] }) {
  return {
    'http.post': {
      url,
      body,
      config,
      successEvent: adaptEvent(successEvent),
      errorEvent: adaptEvent(errorEvent),
      alwaysEvent: adaptEvent(alwaysEvent),
    }
  };
}

export function httpPut({ url, body, successEvent = [], errorEvent = [] }) {
  return {
    'http.put': {
      url,
      body,
      successEvent: adaptEvent(successEvent),
      errorEvent: adaptEvent(errorEvent),
    }
  };
}

export function httpPatch({ url, body, successEvent = [], errorEvent = [] }) {
  return {
    'http.patch': {
      url,
      body,
      successEvent: adaptEvent(successEvent),
      errorEvent: adaptEvent(errorEvent),
    }
  };
}

export function httpDelete({ url, body, successEvent = [], errorEvent = [] }) {
  return {
    'http.delete': {
      url,
      body,
      successEvent: adaptEvent(successEvent),
      errorEvent: adaptEvent(errorEvent),
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
    config = {},
  }) {
    httpClient.get({
      url,
      successFn(response) {
        dispatchEvent(successEvent, response);
      },
      errorFn(error) {
        dispatchEvent(errorEvent, error);
      },
      config
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

  registerEffectHandler('http.delete', function patchEffect({
    url,
    body,
    successEvent = [],
    errorEvent = [],
  }) {
    httpClient.delete({
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
