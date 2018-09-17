import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import RcSwitch from './src/Switch';
import omit from 'omit.js';
import Wave from '../../utils/wave';

import './style/Switch.less';

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

  static propTypes = {
    prefixCls: PropTypes.string,
    // HACK: https://github.com/ant-design/ant-design/issues/5368
    // size=default and size=large are the same
    size: PropTypes.oneOf(['small', 'default', 'large']),
    className: PropTypes.string,
  };

  private rcSwitch: typeof RcSwitch;

  focus() {
    this.rcSwitch.focus();
  }

  blur() {
    this.rcSwitch.blur();
  }

  saveSwitch = (node: typeof RcSwitch) => {
    this.rcSwitch = node;
  }

  render() {
    const { prefixCls, size, loading, className = '' } = this.props;
    const classes = classNames(className, {
      [`${prefixCls}-small`]: size === 'small',
      [`${prefixCls}-large`]: size === 'large',
      [`${prefixCls}-loading`]: loading,
    });
    return (
      <Wave insertExtraNode>
        <RcSwitch
          {...omit(this.props, ['loading'])}
          className={classes}
          ref={this.saveSwitch}
        />
      </Wave>
    );
  }
}
