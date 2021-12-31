import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import debounce from 'lodash/debounce';
import { polyfill } from 'react-lifecycles-compat';
import RcTree from '../TreeSelect/rcTree';
import { conductExpandParent, convertTreeToEntities } from '../TreeSelect/rcTree/util';

import Tree, {
  TreeProps,
  FishdTreeNodeAttribute,
  FishdTreeNodeExpandedEvent,
  FishdTreeNodeSelectedEvent,
  FishdTreeNode,
} from './Tree';
import { calcRangeKeys, getFullKeyList } from './util';
import Icon from '../Icon';

export type ExpandAction = false | 'click' | 'doubleClick';

export interface DirectoryTreeProps extends TreeProps {
  expandAction?: ExpandAction;
}

export interface DirectoryTreeState {
  expandedKeys?: string[];
  selectedKeys?: string[];
}

function getIcon(props: FishdTreeNodeAttribute): React.ReactNode {
  const { isLeaf, expanded } = props;
  if (isLeaf) {
    return <Icon type="file-line" />;
  }
  return <Icon type={expanded ? 'folder-open-line' : 'folder-close-line'} />;
}

class DirectoryTree extends React.Component<DirectoryTreeProps, DirectoryTreeState> {
  static defaultProps = {
    prefixCls: 'fishd-tree',
    showIcon: true,
    expandAction: 'click',
  };

  state: DirectoryTreeState;

  tree: React.RefObject<RcTree>;

  onDebounceExpand: (event: React.MouseEvent<HTMLElement>, node: FishdTreeNode) => void;

  // Shift click usage
  lastSelectedKey?: string;

  cachedSelectedKeys?: string[];

  static getDerivedStateFromProps(nextProps: DirectoryTreeProps) {
    const newState: DirectoryTreeState = {};
    if ('expandedKeys' in nextProps) {
      newState.expandedKeys = nextProps.expandedKeys;
    }
    if ('selectedKeys' in nextProps) {
      newState.selectedKeys = nextProps.selectedKeys;
    }
    return newState;
  }

  constructor(props: DirectoryTreeProps) {
    super(props);
    this.tree = React.createRef<RcTree>();
    const { defaultExpandAll, defaultExpandParent, expandedKeys, defaultExpandedKeys, children } =
      props;
    const { keyEntities } = convertTreeToEntities(children);

    // Selected keys
    this.state = {
      selectedKeys: props.selectedKeys || props.defaultSelectedKeys || [],
    };

    // Expanded keys
    if (defaultExpandAll) {
      this.state.expandedKeys = getFullKeyList(props.children);
    } else if (defaultExpandParent) {
      this.state.expandedKeys = conductExpandParent(
        expandedKeys || defaultExpandedKeys,
        keyEntities,
      );
    } else {
      this.state.expandedKeys = expandedKeys || defaultExpandedKeys;
    }

    this.onDebounceExpand = debounce(this.expandFolderNode, 200, {
      leading: true,
    });
  }

  onExpand = (expandedKeys: string[], info: FishdTreeNodeExpandedEvent) => {
    const { onExpand } = this.props;

    this.setUncontrolledState({ expandedKeys });

    // Call origin function
    if (onExpand) {
      return onExpand(expandedKeys, info);
    }

    return undefined;
  };

  onClick = (event: React.MouseEvent<HTMLElement>, node: FishdTreeNode) => {
    const { onClick, expandAction } = this.props;

    // Expand the tree
    if (expandAction === 'click') {
      this.onDebounceExpand(event, node);
    }

    if (onClick) {
      onClick(event, node);
    }
  };

  onDoubleClick = (event: React.MouseEvent<HTMLElement>, node: FishdTreeNode) => {
    const { onDoubleClick, expandAction } = this.props;

    // Expand the tree
    if (expandAction === 'doubleClick') {
      this.onDebounceExpand(event, node);
    }

    if (onDoubleClick) {
      onDoubleClick(event, node);
    }
  };

  onSelect = (keys: string[], event: FishdTreeNodeSelectedEvent) => {
    const { onSelect, multiple, children } = this.props;
    const { expandedKeys = [], selectedKeys = [] } = this.state;
    const { node, nativeEvent } = event;
    const { eventKey = '' } = node.props;

    const newState: DirectoryTreeState = {};

    // Windows / Mac single pick
    const ctrlPick: boolean = nativeEvent.ctrlKey || nativeEvent.metaKey;
    const shiftPick: boolean = nativeEvent.shiftKey;

    // Generate new selected keys
    let newSelectedKeys = selectedKeys.slice();
    if (multiple && ctrlPick) {
      // Control click
      newSelectedKeys = keys;
      this.lastSelectedKey = eventKey;
      this.cachedSelectedKeys = newSelectedKeys;
    } else if (multiple && shiftPick) {
      // Shift click
      newSelectedKeys = Array.from(
        new Set([
          ...(this.cachedSelectedKeys || []),
          ...calcRangeKeys(children, expandedKeys, eventKey, this.lastSelectedKey),
        ]),
      );
    } else {
      // Single click
      newSelectedKeys = [eventKey];
      this.lastSelectedKey = eventKey;
      this.cachedSelectedKeys = newSelectedKeys;
    }
    newState.selectedKeys = newSelectedKeys;

    if (onSelect) {
      onSelect(newSelectedKeys, event);
    }

    this.setUncontrolledState(newState);
  };

  expandFolderNode = (event: React.MouseEvent<HTMLElement>, node: FishdTreeNode) => {
    const { isLeaf } = node.props;

    if (isLeaf || event.shiftKey || event.metaKey || event.ctrlKey) {
      return;
    }

    // Get internal rc-tree
    const internalTree = this.tree;
    // Call internal rc-tree expand function
    // https://github.com/ant-design/ant-design/issues/12567
    internalTree.current.onNodeExpand(event, node);
  };

  setUncontrolledState = (state: DirectoryTreeState) => {
    const newState = omit(state, Object.keys(this.props));
    if (Object.keys(newState).length) {
      this.setState(newState);
    }
  };

  render() {
    const { prefixCls, className, ...props } = this.props;
    const { expandedKeys, selectedKeys } = this.state;
    const connectClassName = classNames(`${prefixCls}-directory`, className);

    return (
      <Tree
        icon={getIcon}
        ref={this.tree}
        {...props}
        prefixCls={prefixCls}
        className={connectClassName}
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        onSelect={this.onSelect}
        onClick={this.onClick}
        onDoubleClick={this.onDoubleClick}
        onExpand={this.onExpand}
      />
    );
  }
}

polyfill(DirectoryTree);

export default DirectoryTree;
