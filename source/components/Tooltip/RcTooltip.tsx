import * as React from 'react';
import Trigger from 'rc-trigger';
import type { TriggerProps } from 'rc-trigger';
import type { AlignType, AnimationType, ActionType } from 'rc-trigger/lib/interface';
import { rcPlacements } from './rcPlacements';
import RcContent from './RcContent';
import PropTypes from 'prop-types';

export interface TooltipProps extends Pick<TriggerProps, 'onPopupAlign' | 'builtinPlacements'> {
  trigger?: ActionType | ActionType[];
  children?: React.ReactElement;
  defaultVisible?: boolean;
  visible?: boolean;
  placement?: string;
  transitionName?: string;
  animation?: AnimationType;
  onVisibleChange?: (visible: boolean) => void;
  afterVisibleChange?: (visible: boolean) => void;
  overlay: (() => React.ReactNode) | React.ReactNode;
  overlayStyle?: React.CSSProperties;
  overlayClassName?: string;
  prefixCls?: string;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  getTooltipContainer?: (node: HTMLElement) => HTMLElement;
  destroyTooltipOnHide?: boolean;
  align?: AlignType;
  arrowContent?: React.ReactNode;
  id?: string;
  popupVisible?: boolean;
  zIndex?: number;
}

export interface RcTooltipRef {
  // rc-trigger 未导出 Trigger 类型
  trigger: React.Component<TriggerProps>;
  getPopupDomNode: () => HTMLElement;
}

const RcInternalTooltip: React.ForwardRefRenderFunction<RcTooltipRef, TooltipProps> = (
  props,
  ref,
) => {
  const {
    overlayClassName,
    trigger,
    mouseEnterDelay,
    mouseLeaveDelay,
    overlayStyle,
    prefixCls,
    children,
    onVisibleChange,
    afterVisibleChange,
    transitionName,
    animation,
    placement,
    align,
    destroyTooltipOnHide,
    defaultVisible,
    getTooltipContainer,
    ...restProps
  } = props;

  const extraProps = { ...restProps };
  if ('visible' in props) {
    extraProps.popupVisible = props.visible;
  }

  const triggerRef = React.useRef(null);

  const getPopupElement = () => {
    const { arrowContent, overlay, prefixCls, id } = props;
    return [
      <div className={`${prefixCls}-arrow`} key="arrow">
        {arrowContent}
      </div>,
      <RcContent
        key="content"
        trigger={triggerRef.current}
        prefixCls={prefixCls}
        id={id}
        overlay={overlay}
      />,
    ];
  };

  const getPopupDomNode = () => {
    return triggerRef.current.getPopupDomNode();
  };

  React.useImperativeHandle(ref, () => ({
    trigger: triggerRef.current,
    getPopupDomNode,
  }));

  return (
    <Trigger
      popupClassName={overlayClassName}
      ref={triggerRef}
      prefixCls={prefixCls}
      popup={getPopupElement}
      action={trigger}
      builtinPlacements={rcPlacements}
      popupPlacement={placement}
      popupAlign={align}
      getPopupContainer={getTooltipContainer}
      onPopupVisibleChange={onVisibleChange}
      afterPopupVisibleChange={afterVisibleChange}
      popupTransitionName={transitionName}
      popupAnimation={animation}
      defaultPopupVisible={defaultVisible}
      destroyPopupOnHide={destroyTooltipOnHide}
      mouseLeaveDelay={mouseLeaveDelay}
      popupStyle={overlayStyle}
      mouseEnterDelay={mouseEnterDelay}
      {...extraProps}
    >
      {children}
    </Trigger>
  );
};

const RcTooltip = React.forwardRef(RcInternalTooltip);

RcTooltip.propTypes = {
  trigger: PropTypes.any,
  children: PropTypes.any,
  defaultVisible: PropTypes.bool,
  visible: PropTypes.bool,
  placement: PropTypes.string,
  transitionName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  animation: PropTypes.any,
  onVisibleChange: PropTypes.func,
  afterVisibleChange: PropTypes.func,
  overlay: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  overlayStyle: PropTypes.object,
  overlayClassName: PropTypes.string,
  prefixCls: PropTypes.string,
  mouseEnterDelay: PropTypes.number,
  mouseLeaveDelay: PropTypes.number,
  getTooltipContainer: PropTypes.func,
  destroyTooltipOnHide: PropTypes.bool,
  align: PropTypes.object,
  arrowContent: PropTypes.any,
  id: PropTypes.string,
};

RcTooltip.defaultProps = {
  prefixCls: 'fishd-tooltip',
  mouseEnterDelay: 0,
  destroyTooltipOnHide: false,
  mouseLeaveDelay: 0.1,
  align: {},
  placement: 'right',
  trigger: ['hover'],
  arrowContent: null,
};

export default RcTooltip;
