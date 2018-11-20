var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
/// <reference module="dom">
// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
let enquire;
if (typeof window !== 'undefined') {
    const matchMediaPolyfill = (mediaQuery) => {
        return {
            media: mediaQuery,
            matches: false,
            addListener() {
            },
            removeListener() {
            },
        };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
    enquire = require('enquire.js');
}
import * as React from 'react';
import { Children, cloneElement } from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
const responsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)',
};
export default class Row extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            screens: {},
        };
    }
    componentDidMount() {
        Object.keys(responsiveMap)
            .map((screen) => enquire.register(responsiveMap[screen], {
            match: () => {
                if (typeof this.props.gutter !== 'object') {
                    return;
                }
                this.setState((prevState) => ({
                    screens: Object.assign({}, prevState.screens, { [screen]: true }),
                }));
            },
            unmatch: () => {
                if (typeof this.props.gutter !== 'object') {
                    return;
                }
                this.setState((prevState) => ({
                    screens: Object.assign({}, prevState.screens, { [screen]: false }),
                }));
            },
            // Keep a empty destory to avoid triggering unmatch when unregister
            destroy() {
            },
        }));
    }
    componentWillUnmount() {
        Object.keys(responsiveMap)
            .map((screen) => enquire.unregister(responsiveMap[screen]));
    }
    getGutter() {
        const { gutter } = this.props;
        if (typeof gutter === 'object') {
            for (let i = 0; i <= responsiveArray.length; i++) {
                const breakpoint = responsiveArray[i];
                if (this.state.screens[breakpoint] && gutter[breakpoint] !== undefined) {
                    return gutter[breakpoint];
                }
            }
        }
        return gutter;
    }
    render() {
        const _a = this.props, { type, justify, align, className, style, children, prefixCls = 'fishd-row' } = _a, others = __rest(_a, ["type", "justify", "align", "className", "style", "children", "prefixCls"]);
        const gutter = this.getGutter();
        const classes = classNames({
            [prefixCls]: !type,
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${type}-${justify}`]: type && justify,
            [`${prefixCls}-${type}-${align}`]: type && align,
        }, className);
        const rowStyle = gutter > 0 ? Object.assign({ marginLeft: gutter / -2, marginRight: gutter / -2 }, style) : style;
        const cols = Children.map(children, (col) => {
            if (!col) {
                return null;
            }
            if (col.props && gutter > 0) {
                return cloneElement(col, {
                    style: Object.assign({ paddingLeft: gutter / 2, paddingRight: gutter / 2 }, col.props.style),
                });
            }
            return col;
        });
        const otherProps = Object.assign({}, others);
        delete otherProps.gutter;
        return React.createElement("div", Object.assign({}, otherProps, { className: classes, style: rowStyle }), cols);
    }
}
Row.defaultProps = {
    gutter: 0,
};
Row.propTypes = {
    type: PropTypes.string,
    align: PropTypes.string,
    justify: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    gutter: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    prefixCls: PropTypes.string,
};
