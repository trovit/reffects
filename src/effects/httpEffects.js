import { registerEffectHandler } from "../lib/reffect";

export function register(httpClient, dispatch) {
  registerEffectHandler("get", function getEffect(requestDescription) {
    const [eventId, ...rest] = requestDescription.successEvent;
    httpClient.get({
      url: requestDescription.url,
      successFn: function (response) { 
        dispatch({eventId, payload: [response.data].concat(rest)});
      }
    });
  });
}
