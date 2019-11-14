"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _rcTreeSelect = _interopRequireWildcard(require("./rcTreeSelect"));

var _classnames = _interopRequireDefault(require("classnames"));

var _warning = _interopRequireDefault(require("warning"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var TreeSelect =
/** @class */
function (_super) {
  __extends(TreeSelect, _super);

  function TreeSelect(props) {
    var _this = _super.call(this, props) || this;

    _this.saveTreeSelect = function (node) {
      _this.rcTreeSelect = node;
    };

    (0, _warning["default"])(props.multiple !== false || !props.treeCheckable, '`multiple` will alway be `true` when `treeCheckable` is true');
    return _this;
  }

  TreeSelect.prototype.focus = function () {
    this.rcTreeSelect.focus();
  };

  TreeSelect.prototype.blur = function () {
    this.rcTreeSelect.blur();
  };

  TreeSelect.prototype.render = function () {
    var _a;

    var _b = this.props,
        prefixCls = _b.prefixCls,
        className = _b.className,
        size = _b.size,
        notFoundContent = _b.notFoundContent,
        dropdownStyle = _b.dropdownStyle,
        dropdownClassName = _b.dropdownClassName,
        treeCheckable = _b.treeCheckable,
        restProps = __rest(_b, ["prefixCls", "className", "size", "notFoundContent", "dropdownStyle", "dropdownClassName", "treeCheckable"]);

    var isEditableMul = (restProps.multiple || treeCheckable) && restProps.editable;
    var cls = (0, _classnames["default"])((_a = {}, _a[prefixCls + "-ctner"] = true, _a[prefixCls + "-scroll"] = isEditableMul, _a[prefixCls + "-singleline"] = !isEditableMul, _a[prefixCls + "-lg"] = size === 'large', _a[prefixCls + "-sm"] = size === 'small', _a), className);
    var checkable = treeCheckable;

    if (checkable) {
      checkable = React.createElement("span", {
        className: prefixCls + "-tree-checkbox-inner"
      });
    }

    return React.createElement(_rcTreeSelect["default"], __assign({}, restProps, {
      dropdownClassName: (0, _classnames["default"])(dropdownClassName, prefixCls + "-tree-dropdown"),
      prefixCls: prefixCls,
      className: cls,
      dropdownStyle: __assign({
        maxHeight: '100vh',
        overflow: 'auto'
      }, dropdownStyle),
      treeCheckable: checkable,
      notFoundContent: notFoundContent,
      ref: this.saveTreeSelect
    }));
  };

  TreeSelect.TreeNode = _rcTreeSelect.TreeNode;
  TreeSelect.SHOW_ALL = _rcTreeSelect.SHOW_ALL;
  TreeSelect.SHOW_PARENT = _rcTreeSelect.SHOW_PARENT;
  TreeSelect.SHOW_CHILD = _rcTreeSelect.SHOW_CHILD;
  TreeSelect.defaultProps = {
    autoClearSearchValue: false,
    autoExpandParent: false,
    choiceTransitionName: 'zoom',
    editable: true,
    esc: true,
    required: false,
    placeholder: '请选择',
    prefixCls: 'fishd-treeselect',
    searchPlaceholder: '请输入关键字',
    showCheckedStrategy: _rcTreeSelect.SHOW_PARENT,
    showSearch: false,
    tagWidth: 100,
    transitionName: 'slide-up',
    treeCheckStrictly: false,
    treeNodeResetTitle: '不选择任何分类',
    placement: 'bottomLeft',
    uniqueTreeNodeByLabel: false,
    getPopupContainer: function getPopupContainer() {
      return document.body;
    }
  };
  return TreeSelect;
}(React.Component);

var _default = TreeSelect;
exports["default"] = _default;