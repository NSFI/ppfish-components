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

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import defaultTheme from './default-theme';

var Echart =
/*#__PURE__*/
function (_Component) {
  _inherits(Echart, _Component);

  function Echart(props) {
    var _this;

    _classCallCheck(this, Echart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Echart).call(this, props));
    _this.echarts_react = null;
    return _this;
  }

  _createClass(Echart, [{
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
          showLoading = _this$props.showLoading;
      return React.createElement(ReactEcharts, {
        ref: function ref(e) {
          return _this2.echarts_react = e;
        },
        className: classNames(prefixCls, className),
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

  return Echart;
}(Component);

_defineProperty(Echart, "propTypes", {
  prefixCls: PropTypes.string,
  option: PropTypes.object,
  opts: PropTypes.object,
  events: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.string,
  notMerge: PropTypes.bool,
  lazyUpdate: PropTypes.bool,
  onChartReady: PropTypes.func,
  loadingOption: PropTypes.object,
  showLoading: PropTypes.bool
});

_defineProperty(Echart, "defaultProps", {
  prefixCls: 'fishd-chart',
  theme: defaultTheme,
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

export { Echart as default };