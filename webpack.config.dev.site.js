/* eslint-disable no-console */
const webpack = require('webpack');
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { parseDir, getReplParams } = require('./tools/helps');

console.log('----------------------------------------------------------------------------------------------------------');
console.log('开发环境默认关闭demo中嵌入的iframe页面的打包，如果需要调试iframe demo, 运行npm run open:site -- --iframe=true来开启');
console.log('----------------------------------------------------------------------------------------------------------\n');

// demo中嵌入的iframe页面打包开关，默认关闭，通过REPL运行npm run open:site -- --iframe=true来开启
let iframe = false;
let replIframe = getReplParams('iframe');
if (replIframe) {
  iframe = JSON.parse(replIframe[0]);
}

const demoPath = './site/docs/demoPage/';
const getHtmlWebpackPlugin = () => {
  if (iframe) {
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
          chunks: [demoName]
        });
      });
    return htmlWebpackPlugin;
  } else {
    return [];
  }
};

const getDemoEntries = () => {
  const entries = {};
  if (iframe) {
    const demoNameArr = [];
    parseDir(demoPath, demoNameArr);
    const arr = demoNameArr.filter((name) => {
      return name.slice(-3) === '.js';
    }
    );
    for (let each of arr) {
      entries[each.slice(0, -3)] = [demoPath + each];
    }
  }
  return entries;
};

module.exports = {
  mode: 'development',
  // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps
  // and https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'cheap-module-source-map',
  entry: Object.assign({},
    {
      site: [
        'webpack-dev-server/client?http://localhost:5000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './site/index'
      ],
    },
    getDemoEntries()
  ),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'site/index.html'),
      chunks: ['site'],
      favicon: 'site/assets/favicon.ico'
    })].concat(getHtmlWebpackPlugin()),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
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
            use: 'file-loader'
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)(\?.+)?$/,
        loader: 'file-loader',
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
