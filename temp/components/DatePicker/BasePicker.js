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
import { isValidValue, equalDate } from '../../utils/date';
import placements from './placements';
import isEqual from 'lodash/isEqual';
var haveTriggerType = function (type) {
    return HAVE_TRIGGER_TYPES.indexOf(type) !== -1;
};
var isInputValid = function (text, date) {
    if (text.trim() === '' || !isValidValue(date))
        return false;
    return true;
};
var $type = Symbol('type');
export var Mode;
(function (Mode) {
    Mode["YEAR"] = "year";
    Mode["MONTH"] = "month";
    Mode["WEEK"] = "week";
    Mode["DAY"] = "day";
    Mode["RANGE"] = "range";
})(Mode || (Mode = {}));
var BasePicker = /** @class */ (function (_super) {
    __extends(BasePicker, _super);
    function BasePicker(props, _type, state) {
        var _a;
        var _this = _super.call(this, props) || this;
        _this.onPicked = function (value, isKeepPannel, isConfirmValue) {
            if (isKeepPannel === void 0) { isKeepPannel = false; }
            if (isConfirmValue === void 0) { isConfirmValue = true; }
            _this.setState({
                pickerVisible: isKeepPannel,
                value: value,
                text: _this.dateToStr(value)
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
            var confirmValue = _this.state.confirmValue;
            _this.setState({
                pickerVisible: false,
                value: confirmValue ? confirmValue : null,
                text: confirmValue ? _this.dateToStr(confirmValue) : ''
            }, function () {
                _this.props.onVisibleChange(false);
            });
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
            if (_this.isDateValid(value) && !equalDate(value, confirmValue)) {
                _this.onPicked(value, false, true);
            }
            else {
                _this.onCancelPicked();
            }
        };
        require_condition(typeof _type === 'string');
        _this.type = _type;
        _this.inputClick = false;
        _this.state = (_a = {},
            // @ts-ignore
            _a[$type] = _type,
            _a.pickerVisible = false,
            _a.value = null,
            _a.text = '',
            _a.confirmValue = null,
            _a);
        return _this;
    }
    Object.defineProperty(BasePicker, "propTypes", {
        get: function () {
            return {
                className: PropTypes.string,
                placeholder: PropTypes.string,
                format: PropTypes.string,
                disabledDate: PropTypes.func,
                footer: PropTypes.func,
                showTime: PropTypes.bool,
                showWeekNumber: PropTypes.bool,
                shortcuts: PropTypes.arrayOf(PropTypes.shape({
                    text: PropTypes.string.isRequired,
                    onClick: PropTypes.func.isRequired
                })),
                placement: PropTypes.oneOf([
                    'bottomLeft',
                    'bottomCenter',
                    'bottomRight',
                    'topLeft',
                    'topCenter',
                    'topRight'
                ]),
                prefixCls: PropTypes.string,
                firstDayOfWeek: PropTypes.number,
                getPopupContainer: PropTypes.func,
                showTrigger: PropTypes.bool,
                allowClear: PropTypes.bool,
                disabled: PropTypes.bool,
                esc: PropTypes.bool,
                value: PropTypes.instanceOf(Date),
                onFocus: PropTypes.func,
                onBlur: PropTypes.func,
                onChange: PropTypes.func,
                onVisibleChange: PropTypes.func,
                style: PropTypes.object,
                yearCount: PropTypes.number
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasePicker, "defaultProps", {
        get: function () {
            return {
                placeholder: '',
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
    BasePicker.dateToStr = function (date, type, format, separator) {
        if (!date || !isValidValue(date))
            return '';
        var tdate = date;
        var formatter = (TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP['default'])
            .formatter;
        var result = formatter(tdate, format || DEFAULT_FORMATS[type], separator);
        return result;
    };
    BasePicker.prototype.isDateValid = function (date) {
        return date === null || isValidValue(date);
    };
    BasePicker.prototype.pickerPanel = function (state, props) {
        throw new Errors.MethodImplementationRequiredError(props.toString());
    };
    BasePicker.prototype.getFormatSeparator = function () {
        return undefined;
    };
    BasePicker.prototype.dateToStr = function (date) {
        return BasePicker.dateToStr(date, this.type, this.props.format, this.getFormatSeparator());
    };
    // (string) => Date | null
    BasePicker.prototype.parseDate = function (dateStr) {
        if (!dateStr)
            return null;
        var type = this.type;
        var parser = (TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP['default']).parser;
        return parser(dateStr, this.getFormat(), this.getFormatSeparator());
    };
    BasePicker.prototype.getFormat = function () {
        return this.props.format || DEFAULT_FORMATS[this.type];
    };
    BasePicker.prototype.togglePickerVisible = function () {
        var _this = this;
        this.setState({
            pickerVisible: !this.state.pickerVisible
        }, function () {
            _this.props.onVisibleChange(!_this.state.pickerVisible);
        });
    };
    BasePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, placeholder = _a.placeholder, placement = _a.placement, prefixCls = _a.prefixCls, getPopupContainer = _a.getPopupContainer, showTrigger = _a.showTrigger, allowClear = _a.allowClear, disabled = _a.disabled, style = _a.style;
        var _b = this.state, pickerVisible = _b.pickerVisible, value = _b.value, text = _b.text;
        var triggerClass = function () {
            return _this.type.includes('date') || _this.type.includes('week') ? 'date-line' : 'time-line';
        };
        var calcIsShowTrigger = function () {
            if (showTrigger != null) {
                return !!showTrigger;
            }
            else {
                return haveTriggerType(_this.type);
            }
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
        var getInputPanel = function () {
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
                    React.createElement(Input, { disabled: disabled, type: "text", placeholder: placeholder, onFocus: _this.handleFocus, onBlur: _this.handleBlur, onKeyDown: _this.handleKeydown, onChange: function (e) {
                            var inputValue = e.target.value;
                            var ndate = _this.parseDate(inputValue);
                            if (!isInputValid(inputValue, ndate)) {
                                _this.setState({
                                    text: inputValue,
                                    pickerVisible: true
                                });
                            }
                            else {
                                //only set value on a valid date input
                                _this.setState({
                                    text: inputValue,
                                    value: ndate,
                                    pickerVisible: true
                                });
                            }
                        }, ref: function (e) { return (_this.refInputRoot = e); }, value: text, prefix: prefixIcon(), suffix: suffixIcon() }))));
        };
        return (React.createElement(Trigger, { action: disabled ? [] : ['click'], builtinPlacements: placements, ref: function (node) { return (_this.trigger = node); }, getPopupContainer: getPopupContainer, onPopupVisibleChange: this.onVisibleChange, popup: getPickerPanel(), popupPlacement: placement, popupVisible: pickerVisible, prefixCls: prefixCls + "-date-time-picker-popup", destroyPopupOnHide: true }, getInputPanel()));
    };
    BasePicker.getDerivedStateFromProps = function (nextProps, prevState) {
        if ('value' in nextProps && !isEqual(nextProps.value, prevState.prevPropValue)) {
            var validDate = isValidValue(nextProps.value) ? nextProps.value : null;
            var text = isValidValue(nextProps.value)
                ? BasePicker.dateToStr(nextProps.value, prevState[$type], nextProps.format, nextProps.separator // 这个值当前使用的是undefined
                )
                : '';
            var state = {
                value: validDate,
                text: text,
                // 增加一个confirmValue记录每次确定的值，当点击"取消"或者输入不合法时，恢复这个值
                confirmValue: validDate
            };
            state.prevPropValue = nextProps.value;
            return state;
        }
        return null;
    };
    return BasePicker;
}(React.Component));
export default BasePicker;
