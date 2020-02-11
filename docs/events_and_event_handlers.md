# Events and event handlers

reffects is a synchronous event bus with [effects and coeffects](/docs/effects_and_coeffects.md).

Any application using reffects has a an [event-driven architecture](https://en.wikipedia.org/wiki/Event-driven_architecture).

Thanks to the [declarative effects pattern](/docs/effects_and_coeffects.md#declarative-effects-pattern), all the event handlers in an application using reffects can be pure function.

Pure functions offer great advantages over effectful functions because they are

a. *Easier to understand*: all the knowledge is local to the function and it performs no actions at a distance.

b. *Much easier to test*: the function only receives information through its parameters and it always return the same output for a given input.

These event handlers receive two parameters:

1. A *coeffects object* containing all the values from its context that the event handlers needs.

2. The payload of the event.

In an application using reffects, you should write all your state management logic as pure event handlers.

More on event handlers:

1. [Registering event handlers](/docs/event_handlers.md).

2. [Testing event handlers](/docs/testing_event_handlers.md).
