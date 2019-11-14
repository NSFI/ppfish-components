"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = _interopRequireDefault(require("echarts-for-react/lib/core"));

var _defaultTheme = _interopRequireDefault(require("./default-theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var EchartCore =
/*#__PURE__*/
function (_Component) {
  _inherits(EchartCore, _Component);

  function EchartCore(props) {
    var _this;

    _classCallCheck(this, EchartCore);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EchartCore).call(this, props));
    _this.echarts_react = null;
    return _this;
  }

  _createClass(EchartCore, [{
    key: "getInstance",
    value: function getInstance() {
      return this.echarts_react.getEchartsInstance();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          className = _this$props.className,
          style = _this$props.style,
          theme = _this$props.theme,
          option = _this$props.option,
          opts = _this$props.opts,
          events = _this$props.events,
          notMerge = _this$props.notMerge,
          lazyUpdate = _this$props.lazyUpdate,
          onChartReady = _this$props.onChartReady,
          loadingOption = _this$props.loadingOption,
          showLoading = _this$props.showLoading,
          echarts = _this$props.echarts;
      return _react["default"].createElement(_core["default"], {
        ref: function ref(e) {
          return _this2.echarts_react = e;
        },
        echarts: echarts,
        className: (0, _classnames["default"])(prefixCls, className),
        style: style,
        option: option,
        opts: opts,
        onEvents: events,
        theme: theme,
        notMerge: notMerge,
        lazyUpdate: lazyUpdate,
        onChartReady: onChartReady,
        loadingOption: loadingOption,
        showLoading: showLoading
      });
    }
  }]);

  return EchartCore;
}(_react.Component);

exports["default"] = EchartCore;

_defineProperty(EchartCore, "propTypes", {
  prefixCls: _propTypes["default"].string,
  option: _propTypes["default"].object,
  opts: _propTypes["default"].object,
  events: _propTypes["default"].object,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  theme: _propTypes["default"].string,
  notMerge: _propTypes["default"].bool,
  lazyUpdate: _propTypes["default"].bool,
  onChartReady: _propTypes["default"].func,
  loadingOption: _propTypes["default"].object,
  showLoading: _propTypes["default"].bool,
  echarts: _propTypes["default"].object
});

_defineProperty(EchartCore, "defaultProps", {
  prefixCls: 'fishd-chart',
  theme: _defaultTheme["default"],
  echarts: {},
  notMerge: false,
  lazyUpdate: false,
  style: {
    height: '300px'
  },
  className: '',
  onChartReady: function onChartReady() {},
  showLoading: false,
  loadingOption: null,
  onEvents: {},
  opts: {}
});