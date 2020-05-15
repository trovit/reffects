# Built-in effects in reffects

## `dispatch`
The `dispatch` effect is **used to describe that an event will be dispatched**.

It receives two parameters: an `id` and an optional `payload`. The value associated with `id` is a string that identifies the event and the value associated with `payload` is the payload of the event which is optional and it's an empty object by default.

In the following example, the event handler for the `"showAlertOnRim"` event handler returns an **effects object** containing a `dispatch` effect that describes the dispatch of a `"displayNotification"` event with a **payload** that will be the following object: `{id: alert.id, text: alert.message}`.

```js
import { effects } from 'reffects';

registerEventHandler(
  "showAlertOnRim",
  function(coeffects, alert) {
    return effects.dispatch("displayNotification", {id: alert.id, text: alert.message});
  }
);
```

In the following case the payload of the dispatched event, `fetchSvg`, is empty:

```js
import { effects } from 'reffects';

registerEventHandler(
  "fetchData",
  function(coeffects) {
    return effects.dispatch("fetchSvg");
  }
);
```

##  `"dispatchMany"`
The `"dispatchMany"` effect is **used to describe the dispatch of a sequence of events in order**.

It receives **an array of event objects**, each one with two keys: `id` and `payload`. The value associated with `id` is a string that identifies the event and the value associated with `payload` is the payload of the event which is optional and it's an empty object by default.

In the following example the event handler for the `"pageChanged"` event returns a `dispatchMany` effect that describes the dispatch of a sequence of events:
1. A `"fetchMetadata"` event with a payload of `35` 
2. A `"fetchSvg"` event with no payload.

```js
import { effects } from 'reffects';

registerEventHandler(
  "pageChanged",
  function(coeffects) {
    return effects.dispatchMany([
        { id: "fetchMetadata", payload: 35 },
        { id: "fetchSvg" }
    ]);
  }
);
```

## `dispatchLater`
The `dispatchLater` effect is **used to describe the dispatch of an event that will happen after some milliseconds**.

It has three properties: `id`, `payload` and `milliseconds`. 

The value associated with the `id` key identifies the event, the value associated with the `payload` key is the payload of the event which is optional and it's an empty object by default, and the value associated with the `milliseconds` key is the number of milliseconds the dispatch will be delayed.

In the following example the event handler for the `"removeCalendarWithDelay"` event returns a `dispatchLater` effect which describes the dispatch of the `"removeCalendar"` that will happen after 200 milliseconds.

```js
import { effects } from 'reffects';

registerEventHandler(
  "removeCalendarWithDelay",
  function(coeffects, message) {
    return effects.dispatchLater(
        {id: "removeCalendar", payload: message, milliseconds: 200}
    );
  }
);
```

The `"updateTodosSucceeded"` event handler shown below is a very interesting case because when the condition in the `if` evaluates to `true`, it returns a `dispatchLater` effect that describes the dispatch of itself after `retryTimeInMilliSeconds` milliseconds. This will produce a recursion until the condition in the `if` evaluates to `false`:

```js
import { effects } from 'reffects';

const retryTimeInMilliSeconds = 200;
registerEventHandler(
  "updateTodosSucceeded",
  function(coeffects, [response]) {
    if(response.state !== "finished") {
      return effects.dispatchLater({id: "updateTodos", milliseconds: retryTimeInMilliSeconds});
    } else {
      // do sth else with the response
    }
  }
);
```
