"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Input = _interopRequireDefault(require("./Input"));

var _Group = _interopRequireDefault(require("./Group"));

var _Search = _interopRequireDefault(require("./Search"));

var _TextArea = _interopRequireDefault(require("./TextArea"));

var _Counter = _interopRequireDefault(require("./Counter"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Input["default"].Group = _Group["default"];
_Input["default"].Search = _Search["default"];
_Input["default"].TextArea = _TextArea["default"];
_Input["default"].Counter = _Counter["default"];
var _default = _Input["default"];
exports["default"] = _default;