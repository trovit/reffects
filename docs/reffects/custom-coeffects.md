# Registering custom coeffect handlers in reffects

You can register custom **coeffect handlers** using the [`registerCoeffectHandler`](https://github.com/mariosanchez/spike-todo-declarative-effects/blob/master/docs/reffects/api.md#registercoeffecthandler) function.

The `registerCoeffectHandler` receives two parameters:
1. The coeffect identifier which has to be a string.
2. The coeffect handler which has to be a function.

A **coeffect handler** is a function that extracts a value from a **coeffect** 
and associates it to the coeffect identifier. It receives any parameters that it needs to extract the value tracked by the **coeffect**.

Below there's an example that is registering a **coeffect handler** that gets data from the local store:

```js
registerCoeffectHandler(
  "localStore", 
  function(localStoreKey) {
    return {
      localStore: localStorage.getItem(localStoreKey)
    };
  }
);
```

This coeffect handler receives the key where the data is located in the local storage.


This other example is registering a **coeffect handler** that gets the current datetime:

```js
registerCoeffectHandler(
  "datetime", 
  function() {
    return { 
      datetime: Date.now() 
    };
  }
);
```

This coeffect handler receives no data.

Because of how `reffects` is designed, coeffect handlers must be **synchronous operations**. If you need to get data using an **asynchronous operation** you must use a custom **effect** instead.
