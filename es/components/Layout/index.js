"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Layout = _interopRequireDefault(require("./Layout"));

var _Sider = _interopRequireDefault(require("./Sider"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Layout.default.Sider = _Sider.default;
var _default = _Layout.default;
exports.default = _default;