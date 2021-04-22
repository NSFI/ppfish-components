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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import PanelContent from './PanelContent';
var CollapsePanel = /** @class */ (function (_super) {
    __extends(CollapsePanel, _super);
    function CollapsePanel(props) {
        var _this = _super.call(this, props) || this;
        _this.getHeader = function (status) {
            var header = _this.props.header;
            if (typeof header === 'function') {
                return header(status);
            }
            else {
                return header;
            }
        };
        _this.handleItemClick = _this.handleItemClick.bind(_this);
        _this.handleItemClose = _this.handleItemClose.bind(_this);
        _this.state = {
            isCustom: typeof _this.props.header === 'function' //是否显示箭头,不可关闭时不显示
        };
        return _this;
    }
    CollapsePanel.prototype.handleItemClick = function () {
        var _a = this.props, onItemClick = _a.onItemClick, disabled = _a.disabled;
        if (!disabled) {
            onItemClick();
        }
    };
    CollapsePanel.prototype.handleItemClose = function (e) {
        e.stopPropagation();
        var _a = this.props, onCloseItem = _a.onCloseItem, disabled = _a.disabled;
        if (!disabled) {
            onCloseItem();
        }
    };
    CollapsePanel.prototype.render = function () {
        var _a, _b;
        var _c = this.props, itemKey = _c.itemKey, className = _c.className, prefixCls = _c.prefixCls, disabled = _c.disabled, showClose = _c.showClose, style = _c.style, children = _c.children, isActive = _c.isActive;
        var isCustom = this.state.isCustom;
        var headerCls = classNames((_a = {},
            _a[prefixCls + "-header"] = true,
            _a[prefixCls + "-header-disabled"] = disabled,
            _a[prefixCls + "-header-close"] = showClose,
            _a[prefixCls + "-header-custom"] = isCustom,
            _a));
        var itemCls = classNames((_b = {},
            // 'clearfix': true,
            _b[prefixCls + "-item"] = true,
            _b[prefixCls + "-item-active"] = isActive,
            _b[className] = className,
            _b));
        var closeCls = classNames({
            close: true,
            'z-close-show': showClose
        });
        var getArrowIcon = function (isActive) {
            if (isActive) {
                return React.createElement(Icon, { className: "icon", type: "top" });
            }
            else {
                return React.createElement(Icon, { className: "icon", type: "bottom" });
            }
        };
        return (React.createElement("div", { className: itemCls, style: style },
            React.createElement("div", { className: headerCls, onClick: this.handleItemClick, role: "tab", "aria-expanded": isActive, ref: itemKey },
                React.createElement("div", { className: "arrow" }, getArrowIcon(isActive)),
                React.createElement("div", { className: "title" }, this.getHeader(isActive)),
                React.createElement("div", { className: closeCls, onClick: this.handleItemClose },
                    React.createElement(Icon, { className: "icon", type: "picture-close" }))),
            React.createElement(PanelContent, { prefixCls: prefixCls, isActive: isActive }, children)));
    };
    CollapsePanel.propTypes = {
        itemKey: PropTypes.func,
        className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        style: PropTypes.object,
        children: PropTypes.node,
        openAnimation: PropTypes.object,
        prefixCls: PropTypes.string,
        disabled: PropTypes.bool,
        header: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]),
        showClose: PropTypes.bool,
        isActive: PropTypes.bool,
        onItemClick: PropTypes.func,
        onCloseItem: PropTypes.func
    };
    CollapsePanel.defaultProps = {
        isActive: false,
        disabled: false,
        style: {},
        onItemClick: function () { },
        onCloseItem: function () { }
    };
    return CollapsePanel;
}(Component));
export default CollapsePanel;
