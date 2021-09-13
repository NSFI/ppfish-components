import * as React from 'react';
import Button, { ButtonGroupProps } from '../Button';
import Dropdown, { DropDownProps } from './Dropdown';
import classNames from 'classnames';

const ButtonGroup = Button.Group;

export interface DropdownButtonProps extends ButtonGroupProps, DropDownProps {
  type?: 'primary' | 'ghost' | 'dashed';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: any;
}

const DropdownButton = (props: DropdownButtonProps) => {
  const {
    type,
    disabled,
    onClick,
    children,
    prefixCls,
    className,
    overlay,
    overlayClassName,
    overlayStyle,
    trigger,
    align,
    visible,
    onVisibleChange,
    placement,
    getPopupContainer,
    mouseEnterDelay,
    mouseLeaveDelay,
    ...restProps
  } = props;

  const dropdownProps = {
    align,
    overlay,
    overlayClassName,
    overlayStyle,
    disabled,
    trigger: disabled ? [] : trigger,
    onVisibleChange,
    placement,
    getPopupContainer,
    mouseEnterDelay,
    mouseLeaveDelay,
  } as DropDownProps;
  if ('visible' in props) {
    dropdownProps.visible = visible;
  }

  return (
    <ButtonGroup {...restProps} className={classNames(prefixCls, className)}>
      <Button type={type} disabled={disabled} onClick={onClick}>
        {children}
      </Button>
      <Dropdown {...dropdownProps}>
        <Button type={type} icon="more-point" />
      </Dropdown>
    </ButtonGroup>
  );
};

DropdownButton.defaultProps = {
  placement: 'bottomRight',
  type: 'default',
  prefixCls: 'fishd-dropdown-button',
};

export default DropdownButton;
