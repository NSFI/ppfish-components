import * as React from 'react';
import classNames from 'classnames';
import { FishdAnchor } from './Anchor';
import AnchorContext from './context';

export interface AnchorLinkProps {
  prefixCls?: string;
  href: string;
  target?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const AnchorLink: React.FC<AnchorLinkProps> = props => {
  const { prefixCls, href, title, children } = props;

  const context: FishdAnchor = React.useContext(AnchorContext);
  const prevHref = React.useRef<string>(href);

  React.useEffect(() => {
    if (href) {
      context.registerLink(href);
    }
    return () => {
      context.unregisterLink(prevHref.current);
      prevHref.current = href;
    };
  }, [href]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { scrollTo, onClick } = context;
    onClick?.(e, { title, href });
    scrollTo(href);
  };

  const active = context.activeLink === href;
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
            onClick={handleClick}
          >
            {title}
          </a>
        </div>
        <div className={`${prefixCls}-children`}>{children}</div>
      </div>
    );
  }
  return (
    <div className={wrapperClassName}>
      <a
        className={titleClassName}
        // href={href}
        title={typeof title === 'string' ? title : ''}
        onClick={handleClick}
      >
        {title}
      </a>
    </div>
  );
};

AnchorLink.defaultProps = {
  prefixCls: 'fishd-anchor',
  href: '#',
};

export default AnchorLink;
