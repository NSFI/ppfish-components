"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Upload = _interopRequireDefault(require("./Upload"));

var _Dragger = _interopRequireDefault(require("./Dragger"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Upload["default"].Dragger = _Dragger["default"];
var _default = _Upload["default"];
exports["default"] = _default;