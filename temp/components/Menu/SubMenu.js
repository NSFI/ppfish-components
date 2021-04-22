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
import classNames from 'classnames';
import { SubMenu as RcSubMenu } from './src';
var SubMenu = /** @class */ (function (_super) {
    __extends(SubMenu, _super);
    function SubMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onKeyDown = function (e) {
            _this.subMenu.onKeyDown(e);
        };
        _this.saveSubMenu = function (subMenu) {
            _this.subMenu = subMenu;
        };
        return _this;
    }
    SubMenu.prototype.render = function () {
        var _a = this.props, rootPrefixCls = _a.rootPrefixCls, className = _a.className;
        var theme = this.context.menuTheme;
        return (React.createElement(RcSubMenu, __assign({}, this.props, { ref: this.saveSubMenu, popupClassName: classNames(rootPrefixCls + "-" + theme, className) })));
    };
    SubMenu.contextTypes = {
        menuTheme: PropTypes.string
    };
    // fix issue:https://github.com/ant-design/ant-design/issues/8666
    SubMenu.isSubMenu = 1;
    return SubMenu;
}(React.Component));
export default SubMenu;
