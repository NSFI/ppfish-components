const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const externals = {
  react: {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react',
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom',
  }
};
const lessStyle = new ExtractTextPlugin({
  filename: '[name].min.css',
  allChunks: true
});

// fixme: https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/294
module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        uglifyOptions: {
          compress: {
            warnings: false
          }
        }
      })
    ],
    // splitChunks: {
    //   chunks: 'all'
    // }
  },
  // 输出 Source Map
  // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps
  // and https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',
  entry: {
    ppfish: './source/components/index.js'
  },
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    library: 'ppfish',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    chunkFilename: '[id].min.js',
  },
  externals: externals,
  plugins: [
    lessStyle,
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader'
        }]
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
              minimize: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              minimize: true
            }
          }, {
            loader: 'less-loader',
            options: {
              minimize: true
            }
          }],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]
      }
    ]
  }
};
