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
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <TodoList />
      <Toast />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
