## Motivation

As developers, we are usually exposed to write code relying heavily on side effects: we ask for the current date from anywhere in the code, write on the database, ask for data to an http server and more. This things may seem unimportant during development, but when writing tests we need to manage those side effects. For example, we may want to have an specific date as the "current date", or check that we are calling a server without actually doing it. And what do we do when we want to fake our side effects? That's it, mocks to the rescue!

But mocks are no easy thing. We have to configured them every time we need them, and we have to be careful to keep in-sync the contract of the real collaborator and the mock.

We need mocks in the first place because of the side effects, so what if we remove side effects? We would have pure functions, and they offer great advantages over effectful functions because they are:

a. *Easier to understand*: all the knowledge is local to the function and it performs no actions at a distance.

b. *Much easier to test*: the function only receives information through its parameters and it always returns the same output for a given input.  

In an application using `reffects`, you should write all your state management logic as pure functions.