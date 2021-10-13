import { coeffect, registerCoeffectHandler } from 'reffects';

export function queryParamsGet(selectedQueryParams) {
    return coeffect('queryParams', selectedQueryParams);
}

export default function registerQueryParamsCoeffect(globalObject) {
  registerCoeffectHandler('queryParams', function retrieveQueryParams(
    selectedQueryParams = []
  ) {
    const urlParams = new URLSearchParams(globalObject.location.search);

    const queryParams = selectedQueryParams.reduce(
      function convertQueryParamsToObject(queryParamValues, queryParam) {
        const queryParamValue = urlParams
          .getAll(queryParam)
          .map(function urlDecodeParams(param) {
            return decodeURIComponent(param);
          });

        if (queryParamValue.length === 0) {
          return queryParamValues;
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
