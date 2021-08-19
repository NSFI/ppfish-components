import * as React from 'react';
import classNames from 'classnames';

export interface Props {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  id?: string;
  type?: string;
  defaultChecked?: number | boolean;
  checked?: number | boolean;
  disabled?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: CheckboxChangeEvent) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  tabIndex?: string | number;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  value?: any;
}

type CheckboxChangeEventTarget = Props & {
  checked: boolean;
};

type CheckboxChangeEvent = {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: Event;
};

const InternalRcCheckbox: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  props,
  ref,
) => {
  const [checked, setChecked] = React.useState(
    'checked' in props ? props.checked : props.defaultChecked,
  );

  React.useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  const handleChange = e => {
    if (props.disabled) {
      return;
    }
    if (!('checked' in props)) {
      setChecked(e.target.checked);
    }
    props.onChange({
      target: {
        ...props,
        checked: e.target.checked,
      },
      stopPropagation() {
        e.stopPropagation();
      },
      preventDefault() {
        e.preventDefault();
      },
      nativeEvent: e.nativeEvent,
    });
  };

  const {
    prefixCls,
    className,
    style,
    name,
    id,
    type,
    disabled,
    readOnly,
    tabIndex,
    onClick,
    onFocus,
    onBlur,
    autoFocus,
    value,
    ...otherprops
  } = props;

  const globalProps = Object.keys(otherprops).reduce((prev, key) => {
    if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
      prev[key] = otherprops[key];
    }
    return prev;
  }, {});

  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-checked`]: checked,
    [`${prefixCls}-disabled`]: disabled,
  });

  return (
    <span className={classString} style={style}>
      <input
        name={name}
        id={id}
        type={type}
        readOnly={readOnly}
        disabled={disabled}
        tabIndex={tabIndex as number}
        className={`${prefixCls}-input`}
        checked={!!checked}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleChange}
        autoFocus={autoFocus}
        ref={ref}
        value={value}
        {...globalProps}
      />
      <span className={`${prefixCls}-inner`} />
    </span>
  );
};

const RcCheckbox = React.forwardRef<HTMLInputElement, Props>(InternalRcCheckbox);

RcCheckbox.displayName = 'RcCheckbox';

RcCheckbox.defaultProps = {
  prefixCls: 'rc-checkbox',
  className: '',
  style: {},
  type: 'checkbox',
  defaultChecked: false,
  onFocus() {},
  onBlur() {},
  onChange() {},
};

export default RcCheckbox;
