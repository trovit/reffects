import { registerEffectHandler, dispatch } from "../lib/lib";

export function register(store) {
  registerEffectHandler("mutate", function mutateEffect(mutations) {
    mutations.forEach(function (mutation) {
      store.setState(mutation);
    });
  });  
}
