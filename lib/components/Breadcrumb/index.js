"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Breadcrumb = _interopRequireDefault(require("./Breadcrumb"));

var _BreadcrumbItem = _interopRequireDefault(require("./BreadcrumbItem"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Breadcrumb["default"].Item = _BreadcrumbItem["default"];
var _default = _Breadcrumb["default"];
exports["default"] = _default;