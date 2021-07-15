import * as React from 'react';
import PropTypes from 'prop-types';

export interface BreadcrumbItemProps {
  prefixCls?: string;
  separator?: React.ReactNode;
  href?: string;
  maxWidth?: number;
}

interface CompoundBreadcrumbItem extends React.FC<BreadcrumbItemProps> {
  __FISHD_BREADCRUMB_ITEM: boolean;
}

const BreadcrumbItem: CompoundBreadcrumbItem = props => {
  const { prefixCls, separator, children, maxWidth, ...restProps } = props;
  let link = null;
  if ('href' in props) {
    link = (
      <a
        className={`${prefixCls}-link`}
        style={maxWidth != undefined ? { maxWidth: maxWidth } : null}
        {...restProps}
      >
        {children}
      </a>
    );
  } else {
    link = (
      <span
        className={`${prefixCls}-link`}
        style={maxWidth != undefined ? { maxWidth: maxWidth } : null}
        {...restProps}
      >
        {children}
      </span>
    );
  }
  if (children) {
    return (
      <span>
        {link}
        <span className={`${prefixCls}-separator`}>{separator}</span>
      </span>
    );
  }
  return null;
};

BreadcrumbItem.__FISHD_BREADCRUMB_ITEM = true;

BreadcrumbItem.defaultProps = {
  prefixCls: 'fishd-breadcrumb',
  separator: '/',
};

export default BreadcrumbItem;
