export default {
  //url读key
  documents: {
    'quick-start': require('./quickStart'),
    'changelog': require('./changelog'),
    'contributing': require('./contributing'),
    'resource': require('./resource'),
    'customTheme': require('./customTheme'),
  },
  components: {
    '通用组件': {
      'animationImageLoader': require('./animationImageLoader'),
      'affix': require('./affix'),
      'button': require('./button'),
      'loading': require('./loading'),
    }
  }
};
