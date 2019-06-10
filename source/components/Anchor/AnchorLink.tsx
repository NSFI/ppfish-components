import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import {FishdAnchor} from './Anchor';

export interface AnchorLinkProps {
  prefixCls?: string;
  href: string;
  title: React.ReactNode;
  children?: any;
}

export default class AnchorLink extends React.Component<AnchorLinkProps, any> {
  static defaultProps = {
    prefixCls: 'fishd-anchor',
    href: '#',
  };

  static contextTypes = {
    fishdAnchor: PropTypes.object,
  };

  context: {
    fishdAnchor: FishdAnchor;
  };

  componentDidMount() {
    this.context.fishdAnchor.registerLink(this.props.href);
  }

  componentDidUpdate(prevProps: AnchorLinkProps) {
    if (this.props.href !== prevProps.href) {
      this.context.fishdAnchor.unregisterLink(prevProps.href);
      this.context.fishdAnchor.registerLink(this.props.href);
    }
  }

  componentWillUnmount() {
    this.context.fishdAnchor.unregisterLink(this.props.href);
  }

  handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const {scrollTo, onClick} = this.context.fishdAnchor;
    const {href, title} = this.props;
    if (onClick) {
      onClick(e, {title, href});
    }
    scrollTo(href);
  };

  render() {
    const {
      prefixCls,
      href,
      title,
      children,
    } = this.props;
    const active = this.context.fishdAnchor.activeLink === href;
    const wrapperClassName = classNames(`${prefixCls}-link`, {
      [`${prefixCls}-link-active`]: active,
    });
    const titleClassName = classNames(`${prefixCls}-link-title`, {
      [`${prefixCls}-link-title-active`]: active,
    });
    if (children) {
      return (
        <div className={`${prefixCls}-link-group`}>
          <div className={wrapperClassName}>
            <a
              className={titleClassName}
              // href={href}
              title={typeof title === 'string' ? title : ''}
              onClick={this.handleClick}
            >
              {title}
            </a>
          </div>
          <div className={`${prefixCls}-children`}>
            {children}
          </div>
        </div>
      );
    }
    return (
      <div className={wrapperClassName}>
        <a
          className={titleClassName}
          // href={href}
          title={typeof title === 'string' ? title : ''}
          onClick={this.handleClick}
        >
          {title}
        </a>
      </div>
    );
  }
}
