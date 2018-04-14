const util = require('util');

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const IS_PROD = process.env.NODE_ENV === 'production';
const pkg = require('./package.json');
const version = pkg.version;

const dev = {
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
  },
  plugins: [
    new Dotenv({
      path: './local.env',
    }),
  ],
};

const prod = {
  plugins: [
    new Dotenv({
      path: './prod.env',
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
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
      dontCacheBustUrlsMatching: /\.\w{20}\./,
      filename: 'sw.js',
      minify: true,
      navigateFallback: '/',
      stripPrefix: 'public/',
      swFilePath: 'public/sw.js',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json/],
      dynamicUrlToDependencies: {
        '/': [...glob.sync(`[name].js`)],
      },
      runtimeCaching: [
        {
          urlPattern: /.*/,
          handler: 'networkFirst',
        },
      ],
    }),
  ],
};

const common = {
  cache: true,
  entry: {
    index: './src/index.tsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss', '.css', '.twig'],
    alias: {
      actions: path.resolve(__dirname, 'src/actions'),
      components: path.resolve(__dirname, 'src/components'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      services: path.resolve(__dirname, 'src/services'),
      styles: path.resolve(__dirname, 'src/styles'),
      utils: path.resolve(__dirname, 'src/utils'),
      views: path.resolve(__dirname, 'src/views'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(['public'], {
      watch: true,
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: 'src/views/index.twig',
      inject: 'body',
      title: 'Gravity Boilerplate by Jonny Asmar',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.twig$/,
        loader: 'twig-loader',
      },
    ],
  },
  watchOptions: {
    ignored: [/public/, /node_modules/],
  },
};

let build = Object.assign({}, common, IS_PROD ? prod : dev);
build.plugins = common.plugins.concat(build.plugins);

module.exports = build;
