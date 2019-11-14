"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TreeNode", {
  enumerable: true,
  get: function get() {
    return _TreeNode["default"];
  }
});
exports["default"] = void 0;

var _Tree = _interopRequireDefault(require("./Tree.js"));

var _TreeNode = _interopRequireDefault(require("./TreeNode.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Tree["default"].TreeNode = _TreeNode["default"];
var _default = _Tree["default"];
exports["default"] = _default;