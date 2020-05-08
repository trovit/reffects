# Global

This battery by default uses the `window` object to look for variables. You can pass a different object when registering the battery:

```js
registerGlobalBatteries({
    apiUrl: 'https://github.com',
    user: {
        name: 'barbara',
        email: 'barbara@github.com'
    }
});
```

### `globals.get`

The `globals.get` coeffect reads a variable from the global object defined when registering the battery.

Example:

```js
import { globals, http } from 'reffects-batteries';

registerEventHandler(
    'loadTodos',
    function loadTodos({ globals }, payload) {
      return http.get({
        url: globals.apiUrl,
        successEvent: ['loadTodosSucceeded'],
      });
    },
    [globals.get('apiUrl')]
);
```

In this case, we are asking for the `apiUrl` value, but we could look for a more complex value, by specifying its path:

```js
import { globals, state } from 'reffects-batteries';

registerEventHandler(
    'loadUsername',
    function loadUsername({ globals }, payload) {
      return state.set({
        username: globals['user.name'],
      });
    },
    [globals.get('user.name')]
);
```
