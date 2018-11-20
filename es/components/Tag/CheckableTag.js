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
export default class CheckableTag extends React.Component {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            const { checked, onChange } = this.props;
            if (onChange) {
                onChange(!checked);
            }
        };
    }
    render() {
        const _a = this.props, { prefixCls = 'fishd-tag', className, checked } = _a, restProps = __rest(_a, ["prefixCls", "className", "checked"]);
        const cls = classNames(prefixCls, {
            [`${prefixCls}-checkable`]: true,
            [`${prefixCls}-checkable-checked`]: checked,
        }, className);
        delete restProps.onChange; // TypeScript cannot check delete now.
        return React.createElement("div", Object.assign({}, restProps, { className: cls, onClick: this.handleClick }));
    }
}
