/* eslint import/no-extraneous-dependencies: ["off"] */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config.dev.site');
const {chalkSuccess} = require('./chalkConfig');
const os = require('os');
const ifaces = os.networkInterfaces();

const bundler = webpack(webpackConfig);
const PORT = 5000;

Object.keys(ifaces).forEach(function (ifname) {
  let alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(chalkSuccess(`可用的内网网址(${ifname}:${alias}): http://${iface.address}:${PORT}`));
    } else {
      // this interface has only one ipv4 adress
      console.log(chalkSuccess(`可用的内网网址(${ifname}): http://${iface.address}:${PORT}`));
    }
    ++alias;
  });
});

new WebpackDevServer(bundler, {
  publicPath: '/',
  hot: true,
  historyApiFallback: {
    index: '/site/'
  },
  stats: {colors: true},
  open: true,
}).listen(PORT, '0.0.0.0', error => {
  if (error) {
    throw error;
  }
});
