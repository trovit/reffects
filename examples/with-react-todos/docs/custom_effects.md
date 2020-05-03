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
