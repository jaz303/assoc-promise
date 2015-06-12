# assoc-promise

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