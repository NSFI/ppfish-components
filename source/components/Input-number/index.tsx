import * as React from 'react';
import classNames from 'classnames';
import RcInputNumber from './src';

import {Omit} from '../../utils/type';
import './style/index.less';
// omitting this attrs because they conflicts with the ones defined in InputNumberProps
export type OmitAttrs = 'defaultValue' | 'onChange' | 'size';

export interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, OmitAttrs> {
  prefixCls?: string;
  min?: number;
  max?: number;
  value?: number;
  step?: number | string;
  defaultValue?: number;
  tabIndex?: number;
  onChange?: (value: number | string | undefined) => void;
  disabled?: boolean;
  size?: 'large' | 'small' | 'default';
  formatter?: (value: number | string | undefined) => string;
  parser?: (displayValue: string | undefined) => number;
  placeholder?: string;
  style?: React.CSSProperties;
  className?: string;
  name?: string;
  id?: string;
  precision?: number;
}

export default class InputNumber extends React.Component<InputNumberProps, any> {
  static defaultProps = {
    prefixCls: 'fishd-input-number',
    step: 1,
  };

  private inputNumberRef: any;

  render() {
    const {className, size, ...others} = this.props;
    const inputNumberClass = classNames({
      [`${this.props.prefixCls}-lg`]: size === 'large',
      [`${this.props.prefixCls}-sm`]: size === 'small',
    }, className);

    return <RcInputNumber ref={(c: any) => this.inputNumberRef = c} className={inputNumberClass} {...others} />;
  }

  focus() {
    this.inputNumberRef.focus();
  }

  blur() {
    this.inputNumberRef.blur();
  }
}
