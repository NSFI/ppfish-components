"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcTree = require("../rcTree");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SelectNode wrapped the tree node.
 * Let's use SelectNode instead of TreeNode
 * since TreeNode is so confuse here.
 */
var SelectNode = function SelectNode(props) {
  return _react.default.createElement(_rcTree.TreeNode, props);
};

SelectNode.propTypes = Object.assign({}, _rcTree.TreeNode.propTypes, {
  value: _propTypes.default.string
}); // Let Tree trade as TreeNode to reuse this for performance saving.

SelectNode.isTreeNode = 1;
var _default = SelectNode;
exports.default = _default;