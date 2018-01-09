const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const IS_PROD = process.env.NODE_ENV === 'production';
const pkg = require('./package.json');
const version = pkg.version;

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
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'gravity-bp',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'sw.js',
      minify: true,
      navigateFallback: 'index.html',
      stripPrefix: 'public/',
      swFilePath: 'public/sw.js',
      staticFileGlobs: [
        'public/index.html',
        'public/**/!(*map*|*sw*)',
      ],
    })
  ],
};

const common = {
  cache: true,
  entry: {
    index: './src/components/index.tsx'
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss', '.css', '.twig']
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common"
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
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