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
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Item } from './src';
import Tooltip from '../Tooltip';
var MenuItem = /** @class */ (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onKeyDown = function (e) {
            _this.menuItem.onKeyDown(e);
        };
        _this.saveMenuItem = function (menuItem) {
            _this.menuItem = menuItem;
        };
        return _this;
    }
    MenuItem.prototype.render = function () {
        var inlineCollapsed = this.context.inlineCollapsed;
        var props = this.props;
        return (React.createElement(Tooltip, { title: inlineCollapsed && props.level === 1 ? props.children : '', placement: "right", overlayClassName: props.rootPrefixCls + "-inline-collapsed-tooltip" },
            React.createElement(Item, __assign({}, props, { ref: this.saveMenuItem }))));
    };
    MenuItem.contextTypes = {
        inlineCollapsed: PropTypes.bool
    };
    MenuItem.isMenuItem = 1;
    return MenuItem;
}(React.Component));
export default MenuItem;
