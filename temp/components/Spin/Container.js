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
import classNames from 'classnames';
import omit from 'omit.js';
var Container = function (props) {
    var children = props.children, _a = props.className, className = _a === void 0 ? '' : _a, _b = props.prefixCls, prefixCls = _b === void 0 ? 'fishd-spin' : _b;
    var otherProps = omit(props, ['className', 'prefixCls']);
    var classString = classNames(prefixCls + "-container", className);
    return (React.createElement("div", __assign({}, otherProps, { className: classString }), children));
};
export default Container;
