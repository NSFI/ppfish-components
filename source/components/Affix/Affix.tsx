import * as React from 'react';
import { addEventListener } from '../../utils';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import omit from 'omit.js';
import throttleByAnimationFrame from '../../utils/throttleByAnimationFrame';

interface ClientRect {
  bottom: number;
  readonly height: number;
  left: number;
  right: number;
  top: number;
  readonly width: number;
}

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = React.useRef();
  // Store current value in ref
  React.useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

//获取target在屏幕上的绝对定位
function getTargetRect(target: HTMLElement | Window | null): ClientRect {
  return target !== window
    ? (target as HTMLElement).getBoundingClientRect()
    : ({ top: 0, left: 0, bottom: 0 } as ClientRect);
}

//获取target的滚动距离
function getScroll(target: HTMLElement | Window, top: boolean): number {
  if (typeof window === 'undefined') {
    return 0;
  }

  const prop = top ? 'pageYOffset' : 'pageXOffset';
  const method = top ? 'scrollTop' : 'scrollLeft';
  const isWindow = target === window;

  let ret = isWindow ? target[prop] : target[method];
  // ie6,7,8 standard mode
  if (isWindow && typeof ret !== 'number') {
    ret = window.document.documentElement[method];
  }

  return ret;
}

//获取elem的宽高以及在target节点的的top、left距离值
function getOffset(element: HTMLElement, target: HTMLElement | Window | null) {
  const elemRect = element.getBoundingClientRect();
  const targetRect = getTargetRect(target);

  const scrollTop = getScroll(target, true);
  const scrollLeft = getScroll(target, false);

  const docElem = window.document.body;
  const clientTop = docElem.clientTop || 0;
  const clientLeft = docElem.clientLeft || 0;

  return {
    top: elemRect.top - targetRect.top + scrollTop - clientTop,
    left: elemRect.left - targetRect.left + scrollLeft - clientLeft,
    width: elemRect.width,
    height: elemRect.height
  };
}

function noop() {}

function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}

