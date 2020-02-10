# Registering event handlers in reffects

To register event handlers you need to use [reffects' `registerEventHandler`](/docs/api.md#registereventhandler)function. This function associates an event with its handler, so that, every time the event is dispatched, its event handler is executed.

When you using [reffects' `registerEventHandler`](/docs/api.md#registereventhandler), you can use its third parameter, which is optional, to declare the coeffects that describe the values that the handler will need. Have a look at the [documentation of reffects' `registerEventHandler`](/docs/api.md#registereventhandler) to see more details and examples of usage.
