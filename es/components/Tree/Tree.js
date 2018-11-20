import * as React from 'react';
import RcTree, { TreeNode } from '../TreeSelect/rcTree';
import DirectoryTree from './DirectoryTree';
import classNames from 'classnames';
import animation from '../../utils/openAnimation';
import Icon from '../Icon';
export default class Tree extends React.Component {
    constructor() {
        super(...arguments);
        this.renderSwitcherIcon = ({ isLeaf, expanded, loading }) => {
            const { prefixCls, showLine, } = this.props;
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
                    return (React.createElement(Icon, { type: "file-line", className: `${prefixCls}-switcher-line-icon` }));
                }
                return (React.createElement(Icon, { type: expanded ? 'minus-square' : 'plus-square', className: `${prefixCls}-switcher-line-icon` }));
            }
            else {
                if (isLeaf) {
                    return null;
                }
                return (React.createElement(Icon, { type: "down-fill", className: `${prefixCls}-switcher-icon` }));
            }
        };
    }
    render() {
        const props = this.props;
        const { prefixCls, className, style, showIcon, required } = props;
        let checkable = props.checkable;
        return (React.createElement(RcTree, Object.assign({}, props, { ref: (node) => this.tree = node, className: classNames(!showIcon && `${prefixCls}-icon-hide`, className), checkable: checkable ? React.createElement("span", { className: `${prefixCls}-checkbox-inner` }) : checkable, switcherIcon: this.renderSwitcherIcon, required: required, style: style }), this.props.children));
    }
}
Tree.TreeNode = TreeNode;
Tree.DirectoryTree = DirectoryTree;
Tree.defaultProps = {
    autoExpandParent: true,
    checkable: false,
    defaultExpandAll: false,
    defaultExpandParent: true,
    required: false,
    openAnimation: Object.assign({}, animation, { appear: null }),
    prefixCls: 'fishd-tree',
    showIcon: false,
};
