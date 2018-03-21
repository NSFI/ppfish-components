// This file configures the development web server
// which supports hot reloading and synchronized testing.

// Require Browsersync along with webpack and middleware for it
import browserSync from 'browser-sync';
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proxy from 'http-proxy-middleware';
import webpackConfig from '../webpack.config.dev';

const bundler = webpack(webpackConfig);
const ajaxPrefix = '/api';

const apiProxy = proxy(ajaxPrefix, {
  target: 'http://localhost:4000',
  changeOrigin: true,
  ws: true
});

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
  server: {
    baseDir: 'source'
  },
  middleware: [
    apiProxy,
    function(req, res, next) {
      if (/\.js|\.css/.test(req.url)) {
        return next();
      }
      if (req.url==='/') {
        req.url = '/demo.html';
      }
      return next();
    },
    // 使用historyApiFallback做SPA路由，暂时用不到
    // historyApiFallback({
    //   rewrites: [
    //     // 排除demo/路径
    //     { from: /\/demo\/?$/, to: '/demo.html'}
    //   ]
    // }),
    webpackDevMiddleware(bundler, {
      // Dev middleware can't access config, so we provide publicPath
      publicPath: webpackConfig.output.publicPath,

      // pretty colored output
      stats: { colors: true },

      // Set to false to display a list of each file that is being bundled.
      noInfo: false,

      // for other settings see
      // http://webpack.github.io/docs/webpack-dev-middleware.html
    }),

    // bundler should be the same as above
    webpackHotMiddleware(bundler),
  ],

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'source/*.html'
  ]
});
