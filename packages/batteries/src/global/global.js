import {coeffect, registerCoeffectHandler} from 'reffects';

export function globalGetBuilder(path) {
  return coeffect('global.get', path);
}

function getPathArray(path) {
  return Array.isArray(path) ? path : path.split('.');
}

function getIn(obj, path, defaultValue = null) {
  if (typeof path === 'undefined') {
    return defaultValue;
  }

  return getPathArray(path).reduce((segment, index) => {
    return segment && segment[index];
  }, obj);
}

export default function registeGlobalCoeffect(globalObject = window) {
  registerCoeffectHandler('global.get', function global(variableName) {
    return {
      global: {
        [variableName]: getIn(globalObject, variableName),
      },
    };
  });
}
