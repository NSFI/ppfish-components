module.exports = {
	moduleNameMapper: {
	  "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tools/assetsTransformer.js",
	  "\\.(css|less)$": "<rootDir>/tools/assetsTransformer.js"
	},
	testMatch: [ "**/__tests__/**/*.js?(x)", "**/?(*.)+(test).js?(x)" ],
  verbose: true,
  notify: false,
  collectCoverage: false,
  collectCoverageFrom: [
    "**/source/components/**/*.js",
    "!**/source/components/**/demo/*.js",
    "!**/node_modules/**",
    "!**/tools/**",
    "!**/doc/**"
  ],
  coverageDirectory: '<rootDir>/coverage',
};
