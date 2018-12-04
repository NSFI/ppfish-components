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
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

let happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
// WSL下这个uglifyJS有问题。
let uglifyJSRunParallel = (os.platform() === 'linux' && os.release().toLowerCase().includes('microsoft')) ? false : true; //https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/302


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
        }
      }
    ],
    threadPool: happyThreadPool,
    verbose: true,
  }),
  new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })
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
        chunks: [demoName, 'libs', 'sources']
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
        libs: {
          name: 'libs', //不怎么变的基础库 包括项目React 组件库依赖的Echarts 依赖的quill
          // 目前组件库没有按需加载 导致每个页面都需要加载相同的库若干次echarts|quill|pinyin等库。等按需加载做好了，再从这里去掉
          test: /node_modules[\\/](babel-polyfill|react|react-dom|axios|react-router|redux|react-redux|react-router-redux|lodash|core-js|pinyin|echarts|zrender|quill|history|rc-animate|buffer|tinycolor2)/,
          chunks: 'all',
          priority: 3
        },
        sources: {
          name: 'sources', //不怎么变的基础库 包括项目React 组件库依赖的Echarts 依赖的quill
          // 目前组件库没有按需加载 导致每个页面都需要加载相同的库若干次echarts|quill|pinyin等库。等按需加载做好了，再从这里去掉
          test: /source/,
          chunks: 'all',
          // enforce: true,
          priority: 1
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
      console.log(`${(percentage * 100).toFixed(2)}%`, message, ...args);
    }),
    new ExtractTextPlugin({
      filename: '[chunkhash:12].css'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './site/static'),
      to: 'static'
    }]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'site/index.html'),
      favicon: path.join(__dirname, 'site/assets/favicon.ico'),
      chunks: ['site', 'libs', 'sources']
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
                    plugins: [{
                      addAttributesToSVGElement: {
                        attribute: [
                          'fill="currentColor"'
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
