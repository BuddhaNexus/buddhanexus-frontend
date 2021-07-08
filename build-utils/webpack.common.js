const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {},
        },
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf)$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
            [
              '@babel/plugin-proposal-decorators',
              { decoratorsBeforeExport: true },
            ],
          ],
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: 3,
                targets: '>1%, not dead, not ie 11',
              },
            ],
          ],
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, '../dist/'),
    publicPath: '/',
    filename: '[name].[chunkhash:8].js',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new Dotenv({
      safe: true,
      systemvars: true,
    }),
  ],
};
