import * as React from 'react';
import PropTypes from 'prop-types';

export interface BreadcrumbItemProps {
  prefixCls?: string;
  separator?: React.ReactNode;
  href?: string;
  maxWidth: number;
}

export default class BreadcrumbItem extends React.Component<BreadcrumbItemProps, any> {
  static __FISHD_BREADCRUMB_ITEM = true;

  static defaultProps = {
    prefixCls: 'fishd-breadcrumb',
    separator: '/'
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    href: PropTypes.string,
    maxWidth: PropTypes.number
  };

  render() {
    const { prefixCls, separator, children, maxWidth, ...restProps } = this.props;
    let link = null;
    if ('href' in this.props) {
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
  }
}
