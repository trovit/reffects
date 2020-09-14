import React from 'react';
import { useSelector } from '../../effects/state';

export function Toast() {
  const text = useSelector(selectToastText);
  const shown = useSelector(selectToastVisible);

  console.log('eeeey', shown, text);

  return shown && <div className="toast">{text}</div>;
}

function selectToastVisible(state) {
  return state.toast.visible;
}

function selectToastText(state) {
  return state.toast.text;
}

export default Toast;
