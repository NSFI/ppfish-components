"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Column", {
  enumerable: true,
  get: function get() {
    return _Column["default"];
  }
});
Object.defineProperty(exports, "ColumnGroup", {
  enumerable: true,
  get: function get() {
    return _ColumnGroup["default"];
  }
});
exports["default"] = void 0;

var _Table = _interopRequireDefault(require("./Table"));

var _Column = _interopRequireDefault(require("./Column"));

var _ColumnGroup = _interopRequireDefault(require("./ColumnGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Table["default"].Column = _Column["default"];
_Table["default"].ColumnGroup = _ColumnGroup["default"];
var _default = _Table["default"];
exports["default"] = _default;