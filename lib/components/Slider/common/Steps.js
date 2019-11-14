"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _warning = _interopRequireDefault(require("warning"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var calcPoints = function calcPoints(vertical, marks, dots, step, min, max) {
  (0, _warning["default"])(dots ? step > 0 : true, '`Slider[step]` should be a positive number in order to make Slider[dots] work.');
  var points = Object.keys(marks).map(parseFloat);

  if (dots) {
    for (var i = min; i <= max; i = i + step) {
      if (points.indexOf(i) >= 0) continue;
      points.push(i);
    }
  }

  return points;
};

var Steps = function Steps(_ref) {
  var prefixCls = _ref.prefixCls,
      vertical = _ref.vertical,
      marks = _ref.marks,
      dots = _ref.dots,
      step = _ref.step,
      included = _ref.included,
      lowerBound = _ref.lowerBound,
      upperBound = _ref.upperBound,
      max = _ref.max,
      min = _ref.min,
      dotStyle = _ref.dotStyle,
      activeDotStyle = _ref.activeDotStyle;
  var range = max - min;
  var elements = calcPoints(vertical, marks, dots, step, min, max).map(function (point) {
    var _classNames;

    var offset = "".concat(Math.abs(point - min) / range * 100, "%");
    var isActived = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
    var style = vertical ? _objectSpread({
      bottom: offset
    }, dotStyle) : _objectSpread({
      left: offset
    }, dotStyle);

    if (isActived) {
      style = _objectSpread({}, style, {}, activeDotStyle);
    }

    var pointClassName = (0, _classnames["default"])((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-dot"), true), _defineProperty(_classNames, "".concat(prefixCls, "-dot-active"), isActived), _classNames));
    return _react["default"].createElement("span", {
      className: pointClassName,
      style: style,
      key: point
    });
  });
  return _react["default"].createElement("div", {
    className: "".concat(prefixCls, "-step")
  }, elements);
};

Steps.propTypes = {
  prefixCls: _propTypes["default"].string,
  vertical: _propTypes["default"].bool,
  marks: _propTypes["default"].object,
  dots: _propTypes["default"].bool,
  step: _propTypes["default"].number,
  included: _propTypes["default"].bool,
  lowerBound: _propTypes["default"].number,
  upperBound: _propTypes["default"].number,
  max: _propTypes["default"].number,
  min: _propTypes["default"].number,
  dotStyle: _propTypes["default"].object,
  activeDotStyle: _propTypes["default"].object
};
var _default = Steps;
exports["default"] = _default;