import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

type stringOrNumber = number | string;

export interface ColSize {
  span?: stringOrNumber;
  order?: stringOrNumber;
  offset?: stringOrNumber;
  push?: stringOrNumber;
  pull?: stringOrNumber;
}

export interface ColProps extends ColSize, React.HTMLAttributes<HTMLDivElement> {
  xs?: number | ColSize;
  sm?: number | ColSize;
  md?: number | ColSize;
  lg?: number | ColSize;
  xl?: number | ColSize;
  xxl?: number | ColSize;
  prefixCls?: string;
}

const Col: React.FC<ColProps> = props => {
  const {
    span,
    order,
    offset,
    push,
    pull,
    className,
    style,
    children,
    prefixCls = 'fishd-col',
    ...others
  } = props;

  let sizeClassObj = {};
  ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
    let sizeProps: ColSize = {};
    if (typeof props[size] === 'number') {
      sizeProps.span = props[size];
    } else if (typeof props[size] === 'object') {
      sizeProps = props[size] || {};
    }

    delete others[size];

    sizeClassObj = {
      ...sizeClassObj,
      [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
      [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
      [`${prefixCls}-${size}-offset-${sizeProps.offset}`]:
        sizeProps.offset || sizeProps.offset === 0,
      [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
      [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
    };
  });
  const classes = classNames(
    {
      [`${prefixCls}-${span}`]: span !== undefined,
      [`${prefixCls}-order-${order}`]: order,
      [`${prefixCls}-offset-${offset}`]: offset,
      [`${prefixCls}-push-${push}`]: push,
      [`${prefixCls}-pull-${pull}`]: pull,
    },
    className,
    sizeClassObj,
  );

  return (
    <div {...others} className={classes} style={style}>
      {children}
    </div>
  );
};
export default Col;
