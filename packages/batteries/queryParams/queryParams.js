import { registerCoeffectHandler } from 'reffects';

export default function registerQueryParamsCoeffect(globalOject) {
  registerCoeffectHandler('queryParams', function retrieveQueryParams(
    selectedQueryParams = []
  ) {
    const urlParams = new URLSearchParams(globalOject.location.search);

    const queryParams = selectedQueryParams.reduce(
      function convertQueryParamsToObject(queryParamValues, queryParam) {
        const queryParamValue = urlParams
          .getAll(queryParam)
          .map(function urlDecodeParams(param) {
            return decodeURIComponent(param);
          });

        if (queryParamValue.length === 0) {
          return Object.assign({}, queryParamValues, { [queryParam]: null });
        }

        if (queryParamValue.length === 1) {
          return Object.assign({}, queryParamValues, {
            [queryParam]: queryParamValue[0],
          });
        }

        return Object.assign({}, queryParamValues, {
          [queryParam]: queryParamValue,
        });
      },
      {}
    );

    return {
      queryParams,
    };
  });
}
