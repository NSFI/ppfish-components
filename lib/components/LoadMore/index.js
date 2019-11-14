"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("../Button/index.js"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var noop = function noop() {};

var LoadMore =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoadMore, _React$Component);

  function LoadMore(props) {
    _classCallCheck(this, LoadMore);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoadMore).call(this, props));
  }

  _createClass(LoadMore, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          defaultText = _this$props.defaultText,
          onLoadMore = _this$props.onLoadMore,
          status = _this$props.status,
          buttonSize = _this$props.buttonSize,
          loadingText = _this$props.loadingText,
          errorText = _this$props.errorText,
          endText = _this$props.endText,
          extraCls = _this$props.extraCls,
          otherProps = _objectWithoutProperties(_this$props, ["defaultText", "onLoadMore", "status", "buttonSize", "loadingText", "errorText", "endText", "extraCls"]);

      var buttonText;

      switch (status) {
        case 'default':
          buttonText = defaultText;
          break;

        case 'loading':
          buttonText = loadingText;
          break;

        case 'error':
          buttonText = errorText;
          break;

        case 'end':
          buttonText = endText;
      }

      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])('fishd-loadmore', _defineProperty({}, "".concat(extraCls), !!extraCls))
      }, status === 'end' ? _react["default"].createElement("span", {
        className: "z-load-end"
      }, endText) : _react["default"].createElement(_index["default"], _extends({
        size: buttonSize,
        onClick: onLoadMore,
        loading: status === 'loading'
      }, otherProps), buttonText));
    }
  }]);

  return LoadMore;
}(_react["default"].Component);

exports["default"] = LoadMore;

_defineProperty(LoadMore, "propTypes", {
  onLoadMore: _propTypes["default"].func,
  status: _propTypes["default"].string,
  defaultText: _propTypes["default"].string,
  loadingText: _propTypes["default"].string,
  errorText: _propTypes["default"].string,
  endText: _propTypes["default"].string,
  extraCls: _propTypes["default"].string,
  buttonSize: _propTypes["default"].string
});

_defineProperty(LoadMore, "defaultProps", {
  onLoadMore: noop,
  status: 'default',
  defaultText: '查看更多',
  loadingText: '加载中',
  errorText: '加载失败，请重试',
  endText: '没有更多了',
  buttonSize: 'default'
});