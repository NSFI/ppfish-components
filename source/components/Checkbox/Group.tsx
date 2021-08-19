import * as React from 'react';
import classNames from 'classnames';
import Checkbox, { CheckboxChangeEvent } from './Checkbox';

export type CheckboxValueType = string | number | boolean;

export interface CheckboxOptionType {
  label: React.ReactNode;
  value: CheckboxValueType;
  style?: React.CSSProperties;
  disabled?: boolean;
  onChange?: (e: CheckboxChangeEvent) => void;
}

export interface AbstractCheckboxGroupProps {
  prefixCls?: string;
  className?: string;
  options?: Array<CheckboxOptionType | string>;
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface CheckboxGroupProps extends AbstractCheckboxGroupProps {
  name?: string;
  defaultValue?: Array<CheckboxValueType>;
  value?: Array<CheckboxValueType>;
  onChange?: (checkedValue: Array<CheckboxValueType>) => void;
}

export interface CheckboxGroupState {
  value: any;
}

export interface CheckboxGroupContext {
  name?: string;
  toggleOption?: (option: CheckboxOptionType) => void;
  value?: any;
  disabled?: boolean;
  registerValue: (val: string) => void;
  cancelValue: (val: string) => void;
}

export const GroupContext = React.createContext<CheckboxGroupContext | null>(null);

const InternalCheckboxGroup: React.ForwardRefRenderFunction<HTMLDivElement, CheckboxGroupProps> = (
  props,
  ref,
) => {
  let {
    defaultValue,
    children,
    options = [],
    prefixCls,
    className,
    style,
    onChange,
    ...restProps
  } = props;

  React.useEffect(() => {
    if ('value' in restProps) {
      setValue(restProps.value || []);
    }
  }, [restProps.value]);

  const [value, setValue] = React.useState<CheckboxValueType[]>(
    restProps.value || defaultValue || [],
  );
  const [registeredValues, setRegisteredValues] = React.useState<CheckboxValueType[]>([]);

  const getOptions = () =>
    options.map(option => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
        };
      }
      return option;
    });

  const cancelValue = (val: string) => {
    setRegisteredValues(prevValues => prevValues.filter(v => v !== val));
  };

  const registerValue = (val: string) => {
    setRegisteredValues(prevValues => [...prevValues, val]);
  };

  const toggleOption = (option: CheckboxOptionType) => {
    const optionIndex = value.indexOf(option.value);
    const newValue = [...value];
    if (optionIndex === -1) {
      newValue.push(option.value);
    } else {
      newValue.splice(optionIndex, 1);
    }
    if (!('value' in restProps)) {
      setValue(newValue);
    }
    const opts = getOptions();
    onChange?.(
      newValue
        .filter(val => registeredValues.indexOf(val) !== -1)
        .sort((a, b) => {
          const indexA = opts.findIndex(opt => opt.value === a);
          const indexB = opts.findIndex(opt => opt.value === b);
          return indexA - indexB;
        }),
    );
  };

  const context = {
    toggleOption,
    value,
    disabled: restProps.disabled,
    name: restProps.name,

    registerValue,
    cancelValue,
  };

  const groupPrefixCls = `${prefixCls}-group`;
  if (options && options.length > 0) {
    children = getOptions().map(option => (
      <Checkbox
        prefixCls={prefixCls}
        key={option.value.toString()}
        disabled={'disabled' in option ? option.disabled : props.disabled}
        value={option.value}
        checked={value.indexOf(option.value) !== -1}
        onChange={option.onChange}
        className={`${groupPrefixCls}-item`}
        style={option.style}
      >
        {option.label}
      </Checkbox>
    ));
  }
  const classString = classNames(groupPrefixCls, className);
  return (
    <div className={classString} style={style} ref={ref}>
      <GroupContext.Provider value={context}>{children}</GroupContext.Provider>
    </div>
  );
};

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(InternalCheckboxGroup);

CheckboxGroup.defaultProps = {
  options: [],
  prefixCls: 'fishd-checkbox',
};

CheckboxGroup.displayName = 'CheckboxGroup';

export default React.memo(CheckboxGroup);
