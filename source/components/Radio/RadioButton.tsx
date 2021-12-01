import React, { FC, useContext } from 'react';
import { AbstractCheckboxProps } from '../Checkbox/Checkbox';
import Radio from './Radio';
import { RadioChangeEvent } from './interface';
import RadioContext from './context';

export type RadioButtonProps = AbstractCheckboxProps<RadioChangeEvent>;
// case sensitive

// todo ref check
const RadioButton: FC<RadioButtonProps> = props => {
  const context = useContext(RadioContext);
  const radioProps: RadioButtonProps = { ...props };

  if (context) {
    radioProps.onChange = context.onChange;
    radioProps.checked = props.value === context.value;
    radioProps.disabled = props.disabled || context.disabled;
  }

  return <Radio {...radioProps} />;
};

RadioButton.defaultProps = {
  prefixCls: 'fishd-radio-button',
};

export default RadioButton;
