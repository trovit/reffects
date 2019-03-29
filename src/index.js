import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import TodoList from "./todos/TodoList/TodoList";
import coeffects from "./coeffects";
import effects from "./effects";
import events from "./todos/TodoList/events";
import { dispatch } from "./lib/lib";
import { initializeStore } from "./lib/lib-store";
import Toast from "./todos/Toast/Toast";

initializeStore({
  todos: [],
  visibilityFilter: 'all',
  toastText: '',
  toastTimeoutId: null,
  isToastShown: false,
  toast: {
    text: '',
    timeoutId: null,
    visible: false,
  }
});

coeffects.register();
effects.register();
events.register();

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
