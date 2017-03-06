var path = require("path");

module.exports = {
  entry: {
    "vendor": "./lib/libexports.js"
  },
  output: {
    path: path.join(__dirname, "./dist/scripts"),
    filename: "[name].js",               // entryのkey名がnameに入る
  },
  resolve: {
    modules: [
      path.join(__dirname, "./lib"),
      "node_modules"
    ]
  },
}
