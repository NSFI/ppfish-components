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
    '通用组件 General': {
      // 'affix': require('./affix'),
      'alert': require('./alert'),
      'avatar': require('./avatar'),
      'badge': require('./badge'),
      // 'backTop': require('./backTop'),
      'breadcrumb': require('./breadcrumb'),
      'button': require('./button'),
      'calendar': require('./calendar'),
      'card': require('./card'),
      'carousel': require('./carousel'),
      'cascader': require('./cascader'),
      'checkbox': require('./checkbox'),
      'collapse': require('./collapse'),
      'datePicker': require('./datePicker'),
      'divider': require('./divider'),
      'drawer': require('./drawer'),
      'dropdown': require('./dropdown'),
      'form': require('./form'),
      'grid': require('./grid'),
      'input': require('./input'),
      'layout': require('./layout'),
      'list': require('./list'),
      'menu': require('./menu'),
      'message': require('./message'),
      'modal': require('./modal'),
      'notification': require('./notification'),
      'pagination': require('./pagination'),
      'picturePreview': require('./picturePreview'),
      'progress': require('./progress'),
      'radio': require('./radio'),
      'select': require('./select'),
      'slider': require('./slider'),
      'spin': require('./spin'),
      'steps': require('./steps'),
      'switch': require('./switch'),
      'table': require('./table'),
      'tabs': require('./tabs'),
      'tag': require('./tag'),
      'timeline': require('./timeline'),
      'timePicker': require('./timePicker'),
      'tooltip': require('./tooltip'),
      'transfer': require('./transfer'),
      'tree': require('./tree'),
      'treeSelect': require('./treeSelect'),
      'imageLoader': require('./imageLoader'),
      'upload': require('./upload'),
    },
    '业务组件 Business': {
      'bizLoading': require('./bizLoading'),
      'bizTable': require('./bizTable'),
      'bizTimePicker': require('./bizTimePicker'),
    }
  },
  patterns: {
    '设计要素 Factor': {
      'ruleColor': require('./ruleColor'),
      'ruleText': require('./ruleText')
    },
    '交互规则 Rule': {
      'ruleNumber': require('./ruleNumber'),
      'ruleDatetime': require('./ruleDatetime')
    }
  }
};
