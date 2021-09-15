import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import TextArea, { TextAreaProps, TextAreaRef } from './TextArea';
import useControlledState from '../../hooks/useControlledState';

function countValue(value: string) {
  return value.length;
}

export interface CounterProps extends TextAreaProps {
  inputPrefixCls?: string;
  prefixCls?: string;
  limit: number;
  count?: (value: string) => number;
  value?: any;
  defaultValue?: any;
}

export interface CounterRef {
  focus: () => void;
  blur: () => void;
  textarea: TextAreaRef;
}

const InternalCounter: React.ForwardRefRenderFunction<CounterRef, CounterProps> = (props, ref) => {
  const [value, setValue] = useControlledState('', {
    value: props.value,
    defaultValue: props.defaultValue,
  });
  const textareaRef = React.useRef<TextAreaRef>(null);

  const focus = () => {
    textareaRef.current.focus();
  };

  const handleClick = () => {
    focus();
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange } = props;
    const textarea = textareaRef.current;
    const textareaValue = textarea && textarea.textAreaRef.value;
    setValue(textareaValue);
    if (onChange) {
      onChange(e);
    }
  };

  const getCount = () => {
    const { count } = props;
    if (!value) {
      return 0;
    }
    // 自定义计数方法
    if (count) {
      return count(String(value));
    }
    return countValue(String(value));
  };

  React.useImperativeHandle(ref, () => ({
    focus,
    blur: () => {
      textareaRef.current.blur();
    },
    textarea: textareaRef.current,
  }));

  const { inputPrefixCls, className, prefixCls, disabled, limit } = props;
  const inputClassName = classNames(className, {
    [`${prefixCls}`]: true,
    [`${inputPrefixCls}-disabled`]: disabled,
  });
  const textareaClassName = classNames(inputPrefixCls, className);
  const otherProps = omit(props, [
    'inputPrefixCls',
    'prefixCls',
    'limit',
    'count',
    'value',
    'onChange',
  ]);
  const total = getCount();
  return (
    <span className={inputClassName} onClick={handleClick}>
      <TextArea
        {...otherProps}
        className={textareaClassName}
        maxLength={limit}
        onChange={handleTextareaChange}
        value={value}
        ref={textareaRef}
      />
      <span className={`${prefixCls}-footer`}>
        <span className={`${prefixCls}-indicator`}>
          {total}/{limit}
        </span>
      </span>
    </span>
  );
};

const Counter = React.forwardRef(InternalCounter);

Counter.displayName = 'Counter';

Counter.defaultProps = {
  inputPrefixCls: 'fishd-input',
  prefixCls: 'fishd-input-counter',
};

export default Counter;
