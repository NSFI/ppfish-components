/* eslint-disable react/no-find-dom-node */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { addEventListener } from '../../utils';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import omit from 'omit.js';
import { throttleByAnimationFrameDecorator } from '../../utils/throttleByAnimationFrame';

interface ClientRect {
  bottom: number;
  readonly height: number;
  left: number;
  right: number;
  top: number;
  readonly width: number;
}

//获取target在屏幕上的绝对定位
function getTargetRect(target: HTMLElement | Window | null): ClientRect {
  return target !== window
    ? (target as HTMLElement).getBoundingClientRect()
    : ({ top: 0, left: 0, bottom: 0 } as ClientRect);
}

//获取target的滚动距离
function getScroll(target: any, top: boolean): number {
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
    height: elemRect.height,
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

export default class Affix extends React.Component<AffixProps, AffixState> {
  static propTypes = {
    offsetTop: PropTypes.number,
    offsetBottom: PropTypes.number,
    target: PropTypes.func,
  };

  scrollEvent: any;
  resizeEvent: any;
  timeout: any;

  events = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'];

  eventHandlers: {
    [key: string]: any;
  } = {};

  state: AffixState = {
    affixStyle: undefined,
    placeholderStyle: undefined,
  };

  private fixedNode?: HTMLElement | null;
  private placeholderNode?: HTMLElement | null;

  //设置fixed的元素的样式
  setAffixStyle(e: any, affixStyle: React.CSSProperties | null) {
    const { onChange = noop, target = getDefaultTarget } = this.props;
    const originalAffixStyle = this.state.affixStyle;
    const isWindow = target() === window;
    if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
      return;
    }
    if (shallowequal(affixStyle, originalAffixStyle)) {
      return;
    }
    this.setState({ affixStyle: affixStyle as React.CSSProperties }, () => {
      const affixed = !!this.state.affixStyle;
      if ((affixStyle && !originalAffixStyle) || (!affixStyle && originalAffixStyle)) {
        onChange(affixed);
      }
    });
  }

  //设置占位元素的样式
  setPlaceholderStyle(placeholderStyle: React.CSSProperties | null) {
    const originalPlaceholderStyle = this.state.placeholderStyle;
    if (shallowequal(placeholderStyle, originalPlaceholderStyle)) {
      return;
    }
    this.setState({
      placeholderStyle: placeholderStyle as React.CSSProperties,
    });
  }

  //同步占位元素的样式
  syncPlaceholderStyle(e: any) {
    const { affixStyle } = this.state;
    if (!affixStyle) {
      return;
    }
    this.placeholderNode!.style.cssText = '';
    this.setAffixStyle(e, {
      ...affixStyle,
      width: this.placeholderNode!.offsetWidth,
    });
    this.setPlaceholderStyle({
      width: this.placeholderNode!.offsetWidth,
    });
  }

  //滚动以及window.resize监听处理方法
  @throttleByAnimationFrameDecorator()
  updatePosition(e: any) {
    let { offsetTop } = this.props;
    const { offsetBottom, offset, target = getDefaultTarget } = this.props;
    const targetNode = target();

    // Backwards support
    // Fix: if offsetTop === 0, it will get undefined,
    //   if offsetBottom is type of number, offsetMode will be { top: false, ... }
    offsetTop = typeof offsetTop === 'undefined' ? offset : offsetTop;
    const scrollTop = getScroll(targetNode, true);
    const affixNode = ReactDOM.findDOMNode(this) as HTMLElement;
    const elemOffset = getOffset(affixNode, targetNode);
    const elemSize = {
      width: this.fixedNode!.offsetWidth,
      height: this.fixedNode!.offsetHeight,
    };

    const offsetMode = {
      top: false,
      bottom: false,
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
      this.setAffixStyle(e, {
        position: 'fixed',
        top,
        left: targetRect.left + elemOffset.left,
        width,
      });
      this.setPlaceholderStyle({
        width,
        height: elemSize.height,
      });
    } else if (
      scrollTop < elemOffset.top + elemSize.height + (offsetBottom as number) - targetInnerHeight &&
      offsetMode.bottom
    ) {
      // Fixed Bottom
      const targetBottomOffet = targetNode === window ? 0 : window.innerHeight - targetRect.bottom;
      const width = elemOffset.width;
      this.setAffixStyle(e, {
        position: 'fixed',
        bottom: targetBottomOffet + (offsetBottom as number),
        left: targetRect.left + elemOffset.left,
        width,
      });
      this.setPlaceholderStyle({
        width,
        height: elemOffset.height,
      });
    } else {
      const { affixStyle } = this.state;
      if (
        e.type === 'resize' &&
        affixStyle &&
        affixStyle.position === 'fixed' &&
        affixNode.offsetWidth
      ) {
        this.setAffixStyle(e, { ...affixStyle, width: affixNode.offsetWidth });
      } else {
        this.setAffixStyle(e, null);
      }
      this.setPlaceholderStyle(null);
    }

    if (e.type === 'resize') {
      this.syncPlaceholderStyle(e);
    }
  }

  componentDidMount() {
    const target = this.props.target || getDefaultTarget;
    // Wait for parent component ref has its value
    this.timeout = setTimeout(() => {
      this.setTargetEventListeners(target);
    });
  }

  componentDidUpdate(prevProps: AffixProps) {
    if (this.props.target !== prevProps.target) {
      this.clearEventListeners();
      this.setTargetEventListeners(this.props.target!);

      // Mock Event object.
      this.updatePosition({});
    }
    if (
      this.props.offsetTop !== prevProps.offsetTop ||
      this.props.offsetBottom !== prevProps.offsetBottom
    ) {
      this.updatePosition({});
    }
  }

  componentWillUnmount() {
    this.clearEventListeners();
    clearTimeout(this.timeout);
    (this.updatePosition as any).cancel();
  }

  setTargetEventListeners(getTarget: () => HTMLElement | Window | null) {
    const target = getTarget();
    if (!target) {
      return;
    }
    this.clearEventListeners();

    this.events.forEach(eventName => {
      this.eventHandlers[eventName] = addEventListener(target, eventName, this.updatePosition);
    });
  }

  clearEventListeners() {
    this.events.forEach(eventName => {
      const handler = this.eventHandlers[eventName];
      if (handler && handler.remove) {
        handler.remove();
      }
    });
  }

  saveFixedNode = (node: HTMLDivElement) => {
    this.fixedNode = node;
  };

  savePlaceholderNode = (node: HTMLDivElement) => {
    this.placeholderNode = node;
  };

  render() {
    const className = classNames({
      [this.props.prefixCls || 'fishd-affix']: this.state.affixStyle,
    });

    const props = omit(this.props, [
      'prefixCls',
      'offsetTop',
      'offsetBottom',
      'target',
      'onChange',
    ]);
    const placeholderStyle = {
      ...this.state.placeholderStyle,
      ...this.props.style,
    };
    return (
      <div {...props} style={placeholderStyle} ref={this.savePlaceholderNode}>
        <div className={className} ref={this.saveFixedNode} style={this.state.affixStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
