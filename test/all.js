require('es6-promise').polyfill();

var test = require('tape');
var passoc = require('../');

function delayedValue(val) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() { resolve(val); }, 200);
    });
}

test("empty object", function(assert) {

    assert.plan(1);

    passoc({}).then(function(res) {
        assert.deepEqual(res, {});
    });

});

test("all resolve", function(assert) {

    assert.plan(1);

    passoc({
        a: delayedValue(1),
        b: delayedValue(2),
        c: delayedValue(3),
        d: 4
    }).then(function(res) {
        assert.deepEqual(res, {a: 1, b: 2, c: 3, d: 4});
    });

});

test("one rejection spoils everything", function(assert) {

    assert.plan(1);

    passoc({
        a: delayedValue(1),
        b: delayedValue(2),
        c: new Promise(function(resolve, reject) { reject("boom!"); }),
        d: 4
    }).then(function() {
        assert.fail();
    }, function(err) {
        assert.equal(err, "boom!");
    });

});

test("exceptions are caught", function(assert) {

    assert.plan(1);

    passoc({
        a: delayedValue(1),
        b: delayedValue(2),
        c: new Promise(function(resolve, reject) { throw "kaboom!"; }),
        d: 4
    }).then(function() {
        assert.fail();
    }, function(err) {
        assert.equal(err, "kaboom!");
    });

});