// Affix
export interface AffixProps {
  /**
   * 距离窗口顶部达到指定偏移量后触发
   */
  offsetTop?: number;
  offset?: number;
  /** 距离窗口底部达到指定偏移量后触发 */
  offsetBottom?: number;
  style?: React.CSSProperties;
  /** 固定状态改变时触发的回调函数 */
  onChange?: (affixed?: boolean) => void;
  /** 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
  target?: () => Window | HTMLElement | null;
  prefixCls?: string;
}

export interface AffixState {
  affixStyle: React.CSSProperties | undefined;
  placeholderStyle: React.CSSProperties | undefined;
}

const Affix: React.FC<AffixProps> = props => {
  const [stateAffixStyle, setStateAffixStyle] = React.useState<AffixState['affixStyle']>();
  const [statePlaceholderStyle, setStatePlaceholderStyle] = React.useState<
    AffixState['placeholderStyle']
  >();
  const prevAffixStyle = React.useRef(stateAffixStyle);

  const prevProps: AffixProps = usePrevious(props);
  const timeoutRef = React.useRef<any>(null);
  const fixedNodeRef = React.useRef<HTMLDivElement>(null);
  const placeholderNodeRef = React.useRef<HTMLDivElement>(null);

  const eventHandlers: {
    [key: string]: any;
  } = React.useRef({});

  const events = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'];

  //设置fixed的元素的样式
  const setAffixStyle = (e: any, affixStyle: AffixState['affixStyle']) => {
    const { target = getDefaultTarget } = props;
    const isWindow = target() === window;
    if (e.type === 'scroll' && stateAffixStyle && affixStyle && isWindow) {
      return;
    }
    if (shallowequal(affixStyle, stateAffixStyle)) {
      return;
    }
    setStateAffixStyle(affixStyle);
  };

  React.useEffect(() => {
    const originalAffixStyle = prevAffixStyle.current;
    const isEqual = !!originalAffixStyle === !!stateAffixStyle;
    if (!isEqual) {
      const { onChange = noop } = props;
      const affixed = !!stateAffixStyle;

      onChange(affixed);
    }
    prevAffixStyle.current = stateAffixStyle;
  }, [stateAffixStyle]);

  React.useEffect(() => {
    const target = props.target || getDefaultTarget;
    // Wait for parent component ref has its value
    timeoutRef.current = setTimeout(() => {
      setTargetEventListeners(target);
    });

    return () => {
      clearEventListeners();
      clearTimeout(timeoutRef.current);
      (updatePosition as any).cancel();
    };
  }, []);

  React.useEffect(() => {
    if (!prevProps) {
      return;
    }
    if (props.target !== prevProps.target) {
      clearEventListeners();
      setTargetEventListeners(props.target!);

      // Mock Event object.
      updatePosition({});
    }
    if (props.offsetTop !== prevProps.offsetTop || props.offsetBottom !== prevProps.offsetBottom) {
      updatePosition({});
    }
  }, [props]);

  //设置占位元素的样式
  const setPlaceholderStyle = (placeholderStyle: AffixState['placeholderStyle']) => {
    const originalPlaceholderStyle = statePlaceholderStyle;
    if (shallowequal(placeholderStyle, originalPlaceholderStyle)) {
      return;
    }

    setStatePlaceholderStyle(placeholderStyle);
  };

  //同步占位元素的样式
  const syncPlaceholderStyle = (e: any) => {
    if (!stateAffixStyle) {
      return;
    }
    let placeholderNode = placeholderNodeRef.current;
    placeholderNode!.style.cssText = '';
    setAffixStyle(e, {
      ...stateAffixStyle,
      width: placeholderNode!.offsetWidth
    });
    setStatePlaceholderStyle({
      width: placeholderNode!.offsetWidth
    });
  };

  //滚动以及window.resize监听处理方法
  const updatePosition = throttleByAnimationFrame((e: any) => {
    let { offsetTop, offsetBottom, offset, target = getDefaultTarget } = props;
    const targetNode = target();
    const fixedNode = fixedNodeRef.current;

    // Backwards support
    // Fix: if offsetTop === 0, it will get undefined,
    //   if offsetBottom is type of number, offsetMode will be { top: false, ... }
    offsetTop = typeof offsetTop === 'undefined' ? offset : offsetTop;
    const scrollTop = getScroll(targetNode, true);
    const affixNode = placeholderNodeRef.current;
    const elemOffset = getOffset(affixNode, targetNode);
    const elemSize = {
      width: fixedNode!.offsetWidth,
      height: fixedNode!.offsetHeight
    };

    const offsetMode = {
      top: false,
      bottom: false
    };
    // Default to `offsetTop=0`.
    if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
      offsetMode.top = true;
      offsetTop = 0;
    } else {
      offsetMode.top = typeof offsetTop === 'number';
      offsetMode.bottom = typeof offsetBottom === 'number';
    }

    const targetRect = getTargetRect(targetNode);
    const targetInnerHeight =
      (targetNode as Window).innerHeight || (targetNode as HTMLElement).clientHeight;
    if (scrollTop > elemOffset.top - (offsetTop as number) && offsetMode.top) {
      // Fixed Top
      const width = elemOffset.width;
      const top = targetRect.top + (offsetTop as number);
      setAffixStyle(e, {
        position: 'fixed',
        top,
        left: targetRect.left + elemOffset.left,
        width
      });
      setPlaceholderStyle({
        width,
        height: elemSize.height
      });
    } else if (
      scrollTop < elemOffset.top + elemSize.height + (offsetBottom as number) - targetInnerHeight &&
      offsetMode.bottom
    ) {
      // Fixed Bottom
      const targetBottomOffet = targetNode === window ? 0 : window.innerHeight - targetRect.bottom;
      const width = elemOffset.width;
      setAffixStyle(e, {
        position: 'fixed',
        bottom: targetBottomOffet + (offsetBottom as number),
        left: targetRect.left + elemOffset.left,
        width
      });
      setPlaceholderStyle({
        width,
        height: elemOffset.height
      });
    } else {
      if (
        e.type === 'resize' &&
        stateAffixStyle &&
        stateAffixStyle.position === 'fixed' &&
        affixNode.offsetWidth
      ) {
        setAffixStyle(e, { ...stateAffixStyle, width: affixNode.offsetWidth });
      } else {
        setAffixStyle(e, null);
      }
      setPlaceholderStyle(null);
    }

    if (e.type === 'resize') {
      syncPlaceholderStyle(e);
    }
  });

  const setTargetEventListeners = (getTarget: () => HTMLElement | Window | null) => {
    const target = getTarget();
    if (!target) {
      return;
    }
    clearEventListeners();

    events.forEach(eventName => {
      eventHandlers.current[eventName] = addEventListener(target, eventName, updatePosition);
    });
  };

  const clearEventListeners = () => {
    events.forEach(eventName => {
      const handler = eventHandlers.current[eventName];
      if (handler && handler.remove) {
        handler.remove();
      }
    });
  };

  const saveFixedNode = (node: HTMLDivElement) => {
    fixedNodeRef.current = node;
  };

  const savePlaceholderNode = (node: HTMLDivElement) => {
    placeholderNodeRef.current = node;
  };

  const className = classNames({
    [props.prefixCls || 'fishd-affix']: stateAffixStyle
  });

  const omitProps = omit(props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange']);
  const placeholderStyle = {
    ...statePlaceholderStyle,
    ...props.style
  };
  return (
    <div {...omitProps} style={placeholderStyle} ref={savePlaceholderNode}>
      <div className={className} ref={saveFixedNode} style={stateAffixStyle}>
        {props.children}
      </div>
    </div>
  );
};

export default Affix;
