const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const modeConfig = env => require(`./build-utils/webpack.${env.mode}.js`)(env);
const loadPresets = require('./build-utils/loadPresets');

const plugins = [
  new webpack.ProgressPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html',
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    },
  }),
  new Dotenv({
    safe: true,
    systemvars: true,
  }),
];

module.exports = ({ mode, presets }) => {
  return webpackMerge(
    {
      mode,
      output: {
        path: path.join(__dirname, 'dist/'),
        publicPath: '/',
        filename: '[name].[chunkhash:8].js',
      },
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
            loader: 'url-loader?limit=100000',
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
                    targets: '>1%, not dead, not ie 11',
                  },
                ],
              ],
            },
          },
        ],
      },
      plugins,
    },
    modeConfig({ mode, presets }),
    loadPresets({ mode, presets })
  );
};
