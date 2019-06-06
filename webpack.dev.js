const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const terserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  watch: true,
  optimization: {
    minimizer: [
      new terserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  }
});