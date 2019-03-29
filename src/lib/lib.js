const initialHandlers = {
  effects: {},
  coeffects: {},
  events: {}
};
let handlers = { ...initialHandlers };
const coeffectsByEvent = {};
const toString = Object.prototype.toString

function getHandler(handlerType, handlerId) {
  const handler = handlers[handlerType][handlerId];
  if (!handler) {
    throw new Error(`There is no ${handler} handler called '${handlerId}'.`);
  }
  return handler;
}

function setHandler(handlerType, handlerId, handler) {
  handlers[handlerType][handlerId] = handler;
}

export function getCoeffectHandler(coeffectId) {
  return getHandler('coeffects', coeffectId);
}

export function getEffectHandler(effectId) {
  return getHandler('effects', effectId);
}

export function getEventHandler(eventId) {
  return getHandler('events', eventId);
}

export function clearHandlers() {
  handlers = { ...initialHandlers };
}

function extractCoeffectsValues(coeffectDescriptions) {
  return coeffectDescriptions.reduce(function (acc, coeffectDescription) {
    if (isString(coeffectDescription)) {
      const coeffectId = coeffectDescription;
      const coeffectHandler = getCoeffectHandler(coeffectId);
      return Object.assign({}, acc,  coeffectHandler());
    }

    const coeffectId = coeffectDescription.id;
    const coeffectData = coeffectDescription.data;
    const coeffectHandler = getCoeffectHandler(coeffectId);
    return Object.assign({}, acc,  coeffectHandler(coeffectData));
  }, {});
}

function applyEffects(effects) {
  if (!effects) {
    return;
  }
  const effectIds = Object.keys(effects);

  effectIds.forEach(function (effectId) {
    const effectData = effects[effectId];
    const effectHandler = getEffectHandler(effectId);

    effectHandler(effectData);
  });
}

export function registerEventHandler(eventId, handler, coeffectDescriptions = []) {
  setHandler('events', eventId, handler);
  coeffectsByEvent[eventId] = coeffectDescriptions;
}

export function registerCoeffectHandler(coeffectId, handler) {
  setHandler('coeffects', coeffectId, handler);
}

export function registerEffectHandler(effectId, handler) {
  setHandler('effects', effectId, handler);
}

export function dispatch(eventId, payload) {
  const eventHandler = getEventHandler(eventId);
  const coeffectDescriptions = coeffectsByEvent[eventId];
  const coeffects = extractCoeffectsValues(coeffectDescriptions);
  const effects = eventHandler(coeffects, payload);
  applyEffects(effects);
}

function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return toString.call(value)
}

function isString(value) {
  const type = typeof value
  return type == 'string' || (type == 'object' && value != null && !Array.isArray(value) && getTag(value) == '[object String]')
}