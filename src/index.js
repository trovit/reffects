import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import TodoList from "./todos/TodoList/TodoList";
import { dispatch } from "./lib/reffect";
import Toast from "./todos/Toast/Toast";
import * as boostrap from "./bootstrap";

boostrap.startApp();

function App() {
  dispatch("loadTodos");

  return (
    <div className="App">
      <h1>TODOS</h1>
      <TodoList />
      <Toast />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
