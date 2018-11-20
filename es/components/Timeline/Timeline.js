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
import TimelineItem from './TimelineItem';
import Icon from '../Icon';
export default class Timeline extends React.Component {
    render() {
        const _a = this.props, { prefixCls, pending = null, pendingDot, children, className, reverse, mode } = _a, restProps = __rest(_a, ["prefixCls", "pending", "pendingDot", "children", "className", "reverse", "mode"]);
        const pendingNode = typeof pending === 'boolean' ? null : pending;
        const classString = classNames(prefixCls, {
            [`${prefixCls}-pending`]: !!pending,
            [`${prefixCls}-reverse`]: !!reverse,
            [`${prefixCls}-${mode}`]: !!mode,
        }, className);
        const pendingItem = !!pending ? (React.createElement(TimelineItem, { pending: !!pending, dot: pendingDot || React.createElement(Icon, { type: "load-line", spinning: true }) }, pendingNode)) : null;
        const timeLineItems = !!reverse
            ? [pendingItem, ...React.Children.toArray(children).reverse()]
            : [...React.Children.toArray(children), pendingItem];
        // Remove falsy items
        const truthyItems = timeLineItems.filter(item => !!item);
        const itemsCount = React.Children.count(truthyItems);
        const lastCls = `${prefixCls}-item-last`;
        const items = React.Children.map(truthyItems, (ele, idx) => React.cloneElement(ele, {
            className: classNames([
                ele.props.className,
                (!reverse && !!pending)
                    ? (idx === itemsCount - 2) ? lastCls : ''
                    : (idx === itemsCount - 1) ? lastCls : '',
                (mode === 'alternate')
                    ? (idx % 2 === 0) ? `${prefixCls}-item-left` : `${prefixCls}-item-right`
                    : (mode === 'right') ? `${prefixCls}-item-right` : '',
            ]),
        }));
        return (React.createElement("ul", Object.assign({}, restProps, { className: classString }), items));
    }
}
Timeline.Item = TimelineItem;
Timeline.defaultProps = {
    prefixCls: 'fishd-timeline',
    reverse: false,
    mode: '',
};
