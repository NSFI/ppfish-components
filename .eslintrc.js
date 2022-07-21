module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  // 识别ts中特有的规则
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/camelcase': 'off',
    'react/prop-types': 'off',
    'react/jsx-no-target-blank': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'no-case-declarations': 'off',
    'no-prototype-builtins': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-inner-declarations': 'off',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'prefer-const': 'off',
    'react/no-find-dom-node': 'off',
    'react/no-string-refs': 'off',
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    'no-constant-condition': [
      'error',
      {
        checkLoops: false,
      },
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
          Function: false,
        },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
