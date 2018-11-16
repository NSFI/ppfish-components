import * as React from 'react';
import RcTreeSelect, { TreeNode, SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from './rcTreeSelect';
import classNames from 'classnames';
import { TreeSelectProps } from './interface';
import warning from 'warning';
import './style/index.less';

export default class TreeSelect extends React.Component<TreeSelectProps, any> {
  static TreeNode = TreeNode;
  static SHOW_ALL = SHOW_ALL;
  static SHOW_PARENT = SHOW_PARENT;
  static SHOW_CHILD = SHOW_CHILD;

  static defaultProps = {
    autoClearSearchValue: false,
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

  private rcTreeSelect: any;

  constructor(props: TreeSelectProps) {
    super(props);

    warning(
      props.multiple !== false || !props.treeCheckable,
      '`multiple` will alway be `true` when `treeCheckable` is true',
    );
  }

  focus() {
    this.rcTreeSelect.focus();
  }

  blur() {
    this.rcTreeSelect.blur();
  }

  saveTreeSelect = (node: typeof RcTreeSelect) => {
    this.rcTreeSelect = node;
  }

  render() {
    const {
      prefixCls,
      className,
      size,
      notFoundContent,
      dropdownStyle,
      dropdownClassName,
      treeCheckable,
      ...restProps
    } = this.props;
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
      checkable = <span className={`${prefixCls}-tree-checkbox-inner`} />;
    }
    return (
      <RcTreeSelect
        {...restProps}
        dropdownClassName={classNames(dropdownClassName, `${prefixCls}-tree-dropdown`)}
        prefixCls={prefixCls}
        className={cls}
        dropdownStyle={{ maxHeight: '100vh', overflow: 'auto', ...dropdownStyle }}
        treeCheckable={checkable}
        notFoundContent={notFoundContent}
        ref={this.saveTreeSelect}
      />
    );
  }
}
