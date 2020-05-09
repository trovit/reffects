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

### Reffects

- [Events & event handlers](./docs/events_and_event_handlers.md)
  - [Registering event handlers](./docs/event_handlers.md).
  - [Testing event handlers](./docs/testing_event_handlers.md).
- [Effects & Coeffects](./docs/effects_and_coeffects.md)
  - [Built-in effects](./docs/built_in_effects.md)
  - [Registering custom effect handlers](./docs/custom_effects.md)
  - [Registering custom coeffect handlers](./docs/custom_coeffects.md)
- [API](./docs/api.md)

### Reffects store

- [Store](packages/reffects-store/docs/store_api.md)
- [Subscriptions](packages/reffects-store/docs/subscriptions_api.md)
- [Built-in effects & coeffects](packages/reffects-store/docs/built_in_effects_coeffects.md)

### Batteries

For easy of use, we have implemented some common effects/coeffects that you may need in your day to day life as a developer. We have called them `batteries` (as in "batteries included").

- [Cookies](./packages/batteries/docs/cookies.md)
- [Global](./packages/batteries/docs/global.md)
- [http](./packages/batteries/docs/http.md)
- [QueryParams](./packages/batteries/docs/queryParams.md)

## Tests

To run the tests once: `npm run test`

To run the tests everytime the code changes: `npm run test:watch`
