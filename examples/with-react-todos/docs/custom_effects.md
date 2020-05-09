# Custom effects in todos app.

These are the custom effects we have created for the *todos app*:

## toast

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
