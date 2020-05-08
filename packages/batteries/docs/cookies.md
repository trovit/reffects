# Cookies

To use this battery, you'll need to provide a cookie client with the following API:

```js
registerCookiesBatteries({
    /*
    * Retrieves a cookie given a its name
    */
    get(key) {},

    /*
    * Save a cookie, which has a format {key: 'foo', value: 'bar'}
    */
    set(cookie) {}
});
```

### `cookies.set`

The `cookies.set` effect stores a given cookie, defined by its name and its value.

Example:

```js
import { cookies } from "reffects-batteries";

registerEventHandler(
    "userAcceptedCookiesPolicy",
    function userAcceptedCookiesPolicy(coeffects, payload) {
        return cookies.set({"cookiesPolicy": "accepted"});
    }
);
```


### `cookies.get`

`cookies.get` retrieves a cookie given its name when declaring the coeffect.

Example:

```js
import { cookies } from "reffects-batteries";

registerEventHandler(
    "webLoaded",
    function webLoaded(coeffects, { cookie: { cookiesPolicy } }) {
        // do something
    },
    [cookies.get('cookiesPolicy')]
);
```
