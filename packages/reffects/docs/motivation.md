## Motivation

As developers, we  are used to write code relying heavily on side effects: we ask for the current date from anywhere in the code, write on the database, ask for data to an http server and more. These things may seem unimportant during development, but to be able to write tests we need to manage those side effects. For example, we may want to have an specific date as the "current date", or check that we are calling a server without actually doing it. And what do we do when we want to fake our side effects? That's it, mocks to the rescue!

But mocks are no easy thing. We have to configure them every time we need them, and we have to be careful to keep in-sync the contracts of the real collaborator and the mock.

We need mocks in the first place because of how we work with side effects, so what if we remove side effects from our business logic and use pure functions instead? 

Pure functions offer great advantages over effectful functions because they are:

a. *Easier to understand*: all the knowledge is local to the function and they perform no actions at a distance.

b. *The easiest code to test*: the function only receives information through its parameters and it always returns the same output for a given input.

In an application using `reffects`, you should write all your state management logic as pure functions.
