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

var _index = _interopRequireDefault(require("../Button/index.js"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var noop = function noop() {};

var LoadMore =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(LoadMore, _React$Component);

  function LoadMore(props) {
    return _React$Component.call(this, props) || this;
  }

  var _proto = LoadMore.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        defaultText = _this$props.defaultText,
        onLoadMore = _this$props.onLoadMore,
        status = _this$props.status,
        buttonSize = _this$props.buttonSize,
        loadingText = _this$props.loadingText,
        errorText = _this$props.errorText,
        endText = _this$props.endText,
        extraCls = _this$props.extraCls,
        otherProps = _objectWithoutPropertiesLoose(_this$props, ["defaultText", "onLoadMore", "status", "buttonSize", "loadingText", "errorText", "endText", "extraCls"]);

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

    return _react.default.createElement("div", {
      className: (0, _classnames.default)('fishd-loadmore', (_classNames = {}, _classNames["" + extraCls] = !!extraCls, _classNames))
    }, status === 'end' ? _react.default.createElement("span", {
      className: "z-load-end"
    }, endText) : _react.default.createElement(_index.default, _extends({
      size: buttonSize,
      onClick: onLoadMore,
      loading: status === 'loading'
    }, otherProps), buttonText));
  };

  return LoadMore;
}(_react.default.Component);

exports.default = LoadMore;

_defineProperty(LoadMore, "propTypes", {
  onLoadMore: _propTypes.default.func,
  status: _propTypes.default.string,
  defaultText: _propTypes.default.string,
  loadingText: _propTypes.default.string,
  errorText: _propTypes.default.string,
  endText: _propTypes.default.string,
  extraCls: _propTypes.default.string,
  buttonSize: _propTypes.default.string
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