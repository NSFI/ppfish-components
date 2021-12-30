import * as React from 'react';
import RcTree, { TreeNode } from '../TreeSelect/rcTree';
import DirectoryTree, {DirectoryTreeProps} from './DirectoryTree';
import classNames from 'classnames';
import animation from '../../utils/openAnimation';
import Icon from '../Icon';

export interface FishdTreeNodeAttribute {
  eventKey: string;
  prefixCls: string;
  className: string;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  halfChecked: boolean;
  children: React.ReactNode;
  title: React.ReactNode;
  pos: string;
  dragOver: boolean;
  dragOverGapTop: boolean;
  dragOverGapBottom: boolean;
  isLeaf: boolean;
  selectable: boolean;
  disabled: boolean;
  disableCheckbox: boolean;
}
export interface FishdTreeNodeProps {
  className?: string;
  disabled?: boolean;
  disableCheckbox?: boolean;
  title?: string | React.ReactNode;
  key?: string;
  eventKey?: string;
  isLeaf?: boolean;
  checked?: boolean;
  expanded?: boolean;
  loading?: boolean;
  selected?: boolean;
  selectable?: boolean;
  icon?: ((treeNode: FishdTreeNodeAttribute) => React.ReactNode) | React.ReactNode;
  children?: React.ReactNode;

  [customProp: string]: any;
}

export interface FishdTreeNode extends React.Component<FishdTreeNodeProps, {}> {}

export interface FishdTreeNodeBaseEvent {
  node: FishdTreeNode;
  nativeEvent: MouseEvent;
}

export interface FishdTreeNodeCheckedEvent extends FishdTreeNodeBaseEvent {
  event: 'check';
  checked?: boolean;
  checkedNodes?: FishdTreeNode[];
}

export interface FishdTreeNodeSelectedEvent extends FishdTreeNodeBaseEvent {
  event: 'select';
  selected?: boolean;
  selectedNodes?: FishdTreeNode[];
}

export interface FishdTreeNodeExpandedEvent extends FishdTreeNodeBaseEvent {
  expanded?: boolean;
}

export interface FishdTreeNodeMouseEvent {
  node: FishdTreeNode;
  event: React.MouseEventHandler<any>;
}

export interface FishdTreeNodeDropEvent {
  node: FishdTreeNode;
  dragNode: FishdTreeNode;
  dragNodesKeys: string[];
  event: React.MouseEventHandler<any>;
}

export interface TreeData {
  key: string;
  title: React.ReactNode;
  children?: TreeData[];
  disabled?: boolean;
  selectable?: boolean;
  disableCheckbox?: boolean;
  isLeaf?: boolean;
}

