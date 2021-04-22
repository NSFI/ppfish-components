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
import ReactEchartsCore from 'echarts-for-react/lib/core';
import defaultTheme from './default-theme';
var EchartCore = /** @class */ (function (_super) {
    __extends(EchartCore, _super);
    function EchartCore(props) {
        var _this = _super.call(this, props) || this;
        _this.echarts_react = null;
        return _this;
    }
    EchartCore.prototype.getInstance = function () {
        // @ts-ignore
        return this.echarts_react.getEchartsInstance();
    };
    EchartCore.prototype.render = function () {
        var _this = this;
        var _a = this.props, prefixCls = _a.prefixCls, className = _a.className, style = _a.style, theme = _a.theme, option = _a.option, opts = _a.opts, events = _a.events, notMerge = _a.notMerge, lazyUpdate = _a.lazyUpdate, onChartReady = _a.onChartReady, loadingOption = _a.loadingOption, showLoading = _a.showLoading, echarts = _a.echarts;
        return (React.createElement(ReactEchartsCore, { ref: function (e) { return (_this.echarts_react = e); }, echarts: echarts, className: classNames(prefixCls, className), style: style, option: option, opts: opts, onEvents: events, theme: theme, notMerge: notMerge, lazyUpdate: lazyUpdate, onChartReady: onChartReady, loadingOption: loadingOption, showLoading: showLoading }));
    };
    EchartCore.propTypes = {
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
        showLoading: PropTypes.bool,
        echarts: PropTypes.object
    };
    EchartCore.defaultProps = {
        prefixCls: 'fishd-chart',
        theme: defaultTheme,
        echarts: {},
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
    return EchartCore;
}(Component));
export default EchartCore;
