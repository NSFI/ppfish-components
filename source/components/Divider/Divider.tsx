import React from 'react';
import classNames from 'classnames';

export interface DividerProps {
  prefixCls?: string;
  type?: 'horizontal' | 'split' | 'vertical';
  orientation?: 'left' | 'right' | '' | 'top' | 'bottom';
  className?: string;
  children?: React.ReactNode;
  dashed?: boolean;
  style?: React.CSSProperties;
}

export default function Divider({
  prefixCls = 'fishd',
  type = 'horizontal',
  orientation = '',
  className,
  children,
  dashed,
  ...restProps
}: DividerProps) {
  const orientationPrefix = (orientation.length > 0) ? '-' + orientation : orientation;
  const classString = classNames(
    className, `${prefixCls}-divider`, `${prefixCls}-divider-${type}`, {
      [`${prefixCls}-divider-with-text${orientationPrefix}`]: children,
      [`${prefixCls}-divider-dashed`]: !!dashed,
    });
  //纵向文字仅支持字符串格式
  const verticalText = type === 'vertical' && children &&
    children.toString().split('')
      .map((text, i) => <span className={`${prefixCls}-divider-vertical-child`} key={i}>{text}</span>);
  return (
    <div className={classString} {...restProps}>
      {children && <span className={`${prefixCls}-divider-inner-text`}>{verticalText ? verticalText : children}</span>}
    </div>
  );
}
