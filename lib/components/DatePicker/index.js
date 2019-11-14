"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DatePicker = _interopRequireDefault(require("./DatePicker.js"));

var _DateRangePicker = _interopRequireDefault(require("./DateRangePicker.js"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_DatePicker["default"].DateRangePicker = _DateRangePicker["default"];
var _default = _DatePicker["default"];
exports["default"] = _default;