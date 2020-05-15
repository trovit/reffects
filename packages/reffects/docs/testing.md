# Testing

As you can imagine, working with reffects will lead you to test 3 types of components: effects, coeffects and events.

- Testing an `event` handler should be easy. Since they receive everything as an input and describe their effects as data (instead of actually doing them), you will be writing tests for pure functions; no need for mocks, just create the data you need and check you receive the expected effect.
- An `effect` handler is an impure function that will change the outside world. To test it you will probably need to spy some dependencies and check the handler did the work you expected.
- A `coeffect` handler is an impure function that will read from the outside world. You have the option of stubbing the outside world to return some canned answers and test if the handler read what you wanted.