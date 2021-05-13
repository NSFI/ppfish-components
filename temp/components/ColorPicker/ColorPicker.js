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
import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import { KeyCode } from '../../utils';
import ColorPickerPanel from './Panel';
import placements from './placements';
import Color from './helpers/color';
import QuickPanel from './QuickPanel';
function refFn(field, component) {
    this[field] = component;
}
function prevent(e) {
    e.preventDefault();
}
function noop() { }
var ColorPicker = /** @class */ (function (_super) {
    __extends(ColorPicker, _super);
    function ColorPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = function (colors) {
            _this.setState(__assign({}, colors), function () {
                _this.props.onChange(_this.state);
            });
        };
        _this.onBlur = function () {
            _this.setVisible(false);
        };
        _this.onVisibleChangeFromTrigger = function (visible) {
            _this.setVisible(visible);
        };
        _this.onPanelMount = function (panelDOMRef) {
            if (_this.state.visible) {
                setTimeout(function () {
                    panelDOMRef.focus();
                }, 0);
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
                        // @ts-ignore
                        if (colorHistory.length &&
                            color === colorHistory[0].color &&
                            alpha === colorHistory[0].alpha)
                            return;
                        var history_1 = colorHistory.length >= maxHistory
                            ? __spreadArrays([{ color: color, alpha: alpha }], colorHistory.slice(0, -1)) : __spreadArrays([{ color: color, alpha: alpha }], colorHistory);
                        // @ts-ignore
                        _this.setState({ colorHistory: history_1 });
                    }
                });
            }
        };
        _this.getRootDOMNode = function () {
            return findDOMNode(_this);
        };
        _this.getTriggerDOMNode = function () {
            return findDOMNode(_this.triggerInstance);
        };
        _this.getPickerElement = function () {
            if (_this.props.quickMode) {
                return (React.createElement(QuickPanel, { __useInComponent: true, onMount: _this.onPanelMount, defaultColor: _this.state.color, color: _this.state.color, onChange: _this.onChange, onVisibleChange: _this.setVisible, onBlur: _this.onBlur, colorMap: _this.props.colorMap, className: _this.props.className, userSelectColor: false, esc: _this.props.esc }));
            }
            return (React.createElement(ColorPickerPanel, { onMount: _this.onPanelMount, defaultColor: _this.state.color, alpha: _this.state.alpha, enableAlpha: _this.props.enableAlpha, prefixCls: _this.props.prefixCls + "-panel", onChange: _this.onChange, onBlur: _this.onBlur, mode: _this.props.mode, className: _this.props.className, colorHistory: _this.state.colorHistory, enableHistory: _this.props.enableHistory, maxHistory: _this.props.maxHistory }));
        };
        _this.focus = function () {
            if (!_this.state.visible) {
                findDOMNode(_this).focus();
            }
        };
        _this.handleKeyDown = function (e) {
            var keyCode = e.keyCode;
            if ((keyCode === KeyCode.ESC && _this.props.esc) || keyCode === KeyCode.ENTER) {
                _this.setVisible(false);
            }
        };
        var alpha = typeof props.alpha === 'undefined'
            ? props.defaultAlpha
            : Math.min(props.alpha, props.defaultAlpha);
        _this.state = {
            color: props.color || props.defaultColor,
            alpha: alpha,
            visible: false,
            colorHistory: []
        };
        _this.saveTriggerRef = refFn.bind(_this, 'triggerInstance');
        return _this;
    }
    ColorPicker.getDerivedStateFromProps = function (nextProps, prevState) {
        var newState = {};
        if ('color' in nextProps) {
            newState.color = nextProps.color;
        }
        if ('alpha' in nextProps && nextProps.alpha !== undefined && nextProps.alpha !== null) {
            newState.alpha = nextProps.alpha;
        }
        return newState;
    };
    ColorPicker.prototype.render = function () {
        var _a;
        var props = this.props;
        var state = this.state;
        var classes = [props.prefixCls + "-wrap", props.className];
        if (state.visible) {
            classes.push(props.prefixCls + "-open");
        }
        var children = props.children;
        var _b = new Color(this.state.color).RGB, r = _b[0], g = _b[1], b = _b[2];
        var RGBA = [r, g, b];
        RGBA.push(this.state.alpha / 100);
        if (children) {
            children = React.cloneElement(children, {
                ref: this.saveTriggerRef,
                unselectable: 'unselectable',
                style: __assign(__assign({}, props.style), { backgroundColor: "rgba(" + RGBA.join(',') + ")" }),
                onMouseDown: prevent
            });
        }
        var prefixCls = props.prefixCls, popupStyle = props.popupStyle, getPopupContainer = props.getPopupContainer, align = props.align, animation = props.animation, disabled = props.disabled, transitionName = props.transitionName, quickMode = props.quickMode;
        var arrowCls = classNames((_a = {},
            _a[prefixCls + "-arrow"] = true,
            _a.quick = quickMode,
            _a));
        return (React.createElement("div", { className: classes.join(' ') },
            React.createElement(Trigger, { popup: React.createElement("div", { className: prefixCls + "-content", onKeyDown: this.handleKeyDown },
                    React.createElement("div", { className: arrowCls }),
                    React.createElement("div", { className: prefixCls + "-inner" }, this.getPickerElement())), popupAlign: align, builtinPlacements: placements, popupPlacement: 'topCenter', action: disabled ? [] : ['click'], destroyPopupOnHide: true, getPopupContainer: getPopupContainer, popupStyle: popupStyle, popupAnimation: animation, popupTransitionName: transitionName, popupVisible: state.visible, onPopupVisibleChange: this.onVisibleChangeFromTrigger, prefixCls: prefixCls }, children)));
    };
    ColorPicker.Panel = ColorPickerPanel;
    ColorPicker.QuickPanel = QuickPanel;
    ColorPicker.propTypes = {
        alpha: PropTypes.number,
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        color: PropTypes.string,
        colorMap: PropTypes.array,
        defaultAlpha: PropTypes.number,
        defaultColor: PropTypes.string,
        disabled: PropTypes.bool,
        enableAlpha: PropTypes.bool,
        enableHistory: PropTypes.bool,
        maxHistory: PropTypes.number,
        mode: PropTypes.oneOf(['RGB', 'HSL', 'HSB']),
        onChange: PropTypes.func,
        onVisibleChange: PropTypes.func,
        prefixCls: PropTypes.string.isRequired,
        quickMode: PropTypes.bool,
        style: PropTypes.object,
        popupStyle: PropTypes.object,
        esc: PropTypes.bool
    };
    ColorPicker.defaultProps = {
        children: React.createElement("span", { className: "fishd-color-picker-trigger" }),
        className: '',
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
            '#3dd9af'
        ],
        defaultAlpha: 100,
        defaultColor: '#33bbff',
        disabled: false,
        enableAlpha: false,
        enableHistory: true,
        maxHistory: 8,
        onChange: noop,
        onVisibleChange: noop,
        prefixCls: 'fishd-color-picker',
        quickMode: false,
        style: {},
        popupStyle: {},
        esc: true
    };
    return ColorPicker;
}(React.Component));
polyfill(ColorPicker);
export default ColorPicker;
