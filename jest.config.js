module.exports = {
	moduleNameMapper: {
	  "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tools/assetsTransformer.js",
	  "\\.(css|less)$": "<rootDir>/tools/assetsTransformer.js"
	},
	moduleFileExtensions: ["js"],
	testMatch: [ "**/__tests__/**/*.js", "**/?(*.)+(test).js" ],
  verbose: true,
  notify: false,
  collectCoverage: false,
  collectCoverageFrom: [
    "<rootDir>/source/components/**/*.js",
    "!<rootDir>/source/components/**/demo/*.js",
    "!<rootDir>/source/components/ReactAmap/components/utils/*.js",
    "!<rootDir>/node_modules/**",
    "!<rootDir>/tools/*",
    "!<rootDir>/doc/*"
  ],
  coverageDirectory: '<rootDir>/coverage',
};
