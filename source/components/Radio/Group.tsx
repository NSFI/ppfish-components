import React, { FC, memo, useState } from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';

import Radio from './Radio';
import { RadioGroupProps, RadioGroupState, RadioChangeEvent } from './interface';
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

const RadioGroup: FC<RadioGroupProps> = props => {
  const { prefixCls, className = '', options, buttonStyle, disabled } = props;

  const [value, setValue] = useState(() => {
    let value;
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    } else {
      const checkedValue = getCheckedValue(props.children);
      value = checkedValue && checkedValue.value;
    }
    return value;
  });

  useUpdateEffect(() => {
    if ('value' in props) {
      setValue(props.value);
    } else {
      const checkedValue = getCheckedValue(props.children);
      if (checkedValue) {
        setValue(checkedValue.value);
      }
    }
  }, [props.value, props.children]);

  const groupPrefixCls = `${prefixCls}-group`;
  const classString = classNames(
    groupPrefixCls,
    `${groupPrefixCls}-${buttonStyle}`,
    {
      [`${groupPrefixCls}-${props.size}`]: props.size,
    },
    className,
  );

  let children: React.ReactChildren[] | React.ReactElement<any>[] | React.ReactNode =
    props.children;

  const onRadioChange = (ev: RadioChangeEvent) => {
    const lastValue = value;
    const val = ev.target.value;
    if (!('value' in props)) {
      setValue(val);
    }

    const onChange = props.onChange;
    if (onChange && val !== lastValue) {
      onChange(ev);
    }
  };

  // 如果存在 options, 优先使用
  if (options && options.length > 0) {
    children = options.map((option, index) => {
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
            key={index}
            prefixCls={prefixCls}
            disabled={option.disabled || disabled}
            value={option.value}
            onChange={onRadioChange}
            checked={value === option.value}
          >
            {option.label}
          </Radio>
        );
      }
    });
  }

  return (
    <RadioContextProvider
      value={{
        onChange: onRadioChange,
        value,
        disabled: props.disabled,
        name: props.name,
      }}
    >
      <div
        className={classString}
        style={props.style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        id={props.id}
      >
        {children}
      </div>
    </RadioContextProvider>
  );
};

RadioGroup.defaultProps = {
  disabled: false,
  prefixCls: 'fishd-radio',
  buttonStyle: 'outline',
};

class RadioGroup2 extends React.Component<RadioGroupProps, RadioGroupState> {
  static defaultProps = {
    disabled: false,
    prefixCls: 'fishd-radio',
    buttonStyle: 'outline',
  };

  static getDerivedStateFromProps(nextProps: RadioGroupProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    } else {
      const checkedValue = getCheckedValue(nextProps.children);
      if (checkedValue) {
        return {
          value: checkedValue.value,
        };
      }
    }
    return null;
  }

  constructor(props: RadioGroupProps) {
    super(props);
    let value;
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    } else {
      const checkedValue = getCheckedValue(props.children);
      value = checkedValue && checkedValue.value;
    }
    this.state = {
      value,
    };
  }

  getChildContext() {
    return {
      radioGroup: {
        onChange: this.onRadioChange,
        value: this.state.value,
        disabled: this.props.disabled,
        name: this.props.name,
      },
    };
  }

  shouldComponentUpdate(nextProps: RadioGroupProps, nextState: RadioGroupState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  onRadioChange = (ev: RadioChangeEvent) => {
    const lastValue = this.state.value;
    const { value } = ev.target;
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }

    const onChange = this.props.onChange;
    if (onChange && value !== lastValue) {
      onChange(ev);
    }
  };

  render() {
    const props = this.props;
    const { prefixCls, className = '', options, buttonStyle } = props;
    const groupPrefixCls = `${prefixCls}-group`;
    const classString = classNames(
      groupPrefixCls,
      `${groupPrefixCls}-${buttonStyle}`,
      {
        [`${groupPrefixCls}-${props.size}`]: props.size,
      },
      className,
    );

    let children: React.ReactChildren[] | React.ReactElement<any>[] | React.ReactNode =
      props.children;

    // 如果存在 options, 优先使用
    if (options && options.length > 0) {
      children = options.map((option, index) => {
        if (typeof option === 'string') {
          // 此处类型自动推导为 string
          return (
            <Radio
              key={index}
              prefixCls={prefixCls}
              disabled={this.props.disabled}
              value={option}
              onChange={this.onRadioChange}
              checked={this.state.value === option}
            >
              {option}
            </Radio>
          );
        } else {
          // 此处类型自动推导为 { label: string value: string }
          return (
            <Radio
              key={index}
              prefixCls={prefixCls}
              disabled={option.disabled || this.props.disabled}
              value={option.value}
              onChange={this.onRadioChange}
              checked={this.state.value === option.value}
            >
              {option.label}
            </Radio>
          );
        }
      });
    }

    return (
      <div
        className={classString}
        style={props.style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        id={props.id}
      >
        {children}
      </div>
    );
  }
}

export default memo(RadioGroup);
