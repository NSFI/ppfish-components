var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import classNames from 'classnames';
const ButtonGroup = (props) => {
    const { prefixCls = 'fishd-btn-group', size, className } = props, others = __rest(props, ["prefixCls", "size", "className"]);
    // large => lg
    // small => sm
    let sizeCls = '';
    switch (size) {
        case 'large':
            sizeCls = 'lg';
            break;
        case 'small':
            sizeCls = 'sm';
        default:
            break;
    }
    const classes = classNames(prefixCls, {
        [`${prefixCls}-${sizeCls}`]: sizeCls,
    }, className);
    return React.createElement("div", Object.assign({}, others, { className: classes }));
};
export default ButtonGroup;
