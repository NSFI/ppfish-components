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
// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import Color from './helpers/color';
import typeColor from './utils/validationColor';
import Params from './Params';
import Board from './Board';
import Preview from './Preview';
import Ribbon from './Ribbon';
import Alpha from './Alpha';
import History from './History';
function noop() { }
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel(props) {
        var _this = _super.call(this, props) || this;
        _this.onSystemColorPickerOpen = function (e) {
            // only work with broswer which support color input
            if (e.target.type === 'color') {
                _this.systemColorPickerOpen = true;
            }
        };
        _this.onFocus = function () {
            if (_this._blurTimer) {
                clearTimeout(_this._blurTimer);
                _this._blurTimer = null;
            }
            else {
                _this.props.onFocus();
            }
        };
        _this.onBlur = function () {
            if (_this._blurTimer) {
                clearTimeout(_this._blurTimer);
            }
            _this._blurTimer = setTimeout(function () {
                // if is system color picker open, then stop run blur
                if (_this.systemColorPickerOpen) {
                    _this.systemColorPickerOpen = false;
                    return;
                }
                _this.props.onBlur();
            }, 100);
        };
        /**
         * 响应 alpha 的变更
         * @param  {Number} alpha Range 0~100
         */
        _this.handleAlphaChange = function (alpha) {
            var color = _this.state.color;
            color.alpha = alpha;
            _this.setState({
                alpha: alpha,
                color: color
            });
            _this.props.onChange({
                color: color.toHexString(),
                alpha: alpha
            });
        };
        /**
         * color change
         * @param  {Object}  color      tinycolor instance
         */
        _this.handleChange = function (color) {
            var alpha = _this.state.alpha;
            color.alpha = alpha;
            _this.setState({ color: color });
            _this.props.onChange({
                color: color.toHexString(),
                alpha: color.alpha
            });
        };
        /**
         * 响应 History 的变更
         * @param  {Object} obj color and alpha
         */
        _this.handleHistoryClick = function (obj) {
            _this.setState({
                color: new Color(obj.color),
                alpha: obj.alpha
            });
            _this.props.onChange({
                color: obj.color,
                alpha: obj.alpha
            });
        };
        var alpha = typeof props.alpha === 'undefined'
            ? props.defaultAlpha
            : Math.min(props.alpha, props.defaultAlpha);
        var color = new Color(props.color || props.defaultColor);
        _this.state = {
            color: color,
            alpha: alpha
        };
        return _this;
    }
    Panel.getDerivedStateFromProps = function (nextProps, prevState) {
        var newState = {};
        if ('color' in nextProps) {
            newState.color = new Color(nextProps.color);
        }
        if ('alpha' in nextProps && nextProps.alpha !== undefined) {
            newState.alpha = nextProps.alpha;
        }
        return newState;
    };
    Panel.prototype.componentDidMount = function () {
        this.props.onMount(this.ref);
    };
    Panel.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props, prefixCls = _b.prefixCls, enableAlpha = _b.enableAlpha, enableHistory = _b.enableHistory, colorHistory = _b.colorHistory;
        var _c = this.state, color = _c.color, alpha = _c.alpha;
        var wrapClasses = classNames((_a = {},
            _a[prefixCls + "-wrap"] = true,
            _a[prefixCls + "-wrap-has-alpha"] = enableAlpha,
            _a));
        return (React.createElement("div", { ref: function (ref) { return (_this.ref = ref); }, className: [prefixCls, this.props.className].join(' '), style: this.props.style, onFocus: this.onFocus, onBlur: this.onBlur, tabIndex: 0 },
            React.createElement("div", { className: prefixCls + "-inner" },
                React.createElement(Board, { rootPrefixCls: prefixCls, color: color, onChange: this.handleChange }),
                React.createElement("div", { className: wrapClasses },
                    React.createElement("div", { className: prefixCls + "-wrap-ribbon" },
                        React.createElement(Ribbon, { rootPrefixCls: prefixCls, color: color, onChange: this.handleChange })),
                    enableAlpha && (React.createElement("div", { className: prefixCls + "-wrap-alpha" },
                        React.createElement(Alpha, { rootPrefixCls: prefixCls, alpha: alpha, color: color, onChange: this.handleAlphaChange }))),
                    React.createElement("div", { className: prefixCls + "-wrap-preview" },
                        React.createElement(Preview, { rootPrefixCls: prefixCls, alpha: alpha, onChange: this.handleChange, onInputClick: this.onSystemColorPickerOpen, color: color }))),
                React.createElement("div", { className: prefixCls + "-wrap", style: { height: 40, marginTop: 6 } },
                    React.createElement(Params, { rootPrefixCls: prefixCls, color: color, alpha: alpha, onAlphaChange: this.handleAlphaChange, onChange: this.handleChange, mode: this.props.mode, enableAlpha: this.props.enableAlpha, enableHistory: this.props.enableHistory })),
                enableHistory && (React.createElement("div", { className: prefixCls + "-wrap-history" },
                    React.createElement(History, { prefixCls: prefixCls, colorHistory: colorHistory, onHistoryClick: this.handleHistoryClick, maxHistory: this.props.maxHistory }))))));
    };
    Panel.propTypes = {
        alpha: PropTypes.number,
        className: PropTypes.string,
        color: typeColor,
        colorHistory: PropTypes.array,
        defaultAlpha: PropTypes.number,
        defaultColor: typeColor,
        enableAlpha: PropTypes.bool,
        enableHistory: PropTypes.bool,
        maxHistory: PropTypes.number,
        mode: PropTypes.oneOf(['RGB', 'HSL', 'HSB']),
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onMount: PropTypes.func,
        prefixCls: PropTypes.string,
        style: PropTypes.object
    };
    Panel.defaultProps = {
        className: '',
        colorHistory: [],
        defaultAlpha: 100,
        defaultColor: '#e93334',
        enableAlpha: false,
        enableHistory: true,
        maxHistory: 8,
        mode: 'RGB',
        onBlur: noop,
        onChange: noop,
        onFocus: noop,
        onMount: noop,
        prefixCls: 'fishd-color-picker-panel',
        style: {}
    };
    return Panel;
}(React.Component));
polyfill(Panel);
export default Panel;
