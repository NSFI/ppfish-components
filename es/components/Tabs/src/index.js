"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Tabs = _interopRequireDefault(require("./Tabs"));

var _TabPane = _interopRequireDefault(require("./TabPane"));

exports.TabPane = _TabPane.default;

var _TabContent = _interopRequireDefault(require("./TabContent"));

exports.TabContent = _TabContent.default;

var _ScrollableInkTabBar = _interopRequireDefault(require("./ScrollableInkTabBar"));

exports.ScrollableInkTabBar = _ScrollableInkTabBar.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _Tabs.default;
exports.default = _default;