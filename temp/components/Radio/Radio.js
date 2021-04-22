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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import RcCheckbox from '../Checkbox/src/Checkbox.js';
// case sensitive
var Radio = /** @class */ (function (_super) {
    __extends(Radio, _super);
    function Radio() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.saveCheckbox = function (node) {
            _this.rcCheckbox = node;
        };
        return _this;
    }
    Radio.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
        return (!shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState) ||
            !shallowEqual(this.context.radioGroup, nextContext.radioGroup));
    };
    Radio.prototype.focus = function () {
        this.rcCheckbox.focus();
    };
    Radio.prototype.blur = function () {
        this.rcCheckbox.blur();
    };
    Radio.prototype.render = function () {
        var _a;
        var _b = this, props = _b.props, context = _b.context;
        var prefixCls = props.prefixCls, className = props.className, children = props.children, style = props.style, restProps = __rest(props, ["prefixCls", "className", "children", "style"]);
        var radioGroup = context.radioGroup;
        var radioProps = __assign({}, restProps);
        if (radioGroup) {
            radioProps.name = radioGroup.name;
            radioProps.onChange = radioGroup.onChange;
            radioProps.checked = props.value === radioGroup.value;
            radioProps.disabled = props.disabled || radioGroup.disabled;
        }
        var wrapperClassString = classNames(className, (_a = {},
            _a[prefixCls + "-wrapper"] = true,
            _a[prefixCls + "-wrapper-checked"] = radioProps.checked,
            _a[prefixCls + "-wrapper-disabled"] = radioProps.disabled,
            _a));
        return (React.createElement("label", { className: wrapperClassString, style: style, onMouseEnter: props.onMouseEnter, onMouseLeave: props.onMouseLeave },
            React.createElement(RcCheckbox, __assign({}, radioProps, { prefixCls: prefixCls, ref: this.saveCheckbox })),
            children !== undefined ? React.createElement("span", null, children) : null));
    };
    Radio.defaultProps = {
        prefixCls: 'fishd-radio',
        type: 'radio'
    };
    Radio.contextTypes = {
        radioGroup: PropTypes.any
    };
    return Radio;
}(React.Component));
export default Radio;
