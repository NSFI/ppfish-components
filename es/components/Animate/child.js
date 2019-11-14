function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { supportAni, addClass, removeClass, guid } from '../../utils';

var noop = function noop() {};

function _off(node, eventName, callback, useCapture) {
  if (node.removeEventListener) {
    node.removeEventListener(eventName, callback, useCapture || false);
  }
}

function on(node, eventName, callback, useCapture) {
  if (node.addEventListener) {
    node.addEventListener(eventName, callback, useCapture || false);
  }

  return {
    off: function off() {
      return _off(node, eventName, callback, useCapture);
    }
  };
}

function getStyleProperty(node, name) {
  var prefixes = ['-webkit-', '-moz-', '-o-', 'ms-', ''];
  var style = window.getComputedStyle(node);
  var ret = '';

  for (var i = 0; i < prefixes.length; i++) {
    ret = style.getPropertyValue(prefixes[i] + name);

    if (ret) {
      break;
    }
  }

  return ret;
}

var AnimateChild =
/*#__PURE__*/
function (_Component) {
  _inherits(AnimateChild, _Component);

  function AnimateChild(props) {
    var _this2;

    _classCallCheck(this, AnimateChild);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(AnimateChild).call(this, props));

    _defineProperty(_assertThisInitialized(_this2), "generateEndListener", function (node, done, eventName, id) {
      var _this = _assertThisInitialized(_this2);

      return function endListener(e) {
        if (e && e.target === node) {
          if (_this.timeoutMap[id]) {
            clearTimeout(_this.timeoutMap[id]);
            delete _this.timeoutMap[id];
          }

          done();

          _off(node, eventName, endListener);

          var listeners = _this.endListeners[eventName];
          var index = listeners.indexOf(endListener);
          index > -1 && listeners.splice(index, 1);
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this2), "addEndListener", function (node, done) {
      if (supportAni.transition || supportAni.animation) {
        var id = guid();
        _this2.node = node;

        if (supportAni.transition) {
          var transitionEndListener = _this2.generateEndListener(node, done, 'transitionend', id);

          on(node, 'transitionend', transitionEndListener);

          _this2.endListeners.transitionend.push(transitionEndListener);
        }

        if (supportAni.animation) {
          var animationEndListener = _this2.generateEndListener(node, done, 'animationend', id);

          on(node, 'animationend', animationEndListener);

          _this2.endListeners.animationend.push(animationEndListener);
        }

        setTimeout(function () {
          var transitionDelay = parseFloat(getStyleProperty(node, 'transition-delay')) || 0;
          var transitionDuration = parseFloat(getStyleProperty(node, 'transition-duration')) || 0;
          var animationDelay = parseFloat(getStyleProperty(node, 'animation-delay')) || 0;
          var animationDuration = parseFloat(getStyleProperty(node, 'animation-duration')) || 0;
          var time = Math.max(transitionDuration + transitionDelay, animationDuration + animationDelay);
          _this2.timeoutMap[id] = setTimeout(function () {
            done();
          }, time * 1000 + 200);
        }, 15);
      } else {
        done();
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "removeEndtListener", function () {
      _this2.transitionOff && _this2.transitionOff();
      _this2.animationOff && _this2.animationOff();
    });

    _defineProperty(_assertThisInitialized(_this2), "removeClassNames", function (node, names) {
      Object.keys(names).forEach(function (key) {
        removeClass(node, names[key]);
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "handleEnter", function (node, isAppearing) {
      var names = _this2.props.names;

      if (names) {
        _this2.removeClassNames(node, names);

        var className = isAppearing ? 'appear' : 'enter';
        addClass(node, names[className]);
      }

      var hook = isAppearing ? _this2.props.onAppear : _this2.props.onEnter;
      hook(node);
    });

    _defineProperty(_assertThisInitialized(_this2), "handleEntering", function (node, isAppearing) {
      setTimeout(function () {
        var names = _this2.props.names;

        if (names) {
          var className = isAppearing ? 'appearActive' : 'enterActive';
          addClass(node, names[className]);
        }

        var hook = isAppearing ? _this2.props.onAppearing : _this2.props.onEntering;
        hook(node);
      }, 10);
    });

    _defineProperty(_assertThisInitialized(_this2), "handleEntered", function (node, isAppearing) {
      var names = _this2.props.names;

      if (names) {
        var classNames = isAppearing ? [names.appear, names.appearActive] : [names.enter, names.enterActive];
        classNames.forEach(function (className) {
          removeClass(node, className);
        });
      }

      var hook = isAppearing ? _this2.props.onAppeared : _this2.props.onEntered;
      hook(node);
    });

    _defineProperty(_assertThisInitialized(_this2), "handleExit", function (node) {
      var names = _this2.props.names;

      if (names) {
        _this2.removeClassNames(node, names);

        addClass(node, names.leave);
      }

      _this2.props.onExit(node);
    });

    _defineProperty(_assertThisInitialized(_this2), "handleExiting", function (node) {
      setTimeout(function () {
        var names = _this2.props.names;

        if (names) {
          addClass(node, names.leaveActive);
        }

        _this2.props.onExiting(node);
      }, 10);
    });

    _defineProperty(_assertThisInitialized(_this2), "handleExited", function (node) {
      var names = _this2.props.names;

      if (names) {
        [names.leave, names.leaveActive].forEach(function (className) {
          removeClass(node, className);
        });
      }

      _this2.props.onExited(node);
    });

    _this2.endListeners = {
      transitionend: [],
      animationend: []
    };
    _this2.timeoutMap = {};
    return _this2;
  }

  _createClass(AnimateChild, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      Object.keys(this.endListeners).forEach(function (eventName) {
        _this3.endListeners[eventName].forEach(function (listener) {
          _off(_this3.node, eventName, listener);
        });
      });
      this.endListeners = {
        transitionend: [],
        animationend: []
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          names = _this$props.names,
          onAppear = _this$props.onAppear,
          onAppeared = _this$props.onAppeared,
          onAppearing = _this$props.onAppearing,
          onEnter = _this$props.onEnter,
          onEntering = _this$props.onEntering,
          onEntered = _this$props.onEntered,
          onExit = _this$props.onExit,
          onExiting = _this$props.onExiting,
          onExited = _this$props.onExited,
          others = _objectWithoutProperties(_this$props, ["names", "onAppear", "onAppeared", "onAppearing", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited"]);

      return React.createElement(Transition, _extends({}, others, {
        onEnter: this.handleEnter,
        onEntering: this.handleEntering,
        onEntered: this.handleEntered,
        onExit: this.handleExit,
        onExiting: this.handleExiting,
        onExited: this.handleExited,
        addEndListener: this.addEndListener
      }));
    }
  }]);

  return AnimateChild;
}(Component);

_defineProperty(AnimateChild, "propTypes", {
  names: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onAppear: PropTypes.func,
  onAppearing: PropTypes.func,
  onAppeared: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func
});

_defineProperty(AnimateChild, "defaultProps", {
  onAppear: noop,
  onAppearing: noop,
  onAppeared: noop,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
});

export { AnimateChild as default };