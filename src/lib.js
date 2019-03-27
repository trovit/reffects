const eventHandlers = {};
const effectHandlers = {};
const coeffectHandlers = {};

function extractCoeffectsValues(coeffectDescriptions) {
  return coeffectDescriptions.reduce(function (acc, coeffects) {
    const coeffectId = coeffects[0],
      coeffectArguments = coeffects[1],
      coeffectHandler = coeffectHandlers[coeffectId];

    acc = coeffectHandler(acc, coeffectArguments);

    return acc;
  }, {});
}

function applyEffects(effects) {
  const effectIds = Object.keys(effects);
  effectIds.forEach(function (effectId) {
    const effectData = effects[effectId],
      effectHandler = effectHandlers[effectId];
    effectHandler(effectData);
  });
}

export function registerEventHandler(eventId, handler, coeffectDescriptions) {
  eventHandlers[eventId] = function (payload) {
    const coeffects = extractCoeffectsValues(coeffectDescriptions);
    const effects = handler(coeffects, payload);
    applyEffects(effects);
  };
}

export function registerCoeffectHandler(coeffectId, handler) {
  coeffectHandlers[coeffectId] = handler;
}

export function registerEffectHandler(effectId, handler) {
  effectHandlers[effectId] = handler;
}

export function dispatch(eventId, payload) {
  console.log(eventId);
  const eventHandler = eventHandlers[eventId];

  if (!eventHandler) {
    throw new Error(`There is no event handler called '${eventId}'.`);
  }

  return Promise.resolve(eventHandler(payload));
}

function dispatchMany(events) {
  events.forEach(function (event) {
    const [eventId, payload] = event;
    dispatch(eventId, payload);
  });
}

registerEffectHandler("dispatch", function (event) {
  const { id, payload, milliseconds } = event;
  dispatch(id, payload);
});

registerEffectHandler("dispatchMany", dispatchMany);

registerEffectHandler("dispatchLater1", function (event) {
  const { id, payload, milliseconds } = event;

  setTimeout(function () {
    dispatch(id, payload);
  }, milliseconds);
});
