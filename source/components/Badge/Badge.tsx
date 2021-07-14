import * as React from 'react';
import * as PropTypes from 'prop-types';
import Animate from 'rc-animate';
import ScrollNumber from './ScrollNumber';
import classNames from 'classnames';

export { ScrollNumberProps } from './ScrollNumber';

export interface BadgeProps {
  /** Number to show in badge */
  count?: number | string | null;
  showZero?: boolean;
  /** Max count to show */
  overflowCount?: number;
  overflowType?: 'plus' | 'ellipsis';
  /** whether to show red dot without number */
  dot?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  scrollNumberPrefixCls?: string;
  className?: string;
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
  text?: string;
  offset?: [number | string, number | string];
  title?: string;
}

const Badge: React.FC<BadgeProps> = props => {
  const {
    count,
    showZero,
    prefixCls,
    scrollNumberPrefixCls,
    overflowCount,
    overflowType,
    className,
    style,
    children,
    dot,
    status,
    text,
    offset,
    title,
    ...restProps
  } = props;
  let displayCount =
    (count as number) > (overflowCount as number)
      ? overflowType === 'plus'
        ? `${overflowCount}+`
        : '...'
      : count;
  const isZero = displayCount === '0' || displayCount === 0;
  const isDot = (dot && !isZero) || status;
  // dot mode don't need count
  if (isDot) {
    displayCount = '';
  }
  const isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
  const hidden = (isEmpty || (isZero && !showZero)) && !isDot;
  const statusCls = classNames({
    [`${prefixCls}-status-dot`]: !!status,
    [`${prefixCls}-status-${status}`]: !!status,
  });
  const scrollNumberCls = classNames({
    [`${prefixCls}-dot`]: isDot,
    [`${prefixCls}-count`]: !isDot,
    [`${prefixCls}-multiple-words`]:
      !isDot && count && count.toString && count.toString().length > 1,
    [`${prefixCls}-status-${status}`]: !!status,
  });
  const badgeCls = classNames(className, prefixCls, {
    [`${prefixCls}-status`]: !!status,
    [`${prefixCls}-not-a-wrapper`]: !children,
  });
  const styleWithOffset = offset
    ? {
        marginLeft: offset[0],
        marginTop: offset[1],
        ...style,
      }
    : style;
  // <Badge status="success" />
  if (!children && status) {
    return (
      <span {...restProps} className={badgeCls} style={styleWithOffset}>
        <span className={statusCls} />
        <span className={`${prefixCls}-status-text`}>{text}</span>
      </span>
    );
  }
  const scrollNumber = hidden ? null : (
    <ScrollNumber
      prefixCls={scrollNumberPrefixCls}
      data-show={!hidden}
      show={!hidden}
      className={scrollNumberCls}
      count={displayCount}
      title={title || count}
      style={styleWithOffset}
      key="scrollNumber"
    />
  );
  const statusText =
    hidden || !text ? null : <span className={`${prefixCls}-status-text`}>{text}</span>;
  return (
    <span {...restProps} className={badgeCls}>
      {children}
      <Animate
        component=""
        showProp="data-show"
        transitionName={children ? `${prefixCls}-zoom` : ''}
        transitionAppear
      >
        {scrollNumber}
      </Animate>
      {statusText}
    </span>
  );
};

Badge.defaultProps = {
  prefixCls: 'fishd-badge',
  scrollNumberPrefixCls: 'fishd-scroll-number',
  count: null,
  showZero: false,
  dot: false,
  overflowCount: 99,
  overflowType: 'plus',
};

export default Badge;
