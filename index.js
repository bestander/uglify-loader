var UglifyJS = require("uglify-js");

module.exports = function(content) {
    this.cacheable();
    var opts = this.options['uglify-loader'] || {};
    opts.fromString = true;
    return UglifyJS.minify(content, opts).code;
};