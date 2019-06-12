module.exports = {
  entry: {
    inject: "./src/inject.ts",
    index: "./src/index.tsx",
  },
  output: {
    path: __dirname + "/dist"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", "scss"]
  },
};