import registerBatteries, { httpGet, httpPost, httpPut, httpPatch } from './http';

export const http = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
};

export default function registerHttpBatteries(httpClient) {
  registerBatteries(httpClient);
}
