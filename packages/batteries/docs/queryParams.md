# queryParams

### `queryParams.get`

The `queryParams.get` coeffect reads a list of parameters from the query string of the current web page.

Example:

```js
// On page https://github.com/?user=hannah&page=2

import { queryParams } from 'reffects-batteries'; 
import { state } from 'reffects-store'; 

registerEventHandler(
    'loadData',
    function loadData({ queryParams }, payload) {
      return state.set({
        username: queryParams.user,
        currentPage: queryParams.page,
      });
    },
    [queryParams.get(['user', 'page'])]
);
```
