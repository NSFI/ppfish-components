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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import { KeyCode } from '../../utils';
import typeColor from './utils/validationColor';
import ColorPickerPanel from './Panel';
import placements from './placements';
import Color from './helpers/color';
import Icon from '../Icon/index';
function noop() { }
var QuickPanel = /** @class */ (function (_super) {
    __extends(QuickPanel, _super);
    function QuickPanel(props) {
        var _this = _super.call(this, props) || this;
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
        _this.handleChange = function (color, alpha, fireChange) {
            if (fireChange === void 0) { fireChange = true; }
            var _a = _this.props, disabled = _a.disabled, onChange = _a.onChange, onVisibleChange = _a.onVisibleChange, __useInComponent = _a.__useInComponent;
            if (disabled)
                return;
            _this.setState({ color: color });
            onChange({ color: color, alpha: alpha });
            // colorPicker弹层中使用，点击时触发visibleChange
            if (__useInComponent && fireChange) {
                onVisibleChange(false);
            }
        };
        _this.onChange = function (colors) {
            _this.setState(__assign({}, colors));
        };
        _this.onVisibleChangeFromTrigger = function (visible) {
            _this.setVisible(visible);
            //自定义选择颜色弹层关闭时才颜色改变确认
            if (!visible) {
                _this.props.onChange(_this.state);
            }
        };
        _this.onPanelMount = function (panelDOMRef) {
            if (_this.state.visible) {
                setTimeout(function () {
                    panelDOMRef.focus();
                }, 0);
            }
        };
        _this.handleKeyDown = function (e) {
            var keyCode = e.keyCode;
            if ((keyCode === KeyCode.ESC && _this.props.esc) || keyCode === KeyCode.ENTER) {
                _this.setVisible(false, function () {
                    _this.props.onChange(_this.state);
                });
            }
        };
        _this.handleSpnKeyDown = function (e) {
            var keyCode = e.keyCode;
            var colorMap = _this.props.colorMap;
            var _a = _this.state, color = _a.color, visible = _a.visible;
            var activeIndex = colorMap.indexOf(color);
            if (activeIndex === -1 || visible)
                return;
            // LEFT/RIGHT触发选择
            if (keyCode === KeyCode.LEFT) {
                _this.handleChange(colorMap[activeIndex - 1 === -1 ? colorMap.length - 1 : activeIndex - 1], 100, false);
            }
            if (keyCode === KeyCode.RIGHT) {
                _this.handleChange(colorMap[activeIndex + 1 === colorMap.length ? 0 : activeIndex + 1], 100, false);
            }
        };
        _this.setVisible = function (visible, callback) {
            if (_this.state.visible !== visible) {
                _this.setState({ visible: visible }, function () {
                    if (typeof callback === 'function')
                        callback();
                    var _a = _this.props, onVisibleChange = _a.onVisibleChange, enableHistory = _a.enableHistory, maxHistory = _a.maxHistory;
                    onVisibleChange(_this.state.visible);
                    //关闭时记录历史记录
                    if (!_this.state.visible && enableHistory) {
                        var _b = _this.state, color = _b.color, alpha = _b.alpha, colorHistory = _b.colorHistory;
                        if (colorHistory.length &&
                            color === colorHistory[0].color &&
                            alpha === colorHistory[0].alpha)
                            return;
                        _this.setState({
                            colorHistory: colorHistory.length >= maxHistory
                                ? __spreadArrays([{ color: color, alpha: alpha }], colorHistory.slice(0, -1)) : __spreadArrays([{ color: color, alpha: alpha }], colorHistory)
                        });
                    }
                });
            }
        };
        _this.getPickerElement = function () {
            var _a = _this.props, mode = _a.mode, className = _a.className, enableAlpha = _a.enableAlpha, enableHistory = _a.enableHistory, maxHistory = _a.maxHistory;
            return (React.createElement(ColorPickerPanel, { onMount: _this.onPanelMount, defaultColor: _this.state.color, alpha: _this.state.alpha, enableAlpha: enableAlpha, prefixCls: "fishd-color-picker-panel", onChange: _this.onChange, onBlur: _this.onBlur, mode: mode, className: className, colorHistory: _this.state.colorHistory, enableHistory: enableHistory, maxHistory: maxHistory }));
        };
        var alpha = typeof props.alpha === 'undefined'
            ? props.defaultAlpha
            : Math.min(props.alpha, props.defaultAlpha);
        _this.state = {
            color: props.color || props.defaultColor,
            alpha: alpha,
            visible: false,
            colorHistory: props.colorHistory
        };
        return _this;
    }
    QuickPanel.getDerivedStateFromProps = function (nextProps, prevState) {
        var newState = {};
        if ('color' in nextProps) {
            newState.color = nextProps.color;
        }
        if ('alpha' in nextProps && nextProps.alpha !== undefined) {
            newState.alpha = nextProps.alpha;
        }
        return newState;
    };
    QuickPanel.prototype.componentDidMount = function () {
        this.props.onMount(this.ref);
    };
    QuickPanel.prototype.render = function () {
        var _this = this;
        var _a = this.props, prefixCls = _a.prefixCls, colorMap = _a.colorMap, userSelectColor = _a.userSelectColor, getPopupContainer = _a.getPopupContainer, disabled = _a.disabled, __useInComponent = _a.__useInComponent, popupStyle = _a.popupStyle;
        var _b = new Color(this.state.color).RGB, r = _b[0], g = _b[1], b = _b[2];
        var RGBA = [r, g, b];
        var customChecked = !colorMap.includes(this.state.color);
        RGBA.push(this.state.alpha / 100);
        return (React.createElement("div", { ref: function (ref) { return (_this.ref = ref); }, className: [prefixCls, this.props.className].join(' '), style: this.props.style, onFocus: this.onFocus, onKeyDown: this.handleSpnKeyDown, onBlur: this.onBlur, tabIndex: 0 },
            React.createElement("div", { className: prefixCls + "-inner" },
                colorMap.map(function (color, i) {
                    var _a;
                    var spnClasses = classNames((_a = {},
                        _a[prefixCls + "-color-spn"] = true,
                        _a[prefixCls + "-color-spn-active"] = _this.state.color === color,
                        _a));
                    return (React.createElement("span", { key: i, className: spnClasses, style: { background: color }, onClick: function () { return _this.handleChange(color, 100); } }));
                }),
                userSelectColor && !__useInComponent && (React.createElement(Trigger, { popup: React.createElement("div", { className: prefixCls + "-content", onKeyDown: this.handleKeyDown },
                        React.createElement("div", { className: prefixCls + "-arrow" }),
                        React.createElement("div", { className: prefixCls + "-inner" }, this.getPickerElement())), builtinPlacements: placements, popupPlacement: 'topCenter', action: disabled ? [] : ['click'], destroyPopupOnHide: true, popupStyle: popupStyle, getPopupContainer: getPopupContainer, popupVisible: this.state.visible, onPopupVisibleChange: this.onVisibleChangeFromTrigger, prefixCls: "fishd-color-picker-panel" },
                    React.createElement("span", { className: prefixCls + "-custom-btn" },
                        React.createElement("span", { className: prefixCls + "-custom-btn-text", style: customChecked
                                ? {
                                    backgroundColor: "rgba(" + RGBA.join(',') + ")",
                                    color: '#fff',
                                    textShadow: '0 0.5px 0.5px rgba(0,0,0,50%)'
                                }
                                : {} },
                            customChecked && React.createElement(Icon, { type: "check-line-bold" }),
                            "\u81EA\u5B9A\u4E49")))))));
    };
    QuickPanel.propTypes = {
        __useInComponent: PropTypes.bool,
        alpha: PropTypes.number,
        className: PropTypes.string,
        color: typeColor,
        colorHistory: PropTypes.array,
        colorMap: PropTypes.array,
        defaultAlpha: PropTypes.number,
        defaultColor: typeColor,
        disabled: PropTypes.bool,
        enableAlpha: PropTypes.bool,
        enableHistory: PropTypes.bool,
        getPopupContainer: PropTypes.func,
        maxHistory: PropTypes.number,
        mode: PropTypes.oneOf(['RGB', 'HSL', 'HSB']),
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onMount: PropTypes.func,
        onVisibleChange: PropTypes.func,
        prefixCls: PropTypes.string,
        userSelectColor: PropTypes.bool,
        style: PropTypes.object,
        popupStyle: PropTypes.object,
        esc: PropTypes.bool
    };
    QuickPanel.defaultProps = {
        __useInComponent: false,
        className: '',
        colorHistory: [],
        colorMap: [
            '#33bbff',
            '#337eff',
            '#8a73ff',
            '#bb67e6',
            '#f290b6',
            '#f24957',
            '#cc613d',
            '#faa702',
            '#ffe500',
            '#aacc00',
            '#26bf40',
            '#3dd9af',
            '#333333',
            '#666666',
            '#999999',
            '#cccccc'
        ],
        defaultAlpha: 100,
        defaultColor: '#33bbff',
        enableAlpha: false,
        enableHistory: true,
        maxHistory: 8,
        mode: 'RGB',
        onBlur: noop,
        onChange: noop,
        onFocus: noop,
        onMount: noop,
        onVisibleChange: noop,
        prefixCls: 'fishd-color-picker-quick-panel',
        userSelectColor: true,
        style: {},
        popupStyle: {},
        esc: true
    };
    return QuickPanel;
}(React.Component));
polyfill(QuickPanel);
export default QuickPanel;
