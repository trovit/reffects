import { registerEffectHandler } from "reffects";

export function register(httpClient, dispatch) {
  registerEffectHandler(
    "get", 
    function getEffect(requestDescription) {
      const [id, ...rest] = requestDescription.successEvent;
      httpClient.get({
        url: requestDescription.url,
        successFn: function (response) {
          dispatch({ id, payload: [response.data].concat(rest) });
        }
      });
    }
  );
}
