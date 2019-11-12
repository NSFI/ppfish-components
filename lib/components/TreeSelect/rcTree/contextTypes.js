"use strict";

exports.__esModule = true;
exports.nodeContextTypes = exports.treeContextTypes = void 0;

require("core-js/modules/es6.object.assign");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Webpack has bug for import loop, which is not the same behavior as ES module.
 * When util.js imports the TreeNode for tree generate will cause treeContextTypes be empty.
 */

/**
 * Thought we still use `cloneElement` to pass `key`,
 * other props can pass with context for future refactor.
 */
var treeContextTypes = {
  rcTree: _propTypes.default.shape({
    root: _propTypes.default.object,
    prefixCls: _propTypes.default.string,
    selectable: _propTypes.default.bool,
    showIcon: _propTypes.default.bool,
    icon: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
    draggable: _propTypes.default.bool,
    checkable: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.node]),
    checkStrictly: _propTypes.default.bool,
    disabled: _propTypes.default.bool,
    openTransitionName: _propTypes.default.string,
    openAnimation: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
    loadData: _propTypes.default.func,
    filterTreeNode: _propTypes.default.func,
    renderTreeNode: _propTypes.default.func,
    isKeyChecked: _propTypes.default.func,
    onNodeClick: _propTypes.default.func,
    onNodeDoubleClick: _propTypes.default.func,
    onNodeExpand: _propTypes.default.func,
    onNodeSelect: _propTypes.default.func,
    onNodeCheck: _propTypes.default.func,
    onNodeMouseEnter: _propTypes.default.func,
    onNodeMouseLeave: _propTypes.default.func,
    onNodeContextMenu: _propTypes.default.func,
    onNodeDragStart: _propTypes.default.func,
    onNodeDragEnter: _propTypes.default.func,
    onNodeDragOver: _propTypes.default.func,
    onNodeDragLeave: _propTypes.default.func,
    onNodeDragEnd: _propTypes.default.func,
    onNodeDrop: _propTypes.default.func // TODO: Remove this
    // onBatchNodeCheck: PropTypes.func,
    // onCheckConductFinished: PropTypes.func,
    // Tree will store the entities when the treeNode refresh.
    // User can pass the func to add more info to customize the additional info.
    // processTreeEntity: PropTypes.func,

  })
};
exports.treeContextTypes = treeContextTypes;
var nodeContextTypes = Object.assign({}, treeContextTypes, {
  rcTreeNode: _propTypes.default.shape({
    onUpCheckConduct: _propTypes.default.func
  })
});
exports.nodeContextTypes = nodeContextTypes;