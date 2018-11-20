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
import { findDOMNode } from 'react-dom';
import RcTabs, { TabPane, TabContent, ScrollableInkTabBar } from './src/index.js';
import classNames from 'classnames';
import Icon from '../Icon';
import Spin from '../Spin';
import warning from 'warning';
import './style/index.less';
function isFlexSupported() {
    if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
        const { documentElement } = window.document;
        return 'flex' in documentElement.style ||
            'webkitFlex' in documentElement.style ||
            'Flex' in documentElement.style ||
            'msFlex' in documentElement.style;
    }
    return false;
}
export default class Tabs extends React.Component {
    constructor() {
        super(...arguments);
        this.createNewTab = (targetKey) => {
            const onEdit = this.props.onEdit;
            if (onEdit) {
                onEdit(targetKey, 'add');
            }
        };
        this.removeTab = (targetKey, e) => {
            e.stopPropagation();
            if (!targetKey) {
                return;
            }
            const onEdit = this.props.onEdit;
            if (onEdit) {
                onEdit(targetKey, 'remove');
            }
        };
        this.handleChange = (activeKey) => {
            const onChange = this.props.onChange;
            if (onChange) {
                onChange(activeKey);
            }
        };
    }
    componentDidMount() {
        const NO_FLEX = ' no-flex';
        const tabNode = findDOMNode(this);
        if (tabNode && !isFlexSupported() && tabNode.className.indexOf(NO_FLEX) === -1) {
            tabNode.className += NO_FLEX;
        }
    }
    render() {
        let { prefixCls, className = '', size, type, tabPosition, children, tabBarExtraContent, tabBarStyle, hideAdd, loading, onTabClick, onPrevClick, onNextClick, animated, tabBarGutter, } = this.props;
        let { inkBarAnimated, tabPaneAnimated } = typeof animated === 'object' ? {
            inkBarAnimated: animated.inkBar,
            tabPaneAnimated: animated.tabPane,
        } : {
            inkBarAnimated: animated,
            tabPaneAnimated: animated,
        };
        let showInkBar = true;
        // card tabs should not have animation
        if (type !== 'line') {
            showInkBar = false;
            tabPaneAnimated = ('animated' in this.props) ? tabPaneAnimated : false;
        }
        warning(!(type.indexOf('card') >= 0 && (size === 'small' || size === 'large')), 'Tabs[type=card|editable-card] doesn\'t have small or large size, it\'s by designed.');
        const cls = classNames(className, {
            [`${prefixCls}-vertical`]: tabPosition === 'left' || tabPosition === 'right',
            [`${prefixCls}-${size}`]: !!size,
            [`${prefixCls}-card`]: type.indexOf('card') >= 0,
            [`${prefixCls}-${type}`]: true,
            [`${prefixCls}-no-animation`]: !tabPaneAnimated,
        });
        // only card type tabs can be added and closed
        let childrenWithClose = [];
        if (type === 'editable-card') {
            childrenWithClose = [];
            React.Children.forEach(children, (child, index) => {
                let closable = child.props.closable;
                closable = typeof closable === 'undefined' ? true : closable;
                const closeIcon = closable ? (React.createElement(Icon, { type: "close-tag-line", onClick: e => this.removeTab(child.key, e) })) : null;
                childrenWithClose.push(React.cloneElement(child, {
                    tab: (React.createElement("div", { className: closable ? undefined : `${prefixCls}-tab-unclosable` },
                        child.props.tab,
                        closeIcon)),
                    key: child.key || index,
                }));
            });
            // Add new tab handler
            if (!hideAdd) {
                tabBarExtraContent = (React.createElement("span", null,
                    React.createElement(Icon, { type: "upload-plus", className: `${prefixCls}-new-tab`, onClick: this.createNewTab }),
                    tabBarExtraContent));
            }
        }
        tabBarExtraContent = tabBarExtraContent ? (React.createElement("div", { className: `${prefixCls}-extra-content` }, tabBarExtraContent)) : null;
        const renderTabBar = () => (React.createElement(ScrollableInkTabBar, { showInkBar: showInkBar, inkBarAnimated: inkBarAnimated, extraContent: tabBarExtraContent, onTabClick: onTabClick, onPrevClick: onPrevClick, onNextClick: onNextClick, style: tabBarStyle, tabBarGutter: tabBarGutter }));
        let _a = this.props, { style: ctnerStyle } = _a, restProps = __rest(_a, ["style"]);
        return (React.createElement("div", { className: prefixCls + '-ctner', style: ctnerStyle },
            React.createElement(RcTabs, Object.assign({}, restProps, { className: cls, tabBarPosition: tabPosition, renderTabBar: renderTabBar, renderTabContent: () => React.createElement(TabContent, { animated: tabPaneAnimated, animatedWithMargin: true }), onChange: this.handleChange }), childrenWithClose.length > 0 ? childrenWithClose : children),
            React.createElement(Spin.Container, null,
                React.createElement(Spin, { spinning: loading }))));
    }
}
Tabs.TabPane = TabPane;
Tabs.defaultProps = {
    prefixCls: 'fishd-tabs',
    hideAdd: false,
    loading: false,
    size: 'default',
    tabPosition: 'top',
    type: 'line',
};
