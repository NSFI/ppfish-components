import path from 'path';
import webpack from 'webpack';
import fs from 'fs';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import lessToJs from 'less-vars-to-js';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './source/assets/css/themes/default.less'), 'utf8'));
// lessToJs does not support @icon-url: "some-string",
// so we are manually adding it to the produced themeVariables js object here
// 注意：这里需要单引号
themeVariables["@icon-url"] = "'//at.alicdn.com/t/font_697017_1dtc732aw4c'";

module.exports = {
  entry: {
    site: path.join(__dirname, 'site')
  },
  output: {
    path: path.resolve(__dirname, 'dist/site'),
    chunkFilename: '[chunkhash:12].js',
    filename: '[chunkhash:12].js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[chunkhash:12].css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'site/index.html'),
      favicon: path.join(__dirname, 'site/assets/favicon.ico')
    })
  ].concat(process.env.TRAVIS_CI ? [] : [
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        keep_fnames: true
      },
      output: {
        comments: false
      }
    })
  ]),
  resolve: {
    extensions: ['.js', '.jsx']
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
          path.join(__dirname, 'site'),
          path.join(__dirname, 'source'),
          path.join(__dirname, 'libs')
        ]
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
        test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
        loader: 'file-loader?name=[hash:12].[ext]'
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
