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
import RcTree, { TreeNode } from '../TreeSelect/rcTree';
import DirectoryTree from './DirectoryTree';
import classNames from 'classnames';
import animation from '../../utils/openAnimation';
import Icon from '../Icon';
var Tree = /** @class */ (function (_super) {
    __extends(Tree, _super);
    function Tree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderSwitcherIcon = function (_a) {
            var isLeaf = _a.isLeaf, expanded = _a.expanded, loading = _a.loading;
            var _b = _this.props, prefixCls = _b.prefixCls, showLine = _b.showLine;
            // if (loading) {
            //   return (
            //     <Icon
            //       type="load-line" spin={true}
            //       className={`${prefixCls}-switcher-loading-icon`}
            //     />
            //   );
            // }
            if (showLine) {
                if (isLeaf) {
                    return React.createElement(Icon, { type: "file-line", className: prefixCls + "-switcher-line-icon" });
                }
                return (React.createElement(Icon, { type: expanded ? 'minus-square' : 'plus-square', className: prefixCls + "-switcher-line-icon" }));
            }
            else {
                if (isLeaf) {
                    return null;
                }
                return React.createElement(Icon, { type: "down-fill", className: prefixCls + "-switcher-icon" });
            }
        };
        return _this;
    }
    Tree.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var prefixCls = props.prefixCls, className = props.className, style = props.style, showIcon = props.showIcon, required = props.required;
        var checkable = props.checkable;
        return (React.createElement(RcTree, __assign({}, props, { ref: function (node) { return (_this.tree = node); }, className: classNames(!showIcon && prefixCls + "-icon-hide", className), checkable: checkable ? React.createElement("span", { className: prefixCls + "-checkbox-inner" }) : checkable, switcherIcon: this.renderSwitcherIcon, required: required, style: style }), this.props.children));
    };
    Tree.TreeNode = TreeNode;
    Tree.DirectoryTree = DirectoryTree;
    Tree.defaultProps = {
        autoExpandParent: true,
        checkable: false,
        defaultExpandAll: false,
        defaultExpandParent: true,
        required: false,
        openAnimation: __assign(__assign({}, animation), { appear: null }),
        prefixCls: 'fishd-tree',
        showIcon: false
    };
    return Tree;
}(React.Component));
export default Tree;
