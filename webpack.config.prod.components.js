import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// 压缩混淆代码开关
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
const isProduction = process.env.NODE_ENV === 'production';

// more info: https://github.com/isaacs/node-glob
export default {
  mode: isProduction ? 'production' : 'development',
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
    lessStyle,
  ]
    .concat(getUglifyJsPlugin()),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        include: [
          path.join(__dirname, './source'),
        ]
      },
      {
        test: /\.jsx?$/,
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
