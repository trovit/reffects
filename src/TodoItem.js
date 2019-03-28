import React from "react";
import { dispatch } from "./lib";

export default function TodoItem({ id, text, isDone }) {
  return <article onClick={() => {
    dispatch('toggleTodo', id);
    dispatch('showToast', `"${text}" was marked as ${isDone ? 'done' : 'undone'}.`);
  }}>{isDone ? <s>{text}</s> : text}</article>;
}
