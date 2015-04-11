var UglifyJS = require("uglify-js");

module.exports = function(source, inputSourceMap) {
    var callback = this.async();

    if (this.cacheable) {
        this.cacheable();
    }

    var opts = this.options['uglify-loader'] || {};
    opts.inputSourceMap = inputSourceMap;
    opts.outSourceMap = this.sourceMap ? "out.js.map" : null;
    opts.fromString = true;
    onResult(null, UglifyJS.minify(content, opts));

    function onResult(err, result){
        if (err) return callback(err);
        callback(err, err ? null : result.code, err ? null : result.map);
    }
};