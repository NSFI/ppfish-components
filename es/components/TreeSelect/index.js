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
import RcTreeSelect, { TreeNode, SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from './rcTreeSelect';
import classNames from 'classnames';
import warning from 'warning';
import './style/index.less';
export default class TreeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.saveTreeSelect = (node) => {
            this.rcTreeSelect = node;
        };
        warning(props.multiple !== false || !props.treeCheckable, '`multiple` will alway be `true` when `treeCheckable` is true');
    }
    focus() {
        this.rcTreeSelect.focus();
    }
    blur() {
        this.rcTreeSelect.blur();
    }
    render() {
        const _a = this.props, { prefixCls, className, size, notFoundContent, dropdownStyle, dropdownClassName, treeCheckable } = _a, restProps = __rest(_a, ["prefixCls", "className", "size", "notFoundContent", "dropdownStyle", "dropdownClassName", "treeCheckable"]);
        const isEditableMul = (restProps.multiple || treeCheckable) && restProps.editable;
        const cls = classNames({
            [`${prefixCls}-ctner`]: true,
            [`${prefixCls}-scroll`]: isEditableMul,
            [`${prefixCls}-singleline`]: !isEditableMul,
            [`${prefixCls}-lg`]: size === 'large',
            [`${prefixCls}-sm`]: size === 'small',
        }, className);
        let checkable = treeCheckable;
        if (checkable) {
            checkable = React.createElement("span", { className: `${prefixCls}-tree-checkbox-inner` });
        }
        return (React.createElement(RcTreeSelect, Object.assign({}, restProps, { dropdownClassName: classNames(dropdownClassName, `${prefixCls}-tree-dropdown`), prefixCls: prefixCls, className: cls, dropdownStyle: Object.assign({ maxHeight: '100vh', overflow: 'auto' }, dropdownStyle), treeCheckable: checkable, notFoundContent: notFoundContent, ref: this.saveTreeSelect })));
    }
}
TreeSelect.TreeNode = TreeNode;
TreeSelect.SHOW_ALL = SHOW_ALL;
TreeSelect.SHOW_PARENT = SHOW_PARENT;
TreeSelect.SHOW_CHILD = SHOW_CHILD;
TreeSelect.defaultProps = {
    autoClearSearchValue: false,
    autoExpandParent: true,
    choiceTransitionName: 'zoom',
    editable: true,
    required: false,
    placeholder: '请选择',
    prefixCls: 'fishd-treeselect',
    searchPlaceholder: '请输入关键字',
    showCheckedStrategy: SHOW_PARENT,
    showSearch: false,
    tagWidth: 100,
    transitionName: 'slide-up',
    treeCheckStrictly: false,
    treeNodeResetTitle: '不选择任何分类',
    placement: 'bottomLeft',
    uniqueTreeNodeByLabel: false,
};
