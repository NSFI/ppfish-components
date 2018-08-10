import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';

export interface ContainerProps {
  children: any;
  className?: string;
  prefixCls?: string;
}

const Container = (props: ContainerProps) => {
  const { children, className = '', prefixCls = 'fishd-spin-container' } = props;
  const otherProps = omit(props, [
    'className',
    'prefixCls',
  ]);
  const classString = classNames(prefixCls, className);
  return (
    <div {...otherProps} className={classString}>
      {children}
    </div>
  );
};

export default Container;
