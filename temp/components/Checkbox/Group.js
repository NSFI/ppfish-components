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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import Checkbox from './Checkbox';
import { shallowEqual } from '../../utils';
var CheckboxGroup = /** @class */ (function (_super) {
    __extends(CheckboxGroup, _super);
    function CheckboxGroup(props) {
        var _this = _super.call(this, props) || this;
        _this.toggleOption = function (option) {
            var optionIndex = _this.state.value.indexOf(option.value);
            var value = __spreadArrays(_this.state.value);
            if (optionIndex === -1) {
                value.push(option.value);
            }
            else {
                value.splice(optionIndex, 1);
            }
            if (!('value' in _this.props)) {
                _this.setState({ value: value });
            }
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange(value);
            }
        };
        _this.state = {
            value: props.value || props.defaultValue || []
        };
        return _this;
    }
    CheckboxGroup.getDerivedStateFromProps = function (nextProps) {
        if ('value' in nextProps) {
            return {
                value: nextProps.value || []
            };
        }
        return null;
    };
    CheckboxGroup.prototype.getChildContext = function () {
        return {
            checkboxGroup: {
                toggleOption: this.toggleOption,
                value: this.state.value,
                disabled: this.props.disabled
            }
        };
    };
    CheckboxGroup.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    };
    CheckboxGroup.prototype.getOptions = function () {
        var options = this.props.options;
        // https://github.com/Microsoft/TypeScript/issues/7960
        return options.map(function (option) {
            if (typeof option === 'string') {
                return {
                    label: option,
                    value: option
                };
            }
            return option;
        });
    };
    CheckboxGroup.prototype.render = function () {
        var _this = this;
        var _a = this, props = _a.props, state = _a.state;
        var prefixCls = props.prefixCls, className = props.className, style = props.style, options = props.options;
        var groupPrefixCls = prefixCls + "-group";
        var children = props.children;
        if (options && options.length > 0) {
            children = this.getOptions().map(function (option) { return (React.createElement(Checkbox, { prefixCls: prefixCls, key: option.value.toString(), disabled: 'disabled' in option ? option.disabled : props.disabled, value: option.value, checked: state.value.indexOf(option.value) !== -1, onChange: function () { return _this.toggleOption(option); }, className: groupPrefixCls + "-item" }, option.label)); });
        }
        var classString = classNames(groupPrefixCls, className);
        return (React.createElement("div", { className: classString, style: style }, children));
    };
    CheckboxGroup.defaultProps = {
        options: [],
        prefixCls: 'fishd-checkbox'
    };
    CheckboxGroup.propTypes = {
        defaultValue: PropTypes.array,
        value: PropTypes.array,
        options: PropTypes.array.isRequired,
        onChange: PropTypes.func
    };
    CheckboxGroup.childContextTypes = {
        checkboxGroup: PropTypes.any
    };
    return CheckboxGroup;
}(React.Component));
polyfill(CheckboxGroup);
export default CheckboxGroup;
