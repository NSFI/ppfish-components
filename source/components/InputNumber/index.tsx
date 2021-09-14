import * as React from 'react';
import classNames from 'classnames';
import './style/index.less';
import RcInputNumber, { InputNumberProps as RcInputNumberProps } from './src';

import { cloneElement } from '../../utils/reactNode';

export type SizeType = 'small' | 'middle' | 'large' | undefined;

type ValueType = string | number;

export interface InputNumberProps<T extends ValueType = ValueType>
  extends Omit<RcInputNumberProps<T>, 'size'> {
  prefixCls?: string;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  size?: SizeType;
  bordered?: boolean;
}

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>((props, ref) => {
  const {
    className,
    size,
    prefixCls,
    addonBefore,
    addonAfter,
    bordered = true,
    readOnly,
    ...others
  } = props;

  const inputNumberClass = classNames(
    {
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-readonly`]: readOnly,
      [`${prefixCls}-borderless`]: !bordered,
    },
    className,
  );

  const element = (
    <RcInputNumber
      ref={ref}
      className={inputNumberClass}
      prefixCls={prefixCls}
      readOnly={readOnly}
      {...others}
    />
  );

  if (addonBefore != null || addonAfter != null) {
    const wrapperClassName = `${prefixCls}-group`;
    const addonClassName = `${wrapperClassName}-addon`;
    const addonBeforeNode = addonBefore ? (
      <div className={addonClassName}>{addonBefore}</div>
    ) : null;
    const addonAfterNode = addonAfter ? <div className={addonClassName}>{addonAfter}</div> : null;

    const mergedWrapperClassName = classNames(`${prefixCls}-wrapper`, wrapperClassName, {});

    const mergedGroupClassName = classNames(
      `${prefixCls}-group-wrapper`,
      {
        [`${prefixCls}-group-wrapper-sm`]: size === 'small',
        [`${prefixCls}-group-wrapper-lg`]: size === 'large',
      },
      className,
    );
    return (
      <div className={mergedGroupClassName} style={props.style}>
        <div className={mergedWrapperClassName}>
          {addonBeforeNode}
          {cloneElement(element, { style: null })}
          {addonAfterNode}
        </div>
      </div>
    );
  }

  return element;
});

InputNumber.defaultProps = {
  prefixCls: 'fishd-input-number',
  step: 1,
};

InputNumber.displayName = 'InputNumber';

export default InputNumber;
