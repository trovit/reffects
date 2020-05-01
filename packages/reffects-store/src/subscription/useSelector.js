import * as store from '../store';

export default function useSelector(selector) {
  return selector(store.getState());
}
