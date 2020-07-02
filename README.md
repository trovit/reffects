<p align="center">
   <img alt="reffects" src="./logo.png" height="85">
</p>
<h1 align="center">Reffects</h1>
<p align="center">Synchronous event bus with effects and coeffects in JS</p>

<p align="center">
  <a href="https://img.shields.io/npm/v/reffects">
    <img src="https://badgen.net/npm/v/reffects">
  </a> 
  <a href="https://github.com/trovit/reffects/actions">
    <img src="https://github.com/trovit/reffects/workflows/CI/badge.svg?branch=master">
  </a> 
  <a href="https://coveralls.io/github/trovit/reffects?branch=master">
    <img src="https://coveralls.io/repos/github/trovit/reffects/badge.svg?branch=master">
  </a>
  <a href="https://bundlephobia.com/result?p=reffects">
    <img src="https://badgen.net/bundlephobia/min/reffects">
  </a> 
  <a href="https://bundlephobia.com/result?p=reffects">
    <img src="https://badgen.net/bundlephobia/minzip/reffects">
  </a>
</p>

## Documentation

Reffects is a Javascript framework for developing SPAs using an event-driven unidirectional flow architecture. 

It's based on ClojureScript's re-frame. It promotes a functional programming style with the use of the *effects as data* patterns in which event handlers are pure functions, and effects and coeffects are used to manage side effects and side causes, respectively.

This repository contains all the existing components of the reffects framework:

- [Reffects](/packages/reffects/README.md), the core framework for developing applications in a functional style using events, effects and coeffects.
- [Reffects store](/packages/reffects-store/README.md), an implementation of a store to use `reffects` inside a React application.
- [Batteries](/packages/batteries/README.md), some common effects/coeffects that can be useful for starting your application.

You can see an example of a small application using `reffects` in the [`with-react-todos`](/examples/with-react-todos/README.md) folder

## Contributing

Checkout [our guide](/docs/contributing.md) in case you want to propose some changes to `reffects`.
