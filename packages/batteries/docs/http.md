# http

The `http` battery can handle http requests. It needs a client to do the actual work for each method you want to support.

```js
import { registerHttpBatteries } from 'reffects-batteries';

registerHttpBatteries({
    get({ url, successFn, errorFn }) {},
    post({ url, body, config, successFn, errorFn, alwaysFn }) {},
    put({ url, body, successFn, errorFn }) {},
    patch({ url, body, successFn, errorFn }) {}
});
```

- `url` specifies the resource we are asking to the server.
- `body` content to be passed to the server.
- `config` configuration needed for the client, like `contentType`.
- `successFn` callback function that will be executed in case of a successful comunication.
- `errorFn` function to dispatch in case of an error.
- `alwaysFn` function that will be executed always after the communication happens, wheter if it's successful or not.


### `http.get`

The `http.get` effect does a `GET` request to the server. The builder accepts these parameters:

- A `url` string.
- A `successEvent` array. The first element of the array is the name of the event that will be dispatched on a succesfull request. The rest of the elements will be a payload that you'll receive along with the response. It can be useful for having data that you have when doing the request but that will be missing when executing the callback event.
- An `errorEvent` array, with the same format as `sucessEvent`, that will be executed on failure. 

Example:

```js
import { globals, http } from "reffects-batteries";

registerEventHandler(
    'loadTodos',
    function loadTodos({ globals }, payload) {
      return http.get({
        url: globals.apiUrl,
        successEvent: ['loadTodosSucceeded'],
        errorEvent: ['loadTodosFailed']
      });
    },
    [globals.get('apiUrl')]
);
```

### `http.post`

The `http.post` effect does a `POST` request to the server. The builder accepts these parameters:

- A `url` string.
- A `body` object.
- A `config` object. Can be useful for passing configuration to the client, like the `contentType` of the request.
- A `successEvent` array, as in `http.get`.
- An `errorEvent` array, as in `http.get`. 
- An `alwaysEvent` array, with the same format as the rest of the events, that will be executed no matter the result of the request. 

Example:

```js
import { globals, http } from "reffects-batteries";

registerEventHandler(
    'addTodo',
    function addTodo({ globals }, { todoId, name }) {
      return http.post({
        url: globals.apiUrl,
        body: { todoId, name, checked: false },
        config: { contentType: 'application/json' },
        successEvent: ['todoAdded', todoId],
        errorEvent: ['todoAddedFailed', todoId]
      });
    },
    [globals.get('apiUrl')]
);
```

### `http.put`

The `http.put` effect does a `PUT` request to the server. The builder accepts these parameters:

- A `url` string.
- A `body` object.
- A `successEvent` array, as in `http.get`.
- An `errorEvent` array, as in `http.get`. 

Example:

```js
import { globals, http } from "reffects-batteries";

registerEventHandler(
    'checkTodo',
    function checkTodo({ globals }, { todoId }) {
      return http.put({
        url: globals.apiUrl,
        body: { todoId, checked: true },
        successEvent: ['todoChecked', todoId],
        errorEvent: ['todoCheckedFailed', todoId]
      });
    },
    [globals.get('apiUrl')]
);
```

### `http.patch`

The `http.patch` effect does a `PATCH` request to the server. The builder accepts these parameters:

- A `url` string.
- A `body` object.
- A `successEvent` array, as in `http.get`.
- An `errorEvent` array, as in `http.get`. 

Example:

```js
import { globals, http } from "reffects-batteries";

registerEventHandler(
    'renameTodo',
    function renameTodo({ globals }, { todoId, name }) {
      return http.patch({
        url: globals.apiUrl,
        body: { todoId, name },
        successEvent: ['todoRenamed', todoId],
        errorEvent: ['todoRenamedFailed', todoId]
      });
    },
    [globals.get('apiUrl')]
);
```

### `http.delete`

The `http.delete` effect does a `DELETE` request to the server. The builder accepts these parameters:

- A `url` string.
- A `successEvent` array, as in `http.get`.
- An `errorEvent` array, as in `http.get`.

Example:

```js
import { globals, http } from "reffects-batteries";

registerEventHandler(
    'loadTodos',
    function loadTodos({ globals }, payload) {
      const { todoId } = payload;
      

      return http.delete({
        url: `${globals.apiUrl}/todos/${todoId}`,
        successEvent: ['loadTodosSucceeded'],
        errorEvent: ['loadTodosFailed']
      });
    },
    [globals.get('apiUrl')]
);
```