"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = _interopRequireDefault(require("../Icon/index.js"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Trend = function Trend(props) {
  var _props$colorful = props.colorful,
      colorful = _props$colorful === void 0 ? true : _props$colorful,
      _props$reverseColor = props.reverseColor,
      reverseColor = _props$reverseColor === void 0 ? false : _props$reverseColor,
      flag = props.flag,
      children = props.children,
      className = props.className,
      _props$size = props.size,
      size = _props$size === void 0 ? 'small' : _props$size,
      style = props.style,
      value = props.value,
      restProps = _objectWithoutProperties(props, ["colorful", "reverseColor", "flag", "children", "className", "size", "style", "value"]);

  var cls = (0, _classnames["default"])('trend-item', {
    'trend-item-grey': !colorful,
    'reverse-color': reverseColor && colorful,
    'normal': size == 'normal',
    'large': size == 'large'
  }, className);

  var renderFlag = function renderFlag() {
    if (!flag) return;
    var iconType = null,
        mark = null;

    if (flag == 'up') {
      mark = '+';
      iconType = 'trendrise';
    } else {
      mark = '-';
      iconType = 'trenddecline';
    }

    return _react["default"].createElement("span", {
      className: flag
    }, value && typeof value == 'string' ? "".concat(mark).concat(value) : _react["default"].createElement(_index["default"], {
      type: iconType
    }));
  };

  return _react["default"].createElement("div", _extends({}, restProps, {
    className: cls,
    title: typeof children === 'string' ? children : '',
    style: style
  }), _react["default"].createElement("span", {
    className: "value"
  }, children), renderFlag());
};

Trend.propTypes = {
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  flag: _propTypes["default"].string,
  size: _propTypes["default"].string,
  value: _propTypes["default"].string,
  colorful: _propTypes["default"].bool,
  reverseColor: _propTypes["default"].bool,
  children: _propTypes["default"].node
};
var _default = Trend;
exports["default"] = _default;