export interface TreeProps {
  showLine?: boolean;
  className?: string;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 是否自动展开父节点 */
  autoExpandParent?: boolean;
  /** checkable状态下节点选择完全受控（父子节点选中状态不再关联）*/
  checkStrictly?: boolean;
  /** 是否支持选中 */
  checkable?: boolean;
  /** 是否禁用树 */
  disabled?: boolean;
  /** 默认展开所有树节点 */
  defaultExpandAll?: boolean;
  /** 默认展开对应树节点 */
  defaultExpandParent?: boolean;
  /** 默认展开指定的树节点 */
  defaultExpandedKeys?: string[];
  /** （受控）是否展开所有的树节点 */
  expandAll?: boolean;
  /** （受控）展开指定的树节点 */
  expandedKeys?: string[];
  /** （受控）选中复选框的树节点 */
  checkedKeys?: string[] | { checked: string[]; halfChecked: string[] };
  /** 默认选中所有子节点，子节点全部选中时，不会选中父节点 */
  checkType?: 'countDown';
  /** 默认选中复选框的树节点 */
  defaultCheckedKeys?: string[];
  /** （受控）设置选中的树节点 */
  selectedKeys?: string[];
  treeData?: Array<TreeData>;
  /** 默认选中的树节点 */
  defaultSelectedKeys?: string[];
  selectable?: boolean;
  /** 展开/收起节点时触发 */
  onExpand?: (expandedKeys: string[], info: FishdTreeNodeExpandedEvent) => void | PromiseLike<any>;
  /** 点击复选框触发 */
  onCheck?: (
    checkedKeys: string[] | { checked: string[]; halfChecked: string[] },
    e: FishdTreeNodeCheckedEvent,
  ) => void;
  /** 点击树节点触发 */
  onSelect?: (selectedKeys: string[], e: FishdTreeNodeSelectedEvent) => void;
  /** 单击树节点触发 */
  onClick?: (e: React.MouseEvent<HTMLElement>, node: FishdTreeNode) => void;
  /** 双击树节点触发 */
  onDoubleClick?: (e: React.MouseEvent<HTMLElement>, node: FishdTreeNode) => void;
  /** filter some FishdTreeNodes as you need. it should return true */
  filterFishdTreeNode?: (node: FishdTreeNode) => boolean;
  /** 异步加载数据 */
  loadData?: (node: FishdTreeNode) => PromiseLike<any>;
  loadedKeys?: string[];
  onLoaded?: (loadedKeys: string[], info: { event: 'load'; node: FishdTreeNode }) => void;
  /** 响应右键点击 */
  onRightClick?: (options: FishdTreeNodeMouseEvent) => void;
  /** 设置节点可拖拽（IE>8）*/
  draggable?: boolean;
  /** 开始拖拽时调用 */
  onDragStart?: (options: FishdTreeNodeMouseEvent) => void;
  /** dragenter 触发时调用 */
  onDragEnter?: (options: FishdTreeNodeMouseEvent) => void;
  /** dragover 触发时调用 */
  onDragOver?: (options: FishdTreeNodeMouseEvent) => void;
  /** dragleave 触发时调用 */
  onDragLeave?: (options: FishdTreeNodeMouseEvent) => void;
  /** drop 触发时调用 */
  onDrop?: (options: FishdTreeNodeDropEvent) => void;
  style?: React.CSSProperties;
  showIcon?: boolean;
  icon?: (nodeProps: FishdTreeNodeAttribute) => React.ReactNode | React.ReactNode;
  prefixCls?: string;
  filterTreeNode?: (node: FishdTreeNode) => boolean;
  children?: React.ReactNode | React.ReactNode[];
  /* 单选模式下是否为必选 */
  required?: boolean;
}
const InternalTree: React.ForwardRefRenderFunction<unknown, TreeProps> = (props, ref) => {
  const { prefixCls, className, style, showIcon, required } = props;
  let checkable = props.checkable;
  const renderSwitcherIcon = ({ isLeaf, expanded, loading }: FishdTreeNodeProps) => {
    const { prefixCls, showLine } = props;

    if (showLine) {
      if (isLeaf) {
        return <Icon type="file-line" className={`${prefixCls}-switcher-line-icon`} />;
      }
      return (
        <Icon
          type={expanded ? 'minus-square' : 'plus-square'}
          className={`${prefixCls}-switcher-line-icon`}
        />
      );
    } else {
      if (isLeaf) {
        return null;
      }
      return <Icon type="down-fill" className={`${prefixCls}-switcher-icon`} />;
    }
  };
  return (
    <RcTree
      {...props}
      openAnimation= {{
        ...animation,
        appear: null,
      }}
      ref={ref}
      className={classNames(!showIcon && `${prefixCls}-icon-hide`, className)}
      checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`} /> : checkable}
      switcherIcon={renderSwitcherIcon}
      required={required}
      style={style}
    >
      {props.children}
    </RcTree>
  );
};
const TreeRef = React.forwardRef<unknown, TreeProps>(InternalTree);
type TreeRefInterface = typeof TreeRef;
interface TreeInterface extends TreeRefInterface {
  DirectoryTree: typeof DirectoryTree;
  TreeNode: React.ComponentClass<FishdTreeNodeProps>;
  __FISHD_TREE: boolean;
}

const Tree = TreeRef as TreeInterface;
Tree.displayName = 'Button';

Tree.defaultProps = {
  autoExpandParent: true,
  checkable: false,
  defaultExpandAll: false,
  defaultExpandParent: true,
  required: false,
  prefixCls: 'fishd-tree',
  showIcon: false,
};

Tree.DirectoryTree = DirectoryTree;
Tree.TreeNode = TreeNode;
Tree.__FISHD_TREE = true;

export default Tree;
