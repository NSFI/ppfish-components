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

import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import AnimateChild from './child';

var noop = function noop() {};

var FirstChild = function FirstChild(props) {
  var childrenArray = React.Children.toArray(props.children);
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

      var animateChildren = Children.map(children, function (child) {
        return React.createElement(AnimateChild, {
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
      return React.createElement(TransitionGroup, _extends({
        appear: animationAppear,
        component: singleMode ? FirstChild : component
      }, others), animateChildren);
    }
  }]);

  return Animate;
}(Component);

_defineProperty(Animate, "propTypes", {
  animation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  animationAppear: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  singleMode: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  beforeAppear: PropTypes.func,
  onAppear: PropTypes.func,
  afterAppear: PropTypes.func,
  beforeEnter: PropTypes.func,
  onEnter: PropTypes.func,
  afterEnter: PropTypes.func,
  beforeLeave: PropTypes.func,
  onLeave: PropTypes.func,
  afterLeave: PropTypes.func
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

export default Animate;