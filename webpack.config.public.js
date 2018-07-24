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
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const env = require('./env');

const bundle = env.bundles.public;
const vars = env.definedVars(bundle)['process.env'];

const config = {
  [env.envs.dev]: {
    serve: {
      hot: true,
      host: '0.0.0.0',
      port: '8080',
      content: './public',
      add: (app, middleware, options) => {
        app.use(convert(history({})));
      },
    },
    plugins: [new webpack.HotModuleReplacementPlugin({})],
  },
  [env.envs.prod]: {
    serve: {
      hot: true,
      compress: true,
      host: '0.0.0.0',
      port: '8080',
      content: './public',
      add: (app, middleware, options) => {
        app.use(convert(history({})));
      },
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({}),
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
  },
  all: {
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
        api: JSON.parse(vars.API),
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
          loader: 'awesome-typescript-loader?useBabel=true&useCache=true',
        },
        {
          test: /\.twig$/,
          loader: 'twig-loader',
        },
      ],
    },
  },
};

//console.log(util.inspect(merge(common, config.all, config[env.env]), {depth: null}));

module.exports = merge(common(bundle), config.all, config[env.env]);
