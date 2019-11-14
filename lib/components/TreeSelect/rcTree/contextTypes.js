"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeContextTypes = exports.treeContextTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Thought we still use `cloneElement` to pass `key`,
 * other props can pass with context for future refactor.
 */
var treeContextTypes = {
  rcTree: _propTypes["default"].shape({
    root: _propTypes["default"].object,
    prefixCls: _propTypes["default"].string,
    selectable: _propTypes["default"].bool,
    showIcon: _propTypes["default"].bool,
    icon: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
    draggable: _propTypes["default"].bool,
    checkable: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].node]),
    checkStrictly: _propTypes["default"].bool,
    disabled: _propTypes["default"].bool,
    openTransitionName: _propTypes["default"].string,
    openAnimation: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
    loadData: _propTypes["default"].func,
    filterTreeNode: _propTypes["default"].func,
    renderTreeNode: _propTypes["default"].func,
    isKeyChecked: _propTypes["default"].func,
    onNodeClick: _propTypes["default"].func,
    onNodeDoubleClick: _propTypes["default"].func,
    onNodeExpand: _propTypes["default"].func,
    onNodeSelect: _propTypes["default"].func,
    onNodeCheck: _propTypes["default"].func,
    onNodeMouseEnter: _propTypes["default"].func,
    onNodeMouseLeave: _propTypes["default"].func,
    onNodeContextMenu: _propTypes["default"].func,
    onNodeDragStart: _propTypes["default"].func,
    onNodeDragEnter: _propTypes["default"].func,
    onNodeDragOver: _propTypes["default"].func,
    onNodeDragLeave: _propTypes["default"].func,
    onNodeDragEnd: _propTypes["default"].func,
    onNodeDrop: _propTypes["default"].func // TODO: Remove this
    // onBatchNodeCheck: PropTypes.func,
    // onCheckConductFinished: PropTypes.func,
    // Tree will store the entities when the treeNode refresh.
    // User can pass the func to add more info to customize the additional info.
    // processTreeEntity: PropTypes.func,

  })
};
exports.treeContextTypes = treeContextTypes;

var nodeContextTypes = _objectSpread({}, treeContextTypes, {
  rcTreeNode: _propTypes["default"].shape({
    onUpCheckConduct: _propTypes["default"].func
  })
});

exports.nodeContextTypes = nodeContextTypes;