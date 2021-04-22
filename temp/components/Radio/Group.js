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
import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import { polyfill } from 'react-lifecycles-compat';
import Radio from './Radio';
// case sensitive
function getCheckedValue(children) {
    var value = null;
    var matched = false;
    React.Children.forEach(children, function (radio) {
        if (radio && radio.props && radio.props.checked) {
            value = radio.props.value;
            matched = true;
        }
    });
    return matched ? { value: value } : undefined;
}
var RadioGroup = /** @class */ (function (_super) {
    __extends(RadioGroup, _super);
    function RadioGroup(props) {
        var _this = _super.call(this, props) || this;
        _this.onRadioChange = function (ev) {
            var lastValue = _this.state.value;
            var value = ev.target.value;
            if (!('value' in _this.props)) {
                _this.setState({
                    value: value
                });
            }
            var onChange = _this.props.onChange;
            if (onChange && value !== lastValue) {
                onChange(ev);
            }
        };
        var value;
        if ('value' in props) {
            value = props.value;
        }
        else if ('defaultValue' in props) {
            value = props.defaultValue;
        }
        else {
            var checkedValue = getCheckedValue(props.children);
            value = checkedValue && checkedValue.value;
        }
        _this.state = {
            value: value
        };
        return _this;
    }
    RadioGroup.getDerivedStateFromProps = function (nextProps) {
        if ('value' in nextProps) {
            return {
                value: nextProps.value
            };
        }
        else {
            var checkedValue = getCheckedValue(nextProps.children);
            if (checkedValue) {
                return {
                    value: checkedValue.value
                };
            }
        }
        return null;
    };
    RadioGroup.prototype.getChildContext = function () {
        return {
            radioGroup: {
                onChange: this.onRadioChange,
                value: this.state.value,
                disabled: this.props.disabled,
                name: this.props.name
            }
        };
    };
    RadioGroup.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    };
    RadioGroup.prototype.render = function () {
        var _a;
        var _this = this;
        var props = this.props;
        var prefixCls = props.prefixCls, _b = props.className, className = _b === void 0 ? '' : _b, options = props.options, buttonStyle = props.buttonStyle;
        var groupPrefixCls = prefixCls + "-group";
        var classString = classNames(groupPrefixCls, groupPrefixCls + "-" + buttonStyle, (_a = {},
            _a[groupPrefixCls + "-" + props.size] = props.size,
            _a), className);
        var children = props.children;
        // 如果存在 options, 优先使用
        if (options && options.length > 0) {
            children = options.map(function (option, index) {
                if (typeof option === 'string') {
                    // 此处类型自动推导为 string
                    return (React.createElement(Radio, { key: index, prefixCls: prefixCls, disabled: _this.props.disabled, value: option, onChange: _this.onRadioChange, checked: _this.state.value === option }, option));
                }
                else {
                    // 此处类型自动推导为 { label: string value: string }
                    return (React.createElement(Radio, { key: index, prefixCls: prefixCls, disabled: option.disabled || _this.props.disabled, value: option.value, onChange: _this.onRadioChange, checked: _this.state.value === option.value }, option.label));
                }
            });
        }
        return (React.createElement("div", { className: classString, style: props.style, onMouseEnter: props.onMouseEnter, onMouseLeave: props.onMouseLeave, id: props.id }, children));
    };
    RadioGroup.defaultProps = {
        disabled: false,
        prefixCls: 'fishd-radio',
        buttonStyle: 'outline'
    };
    RadioGroup.childContextTypes = {
        radioGroup: PropTypes.any
    };
    return RadioGroup;
}(React.Component));
polyfill(RadioGroup);
export default RadioGroup;
