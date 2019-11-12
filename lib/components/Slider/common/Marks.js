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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Marks = function Marks(_ref) {
  var className = _ref.className,
      vertical = _ref.vertical,
      marks = _ref.marks,
      included = _ref.included,
      upperBound = _ref.upperBound,
      lowerBound = _ref.lowerBound,
      max = _ref.max,
      min = _ref.min,
      onClickLabel = _ref.onClickLabel;
  var marksKeys = Object.keys(marks);
  var marksCount = marksKeys.length;
  var unit = marksCount > 1 ? 100 / (marksCount - 1) : 100;
  var markWidth = unit * 0.9;
  var range = max - min;
  var elements = marksKeys.map(parseFloat).sort(function (a, b) {
    return a - b;
  }).map(function (point) {
    var _classNames;

    var markPoint = marks[point];
    var markPointIsObject = typeof markPoint === 'object' && !_react.default.isValidElement(markPoint);
    var markLabel = markPointIsObject ? markPoint.label : markPoint;

    if (!markLabel && markLabel !== 0) {
      return null;
    }

    var isActive = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
    var markClassName = (0, _classnames.default)((_classNames = {}, _classNames[className + "-text"] = true, _classNames[className + "-text-active"] = isActive, _classNames));
    var bottomStyle = {
      marginBottom: '-50%',
      bottom: (point - min) / range * 100 + "%"
    };
    var leftStyle = {
      width: markWidth + "%",
      marginLeft: -markWidth / 2 + "%",
      left: (point - min) / range * 100 + "%"
    };
    var style = vertical ? bottomStyle : leftStyle;
    var markStyle = markPointIsObject ? Object.assign({}, style, {}, markPoint.style) : style;
    return _react.default.createElement("span", {
      className: markClassName,
      style: markStyle,
      key: point,
      onMouseDown: function onMouseDown(e) {
        return onClickLabel(e, point);
      },
      onTouchStart: function onTouchStart(e) {
        return onClickLabel(e, point);
      }
    }, markLabel);
  });
  return _react.default.createElement("div", {
    className: className
  }, elements);
};

Marks.propTypes = {
  className: _propTypes.default.string,
  vertical: _propTypes.default.bool,
  marks: _propTypes.default.object,
  included: _propTypes.default.bool,
  upperBound: _propTypes.default.number,
  lowerBound: _propTypes.default.number,
  max: _propTypes.default.number,
  min: _propTypes.default.number,
  onClickLabel: _propTypes.default.func
};
var _default = Marks;
exports.default = _default;