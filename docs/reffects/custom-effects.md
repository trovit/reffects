# Registering custom effect handlers in reffects

You can register custom **coeffect handlers** using [`registerEffectHandler`](https://github.com/mariosanchez/spike-todo-declarative-effects/blob/master/docs/reffects/api.md#registereffecthandler) function.

`registerEffectHandler` receives two parameters: 
1. The **effect identifier** which has to be a string.
2. The **effect handler** which has to be a function that will be executed everytime the event identified by the first parameter is dispatched.

An **effect handler** is a function that performs a side-effect described by an effect.
Remember that [effects are descriptions of side-effects](https://github.com/mariosanchez/spike-todo-declarative-effects/blob/master/docs/reffects/effects-and-coeffects.md), so **effect handlers** are interpreters of those descriptions that will know how to perform the described side-effects. The effect handler receives only one parameter: **the description of the side-effect to be performed, i.** e., the **effect**.

Example:
```js
registerEffectHandler(
  "mutate", 
  function mutateEffect(mutations) {
    mutations.forEach(function (mutation) {
      store.setState(mutation);
    });
  }
);
```

In this example we're registering a handler for the `"mutate"` effect.
This handler interprets the description of mutations of values of the application state (`store`) that is associated to the `"mutate"` key in the effects object and performs them. This effect would allow you to mutate the application state from pure event handlers as shown in the following code snippet:

```js
registerEventHandler(
  "toggleVisibilityOnClick",
  function(coeffects, payload) {
    return {
      mutate: [{ path: ['visible'], newValue: !coeffects.state.visible }]
    };
  }, 
  [{id: 'state', data: [{ path: ['visible'], key: 'visible' }]}]
);
```

In this example, the event handler for the `"toggleVisibilityOnClick"` event returns an effects map containing the `"mutate"` effect which **describes a mutation** of the values associated to the `'visible'` keywords in the application state.

Notice how the value associated to the `"mutate"` effect in the **effects object** is an array whose elements are the mutations to be done on the application state. Each mutation is described by a `path` which indicates where to do the mutation and a `newValue` which is the value that we'll find in the given path after the mutation takes place.

Notice also that the previous value of `'visible'` was retrieved using a custom coeffect 'state' whose data are are an array of extractions. Each extraction is described by a `path` which indicates where the value is and a `key` which tells the key which the extracte value will be associate with in the object associated with the `"state"` key in the coeffects object.

If you want to know how to register custom coeffect handlers, have a look at [Registering custom coeffect handlers in reffects](https://github.com/mariosanchez/spike-todo-declarative-effects/blob/master/docs/reffects/custom-coeffects.md).
