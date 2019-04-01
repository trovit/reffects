import { createElement, Component } from "react";
import * as store from "./store";

export function subscribe(mapStateToProps) {
  return Child => {
    function Wrapper(props) {
      Component.call(this, props);
      let state = mapStateToProps(store.getState(), props);
      let update = () => {
        let mapped = mapStateToProps(store.getState(), props);
        for (let i in mapped)
          if (mapped[i] !== state[i]) {
            state = mapped;
            return this.forceUpdate();
          }
        for (let i in state)
          if (!(i in mapped)) {
            state = mapped;
            return this.forceUpdate();
          }
      };
      this.componentWillReceiveProps = p => {
        props = p;
        update();
      };
      this.componentDidMount = () => {
        store.subscribe(update);
      };
      this.componentWillUnmount = () => {
        store.unsubscribe(update);
      };
      this.render = () =>
        createElement(Child, Object.assign({}, this.props, state));
    }

    return ((Wrapper.prototype = Object.create(
      Component.prototype
    )).constructor = Wrapper);
  };
}
