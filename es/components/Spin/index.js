"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Spin = _interopRequireDefault(require("./Spin"));

var _Container = _interopRequireDefault(require("./Container"));

var _TextLoading = _interopRequireDefault(require("./TextLoading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Spin.default.Container = _Container.default;
_Spin.default.TextLoading = _TextLoading.default;
var _default = _Spin.default;
exports.default = _default;