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
import classNames from 'classnames';
var stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
var objectOrNumber = PropTypes.oneOfType([PropTypes.object, PropTypes.number]);
var Col = /** @class */ (function (_super) {
    __extends(Col, _super);
    function Col() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Col.prototype.render = function () {
        var _a;
        var props = this.props;
        var span = props.span, order = props.order, offset = props.offset, push = props.push, pull = props.pull, className = props.className, style = props.style, children = props.children, _b = props.prefixCls, prefixCls = _b === void 0 ? 'fishd-col' : _b, others = __rest(props, ["span", "order", "offset", "push", "pull", "className", "style", "children", "prefixCls"]);
        var sizeClassObj = {};
        ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(function (size) {
            var _a;
            var sizeProps = {};
            if (typeof props[size] === 'number') {
                sizeProps.span = props[size];
            }
            else if (typeof props[size] === 'object') {
                sizeProps = props[size] || {};
            }
            delete others[size];
            sizeClassObj = __assign(__assign({}, sizeClassObj), (_a = {}, _a[prefixCls + "-" + size + "-" + sizeProps.span] = sizeProps.span !== undefined, _a[prefixCls + "-" + size + "-order-" + sizeProps.order] = sizeProps.order || sizeProps.order === 0, _a[prefixCls + "-" + size + "-offset-" + sizeProps.offset] = sizeProps.offset || sizeProps.offset === 0, _a[prefixCls + "-" + size + "-push-" + sizeProps.push] = sizeProps.push || sizeProps.push === 0, _a[prefixCls + "-" + size + "-pull-" + sizeProps.pull] = sizeProps.pull || sizeProps.pull === 0, _a));
        });
        var classes = classNames((_a = {},
            _a[prefixCls + "-" + span] = span !== undefined,
            _a[prefixCls + "-order-" + order] = order,
            _a[prefixCls + "-offset-" + offset] = offset,
            _a[prefixCls + "-push-" + push] = push,
            _a[prefixCls + "-pull-" + pull] = pull,
            _a), className, sizeClassObj);
        return (React.createElement("div", __assign({}, others, { className: classes, style: style }), children));
    };
    Col.propTypes = {
        span: stringOrNumber,
        order: stringOrNumber,
        offset: stringOrNumber,
        push: stringOrNumber,
        pull: stringOrNumber,
        className: PropTypes.string,
        style: PropTypes.object,
        children: PropTypes.node,
        xs: objectOrNumber,
        sm: objectOrNumber,
        md: objectOrNumber,
        lg: objectOrNumber,
        xl: objectOrNumber,
        xxl: objectOrNumber
    };
    return Col;
}(React.Component));
export default Col;
