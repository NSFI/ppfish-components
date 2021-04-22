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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import CollapsePanel from './Panel';
function toArray(activeKey) {
    var currentActiveKey = activeKey;
    if (!Array.isArray(currentActiveKey)) {
        currentActiveKey = currentActiveKey ? [currentActiveKey] : [];
    }
    return currentActiveKey;
}
var Collapse = /** @class */ (function (_super) {
    __extends(Collapse, _super);
    function Collapse(props) {
        var _this = _super.call(this, props) || this;
        // class fields
        _this.collapse = null;
        // class fields
        _this.currentKey = null;
        var activeKey = props.activeKey, defaultActiveKey = props.defaultActiveKey, statusList = props.statusList;
        var currentActiveKey = defaultActiveKey;
        if ('activeKey' in props) {
            currentActiveKey = activeKey;
        }
        _this.state = {
            // 已激活面板的key
            activeKey: toArray(currentActiveKey),
            statusList: statusList || new Array(_this.props.children.length).fill(true),
            prevProps: props
        };
        // 当前点击的key
        _this.currentKey = null;
        return _this;
    }
    Collapse.getDerivedStateFromProps = function (nextProps, prevState) {
        var prevProps = prevState.prevProps;
        var newState = {
            prevProps: nextProps
        };
        if ('activeKey' in nextProps) {
            newState.activeKey = toArray(nextProps.activeKey);
        }
        if (nextProps.statusList !== prevProps.statusList) {
            newState.statusList = nextProps.statusList;
        }
        return newState;
    };
    Collapse.prototype.componentDidUpdate = function (prevProps, prevState) {
        this.scrollToHeader();
    };
    Collapse.prototype.onClickItem = function (key) {
        var _this = this;
        return function () {
            var activeKey = _this.state.activeKey;
            // 手风琴效果,只展开一项,收起其他项
            if (_this.props.accordion) {
                activeKey = activeKey[0] === key ? [] : [key];
            }
            else {
                // @ts-ignore
                activeKey = __spreadArrays(activeKey);
                var index = activeKey.indexOf(key);
                var isActive = index > -1;
                if (isActive) {
                    // remove active state
                    activeKey.splice(index, 1);
                }
                else {
                    activeKey.push(key);
                }
            }
            // 当前点击的key
            _this.currentKey = key;
            _this.setActiveKey(activeKey);
        };
    };
    Collapse.prototype.onCloseItem = function (key) {
        var _this = this;
        return function () {
            var _a = _this.props, children = _a.children, statusList = _a.statusList;
            var keyList = Children.map(children, function (child, index) {
                return child.key || String(index);
            });
            var index = keyList.findIndex(function (item) {
                return key == item;
            });
            statusList[index] = false;
            _this.props.close(statusList);
        };
    };
    Collapse.prototype.getItems = function () {
        var _this = this;
        var activeKey = this.state.activeKey;
        var _a = this.props, prefixCls = _a.prefixCls, accordion = _a.accordion, showClose = _a.showClose;
        return Children.map(this.props.children, function (child, index) {
            if (!_this.state.statusList[index]) {
                return null;
            }
            // If there is no key provide, use the panel order as default key
            var key = child.key || String(index);
            var header = child.props.header;
            var isActive = false;
            if (accordion) {
                isActive = activeKey[0] === key;
            }
            else {
                isActive = activeKey.indexOf(key) > -1;
            }
            var props = {
                itemKey: function (el) { return (_this[key] = el); },
                header: header,
                showClose: showClose,
                isActive: isActive,
                prefixCls: prefixCls,
                children: child.props.children,
                onItemClick: _this.onClickItem(key).bind(_this),
                onCloseItem: _this.onCloseItem(key).bind(_this)
            };
            return React.cloneElement(child, props);
        });
    };
    Collapse.prototype.setActiveKey = function (activeKey) {
        if (!('activeKey' in this.props)) {
            this.setState({
                activeKey: activeKey
            });
        }
        this.props.onChange(this.props.accordion ? activeKey[0] : activeKey);
    };
    Collapse.prototype.scrollToHeader = function () {
        var activeKey = this.state.activeKey;
        var isScrollToHeader = this.props.isScrollToHeader;
        var currentKey = this.currentKey;
        var collapse = this.collapse;
        if (!isScrollToHeader || !currentKey || !activeKey.includes(currentKey)) {
            return;
        }
        var el = this[currentKey];
        var collapseRect = collapse && collapse.getBoundingClientRect();
        var elRect = el && el.getBoundingClientRect();
        var diff = collapse.scrollHeight - collapse.clientHeight;
        if (collapseRect && elRect) {
            var toTop = collapse.scrollTop + elRect.top - collapseRect.top;
            if (toTop < diff) {
                collapse.scrollTop = toTop;
            }
        }
        this.currentKey = null;
    };
    Collapse.prototype.render = function () {
        var _this = this;
        var _a = this.props, prefixCls = _a.prefixCls, className = _a.className, isScrollToHeader = _a.isScrollToHeader, bordered = _a.bordered;
        var clsObj = {};
        var style = null;
        clsObj[prefixCls] = true;
        if (className) {
            clsObj[className] = true;
        }
        if (!bordered) {
            clsObj[prefixCls + "-borderless"] = true;
        }
        if (isScrollToHeader) {
            style = { overflowY: 'auto', overflowX: 'hidden' };
        }
        return (React.createElement("div", { className: classNames(clsObj), ref: function (node) { return (_this.collapse = node); }, style: style }, this.getItems()));
    };
    Collapse.propTypes = {
        children: PropTypes.node,
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        // 是否开启功能：点击header后将header置顶
        isScrollToHeader: PropTypes.bool,
        // 是否开启功能：手风琴效果，既每次点击header只展开一项
        accordion: PropTypes.bool,
        // 是否开启删除功能
        showClose: PropTypes.bool,
        // 是否显示边框
        bordered: PropTypes.bool,
        // 是否显示面板的状态数组
        statusList: PropTypes.array,
        onChange: PropTypes.func,
        close: PropTypes.func
    };
    Collapse.defaultProps = {
        prefixCls: 'fishd-collapse',
        isScrollToHeader: false,
        accordion: false,
        showClose: false,
        bordered: true,
        onChange: function (value) { },
        close: function (e) { }
    };
    Collapse.Panel = CollapsePanel;
    return Collapse;
}(Component));
polyfill(Collapse);
export default Collapse;
