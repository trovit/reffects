import { registerEffectHandler, dispatch } from "./lib";
import * as store from "./lib-store";

export function registerEffects() {
  registerEffectHandler("mutate", function (mutations) {
    mutations.forEach(function (mutation) {
      store.setState(mutation);
    });
  });

  registerEffectHandler("get", function (requestDescription) {
    const [eventId, ...rest] = requestDescription.successEvent;
    fetch(requestDescription.url)
      .then(res => res.json())
      .then(response => dispatch(eventId, response.data));
  });

  registerEffectHandler("normalizeTodos", function normalizeTodos(description) {
    const {
      todos,
      successEvent: [eventId, ...rest]
    } = description;

    const normalizedData = todos.results.map(item => ({
      id: item.id,
      text: 'describe: ' + item.name,
      done: !!item.description
    }));

    dispatch(eventId, normalizedData);
  });
}
