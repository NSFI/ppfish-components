import * as React from 'react';
import RcTreeSelect, { TreeNode, SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from './rcTreeSelect';
import classNames from 'classnames';
import { TreeSelectProps } from './interface';
import warning from 'warning';

import ConfigConsumer from '../Config/Locale/Consumer';
import { LocaleProperties } from '../Locale';

import './style/index.less';
import { useMemo } from 'react';


const InternalTreeSelect:React.ForwardRefRenderFunction<unknown, TreeSelectProps> = (props, ref) => {
  const {
    prefixCls,
    className,
    size,
    notFoundContent,
    dropdownStyle,
    dropdownClassName,
    treeCheckable,
    multiple,
    editable,
    ...restProps
  } = props;
  warning(
    props.multiple !== false || !props.treeCheckable,
    '`multiple` will alway be `true` when `treeCheckable` is true',
  );
  const treeRef = React.createRef<RcTreeSelect>();
  React.useImperativeHandle(ref, () => {
    return {
      focus: treeRef.current?.focus(),
      blur: treeRef.current?.blur(),
    };
  });

  const genPropsByLocale = (Locale) => {
    const {
      placeholder = Locale.placeholder,
      searchPlaceholder = Locale.searchPlaceholder,
      treeNodeResetTitle = Locale.treeNodeResetTitle,
    } = props;
    return {
      searchPlaceholder,
      placeholder,
      treeNodeResetTitle,
    };
  };

  const isEditableMul = useMemo(() => {
    return (multiple || treeCheckable) && editable;
  }, [multiple, editable, treeCheckable]);


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
            {...genPropsByLocale(Locale)}
            multiple={multiple}
            editable={editable}
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
            ref={treeRef}
          />
        );
      }}
    </ConfigConsumer>
  );
};
const TreeSelectRef = React.forwardRef(InternalTreeSelect);

type InternalTreeSelectType = typeof TreeSelectRef;
interface TreeSelectInterface extends InternalTreeSelectType {
  TreeNode: typeof TreeNode;
  SHOW_ALL: typeof SHOW_ALL;
  SHOW_PARENT: typeof SHOW_PARENT;
  SHOW_CHILD: typeof SHOW_CHILD;
}

const TreeSelect = TreeSelectRef as TreeSelectInterface;

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
  getPopupContainer: () => document.body,
};

export default TreeSelect;
