"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Tree = _interopRequireDefault(require("./Tree.js"));

var _TreeNode = _interopRequireDefault(require("./TreeNode.js"));

exports.TreeNode = _TreeNode.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Tree.default.TreeNode = _TreeNode.default;
var _default = _Tree.default;
exports.default = _default;