var path = require("path");

module.exports = {
  entry: {
    "/appA/page1": "./src/appA/page1.js",  // ひとまとめにする単位を指定
  },
  output: {
    path: path.join(__dirname, "./dist/scripts"),
    filename: "[name].js",               // entryのkey名がnameに入る
  },
// 単にimport/exportの解釈だけであるならばwebpackだけで対応可能
// ES2015スタイルで書きたい場合はbabel-loaderをインストールすること
// npm install babel-core babel-loader babel-preset-es2015 --save-dev
//  module: {
//    rules: [
//      {
//          test: /\.js$/,
//          loader: "babel-loader",
//          exclude: /node_modules/,
//          options: {
//            "presets": ["es2015"]
//          }
//      },
//    ],
//  },
   devServer: {
     host: "192.168.1.10",
     contentBase: "test",
     port: 8080
  },
  resolve: {
    modules: [
      path.join(__dirname, "./src/common"),
      "node_modules"
    ]
  },
  // ここで指定したライブラリはimport指定してもoutputには取り込まれない
  // ライブラリは別途読み込ませる想定
  // ライブラリ名 : 読み込んだライブラリが登録されているグローバル名
  externals : {
       "jquery" : "$"
   },
}
