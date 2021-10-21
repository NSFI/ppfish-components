import * as React from 'react';
import classNames from 'classnames';
import RcCheckbox from './src/Checkbox';
import CheckboxGroup, { GroupContext } from './Group';

export interface AbstractCheckboxProps<T> {
  prefixCls?: string;
  className?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  onChange?: (e: T) => void;
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  onKeyPress?: React.KeyboardEventHandler<any>;
  onKeyDown?: React.KeyboardEventHandler<any>;
  value?: any;
  tabIndex?: number;
  name?: string;
  children?: React.ReactNode;
}

export interface CheckboxProps extends AbstractCheckboxProps<CheckboxChangeEvent> {
  indeterminate?: boolean;
}

export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean;
}

export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: Event;
}

const InternalCheckbox: React.ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
  props,
  ref,
) => {
  const {
    prefixCls,
    className,
    children,
    indeterminate,
    style,
    onMouseEnter,
    onMouseLeave,
    ...restProps
  } = props;
  const checkboxGroup = React.useContext(GroupContext);

  const prevValue = React.useRef(restProps.value);

  React.useEffect(() => {
    checkboxGroup?.registerValue(restProps.value);
  }, []);

  React.useEffect(() => {
    if (restProps.value !== prevValue.current) {
      checkboxGroup?.cancelValue(prevValue.current);
      checkboxGroup?.registerValue(restProps.value);
    }
    return () => checkboxGroup?.cancelValue(restProps.value);
  }, [restProps.value]);

  const checkboxProps: CheckboxProps = { ...restProps };
  if (checkboxGroup) {
    checkboxProps.onChange = (...args) => {
      if (restProps.onChange) {
        restProps.onChange(...args);
      }
      if (checkboxGroup.toggleOption) {
        checkboxGroup.toggleOption({ label: children, value: restProps.value });
      }
    };
    checkboxProps.name = checkboxGroup.name;
    checkboxProps.checked = checkboxGroup.value.indexOf(restProps.value) !== -1;
    checkboxProps.disabled = restProps.disabled || checkboxGroup.disabled;
  }
  const classString = classNames(className, {
    [`${prefixCls}-wrapper`]: true,
  });
  const checkboxClass = classNames({
    [`${prefixCls}-indeterminate`]: indeterminate,
  });
  return (
    <label
      className={classString}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <RcCheckbox {...checkboxProps} prefixCls={prefixCls} className={checkboxClass} ref={ref} />
      {children !== undefined ? <span>{children}</span> : null}
    </label>
  );
};

const CheckboxRef = React.forwardRef<HTMLInputElement, CheckboxProps>(InternalCheckbox);

type CheckboxRefInterface = typeof CheckboxRef;

interface CheckboxInterface extends CheckboxRefInterface {
  Group: typeof CheckboxGroup;
}

const Checkbox = CheckboxRef as CheckboxInterface;

Checkbox.Group = CheckboxGroup;

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  prefixCls: 'fishd-checkbox',
  indeterminate: false,
};

export default Checkbox;
