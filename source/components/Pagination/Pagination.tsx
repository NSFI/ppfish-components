import * as React from 'react';
import RcPagination from './src';
import classNames from 'classnames';
import Select from '../Select';
import MiniSelect from './MiniSelect';

export interface PaginationProps {
  total?: number;
  defaultCurrent?: number;
  current?: number;
  defaultPageSize?: number;
  pageSize?: number;
  onChange?: (page: number, pageSize?: number) => void;
  hideOnSinglePage?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
  onShowSizeChange?: (current: number, size: number) => void;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  size?: string;
  simple?: boolean;
  style?: React.CSSProperties;
  locale?: Object;
  className?: string;
  prefixCls?: string;
  selectPrefixCls?: string;
  itemRender?: (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next') => React.ReactNode;
}

export interface PaginationConfig extends PaginationProps {
  position?: 'top' | 'bottom' | 'both';
}

export default class Pagination extends React.Component<PaginationProps, {}> {
  static defaultProps = {
    prefixCls: 'fishd-pagination',
    selectPrefixCls: 'fishd-select',
  };

  render() {
    const {className, size, ...restProps} = this.props;
    const isSmall = size === 'small';
    return (
      <RcPagination
        {...restProps}
        className={classNames(className, {mini: isSmall})}
        selectComponentClass={isSmall ? MiniSelect : Select}
      />
    )
  }
}
