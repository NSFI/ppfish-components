/* eslint-disable import/no-commonjs */
/* eslint-env node */
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer({
      // Tell Autoprefixer not to remove outdated prefixes
      // We don't include any by default, so this just speeds up build time
      remove: false
    })
  ]
}
