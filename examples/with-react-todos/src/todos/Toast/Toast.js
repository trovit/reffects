import React from 'react';
import { subscribe } from 'reffects-store';

export function Toast({ text, shown }) {
  return shown && <div className="toast">{text}</div>;
}

function selectToastVisible(state) {
  return state.toast.visible;
}

function selectToastText(state) {
  return state.toast.text;
}

export default subscribe(Toast, function(state) {
  return {
    text: selectToastText(state),
    shown: selectToastVisible(state)
  };
});
