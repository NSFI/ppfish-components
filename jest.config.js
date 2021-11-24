const refactoredComp = [
  'Affix',
  'Alert',
  'Anchor',
  'Animate',
  'AudioPlayer',
  'AutoComplete',
  'Avatar',
  'BackTop',
  'Badge',
  'Breadcrumb',
  'Button',
  'Carousel',
  'Checkbox',
  'Echart',
  'Cascader',
  'Grid',
  'Collapse',
  'Ellipsis',
  'FooterToolbar',
  'InputNumber',
  'Menu',
  'Layout',
  'Dropdown',
  'Input',
  'ImageLoader',
  'Guide',
  'Timeline',
  'message',
  'notification',
  'Slider',
];

const getRefactoredCompMatch = name => {
  if (name) {
    return [`**/${name}/__tests__/**/*.(js|jsx|ts|tsx)`];
  }
  return refactoredComp.map(compName => `**/${compName}/__tests__/**/*.(js|jsx|ts|tsx)`);
};

module.exports = {
  setupFiles: ['<rootDir>/tools/tests/setup.js', 'jest-canvas-mock'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tools/assetsTransformer.js',
    '\\.(css|less)$': '<rootDir>/tools/assetsTransformer.js',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx', 'md'],
  testURL: 'http://localhost',
  testMatch: [...getRefactoredCompMatch('**')],

  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/tools/',
    '<rootDir>/dist/',
    '<rootDir>/es/',
    '<rootDir>/lib/',
    '<rootDir>/site/',
    '<rootDir>/.history/',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.md$': '<rootDir>/tools/markdownDemoTransformer.js',
  },
  globals: {
    'ts-jest': {
      babelConfig: '.babelrc',
      tsConfig: 'tsconfig.json',
    },
  },
  verbose: true,
  notify: false,
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/source/components/*',
    '!**/node_modules/**',
    '!<rootDir>/tools/*',
    '!<rootDir>/dist/*',
    '!<rootDir>/es/*',
    '!<rootDir>/lib/*',
    '!<rootDir>/site/*',
  ],
  coverageDirectory: '<rootDir>/coverage',
};
