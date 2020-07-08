## Terminology

Reffects has 3 main concepts: effects, coeffects and events.

- An `effect` describes a side-effect that you want to produce in your system. A side-effect maybe be for example an http request to modify a user's name. The **effect is not** the actual call to the server; it's just a description of what has to be done. You can checkout this talk to know more about [effects as data](https://www.youtube.com/watch?v=6EdXaWfoslc).
- A `coeffect` declares something you need from the outside world (a kind of side-effect sometimes called a side-cause). For example, getting the current date from the system is a side-cause. But once again, the coeffect is just the description of what you need, not the thing itself.
- An `event` is something that happens in your system and that will produce one or more `effects`. If a user clicks a buy button, you may dispatch a `buy` event that might produce an `effect` that will call the server to make the purchase. Events may also need inputs from the world (described by coeffects) to do their work.

If the side-effects and side-causes are just described by data (as effects and coeffects, respectively), how do we do the *actual* work? 

`reffects` will use under the hood the data that describes the `coeffects` declared for a given event handler to find the corresponding coeffects handlers and execute the actual side-causes to get the input data that will be passed to the event handlers through its parameters. 
In the same manner, `reffects` will use the data that describes the `effects` returned by a given event handler to find the corresponding effects handlers and execute the the actual side-effects to change the world as desired. For this to work, you'll need to [register your effect handlers](/packages/reffects/docs/api.md#registereffecthandler) and your [coeffect handlers](/packages/reffects/docs/api.md#registercoeffecthandler) as described. For an `event` to do something, you'll also need to [register its handler](/packages/reffects/docs/api.md#registereventhandler). **Your business logic should live in your event handlers.**

To give you an idea of everything together, this should be a normal flow with reffects:

1. An `event` is dispatched.
2. Reffects looks for its handler, and collects the input data for each of its declared `coeffects` by executing their corresponding `coeffect` handlers.
3. The `event` handler is executed with this input, returning one or more effects.
4. Reffects looks for the handler of each of the effects and executes it to produce the desired side-effects one by one.
