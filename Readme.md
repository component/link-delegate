
# link-delegate

  Anchor tag click delegation / negotiation for client-side routing. This component
  makes it easy to implement application-wide push-state link handling without
  manually performing a router dispatch.

## Installation

    $ component install component/link-delegate

## Example

  The callback is invoked with an `Event` when the link:

  - is not x-domain
  - is the primary "mouse" button
  - does not have `e.defaultPrevented` (to opt-out)
  - does not specify a `target`
  - does not have the meta, ctrl, or shift key pressed

```js
var link = require('link-delegate');

link(function(e){
  // perform your routing here
  e.preventDefault();
  console.log(e.target.href);
});
```


## License

  MIT
