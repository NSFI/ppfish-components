"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _warning = _interopRequireDefault(require("warning"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calcPoints = function calcPoints(vertical, marks, dots, step, min, max) {
  (0, _warning.default)(dots ? step > 0 : true, '`Slider[step]` should be a positive number in order to make Slider[dots] work.');
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

    var offset = Math.abs(point - min) / range * 100 + "%";
    var isActived = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
    var style = vertical ? Object.assign({
      bottom: offset
    }, dotStyle) : Object.assign({
      left: offset
    }, dotStyle);

    if (isActived) {
      style = Object.assign({}, style, {}, activeDotStyle);
    }

    var pointClassName = (0, _classnames.default)((_classNames = {}, _classNames[prefixCls + "-dot"] = true, _classNames[prefixCls + "-dot-active"] = isActived, _classNames));
    return _react.default.createElement("span", {
      className: pointClassName,
      style: style,
      key: point
    });
  });
  return _react.default.createElement("div", {
    className: prefixCls + "-step"
  }, elements);
};

Steps.propTypes = {
  prefixCls: _propTypes.default.string,
  vertical: _propTypes.default.bool,
  marks: _propTypes.default.object,
  dots: _propTypes.default.bool,
  step: _propTypes.default.number,
  included: _propTypes.default.bool,
  lowerBound: _propTypes.default.number,
  upperBound: _propTypes.default.number,
  max: _propTypes.default.number,
  min: _propTypes.default.number,
  dotStyle: _propTypes.default.object,
  activeDotStyle: _propTypes.default.object
};
var _default = Steps;
exports.default = _default;