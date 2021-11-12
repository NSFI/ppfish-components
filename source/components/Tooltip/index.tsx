import * as React from 'react';
import { cloneElement } from 'react';
import RcTooltip, { RcTooltipRef } from './RcTooltip';
import classNames from 'classnames';
import getPlacements, { AdjustOverflow, PlacementsConfig } from './placements';
import Button from '../Button';
import useControlledState from '../../hooks/useControlledState';
import './style/index.less';

export { AdjustOverflow, PlacementsConfig };

export type TooltipPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'contextMenu';

export interface AbstractTooltipProps {
  prefixCls?: string;
  overlayClassName?: string;
  style?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
  placement?: TooltipPlacement;
  builtinPlacements?: Object;
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  transitionName?: string;
  trigger?: TooltipTrigger;
  openClassName?: string;
  arrowPointAtCenter?: boolean;
  autoAdjustOverflow?: boolean | AdjustOverflow;
  // getTooltipContainer had been rename to getPopupContainer
  getTooltipContainer?: (triggerNode: HTMLElement) => HTMLElement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  children?: React.ReactNode;
  stretch?: string;
}

export type RenderFunction = () => React.ReactNode;

export interface TooltipProps extends AbstractTooltipProps {
  title?: React.ReactNode | RenderFunction;
  overlay?: React.ReactNode | RenderFunction;
}

export interface TooltipRef {
  tooltip: RcTooltipRef;
  getPopupDomNode: () => HTMLElement;
}

const splitObject = (obj: any, keys: string[]) => {
  const picked: any = {};
  const omitted: any = { ...obj };
  keys.forEach(key => {
    if (obj && key in obj) {
      picked[key] = obj[key];
      delete omitted[key];
    }
  });
  return { picked, omitted };
};

const InternalTooltip: React.ForwardRefRenderFunction<TooltipRef, TooltipProps> = (props, ref) => {
  const tooltipRef = React.useRef<RcTooltipRef>();
  const [visible, setVisible] = useControlledState<boolean>(false, {
    value: props.visible,
    defaultValue: props.defaultVisible,
  });

  const isNoTitle = () => {
    const { title, overlay } = props;
    return !title && !overlay; // overlay for old version compatibility
  };

  const onVisibleChange = (visible: boolean) => {
    if (!('visible' in props)) {
      setVisible(isNoTitle() ? false : visible);
    }
    if (!isNoTitle()) {
      props.onVisibleChange?.(visible);
    }
  };

  const getPopupDomNode = () => {
    return tooltipRef.current.getPopupDomNode();
  };

  const getTooltipPlacements = () => {
    const { builtinPlacements, arrowPointAtCenter, autoAdjustOverflow } = props;
    return (
      builtinPlacements ||
      getPlacements({
        arrowPointAtCenter,
        verticalArrowShift: 8,
        autoAdjustOverflow,
      })
    );
  };

  const isHoverTrigger = () => {
    const { trigger } = props;
    if (!trigger || trigger === 'hover') {
      return true;
    }
    if (Array.isArray(trigger)) {
      return trigger.indexOf('hover') >= 0;
    }
    return false;
  };

  // Fix Tooltip won't hide at disabled button
  // mouse events don't trigger at disabled button in Chrome
  // https://github.com/react-component/tooltip/issues/18
  const getDisabledCompatibleChildren = (element: React.ReactElement<any>) => {
    if (
      ((element.type as typeof Button).__FISHD_BUTTON || element.type === 'button') &&
      element.props.disabled &&
      isHoverTrigger()
    ) {
      // Pick some layout related style properties up to span
      // Prevent layout bugs like https://github.com/ant-design/ant-design/issues/5254
      const { picked, omitted } = splitObject(element.props.style, [
        'position',
        'left',
        'right',
        'top',
        'bottom',
        'float',
        'display',
        'zIndex',
      ]);
      const spanStyle = {
        display: 'inline-block', // default inline-block is important
        ...picked,
        cursor: 'not-allowed',
      };
      const buttonStyle = {
        ...omitted,
        pointerEvents: 'none',
      };
      const child = cloneElement(element, {
        style: buttonStyle,
        className: null,
      });
      return (
        <span style={spanStyle} className={element.props.className}>
          {child}
        </span>
      );
    }
    return element;
  };

  // 动态设置动画点
  const onPopupAlign = (domNode: HTMLElement, align: any) => {
    const placements: any = getTooltipPlacements();
    // 当前返回的位置
    const placement = Object.keys(placements).filter(
      key =>
        placements[key].points[0] === align.points[0] &&
        placements[key].points[1] === align.points[1],
    )[0];
    if (!placement) {
      return;
    }
    // 根据当前坐标设置动画点
    const rect = domNode.getBoundingClientRect();
    const transformOrigin = {
      top: '50%',
      left: '50%',
    };
    if (placement.indexOf('top') >= 0 || placement.indexOf('Bottom') >= 0) {
      transformOrigin.top = `${rect.height - align.offset[1]}px`;
    } else if (placement.indexOf('Top') >= 0 || placement.indexOf('bottom') >= 0) {
      transformOrigin.top = `${-align.offset[1]}px`;
    }
    if (placement.indexOf('left') >= 0 || placement.indexOf('Right') >= 0) {
      transformOrigin.left = `${rect.width - align.offset[0]}px`;
    } else if (placement.indexOf('right') >= 0 || placement.indexOf('Left') >= 0) {
      transformOrigin.left = `${-align.offset[0]}px`;
    }
    domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
  };

  React.useImperativeHandle(ref, () => ({
    tooltip: tooltipRef.current,
    getPopupDomNode,
  }));

  const { prefixCls, title, overlay, openClassName, getPopupContainer, getTooltipContainer } =
    props;
  const children = props.children as React.ReactElement<any>;

  let tempVisible = visible;
  // Hide tooltip when there is no title
  if (!('visible' in props) && isNoTitle()) {
    tempVisible = false;
  }

  const child = getDisabledCompatibleChildren(
    React.isValidElement(children) ? children : <span>{children}</span>,
  );
  const childProps = child.props;
  const childCls = classNames(childProps.className, {
    [openClassName || `${prefixCls}-open`]: true,
  });

  return (
    <RcTooltip
      {...props}
      getTooltipContainer={getPopupContainer || getTooltipContainer}
      ref={tooltipRef}
      builtinPlacements={getTooltipPlacements()}
      overlay={overlay || title || ''}
      visible={tempVisible}
      onVisibleChange={onVisibleChange}
      onPopupAlign={onPopupAlign}
    >
      {tempVisible ? cloneElement(child, { className: childCls }) : child}
    </RcTooltip>
  );
};

const Tooltip = React.forwardRef(InternalTooltip);

Tooltip.defaultProps = {
  prefixCls: 'fishd-tooltip',
  placement: 'top' as TooltipPlacement,
  transitionName: 'zoom-big-fast',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  arrowPointAtCenter: false,
  autoAdjustOverflow: true,
};

export default Tooltip;
