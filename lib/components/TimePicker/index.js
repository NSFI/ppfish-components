"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _TimeSelect = _interopRequireDefault(require("../DatePicker/TimeSelect.js"));

var _TimePicker = _interopRequireDefault(require("../DatePicker/TimePicker.js"));

require("../DatePicker/style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_TimePicker["default"].TimeSelect = _TimeSelect["default"];
var _default = _TimePicker["default"];
exports["default"] = _default;