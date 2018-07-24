import * as React from 'react';
import { SpinProps } from '../Spin';
import { Store } from './createStore';
import { RadioChangeEvent } from '../Radio';
import { CheckboxChangeEvent } from '../Checkbox';
import { PaginationConfig } from '../Pagination';
export { PaginationConfig } from '../Pagination';

export type CompareFn<T> = ((a: T, b: T, sortOrder?: 'ascend' | 'descend') => number);
export type ColumnFilterItem = { text: string; value: string, children?: ColumnFilterItem[] };

export interface ColumnProps<T> {
  title?: React.ReactNode;
  key?: React.Key;
  dataIndex?: string;
  render?: (text: any, record: T, index: number) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
  filters?: ColumnFilterItem[];
  onFilter?: (value: any, record: T) => boolean;
  filterMultiple?: boolean;
  filterDropdown?: React.ReactNode | ((props: Object) => React.ReactNode);
  filterDropdownVisible?: boolean;
  onFilterDropdownVisibleChange?: (visible: boolean) => void;
  sorter?: boolean | CompareFn<T>;
  sorterType?: 'default' | 'firstLetter';
  defaultSortOrder?: 'ascend' | 'descend';
  colSpan?: number;
  width?: string | number;
  className?: string;
  fixed?: boolean | ('left' | 'right');
  filterIcon?: React.ReactNode;
  filteredValue?: any[];
  sortOrder?: 'ascend' | 'descend';
  children?: ColumnProps<T>[];
  onCellClick?: (record: T, event: any) => void;
  onCell?: (record: T) => any;
  onHeaderCell?: (props: ColumnProps<T>) => any;
}

export interface TableComponents {
  table?: any;
  header?: {
    wrapper?: any;
    row?: any;
    cell?: any;
  };
  body?: {
    wrapper?: any;
    row?: any;
    cell?: any;
  };
}

export interface TableLocale {
  filterTitle?: string;
  filterConfirm?: React.ReactNode;
  filterReset?: React.ReactNode;
  emptyText?: React.ReactNode | (() => React.ReactNode);
  selectAll?: React.ReactNode;
  selectInvert?: React.ReactNode;
}

export type RowSelectionType = 'checkbox' | 'radio';
export type SelectionSelectFn<T> = (record: T, selected: boolean, selectedRows: Object[], nativeEvent: Event) => any;

export type TableSelectWay = 'onSelect' | 'onSelectAll' | 'onSelectInvert';

export interface TableRowSelection<T> {
  type?: RowSelectionType;
  selectedRowKeys?: string[] | number[];
  onChange?: (selectedRowKeys: string[] | number[], selectedRows: Object[]) => void;
  getCheckboxProps?: (record: T) => Object;
  onSelect?: SelectionSelectFn<T>;
  onSelectAll?: (selected: boolean, selectedRows: Object[], changeRows: Object[]) => void;
  onSelectInvert?: (selectedRows: Object[]) => void;
  selections?: SelectionItem[] | boolean;
  hideDefaultSelections?: boolean;
  fixed?: boolean;
  columnWidth?: string | number;
}
export type SortOrder = 'descend' | 'ascend';
export interface SorterResult<T> {
  column: ColumnProps<T>;
  order: SortOrder;
  field: string;
  columnKey: string;
}
export type TableSize = 'default' | 'middle' | 'small';
export interface TableProps<T> {
  prefixCls?: string;
  dropdownPrefixCls?: string;
  rowSelection?: TableRowSelection<T>;
  pagination?: PaginationConfig | false;
  size?: TableSize;
  dataSource?: T[];
  components?: TableComponents;
  columns?: ColumnProps<T>[];
  activeRowByClick?: boolean;
  rowKey?: string | ((record: T, index: number) => string);
  rowClassName?: (record: T, index: number) => string;
  expandedRowRender?: (record: T, index: number, indent: number, expanded: boolean) => React.ReactNode;
  defaultExpandAllRows?: boolean;
  defaultExpandedRowKeys?: string[] | number[];
  expandedRowKeys?: string[] | number[];
  expandIconAsCell?: boolean;
  expandIconColumnIndex?: number;
  expandRowByClick?: boolean;
  onExpandedRowsChange?: (expandedRowKeys: string[] | number[]) => void;
  onExpand?: (expanded: boolean, record: T) => void;
  onChange?: (
    pagination: PaginationConfig,
    filters: Record<keyof T, string[]>,
    sorter: SorterResult<T>,
  ) => void;
  loading?: boolean | SpinProps;
  locale?: Object;
  indentSize?: number;
  onRowClick?: (record: T, index: number, event: Event) => void;
  onRow?: (record: T, index: number) => any;
  onHeaderRow?: (columns: ColumnProps<T>[], index: number) => any;
  useFixedHeader?: boolean;
  bordered?: boolean;
  showHeader?: boolean;
  footer?: (currentPageData: Object[]) => React.ReactNode;
  title?: (currentPageData: Object[]) => React.ReactNode;
  scroll?: { x?: boolean | number | string, y?: boolean | number | string };
  childrenColumnName?: string;
  bodyStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface TableStateFilters {
  [key: string]: string[];
}

export interface TableState<T> {
  pagination: PaginationConfig;
  filters: TableStateFilters;
  sortColumn: ColumnProps<T> | null;
  sortOrder?: SortOrder;
}

export type SelectionItemSelectFn = (key: string[]) => any;

export interface SelectionItem {
  key: string;
  text: React.ReactNode;
  onSelect: SelectionItemSelectFn;
}

export interface SelectionCheckboxAllProps<T> {
  store: Store;
  locale: any;
  disabled: boolean;
  getCheckboxPropsByItem: (item: any, index: number) => any;
  getRecordKey: (record: any, index?: number) => string;
  data: T[];
  prefixCls: string | undefined;
  onSelect: (key: string, index: number, selectFunc: any) => void;
  hideDefaultSelections?: boolean;
  selections?: SelectionItem[] | boolean;
  getPopupContainer: (triggerNode?: Element) => HTMLElement;
}

export interface SelectionCheckboxAllState {
  checked?: boolean;
  indeterminate?: boolean;
}

export interface SelectionBoxProps {
  store: Store;
  type?: RowSelectionType;
  defaultSelection: string[];
  rowIndex: string;
  name?: string;
  disabled?: boolean;
  onChange: (e: RadioChangeEvent | CheckboxChangeEvent) => void;
}

export interface SelectionBoxState {
  checked?: boolean;
}

export interface SelectionInfo<T> {
  selectWay: TableSelectWay;
  record?: T;
  checked?: boolean;
  changeRowKeys?: React.Key[];
  nativeEvent?: Event;
}

export interface FilterMenuProps<T> {
  locale: TableLocale;
  selectedKeys: string[];
  column: ColumnProps<T>;
  confirmFilter: (column: ColumnProps<T>, selectedKeys: string[]) => any;
  prefixCls: string;
  dropdownPrefixCls: string;
  getPopupContainer: (triggerNode?: Element) => HTMLElement;
}

export interface FilterMenuState {
  selectedKeys: string[];
  keyPathOfSelectedItem: { [key: string]: string };
  visible?: boolean;
}
