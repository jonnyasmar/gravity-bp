const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const IS_PROD = process.env.NODE_ENV === 'production';

const dev = {};

const prod = {
  plugins: [
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      }
    }),
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        keep_fnames: true,
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: false,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
        booleans: true,
      },
    })
  ]
};

const common = {
  cache: true,
  entry: {
    index: "./src/components/index.tsx"
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    path: path.resolve(__dirname, 'public'),
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
  },
  watchOptions: {
    ignored: [
      /public/,
      /node_modules/,
    ]
  },
};

let build = Object.assign({}, common, IS_PROD ? prod : dev);
build.plugins = common.plugins.concat(build.plugins);

module.exports = build;