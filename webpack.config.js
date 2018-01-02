const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: "./src/components/index.tsx"
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: __dirname + "/public"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss", ".css"]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "common"
    }),
    new ExtractTextPlugin({
      filename: "[name].css",
      allChunks: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"]),
      },
    ]
  }
};