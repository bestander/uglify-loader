var UglifyJS = require("uglify-js");
var loaderUtils = require('loader-utils');
var sourceMap = require('source-map');

function mergeSourceMap(map, inputMap) {
  var inputMapConsumer = new sourceMap.SourceMapConsumer(inputMap);
  var outputMapConsumer = new sourceMap.SourceMapConsumer(map);

  var mergedGenerator = new sourceMap.SourceMapGenerator({
    file: inputMapConsumer.file,
    sourceRoot: inputMapConsumer.sourceRoot
  });

  var source = outputMapConsumer.sources[0];

  inputMapConsumer.eachMapping(function (mapping) {
    var generatedPosition = outputMapConsumer.generatedPositionFor({
      line: mapping.generatedLine,
      column: mapping.generatedColumn,
      source: source
    });
    if (generatedPosition.column != null) {
      mergedGenerator.addMapping({
        source: mapping.source,

        original: mapping.source == null ? null : {
          line: mapping.originalLine,
          column: mapping.originalColumn
        },

        generated: generatedPosition
      });
    }
  });

  var mergedMap = mergedGenerator.toJSON();
  inputMap.mappings = mergedMap.mappings;
  return inputMap
};

module.exports = function(source, inputSourceMap) {
    var callback = this.async();

    if (this.cacheable) {
      this.cacheable();
    }

    var opts = this.options['uglify-loader'] || {};
    // just an indicator to generate source maps, the output result.map will be modified anyway
    // tell UglifyJS2 not to emit a name by just setting outSourceMap to true
    opts.outSourceMap = true;
    opts.fromString = true;

    var result = UglifyJS.minify(source, opts);
    var sourceMap = JSON.parse(result.map);

    if (inputSourceMap) {
      callback(null, result.code, mergeSourceMap(sourceMap, inputSourceMap));
    } else {
      var sourceFilename = loaderUtils.getRemainingRequest(this);
      var current = loaderUtils.getCurrentRequest(this);
      sourceMap.sources = [sourceFilename];
      sourceMap.file = current;
      sourceMap.sourcesContent = [source];

      callback(null, result.code, sourceMap);
    }
};
