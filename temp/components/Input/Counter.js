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
import omit from 'omit.js';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import TextArea from './TextArea';
function countValue(value) {
    return value.length;
}
var Counter = /** @class */ (function (_super) {
    __extends(Counter, _super);
    function Counter(props) {
        var _this = _super.call(this, props) || this;
        _this.saveTextarea = function (node) {
            _this.textarea = node;
        };
        _this.handleClick = function () {
            _this.focus();
        };
        _this.handleTextareaChange = function (e) {
            var onChange = _this.props.onChange;
            var textareaValue = _this.textarea && _this.textarea.textAreaRef.value;
            _this.setState({
                value: textareaValue
            });
            if (onChange) {
                onChange(e);
            }
        };
        _this.getCount = function () {
            var count = _this.props.count;
            var value = _this.state.value;
            if (!value) {
                return 0;
            }
            // 自定义计数方法
            if (count) {
                return count(String(value));
            }
            return countValue(String(value));
        };
        var value = '';
        if ('value' in props) {
            value = props.value;
        }
        else if ('defaultValue' in props) {
            value = props.defaultValue;
        }
        _this.state = {
            value: value,
            prevProps: props
        };
        return _this;
    }
    Counter.getDerivedStateFromProps = function (nextProps, prevState) {
        var _a = prevState.prevProps, prevProps = _a === void 0 ? {} : _a;
        var newState = { prevProps: nextProps };
        if (prevProps.value !== nextProps.value) {
            newState.value = nextProps.value;
        }
        return newState;
    };
    Counter.prototype.focus = function () {
        this.textarea.focus();
    };
    Counter.prototype.blur = function () {
        this.textarea.blur();
    };
    Counter.prototype.getTextAreaClassName = function () {
        var _a;
        var _b = this.props, inputPrefixCls = _b.inputPrefixCls, className = _b.className, disabled = _b.disabled;
        return classNames(inputPrefixCls, className, (_a = {},
            _a[inputPrefixCls + "-disabled"] = disabled,
            _a));
    };
    Counter.prototype.render = function () {
        var _a;
        var _b = this.props, inputPrefixCls = _b.inputPrefixCls, className = _b.className, prefixCls = _b.prefixCls, disabled = _b.disabled, limit = _b.limit;
        var inputClassName = classNames(className, (_a = {},
            _a["" + prefixCls] = true,
            _a[inputPrefixCls + "-disabled"] = disabled,
            _a));
        var textareaClassName = classNames(inputPrefixCls, className);
        var otherProps = omit(this.props, [
            'inputPrefixCls',
            'prefixCls',
            'limit',
            'count',
            'value',
            'onChange'
        ]);
        var total = this.getCount();
        return (React.createElement("span", { className: inputClassName, onClick: this.handleClick },
            React.createElement(TextArea, __assign({}, otherProps, { className: textareaClassName, maxLength: limit, onChange: this.handleTextareaChange, value: this.state.value, ref: this.saveTextarea })),
            React.createElement("span", { className: prefixCls + "-footer" },
                React.createElement("span", { className: prefixCls + "-indicator" },
                    total,
                    "/",
                    limit))));
    };
    Counter.defaultProps = {
        inputPrefixCls: 'fishd-input',
        prefixCls: 'fishd-input-counter'
    };
    return Counter;
}(React.Component));
polyfill(Counter);
export default Counter;
