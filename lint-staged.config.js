// .lintstagedrc.js
module.exports = {
  // .ts .js .tsx .jsx
  'source/**/*.(j|t)s?(x)': filenames =>
    filenames.map(filename => `prettier --write '${filename}'`),
  // .less
  'source/**/*.less': filenames => filenames.map(filename => [`stylelint --fix`, 'git add']),
};
