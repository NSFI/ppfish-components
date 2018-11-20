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
import RcPagination from './src';
import classNames from 'classnames';
import Select from '../Select';
import MiniSelect from './MiniSelect';
export default class Pagination extends React.Component {
    render() {
        const _a = this.props, { className, size } = _a, restProps = __rest(_a, ["className", "size"]);
        const isSmall = size === 'small';
        return (React.createElement(RcPagination, Object.assign({}, restProps, { className: classNames(className, { mini: isSmall }), selectComponentClass: isSmall ? MiniSelect : Select })));
    }
}
Pagination.defaultProps = {
    prefixCls: 'fishd-pagination',
    selectPrefixCls: 'fishd-select',
};
