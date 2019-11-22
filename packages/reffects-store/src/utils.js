function getPathArray(path) {
  return Array.isArray(path) ? path : path.split('.');
}

function get(obj, path, defaultValue = null) {
  if (typeof path === 'undefined') {
    return defaultValue;
  }

  return getPathArray(path).reduce((segment, index) => {
    return segment && segment[index];
  }, obj);
}

function set(obj, path, newValue) {
  if (path.length === 0) {
    return obj;
  }
  return getPathArray(path).reduceRight(
    (value, currentPathKey, index, pathKeys) => {
      const objectSegment = get(obj, pathKeys.slice(0, index));

      if (Array.isArray(objectSegment)) {
        const aggregateArray = [...objectSegment];
        aggregateArray[currentPathKey] = value;
        return aggregateArray;
      }

      return {
        ...objectSegment,
        [currentPathKey]: value,
      };
    },
    newValue
  );
}

export const getIn = (state, path, defaultValue) => {
  return get(state, path, defaultValue);
};

export const setIn = (state, path, valueToSet) => {
  return set({ ...state }, path, valueToSet);
};
