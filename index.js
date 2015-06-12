module.exports = function(obj) {
    var remain = Object.keys(obj).length;
    if (remain === 0) {
        return Promise.resolve({});
    }
    return new Promise(function(resolve, reject) {
        var done = false, res = {};
        function yes(k, val) {
            if (done) return;
            res[k] = val;
            if (--remain === 0) {
                done = true;
                resolve(res);
            }
        }
        function no(err) {
            if (done) return;
            done = true;
            reject(err);
        }
        for (var k in obj) {
            if (obj[k] && typeof obj[k].then === 'function') {
                obj[k].then(yes.bind(this, k), no); 
            } else {
                yes(k, obj[k]);
            }
        }
    });
}