import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import useControlledState from '../../../hooks/useControlledState';
import placements from './placements';

export interface RcDropDownProps {
  minOverlayWidthMatchTrigger?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  onOverlayClick?: (e: Event) => void;
  prefixCls?: string;
  children?: React.ReactElement;
  transitionName?: string;
  overlayClassName?: string;
  animation?: string;
  align?: Object;
  overlayStyle?: React.CSSProperties;
  placement?: string;
  overlay?: React.ReactElement;
  trigger?: string | string[];
  alignPoint?: boolean;
  showAction?: string[];
  hideAction?: string[];
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  visible?: boolean;
  defaultVisible?: boolean;
}

const InternalDropdown: React.ForwardRefRenderFunction<any, RcDropDownProps> = (props, ref) => {
  const { visible, defaultVisible } = props;
  const {
    prefixCls,
    children,
    transitionName,
    animation,
    align,
    placement,
    getPopupContainer,
    showAction = [],
    hideAction,
    overlayClassName,
    overlayStyle,
    trigger,
    ...otherProps
  } = props;

  const [triggerVisible, setTriggerVisible] = useControlledState(false, {
    value: visible,
    defaultValue: defaultVisible,
    onChange: props.onVisibleChange,
  });

  const triggerRef = React.useRef<any>(null);
  React.useImperativeHandle(ref, () => triggerRef.current);

  const onClick = e => {
    const overlayProps = props.overlay.props;
    // do no call onVisibleChange, if you need click to hide, use onClick and control visible
    if (!('visible' in props)) {
      setTriggerVisible(false);
    }
    if (props.onOverlayClick) {
      props.onOverlayClick(e);
    }
    if (overlayProps.onClick) {
      overlayProps.onClick(e);
    }
  };

  const onVisibleChange = visible => {
    setTriggerVisible(visible);
  };

  const getMinOverlayWidthMatchTrigger = () => {
    const { minOverlayWidthMatchTrigger, alignPoint } = props;
    if ('minOverlayWidthMatchTrigger' in props) {
      return minOverlayWidthMatchTrigger;
    }

    return !alignPoint;
  };

  const getMenuElement = () => {
    const { overlay, prefixCls } = props;
    const extraOverlayProps = {
      prefixCls: `${prefixCls}-menu`,
      onClick: onClick,
    };
    if (typeof overlay.type === 'string') {
      delete extraOverlayProps.prefixCls;
    }
    return React.cloneElement(overlay, extraOverlayProps);
  };

  const getPopupDomNode = function () {
    return triggerRef.current.getPopupDomNode();
  };

  const afterVisibleChange = visible => {
    if (visible && getMinOverlayWidthMatchTrigger()) {
      const overlayNode = getPopupDomNode();
      const rootNode = ReactDOM.findDOMNode(triggerRef.current) as HTMLElement;
      if (rootNode && overlayNode && rootNode.offsetWidth > overlayNode.offsetWidth) {
        overlayNode.style.minWidth = `${rootNode.offsetWidth}px`;
        if (triggerRef.current?._component?.alignInstance) {
          triggerRef.current._component.alignInstance.forceAlign();
        }
      }
    }
  };

  let triggerHideAction = hideAction;
  if (!triggerHideAction && trigger.indexOf('contextMenu') !== -1) {
    triggerHideAction = ['click'];
  }

  return (
    <Trigger
      {...otherProps}
      prefixCls={prefixCls}
      ref={triggerRef}
      popupClassName={overlayClassName}
      popupStyle={overlayStyle}
      builtinPlacements={placements}
      action={trigger}
      showAction={showAction}
      hideAction={triggerHideAction || []}
      popupPlacement={placement}
      popupAlign={align}
      popupTransitionName={transitionName}
      popupAnimation={animation}
      popupVisible={triggerVisible}
      afterPopupVisibleChange={afterVisibleChange}
      popup={getMenuElement()}
      onPopupVisibleChange={onVisibleChange}
      getPopupContainer={getPopupContainer}
    >
      {children}
    </Trigger>
  );
};

const Dropdown = React.forwardRef(InternalDropdown);

Dropdown.propTypes = {
  minOverlayWidthMatchTrigger: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  onOverlayClick: PropTypes.func,
  prefixCls: PropTypes.string,
  children: PropTypes.node,
  transitionName: PropTypes.string,
  overlayClassName: PropTypes.string,
  animation: PropTypes.string,
  align: PropTypes.object,
  overlayStyle: PropTypes.object,
  placement: PropTypes.string,
  overlay: PropTypes.node,
  trigger: PropTypes.array,
  alignPoint: PropTypes.bool,
  showAction: PropTypes.array,
  hideAction: PropTypes.array,
  getPopupContainer: PropTypes.func,
  visible: PropTypes.bool,
  defaultVisible: PropTypes.bool,
};

Dropdown.defaultProps = {
  prefixCls: 'rc-dropdown',
  trigger: ['hover'],
  showAction: [],
  overlayClassName: '',
  overlayStyle: {},
  defaultVisible: false,
  onVisibleChange() {},
  placement: 'bottomLeft',
};

export default Dropdown;
