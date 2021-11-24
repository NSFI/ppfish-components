import * as React from 'react';
import RcTreeSelect, { TreeNode, SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from './rcTreeSelect';
import classNames from 'classnames';
import { TreeSelectProps } from './interface';
import warning from 'warning';

import ConfigConsumer from '../Config/Locale/Consumer';
import { LocaleProperties } from '../Locale';

import './style/index.less';

export default class TreeSelect extends React.Component<TreeSelectProps, any> {
  static TreeNode = TreeNode;

  static SHOW_ALL = SHOW_ALL;

  static SHOW_PARENT = SHOW_PARENT;

  static SHOW_CHILD = SHOW_CHILD;

  static defaultProps = {
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
    getPopupContainer: () => document.body,
  };

  private rcTreeSelect: any;

  constructor(props: TreeSelectProps) {
    super(props);

    warning(
      props.multiple !== false || !props.treeCheckable,
      '`multiple` will alway be `true` when `treeCheckable` is true',
    );
  }

  // i18n
  genPropsByLocale = Locale => {
    const {
      placeholder = Locale.placeholder,
      searchPlaceholder = Locale.searchPlaceholder,
      treeNodeResetTitle = Locale.treeNodeResetTitle,
    } = this.props;
    return {
      searchPlaceholder,
      placeholder,
      treeNodeResetTitle,
    };
  };

  focus() {
    this.rcTreeSelect.focus();
  }

  blur() {
    this.rcTreeSelect.blur();
  }

  saveTreeSelect = (node: typeof RcTreeSelect) => {
    this.rcTreeSelect = node;
  };

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

    const cls = classNames(
      {
        [`${prefixCls}-ctner`]: true,
        [`${prefixCls}-scroll`]: isEditableMul,
        [`${prefixCls}-singleline`]: !isEditableMul,
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-sm`]: size === 'small',
      },
      className,
    );

    let checkable = treeCheckable;
    if (checkable) {
      checkable = <span className={`${prefixCls}-tree-checkbox-inner`} />;
    }
    return (
      <ConfigConsumer componentName="TreeSelect">
        {(Locale: LocaleProperties['TreeSelect']) => {
          return (
            <RcTreeSelect
              {...restProps}
              {...this.genPropsByLocale(Locale)}
              dropdownClassName={classNames(dropdownClassName, `${prefixCls}-tree-dropdown`)}
              prefixCls={prefixCls}
              className={cls}
              dropdownStyle={{
                maxHeight: '100vh',
                overflow: 'auto',
                ...dropdownStyle,
              }}
              treeCheckable={checkable}
              notFoundContent={notFoundContent}
              ref={this.saveTreeSelect}
            />
          );
        }}
      </ConfigConsumer>
    );
  }
}
