import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import lessToJs from 'less-vars-to-js';

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './source/assets/css/lib/ant-theme-vars.less'), 'utf8'));
// lessToJs does not support @icon-url: "some-string",
// so we are manually adding it to the produced themeVariables js object here
themeVariables["@icon-url"] = "'https://at.alicdn.com/t/font_zck90zmlh7hf47vi'";

// TODO 压缩混淆代码开关
const minimize = true;

const getUglifyJsPlugin = () => {
  if (minimize) {
    return [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
    ];
  }
  return [];
};

const lessStyle = new ExtractTextPlugin({
  filename: minimize ? 'ppfish.min.css' : 'ppfish.css',
  allChunks: true
});

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

// more info: https://github.com/isaacs/node-glob
export default {
  // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps
  // and https://webpack.github.io/docs/configuration.html#devtool
  devtool: false,
  entry: {
    ppfish: path.join(__dirname, 'source/components'),
  },
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: `${__dirname}/dist/static`,
    publicPath: '/static/',
    filename: minimize ? '[name].min.js' : '[name].js',
    chunkFilename: minimize ? '[name].min.js' : '[name].js',
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ],
        debug: false,
        noInfo: true // set to false to see a list of every file being bundled.
      }
    }),
    // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),
    lessStyle,
  ]
    .concat(getUglifyJsPlugin()),
  module: {
    loaders: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        test: /\.(woff|woff2)$/,
        use: [{
          loader: 'url-loader?limit=100000'
        }]
      },
      {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'file-loader?limit=10000&mimetype=application/octet-stream'
        }]
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'file-loader?limit=10000&mimetype=image/svg+xml'
        }]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        test: /\.ico$/,
        use: [{
          loader: 'file-loader?name=[name].[ext]'
        }]
      },
      {
        test: /\.less$/,
        use: lessStyle.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: minimize
            }
          }, {
            loader: 'postcss-loader',
            options: {
              minimize: minimize
            }
          }, {
            loader: 'less-loader',
            options: {
              minimize: minimize
            }
          }],
          fallback: 'style-loader'
        })
      }
    ]
  }
};
