import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import Tree from '../../rcTree';
import Spin from '../../../Spin/index.tsx';

export const popupContextTypes = {
  onPopupKeyDown: PropTypes.func.isRequired,
  onTreeNodeSelect: PropTypes.func.isRequired,
  onTreeNodeCheck: PropTypes.func.isRequired,
};

class BasePopup extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    upperSearchValue: PropTypes.string,
    valueList: PropTypes.array,
    valueEntities: PropTypes.object,
    keyEntities: PropTypes.object,
    showIcon: PropTypes.bool,
    icon: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node,
    ]),
    treeLine: PropTypes.bool,
    treeNodeFilterProp: PropTypes.string,
    treeCheckable: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.node,
    ]),
    doCheckChildInSearch: PropTypes.bool,
    treeCheckStrictly: PropTypes.bool,
    treeCheckType: PropTypes.string,
    treeDefaultExpandAll: PropTypes.bool,
    treeDefaultExpandedKeys: PropTypes.array,
    loadData: PropTypes.func,
    loading: PropTypes.bool,
    multiple: PropTypes.bool,
    autoExpandParent: PropTypes.bool,

    treeNodes: PropTypes.node,
    filteredTreeNodes: PropTypes.node,
    notFoundContent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),

    ariaId: PropTypes.string,

    // HOC
    renderSearch: PropTypes.func,
    renderResetItem: PropTypes.func,
    onTreeExpanded: PropTypes.func,

    // 确定或取消选择
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    onExpand: PropTypes.func, // 节点展开时的回调
  };

  static contextTypes = {
    rcTreeSelect: PropTypes.shape({
      ...popupContextTypes,
    }),
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { prevProps = {}, loadedKeys } = prevState || {};
    const { valueList, valueEntities, keyEntities, filteredTreeNodes, upperSearchValue } = nextProps;

    const newState = {
      prevProps: nextProps,
    };

    // Check value update
    if (valueList !== prevProps.valueList) {
      newState.keyList = valueList
        .map(({ value }) => valueEntities[value])
        .filter(entity => entity)
        .map(({ key }) => key);
    }

    // 清空搜索内容后恢复搜索前的展开状态
    if (upperSearchValue && !prevState.savedExpandedKeyList) {
      // 保存搜索前展开的节点
      newState.prevExpandedKeyList = Array.isArray(prevState.expandedKeyList) ? [...prevState.expandedKeyList] : [];
      newState.savedExpandedKeyList = true;
    } else if (!upperSearchValue && prevState.savedExpandedKeyList) {
      // 恢复搜索前展开的节点
      newState.expandedKeyList = Array.isArray(prevState.prevExpandedKeyList) ? [...prevState.prevExpandedKeyList] : [];
      newState.savedExpandedKeyList = false;
    }

    // Show all when tree is in filter mode
    if (filteredTreeNodes && filteredTreeNodes.length && filteredTreeNodes !== prevProps.filteredTreeNodes) {
      newState.expandedKeyList = Object.keys(keyEntities);
    }

    // Clean loadedKeys if key not exist in keyEntities anymore
    if (nextProps.loadData) {
      newState.loadedKeys = loadedKeys.filter(key => key in keyEntities);
    }

    return newState;
  }

  constructor(props) {
    super();

    const {
      treeDefaultExpandAll, treeDefaultExpandedKeys,
      keyEntities,
    } = props;

    // TODO: make `expandedKeyList` control
    let expandedKeyList = treeDefaultExpandedKeys;
    if (treeDefaultExpandAll) {
      expandedKeyList = Object.keys(keyEntities);
    }

    this.state = {
      keyList: [],
      expandedKeyList,
      loadedKeys: [],
    };
  }

  onTreeExpand = (expandedKeyList, extra) => {
    const { onTreeExpanded, onExpand } = this.props;

    this.setState({ expandedKeyList }, onTreeExpanded);

    onExpand && onExpand(expandedKeyList, extra);
  };

  onLoad = (loadedKeys) => {
    this.setState({ loadedKeys });
  };

  /**
   * This method pass to Tree component which is used for add filtered class
   * in TreeNode > li
   */
  filterTreeNode = (treeNode) => {
    const { upperSearchValue, treeNodeFilterProp } = this.props;

    const filterVal = treeNode.props[treeNodeFilterProp];
    if (typeof filterVal === 'string') {
      return upperSearchValue && (filterVal).toUpperCase().indexOf(upperSearchValue) !== -1;
    }

    return false;
  };

  renderNotFound = () => {
    const { prefixCls, notFoundContent, loading } = this.props;

    return (
      <span className={`${prefixCls}-not-found`}>
        { loading ? <Spin size="small"/> : notFoundContent }
      </span>
    );
  };

  render() {
    const { keyList, expandedKeyList, loadedKeys } = this.state;
    const {
      prefixCls,
      treeNodes, filteredTreeNodes,
      showIcon, treeLine, treeCheckable, treeCheckStrictly, treeCheckType, multiple,
      loadData,
      loading,
      ariaId,
      renderSearch,
      renderResetItem,
      autoExpandParent,
      icon,
      doCheckChildInSearch
    } = this.props;
    const { rcTreeSelect: {
      onPopupKeyDown,
      onTreeNodeSelect,
      onTreeNodeCheck,
    } } = this.context;

    const treeProps = {};

    if (treeCheckable) {
      treeProps.checkedKeys = keyList;
    } else {
      treeProps.selectedKeys = keyList;
    }

    let $notFound;
    let $treeNodes;

    if (!treeNodes || !treeNodes.length || loading) {
      $notFound = this.renderNotFound();
    } else if (filteredTreeNodes) {
      if (filteredTreeNodes.length) {
        treeProps.checkStrictly = true;
        $treeNodes = filteredTreeNodes;
      } else {
        $notFound = this.renderNotFound();
      }
    } else {
      $treeNodes = treeNodes;
    }

    let $tree;
    let isNotFound = false;
    if ($notFound) {
      $tree = $notFound;
      isNotFound = true;
    } else {
      $tree = (
        <Tree
          doCheckChildInSearch={doCheckChildInSearch}
          autoExpandParent={autoExpandParent}
          prefixCls={`${prefixCls}-tree`}
          className={classNames(!showIcon && `${prefixCls}-tree-icon-hide`)}
          icon={icon}
          showIcon={showIcon}
          showLine={treeLine}
          selectable={!treeCheckable}
          checkable={treeCheckable}
          checkStrictly={treeCheckStrictly}
          checkType={treeCheckType}
          multiple={multiple}
          loadData={loadData}
          loadedKeys={loadedKeys}
          expandedKeys={expandedKeyList}
          filterTreeNode={this.filterTreeNode}
          onSelect={onTreeNodeSelect}
          onCheck={onTreeNodeCheck}
          onExpand={this.onTreeExpand}
          onLoad={this.onLoad}
          {...treeProps}
        >
          {$treeNodes}
        </Tree>
      );
    }

    return (
      <div
        className={`${prefixCls}-base-popup`}
        role="listbox"
        id={ariaId}
        onKeyDown={onPopupKeyDown}
        tabIndex={-1}
      >
        {renderSearch ? renderSearch() : null}
        {renderResetItem && !isNotFound ? renderResetItem() : null}
        {$tree}
      </div>
    );
  }
}

polyfill(BasePopup);

export default BasePopup;
