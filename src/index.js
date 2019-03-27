import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import TodoList from "./TodoList";
import { registerCoeffects } from "./coeffects";
import { registerEffects } from "./effects";
import { registerEvents } from "./events";
import { dispatch } from "./lib";
import { initializeStore } from "./lib-store";

initializeStore({
  todos: [{ text: "blabla", id: "ñaña" }, { text: "blabla2", id: "ñaña2" }]
});

registerCoeffects();
registerEffects();
registerEvents();

function App() {
  dispatch("loadTodos");

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <TodoList />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
