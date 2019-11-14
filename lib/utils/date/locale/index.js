"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _format = _interopRequireDefault(require("./format"));

var _zhCN = _interopRequireDefault(require("./lang/zh-CN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lang = _zhCN["default"];

function use(lang) {
  _lang = lang;
}

function t(path, options) {
  var array = path.split('.');
  var current = _lang;

  for (var i = 0, j = array.length; i < j; i++) {
    var property = array[i];
    var value = current[property];
    if (i === j - 1) return (0, _format["default"])(value, options);
    if (!value) return '';
    current = value;
  }

  return '';
}

var _default = {
  use: use,
  t: t
};
exports["default"] = _default;