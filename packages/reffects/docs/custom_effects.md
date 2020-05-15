# Registering custom effect handlers in reffects

You can register custom **effect handlers** using [`registerEffectHandler`](api.md#registereffecthandler) function.

`registerEffectHandler` receives two parameters: 
1. The **effect identifier** which has to be a string.
2. The **effect handler** which has to be a function that will be executed everytime the event identified by the first parameter is dispatched.

An **effect handler** is a function that performs a side-effect described by an effect.
Remember that [effects are descriptions of side-effects](effects_and_coeffects.md), so **effect handlers** are interpreters of those descriptions that will know how to perform the described side-effects. The effect handler receives only one parameter: **the description of the side-effect to be performed**, i. e., the **effect**.

Example:
```js
registerEffectHandler(
  "state.set", 
  function setStateEffect(mutations) {
    Object.entries(mutations).forEach(function ([path, newValue]) {
      store.setState({path, newValue});
    });
  }
);
```

In this example we're registering a handler for the `"state.set"` effect.
This handler interprets the description of mutations of values of the application state (`store`) that is associated to the `"state.set"` key in the effects object and performs them. This effect would allow you to setState the application state from pure event handlers as shown in the following code snippet:

```js
registerEventHandler(
  "toggleVisibilityOnClick",
  function(coeffects, payload) {
    return {
      setState: {'visible': !coeffects.state.visible}
    };
  }, 
  [coeffect('state', {'visible', 'visible'})]
);
```

In this example, the event handler for the `"toggleVisibilityOnClick"` event returns an **effects object** containing the `"state.set"` effect which **describes a mutation** of the values associated to the `'visible'` keywords in the application state.

Notice how the value associated to the `"state.set"` effect in the **effects object** is an boject whose entries (key-value pairs) are the mutations to be done on the application state. Each mutation is described by a key-value pair in which *the key* is the *path* which indicates where to do the mutation and *the value* is the *new value* that we'll find in the given path after the mutation takes place.

Notice also that the previous value of `'visible'` was retrieved using a custom coeffect 'state.get' whose data are are an object whose entries are extractions. Each extraction is described by a key-value pair in which *the key* 
tells *the key which the extracted value will be associated with* in the object associated with the `"state"` key in the coeffects object, and *the value* is the *path* which indicates where the value is.

If you want to know how to register custom coeffect handlers, have a look at [Registering custom coeffect handlers in reffects](custom_coeffects.md).
