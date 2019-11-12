"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Line = _interopRequireDefault(require("./Line"));

exports.Line = _Line.default;

var _Circle = _interopRequireDefault(require("./Circle"));

exports.Circle = _Circle.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Line: _Line.default,
  Circle: _Circle.default
};
exports.default = _default;