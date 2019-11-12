"use strict";

exports.__esModule = true;
exports.default = void 0;

var isNumeric = function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

var _default = isNumeric;
exports.default = _default;