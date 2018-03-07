import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import InlineManifestWebpackPlugin from 'inline-manifest-webpack-plugin';
import autoprefixer from 'autoprefixer';
import lessToJs from 'less-vars-to-js';

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './source/assets/css/lib/ant-theme-vars.less'),
  'utf8'));
// lessToJs does not support @icon-url: "some-string",
// so we are manually adding it to the produced themeVariables js object here
themeVariables["@icon-url"] = "'https://at.alicdn.com/t/font_zck90zmlh7hf47vi'";
// 将库和工具打成一个包
const extractLessLib = new ExtractTextPlugin({
  filename: 'libs.[contenthash].css',
  allChunks: true
});
const extractLessStyle = new ExtractTextPlugin({
  filename: '[name].[hash].css',
  allChunks: true
});

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

// TODO 压缩混淆代码开关
const minimize = false;

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

// more info: https://github.com/isaacs/node-glob
export default {
  // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps
  // and https://webpack.github.io/docs/configuration.html#devtool
  devtool: false,
  entry: {
    demo: [
      './source/demo',
    ],
    // 库和工具, 公用率 使用频率	更新频率：高 高	低
    libs: [
      'babel-polyfill',
      'antd',
      'react',
      'react-dom',
    ],
    // 定制 UI 库和工具, 公用率 使用频率	更新频率：高 高	中
    vendor: [
      './source/utils/index.js'
    ]
  },
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: `${__dirname}/dist/static`,
    publicPath: '/public/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
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
    extractLessLib,
    extractLessStyle,
    new HtmlWebpackPlugin({
      filename: `${__dirname}/dist/demo.html`,
      template: `${__dirname}/source/demo.html`,
      inject: true,
      minify: false,
      // for code splitting
      chunks: ['libs', 'vendor', 'demo']
    })
  ]
    .concat([
      // for code splitting
      new webpack.optimize.CommonsChunkPlugin({
        // 这个数组的顺序很重要
        // new webpack.optimize.CommonsChunkPlugin invocation the vendor chunks are in reverse order
        names: ['libs', 'vendor'].reverse(),
        minChunks: Infinity
      }),
      // new InlineManifestWebpackPlugin(),
    ])
    .concat(getUglifyJsPlugin())
    .concat([
      // views/common文件夹直接拷贝到dist, to的路径相对于publicPath
      new CopyWebpackPlugin([{
        context: './views/',
        from: './common/**/*',
        to: '../templates'
      }]),
      new CopyWebpackPlugin([{
        context: './source/vendor/',
        from: '**/*',
        to: './vendor'
      }])
    ]),
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'source'),
        exclude: [
          path.resolve(__dirname, './source/vendor'),
          /node_modules/,
        ],
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
      // 只处理./source/assets/css/lib
      // for css lib splitting
      {
        test: /\.less$/,
        include: [
          path.resolve(__dirname, './source/assets/css/lib'),
          path.join(__dirname, 'node_modules/antd')
        ],
        use: extractLessLib.extract({
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
              minimize: minimize,
              modifyVars: themeVariables
            }
          }],
          fallback: 'style-loader'
        })
      },
      // 处理'./source/assets/css/lib'之外的less文件
      // for css page splitting
      {
        test: /\.less$/,
        exclude: [
          path.resolve(__dirname, './source/assets/css/lib'),
          path.join(__dirname, 'node_modules/antd')
        ],
        use: extractLessStyle.extract({
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
