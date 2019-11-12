"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTransitionGroup = require("react-transition-group");

var _child = _interopRequireDefault(require("./child"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var noop = function noop() {};

var FirstChild = function FirstChild(props) {
  var childrenArray = _react.default.Children.toArray(props.children);

  return childrenArray[0] || null;
};

var Animate =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Animate, _Component);

  function Animate() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Animate.prototype;

  _proto.normalizeNames = function normalizeNames(names) {
    if (typeof names === 'string') {
      return {
        appear: names + "-appear",
        appearActive: names + "-appear-active",
        enter: names + "-enter",
        enterActive: names + "-enter-active",
        leave: names + "-leave",
        leaveActive: names + "-leave-active"
      };
    }

    if (typeof names === 'object') {
      return {
        appear: names.appear,
        appearActive: names.appear + "-active",
        enter: "" + names.enter,
        enterActive: names.enter + "-active",
        leave: "" + names.leave,
        leaveActive: names.leave + "-active"
      };
    }
  };

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        animation = _this$props.animation,
        children = _this$props.children,
        animationAppear = _this$props.animationAppear,
        singleMode = _this$props.singleMode,
        component = _this$props.component,
        beforeAppear = _this$props.beforeAppear,
        onAppear = _this$props.onAppear,
        afterAppear = _this$props.afterAppear,
        beforeEnter = _this$props.beforeEnter,
        onEnter = _this$props.onEnter,
        afterEnter = _this$props.afterEnter,
        beforeLeave = _this$props.beforeLeave,
        onLeave = _this$props.onLeave,
        afterLeave = _this$props.afterLeave,
        others = _objectWithoutPropertiesLoose(_this$props, ["animation", "children", "animationAppear", "singleMode", "component", "beforeAppear", "onAppear", "afterAppear", "beforeEnter", "onEnter", "afterEnter", "beforeLeave", "onLeave", "afterLeave"]);

    var animateChildren = _react.Children.map(children, function (child) {
      return _react.default.createElement(_child.default, {
        key: child.key,
        names: _this.normalizeNames(animation),
        onAppear: beforeAppear,
        onAppearing: onAppear,
        onAppeared: afterAppear,
        onEnter: beforeEnter,
        onEntering: onEnter,
        onEntered: afterEnter,
        onExit: beforeLeave,
        onExiting: onLeave,
        onExited: afterLeave
      }, child);
    });

    return _react.default.createElement(_reactTransitionGroup.TransitionGroup, _extends({
      appear: animationAppear,
      component: singleMode ? FirstChild : component
    }, others), animateChildren);
  };

  return Animate;
}(_react.Component);

_defineProperty(Animate, "propTypes", {
  animation: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  animationAppear: _propTypes.default.bool,
  component: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.string]),
  singleMode: _propTypes.default.bool,
  children: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.arrayOf(_propTypes.default.element)]),
  beforeAppear: _propTypes.default.func,
  onAppear: _propTypes.default.func,
  afterAppear: _propTypes.default.func,
  beforeEnter: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  afterEnter: _propTypes.default.func,
  beforeLeave: _propTypes.default.func,
  onLeave: _propTypes.default.func,
  afterLeave: _propTypes.default.func
});

_defineProperty(Animate, "defaultProps", {
  animationAppear: true,
  component: 'span',
  singleMode: true,
  beforeAppear: noop,
  onAppear: noop,
  afterAppear: noop,
  beforeEnter: noop,
  onEnter: noop,
  afterEnter: noop,
  beforeLeave: noop,
  onLeave: noop,
  afterLeave: noop
});

var _default = Animate;
exports.default = _default;