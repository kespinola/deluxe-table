const webpack = require('webpack');
const Rebeccapurple = require('postcss-color-rebeccapurple');
const SimpleVariables = require('postcss-simple-vars');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NextCSS = require('postcss-cssnext');
const path = require('path');

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const config = {

  context: path.join(__dirname, '/../../src'),

  output: {
    path: 'build',
    filename: '[name].js',
    publicPath: `http://${HOST}:${PORT}/build/`,
    devtoolModuleFilenameTemplate: '/[absolute-resource-path]',
  },

  module: {
    loaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: [/\.css$/],
        loaders: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1',
          'postcss'
        ),
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.(woff|svg|eot|ttf|woff2)$/,
        loader: 'file?name=[sha512:hash:base64:7].[ext]',
      },
    ],
  },

  postcss: [
    Rebeccapurple,
    SimpleVariables,
    NextCSS,
  ],

  resolve: {
    modules: [
      'node_modules',
    ],

    extensions: ['', '.js', '.jsx', '.json', '.css', '.sass', '.scss'],

  },

  node: {
    process: true,
  },

  debug: true,

  devtool: 'eval-source-map',

  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],

};

if (process.env.NODE_ENV === 'development') {
  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]);
  config.entry = {
    main: [
      `webpack-dev-server/client?http://${HOST}:${PORT}`,
      'webpack/hot/dev-server',
      './index.js',
    ],
  };

  config.output.path = '/build';
}

module.exports = config;
