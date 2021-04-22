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
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from '../Input';
import Icon from '../Icon';
import Trigger from 'rc-trigger';
import { HAVE_TRIGGER_TYPES, TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS } from './constants';
import { Errors, require_condition } from './libs/utils';
import KEYCODE from '../../utils/KeyCode';
import { isValidValue, isValidValueArr, equalDateArr } from '../../utils/date';
import placements from './placements';
import isEqual from 'lodash/isEqual';
import ConfigConsumer from '../Config/Consumer';
var haveTriggerType = function (type) {
    return HAVE_TRIGGER_TYPES.indexOf(type) !== -1;
};
var isInputValid = function (text, date) {
    if (text.trim() === '' || !isValidValue(date))
        return false;
    return true;
};
var $type = Symbol('type');
var DateRangeBasePicker = /** @class */ (function (_super) {
    __extends(DateRangeBasePicker, _super);
    function DateRangeBasePicker(props, _type, state) {
        var _this = _super.call(this, props) || this;
        _this.onPicked = function (value, isKeepPannel, isConfirmValue) {
            if (isKeepPannel === void 0) { isKeepPannel = false; }
            if (isConfirmValue === void 0) { isConfirmValue = true; }
            // 当为日期范围选择面板时，把结束时间默认设置为23:59:59:999
            if (_this.type == 'daterange' && value && value.length === 2) {
                value[1] = new Date(value[1].setHours(23, 59, 59, 999));
            }
            _this.setState({
                pickerVisible: isKeepPannel,
                value: value,
                text: value && value.length === 2 ? [_this.dateToStr(value[0]), _this.dateToStr(value[1])] : ''
            }, function () {
                _this.props.onVisibleChange(isKeepPannel);
            });
            if (isConfirmValue) {
                _this.setState({
                    confirmValue: value
                });
                _this.props.onChange(value);
            }
        };
        _this.onCancelPicked = function () {
            _this.setState({
                pickerVisible: false,
                value: _this.state.confirmValue && _this.state.confirmValue.length === 2
                    ? _this.state.confirmValue
                    : null,
                text: _this.state.confirmValue && _this.state.confirmValue.length === 2
                    ? [
                        _this.dateToStr(new Date(_this.state.confirmValue[0])),
                        _this.dateToStr(new Date(_this.state.confirmValue[1]))
                    ]
                    : ''
            }, function () {
                _this.props.onVisibleChange(false);
            });
        };
        _this.dateToStr = function (date) {
            return DateRangeBasePicker.dateToStr(date, _this.type, _this.getFormat(), _this.getFormatSeparator());
        };
        _this.parseDate = function (dateStr) {
            if (!dateStr)
                return null;
            var type = _this.type;
            var parser = TYPE_VALUE_RESOLVER_MAP['date'].parser;
            return parser(dateStr, _this.getFormat(), _this.getFormatSeparator());
        };
        // 聚焦
        _this.handleFocus = function (e) {
            _this.props.onFocus(e);
        };
        // 失焦
        _this.handleBlur = function (e) {
            _this.props.onBlur(e);
        };
        // 键盘事件
        _this.handleKeydown = function (evt) {
            var keyCode = evt.keyCode;
            // esc
            if (_this.props.esc && keyCode === KEYCODE.ESC) {
                _this.setState({
                    pickerVisible: false
                }, function () {
                    _this.props.onVisibleChange(false);
                });
                _this.refInputRoot.blur();
                evt.stopPropagation();
            }
            // enter
            if (keyCode === KEYCODE.ENTER) {
                _this.setState({
                    pickerVisible: false
                }, function () {
                    _this.saveValidInputValue();
                });
                _this.refInputRoot.blur();
            }
        };
        // 点击清空图标
        _this.handleClickCloseIcon = function (e) {
            e && e.stopPropagation();
            var _a = _this.props, disabled = _a.disabled, allowClear = _a.allowClear;
            var text = _this.state.text;
            if (disabled || !allowClear)
                return;
            if (!text) {
                _this.togglePickerVisible();
            }
            else {
                _this.setState({
                    text: '',
                    value: null,
                    pickerVisible: false,
                    confirmValue: null
                }, function () {
                    _this.props.onVisibleChange(false);
                    _this.props.onChange(null);
                });
            }
        };
        // 面板打开或关闭的回调
        _this.onVisibleChange = function (visible) {
            if (_this.inputClick && !visible) {
                _this.inputClick = false;
                return;
            }
            _this.inputClick = false;
            _this.setState({
                pickerVisible: visible
            }, function () {
                if (!visible) {
                    _this.saveValidInputValue();
                }
                else {
                    _this.props.onVisibleChange(visible);
                }
            });
        };
        // 保存合法的输入值
        _this.saveValidInputValue = function () {
            var _a = _this.state, value = _a.value, confirmValue = _a.confirmValue;
            if (value && value.length === 2 && _this.onError) {
                var error = _this.onError([value[0], value[1]]);
                if (error) {
                    _this.setState({
                        pickerVisible: error
                    });
                    return;
                }
            }
            if (_this.isDateValid(value) && !equalDateArr(value, confirmValue)) {
                _this.onPicked(value, false, true);
            }
            else {
                _this.onCancelPicked();
            }
        };
        require_condition(typeof _type === 'string');
        _this.type = _type;
        _this.inputClick = false;
        _this.state = {
            pickerVisible: false,
            value: props.value && isValidValueArr(props.value) ? props.value : null,
            text: props.value && isValidValueArr(props.value)
                ? [_this.dateToStr(props.value[0]), _this.dateToStr(props.value[1])]
                : '',
            // 增加一个confirmValue记录每次确定的值，当点击"取消"或者空白处时，恢复这个值
            confirmValue: props.value && isValidValueArr(props.value) ? props.value : null
        };
        return _this;
    }
    Object.defineProperty(DateRangeBasePicker, "propTypes", {
        get: function () {
            return {
                className: PropTypes.string,
                startPlaceholder: PropTypes.string,
                endPlaceholder: PropTypes.string,
                separator: PropTypes.string,
                format: PropTypes.string,
                placement: PropTypes.oneOf([
                    'bottomLeft',
                    'bottomCenter',
                    'bottomRight',
                    'topLeft',
                    'topCenter',
                    'topRight'
                ]),
                prefixCls: PropTypes.string,
                getPopupContainer: PropTypes.func,
                showTrigger: PropTypes.bool,
                allowClear: PropTypes.bool,
                disabled: PropTypes.bool,
                esc: PropTypes.bool,
                value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
                onFocus: PropTypes.func,
                onBlur: PropTypes.func,
                onChange: PropTypes.func,
                onVisibleChange: PropTypes.func,
                style: PropTypes.object
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangeBasePicker, "defaultProps", {
        get: function () {
            return {
                startPlaceholder: '开始日期',
                endPlaceholder: '结束日期',
                separator: '至',
                placement: 'bottomLeft',
                prefixCls: 'fishd',
                showTrigger: true,
                allowClear: true,
                disabled: false,
                esc: true,
                onFocus: function () { },
                onBlur: function () { },
                onChange: function () { },
                onVisibleChange: function () { }
            };
        },
        enumerable: true,
        configurable: true
    });
    DateRangeBasePicker.dateToStr = function (date, type, format, separator) {
        if (!date || !isValidValue(date))
            return '';
        var tdate = date;
        var formatter = TYPE_VALUE_RESOLVER_MAP['date'].formatter;
        var result = formatter(tdate, format || DEFAULT_FORMATS[type], separator);
        return result;
    };
    DateRangeBasePicker.propToState = function (_a, state) {
        var value = _a.value, format = _a.format, separator = _a.separator;
        var type = state[$type];
        return {
            value: value && isValidValueArr(value) ? value : null,
            text: value && isValidValueArr(value)
                ? [
                    DateRangeBasePicker.dateToStr(value[0], type, format, separator),
                    DateRangeBasePicker.dateToStr(value[1], type, format, separator)
                ]
                : '',
            confirmValue: value && isValidValueArr(value) ? value : null
        };
    };
    DateRangeBasePicker.prototype.isDateValid = function (date) {
        return date === null || isValidValueArr(date);
    };
    DateRangeBasePicker.prototype.pickerPanel = function (state, props) {
        throw new Errors.MethodImplementationRequiredError(props);
    };
    DateRangeBasePicker.prototype.getFormatSeparator = function () {
        return undefined;
    };
    DateRangeBasePicker.prototype.onError = function (value) {
        return undefined;
    };
    DateRangeBasePicker.prototype.getFormat = function () {
        return this.props.format || DEFAULT_FORMATS[this.type];
    };
    DateRangeBasePicker.prototype.togglePickerVisible = function () {
        var _this = this;
        this.setState({
            pickerVisible: !this.state.pickerVisible
        }, function () {
            _this.props.onVisibleChange(!_this.state.pickerVisible);
        });
    };
    DateRangeBasePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, startPlaceholder = _a.startPlaceholder, endPlaceholder = _a.endPlaceholder, separator = _a.separator, showTrigger = _a.showTrigger, allowClear = _a.allowClear, disabled = _a.disabled, className = _a.className, placement = _a.placement, prefixCls = _a.prefixCls, getPopupContainer = _a.getPopupContainer, style = _a.style;
        var _b = this.state, pickerVisible = _b.pickerVisible, value = _b.value, text = _b.text;
        var calcIsShowTrigger = function () {
            if (showTrigger !== null) {
                return !!showTrigger;
            }
            else {
                return haveTriggerType(_this.type);
            }
        };
        var triggerClass = function () {
            return _this.type.includes('date') || _this.type.includes('week') ? 'date-line' : 'time-line';
        };
        // 前缀图标
        var prefixIcon = function () {
            if (calcIsShowTrigger()) {
                return (React.createElement(Icon, { className: classNames(prefixCls + "-date-picker-icon", 'prefix-iconfont'), type: triggerClass() }));
            }
            else {
                return null;
            }
        };
        // 后缀图标
        var suffixIcon = function () {
            if (text && allowClear) {
                return (React.createElement(Icon, { className: classNames(prefixCls + "-date-picker-icon", 'suffix-iconfont'), type: "close-circle-fill", onClick: _this.handleClickCloseIcon }));
            }
            else {
                return null;
            }
        };
        // 下拉面板
        var getPickerPanel = function () {
            return _this.pickerPanel(_this.state);
        };
        // 选择框
        var getInputPanel = function (locales) {
            return (React.createElement("span", { className: classNames(prefixCls + "-date-editor", className, {
                    'is-have-trigger': calcIsShowTrigger(),
                    'is-active': pickerVisible,
                    'is-filled': !!value,
                    'is-disable': disabled
                }), style: __assign({}, style), onClick: function () { return (_this.inputClick = true); } },
                React.createElement("div", { className: classNames(prefixCls + "-date-editor--" + _this.type, {
                        'is-active': pickerVisible,
                        disabled: disabled
                    }) },
                    React.createElement(Input, { disabled: disabled, type: "text", placeholder: startPlaceholder, onFocus: _this.handleFocus, onBlur: _this.handleBlur, onKeyDown: _this.handleKeydown, onChange: function (e) {
                            var inputValue = e.target.value;
                            var ndate = _this.parseDate(inputValue);
                            if (!isInputValid(inputValue, ndate)) {
                                _this.setState({
                                    text: [inputValue, _this.state.text[1]],
                                    pickerVisible: true
                                });
                            }
                            else {
                                //only set value on a valid date input
                                _this.setState({
                                    text: [inputValue, _this.state.text[1]],
                                    value: [ndate, _this.state.value[1]],
                                    pickerVisible: true
                                });
                            }
                        }, ref: function (e) { return (_this.refInputRoot = e); }, value: text && text.length == 2 ? text[0] : '', prefix: prefixIcon() }),
                    React.createElement("span", { className: classNames('range-separator', { disabled: disabled }) }, locales.separator),
                    React.createElement(Input, { className: prefixCls + "-date-range-picker-second-input", disabled: disabled, type: "text", placeholder: endPlaceholder, onFocus: _this.handleFocus, onBlur: _this.handleBlur, onKeyDown: _this.handleKeydown, onChange: function (e) {
                            var inputValue = e.target.value;
                            var ndate = _this.parseDate(inputValue);
                            if (!isInputValid(inputValue, ndate)) {
                                _this.setState({
                                    text: [_this.state.text[0], inputValue],
                                    pickerVisible: true
                                });
                            }
                            else {
                                //only set value on a valid date input
                                _this.setState({
                                    text: [_this.state.text[0], inputValue],
                                    value: [_this.state.value[0], ndate],
                                    pickerVisible: true
                                });
                            }
                        }, value: text && text.length == 2 ? text[1] : '', suffix: suffixIcon() }))));
        };
        return (React.createElement(ConfigConsumer, { componentName: "DatePicker" }, function (Locales) { return (React.createElement(Trigger, { action: disabled ? [] : ['click'], builtinPlacements: placements, ref: function (node) { return (_this.trigger = node); }, getPopupContainer: getPopupContainer, onPopupVisibleChange: _this.onVisibleChange, popup: getPickerPanel(), popupPlacement: placement, popupVisible: pickerVisible, prefixCls: prefixCls + "-date-time-picker-popup", destroyPopupOnHide: true }, getInputPanel(Locales))); }));
    };
    DateRangeBasePicker.getDerivedStateFromProps = function (nextProps, prevState) {
        // 只 value 受控
        if ('value' in nextProps && !isEqual(prevState.prevPropValue, nextProps.value)) {
            var state = DateRangeBasePicker.propToState(nextProps, prevState);
            state.prevPropValue = nextProps.value;
            return state;
        }
        return null;
    };
    return DateRangeBasePicker;
}(React.Component));
export default DateRangeBasePicker;
