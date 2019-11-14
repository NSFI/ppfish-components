"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./style/index.less");

var _ColorPicker = _interopRequireDefault(require("./ColorPicker"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _QuickPanel = _interopRequireDefault(require("./QuickPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 单独使用Panel不能使用History
_ColorPicker["default"].Panel = _Panel["default"]; // 在弹出层中使用QuickPanel不能使用自定义颜色

_ColorPicker["default"].QuickPanel = _QuickPanel["default"];
var _default = _ColorPicker["default"];
exports["default"] = _default;