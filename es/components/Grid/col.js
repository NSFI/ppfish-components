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
import classNames from 'classnames';
const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
const objectOrNumber = PropTypes.oneOfType([PropTypes.object, PropTypes.number]);
export default class Col extends React.Component {
    render() {
        const props = this.props;
        const { span, order, offset, push, pull, className, style, children, prefixCls = 'fishd-col' } = props, others = __rest(props, ["span", "order", "offset", "push", "pull", "className", "style", "children", "prefixCls"]);
        let sizeClassObj = {};
        ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
            let sizeProps = {};
            if (typeof props[size] === 'number') {
                sizeProps.span = props[size];
            }
            else if (typeof props[size] === 'object') {
                sizeProps = props[size] || {};
            }
            delete others[size];
            sizeClassObj = Object.assign({}, sizeClassObj, { [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined, [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0, [`${prefixCls}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0, [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0, [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0 });
        });
        const classes = classNames({
            [`${prefixCls}-${span}`]: span !== undefined,
            [`${prefixCls}-order-${order}`]: order,
            [`${prefixCls}-offset-${offset}`]: offset,
            [`${prefixCls}-push-${push}`]: push,
            [`${prefixCls}-pull-${pull}`]: pull,
        }, className, sizeClassObj);
        return React.createElement("div", Object.assign({}, others, { className: classes, style: style }), children);
    }
}
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
    xxl: objectOrNumber,
};
