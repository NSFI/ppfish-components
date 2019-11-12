"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = _interopRequireDefault(require("echarts-for-react/lib/core"));

var _defaultTheme = _interopRequireDefault(require("./default-theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EchartCore =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(EchartCore, _Component);

  function EchartCore(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.echarts_react = null;
    return _this;
  }

  var _proto = EchartCore.prototype;

  _proto.getInstance = function getInstance() {
    return this.echarts_react.getEchartsInstance();
  };

  _proto.render = function render() {
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
    return _react.default.createElement(_core.default, {
      ref: function ref(e) {
        return _this2.echarts_react = e;
      },
      echarts: echarts,
      className: (0, _classnames.default)(prefixCls, className),
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
  };

  return EchartCore;
}(_react.Component);

exports.default = EchartCore;

_defineProperty(EchartCore, "propTypes", {
  prefixCls: _propTypes.default.string,
  option: _propTypes.default.object,
  opts: _propTypes.default.object,
  events: _propTypes.default.object,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  theme: _propTypes.default.string,
  notMerge: _propTypes.default.bool,
  lazyUpdate: _propTypes.default.bool,
  onChartReady: _propTypes.default.func,
  loadingOption: _propTypes.default.object,
  showLoading: _propTypes.default.bool,
  echarts: _propTypes.default.object
});

_defineProperty(EchartCore, "defaultProps", {
  prefixCls: 'fishd-chart',
  theme: _defaultTheme.default,
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