const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { parseDir } = require('./tools/helps');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const demoPath = './site/docs/demoPage/';
const os = require('os');
const HappyPack = require('happypack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

let happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
// WSL下这个uglifyJS有问题。
// https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/302
let uglifyJSRunParallel = (os.platform() === 'linux' && os.release().toLowerCase().includes('microsoft')) ? false : true;

const getHappyPackPlugin = () => [
  new HappyPack({
    id: 'happyTS',
    loaders: [
      {
        loader: 'ts-loader',
        options: { happyPackMode: true }
      }
    ],
    threadPool: happyThreadPool,
    verbose: true,
  }),
  new HappyPack({
    id: 'happyJS',
    loaders: [
      {
        loader: 'babel-loader',
      }
    ],
    threadPool: happyThreadPool,
    verbose: true,
  }),
  new HappyPack({
    id: 'happyLESS',
    loaders: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: false
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: false
        }
      }, {
        loader: 'less-loader',
        options: {
          sourceMap: false,
          javascriptEnabled: true,
        }
      }
    ],
    threadPool: happyThreadPool,
    verbose: true,
  }),
  new ForkTsCheckerWebpackPlugin()
];


const getHtmlWebpackPlugin = () => {
  const demoNameArr = [];
  parseDir(demoPath, demoNameArr);
  const htmlWebpackPlugin = demoNameArr
    .filter((name) => {
      return name.slice(-3) === '.js';
    })
    .map((name) => {
      const demoName = name.slice(0, -3);
      return new HtmlWebpackPlugin({
        filename: 'demo/' + demoName + '.html',
        template: path.join(__dirname, demoPath + 'demo.html'),
        chunks: [demoName, 'commons', 'sources']
      });
    });
  return htmlWebpackPlugin;
};

const getDemoEntries = () => {
  const entries = {};
  const demoNameArr = [];
  parseDir(demoPath, demoNameArr);
  const arr = demoNameArr.filter((name) => {
    return name.slice(-3) === '.js';
  }
  );
  for (let each of arr) {
    entries[each.slice(0, -3)] = [demoPath + each];
  }
  return entries;
};

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            unused: false
          },
          sourceMap: false,
          mangle: {
            keep_fnames: true
          },
          output: {
            comments: false
          }
        },
        parallel: uglifyJSRunParallel
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 2,
          name: 'commons',
          chunks: 'all'
        },
        sources: {
          priority: 10,
          name: 'sources',
          test: /source/,
          chunks: 'all'
        },
      }
    }
  },
  entry: Object.assign({},
    {
      site: path.join(__dirname, 'site')
    },
    getDemoEntries()
  ),
  output: {
    path: path.resolve(__dirname, 'dist/site'),
    chunkFilename: '[name].[chunkhash:12].js',
    filename: '[name].[chunkhash:12].js'
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // }),
    new webpack.ProgressPlugin((percentage, message, ...args) => {
      console.log(`${(percentage * 100).toFixed(2)}%`, message, ...args); // eslint-disable-line
    }),
    new ExtractTextPlugin({
      filename: '[chunkhash:12].css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './site/static'),
      to: 'static'
    }]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'site/index.html'),
      favicon: path.join(__dirname, 'site/assets/favicon.ico'),
      chunks: ['site', 'commons', 'sources']
    })
  ].concat(getHtmlWebpackPlugin())
    .concat(getHappyPackPlugin()),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'happypack/loader?id=happyTS',
        include: [
          path.join(__dirname, './site'),
          path.join(__dirname, './source'),
          path.join(__dirname, './libs')
        ]
      },
      {
        test: /\.jsx?$/,
        loader: 'happypack/loader?id=happyJS',
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
          loader: 'happypack/loader?id=happyLESS',
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]
      },
      {
        test: /\.svg$/,
        oneOf: [
          // oneOf uses the first matching rule. So for your use case put the
          // resourceQuery: /module/ into the first entry and no resourceQuery
          // at all into the second. – Daniel Jul 5 '17 at 15:52
          {
            test: /static[/\\]icons/,
            use: [
              "babel-loader",
              {
                loader: "react-svg-loader",
                options: {
                  svgo: {
                    plugins: [
                      { removeDimensions: true },
                      {
                        addAttributesToSVGElement: {
                          attributes: [
                            'fill="currentColor"',
                            'height="16"',
                            'width="16"'
                          ]
                        },
                      }, {
                        removeAttrs: {
                          attrs: 'path:fill'
                        }
                      }]
                  }
                }
              }]
          },
          {
            use: 'file-loader?name=[hash:12].[ext]'
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)(\?.+)?$/,
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