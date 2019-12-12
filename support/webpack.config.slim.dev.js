var webpack = require("webpack");

module.exports = {
  name: "slim",
  entry: "./lib/index.js",
  output: {
    library: "io",
    libraryTarget: "umd",
    filename: "socket.io.slim.dev.js"
  },
  externals: {
    global: glob()
  },
  node: {
    Buffer: false
  },
  devtool: "source-map",
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /debug/,
      process.cwd() + "/support/noop.js"
    ),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        screw_ie8: true,
        beautify: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      },
      {
        test: /\.js$/,
        loader: "strip-loader?strip[]=debug"
      }
    ]
  }
};

/**
 * Populates `global`.
 *
 * @api private
 */

function glob() {
  return (
    'typeof self !== "undefined" ? self : ' +
    'typeof window !== "undefined" ? window : ' +
    'typeof global !== "undefined" ? global : {}'
  );
}
