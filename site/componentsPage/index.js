/*
类型一
    'demo1': {
      type: 'markdown',
      name: 'name1',
      style:require('...')
    },
类型二
    'demo2': {
      type: 'react',
      name: 'name2',
      style:require('...'),
      component:require('...')
    },
*/
export default {
  documents: {
    'quickStart': {
      type: 'markdown',
      name: '快速上手',
    },
    'changelog': {
      type: 'markdown',
      name: '更新日志',
    },
    'contributing': {
      type: 'markdown',
      name: '贡献指南',
    },
    'resource': {
      type: 'markdown',
      name: '设计资源',
    },
    'customTheme': {
      type: 'markdown',
      name: '定制主题',
    },
  },
  list: {
    '通用组件 General': {
      'alert': {
        type: 'markdown',
        name: 'Alert 警告提示',
      },
      'audioPlayer': {
        type: 'markdown',
        name: 'AudioPlayer 音频播放器',
      },
      'avatar': {
        type: 'markdown',
        name: 'Avatar 头像',
      },
      'badge': {
        type: 'markdown',
        name: 'Badge 徽标数',
      },
      'breadcrumb': {
        type: 'markdown',
        name: 'Breadcrumb 面包屑',
      },
      'button': {
        type: 'markdown',
        name: 'Button 按钮',
      },
      'calendar': {
        type: 'markdown',
        name: 'Calendar 日历',
      },
      'card': {
        type: 'markdown',
        name: 'Card 卡片',
      },
      'carousel': {
        type: 'markdown',
        name: 'Carousel 走马灯',
      },
      'cascader': {
        type: 'markdown',
        name: 'Cascader 级联选择',
      },
      'colorPicker': {
        type: 'markdown',
        name: 'ColorPicker 颜色选择器',
      },
      'checkbox': {
        type: 'markdown',
        name: 'Checkbox 多选框',
      },
      'collapse': {
        type: 'markdown',
        name: 'Collapse 折叠面板',
      },
      'datePicker': {
        type: 'markdown',
        name: 'DatePicker 日期选择框',
      },
      'divider': {
        type: 'markdown',
        name: 'Divider 分隔符',
      },
      'drawer': {
        type: 'markdown',
        name: 'Drawer 抽屉组件',
      },
      'dropdown': {
        type: 'markdown',
        name: 'Dropdown 下拉菜单',
      },
      'form': {
        type: 'markdown',
        name: 'Form 表单',
      },
      'grid': {
        type: 'markdown',
        name: 'Grid 栅格系统',
      },
      'imageLoader': {
        type: 'markdown',
        name: 'ImageLoader 图片加载器',
      },
      'input': {
        type: 'markdown',
        name: 'Input 输入框',
      },
      'layout': {
        type: 'markdown',
        name: 'Layout 布局模式',
      },
      'list': {
        type: 'markdown',
        name: 'List 列表',
      },
      'menu': {
        type: 'markdown',
        name: 'Menu 导航菜单',
      },
      'message': {
        type: 'markdown',
        name: 'Message 全局提示',
      },
      'modal': {
        type: 'markdown',
        name: 'Modal 对话框',
      },
      'notification': {
        type: 'markdown',
        name: 'Notification 通知提醒框',
      },
      'pagination': {
        type: 'markdown',
        name: 'Pagination 分页',
      },
      'picturePreview': {
        type: 'markdown',
        name: 'PicturePreview 图片查看器',
        style: require('./picturePreview/index.less')
      },
      'progress': {
        type: 'markdown',
        name: 'Progress 进度条',
      },
      'radio': {
        type: 'markdown',
        name: 'Radio 单选框',
      },
      'richEditor': {
        type: 'markdown',
        name: 'RichEditor 富文本编辑器',
      },
      'select': {
        type: 'markdown',
        name: 'Select 选择器',
      },
      'slider': {
        type: 'markdown',
        name: 'Slider 滑动输入条',
      },
      'spin': {
        type: 'markdown',
        name: 'Spin 加载中',
      },
      'steps': {
        type: 'markdown',
        name: 'Steps 步骤条',
      },
      'switch': {
        type: 'markdown',
        name: 'Switch 开关',
      },
      'table': {
        type: 'markdown',
        name: 'Table 表格',
      },
      'tabs': {
        type: 'markdown',
        name: 'Tabs 标签页',
      },
      'tag': {
        type: 'markdown',
        name: 'Tag 标签',
      },
      'timeline': {
        type: 'markdown',
        name: 'Timeline 时间轴',
      },
      'timePicker': {
        type: 'markdown',
        name: 'TimePicker 时间选择框',
      },
      'tooltip': {
        type: 'markdown',
        name: 'Tooltip 文字提示',
      },
      'transfer': {
        type: 'markdown',
        name: 'Transfer 穿梭框',
      },
      'tree': {
        type: 'markdown',
        name: 'Tree 树形控件',
      },
      'treeSelect': {
        type: 'markdown',
        name: 'TreeSelect 树选择',
      },
      'upload': {
        type: 'markdown',
        name: 'Upload 上传',
      },
      'videoViewer': {
        type: 'markdown',
        name: 'VideoViewer 视频查看器',
      }
    },
    '业务组件 Business': {
      'bizLoading': {
        type: 'markdown',
        name: 'BizLoading 加载动画',
      },
      'bizTable': {
        type: 'markdown',
        name: 'BizTable 自定义表格',
      },
      'bizTimePicker': {
        type: 'markdown',
        name: 'BizTimePicker 自定义时间选择器',
      },
    }
  },
  patterns: {
    '设计要素 Factor': {
      'ruleColor': {
        type: 'react',
        name: 'Color 色彩',
        component: require('./ruleColor')
      },
      'ruleText': {
        type: 'react',
        name: 'Typography 字体',
        component: require('./ruleText')
      },
    },
    '交互规则 Rule': {
      'ruleNumber': {
        type: 'markdown',
        name: '数字',
      },
      'ruleDatetime': {
        type: 'markdown',
        name: '日期时间',
      },
    }
  }
};
