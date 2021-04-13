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
    successEvent,
    errorEvent = [],
    config = {},
  }) {
    httpClient.get({
      url,
      successFn: dispatchMandatoryEvent('successEvent', successEvent),
      errorFn: dispatchOptionalEvent(errorEvent),
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
      successFn: dispatchOptionalEvent(successEvent),
      errorFn: dispatchOptionalEvent(errorEvent),
      alwaysFn: dispatchOptionalEvent(alwaysEvent),
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
      successFn: dispatchOptionalEvent(successEvent),
      errorFn: dispatchOptionalEvent(errorEvent),
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
      successFn: dispatchOptionalEvent(successEvent),
      errorFn: dispatchOptionalEvent(errorEvent),
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
      successFn: dispatchOptionalEvent(successEvent),
      errorFn: dispatchOptionalEvent(errorEvent),
    });
  });

  function dispatchMandatoryEvent(name, event) {
    return (...data) => {
      if (eventIsUndefined(event)) {
        throw new Error(`Missing ${name}`);
      }
      dispatchEvent(event, data);
    };
  }

  function dispatchOptionalEvent(event) {
    return (...data) => {
      if (eventIsUndefined(event)) {
        return;
      }
      dispatchEvent(event, data);
    };
  }

  function dispatchEvent(event, data) {
    const [id, ...rest] = event;
    dispatch({id, payload: data.concat(rest)});
  }

  function eventIsUndefined(event) {
    return !event || (Array.isArray(event) && event.length === 0)
  }
}
