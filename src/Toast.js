import React, { useState } from 'react';
import { subscribe } from './lib-subscribe';

function Toast({ text, shown }) {

  return shown && (
    <div style={{ position: 'fixed', bottom: 0, background: 'rebeccapurple', color: 'white' }}>{text}</div>
  )
}

function isToastShownSelector(state) {
  return state.isToastShown;
}

function toastTextSelector(state) {
  return state.toastText;
}

export default subscribe(function (state) {
  return {
    text: toastTextSelector(state),
    shown: isToastShownSelector(state),
  };
})(Toast);

