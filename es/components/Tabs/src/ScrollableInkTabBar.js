"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _InkTabBarNode = _interopRequireDefault(require("./InkTabBarNode"));

var _TabBarTabsNode = _interopRequireDefault(require("./TabBarTabsNode"));

var _TabBarRootNode = _interopRequireDefault(require("./TabBarRootNode"));

var _ScrollableTabBarNode = _interopRequireDefault(require("./ScrollableTabBarNode"));

var _SaveRef = _interopRequireDefault(require("./SaveRef"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ScrollableInkTabBar =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ScrollableInkTabBar, _React$Component);

  function ScrollableInkTabBar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ScrollableInkTabBar.prototype;

  _proto.render = function render() {
    var _this = this;

    var showInkBar = this.props.showInkBar;
    return _react.default.createElement(_SaveRef.default, null, function (saveRef, getRef) {
      return _react.default.createElement(_TabBarRootNode.default, _extends({
        saveRef: saveRef
      }, _this.props), _react.default.createElement(_ScrollableTabBarNode.default, _extends({
        saveRef: saveRef,
        getRef: getRef
      }, _this.props), _react.default.createElement(_TabBarTabsNode.default, _extends({
        saveRef: saveRef
      }, _this.props)), showInkBar ? _react.default.createElement(_InkTabBarNode.default, _extends({
        saveRef: saveRef,
        getRef: getRef
      }, _this.props)) : null));
    });
  };

  return ScrollableInkTabBar;
}(_react.default.Component);

exports.default = ScrollableInkTabBar;

_defineProperty(ScrollableInkTabBar, "propTypes", {
  showInkBar: _propTypes.default.bool
});