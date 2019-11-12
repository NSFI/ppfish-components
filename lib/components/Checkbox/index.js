"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _Group = _interopRequireDefault(require("./Group"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Checkbox.default.Group = _Group.default;
var _default = _Checkbox.default;
exports.default = _default;