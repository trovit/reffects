import _clone from 'lodash.clone';
import _get from 'lodash.get';
import _setWith from 'lodash.setwith';

export const getIn = (state, path, defaultValue) => {
  return _get(state, path, defaultValue);
};

export const setIn = (state, path, valueToSet) => {
  return _setWith({ ...state }, path, valueToSet, (nsValue) => {
    return _clone(nsValue);
  });
};
