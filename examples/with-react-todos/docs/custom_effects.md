## Custom effects in todos app.

These are the custom effects we have created for the *todos app*:

## `get`
The `get` effect is used in pure event handlers to make `GET` requests to given endpoints. 

The value associated to the `get` effect id in the effects object is an object that configures how the effect will be processed. 

Example:
```js
registerEventHandler(
    "loadTodos",
    function(coeffects, payload) {
        return {
            get: {
                url: coeffects.serverUri + "/todos",
                successEvent: ["loadTodosSucceeded"]
            }
        };
    }
);
```
In the example above, we use the `get` effect inside the event handler for the `loadTodos` event in order to retrieve data from an endpoint. For the *TODO app* example we have implemented only two common configuration options: 

a. `url`: the url used to make the `GET` request.

b. `successEvent`: The event that will be dispatched when the request finishes successfully. Its payload will be the response data.

### `setState`
The `setState` effect is used to mutate a value located on the `app-state` at a given path from pure event handlers.

Example:

```js
registerEventHandler(
    "loadTodosSucceeded", 
    function loadTodosSucceeded(coeffects, [response]) {
        const todos = payload.results.map(item => ({
                        id: item.id,
                        text: 'Describe: ' + item.name,
                        done: !!item.description
                      }));;
        return {
            setState: {"todos": todos}
        };
    }
);
```

In the example shown above, the event handler for `loadTodosSucceeded` event returns an effects object containing a `setState` effect that will set the new value of a part of the application state located at the `"todos"` path. 

Notice that the data associated to the `setState` effect in the effects object is an object whose entries (key-value pairs) are mutations. Each mutation (key-value pair) is interpreted as: 

1. The key represents the **path** in the app state to get to the value we'd like to mutate. A path is represented by a string in which each part of the path is separated by a dot, like `'todos.status'`. In this example, the piece of state being mutated would be `appState.todos.status`.

2. The value represents the **new value** to be set.

For instance, given this `app-state`:

```js
{
  todos: {
    :status 200
  }
}
```

if the mutation of the value located at the path `'todos.status'` were expressed as `{'todos.status': 400}, the resulting `app-state` after applying that mutation would be:

```js
{
  todos: {
    :status 400
  }
}
```

You should never use the `setState` method of the `reffects-store` inside an event handler or inside any function called from an event handler because that would make it impure and, as such, much more difficult to test.

### toast

The `toast` effect is used to display a toast.

Example:

```js
registerEventHandler(
    "displayError", 
    function displayError(coeffects, { message }) {
        return {
            toast: {
                text: message,
                milliseconds: 3000
            }
        };
  }
}
```
In the previous example, the event handler for `displayError` event returns an effects object containing a `toast` effect that will show a message during 3000 milliseconds. 

The value associated to the `toast` effect in the effects object is an object comprised of two properties:

1. `text`: the text that will be displayed by the toast.

2. `milliseconds`: the time in milliseconds that the toast will be visible.
