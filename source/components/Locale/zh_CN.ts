import { LocaleProperties } from '.';

const localeValues: LocaleProperties = {
  locale: 'zh_CN',
  global: {
    placeholder: '请选择'
  },
  AudioPlayer: {
    notSupport: '您的浏览器不支持 audio 标签。'
  },
  AutoComplete: {
    notFoundContent: '无匹配结果'
  },
  Cascader: {
    placeholder: '请选择',
    notFoundContent: '无匹配结果'
  },
  Table: {
    filterTitle: '筛选',
    filterConfirm: '确定',
    filterReset: '重置',
    filterEmptyText: '无筛选项',
    emptyText: '暂无数据',
    selectAll: '全选当页',
    selectInvert: '反选当页',
    selectionAll: '全选所有',
    sortTitle: '排序',
    expand: '展开行',
    collapse: '关闭行',
    triggerDesc: '点击降序',
    triggerAsc: '点击升序',
    cancelSort: '取消排序',
    modalTitle: '选择需要展示的数据项',
    defaultOptionTitle: '默认展示数据项',
    okText: '确定',
    cancelText: '取消',
  },
  Modal: {
    okText: '确定',
    cancelText: '取消',
    justOkText: '知道了'
  },
  Form: {
    optional: '（可选）',
    defaultValidateMessages: {
      default: '字段验证错误${label}',
      required: '请输入${label}',
      enum: '${label}必须是其中一个[${enum}]',
      whitespace: '${label}不能为空字符'
    }
  },
  Spin: {
    loading: '加载中'
  },
  Select: {
    errorMessage: '超过选项上限',
    multipleSelectAllText: '所有选项',
    notFoundContent: '无匹配结果',
    placeholder: '请选择',
    searchPlaceholder: '请输入关键字',
    selectAllText: '选择所有',
    confirmText: '确定',
    cancelText: '取消',
    loading: '加载中...'
  }
};

export default localeValues;
