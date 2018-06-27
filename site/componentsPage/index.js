export default {
  //url读key
  documents: {
    'quick-start': require('./quickStart'),
    'changelog': require('./changelog'),
    'contributing': require('./contributing'),
    'resource': require('./resource'),
    'customTheme': require('./CustomTheme'),
  },
  list: {
    '通用组件': {
      'affix': require('./affix'),
      'button': require('./button'),
      'dropdown': require('./dropdown'),
      'message': require('./message'),
    },
    '业务组件': {
      'loading': require('./loading'),
      'animationImageLoader': require('./animationImageLoader'),
      'collapse': require('./collapse'),
      'customTable': require('./customTable'),
      'dayTimeSelect': require('./dayTimeSelect'),
      'drawer': require('./drawer'),
      'echart': require('./echart'),
      'imageLoader': require('./imageLoader'),
      'numberCounter': require('./numberCounter'),
      'picturePreview': require('./picturePreview'),
      'reactAmap': require('./reactAmap'),
      'searchInput': require('./searchInput'),
      'stickVerticalMenu': require('./stickVerticalMenu'),
      'textOverFlow': require('./textOverFlow'),
      'timePicker': require('./timePicker'),
      'treeSelect': require('./treeSelect'),
    }
  }
};
