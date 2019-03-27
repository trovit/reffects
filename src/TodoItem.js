import React from "react";

export default function TodoItem({ text, isDone }) {
  return <article>{isDone ? <s>{text}</s> : text}</article>;
}
