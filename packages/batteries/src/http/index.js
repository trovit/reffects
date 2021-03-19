import registerBatteries, {httpGet, httpPost, httpPut, httpPatch, httpDelete} from './http';

export const http = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete,
};

export default function registerHttpBatteries(httpClient) {
  registerBatteries(httpClient);
}
