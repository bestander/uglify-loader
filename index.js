var UglifyJS = require("uglify-js");

module.exports = function(content) {
    this.cacheable();
    return UglifyJS.minify(content, {fromString: true}).code;
};