"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Select = _interopRequireDefault(require("./Select.js"));

var _Option = _interopRequireDefault(require("./Option.js"));

exports.Option = _Option.default;

var _PropTypes = require("./PropTypes.js");

exports.SelectPropTypes = _PropTypes.SelectPropTypes;

var _OptGroup = _interopRequireDefault(require("./OptGroup.js"));

exports.OptGroup = _OptGroup.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Select.default.Option = _Option.default;
_Select.default.OptGroup = _OptGroup.default;
var _default = _Select.default;
exports.default = _default;