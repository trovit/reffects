## Custom coeffects in the todos app.

These are the custom coeffects we have created for the *todos app*:

## `datetime`

The `datetime` coeffect is used to retrieve the current timestamp so that event handlers that need it can still be pure.

You should never use functions that return the current date or time directly inside event handlers or in any function called from event handlers because that would make them impure and, as such, very difficult to test because their tests would not be repeatable.

Example:

```js
registerEventHandler(
    "displayTime",
    function displayTime(coeffect, payload) {
        const date = new Date(coeffect.datetime);
        return {
          toast: {
              text: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
              milliseconds: 200
          }  
        };
    }
    [coeffect("datetime")]
);
```
Here we used the third parameter of [reffects' registerEventHandler](https://github.com/trovit/reffects/blob/master/docs/api.md#registereventhandler) function to declare the list of coeffects that the event handler of the `displayTime` event will receive when called. In this case, it includes only the `datetime` coeffect.

Notice how the value associated to the `datetime` coeffect, which is a timestamp, comes in the **coeffects object** (which is the first parameter of any event handler in reffects).

## `state`
The `state` coeffect is used to retrieve values from the `app-state` (global state) given the paths in the state those values are located at, in a way that allows event handlers to use values from the global state while still being pure functions.

You should never use the `getState` method of the `reffects-store` inside an event handler or inside any function called from an event handler because that would make it impure and, as such, much more difficult to test.

Example:

```js
registerEventHandler(
  "todoClicked", 
  function todoClicked(coeffects, { id, text, isDone }) {
    const { state: { todos } } = coeffects;
    const newTodos = todos.map(todo => {
        if (todo.id === id) {
          return Object.assign({}, todo, { done: !todo.done });
        }
        return todo;
    });
    return {
      setState: {
        "todos": newTodos
      }
    };
  },
  [coeffect('state', {todos: 'todos'})]);
```
In this example we used the third parameter of [reffects' registerEventHandler](https://github.com/trovit/reffects/blob/master/docs/api.md#registereventhandler) function to declare the list of coeffects that the event handler of the `todoClicked` event will receive when called. In this case, it includes only the `state` coeffect. To declare it we're using the `coeffect` function which is a coeffects factory function, in `coeffect('state', {todos: 'todos'})`. This factory function receives an object whose entries (key-value pairs) represent *extractions*. Each extraction (key-value pair) is interpreted as:

1. The key represents the **key** that the value will be associated to in the object associated to the `state` key in the coeffects object.


2. The value represents the **path** in the app state to get to the value we'd like to extract. A path is represented by a string in which each part of the path is separated by a dot, like `'todos.status'`. In this example, the piece of state being extracted would be `appState.todos.status`.

For instance, given this `app-state`:

```js
{
  todos: {
    :status 200
  }
}
```
if the extraction of the value located at the path `'todos.status'` were expressed as `{todosResponseStatus: 'todos.status'},
an event handler that used it with the `state` coeffect would receive the following coeffects object when called: `{ state: {todosResponseStatus: 200}}`.

If the extraction were expressed instead as {koko: 'todos.status'}, the coeffects object received by an event handler using it would be `{ state: {koko: 200}}` when called.

Notice the way the values are destructured from the object associated to the `state` coeffect inside the coeffects object: `{ state: { todos } }`. This is a nested destructuring but since it's only two levels deep, you'll soon get used to it with a bit of practice. 

## `apiUrl`

The `apiUrl` coeffect is used to retrieve the url of the end point of the Marvel API that we are using to get the tasks in the *todos app*. This url is stored in a global variable, so it can't be used directly from an event handler because that would make the event handler impure. Using this coeffect allows to inject the value of the `apiUrl` into pure event handlers through its coeffects object.

You should never use global variables inside an event handler or inside any function called from an event handler because that would make them impure and, as such, more difficult to test.

Example:

```js
registerEventHandler(
    "loadTodos", 
    function loadTodos(coeffects, payload) {
        return {
          get: {
            url: coeffects.apiUrl,
            successEvent: ["loadTodosSucceeded"]
          }
        };
    },
    [coeffect("apiUrl")]
);
```
Here we used the third parameter of [reffects' registerEventHandler](https://github.com/trovit/reffects/blob/master/docs/api.md#registereventhandler) function to declare the list of coeffects that the event handler of the `loadTodos` event will receive when called. In this case, it includes only the `apiUrl` coeffect.

Notice how the value associated to the `apiUrl` coeffect, which is a string, comes in the **coeffects object** (which is the first parameter of any event handler in reffects).
