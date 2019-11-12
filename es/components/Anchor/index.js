"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Anchor = _interopRequireDefault(require("./Anchor"));

var _AnchorLink = _interopRequireDefault(require("./AnchorLink"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Anchor.default.Link = _AnchorLink.default;
var _default = _Anchor.default;
exports.default = _default;