"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTransitionGroup = require("react-transition-group");

var _child = _interopRequireDefault(require("./child"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var noop = function noop() {};

var FirstChild = function FirstChild(props) {
  var childrenArray = _react["default"].Children.toArray(props.children);

  return childrenArray[0] || null;
};

var Animate =
/*#__PURE__*/
function (_Component) {
  _inherits(Animate, _Component);

  function Animate() {
    _classCallCheck(this, Animate);

    return _possibleConstructorReturn(this, _getPrototypeOf(Animate).apply(this, arguments));
  }

  _createClass(Animate, [{
    key: "normalizeNames",
    value: function normalizeNames(names) {
      if (typeof names === 'string') {
        return {
          appear: "".concat(names, "-appear"),
          appearActive: "".concat(names, "-appear-active"),
          enter: "".concat(names, "-enter"),
          enterActive: "".concat(names, "-enter-active"),
          leave: "".concat(names, "-leave"),
          leaveActive: "".concat(names, "-leave-active")
        };
      }

      if (_typeof(names) === 'object') {
        return {
          appear: names.appear,
          appearActive: "".concat(names.appear, "-active"),
          enter: "".concat(names.enter),
          enterActive: "".concat(names.enter, "-active"),
          leave: "".concat(names.leave),
          leaveActive: "".concat(names.leave, "-active")
        };
      }
    }
  }, {
    key: "render",
    value: function render() {
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
          others = _objectWithoutProperties(_this$props, ["animation", "children", "animationAppear", "singleMode", "component", "beforeAppear", "onAppear", "afterAppear", "beforeEnter", "onEnter", "afterEnter", "beforeLeave", "onLeave", "afterLeave"]);

      var animateChildren = _react.Children.map(children, function (child) {
        return _react["default"].createElement(_child["default"], {
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

      return _react["default"].createElement(_reactTransitionGroup.TransitionGroup, _extends({
        appear: animationAppear,
        component: singleMode ? FirstChild : component
      }, others), animateChildren);
    }
  }]);

  return Animate;
}(_react.Component);

_defineProperty(Animate, "propTypes", {
  animation: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  animationAppear: _propTypes["default"].bool,
  component: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].string]),
  singleMode: _propTypes["default"].bool,
  children: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].arrayOf(_propTypes["default"].element)]),
  beforeAppear: _propTypes["default"].func,
  onAppear: _propTypes["default"].func,
  afterAppear: _propTypes["default"].func,
  beforeEnter: _propTypes["default"].func,
  onEnter: _propTypes["default"].func,
  afterEnter: _propTypes["default"].func,
  beforeLeave: _propTypes["default"].func,
  onLeave: _propTypes["default"].func,
  afterLeave: _propTypes["default"].func
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
exports["default"] = _default;