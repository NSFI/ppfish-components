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
import classnames from 'classnames';
var PanelContent = /** @class */ (function (_super) {
    __extends(PanelContent, _super);
    function PanelContent(props) {
        return _super.call(this, props) || this;
    }
    PanelContent.prototype.shouldComponentUpdate = function (nextProps) {
        return this.props.isActive || nextProps.isActive;
    };
    PanelContent.prototype.render = function () {
        var _a;
        this._isActived = this._isActived || this.props.isActive;
        if (!this._isActived) {
            return null;
        }
        var _b = this.props, prefixCls = _b.prefixCls, isActive = _b.isActive, children = _b.children;
        var contentCls = classnames((_a = {},
            _a[prefixCls + "-content"] = true,
            _a[prefixCls + "-content-active"] = isActive,
            _a[prefixCls + "-content-inactive"] = !isActive,
            _a));
        return (React.createElement("div", { className: contentCls, role: "tabpanel" },
            React.createElement("div", { className: prefixCls + "-content-box" }, children)));
    };
    PanelContent.propTypes = {
        prefixCls: PropTypes.string,
        isActive: PropTypes.bool,
        children: PropTypes.node
    };
    return PanelContent;
}(Component));
export default PanelContent;
