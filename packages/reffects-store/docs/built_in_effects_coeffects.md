# Built-in effects & coeffects

### `state.set`
The `state.set` effect is used to mutate a value located on the `app-state` at a given path from pure event handlers.

Example:

```js
import { state } from "reffects-store";

registerEventHandler(
    "loadTodosSucceeded", 
    function loadTodosSucceeded(coeffects, [response]) {
        const todos = payload.results.map(item => ({
            id: item.id,
            text: 'Describe: ' + item.name,
            done: !!item.description
        }));
        return state.set({"todos": todos});
    }
);
```

In the example shown above, the event handler for `loadTodosSucceeded` event returns a `state.set` effect that will set the new value of a part of the application state located at the `"todos"` path. Each mutation (key-value pair) is interpreted as: 

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
    status: 400
  }
}
```

You should never use the `setState` method of the `reffects-store` inside an event handler or inside any function called from an event handler because that would make it impure and, as such, much more difficult to test.

## `state.get`
The `state.get` coeffect is used to retrieve values from the `app-state` (global state) given the paths in the state those values are located at, in a way that allows event handlers to use values from the global state while still being pure functions.

You should never use the `getState` method of the `reffects-store` inside an event handler or inside any function called from an event handler because that would make it impure and, as such, much more difficult to test.

Example:

```js
import { state } from "reffects-store";

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
    return state.set({ "todos": newTodos });
  },
  [state.get({todos: 'todos'})]);
```
In this example we used the third parameter of reffects [registerEventHandler](/docs/api.md#registereventhandler) function to declare the list of coeffects that the event handler of the `todoClicked` event will receive when called. In this case, it includes only the `state.get` coeffect. To declare it we're using the `state.get` builder. This factory function receives an object whose entries (key-value pairs) represent *extractions*. Each extraction (key-value pair) is interpreted as:

1. The key represents the **key** that the value will be associated to in the object associated to the `state` key in the coeffects object.

2. The value represents the **path** in the app state to get to the value we'd like to extract. A path is represented by a string in which each part of the path is separated by a dot, like `'todos.status'`. In this example, the piece of state being extracted would be `appState.todos.status`.

For instance, given this `app-state`:

```js
{
  todos: {
    status: 200
  }
}
```
if the extraction of the value located at the path `'todos.status'` were expressed as `{todosResponseStatus: 'todos.status'}`,
an event handler that used it with the `state.get` coeffect would receive the following coeffects object when called: `{ state: {todosResponseStatus: 200}}`.

If the extraction were expressed instead as `{koko: 'todos.status'}`, the coeffects object received by an event handler using it would be `{ state: {koko: 200}}` when called.

Notice the way the values are destructured from the object associated to the `state.get` coeffect inside the coeffects object: `{ state: { todos } }`. This is a nested destructuring but since it's only two levels deep, you'll soon get used to it with a bit of practice. 
