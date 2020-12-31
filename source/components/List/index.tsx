import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Spin, { SpinProps } from '../Spin';
import Sortable from './sortable';
import Pagination, { PaginationConfig } from '../Pagination';
import { Row } from '../Grid';

import Item from './Item';
import './style/index.less';
import ConfigConsumer from '../Config/Consumer';
import { LocaleProperties } from '../Locale';

export { ListItemProps, ListItemMetaProps } from './Item';

export type ColumnCount = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;

export type ColumnType = 'gutter' | 'column' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface ListGridType {
  gutter?: number;
  column?: ColumnCount;
  xs?: ColumnCount;
  sm?: ColumnCount;
  md?: ColumnCount;
  lg?: ColumnCount;
  xl?: ColumnCount;
  xxl?: ColumnCount;
}

export type ListSize = 'small' | 'default' | 'large';

export interface ListProps {
  bordered?: boolean;
  className?: string;
  children?: React.ReactNode;
  dataSource: any;
  extra?: React.ReactNode;
  grid?: ListGridType;
  id?: string;
  itemLayout?: string;
  loading?: boolean | SpinProps;
  loadMore?: React.ReactNode;
  pagination?: PaginationConfig;
  prefixCls?: string;
  rowKey?: any;
  renderItem: any;
  size?: ListSize;
  split?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  locale?: LocaleProperties['List'];
  striped?: Boolean;
}

class List extends React.Component<ListProps> {
  static Item: typeof Item = Item;
  static Sortable = Sortable;
  static childContextTypes = {
    grid: PropTypes.any
  };

  static propTypes = {
    locale: PropTypes.shape({
      emptyText: PropTypes.string,
    }),
    dataSource: PropTypes.array,
    prefixCls: PropTypes.string,
    bordered: PropTypes.bool,
    split: PropTypes.bool,
    loading: PropTypes.bool,
    pagination: PropTypes.bool,
    striped: PropTypes.bool,
  }

  static defaultProps = {
    dataSource: [],
    prefixCls: 'fishd-list',
    bordered: false,
    split: true,
    loading: false,
    pagination: false,
    striped: false,
  };

  state = {
    paginationCurrent: 1
  };

  defaultPaginationProps = {
    current: 1,
    pageSize: 10,
    onChange: (page: number, pageSize: number) => {
      const { pagination } = this.props;
      this.setState({
        paginationCurrent: page
      });
      if (pagination && pagination.onChange) {
        pagination.onChange(page, pageSize);
      }
    },
    total: 0
  };

  private keys: { [key: string]: string } = {};

  getChildContext() {
    return {
      grid: this.props.grid
    };
  }

  renderItem = (item: React.ReactElement<any>, index: number) => {
    const { dataSource, renderItem, rowKey } = this.props;
    let key;

    if (typeof rowKey === 'function') {
      key = rowKey(dataSource[index]);
    } else if (typeof rowKey === 'string') {
      key = dataSource[rowKey];
    } else {
      key = dataSource.key;
    }

    if (!key) {
      key = `list-item-${index}`;
    }

    this.keys[index] = key;

    return renderItem(item, index);
  };

  isSomethingAfterLastItem() {
    const { loadMore, pagination, footer } = this.props;
    return !!(loadMore || pagination || footer);
  }

  renderEmpty = (Locale: LocaleProperties['List']) => {
    const defaultEmptyText = Locale ? Locale.emptyText : '暂无数据';
    const emptyText = this.props.locale ? this.props.locale.emptyText : defaultEmptyText;
    return <div className={`${this.props.prefixCls}-empty-text`}>{emptyText}</div>;
  };

  render() {
    const { paginationCurrent } = this.state;
    const {
      bordered,
      split,
      className,
      children,
      itemLayout,
      loadMore,
      pagination,
      prefixCls,
      grid,
      dataSource,
      size,
      rowKey,
      renderItem,
      header,
      footer,
      loading,
      striped,
      ...rest
    } = this.props;

    let loadingProp = loading;
    if (typeof loadingProp === 'boolean') {
      loadingProp = {
        spinning: loadingProp
      };
    }
    const isLoading = loadingProp && loadingProp.spinning;

    // large => lg
    // small => sm
    let sizeCls = '';
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
        break;
    }

    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-vertical`]: itemLayout === 'vertical',
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-split`]: split,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-loading`]: isLoading,
      [`${prefixCls}-grid`]: grid,
      [`${prefixCls}-striped`]: striped,
      [`${prefixCls}-something-after-last-item`]: this.isSomethingAfterLastItem()
    });

    const paginationProps = {
      ...this.defaultPaginationProps,
      total: dataSource.length,
      current: paginationCurrent,
      ...(pagination || {})
    };

    const largestPage = Math.ceil(paginationProps.total / paginationProps.pageSize);
    if (paginationProps.current > largestPage) {
      paginationProps.current = largestPage;
    }
    const paginationContent = pagination ? (
      <div className={`${prefixCls}-pagination`}>
        <Pagination {...paginationProps} onChange={this.defaultPaginationProps.onChange} />
      </div>
    ) : null;

    let splitDataSource = [...dataSource];
    if (pagination) {
      if (dataSource.length > (paginationProps.current - 1) * paginationProps.pageSize) {
        splitDataSource = [...dataSource].splice(
          (paginationProps.current - 1) * paginationProps.pageSize,
          paginationProps.pageSize
        );
      }
    }

    const renderChildrenContent = (Locale: LocaleProperties['List']) => {
      let childrenContent: ReactNode;
      childrenContent = isLoading && <div style={{ minHeight: 53 }} />;
      if (splitDataSource.length > 0) {
        const items = splitDataSource.map((item: any, index: number) => this.renderItem(item, index));
        const childrenList = React.Children.map(items, (child: any, index) =>
          React.cloneElement(child, {
            key: this.keys[index]
          })
        );

        childrenContent = grid ? <Row gutter={grid.gutter}>{childrenList}</Row> : childrenList;
      } else if (!children && !isLoading) {
        childrenContent = <div>{this.renderEmpty(Locale)}</div>;
      }

      return childrenContent
    }

    const paginationPosition = paginationProps.position || 'bottom';

    return (
      <ConfigConsumer componentName="List">
        {
          (Locale: LocaleProperties['List']) => {
            return (
              <div className={classString} {...rest}>
                {(paginationPosition === 'top' || paginationPosition === 'both') && paginationContent}
                {header && <div className={`${prefixCls}-header`}>{header}</div>}
                <Spin {...loadingProp}>
                  {renderChildrenContent(Locale)}
                  {children}
                </Spin>
                {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
                {loadMore ||
                  ((paginationPosition === 'bottom' || paginationPosition === 'both') && paginationContent)}
              </div>
            )
          }
        }
      </ConfigConsumer>
    );
  }
}

export default List;
