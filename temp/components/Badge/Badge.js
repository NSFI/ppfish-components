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
import Animate from 'rc-animate';
import ScrollNumber from './ScrollNumber';
import classNames from 'classnames';
var Badge = /** @class */ (function (_super) {
    __extends(Badge, _super);
    function Badge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Badge.prototype.render = function () {
        var _a, _b, _c;
        var _d = this.props, count = _d.count, showZero = _d.showZero, prefixCls = _d.prefixCls, scrollNumberPrefixCls = _d.scrollNumberPrefixCls, overflowCount = _d.overflowCount, overflowType = _d.overflowType, className = _d.className, style = _d.style, children = _d.children, dot = _d.dot, status = _d.status, text = _d.text, offset = _d.offset, title = _d.title, restProps = __rest(_d, ["count", "showZero", "prefixCls", "scrollNumberPrefixCls", "overflowCount", "overflowType", "className", "style", "children", "dot", "status", "text", "offset", "title"]);
        var displayCount = count > overflowCount
            ? overflowType === 'plus'
                ? overflowCount + "+"
                : '...'
            : count;
        var isZero = displayCount === '0' || displayCount === 0;
        var isDot = (dot && !isZero) || status;
        // dot mode don't need count
        if (isDot) {
            displayCount = '';
        }
        var isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
        var hidden = (isEmpty || (isZero && !showZero)) && !isDot;
        var statusCls = classNames((_a = {},
            _a[prefixCls + "-status-dot"] = !!status,
            _a[prefixCls + "-status-" + status] = !!status,
            _a));
        var scrollNumberCls = classNames((_b = {},
            _b[prefixCls + "-dot"] = isDot,
            _b[prefixCls + "-count"] = !isDot,
            _b[prefixCls + "-multiple-words"] = !isDot && count && count.toString && count.toString().length > 1,
            _b[prefixCls + "-status-" + status] = !!status,
            _b));
        var badgeCls = classNames(className, prefixCls, (_c = {},
            _c[prefixCls + "-status"] = !!status,
            _c[prefixCls + "-not-a-wrapper"] = !children,
            _c));
        var styleWithOffset = offset
            ? __assign({ marginLeft: offset[0], marginTop: offset[1] }, style) : style;
        // <Badge status="success" />
        if (!children && status) {
            return (React.createElement("span", __assign({}, restProps, { className: badgeCls, style: styleWithOffset }),
                React.createElement("span", { className: statusCls }),
                React.createElement("span", { className: prefixCls + "-status-text" }, text)));
        }
        var scrollNumber = hidden ? null : (React.createElement(ScrollNumber, { prefixCls: scrollNumberPrefixCls, "data-show": !hidden, className: scrollNumberCls, count: displayCount, title: title || count, style: styleWithOffset, key: "scrollNumber" }));
        var statusText = hidden || !text ? null : React.createElement("span", { className: prefixCls + "-status-text" }, text);
        return (React.createElement("span", __assign({}, restProps, { className: badgeCls }),
            children,
            React.createElement(Animate, { component: "", showProp: "data-show", transitionName: children ? prefixCls + "-zoom" : '', transitionAppear: true }, scrollNumber),
            statusText));
    };
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
        count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        showZero: PropTypes.bool,
        dot: PropTypes.bool,
        overflowCount: PropTypes.number
    };
    return Badge;
}(React.Component));
export default Badge;
