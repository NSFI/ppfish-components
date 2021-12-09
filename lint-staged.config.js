// .lintstagedrc.js
module.exports = {
  // .ts .js .tsx .jsx
  'source/**/*.(j|t)s?(x)': () => `npm run lint`,
  // .less
  'source/**/*.less': () => `npm run stylelint`,
};
