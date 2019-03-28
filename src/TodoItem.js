import React from "react";
import { dispatch } from "./lib";

export default function TodoItem({ id, text, isDone }) {
  return <article onClick={() => {
    dispatch('toggleTodo', id);
    dispatch('toggleToast', `"${text}" was marked as ${isDone ? 'done' : 'undone'}.`);
  }}>{isDone ? <s>{text}</s> : text}</article>;
}
