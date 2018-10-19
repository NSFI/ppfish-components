module.exports = {
  setupFiles: [
    '<rootDir>/source/tests/setup.js',
  ],
  "snapshotSerializers": ["enzyme-to-json/serializer"],
	moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tools/assetsTransformer.js",
    "\\.(css|less)$": "<rootDir>/tools/assetsTransformer.js"
	},
  moduleFileExtensions: [
    "js", "jsx", "json", "ts", "tsx", "md"
  ],
  testURL:'http://localhost',
  testMatch: [
    "**/__tests__/**/*.(js|jsx|ts|tsx)",
    "**/?(*.)+(test).(js|jsx|ts|tsx)"
  ],
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  transform:{
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.md$": "<rootDir>/tools/markdownDemoTransformer.js"
  },
  globals: {
    "ts-jest": {
      babelConfig: '.babelrc',
      tsConfig: "tsconfig.json"
    },
  },
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
