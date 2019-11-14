"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Group", {
  enumerable: true,
  get: function get() {
    return _Group["default"];
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function get() {
    return _RadioButton["default"];
  }
});
exports["default"] = void 0;

var _Radio = _interopRequireDefault(require("./Radio"));

var _Group = _interopRequireDefault(require("./Group"));

var _RadioButton = _interopRequireDefault(require("./RadioButton"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Radio["default"].Button = _RadioButton["default"];
_Radio["default"].Group = _Group["default"];
var _default = _Radio["default"];
exports["default"] = _default;