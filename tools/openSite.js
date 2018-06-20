/* eslint import/no-extraneous-dependencies: ["off"] */

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.config.dev';

const bundler = webpack(webpackConfig);

new WebpackDevServer(bundler, {
  publicPath: '/',
  hot: true,
  historyApiFallback: {
    index: '/site/'
  },
  stats: {colors: true},
  open: true
}).listen(5000, 'localhost', error => {
  if (error) {
    throw error;
  }
});
