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
import RcTreeSelect, { TreeNode, SHOW_ALL, SHOW_PARENT, SHOW_CHILD, } from './rcTreeSelect';
import classNames from 'classnames';
import warning from 'warning';
import ConfigConsumer from '../Config/Locale/Consumer';
import './style/index.less';
var TreeSelect = /** @class */ (function (_super) {
    __extends(TreeSelect, _super);
    function TreeSelect(props) {
        var _this = _super.call(this, props) || this;
        // i18n
        _this.genPropsByLocale = function (Locale) {
            var _a = _this.props, _b = _a.placeholder, placeholder = _b === void 0 ? Locale.placeholder : _b, _c = _a.searchPlaceholder, searchPlaceholder = _c === void 0 ? Locale.searchPlaceholder : _c, _d = _a.treeNodeResetTitle, treeNodeResetTitle = _d === void 0 ? Locale.treeNodeResetTitle : _d;
            return {
                searchPlaceholder: searchPlaceholder,
                placeholder: placeholder,
                treeNodeResetTitle: treeNodeResetTitle,
            };
        };
        _this.saveTreeSelect = function (node) {
            _this.rcTreeSelect = node;
        };
        warning(props.multiple !== false || !props.treeCheckable, '`multiple` will alway be `true` when `treeCheckable` is true');
        return _this;
    }
    TreeSelect.prototype.focus = function () {
        this.rcTreeSelect.focus();
    };
    TreeSelect.prototype.blur = function () {
        this.rcTreeSelect.blur();
    };
    TreeSelect.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props, prefixCls = _b.prefixCls, className = _b.className, size = _b.size, notFoundContent = _b.notFoundContent, dropdownStyle = _b.dropdownStyle, dropdownClassName = _b.dropdownClassName, treeCheckable = _b.treeCheckable, restProps = __rest(_b, ["prefixCls", "className", "size", "notFoundContent", "dropdownStyle", "dropdownClassName", "treeCheckable"]);
        var isEditableMul = (restProps.multiple || treeCheckable) && restProps.editable;
        var cls = classNames((_a = {},
            _a[prefixCls + "-ctner"] = true,
            _a[prefixCls + "-scroll"] = isEditableMul,
            _a[prefixCls + "-singleline"] = !isEditableMul,
            _a[prefixCls + "-lg"] = size === 'large',
            _a[prefixCls + "-sm"] = size === 'small',
            _a), className);
        var checkable = treeCheckable;
        if (checkable) {
            checkable = React.createElement("span", { className: prefixCls + "-tree-checkbox-inner" });
        }
        return (React.createElement(ConfigConsumer, { componentName: "TreeSelect" }, function (Locale) {
            return (React.createElement(RcTreeSelect, __assign({}, restProps, _this.genPropsByLocale(Locale), { dropdownClassName: classNames(dropdownClassName, prefixCls + "-tree-dropdown"), prefixCls: prefixCls, className: cls, dropdownStyle: __assign({ maxHeight: '100vh', overflow: 'auto' }, dropdownStyle), treeCheckable: checkable, notFoundContent: notFoundContent, ref: _this.saveTreeSelect })));
        }));
    };
    TreeSelect.TreeNode = TreeNode;
    TreeSelect.SHOW_ALL = SHOW_ALL;
    TreeSelect.SHOW_PARENT = SHOW_PARENT;
    TreeSelect.SHOW_CHILD = SHOW_CHILD;
    TreeSelect.defaultProps = {
        autoClearSearchValue: false,
        autoExpandParent: false,
        choiceTransitionName: 'zoom',
        editable: true,
        esc: true,
        required: false,
        prefixCls: 'fishd-treeselect',
        showCheckedStrategy: SHOW_PARENT,
        showSearch: false,
        tagWidth: 100,
        transitionName: 'slide-up',
        treeCheckStrictly: false,
        placement: 'bottomLeft',
        uniqueTreeNodeByLabel: false,
        getPopupContainer: function () { return document.body; },
    };
    return TreeSelect;
}(React.Component));
export default TreeSelect;
