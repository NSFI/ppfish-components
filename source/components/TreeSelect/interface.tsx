import * as React from 'react';
// import { AbstractSelectProps } from '../select';

interface OptionProps {
  disabled?: boolean;
  value?: string | number;
  title?: string;
  children?: React.ReactNode;
}

interface PopupAlign {
  points?: Array<string>;
  offset?: Array<number>;
  overflow?: Object;
  ignoreShake?: boolean;
}

interface AbstractSelectProps {
  prefixCls?: string;
  className?: string;
  size?: 'default' | 'large' | 'small';
  notFoundContent?: React.ReactNode | null;
  transitionName?: string;
  choiceTransitionName?: string;
  showSearch?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  tabIndex?: number;
  placeholder?: string | React.ReactNode;
  defaultActiveFirstOption?: boolean;
  dropdownClassName?: string;
  dropdownPopupAlign?: PopupAlign;
  placement?: string;
  dropdownStyle?: React.CSSProperties;
  dropdownMenuStyle?: React.CSSProperties;
  onSearch?: (value: string) => any;
  filterOption?: boolean | ((inputValue: string, option: React.ReactElement<OptionProps>) => any);
}

export interface TreeData {
  key: string;
  value: string;
  label: React.ReactNode;
  children?: TreeData[];
  isLeaf?: boolean;
}

export interface TreeSelectProps extends AbstractSelectProps {
  autoClearSearchValue?: boolean;
  autoExpandParent?: boolean;
  defaultValue?: string | Array<any>;
  dropdownStyle?: React.CSSProperties;
  dropdownMatchSelectWidth?: boolean;
  editable?: boolean;
  required?: boolean;
  showIcon?: boolean;
  icon?: ((nodeProps: any) => React.ReactNode) | React.ReactNode;
  labelInValue?: boolean;
  loading?: boolean;
  multiple?: boolean;
  searchPlaceholder?: string;
  showCheckedStrategy?: 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD';
  tagWidth?: number;
  treeCheckable?: boolean | React.ReactNode;
  treeCheckStrictly?: boolean;
  treeData?: Array<TreeData>;
  treeDataSimpleMode?: boolean | Object;
  treeDefaultExpandAll?: boolean;
  treeDefaultExpandedKeys?: Array<string>;
  treeNodeFilterProp?: string;
  treeNodeLabelProp?: string;
  treeNodeResetTitle?: string;
  value?: string | Array<any>;
  uniqueTreeNodeByLabel?: boolean;
  filterTreeNode?: (inputValue: string, treeNode: any) => boolean | boolean;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  loadData?: (node: any) => void;
  onCancel?: (value: any) => void;
  onChange?: (value: any, label: any, extra: any) => void;
  onConfirm?: (value: any) => void;
  onReset?: (value: any) => void;
  onSearch?: (value: any) => void;
  onSelect?: (value: any) => void;
}
