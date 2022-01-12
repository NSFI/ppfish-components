import React, { FC, memo, useState } from 'react';
import classNames from 'classnames';
import Radio from './Radio';
import { RadioGroupProps, RadioChangeEvent } from './interface';
import { RadioContextProvider } from './context';
import useUpdateEffect from '../../hooks/useUpdatEffect';

// case sensitive
function getCheckedValue(children: React.ReactNode) {
  let value = null;
  let matched = false;
  React.Children.forEach(children, (radio: any) => {
    if (radio && radio.props && radio.props.checked) {
      value = radio.props.value;
      matched = true;
    }
  });
  return matched ? { value } : undefined;
}
const InternalRadioGroup: React.ForwardRefRenderFunction<unknown, RadioGroupProps> = (props, ref) => {
  const {
    prefixCls,
    className = '',
    options,
    buttonStyle,
    disabled,
    defaultValue,
    children,
    style,
    name,
    onMouseEnter,
    onMouseLeave,
    id,
    size,
    onChange
  } = props;

  const [value, setValue] = useState(() => {
    let value;
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = defaultValue;
    } else {
      const checkedValue = getCheckedValue(children);
      value = checkedValue && checkedValue.value;
    }
    return value;
  });

  useUpdateEffect(() => {
    if ('value' in props) {
      setValue(props.value);
    } else {
      const checkedValue = getCheckedValue(children);
      if (checkedValue) {
        setValue(checkedValue.value);
      }
    }
  }, [props.value, children]);

  let childrenToRender: React.ReactChildren[] | React.ReactElement<any>[] | React.ReactNode =
    children;

  const onRadioChange = (ev: RadioChangeEvent) => {
    const lastValue = value;
    const val = ev.target.value;
    if (!('value' in props)) {
      setValue(val);
    }

    if (onChange && val !== lastValue) {
      onChange(ev);
    }
  };

  // 如果存在 options, 优先使用
  if (options && options.length > 0) {
    childrenToRender = options.map((option, index) => {
      if (typeof option === 'string') {
        // 此处类型自动推导为 string
        return (
          <Radio
            key={index}
            prefixCls={prefixCls}
            disabled={disabled}
            value={option}
            onChange={onRadioChange}
            checked={value === option}
          >
            {option}
          </Radio>
        );
      } else {
        // 此处类型自动推导为 { label: string value: string }
        return (
          <Radio
            key={`radio-group-value-options-${option.value}`}
            prefixCls={prefixCls}
            disabled={option.disabled || disabled}
            value={option.value}
            onChange={onRadioChange}
            checked={value === option.value}
            style={option.style}
          >
            {option.label}
          </Radio>
        );
      }
    });
  }

  const groupPrefixCls = `${prefixCls}-group`;
  const classString = classNames(
    groupPrefixCls,
    `${groupPrefixCls}-${buttonStyle}`,
    {
      [`${groupPrefixCls}-${size}`]: size,
    },
    className,
  );

  return (
    <RadioContextProvider
      value={{
        onChange: onRadioChange,
        value,
        disabled,
        name,
      }}
    >
      <div
        className={classString}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        id={id}
      >
        {childrenToRender}
      </div>
    </RadioContextProvider>
  );
};
const RadioGroup = React.forwardRef(InternalRadioGroup);
RadioGroup.defaultProps = {
  disabled: false,
  prefixCls: 'fishd-radio',
  buttonStyle: 'outline',
};

export default memo(RadioGroup);
