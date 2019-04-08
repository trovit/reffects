## `dispatch`
This function dispatches an **event** that will be processed by the event handling machinery.

It accepts only one parameter: an **event** object. 

The **event** object has two keys `eventId` and `payload`. The value associated with  `eventId` identifies the event and the value associated with `payload` is the payload of the event which is optional and it's an empty object by default.

**Important**: The **event handler** associated to the given `eventId` will be **synchronously** executed.

Example:
```js
dispatch({eventId: 'todoClicked', payload: { id, text, isDone }});
```

## `dispatchMany`
This function dispatches several events that will be sequentially processed by the event handling machinery.

It receives **an array of events**. Each of them must have the structure described above in `dispatch`.

Example:
```js
dispatchMany([{eventId: 'todoClicked', payload: { id, text, isDone }},
              {eventId: 'descriptionsRequested', payload: { id }}]);
```

## `registerEventHandler`
This function is used to associate a given event with its handler.

It receives three parameters: 
* `eventId`: the event identifier.
* `handler`: the **event handler** which is a **pure function** that receives two parameters: the **coeffects object** and the **event payload**, and returns an **effects object**.
* `coeffects`: an array containing the descriptions of the values that will be injected into the **coeffects object* received by an event handler right before it's executed. This is an optional parameter and it's an empty array by default.

Example using no coeffects:
```js
registerEventHandler(
  "setSelectedChartsRange",
  function(coeffects, selectedChartsRange) {
    return {dispatchMany: [{eventId: "modifyComboSelection", payload: selected-charts-range},
                           {eventId: "loadChartData", payload: selected-charts-range}]};
  }
);
```

Example using some coeffects:
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
  [coeffects.injectApiUrl()]);
```

## `registerEventsDelegation`
This function delegates the handling of the array of event identifiers it receives as its first parameter
to the event handler associated with the event identifier it receives as its second parameter.

Example:
```js
registerEventsDelegation(
  ["chartClicked", "tableClicked"],
  "dataUpdateRequested");
```

In this examples the handling of `"chartClicked"` and `tableClicked` events
will be delegated to the event handler of the `dataUpdateRequested` event,
which will be the only handler that needs to be registered using `registerEventHandler`.

## `registerEffectHandler`
This function associates a given effect with its handler.

It receives two parameters: the effect identifier which has to be a string and the effect handler which has to be a function.

Example:
```js
registerEffectHandler(
  "mutate", 
  function mutateEffect(mutations) {
    mutations.forEach(function (mutation) {
      store.setState(mutation);
    });
});  
```

This example registers an effect `"mutate"` that mutates a value at a given path in the application's state.

## `registerCoeffectHandler`
This function associates a given coeffect with its handler.

It receives two parameters: the coeffect identifier which has to be a string and the coeffect handler which has to be a function.

```js
registerCoeffectHandler(
  "datetime", 
  function () {
    return { datetime: Date.now() };
});
```

This example registers a coeffect `"datetime"` that computes the current datetime
and returns and object that associates its value to the coeffects identifier, `"datetime"`.

## `getCoeffectHandler`
This function is used only in tests and gets coeffect handlers already registered in `reffects` given 
the identifier they are associated with.

Example:
```js
const datetimeCoeffectHandler = getCoeffectHandler("datetime");
```
## `getEffectHandler`
This function is used only in tests and gets effect handlers already registered in `reffects` given 
the identifier they are associated with.

Example:
```js
const mutateEffectHandler = getEffectHandler("mutate");
```

## `getEventHandler`
This function is used only in tests and gets event handlers already registered in `reffects` given 
the identifier they are associated with.

Example:
```js
const loadTodosHandler = getEventHandler("loadTodos");
```

## `getEventHandler`
This function is used only in tests fixtures and clears all the handlers of any type previously registered in `reffects`.

Example:
```js
clearHandlers();
```

## `setVerbosity`
This function sets the verbosity of reffects. 

There're two possible values true and false.

When the verbosity is set to true, `reffects` will log on the console each event that it's dispatched with its corresponding payload,
when it's set to false nothing will be logged.

Example:
```js
setVerbosity(true);
```
