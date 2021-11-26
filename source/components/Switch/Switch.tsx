import * as React from 'react';
import classNames from 'classnames';
import RcSwitch from './src/RcSwitch';
import omit from 'omit.js';

export interface SwitchProps {
  prefixCls?: string;
  size?: 'small' | 'default' | 'large';
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => any;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export default class Switch extends React.Component<SwitchProps, {}> {
  static defaultProps = {
    prefixCls: 'fishd-switch',
  };

  private rcSwitch: RcSwitch;

  focus() {
    this.rcSwitch.focus();
  }

  blur() {
    this.rcSwitch.blur();
  }

  saveSwitch = (node: RcSwitch) => {
    this.rcSwitch = node;
  };

  render() {
    const { prefixCls, size, loading, className = '' } = this.props;
    const classes = classNames(className, {
      [`${prefixCls}-small`]: size === 'small',
      [`${prefixCls}-large`]: size === 'large',
      [`${prefixCls}-loading`]: loading,
    });
    return (
      <RcSwitch {...omit(this.props, ['loading'])} className={classes} ref={this.saveSwitch} />
    );
  }
}
