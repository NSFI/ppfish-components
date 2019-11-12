"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Table = _interopRequireDefault(require("./Table"));

var _Column = _interopRequireDefault(require("./Column"));

exports.Column = _Column.default;

var _ColumnGroup = _interopRequireDefault(require("./ColumnGroup"));

exports.ColumnGroup = _ColumnGroup.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Table.default.Column = _Column.default;
_Table.default.ColumnGroup = _ColumnGroup.default;
var _default = _Table.default;
exports.default = _default;