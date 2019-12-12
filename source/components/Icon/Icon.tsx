import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';

export interface IconProps {
  type: string;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<any>;
  spinning?: boolean;
  style?: React.CSSProperties;
}

const Icon = (props: IconProps) => {
  const { type, className = '', spinning } = props;
  const classString = classNames({
    fishdicon: true,
    'fishdicon-spin': spinning || type === 'loading',
    [`fishdicon-${type}`]: true,
  }, className);
  return <i {...omit(props, ['type', 'spinning'])} className={classString} />;
};

export default Icon;
