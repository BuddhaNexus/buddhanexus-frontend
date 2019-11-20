const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
    to: 'img/',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([...polyfills, ...assets], {
      ignore: ['.DS_Store'],
    }),
    new MiniCssExtractPlugin(),
  ],
});
