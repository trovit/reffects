import React from "react";
import { dispatch } from "../../lib/lib";

export default function TodoItem({ id, text, isDone }) {
  return <article onClick={() => {
    dispatch('toggleTodo', id);
    dispatch('showToggledTodoToast', { isDone, text });
  }}>{isDone ? <s>{text}</s> : text}</article>;
}
