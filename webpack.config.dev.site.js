/* eslint-disable no-console */
import path from 'path';
import webpack from 'webpack';
import fs from 'fs';
import lessToJs from 'less-vars-to-js';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './source/assets/css/lib/ant-theme-vars.less'), 'utf8'));
// lessToJs does not support @icon-url: "some-string",
// so we are manually adding it to the produced themeVariables js object here
themeVariables["@icon-url"] = "'https://at.alicdn.com/t/font_zck90zmlh7hf47vi'";

export default {
  // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps
  // and https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:5000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './site/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'site/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        include: [
          path.join(__dirname, './site'),
          path.join(__dirname, './source'),
          path.join(__dirname, './libs')
        ]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, './site'),
          path.join(__dirname, './source'),
          path.join(__dirname, './libs')
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader?'
        }, {
          loader: 'less-loader?',
          options: {
            modifyVars: themeVariables
          }
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(jpe?g|png|gif)(\?.+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.md$/,
        loader: 'raw-loader'
      }
    ]
  }
};
