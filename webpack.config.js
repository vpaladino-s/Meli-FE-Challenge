const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      { // CSS / SASS & Css.module Support
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: false
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      { // IMG Support
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      { test: /\.(png|woff|woff2|eot|ttf)$/, loader: 'url-loader' },
      { // SVG Support
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "public/"),
    publicPath: "/public/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new HtmlWebpackPlugin({
    template: "./public/index.html"
  })]
};