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
Here we used the third parameter of reffect [registerEventHandler](/docs/api.md#registereventhandler) function to declare the list of coeffects that the event handler of the `displayTime` event will receive when called. In this case, it includes only the `datetime` coeffect.

Notice how the value associated to the `datetime` coeffect, which is a timestamp, comes in the **coeffects object** (which is the first parameter of any event handler in reffects).

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
Here we used the third parameter of reffects [registerEventHandler](/docs/api.md#registereventhandler) function to declare the list of coeffects that the event handler of the `loadTodos` event will receive when called. In this case, it includes only the `apiUrl` coeffect.

Notice how the value associated to the `apiUrl` coeffect, which is a string, comes in the **coeffects object** (which is the first parameter of any event handler in reffects).
