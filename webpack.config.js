const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
    devServer: {
      watchFiles: ["./src/index.html"],
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    mode: "development",
}