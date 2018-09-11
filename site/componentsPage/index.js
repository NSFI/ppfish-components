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
  development: {
    'quickStart': {
      type: 'markdown',
      name: '快速上手',
      published: true,
    },
    'changelog': {
      type: 'markdown',
      name: '更新日志',
      style: require('./changeLog/index.less'),
      published: true,
    },
    'contributing': {
      type: 'markdown',
      name: '贡献指南',
      published: true,
    },
    'resource': {
      type: 'markdown',
      name: '设计资源',
      published: true,
    },
    'customTheme': {
      type: 'markdown',
      name: '定制主题',
      published: true,
    },
  },
  patterns: {
    '设计要素 Factor': {
      'ruleColor': {
        type: 'react',
        name: 'Color 色彩',
        component: require('./ruleColor'),
        published: true,
      },
      'ruleText': {
        type: 'react',
        name: 'Typography 字体',
        component: require('./ruleText'),
        published: true,
      },
    },
    '交互规则 Rule': {
      'ruleNumber': {
        type: 'react',
        name: 'Number 数字',
        component: require('./ruleNumber'),
        published: true,
      },
      'ruleDatetime': {
        type: 'react',
        name: 'DateTime 日期时间',
        component: require('./ruleDatetime'),
        published: true,
      },
    }
  },
  general: {
    '基础组件 General': {
      'button': {
        type: 'markdown',
        name: 'Button 按钮',
        published: true,
      },
      'icon': {
        type: 'markdown',
        name: 'Icon 图标',
        published: true,
      },
      'divider': {
        type: 'markdown',
        name: 'Divider 分割线',
      },
      'picturePreview': {
        type: 'markdown',
        name: 'PicturePreview 图片查看器',
        style: require('./picturePreview/index.less'),
        published: true,
        props: {
          source: [
            {
              "src": "//ysf.nosdn.127.net/xcdbmadptmoftklqvwwxzwlvlorxnzin",
              "name": "pic1"
            },
            {
              "src": "//ysf.nosdn.127.net/ausunifcvhchdzbexjvxcswemqeojqdf",
              "name": "pic2"
            },
            {
              "src": "//ysf.nosdn.127.net/ijonlnhjaleturyoittndfkpuhbchdkd",
              "name": "pic3"
            },
            {
              "src": "//ysf.nosdn.127.net/bqwiuevkyaimbmqcjvealfhejvxzbbth",
              "name": "pic4"
            },
            {
              "src": "//ysf.nosdn.127.net/rygnbxiwcgoudyqnzzpypmtxlwpixigf",
              "name": "pic5"
            }
          ]
        }
      },
      'imageLoader': {
        type: 'markdown',
        name: 'ImageLoader 图片加载器',
      },
      'colorPicker': {
        type: 'markdown',
        name: 'ColorPicker 颜色选择器',
      },
      'richEditor': {
        type: 'markdown',
        name: 'RichEditor 富文本编辑器',
        published: true,
      },
      'audioPlayer': {
        type: 'markdown',
        name: 'AudioPlayer 音频播放器',
      },
      'videoViewer': {
        type: 'markdown',
        name: 'VideoViewer 视频查看器',
      },
    },
    '布局规范 Layout': {
      'grid': {
        type: 'markdown',
        name: 'Grid 栅格系统',
      },
      'layout': {
        type: 'markdown',
        name: 'Layout 布局模式',
      },
    },
    '导航 Navigation': {
      'menu': {
        type: 'markdown',
        name: 'Menu 导航菜单',
        published: true,
      },
      'dropdown': {
        type: 'markdown',
        name: 'Dropdown 下拉菜单',
      },
      'breadcrumb': {
        type: 'markdown',
        name: 'Breadcrumb 面包屑',
        published: true,
      },
      'loadMore': {
        type: 'markdown',
        name: 'LoadMore 加载更多',
        published: true,
      },
      'tabs': {
        type: 'markdown',
        name: 'Tabs 标签页',
        published: true,
      },
      'steps': {
        type: 'markdown',
        name: 'Steps 步骤条',
        published: true,
      },
      'backTop': {
        type: 'markdown',
        name: 'backTop 回到顶部',
      },
      'pagination': {
        type: 'markdown',
        name: 'Pagination 分页',
        published: true,
      },
    },
    '数据录入 Data Entry': {
      'autoComplete': {
        type: 'markdown',
        name: 'AutoComplete 自动完成'
      },
      'cascader': {
        type: 'markdown',
        name: 'Cascader 级联选择',
        published: true,
      },
      'checkbox': {
        type: 'markdown',
        name: 'Checkbox 多选框',
        published: true,
      },
      'datePicker': {
        type: 'markdown',
        name: 'DatePicker 日期选择框',
        published: true,
      },
      'form': {
        type: 'markdown',
        name: 'Form 表单',
        published: true,
      },
      'input': {
        type: 'markdown',
        name: 'Input 输入框',
        published: true,
      },
      'inputNumber': {
        type: 'markdown',
        name: 'InputNumber 数字输入框',
      },
      'radio': {
        type: 'markdown',
        name: 'Radio 单选框',
        published: true,
      },
      'select': {
        type: 'markdown',
        name: 'Select 选择器',
        props: {
          utils: require('../../source/utils'),
          debounce: require('lodash/debounce')
        },
        published: true,
      },
      'slider': {
        type: 'markdown',
        name: 'Slider 滑动输入条',
      },
      'switch': {
        type: 'markdown',
        name: 'Switch 开关',
        published: true,
      },
      'timePicker': {
        type: 'markdown',
        name: 'TimePicker 时间选择器',
        published: true,
      },
      'transfer': {
        type: 'markdown',
        name: 'Transfer 穿梭框',
      },
      'treeSelect': {
        type: 'markdown',
        name: 'TreeSelect 树选择',
        published: true,
      },
      'treePane': {
        type: 'markdown',
        name: 'TreePane 树形组件 Alpha',
      },
      'upload': {
        type: 'markdown',
        name: 'Upload 上传',
        published: true,
      },
    },
    '数据展示 Data Display': {
      'avatar': {
        type: 'markdown',
        name: 'Avatar 头像',
      },
      'badge': {
        type: 'markdown',
        name: 'Badge 徽标数',
        published: true,
      },
      // 'calendar': {
      //   type: 'markdown',
      //   name: 'Calendar 日历',
      // },
      'card': {
        type: 'markdown',
        name: 'Card 卡片',
      },
      'carousel': {
        type: 'markdown',
        name: 'Carousel 走马灯',
      },
      'collapse': {
        type: 'markdown',
        name: 'Collapse 折叠面板',
        published: true,
      },
      'drawer': {
        type: 'markdown',
        name: 'Drawer 抽屉',
      },
      'echarts': {
        type: 'markdown',
        name: 'Echarts 图表',
        published: true,
      },
      'list': {
        type: 'markdown',
        name: 'List 列表',
        published: true,
      },
      'table': {
        type: 'markdown',
        name: 'Table 表格',
        published: true,
      },
      'tag': {
        type: 'markdown',
        name: 'Tag 标签',
      },
      'timeline': {
        type: 'markdown',
        name: 'Timeline 时间轴',
      },
      'popover': {
        type: 'markdown',
        name: 'Popover 气泡卡片',
        published: true,
      },
      'tooltip': {
        type: 'markdown',
        name: 'Tooltip 文字提示',
        published: true,
      },
      'tree': {
        type: 'markdown',
        name: 'Tree 树形控件',
      },
    },
    '操作反馈 Feedback': {
      'alert': {
        type: 'markdown',
        name: 'Alert 警告提示',
      },
      'message': {
        type: 'markdown',
        name: 'Message 全局提示框',
        published: true,
      },
      'modal': {
        type: 'markdown',
        name: 'Modal 对话框',
        published: true,
      },
      'notification': {
        type: 'markdown',
        name: 'Notification 通知提醒框',
      },
      'progress': {
        type: 'markdown',
        name: 'Progress 进度条',
      },
      'spin': {
        type: 'markdown',
        name: 'Spin 加载中',
        published: true,
      },
    },
  }
};
