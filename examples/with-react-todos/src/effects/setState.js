import { registerEffectHandler } from "reffects";

export function register(store) {
  registerEffectHandler("setState", function setStateEffect(mutations) {
    Object.entries(mutations).forEach(function ([path, newValue]) {
      store.setState({path, newValue});
    });
  });
}
