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
import * as PropTypes from 'prop-types';
import Animate from 'rc-animate';
import ScrollNumber from './ScrollNumber';
import classNames from 'classnames';
import './style/Badge.less';
export default class Badge extends React.Component {
    render() {
        const _a = this.props, { count, showZero, prefixCls, scrollNumberPrefixCls, overflowCount, overflowType, className, style, children, dot, status, text, offset, title } = _a, restProps = __rest(_a, ["count", "showZero", "prefixCls", "scrollNumberPrefixCls", "overflowCount", "overflowType", "className", "style", "children", "dot", "status", "text", "offset", "title"]);
        let displayCount = count > overflowCount ? (overflowType === 'plus' ? `${overflowCount}+` : '...') : count;
        const isZero = displayCount === '0' || displayCount === 0;
        const isDot = (dot && !isZero) || status;
        // dot mode don't need count
        if (isDot) {
            displayCount = '';
        }
        const isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
        const hidden = (isEmpty || (isZero && !showZero)) && !isDot;
        const statusCls = classNames({
            [`${prefixCls}-status-dot`]: !!status,
            [`${prefixCls}-status-${status}`]: !!status,
        });
        const scrollNumberCls = classNames({
            [`${prefixCls}-dot`]: isDot,
            [`${prefixCls}-count`]: !isDot,
            [`${prefixCls}-multiple-words`]: !isDot && count && count.toString && count.toString().length > 1,
            [`${prefixCls}-status-${status}`]: !!status,
        });
        const badgeCls = classNames(className, prefixCls, {
            [`${prefixCls}-status`]: !!status,
            [`${prefixCls}-not-a-wrapper`]: !children,
        });
        const styleWithOffset = offset ? Object.assign({ marginLeft: offset[0], marginTop: offset[1] }, style) : style;
        // <Badge status="success" />
        if (!children && status) {
            return (React.createElement("span", Object.assign({}, restProps, { className: badgeCls, style: styleWithOffset }),
                React.createElement("span", { className: statusCls }),
                React.createElement("span", { className: `${prefixCls}-status-text` }, text)));
        }
        const scrollNumber = hidden ? null : (React.createElement(ScrollNumber, { prefixCls: scrollNumberPrefixCls, "data-show": !hidden, className: scrollNumberCls, count: displayCount, title: title || count, style: styleWithOffset, key: "scrollNumber" }));
        const statusText = (hidden || !text) ? null : (React.createElement("span", { className: `${prefixCls}-status-text` }, text));
        return (React.createElement("span", Object.assign({}, restProps, { className: badgeCls }),
            children,
            React.createElement(Animate, { component: "", showProp: "data-show", transitionName: children ? `${prefixCls}-zoom` : '', transitionAppear: true }, scrollNumber),
            statusText));
    }
}
Badge.defaultProps = {
    prefixCls: 'fishd-badge',
    scrollNumberPrefixCls: 'fishd-scroll-number',
    count: null,
    showZero: false,
    dot: false,
    overflowCount: 99,
    overflowType: 'plus'
};
Badge.propTypes = {
    count: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    showZero: PropTypes.bool,
    dot: PropTypes.bool,
    overflowCount: PropTypes.number,
};
