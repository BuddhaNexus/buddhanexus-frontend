const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';

const polyfills = [
  {
    from: path.resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
    to: 'vendor',
    flatten: true,
  },
  {
    from: path.resolve(`${webcomponentsjs}/bundles/*.{js,map}`),
    to: 'vendor/bundles',
    flatten: true,
  },
  {
    from: path.resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
    to: 'vendor',
    flatten: true,
  },
];

const assets = [
  {
    from: 'src/assets/icons',
    to: 'src/assets/icons/',
  },
  {
    from: 'src/assets/img',
    to: 'src/assets/img/',
  },

  {
    from: 'src/assets/fonts',
    to: 'fonts/',
  },
  {
    from: 'src/assets/download',
    to: 'download/',
  },
];

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                exportGlobals: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                context: path.resolve(__dirname, 'src'),
                hashPrefix: 'bn-styles',
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    moduleIds: 'hashed',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
    new CopyWebpackPlugin([...polyfills, ...assets], {
      ignore: ['.DS_Store'],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
    new MiniCssExtractPlugin(),
  ],
});
