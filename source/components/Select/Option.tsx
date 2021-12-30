import * as React from 'react';
import classNames from 'classnames';

interface OptionProps {
  prefixCls?: string;

  value?: string | number | React.ReactNode;
  title?: string;
  checked?: boolean | (() => void);
  activeKey?: string | number;

  disabled?: boolean;
  showOptionCheckedIcon?: boolean;

  children?: React.ReactNode | React.ReactChildren;
  onOptionClick?: (e: React.MouseEvent<any>, option: any) => void;
}

export type OptionInterface = React.ForwardRefExoticComponent<
  OptionProps & React.RefAttributes<HTMLLIElement>
> & { isSelectOption: true };

const InternalOption: React.ForwardRefRenderFunction<HTMLLIElement, OptionProps> = (props, ref) => {
  const {
    prefixCls,
    value,
    title,
    checked,
    activeKey,
    disabled,
    showOptionCheckedIcon,
    children,
    onOptionClick,
  } = props;

  const handleOptionClick = (e: React.MouseEvent<any>, option) => {
    if (!disabled) {
      onOptionClick && onOptionClick(e, option);
    }
  };

  const label = children && (children as React.ReactNode[]).length === 1 ? children[0] : children;

  const optionCls = classNames(
    { [`checked`]: !!checked },
    { [`checked-icon`]: !!checked && showOptionCheckedIcon },
    { [`active`]: 'activeKey' in props && activeKey === value },
    { [`${prefixCls}-item`]: true },
    { [`${prefixCls}-item-disabled`]: !!disabled },
  );

  return (
    <li
      ref={ref}
      title={title}
      className={optionCls}
      onClick={e => handleOptionClick(e, { label, title, key: value })}
    >
      {children}
    </li>
  );
};

const Option = React.forwardRef<HTMLLIElement, OptionProps>(InternalOption) as OptionInterface;

Option.isSelectOption = true;
Option.defaultProps = {
  prefixCls: 'fishd-select-dropdown-option',
  showOptionCheckedIcon: true,
};
Option.displayName = 'Option';

export default Option;
