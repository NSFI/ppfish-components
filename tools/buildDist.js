// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
// this assures React is built in prod mode and that the Babel dev config doesn't apply.
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const ora = require('ora');
const config = require('../webpack.config.prod.dist');
const {chalkError, chalkSuccess, chalkWarning, chalkProcessing} = require('./chalkConfig');
// const copyComponentsStyle = require('./copyComponentsStyle');

console.log(chalkProcessing('dist: Generating minified bundle for production via Webpack. This will take a moment...'));

const spinner = ora('building dist for production...');
spinner.start();

webpack(config).run((error, stats) => {
  if (error) { // so a fatal error occurred. Stop here.
    console.log(chalkError(error));
    process.exit(1);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    jsonStats.errors.map(error => console.log(chalkError(error)));
    process.exit(1);
    return;
  }

  if (jsonStats.hasWarnings) {
    console.log(chalkWarning('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
  }
  spinner.start('dist: Copying style files...');
  // try{
  //   copyComponentsStyle();
  // }catch(e){
  //   console.log(chalkError(e));
  //   process.exit(1);
  //   return;
  // }
  spinner.stop();

  console.log(stats.toString({
    colors: true,
    hash: true,
    version: true,
    children: false,
    chunks: false,
    modules: false,
    chunkModules: false
  }));

  // if we got this far, the build succeeded.
  console.log(chalkSuccess('Your app is compiled in production mode in /dist. It\'s ready to roll!'));

  return 0;
});
