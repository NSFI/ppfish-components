import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import components from './components.json';

const externals = {
  'prop-types': 'prop-types',
  'react': 'react',
  'react-dom': 'react-dom'
};
Object.keys(components).forEach(function(key) {
  externals[`ppfish/source/components/${key}`] = `ppfish/lib/${key}`;
});
const lessStyle = new ExtractTextPlugin({
  filename: '[name].css',
  allChunks: true
});

// more info: https://github.com/isaacs/node-glob
export default {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false
          }
        }
      })
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  // 输出 Source Map
  // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps
  // and https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',
  entry: {
    ...components,
    util: './source/utils/api.js',
    index: './source/components/index.js'
  },
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    libraryTarget: 'commonjs2',
    path: `${__dirname}/lib`,
    filename: '[name].js',
    chunkFilename: '[id].js',
  },
  plugins: [
    lessStyle,
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  externals: externals,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'awesome-typescript-loader'
        }],
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
      }
    ]
  }
};
