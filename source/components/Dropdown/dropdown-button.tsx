import * as React from 'react';
import Button from '../Button';
import { ButtonGroupProps } from '../Button';
import Dropdown, { DropDownProps } from './dropdown';
import classNames from 'classnames';
const ButtonGroup = Button.Group;

export interface DropdownButtonProps extends ButtonGroupProps, DropDownProps {
  type?: 'primary' | 'ghost' | 'dashed';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: any;
}

export default class DropdownButton extends React.Component<DropdownButtonProps, any> {
  static defaultProps = {
    placement: 'bottomRight',
    type: 'default',
    prefixCls: 'fishd-dropdown-button',
  };

  render() {
    const {
      type, disabled, onClick, children,
      prefixCls, className, overlay, trigger, align,
      visible, onVisibleChange, placement, getPopupContainer,
      ...restProps
    } = this.props;

    const dropdownProps = {
      align,
      overlay,
      disabled,
      trigger: disabled ? [] : trigger,
      onVisibleChange,
      placement,
      getPopupContainer,
    } as DropDownProps;
    if ('visible' in this.props) {
      dropdownProps.visible = visible;
    }

    return (
      <ButtonGroup
        {...restProps}
        className={classNames(prefixCls, className)}
      >
        <Button
          type={type}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </Button>
        <Dropdown {...dropdownProps}>
          <Button type={type} icon="ellipsis" />
        </Dropdown>
      </ButtonGroup>
    );
  }
}
