import { coeffect, registerCoeffectHandler } from 'reffects';

const COEFFECT_ID = 'globals';

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

export function globalsGet(path) {
  return coeffect(COEFFECT_ID, path);
}

export default function registeGlobalCoeffect(globalObject = window) {
  registerCoeffectHandler(COEFFECT_ID, function global(variableName) {
    const valuesToRetrieve = typeof variableName === 'string' ? { [variableName]: variableName } : variableName;
    const values = Object.fromEntries(
        Object.entries(valuesToRetrieve).map(([name, path]) => [name, getIn(globalObject, path)])
    )
    return {
      [COEFFECT_ID]: values,
    };
  });
}
