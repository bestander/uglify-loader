var UglifyJS = require("uglify-js");

module.exports = function(source, inputSourceMap) {
    var callback = this.async();

    if (this.cacheable) {
        this.cacheable();
    }

    var opts = this.options['uglify-loader'] || {};
    //    opts.inSourceMap = inputSourceMap;
    //    opts.outSourceMap = "out.js.map";
    opts.fromString = true;
    var result = UglifyJS.minify(source, opts);
    callback(null, result.code, result.map);
};