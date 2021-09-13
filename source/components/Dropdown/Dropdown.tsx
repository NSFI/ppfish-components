import * as React from 'react';
import RcDropdown from './src';
import classNames from 'classnames';
import DropdownButton from './DropdownButton';
import warning from 'warning';

export interface DropDownProps {
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  overlay: React.ReactNode;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  onVisibleChange?: (visible?: boolean) => void;
  visible?: boolean;
  disabled?: boolean;
  align?: Object;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  prefixCls?: string;
  className?: string;
  transitionName?: string;
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  forceRender?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  children?: React.ReactNode;
}

interface DropdownInterface extends React.FC<DropDownProps> {
  Button: typeof DropdownButton;
}

const Dropdown: DropdownInterface = (props: DropDownProps) => {
  const { children, prefixCls, overlay: overlayElements, trigger, disabled } = props;

  const getTransitionName = () => {
    const { placement = '', transitionName } = props;
    if (transitionName !== undefined) {
      return transitionName;
    }
    if (placement.indexOf('top') >= 0) {
      return 'slide-down';
    }
    return 'slide-up';
  };

  React.useEffect(() => {
    const { overlay } = props;
    if (overlay) {
      const overlayProps = (overlay as React.ReactElement).props;
      warning(
        !overlayProps.mode || overlayProps.mode === 'vertical',
        `mode="${overlayProps.mode}" is not supported for Dropdown's Menu.`,
      );
    }
  }, []);

  const child = React.Children.only(children) as React.ReactElement;
  const dropdownTrigger = React.cloneElement(child, {
    className: classNames(child.props.className, `${prefixCls}-trigger`),
    disabled,
  });

  const renderOverlay = () => {
    const overlay = React.Children.only(overlayElements) as React.ReactElement;

    // menu cannot be selectable in dropdown defaultly
    // menu should be focusable in dropdown defaultly
    const { selectable = false, focusable = true } = overlay.props;

    const fixedModeOverlay =
      typeof overlay.type === 'string'
        ? overlay
        : React.cloneElement(overlay, {
          mode: 'vertical',
          selectable,
          focusable,
        });
    return fixedModeOverlay as React.ReactElement;
  };

  const triggerActions = disabled ? [] : trigger;
  let alignPoint;
  if (triggerActions && triggerActions.indexOf('contextMenu') !== -1) {
    alignPoint = true;
  }

  return (
    <RcDropdown
      alignPoint={alignPoint}
      {...props}
      transitionName={getTransitionName()}
      trigger={triggerActions}
      overlay={renderOverlay()}
    >
      {dropdownTrigger}
    </RcDropdown>
  );
};

Dropdown.Button = DropdownButton;

Dropdown.defaultProps = {
  prefixCls: 'fishd-dropdown',
  mouseEnterDelay: 0.15,
  mouseLeaveDelay: 0.1,
  placement: 'bottomLeft'
};

export default Dropdown;
