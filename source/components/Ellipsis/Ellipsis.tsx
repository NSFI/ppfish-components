import * as React from 'react';
import classNames from 'classnames';
import { TooltipProps } from '../Tooltip';
import EllipsisText from './EllipsisText';
import EllipsisWidth from './EllipsisWidth';
import EllipsisLine from './EllipsisLine';
import EllipsisLineClamp from './EllipsisLineClamp';

// @ts-ignore
const isSupportLineClamp = document.body.style.webkitLineClamp !== undefined;

export interface EllipsisProps {
  tooltip?: boolean;
  tooltipProps?: TooltipProps;
  length?: number;
  lines?: number;
  fullWidthRecognition?: boolean;
  className?: string;
  width?: number | string;
  style?: React.CSSProperties;
  prefix?: string;
  children: React.ReactNode;
}

const Ellipsis = (props: EllipsisProps) => {
  const {
    children,
    lines,
    length,
    width,
    className,
    tooltip,
    style,
    fullWidthRecognition,
    prefix,
    tooltipProps,
    ...restProps
  } = props;

  const cls = classNames(`${prefix}-ellipsis`, className, {
    [`${prefix}-width-mode`]: width,
    [`${prefix}-line`]: lines && !isSupportLineClamp,
    [`${prefix}-lineClamp`]: lines && isSupportLineClamp,
  });

  // 一种限制都没有返回原值
  if (!lines && !length && !width) {
    return (
      <span className={cls} {...restProps}>
        {children}
      </span>
    );
  }

  if (width) {
    return (
      <EllipsisWidth
        className={cls}
        prefix={prefix}
        style={style}
        tooltip={tooltip}
        tooltipProps={tooltipProps}
        width={width}
        {...restProps}
      >
        {children}
      </EllipsisWidth>
    );
  }

  // 字数限制
  if (length) {
    return (
      <EllipsisText
        className={cls}
        prefix={prefix}
        tooltipProps={tooltipProps}
        length={length}
        text={children || ''}
        tooltip={tooltip}
        fullWidthRecognition={fullWidthRecognition}
        {...restProps}
      />
    );
  }

  if (isSupportLineClamp) {
    return (
      <EllipsisLineClamp
        className={cls}
        prefix={prefix}
        tooltip={tooltip}
        tooltipProps={tooltipProps}
        lines={lines}
        {...restProps}
      >
        {children}
      </EllipsisLineClamp>
    );
  }

  return (
    <EllipsisLine
      className={cls}
      prefix={prefix}
      tooltip={tooltip}
      tooltipProps={tooltipProps}
      lines={lines}
      {...restProps}
    >
      {children}
    </EllipsisLine>
  );
};

Ellipsis.defaultProps = {
  prefix: 'fishd-ellipsis',
  fullWidthRecognition: false,
  tooltip: true,
  tooltipProps: {},
};

export default Ellipsis;
