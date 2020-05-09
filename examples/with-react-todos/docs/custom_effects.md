# Custom effects in todos app.

These are the custom effects we have created for the *todos app*:

### `toast.show`

The `toast.show` effect is used to display a toast.

Example:

```js
import { toast } from "../../effects/toast";

registerEventHandler(
    "displayError", 
    function displayError(coeffects, { message }) {
        return toast.show({
            text: message,
            milliseconds: 3000
        });
    }
);
```
In the previous example, the event handler for `displayError` event returns a `toast.show` effect that will show a message during 3000 milliseconds. 

The parameters for the `toast.show` effect is an object comprised of two properties:

1. `text`: the text that will be displayed by the toast.

2. `milliseconds`: the time in milliseconds that the toast will be visible.
