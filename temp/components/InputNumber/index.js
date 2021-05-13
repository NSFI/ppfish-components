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
import classNames from 'classnames';
import RcInputNumber from './src';
import './style/index.less';
var InputNumber = /** @class */ (function (_super) {
    __extends(InputNumber, _super);
    function InputNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputNumber.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props, className = _b.className, size = _b.size, others = __rest(_b, ["className", "size"]);
        var inputNumberClass = classNames((_a = {},
            _a[this.props.prefixCls + "-lg"] = size === 'large',
            _a[this.props.prefixCls + "-sm"] = size === 'small',
            _a), className);
        return (React.createElement(RcInputNumber, __assign({ ref: function (c) { return (_this.inputNumberRef = c); }, className: inputNumberClass }, others)));
    };
    InputNumber.prototype.focus = function () {
        this.inputNumberRef.focus();
    };
    InputNumber.prototype.blur = function () {
        this.inputNumberRef.blur();
    };
    InputNumber.defaultProps = {
        prefixCls: 'fishd-input-number',
        step: 1
    };
    return InputNumber;
}(React.Component));
export default InputNumber;
