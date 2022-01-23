const getPlainComponentsList = (list = {}) => {
  const plainComponentsArray = [];
  Object.keys(list).map(key => {
    const tmpListArr = list[key];
    tmpListArr.forEach(components => {
      if (components && components.children) {
        plainComponentsArray.push(...components.children);
      } else {
        plainComponentsArray.push(components);
      }
    });
  });

  return plainComponentsArray;
};

export const components = {
  development: [
    {
      key: 'quickStart',
      type: 'markdown',
      name: '快速上手',
      published: true,
    },
    {
      key: 'changelog',
      type: 'react',
      name: '更新日志',
      component: require('./changeLog'),
      published: true,
    }, {
      key: 'contributing',
      type: 'markdown',
      name: '贡献指南',
      published: true,
    },
    {
      key: 'resource',
      type: 'markdown',
      name: '设计资源',
      published: true,
    }, {
      key: 'i18n',
      type: 'markdown',
      name: '国际化',
      published: true,
    }, {
      key: 'customTheme',
      type: 'markdown',
      name: '定制主题',
      published: true,
    }
  ],
  patterns: [
    {
      key: '设计要素 Factor',
      children: [
        {
          key: 'ruleColor',
          type: 'react',
          name: 'Color 色彩',
          component: require('./ruleColor'),
          published: true,
        },
        {
          key: 'ruleText',
          type: 'react',
          name: 'Typography 字体',
          component: require('./ruleText'),
          published: true,
        }
      ]
    }, {
      key: '交互规则 Rule',
      children: [
        {
          key: 'ruleNumber',
          type: 'react',
          name: 'Number 数字',
          component: require('./ruleNumber'),
          published: true,
        },
        {
          key: 'ruleDatetime',
          type: 'react',
          name: 'DateTime 日期时间',
          component: require('./ruleDatetime'),
          published: true,
        },
        {
          key: 'ruleDateFilter',
          type: 'react',
          name: 'DateFilter 日期筛选',
          component: require('./ruleDateFilter'),
          published: true,
        },
        {
          key: 'ruleTable',
          type: 'react',
          name: 'Table 表格',
          component: require('./ruleTable'),
          published: true,
        }
      ]
    }],
  general: [
    {
      key: '基础组件 General',
      children: [
        {
          key: 'animate',
          type: 'markdown',
          name: 'Animate 动画',
          published: true,
        },
        {
          key: 'button',
          type: 'markdown',
          name: 'Button 按钮',
          published: true,
        },
        {
          key: 'icon',
          type: 'markdown',
          name: 'Icon 图标',
          published: true,
        },
        {
          key: 'divider',
          type: 'markdown',
          name: 'Divider 分割线',
          published: true,
        },
        {
          key: 'picturePreview',
          type: 'markdown',
          name: 'PicturePreview 图片查看器',
          style: require('./picturePreview/index.less'),
          published: true,
          props: {
            source: [
              {
                "src": "//ysf.qiyukf.net/3df2280d2319678a091138b0bbba82fe",
                "name": "pic1"
              },
              {
                "src": "//ysf.qiyukf.net/080b89be8a980ab9951a1b0de643d939",
                "name": "pic2"
              },
              {
                "src": "//ysf.qiyukf.net/260c0731b07b2933fe04f1a4d629450c",
                "name": "pic3"
              }
            ]
          }
        },
        {
          key: 'imageLoader',
          type: 'markdown',
          name: 'ImageLoader 图片加载器',
          published: true,
        },
        {
          key: 'colorPicker',
          type: 'markdown',
          name: 'ColorPicker 颜色选择器',
          published: true,
        }, {
          key: 'richEditor',
          type: 'markdown',
          name: 'RichEditor 富文本编辑器',
          published: true,
        },
        {
          key: 'audioPlayer',
          type: 'markdown',
          name: 'AudioPlayer 音频播放器',
          published: true,
        },
        {
          key: 'videoViewer',
          type: 'markdown',
          name: 'VideoViewer 视频查看器',
          published: true,
        },
        {
          key: 'guide',
          type: 'markdown',
          name: 'Guide 引导',
          published: true,
        }
      ]
    }, {
      key: '布局规范 Layout',
      children: [
        {
          key: 'grid',
          type: 'markdown',
          name: 'Grid 栅格系统',
          published: true
        },
        {
          key: 'layout',
          type: 'markdown',
          name: 'Layout 布局模式',
          published: true
        }
      ]
    }, {
      key: '导航 Navigation',
      children: [
        {
          key: 'affix',
          type: 'markdown',
          name: 'Affix 固钉',
          published: true,
        },
        {
          key: 'menu',
          type: 'markdown',
          name: 'Menu 导航菜单',
          published: true,
        },
        {
          key: 'dropdown',
          type: 'markdown',
          name: 'Dropdown 下拉菜单',
          published: true,
        },
        {
          key: 'breadcrumb',
          type: 'markdown',
          name: 'Breadcrumb 面包屑',
          published: true,
        },
        {
          key: 'loadMore',
          type: 'markdown',
          name: 'LoadMore 加载更多',
          published: true,
        },
        {
          key: 'tabs',
          type: 'markdown',
          name: 'Tabs 标签页',
          published: true,
        },
        {
          key: 'steps',
          type: 'markdown',
          name: 'Steps 步骤条',
          published: true,
        },
        {
          key: 'anchor',
          type: 'markdown',
          name: 'Anchor 锚点',
          published: true,
        },
        {
          key: 'backTop',
          type: 'markdown',
          name: 'BackTop 回到顶部',
          published: true,
        },
        {
          key: 'pagination',
          type: 'markdown',
          name: 'Pagination 分页',
          published: true,
        },
      ]
    }, {
      key: '数据录入 Data Entry',
      children: [
        {
          key: 'autoComplete',
          type: 'markdown',
          name: 'AutoComplete 自动完成',
          props: {
            debounce: require('lodash/debounce')
          },
          published: true,
        },
        {
          key: 'cascader',
          type: 'markdown',
          name: 'Cascader 级联选择',
          published: true,
        },
        {
          key: 'checkbox',
          type: 'markdown',
          name: 'Checkbox 多选框',
          published: true,
        },
        {
          key: 'datePicker',
          type: 'markdown',
          name: 'DatePicker 日期选择框',
          published: true,
        },
        {
          key: 'form',
          type: 'markdown',
          name: 'Form 表单',
          published: true,
        },
        {
          key: 'formHook',
          type: 'markdown',
          name: 'FormHook 表单',
          published: true,
        },
        {
          key: 'input',
          type: 'markdown',
          name: 'Input 输入框',
          published: true,
        },
        {
          key: 'inputNumber',
          type: 'markdown',
          name: 'InputNumber 数字输入框',
          published: true,
        },
        {
          key: 'radio',
          type: 'markdown',
          name: 'Radio 单选框',
          published: true,
        },
        {
          key: 'select',
          type: 'markdown',
          name: 'Select 选择器',
          props: {
            utils: require('../../source/utils'),
            debounce: require('lodash/debounce')
          },
          published: true,
        },
        {
          key: 'slider',
          type: 'markdown',
          name: 'Slider 滑动输入条',
          published: true,
        },
        {
          key: 'switch',
          type: 'markdown',
          name: 'Switch 开关',
          published: true,
        },
        {
          key: 'timePicker',
          type: 'markdown',
          name: 'TimePicker 时间选择器',
          published: true,
        }, {
          key: 'transfer',
          type: 'markdown',
          name: 'Transfer 穿梭框',
          published: true,
        }, {
          key: 'treeSelect',
          type: 'markdown',
          name: 'TreeSelect 树选择',
          props: {
            debounce: require('lodash/debounce')
          },
          published: true,
        },
        {
          key: 'upload',
          type: 'markdown',
          name: 'Upload 上传',
          published: true,
        },
        {
          key: 'footerToolbar',
          type: 'markdown',
          name: 'FooterToolbar 底部工具栏',
          published: true,
        },
      ]
    }, {
      key: '数据展示 Data Display',
      children: [
        {
          key: 'avatar',
          type: 'markdown',
          name: 'Avatar 头像',
          published: true,
        },
        {
          key: 'badge',
          type: 'markdown',
          name: 'Badge 徽标',
          published: true,
        },
        // {
        //   key: 'calendar',
        //   type: 'markdown',
        //   name: 'Calendar 日历',
        // },
        {
          key: 'carousel',
          type: 'markdown',
          name: 'Carousel 走马灯',
          published: true,
        },
        {
          key: 'collapse',
          type: 'markdown',
          name: 'Collapse 折叠面板',
          published: true,
        },
        {
          key: 'drawer',
          type: 'markdown',
          name: 'Drawer 抽屉',
          published: true,
        },
        {
          key: 'echart',
          type: 'markdown',
          name: 'Echart 图表',
          published: true,
        },
        {
          key: 'list',
          type: 'markdown',
          name: 'List 列表',
          published: true,
        },
        {
          key: 'table',
          type: 'markdown',
          name: 'Table 表格',
          published: true,
        },
        {
          key: 'tag',
          type: 'markdown',
          name: 'Tag 标签',
          published: true,
        },
        {
          key: 'timeline',
          type: 'markdown',
          name: 'Timeline 时间轴',
          published: true,
        },
        {
          key: 'popover',
          type: 'markdown',
          name: 'Popover 气泡卡片',
          published: true,
        },
        {
          key: 'tooltip',
          type: 'markdown',
          name: 'Tooltip 文字提示',
          published: true,
        }, {
          key: 'tree',
          type: 'markdown',
          name: 'Tree 树形控件',
          props: {
            debounce: require('lodash/debounce')
          },
          published: true,
        },
        {
          key: 'trend',
          type: 'markdown',
          name: 'Trend 趋势标记',
          published: true,
        },
        {
          key: 'ellipsis',
          type: 'markdown',
          name: 'Ellipsis 文本自动省略号',
          published: true,
        }
      ]
    }, {
      key: '操作反馈 Feedback',
      children: [
        {
          key: 'alert',
          type: 'markdown',
          name: 'Alert 警告提示',
          published: true,
        },
        {
          key: 'message',
          type: 'markdown',
          name: 'Message 全局提示框',
          published: true,
        },
        {
          key: 'modal',
          type: 'markdown',
          name: 'Modal 对话框',
          published: true,
        },
        {
          key: 'notification',
          type: 'markdown',
          name: 'Notification 通知提醒框',
          published: true,
        },
        {
          key: 'progress',
          type: 'markdown',
          name: 'Progress 进度条',
          published: true
        },
        {
          key: 'spin',
          type: 'markdown',
          name: 'Spin 加载中',
          published: true,
        }]
    }, {
      key: '其他',
      children: [
        {
          key: 'configProvider',
          type: 'markdown',
          name: 'ConfigProvider 全局化配置',
          published: true,
        }
      ]
    }
  ],
};

export const plainComponents = getPlainComponentsList(components);

