function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'rc-animate';
import { polyfill } from 'react-lifecycles-compat';
import Spin from '../../Spin/index.js';
import { nodeContextTypes } from './contextTypes';
import { toArray, getNodeChildren, getDataAndAria, mapChildren, warnOnlyTreeNode } from './util';
var ICON_OPEN = 'open';
var ICON_CLOSE = 'close';
var defaultTitle = '---';

var TreeNode =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TreeNode, _React$Component);

  function TreeNode(_props) {
    var _this;

    _classCallCheck(this, TreeNode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TreeNode).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "onSelectorClick", function (e) {
      // Click trigger before select/check operation
      var onNodeClick = _this.context.rcTree.onNodeClick;
      onNodeClick(e, _assertThisInitialized(_this));

      if (_this.isSelectable()) {
        _this.onSelect(e);
      } else {
        _this.onCheck(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectorDoubleClick", function (e) {
      var onNodeDoubleClick = _this.context.rcTree.onNodeDoubleClick;
      onNodeDoubleClick(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (e) {
      if (_this.isDisabled()) return;
      var onNodeSelect = _this.context.rcTree.onNodeSelect;
      e.preventDefault();
      onNodeSelect(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onCheck", function (e) {
      if (_this.isDisabled()) return;
      var _this$props = _this.props,
          disableCheckbox = _this$props.disableCheckbox,
          checked = _this$props.checked;
      var _this$context$rcTree = _this.context.rcTree,
          checkable = _this$context$rcTree.checkable,
          onNodeCheck = _this$context$rcTree.onNodeCheck;
      if (!checkable || disableCheckbox) return;
      e.preventDefault();
      var targetChecked = !checked;
      onNodeCheck(e, _assertThisInitialized(_this), targetChecked);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (e) {
      var onNodeMouseEnter = _this.context.rcTree.onNodeMouseEnter;
      onNodeMouseEnter(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function (e) {
      var onNodeMouseLeave = _this.context.rcTree.onNodeMouseLeave;
      onNodeMouseLeave(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onContextMenu", function (e) {
      var onNodeContextMenu = _this.context.rcTree.onNodeContextMenu;
      onNodeContextMenu(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onDragStart", function (e) {
      var onNodeDragStart = _this.context.rcTree.onNodeDragStart;
      e.stopPropagation();

      _this.setState({
        dragNodeHighlight: true
      });

      onNodeDragStart(e, _assertThisInitialized(_this));

      try {
        // ie throw error
        // firefox-need-it
        e.dataTransfer.setData('text/plain', '');
      } catch (error) {// empty
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDragEnter", function (e) {
      var onNodeDragEnter = _this.context.rcTree.onNodeDragEnter;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragEnter(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onDragOver", function (e) {
      var onNodeDragOver = _this.context.rcTree.onNodeDragOver;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragOver(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onDragLeave", function (e) {
      var onNodeDragLeave = _this.context.rcTree.onNodeDragLeave;
      e.stopPropagation();
      onNodeDragLeave(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onDragEnd", function (e) {
      var onNodeDragEnd = _this.context.rcTree.onNodeDragEnd;
      e.stopPropagation();

      _this.setState({
        dragNodeHighlight: false
      });

      onNodeDragEnd(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onDrop", function (e) {
      var onNodeDrop = _this.context.rcTree.onNodeDrop;
      e.preventDefault();
      e.stopPropagation();

      _this.setState({
        dragNodeHighlight: false
      });

      onNodeDrop(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onExpand", function (e) {
      var onNodeExpand = _this.context.rcTree.onNodeExpand;
      onNodeExpand(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "setSelectHandle", function (node) {
      _this.selectHandle = node;
    });

    _defineProperty(_assertThisInitialized(_this), "getNodeChildren", function () {
      var children = _this.props.children;
      var originList = toArray(children).filter(function (node) {
        return node;
      });
      var targetList = getNodeChildren(originList);

      if (originList.length !== targetList.length) {
        warnOnlyTreeNode();
      }

      return targetList;
    });

    _defineProperty(_assertThisInitialized(_this), "getNodeState", function () {
      var expanded = _this.props.expanded;

      if (_this.isLeaf()) {
        return null;
      }

      return expanded ? ICON_OPEN : ICON_CLOSE;
    });

    _defineProperty(_assertThisInitialized(_this), "isLeaf", function () {
      var _this$props2 = _this.props,
          isLeaf = _this$props2.isLeaf,
          loaded = _this$props2.loaded;
      var loadData = _this.context.rcTree.loadData;
      var hasChildren = _this.getNodeChildren().length !== 0; // if (isLeaf === false) {
      //   return false;
      // }

      return isLeaf || !loadData && !hasChildren || loadData && loaded && !hasChildren;
    });

    _defineProperty(_assertThisInitialized(_this), "isDisabled", function () {
      var disabled = _this.props.disabled;
      var treeDisabled = _this.context.rcTree.disabled; // Follow the logic of Selectable

      if (disabled === false) {
        return false;
      }

      return !!(treeDisabled || disabled);
    });

    _defineProperty(_assertThisInitialized(_this), "syncLoadData", function (props) {
      var expanded = props.expanded,
          loading = props.loading,
          loaded = props.loaded;
      var _this$context$rcTree2 = _this.context.rcTree,
          loadData = _this$context$rcTree2.loadData,
          onNodeLoad = _this$context$rcTree2.onNodeLoad;
      if (loading) return; // read from state to avoid loadData at same time

      if (loadData && expanded && !_this.isLeaf()) {
        // We needn't reload data when has children in sync logic
        // It's only needed in node expanded
        var hasChildren = _this.getNodeChildren().length !== 0;

        if (!hasChildren && !loaded) {
          onNodeLoad(_assertThisInitialized(_this));
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderSwitcher", function () {
      var _this$props3 = _this.props,
          expanded = _this$props3.expanded,
          switcherIconFromProps = _this$props3.switcherIcon;
      var _this$context$rcTree3 = _this.context.rcTree,
          prefixCls = _this$context$rcTree3.prefixCls,
          switcherIconFromCtx = _this$context$rcTree3.switcherIcon;
      var switcherIcon = switcherIconFromProps || switcherIconFromCtx;

      if (_this.isLeaf()) {
        return React.createElement("span", {
          className: classNames("".concat(prefixCls, "-switcher"), "".concat(prefixCls, "-switcher-noop"))
        }, typeof switcherIcon === 'function' ? React.createElement(switcherIcon, _objectSpread({}, _this.props, {
          isLeaf: true
        })) : switcherIcon);
      }

      var switcherCls = classNames("".concat(prefixCls, "-switcher"), "".concat(prefixCls, "-switcher_").concat(expanded ? ICON_OPEN : ICON_CLOSE));
      return React.createElement("span", {
        onClick: _this.onExpand,
        className: switcherCls
      }, typeof switcherIcon === 'function' ? React.createElement(switcherIcon, _objectSpread({}, _this.props, {
        isLeaf: false
      })) : switcherIcon);
    });

    _defineProperty(_assertThisInitialized(_this), "renderCheckbox", function () {
      var _this$props4 = _this.props,
          checked = _this$props4.checked,
          halfChecked = _this$props4.halfChecked,
          disableCheckbox = _this$props4.disableCheckbox;
      var _this$context$rcTree4 = _this.context.rcTree,
          prefixCls = _this$context$rcTree4.prefixCls,
          checkable = _this$context$rcTree4.checkable;

      var disabled = _this.isDisabled();

      if (!checkable) return null; // [Legacy] Custom element should be separate with `checkable` in future

      var $custom = typeof checkable !== 'boolean' ? checkable : null;
      return React.createElement("span", {
        className: classNames("".concat(prefixCls, "-checkbox"), checked && "".concat(prefixCls, "-checkbox-checked"), !checked && halfChecked && "".concat(prefixCls, "-checkbox-indeterminate"), (disabled || disableCheckbox) && "".concat(prefixCls, "-checkbox-disabled")),
        onClick: _this.onCheck
      }, $custom);
    });

    _defineProperty(_assertThisInitialized(_this), "renderIcon", function () {
      var _this$props5 = _this.props,
          loading = _this$props5.loading,
          icon = _this$props5.icon;
      var _this$context$rcTree5 = _this.context.rcTree,
          prefixCls = _this$context$rcTree5.prefixCls,
          showIcon = _this$context$rcTree5.showIcon,
          treeIcon = _this$context$rcTree5.icon,
          loadData = _this$context$rcTree5.loadData;
      var currentIcon = icon || treeIcon;
      var customIcon = null,
          loadingIcon = null;

      if (showIcon && currentIcon) {
        customIcon = React.createElement("span", {
          className: classNames("".concat(prefixCls, "-iconEle"), "".concat(prefixCls, "-icon__customize"))
        }, typeof currentIcon === 'function' ? React.createElement(currentIcon, _objectSpread({}, _this.props)) : currentIcon);
      }

      if (loadData && loading) {
        loadingIcon = React.createElement(Spin, {
          className: prefixCls + '-spinning',
          size: "small"
        });
      }

      return React.createElement("span", {
        className: "".concat(prefixCls, "-iconCtner")
      }, loadingIcon, customIcon);
      /* 废弃的 loading icon
      return (
        <span
          className={classNames(
            `${prefixCls}-iconEle`,
            `${prefixCls}-icon__${this.getNodeState() || 'docu'}`,
            loading && `${prefixCls}-icon_loading`,
          )}
        />
      );
      */
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelector", function () {
      var dragNodeHighlight = _this.state.dragNodeHighlight;
      var _this$props6 = _this.props,
          title = _this$props6.title,
          selected = _this$props6.selected;
      var _this$context$rcTree6 = _this.context.rcTree,
          prefixCls = _this$context$rcTree6.prefixCls,
          draggable = _this$context$rcTree6.draggable;

      var disabled = _this.isDisabled();

      var wrapClass = "".concat(prefixCls, "-node-content-wrapper");

      var $icon = _this.renderIcon();

      var $title = React.createElement("span", {
        className: "".concat(prefixCls, "-title")
      }, title);
      return React.createElement("span", {
        ref: _this.setSelectHandle,
        title: typeof title === 'string' ? title : '',
        className: classNames("".concat(wrapClass), "".concat(wrapClass, "-").concat(_this.getNodeState() || 'normal'), !disabled && (selected || dragNodeHighlight) && "".concat(prefixCls, "-node-selected"), !disabled && draggable && 'draggable'),
        draggable: !disabled && draggable || undefined,
        "aria-grabbed": !disabled && draggable || undefined,
        onMouseEnter: _this.onMouseEnter,
        onMouseLeave: _this.onMouseLeave,
        onContextMenu: _this.onContextMenu,
        onClick: _this.onSelectorClick,
        onDoubleClick: _this.onSelectorDoubleClick,
        onDragStart: draggable ? _this.onDragStart : undefined
      }, $icon, $title);
    });

    _defineProperty(_assertThisInitialized(_this), "renderChildren", function () {
      var _this$props7 = _this.props,
          expanded = _this$props7.expanded,
          pos = _this$props7.pos;
      var _this$context$rcTree7 = _this.context.rcTree,
          prefixCls = _this$context$rcTree7.prefixCls,
          openTransitionName = _this$context$rcTree7.openTransitionName,
          openAnimation = _this$context$rcTree7.openAnimation,
          renderTreeNode = _this$context$rcTree7.renderTreeNode;
      var animProps = {};

      if (openTransitionName) {
        animProps.transitionName = openTransitionName;
      } else if (_typeof(openAnimation) === 'object') {
        animProps.animation = _objectSpread({}, openAnimation);
      } // Children TreeNode


      var nodeList = _this.getNodeChildren();

      if (nodeList.length === 0) {
        return null;
      }

      var $children;

      if (expanded) {
        $children = React.createElement("ul", {
          className: classNames("".concat(prefixCls, "-child-tree"), expanded && "".concat(prefixCls, "-child-tree-open")),
          "data-expanded": expanded,
          role: "group"
        }, mapChildren(nodeList, function (node, index) {
          return renderTreeNode(node, index, pos);
        }));
      }

      return React.createElement(Animate, _extends({}, animProps, {
        showProp: "data-expanded",
        component: ""
      }), $children);
    });

    _this.state = {
      dragNodeHighlight: false
    };
    return _this;
  }

  _createClass(TreeNode, [{
    key: "getChildContext",
    value: function getChildContext() {
      return _objectSpread({}, this.context, {
        rcTreeNode: {// onUpCheckConduct: this.onUpCheckConduct,
        }
      });
    } // Isomorphic needn't load data in server side

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.syncLoadData(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.syncLoadData(this.props);
    }
  }, {
    key: "isSelectable",
    value: function isSelectable() {
      var selectable = this.props.selectable;
      var treeSelectable = this.context.rcTree.selectable; // Ignore when selectable is undefined or null

      if (typeof selectable === 'boolean') {
        return selectable;
      }

      return treeSelectable;
    } // Load data to avoid default expanded tree without data

  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var loading = this.props.loading;

      var _this$props8 = this.props,
          className = _this$props8.className,
          style = _this$props8.style,
          dragOver = _this$props8.dragOver,
          dragOverGapTop = _this$props8.dragOverGapTop,
          dragOverGapBottom = _this$props8.dragOverGapBottom,
          isLeaf = _this$props8.isLeaf,
          expanded = _this$props8.expanded,
          selected = _this$props8.selected,
          checked = _this$props8.checked,
          halfChecked = _this$props8.halfChecked,
          otherProps = _objectWithoutProperties(_this$props8, ["className", "style", "dragOver", "dragOverGapTop", "dragOverGapBottom", "isLeaf", "expanded", "selected", "checked", "halfChecked"]);

      var _this$context$rcTree8 = this.context.rcTree,
          prefixCls = _this$context$rcTree8.prefixCls,
          filterTreeNode = _this$context$rcTree8.filterTreeNode,
          draggable = _this$context$rcTree8.draggable;
      var disabled = this.isDisabled();
      var dataOrAriaAttributeProps = getDataAndAria(otherProps);
      return React.createElement("li", _extends({
        className: classNames(className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-treenode-disabled"), disabled), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-switcher-").concat(expanded ? 'open' : 'close'), !isLeaf), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-checkbox-checked"), checked), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-checkbox-indeterminate"), halfChecked), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-selected"), selected), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-loading"), loading), _defineProperty(_classNames, 'drag-over', !disabled && dragOver), _defineProperty(_classNames, 'drag-over-gap-top', !disabled && dragOverGapTop), _defineProperty(_classNames, 'drag-over-gap-bottom', !disabled && dragOverGapBottom), _defineProperty(_classNames, 'filter-node', filterTreeNode && filterTreeNode(this)), _classNames)),
        style: style,
        role: "treeitem",
        onDragEnter: draggable ? this.onDragEnter : undefined,
        onDragOver: draggable ? this.onDragOver : undefined,
        onDragLeave: draggable ? this.onDragLeave : undefined,
        onDrop: draggable ? this.onDrop : undefined,
        onDragEnd: draggable ? this.onDragEnd : undefined
      }, dataOrAriaAttributeProps), this.renderSwitcher(), this.renderCheckbox(), this.renderSelector(), this.renderChildren());
    }
  }]);

  return TreeNode;
}(React.Component);

_defineProperty(TreeNode, "propTypes", {
  eventKey: PropTypes.string,
  // Pass by parent `cloneElement`
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  root: PropTypes.object,
  onSelect: PropTypes.func,
  // By parent
  expanded: PropTypes.bool,
  selected: PropTypes.bool,
  checked: PropTypes.bool,
  loaded: PropTypes.bool,
  loading: PropTypes.bool,
  halfChecked: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.node,
  pos: PropTypes.string,
  dragOver: PropTypes.bool,
  dragOverGapTop: PropTypes.bool,
  dragOverGapBottom: PropTypes.bool,
  // By user
  isLeaf: PropTypes.bool,
  selectable: PropTypes.bool,
  disabled: PropTypes.bool,
  disableCheckbox: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  switcherIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
});

_defineProperty(TreeNode, "contextTypes", nodeContextTypes);

_defineProperty(TreeNode, "childContextTypes", nodeContextTypes);

_defineProperty(TreeNode, "defaultProps", {
  title: defaultTitle
});

TreeNode.isTreeNode = 1;
polyfill(TreeNode);
export default TreeNode;