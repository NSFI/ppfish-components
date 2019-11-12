"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Select = _interopRequireDefault(require("./Select"));

var _Option = _interopRequireDefault(require("./Option"));

exports.Option = _Option.default;

var _OptGroup = _interopRequireDefault(require("./OptGroup"));

exports.OptGroup = _OptGroup.default;

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Select.default.Option = _Option.default;
_Select.default.OptGroup = _OptGroup.default;
var _default = _Select.default;
exports.default = _default;