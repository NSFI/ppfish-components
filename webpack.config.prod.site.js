const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { parseDir } = require('./tools/helps');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const demoPath = './site/docs/demoPage/';
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
        chunks: [demoName]
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
          mangle: {
            keep_fnames: true
          },
          output: {
            comments: false
          }
        }
      })
    ]
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
      chunks: ['site']
    })
  ].concat(getHtmlWebpackPlugin()),
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
