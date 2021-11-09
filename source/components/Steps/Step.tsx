import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function isString(str: any) {
  return typeof str === 'string';
}

export interface StepProps {
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  status?: string;
  title?: string | React.ReactNode;

  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  itemWidth?: number | string;
  iconPrefix?: string;
  adjustMarginRight?: number | string;
  stepNumber?: number;
  progressDot?: boolean | ((content: React.ReactNode, options: object) => React.ReactNode);
  tailContent?: string | React.ReactNode;
  icons?: {
    finish: React.ReactNode;
    error: React.ReactNode;
  };
}

const Step: React.FC<StepProps> = props => {
  const {
    className,
    prefixCls,
    style,
    itemWidth,
    status = 'wait',
    iconPrefix,
    icon,
    wrapperStyle,
    adjustMarginRight,
    stepNumber,
    description,
    title,
    progressDot,
    tailContent,
    icons,
    ...restProps
  } = props;

  function renderIconNode() {
    let iconNode: React.ReactNode;
    const iconClassName = classNames(`${prefixCls}-icon`, `${iconPrefix}icon`, {
      [`${iconPrefix}icon-${icon}`]: icon && isString(icon),
      [`${iconPrefix}icon-check-line`]: !icon && status === 'finish',
      [`${iconPrefix}icon-close-tag-line`]: !icon && status === 'error',
    });
    const iconDot = <span className={`${prefixCls}-icon-dot`} />;
    // `progressDot` enjoy the highest priority
    if (progressDot) {
      if (typeof progressDot === 'function') {
        iconNode = (
          <span className={`${prefixCls}-icon`}>
            {progressDot(iconDot, {
              index: Number(stepNumber - 1),
              status,
              title,
              description,
            })}
          </span>
        );
      } else {
        iconNode = <span className={`${prefixCls}-icon`}>{iconDot}</span>;
      }
    } else if (icon && !isString(icon)) {
      iconNode = <span className={`${prefixCls}-icon`}>{icon}</span>;
    } else if (icons && icons.finish && status === 'finish') {
      iconNode = <span className={`${prefixCls}-icon`}>{icons.finish}</span>;
    } else if (icons && icons.error && status === 'error') {
      iconNode = <span className={`${prefixCls}-icon`}>{icons.error}</span>;
    } else if (icon || status === 'finish' || status === 'error') {
      iconNode = <span className={iconClassName} />;
    } else {
      iconNode = <span className={`${prefixCls}-icon`}>{stepNumber}</span>;
    }

    return iconNode;
  }

  const classString = classNames(`${prefixCls}-item`, `${prefixCls}-item-${status}`, className, {
    [`${prefixCls}-item-custom`]: icon,
  });
  const stepItemStyle = { ...style };
  if (itemWidth) {
    stepItemStyle.width = itemWidth;
  }
  if (adjustMarginRight) {
    stepItemStyle.marginRight = adjustMarginRight;
  }
  return (
    <div {...restProps} className={classString} style={stepItemStyle}>
      <div className={`${prefixCls}-item-tail`}>{tailContent}</div>
      <div className={`${prefixCls}-item-icon`}>{renderIconNode()}</div>
      <div className={`${prefixCls}-item-content`}>
        <div className={`${prefixCls}-item-title`}>{title}</div>
        {description && <div className={`${prefixCls}-item-description`}>{description}</div>}
      </div>
    </div>
  );
};

export default Step;
