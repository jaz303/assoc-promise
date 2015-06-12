# assoc-promise

Requires a `Promise` polyfill (e.g. `require('es6-promise').polyfill()`).

```javascript
var passoc = require('assoc-promise');

passoc({
	foo: makePromise("foo"),
	bar: makePromise("bar"),
	baz: "baz"
}).then(function(res) {
	// object `res` contains same keys as the input object,
	// values are the resolved values.
}, function(err) {
	// called if any of the promises reject
});
```