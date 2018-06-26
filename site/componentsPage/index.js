export default {
  //url读key
  documents: {
    'quick-start': require('./quickStart'),
    'changelog': require('./changelog'),
    'contributing': require('./contributing'),
    'resource': require('./resource'),
    'CustomTheme': require('./CustomTheme'),
  },
  list: {
    '通用组件': {
      'animationImageLoader': require('./animationImageLoader'),
      'affix': require('./affix'),
      'button': require('./button'),
      'dropdown': require('./dropdown'),
      'loading': require('./loading'),
      'message': require('./message'),
    },
    '业务组件': {
      'Collapse': require('./Collapse'),
      'CustomTable': require('./CustomTable'),
      'DayTimeSelect': require('./DayTimeSelect'),
      'Drawer': require('./Drawer'),
      'Echart': require('./Echart'),
      'ImageLoader': require('./ImageLoader'),
      'NumberCounter': require('./NumberCounter'),
      'PicturePreview': require('./PicturePreview'),
      'ReactAmap': require('./ReactAmap'),
      'SearchInput': require('./SearchInput'),
      'StickVerticalMenu': require('./StickVerticalMenu'),
      'TextOverFlow': require('./TextOverFlow'),
      'TimePicker': require('./TimePicker'),
      'TreeSelect': require('./TreeSelect'),
    }
  }
};
