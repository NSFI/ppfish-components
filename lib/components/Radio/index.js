"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Radio = _interopRequireDefault(require("./Radio"));

var _Group = _interopRequireDefault(require("./Group"));

exports.Group = _Group.default;

var _RadioButton = _interopRequireDefault(require("./RadioButton"));

exports.Button = _RadioButton.default;

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Radio.default.Button = _RadioButton.default;
_Radio.default.Group = _Group.default;
var _default = _Radio.default;
exports.default = _default;