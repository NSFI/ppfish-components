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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
import classNames from 'classnames';
import TimelineItem from './TimelineItem';
import Icon from '../Icon';
var Timeline = /** @class */ (function (_super) {
    __extends(Timeline, _super);
    function Timeline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Timeline.prototype.render = function () {
        var _a;
        var _b = this.props, prefixCls = _b.prefixCls, _c = _b.pending, pending = _c === void 0 ? null : _c, pendingDot = _b.pendingDot, children = _b.children, className = _b.className, reverse = _b.reverse, mode = _b.mode, restProps = __rest(_b, ["prefixCls", "pending", "pendingDot", "children", "className", "reverse", "mode"]);
        var pendingNode = typeof pending === 'boolean' ? null : pending;
        var classString = classNames(prefixCls, (_a = {},
            _a[prefixCls + "-pending"] = !!pending,
            _a[prefixCls + "-reverse"] = !!reverse,
            _a[prefixCls + "-" + mode] = !!mode,
            _a), className);
        var pendingItem = pending ? (React.createElement(TimelineItem, { pending: !!pending, dot: pendingDot || React.createElement(Icon, { type: "load-line", spinning: true }) }, pendingNode)) : null;
        var timeLineItems = reverse
            ? __spreadArrays([pendingItem], React.Children.toArray(children).reverse()) : __spreadArrays(React.Children.toArray(children), [pendingItem]);
        // Remove falsy items
        var truthyItems = timeLineItems.filter(function (item) { return !!item; });
        var itemsCount = React.Children.count(truthyItems);
        var lastCls = prefixCls + "-item-last";
        var items = React.Children.map(truthyItems, function (ele, idx) {
            return React.cloneElement(ele, {
                className: classNames([
                    ele.props.className,
                    !reverse && !!pending
                        ? idx === itemsCount - 2
                            ? lastCls
                            : ''
                        : idx === itemsCount - 1
                            ? lastCls
                            : '',
                    mode === 'alternate'
                        ? idx % 2 === 0
                            ? prefixCls + "-item-left"
                            : prefixCls + "-item-right"
                        : mode === 'right'
                            ? prefixCls + "-item-right"
                            : ''
                ])
            });
        });
        return (React.createElement("ul", __assign({}, restProps, { className: classString }), items));
    };
    Timeline.Item = TimelineItem;
    Timeline.defaultProps = {
        prefixCls: 'fishd-timeline',
        reverse: false,
        mode: ''
    };
    return Timeline;
}(React.Component));
export default Timeline;
