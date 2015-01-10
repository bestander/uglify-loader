# uglify-loader
Uglify loader for webpack

Use Case
---
Webpack has UglifyJSPlugin that uglifies the output after bundling.
In the applications that depend on thirdparty libraries you may want to uglify with mangling only your application code but not the code that you don't control.

Example
---
```
module: {
    loaders: [
        {
            // I want to uglify with mangling only app files, not thirdparty libs
            test: /.*\/app\/.*\.js$/,
            exclude: /.spec.js/, // excluding .spec files
            loader: "uglify"
        },
}
```