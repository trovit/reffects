## Terminology

Reffects has 3 main concepts: effects, coeffects and events.

- An `effect` is a side-effect that you want to produce in your system. An effect maybe be an http request to modify a user's name. The **effect is not** the actual call to the server; it just describes what it has to be done. You can checkout this talk to know more about [effects as data](https://www.youtube.com/watch?v=6EdXaWfoslc).
- A `coeffect` is something you want from the outside world (sometimes called side-cause). For example, getting the current date from the system can be a coeffect. But once again, the coeffect is just the description of what you want, not the thing itself.
- An `event` is something that happens in your system and that will produce one or more `effects`. If a user clicks a buy button, you may dispatch a `buy` event that will trigger an `effect` that will call the server to make the purchase. Events can also need coeffects to do their work.  

If the side-effects and side-causes are just data, how do we do the *actual* work? When you request a `coeffect` or trigger `effect`, `reffects` will look for its handler to do the actual side-effect/side-cause under the hood. For this to work, you'll need to [register your effect handlers](/packages/reffects/docs/api.md#registereffecthandler) and your [coeffect handlers](/packages/reffects/docs/api.md#registercoeffecthandler) as described.

For an `event` to do something, you'll also need to [register its handler](/packages/reffects/docs/api.md#registereventhandler). **Here is where your business logic should live.**

To give you an idea of everything together, this should be a normal flow with reffects:

1. An `event` is dispatched.
2. Reffects looks for the handler and collects the `coeffects` it needs (using the `coeffect` handlers).
3. The `event` handler is executed, resulting in one or more effects.
4. Reffects looks for the handler for each effect and executes them.