## `initialize`
This function initializes the state of the store.

It can receive one parameter: *an initial state* which is a JavaScript object. 
This parameter is optional and it's an empty object by default.

Example passing some initial state:
```js
const initialState = {
  todos: [],
  visibilityFilter: VISIBILITY_FILTERS_SHOW_ALL,
  toast: {
    text: '',
    timeoutId: null,
    visible: false,
  }
};

store.initialize(initialState);
```
In this case the state of the store is set to the following object:
```js
{
  todos: [],
  visibilityFilter: VISIBILITY_FILTERS_SHOW_ALL,
  toast: {
    text: '',
    timeoutId: null,
    visible: false,
  }
}
```

Example passing no initial state:
```js
store.initialize();
```
In this case the state of the store is set to the following object:
```js
{}
```

## `getState`
This function gets the value of a piece of state at a given path.

It accepts only one parameter: a *path*.
This parameter is optional and it's an empty array by default.

A path represents how to to get to the value in the app state we'd like to get. A path can be an array of strings like `['todos', 'status']` or a string in which each part of the path is separated by a dot, like `'todos.status'`. In both cases, the piece of state being extracted would be `appState.todos.status`.

```js
store.initialize({a: 1, b: {c: 3 d: {e: "h"}}});

store.getState(["a", "b", "c"]); // 3
store.getState("a.b.c"); // 3

store.getState("a.b.d"); // {e: "h"}

```

## `setState`
This function sets the value of a piece of state at a given path.

It accepts only one parameter: an array of *mutations*.

Each mutation is an object comprised of two properties: 

1. `path`: the path in the app state to get to the value we'd like to mutate. A path can be an array of strings like `['todos', 'status']` or a string in which each part of the path is separated by a dot, like `'todos.status'`. In both cases, the piece of state being mutated would be `appState.todos.status`.
If the path is empty, the function throws an exception.

2. `newValue`: the new value to be set.

Example:
```js
store.initialize({a: 1, b: {c: 3 d: {e: "h"}}});

store.getState("a.b.d"); // {e: "h"}

store.setState({path: "a.b.d", newValue: 30});

store.getState("a.b.d"); // 30
```

If a mutation is successful, all the listeners subscribed to the store are executed.
