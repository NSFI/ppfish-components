import * as React from 'react';
import classNames from 'classnames';
import { BasicProps } from './Layout';

export default class Basic extends React.Component<BasicProps, any> {
  render() {
    const { prefixCls, className, children, ...others } = this.props;
    const divCls = classNames(className, prefixCls);
    return (
      <div className={divCls} {...others}>
        {children}
      </div>
    );
  }
}
