# Built-in effects in reffects

## `"dispatch"`
The `"dispatch"` effect is **used to describe that an event will be dispatched**.

The data associated to a `"dispatch"` effect is an **event object**.

The **event** object has two keys: `eventId` and `payload`. The value associated with  `eventId` identifies the event and the value associated with `payload` is the payload of the event which is optional and it's an empty object by default.

In the following example, the event handler for the `"showAlertOnRim"` event handler returns an **effects object** containing a `"dispatch"` effect that describes the dispatch of a `"displayNotification"` event with a **payload** that will be the following object: `{id: alert.id, text: alert.message}`.

```js
registerEventHandler(
  "showAlertOnRim",
  function(coeffects, alert) {
    return {
      dispatch: {eventId: "displayNotification", payload: {id: alert.id, text: alert.message}}
    };
  }
);
```

In the following case the payload of the dispatched event, `::svg.fetch`, is empty:

```js
registerEventHandler(
  "fetchData",
  function(coeffects) {
    return {
      dispatch: {eventId: "fetchSvg"}}
    };
  }
);
```

##  `"dispatchMany"`
The `"dispatchMany"` effect is **used to describe the dispatch of a sequence of events in order**.

The data associated to a `"dispatchLater"` effect is **an array of event objects**.

Each **event** object has two keys: `eventId` and `payload`. The value associated with  `eventId` identifies the event and the value associated with `payload` is the payload of the event which is optional and it's an empty object by default.

In the following example the event handler for the `"pageChanged"` event returns an **effects object** that includes a 
`"dispatchMany"` effect  that describes the dispatch of a sequence of events:
1. A `"fetchMetadata"` event with a payload of `35` 
2. A `"fetchSvg"` event with no payload.

```js
registerEventHandler(
  "pageChanged",
  function(coeffects) {
    return {
      dispatchMany: [{eventId: "fetchMetadata", payload: 35}, {eventId: "fetchSvg"}]
    };
  }
);
```

## `"dispatchLater"`
The `"dispatchLater"` effect is **used to describe the dispatch of an event that will happen after some milliseconds**.

The data associated to a `"dispatchLater"` effect is a **delayed event object**.

A delayed event object has three keys: `eventId`, `payload` and `milliseconds`. 

The value associated with  the `eventId` key identifies the event, the value associated with the `payload` key is the payload of the event which is optional and it's an empty object by default, and the value associated with the `milliseconds` key is the number of milliseconds the dispatch will be delayed.

In the following example the event handler for the `"removeCalendarWithDelay"` event returns an **effects object** that includes a `"dispatchLater"` effect which describes the dispatch of the `"removeCalendar"` that will happen after 200 milliseconds.

```js
registerEventHandler(
  "removeCalendarWithDelay",
  function(coeffects, message) {
    return {
      dispatchLater: {eventId: "removeCalendar", payload: message, milliseconds: 200}
    };
  }
);
```

The `"updateTodosSucceeded"` event handler shown below is a very interesting case because when the condition in the `if` evaluates to `true`, it returns an **effects object** with a `"dispatchLater"` effect that describes the dispatch of itself after `retryTimeInMilliSeconds` milliseconds. This will produce a recursion until the condition in the `if` evaluates to `false`:

```js
const retryTimeInMilliSeconds = 200;
registerEventHandler(
  "updateTodosSucceeded",
  function(coeffects, [response]) {
    if(response.state !== "finished") {
      return {
        dispatchLater: {eventId: "updateTodos", milliseconds: retryTimeInMilliSeconds}
      };
    } else {
      // do sth else with the response
    }
  }
);
```
