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
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleKeyDown = function (e) {
            var _a = _this.props, onPressEnter = _a.onPressEnter, onKeyDown = _a.onKeyDown;
            if (e.keyCode === 13 && onPressEnter) {
                onPressEnter(e);
            }
            if (onKeyDown) {
                onKeyDown(e);
            }
        };
        _this.saveInput = function (node) {
            _this.input = node;
        };
        return _this;
    }
    Input.prototype.focus = function () {
        this.input.focus();
    };
    Input.prototype.blur = function () {
        this.input.blur();
    };
    Input.prototype.getInputClassName = function () {
        var _a;
        var _b = this.props, prefixCls = _b.prefixCls, size = _b.size, disabled = _b.disabled;
        return classNames(prefixCls, (_a = {},
            _a[prefixCls + "-sm"] = size === 'small',
            _a[prefixCls + "-lg"] = size === 'large',
            _a[prefixCls + "-disabled"] = disabled,
            _a));
    };
    Input.prototype.renderLabeledInput = function (children) {
        var _a, _b;
        var props = this.props;
        // Not wrap when there is not addons
        if (!props.addonBefore && !props.addonAfter) {
            return children;
        }
        var wrapperClassName = props.prefixCls + "-group";
        var addonClassName = wrapperClassName + "-addon";
        var addonBefore = props.addonBefore ? (React.createElement("span", { className: addonClassName }, props.addonBefore)) : null;
        var addonAfter = props.addonAfter ? (React.createElement("span", { className: addonClassName }, props.addonAfter)) : null;
        var className = classNames(props.prefixCls + "-wrapper", (_a = {},
            _a[wrapperClassName] = addonBefore || addonAfter,
            _a));
        var groupClassName = classNames(props.prefixCls + "-group-wrapper", (_b = {},
            _b[props.prefixCls + "-group-wrapper-sm"] = props.size === 'small',
            _b[props.prefixCls + "-group-wrapper-lg"] = props.size === 'large',
            _b));
        // Need another wrapper for changing display:table to display:inline-block
        // and put style prop in wrapper
        if (addonBefore || addonAfter) {
            return (React.createElement("span", { className: groupClassName, style: props.style },
                React.createElement("span", { className: className },
                    addonBefore,
                    React.cloneElement(children, { style: null }),
                    addonAfter)));
        }
        return (React.createElement("span", { className: className },
            addonBefore,
            children,
            addonAfter));
    };
    Input.prototype.renderLabeledIcon = function (children) {
        var _a;
        var props = this.props;
        if (!('prefix' in props || 'suffix' in props)) {
            return children;
        }
        var prefix = props.prefix ? (React.createElement("span", { className: props.prefixCls + "-prefix" }, props.prefix)) : null;
        var suffix = props.suffix ? (React.createElement("span", { className: props.prefixCls + "-suffix" }, props.suffix)) : null;
        var affixWrapperCls = classNames(props.className, props.prefixCls + "-affix-wrapper", (_a = {},
            _a[props.prefixCls + "-affix-wrapper-sm"] = props.size === 'small',
            _a[props.prefixCls + "-affix-wrapper-lg"] = props.size === 'large',
            _a));
        return (React.createElement("span", { className: affixWrapperCls, style: props.style },
            prefix,
            React.cloneElement(children, {
                style: null,
                className: this.getInputClassName()
            }),
            suffix));
    };
    Input.prototype.renderInput = function () {
        var _a = this.props, value = _a.value, className = _a.className;
        // Fix https://fb.me/react-unknown-prop
        var otherProps = omit(this.props, [
            'prefixCls',
            'onPressEnter',
            'addonBefore',
            'addonAfter',
            'prefix',
            'suffix'
        ]);
        if ('value' in this.props) {
            otherProps.value = fixControlledValue(value);
            // Input elements must be either controlled or uncontrolled,
            // specify either the value prop, or the defaultValue prop, but not both.
            delete otherProps.defaultValue;
        }
        return this.renderLabeledIcon(React.createElement("input", __assign({}, otherProps, { className: classNames(this.getInputClassName(), className), onKeyDown: this.handleKeyDown, ref: this.saveInput })));
    };
    Input.prototype.render = function () {
        return this.renderLabeledInput(this.renderInput());
    };
    Input.defaultProps = {
        prefixCls: 'fishd-input',
        type: 'text',
        disabled: false
    };
    Input.propTypes = {
        type: PropTypes.string,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        size: PropTypes.oneOf(['small', 'default', 'large']),
        maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        disabled: PropTypes.bool,
        value: PropTypes.any,
        defaultValue: PropTypes.any,
        className: PropTypes.string,
        addonBefore: PropTypes.node,
        addonAfter: PropTypes.node,
        prefixCls: PropTypes.string,
        autosize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
        onPressEnter: PropTypes.func,
        onKeyDown: PropTypes.func,
        onKeyUp: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        prefix: PropTypes.node,
        suffix: PropTypes.node
    };
    return Input;
}(React.Component));
export default Input;
