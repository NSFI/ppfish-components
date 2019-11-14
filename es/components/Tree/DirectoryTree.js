var __extends = this && this.__extends || function () {
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

var __assign = this && this.__assign || function () {
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

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import debounce from 'lodash/debounce';
import { polyfill } from 'react-lifecycles-compat';
import { conductExpandParent, convertTreeToEntities } from '../TreeSelect/rcTree/util';
import Tree from './Tree';
import { calcRangeKeys, getFullKeyList } from './util';
import Icon from '../Icon';

function getIcon(props) {
  var isLeaf = props.isLeaf,
      expanded = props.expanded;

  if (isLeaf) {
    return React.createElement(Icon, {
      type: "file-line"
    });
  }

  return React.createElement(Icon, {
    type: expanded ? 'folder-open-line' : 'folder-close-line'
  });
}

var DirectoryTree =
/** @class */
function (_super) {
  __extends(DirectoryTree, _super);

  function DirectoryTree(props) {
    var _this = _super.call(this, props) || this;

    _this.onExpand = function (expandedKeys, info) {
      var onExpand = _this.props.onExpand;

      _this.setUncontrolledState({
        expandedKeys: expandedKeys
      }); // Call origin function


      if (onExpand) {
        return onExpand(expandedKeys, info);
      }

      return undefined;
    };

    _this.onClick = function (event, node) {
      var _a = _this.props,
          onClick = _a.onClick,
          expandAction = _a.expandAction; // Expand the tree

      if (expandAction === 'click') {
        _this.onDebounceExpand(event, node);
      }

      if (onClick) {
        onClick(event, node);
      }
    };

    _this.onDoubleClick = function (event, node) {
      var _a = _this.props,
          onDoubleClick = _a.onDoubleClick,
          expandAction = _a.expandAction; // Expand the tree

      if (expandAction === 'doubleClick') {
        _this.onDebounceExpand(event, node);
      }

      if (onDoubleClick) {
        onDoubleClick(event, node);
      }
    };

    _this.onSelect = function (keys, event) {
      var _a = _this.props,
          onSelect = _a.onSelect,
          multiple = _a.multiple,
          children = _a.children;
      var _b = _this.state,
          _c = _b.expandedKeys,
          expandedKeys = _c === void 0 ? [] : _c,
          _d = _b.selectedKeys,
          selectedKeys = _d === void 0 ? [] : _d;
      var node = event.node,
          nativeEvent = event.nativeEvent;
      var _e = node.props.eventKey,
          eventKey = _e === void 0 ? '' : _e;
      var newState = {}; // Windows / Mac single pick

      var ctrlPick = nativeEvent.ctrlKey || nativeEvent.metaKey;
      var shiftPick = nativeEvent.shiftKey; // Generate new selected keys

      var newSelectedKeys = selectedKeys.slice();

      if (multiple && ctrlPick) {
        // Control click
        newSelectedKeys = keys;
        _this.lastSelectedKey = eventKey;
        _this.cachedSelectedKeys = newSelectedKeys;
      } else if (multiple && shiftPick) {
        // Shift click
        newSelectedKeys = Array.from(new Set(__spreadArrays(_this.cachedSelectedKeys || [], calcRangeKeys(children, expandedKeys, eventKey, _this.lastSelectedKey))));
      } else {
        // Single click
        newSelectedKeys = [eventKey];
        _this.lastSelectedKey = eventKey;
        _this.cachedSelectedKeys = newSelectedKeys;
      }

      newState.selectedKeys = newSelectedKeys;

      if (onSelect) {
        onSelect(newSelectedKeys, event);
      }

      _this.setUncontrolledState(newState);
    };

    _this.expandFolderNode = function (event, node) {
      var isLeaf = node.props.isLeaf;

      if (isLeaf || event.shiftKey || event.metaKey || event.ctrlKey) {
        return;
      } // Get internal rc-tree


      var internalTree = _this.tree.tree; // Call internal rc-tree expand function
      // https://github.com/ant-design/ant-design/issues/12567

      internalTree.onNodeExpand(event, node);
    };

    _this.setUncontrolledState = function (state) {
      var newState = omit(state, Object.keys(_this.props));

      if (Object.keys(newState).length) {
        _this.setState(newState);
      }
    };

    var defaultExpandAll = props.defaultExpandAll,
        defaultExpandParent = props.defaultExpandParent,
        expandedKeys = props.expandedKeys,
        defaultExpandedKeys = props.defaultExpandedKeys,
        children = props.children;
    var keyEntities = convertTreeToEntities(children).keyEntities; // Selected keys

    _this.state = {
      selectedKeys: props.selectedKeys || props.defaultSelectedKeys || []
    }; // Expanded keys

    if (defaultExpandAll) {
      _this.state.expandedKeys = getFullKeyList(props.children);
    } else if (defaultExpandParent) {
      _this.state.expandedKeys = conductExpandParent(expandedKeys || defaultExpandedKeys, keyEntities);
    } else {
      _this.state.expandedKeys = expandedKeys || defaultExpandedKeys;
    }

    _this.onDebounceExpand = debounce(_this.expandFolderNode, 200, {
      leading: true
    });
    return _this;
  }

  DirectoryTree.getDerivedStateFromProps = function (nextProps) {
    var newState = {};

    if ('expandedKeys' in nextProps) {
      newState.expandedKeys = nextProps.expandedKeys;
    }

    if ('selectedKeys' in nextProps) {
      newState.selectedKeys = nextProps.selectedKeys;
    }

    return newState;
  };

  DirectoryTree.prototype.render = function () {
    var _this = this;

    var _a = this.props,
        prefixCls = _a.prefixCls,
        className = _a.className,
        props = __rest(_a, ["prefixCls", "className"]);

    var _b = this.state,
        expandedKeys = _b.expandedKeys,
        selectedKeys = _b.selectedKeys;
    var connectClassName = classNames(prefixCls + "-directory", className);
    return React.createElement(Tree, __assign({
      icon: getIcon,
      ref: function ref(node) {
        return _this.tree = node;
      }
    }, props, {
      prefixCls: prefixCls,
      className: connectClassName,
      expandedKeys: expandedKeys,
      selectedKeys: selectedKeys,
      onSelect: this.onSelect,
      onClick: this.onClick,
      onDoubleClick: this.onDoubleClick,
      onExpand: this.onExpand
    }));
  };

  DirectoryTree.defaultProps = {
    prefixCls: 'fishd-tree',
    showIcon: true,
    expandAction: 'click'
  };
  return DirectoryTree;
}(React.Component);

polyfill(DirectoryTree);
export default DirectoryTree;