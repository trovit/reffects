# Subscribing React components to changes in store's state

You need to use the following function:

## `subscribe`
This function subscribes a React component to given [reselect](https://github.com/reduxjs/reselect)’s selectors, so that it only renders when the values in the application state tracked by the given selectors change.

The `subscribe` function gets as first parameter the component we want to subscribe to to the store.

As second parameter receives one parameter, called `mapStateToProps`, which is a function that maps the application state to the properties of the component we want to subscribe.

Finally, the third parameter is an object of properties we can optionally pass to the subscribed component as options or additional properties. This is useful if we want to keep our component separated of any `reffects` function or any other side effect trigger and keep it only presentational.

The `subscribe` function returns a wrapped component that renders only when the values mapped by `mapStateToProps` function change.

We always use [reselect](https://github.com/reduxjs/reselect)’s selectors to write the `mapStateToProps` function because they give us memoization, composability and tools for testing out of the box. This allows us to avoid writing code to optimize rerenderings.

Example:

```js
import React from "react";
import { dispatch } from "reffects";
import { subscribe } from "reffects-store";

export function Counter({ count, onClickIncrement, onClickDecrement }) {
  return (
    <>
      <span>{count}</span>
      <button onClick={onClickIncrement}>+</button>
      <button onClick={onClickDecrement}>-</button>
    </>
  );
}

// Example of a simple selector
function countSelector(state) {
  return state.count;
}

export default subscribe(
  Counter,
  function(state) {
    return {
      count: countSelector(state)
    };
  },
  {
    onClickIncrement: dispatch("INCREMENT_COUNTER"),
    onClickDecrement: dispatch("DECREMENT_COUNTER")
  }
);
```
