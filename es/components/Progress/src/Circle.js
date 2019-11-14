function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import enhancer from './enhancer';
import { propTypes, defaultProps } from './types';

var Circle =
/*#__PURE__*/
function (_Component) {
  _inherits(Circle, _Component);

  function Circle() {
    _classCallCheck(this, Circle);

    return _possibleConstructorReturn(this, _getPrototypeOf(Circle).apply(this, arguments));
  }

  _createClass(Circle, [{
    key: "getPathStyles",
    value: function getPathStyles() {
      var _this$props = this.props,
          percent = _this$props.percent,
          strokeWidth = _this$props.strokeWidth,
          _this$props$gapDegree = _this$props.gapDegree,
          gapDegree = _this$props$gapDegree === void 0 ? 0 : _this$props$gapDegree,
          gapPosition = _this$props.gapPosition;
      var radius = 50 - strokeWidth / 2;
      var beginPositionX = 0;
      var beginPositionY = -radius;
      var endPositionX = 0;
      var endPositionY = -2 * radius;

      switch (gapPosition) {
        case 'left':
          beginPositionX = -radius;
          beginPositionY = 0;
          endPositionX = 2 * radius;
          endPositionY = 0;
          break;

        case 'right':
          beginPositionX = radius;
          beginPositionY = 0;
          endPositionX = -2 * radius;
          endPositionY = 0;
          break;

        case 'bottom':
          beginPositionY = radius;
          endPositionY = 2 * radius;
          break;

        default:
      }

      var pathString = "M 50,50 m ".concat(beginPositionX, ",").concat(beginPositionY, "\n     a ").concat(radius, ",").concat(radius, " 0 1 1 ").concat(endPositionX, ",").concat(-endPositionY, "\n     a ").concat(radius, ",").concat(radius, " 0 1 1 ").concat(-endPositionX, ",").concat(endPositionY);
      var len = Math.PI * 2 * radius;
      var trailPathStyle = {
        strokeDasharray: "".concat(len - gapDegree, "px ").concat(len, "px"),
        strokeDashoffset: "-".concat(gapDegree / 2, "px"),
        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
      };
      var strokePathStyle = {
        strokeDasharray: "".concat(percent / 100 * (len - gapDegree), "px ").concat(len, "px"),
        strokeDashoffset: "-".concat(gapDegree / 2, "px"),
        transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s' // eslint-disable-line

      };
      return {
        pathString: pathString,
        trailPathStyle: trailPathStyle,
        strokePathStyle: strokePathStyle
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          strokeWidth = _this$props2.strokeWidth,
          trailWidth = _this$props2.trailWidth,
          strokeColor = _this$props2.strokeColor,
          percent = _this$props2.percent,
          trailColor = _this$props2.trailColor,
          strokeLinecap = _this$props2.strokeLinecap,
          style = _this$props2.style,
          className = _this$props2.className,
          restProps = _objectWithoutProperties(_this$props2, ["prefixCls", "strokeWidth", "trailWidth", "strokeColor", "percent", "trailColor", "strokeLinecap", "style", "className"]);

      var _this$getPathStyles = this.getPathStyles(),
          pathString = _this$getPathStyles.pathString,
          trailPathStyle = _this$getPathStyles.trailPathStyle,
          strokePathStyle = _this$getPathStyles.strokePathStyle;

      delete restProps.percent;
      delete restProps.gapDegree;
      delete restProps.gapPosition;
      return React.createElement("svg", _extends({
        className: "".concat(prefixCls, "-circle ").concat(className),
        viewBox: "0 0 100 100",
        style: style
      }, restProps), React.createElement("path", {
        className: "".concat(prefixCls, "-circle-trail"),
        d: pathString,
        stroke: trailColor,
        strokeWidth: trailWidth || strokeWidth,
        fillOpacity: "0",
        style: trailPathStyle
      }), React.createElement("path", {
        className: "".concat(prefixCls, "-circle-path"),
        d: pathString,
        strokeLinecap: strokeLinecap,
        stroke: strokeColor,
        strokeWidth: this.props.percent === 0 ? 0 : strokeWidth,
        fillOpacity: "0",
        ref: function ref(path) {
          _this.path = path;
        },
        style: strokePathStyle
      }));
    }
  }]);

  return Circle;
}(Component);

Circle.propTypes = _objectSpread({}, propTypes, {
  gapPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
});
Circle.defaultProps = _objectSpread({}, defaultProps, {
  gapPosition: 'top'
});
export default enhancer(Circle);