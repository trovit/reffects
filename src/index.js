import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import TodoList from "./todos/TodoList/TodoList";
import * as coeffects from "./coeffects";
import * as effects from "./effects";
import * as events from "./todos/TodoList/events";
import { dispatch } from "./lib/reffect";
import * as store from "./lib/lib-store";
import Toast from "./todos/Toast/Toast";

window.apiUrl = "https://gateway.marvel.com/v1/public/characters?ts=thesoer&apikey=001ac6c73378bbfff488a36141458af2&hash=72e5ed53d1398abb831c3ceec263f18b";

store.initialize({
  todos: [],
  visibilityFilter: 'all',
  toast: {
    text: '',
    timeoutId: null,
    visible: false,
  }
});

coeffects.register(window);
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
