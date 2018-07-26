import * as React from 'react';
// import { AbstractSelectProps } from '../select';

interface OptionProps {
  disabled?: boolean;
  value?: string | number;
  title?: string;
  children?: React.ReactNode;
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
}

export interface TreeSelectProps extends AbstractSelectProps {
  value?: string | Array<any>;
  defaultValue?: string | Array<any>;
  multiple?: boolean;
  onSelect?: (value: any) => void;
  onChange?: (value: any, label: any, extra: any) => void;
  onConfirm?: (value: any) => void;
  onCancel?: (value: any) => void;
  onSearch?: (value: any) => void;
  searchPlaceholder?: string;
  dropdownStyle?: React.CSSProperties;
  dropdownMatchSelectWidth?: boolean;
  treeDefaultExpandAll?: boolean;
  isRequired?: boolean;
  treeCheckable?: boolean | React.ReactNode;
  treeDefaultExpandedKeys?: Array<string>;
  filterTreeNode?: (inputValue: string, treeNode: any) => boolean | boolean;
  treeNodeFilterProp?: string;
  treeNodeLabelProp?: string;
  treeNodeResetTitle?: string;
  treeData?: Array<TreeData>;
  treeDataSimpleMode?: boolean | Object;
  loadData?: (node: any) => void;
  showCheckedStrategy?: 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD';
  labelInValue?: boolean;
  treeCheckStrictly?: boolean;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
}
