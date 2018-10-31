import * as Babel from '@babel/standalone';

Babel.registerPresets({
  'env': require('@babel/preset-env'),
});

Babel.registerPlugins({
  "export-default-from": require("@babel/plugin-proposal-export-default-from"),
  "proposal-logical-assignment-operators": require("@babel/plugin-proposal-logical-assignment-operators"),
  "proposal-optional-chaining": [require("@babel/plugin-proposal-optional-chaining"), {"loose": false}],
  "proposal-pipeline-operator": [require("@babel/plugin-proposal-pipeline-operator"), {"proposal": "minimal"}],
  "proposal-nullish-coalescing-operator": [require("@babel/plugin-proposal-nullish-coalescing-operator"), {"loose": false}],
  "proposal-decorators": [require("@babel/plugin-proposal-decorators"), {"legacy": true}],
  "proposal-function-sent": require("@babel/plugin-proposal-function-sent"),
  "proposal-numeric-separator": require("@babel/plugin-proposal-numeric-separator"),
  "proposal-throw-expressions": require("@babel/plugin-proposal-throw-expressions"),
  "proposal-class-properties": [require("@babel/plugin-proposal-class-properties"), {"loose": false}],
  "proposal-json-strings": require("@babel/plugin-proposal-json-strings")
});

const babelSetting = {
  presets: ['react', 'env'],
  plugins: [
    "export-default-from",
    "proposal-logical-assignment-operators",
    "proposal-optional-chaining",
    "proposal-pipeline-operator",
    "proposal-nullish-coalescing-operator",
    "proposal-do-expressions",
    "proposal-decorators",
    "proposal-function-sent",
    "proposal-export-namespace-from",
    "proposal-numeric-separator",
    "proposal-throw-expressions",
    "syntax-dynamic-import",
    "syntax-import-meta",
    "proposal-class-properties",
    "proposal-json-strings"
  ]
};

export default {
  transform: Babel.transform,
  setting: babelSetting
};
