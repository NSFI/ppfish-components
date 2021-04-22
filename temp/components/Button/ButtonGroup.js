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
var ButtonGroup = function (props) {
    var _a;
    var _b = props.prefixCls, prefixCls = _b === void 0 ? 'fishd-btn-group' : _b, size = props.size, className = props.className, others = __rest(props, ["prefixCls", "size", "className"]);
    // large => lg
    // small => sm
    var sizeCls = '';
    switch (size) {
        case 'large':
            sizeCls = 'lg';
            break;
        case 'small':
            sizeCls = 'sm';
            break;
    }
    var classes = classNames(prefixCls, (_a = {},
        _a[prefixCls + "-" + sizeCls] = sizeCls,
        _a), className);
    return React.createElement("div", __assign({}, others, { className: classes }));
};
export default ButtonGroup;
