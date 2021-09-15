import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import Group from './Group';
import Search from './Search';
import TextArea from './TextArea';
import Counter from './Counter';
import { Omit } from '../../utils/type';

function fixControlledValue<T>(value: T) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  prefixCls?: string;
  className?: string;
  size?: 'large' | 'default' | 'small';
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export interface InputRef {
  input: HTMLInputElement;
  focus: () => void;
  blur: () => void;
}

const InternalInput: React.ForwardRefRenderFunction<InputRef, InputProps> = (props, ref) => {
  const inputRef = React.useRef(null);
  React.useImperativeHandle(ref, () => ({
    input: inputRef.current,
    focus: () => {
      inputRef.current.focus();
    },
    blur: () => {
      inputRef.current.blur();
    },
  }));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onPressEnter, onKeyDown } = props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const getInputClassName = () => {
    const { prefixCls, size, disabled } = props;
    return classNames(prefixCls, {
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-disabled`]: disabled,
    });
  };

  const renderLabeledInput = (children: React.ReactElement<any>) => {
    // Not wrap when there is not addons
    if (!props.addonBefore && !props.addonAfter) {
      return children;
    }

    const wrapperClassName = `${props.prefixCls}-group`;
    const addonClassName = `${wrapperClassName}-addon`;
    const addonBefore = props.addonBefore ? (
      <span className={addonClassName}>{props.addonBefore}</span>
    ) : null;

    const addonAfter = props.addonAfter ? (
      <span className={addonClassName}>{props.addonAfter}</span>
    ) : null;

    const className = classNames(`${props.prefixCls}-wrapper`, {
      [wrapperClassName]: addonBefore || addonAfter,
    });

    const groupClassName = classNames(`${props.prefixCls}-group-wrapper`, {
      [`${props.prefixCls}-group-wrapper-sm`]: props.size === 'small',
      [`${props.prefixCls}-group-wrapper-lg`]: props.size === 'large',
    });

    // Need another wrapper for changing display:table to display:inline-block
    // and put style prop in wrapper
    if (addonBefore || addonAfter) {
      return (
        <span className={groupClassName} style={props.style}>
          <span className={className}>
            {addonBefore}
            {React.cloneElement(children, { style: null })}
            {addonAfter}
          </span>
        </span>
      );
    }
    return (
      <span className={className}>
        {addonBefore}
        {children}
        {addonAfter}
      </span>
    );
  };

  const renderLabeledIcon = (children: React.ReactElement<any>) => {
    if (!('prefix' in props || 'suffix' in props)) {
      return children;
    }

    const prefix = props.prefix ? (
      <span className={`${props.prefixCls}-prefix`}>{props.prefix}</span>
    ) : null;

    const suffix = props.suffix ? (
      <span className={`${props.prefixCls}-suffix`}>{props.suffix}</span>
    ) : null;

    const affixWrapperCls = classNames(props.className, `${props.prefixCls}-affix-wrapper`, {
      [`${props.prefixCls}-affix-wrapper-sm`]: props.size === 'small',
      [`${props.prefixCls}-affix-wrapper-lg`]: props.size === 'large',
    });
    return (
      <span className={affixWrapperCls} style={props.style}>
        {prefix}
        {React.cloneElement(children, {
          style: null,
          className: getInputClassName(),
        })}
        {suffix}
      </span>
    );
  };

  const renderInput = () => {
    const { value, className } = props;
    // Fix https://fb.me/react-unknown-prop
    const otherProps = omit(props, [
      'prefixCls',
      'onPressEnter',
      'addonBefore',
      'addonAfter',
      'prefix',
      'suffix',
    ]);

    if ('value' in props) {
      otherProps.value = fixControlledValue(value);
      // Input elements must be either controlled or uncontrolled,
      // specify either the value prop, or the defaultValue prop, but not both.
      delete otherProps.defaultValue;
    }
    return renderLabeledIcon(
      <input
        {...otherProps}
        className={classNames(getInputClassName(), className)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />,
    );
  };

  return renderLabeledInput(renderInput());
};

interface InputInterface
  extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>> {
  Group: typeof Group;
  Search: typeof Search;
  TextArea: typeof TextArea;
  Counter: typeof Counter;
}

const Input = React.forwardRef(InternalInput) as InputInterface;

Input.displayName = 'Input';

Input.defaultProps = {
  prefixCls: 'fishd-input',
  type: 'text',
  disabled: false,
};

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOf(['small', 'default', 'large']),
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  className: PropTypes.string,
  addonBefore: PropTypes.node,
  addonAfter: PropTypes.node,
  prefixCls: PropTypes.string,
  onPressEnter: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
};

export default Input;
