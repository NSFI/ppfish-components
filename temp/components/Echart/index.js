var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import defaultTheme from './default-theme';
var Echart = /** @class */ (function (_super) {
    __extends(Echart, _super);
    function Echart(props) {
        var _this = _super.call(this, props) || this;
        _this.echarts_react = null;
        return _this;
    }
    Echart.prototype.getInstance = function () {
        // @ts-ignore
        return this.echarts_react.getEchartsInstance();
    };
    Echart.prototype.render = function () {
        var _this = this;
        var _a = this.props, prefixCls = _a.prefixCls, className = _a.className, style = _a.style, theme = _a.theme, option = _a.option, opts = _a.opts, events = _a.events, notMerge = _a.notMerge, lazyUpdate = _a.lazyUpdate, onChartReady = _a.onChartReady, loadingOption = _a.loadingOption, showLoading = _a.showLoading;
        return (React.createElement(ReactEcharts, { ref: function (e) { return (_this.echarts_react = e); }, className: classNames(prefixCls, className), style: style, option: option, opts: opts, onEvents: events, theme: theme, notMerge: notMerge, lazyUpdate: lazyUpdate, onChartReady: onChartReady, loadingOption: loadingOption, showLoading: showLoading }));
    };
    Echart.propTypes = {
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
    };
    Echart.defaultProps = {
        prefixCls: 'fishd-chart',
        theme: defaultTheme,
        notMerge: false,
        lazyUpdate: false,
        style: { height: '300px' },
        className: '',
        onChartReady: function () { },
        showLoading: false,
        loadingOption: null,
        onEvents: {},
        opts: {}
    };
    return Echart;
}(Component));
export default Echart;
