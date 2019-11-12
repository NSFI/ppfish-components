module.exports = function (api) {
  // Cache the returned value forever and don't call this function again.
  api.cache(true);
  const presets = [
    "@babel/preset-react",
    ["@babel/preset-env", {
      "modules": "commonjs",
      "targets": {
        "browsers": ["ie >=10"]
      },
      "useBuiltIns": "usage",
      "loose": true
    }]
  ];
  const plugins = [
    //"@babel/plugin-transform-flow-strip-types",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-logical-assignment-operators",
    ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
    ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
    ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
    "@babel/plugin-proposal-do-expressions",

    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",

    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { "loose": false }],
    "@babel/plugin-proposal-json-strings"
  ];

  return {
    presets,
    plugins
  };
};
