var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
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
}
import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import Icon from '../Icon/index';
import isNumeric from '../../utils/isNumeric';
const dimensionMap = {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px',
};
const generateId = (() => {
    let i = 0;
    return (prefix = '') => {
        i += 1;
        return `${prefix}${i}`;
    };
})();
export default class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.responsiveHandler = (mql) => {
            this.setState({ below: mql.matches });
            const { onBreakpoint } = this.props;
            if (onBreakpoint) {
                onBreakpoint(mql.matches);
            }
            if (this.state.collapsed !== mql.matches) {
                this.setCollapsed(mql.matches, 'responsive');
            }
        };
        this.setCollapsed = (collapsed, type) => {
            if (!('collapsed' in this.props)) {
                this.setState({
                    collapsed,
                });
            }
            const { onCollapse } = this.props;
            if (onCollapse) {
                onCollapse(collapsed, type);
            }
        };
        this.toggle = () => {
            const collapsed = !this.state.collapsed;
            this.setCollapsed(collapsed, 'clickTrigger');
        };
        this.belowShowChange = () => {
            this.setState({ belowShow: !this.state.belowShow });
        };
        this.uniqueId = generateId('fishd-sider-');
        let matchMedia;
        if (typeof window !== 'undefined') {
            matchMedia = window.matchMedia;
        }
        if (matchMedia && props.breakpoint && props.breakpoint in dimensionMap) {
            this.mql = matchMedia(`(max-width: ${dimensionMap[props.breakpoint]})`);
        }
        let collapsed;
        if ('collapsed' in props) {
            collapsed = props.collapsed;
        }
        else {
            collapsed = props.defaultCollapsed;
        }
        this.state = {
            collapsed,
            below: false,
        };
    }
    getChildContext() {
        return {
            siderCollapsed: this.state.collapsed,
            collapsedWidth: this.props.collapsedWidth,
        };
    }
    componentWillReceiveProps(nextProps) {
        if ('collapsed' in nextProps) {
            this.setState({
                collapsed: nextProps.collapsed,
            });
        }
    }
    componentDidMount() {
        if (this.mql) {
            this.mql.addEventListener('change', this.responsiveHandler);
            this.responsiveHandler(this.mql);
        }
        if (this.context.siderHook) {
            this.context.siderHook.addSider(this.uniqueId);
        }
    }
    componentWillUnmount() {
        if (this.mql) {
            this.mql.removeListener(this.responsiveHandler);
        }
        if (this.context.siderHook) {
            this.context.siderHook.removeSider(this.uniqueId);
        }
    }
    render() {
        const _a = this.props, { prefixCls, className, theme, collapsible, reverseArrow, trigger, style, width, collapsedWidth } = _a, others = __rest(_a, ["prefixCls", "className", "theme", "collapsible", "reverseArrow", "trigger", "style", "width", "collapsedWidth"]);
        const divProps = omit(others, ['collapsed',
            'defaultCollapsed', 'onCollapse', 'breakpoint', 'onBreakpoint']);
        const rawWidth = this.state.collapsed ? collapsedWidth : width;
        // use "px" as fallback unit for width
        const siderWidth = isNumeric(rawWidth) ? `${rawWidth}px` : String(rawWidth);
        // special trigger when collapsedWidth == 0
        const zeroWidthTrigger = parseFloat(String(collapsedWidth || 0)) === 0 ? (React.createElement("span", { onClick: this.toggle, className: `${prefixCls}-zero-width-trigger` },
            React.createElement(Icon, { type: "bars" }))) : null;
        const iconObj = {
            'expanded': reverseArrow ? React.createElement(Icon, { type: "right" }) : React.createElement(Icon, { type: "left" }),
            'collapsed': reverseArrow ? React.createElement(Icon, { type: "left" }) : React.createElement(Icon, { type: "right" }),
        };
        const status = this.state.collapsed ? 'collapsed' : 'expanded';
        const defaultTrigger = iconObj[status];
        const triggerDom = (trigger !== null ?
            zeroWidthTrigger || (React.createElement("div", { className: `${prefixCls}-trigger`, onClick: this.toggle, style: { width: siderWidth } }, trigger || defaultTrigger)) : null);
        const divStyle = Object.assign({}, style, { flex: `0 0 ${siderWidth}`, maxWidth: siderWidth, minWidth: siderWidth, width: siderWidth });
        const siderCls = classNames(className, prefixCls, `${prefixCls}-${theme}`, {
            [`${prefixCls}-collapsed`]: !!this.state.collapsed,
            [`${prefixCls}-has-trigger`]: collapsible && trigger !== null && !zeroWidthTrigger,
            [`${prefixCls}-below`]: !!this.state.below,
            [`${prefixCls}-zero-width`]: parseFloat(siderWidth) === 0,
        });
        return (React.createElement("div", Object.assign({ className: siderCls }, divProps, { style: divStyle }),
            React.createElement("div", { className: `${prefixCls}-children` }, this.props.children),
            collapsible || (this.state.below && zeroWidthTrigger) ? triggerDom : null));
    }
}
Sider.__FISHD_LAYOUT_SIDER = true;
Sider.defaultProps = {
    prefixCls: 'fishd-layout-sider',
    collapsible: false,
    defaultCollapsed: false,
    reverseArrow: false,
    width: 200,
    collapsedWidth: 80,
    style: {},
    theme: 'dark',
};
Sider.childContextTypes = {
    siderCollapsed: PropTypes.bool,
    collapsedWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
Sider.contextTypes = {
    siderHook: PropTypes.object,
};
