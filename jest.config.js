module.exports = {
  setupFiles: [
    '<rootDir>/source/tests/setup.js',
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tools/assetsTransformer.js",
    "\\.(css|less)$": "<rootDir>/tools/assetsTransformer.js"
  },
  moduleFileExtensions: [
    "ts", "tsx", "js"
  ],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      "tsConfigFile": "tsconfig.json",
      "enableTsDiagnostics": true,

    },
    "NODE_ENV": "test"
  },
  testMatch: [
    "**/__tests__/**/*.(ts|tsx|js)",
    "**/?(*.)+(test).(ts|tsx|js)"
  ],
  testPathIgnorePatterns: [
      "<rootDir>/node_modules/",
  ],
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
