import * as React from 'react';
import classNames from 'classnames';
import { Divider } from './src';

export interface MenuDividerProps extends React.HTMLAttributes<HTMLLIElement> {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
  dashed?: boolean;
}

const MenuDivider: React.FC<MenuDividerProps> = ({
  prefixCls,
  className,
  dashed,
  ...restProps
}) => {
  const classString = classNames(
    {
      [`${prefixCls}-item-divider-dashed`]: !!dashed,
    },
    className,
  );

  return <Divider className={classString} {...restProps} />;
};

MenuDivider.defaultProps = {
  prefixCls: 'fishd-menu',
};

export default MenuDivider;
