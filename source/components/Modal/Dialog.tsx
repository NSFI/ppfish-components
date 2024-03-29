import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import Draggable from 'react-draggable';
import classNames from 'classnames';
import Icon from '../Icon';
import { contains, getScrollBarSize, KeyCode } from '../../utils/index';
import IDialogPropTypes from './IDialogPropTypes';
import LazyRenderBox from './LazyRenderBox';

let uuid = 0;
let openCount = 0;

/* eslint react/no-is-mounted:0 */

function getScroll(w: any, top?: boolean) {
  let ret = w[`page${top ? 'Y' : 'X'}Offset`];
  const method = `scroll${top ? 'Top' : 'Left'}`;
  if (typeof ret !== 'number') {
    const d = w.document;
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      ret = d.body[method];
    }
  }
  return ret;
}

function setTransformOrigin(node: any, value: string) {
  const style = node.style;
  ['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix: string) => {
    style[`${prefix}TransformOrigin`] = value;
  });
  style[`transformOrigin`] = value;
}

function offset(el: any) {
  const rect = el.getBoundingClientRect();
  const pos = {
    left: rect.left,
    top: rect.top,
  };
  const doc = el.ownerDocument;
  const w = doc.defaultView || doc.parentWindow;
  pos.left += getScroll(w);
  pos.top += getScroll(w, true);
  return pos;
}

export default class Dialog extends React.Component<IDialogPropTypes, any> {
  static defaultProps = {
    className: '',
    mask: true,
    visible: false,
    esc: true,
    closable: true,
    maskClosable: true,
    destroyOnClose: false,
    draggable: false,
    prefixCls: 'rc-dialog',
  };

  private inTransition: boolean;

  private titleId: string;

  private openTime: number;

  private lastOutSideFocusNode: HTMLElement | null;

  private wrap: HTMLElement | null;

  private dialog: any;

  private header: any;

  private body: any;

  private footer: any;

  private sentinel: HTMLElement | null;

  private bodyIsOverflowing: boolean;

  private scrollbarWidth: number;

  constructor(props: IDialogPropTypes) {
    super(props);
    if ('keyboard' in props) {
      throw new Error(`API 'keyboard' is deprecated. Use 'esc' instead.`);
    }
    this.inTransition = false;
    this.titleId = `rcDialogTitle${uuid++}`;
  }

  componentDidMount() {
    this.componentDidUpdate({});
    if (this.body) {
      this.body.style.maxHeight = `calc(100vh - ${this.getBodyMaxHeight()}px)`;
    }
  }

  componentDidUpdate(prevProps: IDialogPropTypes) {
    const props = this.props;
    const mousePosition = this.props.mousePosition;
    if (props.visible) {
      // first show
      if (!prevProps.visible) {
        this.openTime = Date.now();
        this.addScrollingEffect();
        this.tryFocus();
        const dialogNode = ReactDOM.findDOMNode(this.dialog);
        if (mousePosition) {
          const elOffset = offset(dialogNode);
          setTransformOrigin(
            dialogNode,
            `${mousePosition.x - elOffset.left}px ${mousePosition.y - elOffset.top}px`,
          );
        } else {
          setTransformOrigin(dialogNode, '');
        }
      }
    } else if (prevProps.visible) {
      this.inTransition = true;
      if (props.mask && this.lastOutSideFocusNode) {
        try {
          this.lastOutSideFocusNode.focus();
        } catch (e) {
          this.lastOutSideFocusNode = null;
        }
        this.lastOutSideFocusNode = null;
      }
    }
  }

  componentWillUnmount() {
    if (this.props.visible || this.inTransition) {
      this.removeScrollingEffect();
    }
  }

  tryFocus() {
    if (!contains(this.wrap, document.activeElement)) {
      this.lastOutSideFocusNode = document.activeElement as HTMLElement;
      this.wrap.focus();
    }
  }

  getBodyMaxHeight = () => {
    const dialog = ReactDOM.findDOMNode(this.dialog) as HTMLElement;
    const offsetTop = Math.max(0, parseInt(getComputedStyle(dialog).top));
    let difference = 2 * offsetTop;
    if (this.header) difference += this.header.offsetHeight;
    if (this.footer) difference += this.footer.offsetHeight;
    return difference;
  };

  onAnimateLeave = () => {
    const { afterClose } = this.props;
    // need demo?
    // https://github.com/react-component/dialog/pull/28
    if (this.wrap) {
      this.wrap.style.display = 'none';
    }
    this.inTransition = false;
    this.removeScrollingEffect();
    if (afterClose) {
      afterClose();
    }
  };

  onMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // android trigger click on open (fastclick??)
    if (Date.now() - this.openTime < 300) {
      return;
    }
    if (e.target === e.currentTarget) {
      this.close(e);
    }
  };

  onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const props = this.props;
    if (props.esc && e.keyCode === KeyCode.ESC) {
      this.close(e);
    }
    // keep focus inside dialog
    if (props.visible) {
      if (e.keyCode === KeyCode.TAB) {
        const activeElement = document.activeElement;
        const dialogRoot = this.wrap;
        if (e.shiftKey) {
          if (activeElement === dialogRoot) {
            this.sentinel.focus();
          }
        } else if (activeElement === this.sentinel) {
          dialogRoot.focus();
        }
      }
    }
  };

  getDialogElement = () => {
    const props = this.props;
    const closable = props.closable;
    const prefixCls = props.prefixCls;
    const dest: any = {};
    if (props.width !== undefined) {
      dest.width = props.width;
    }
    if (props.height !== undefined) {
      dest.height = props.height;
    }

    let footer;
    if (props.footer) {
      footer = (
        <div className={`${prefixCls}-footer`} ref={this.saveRef('footer')}>
          {props.footer}
        </div>
      );
    }

    let header;
    if (props.title) {
      header = (
        <div className={`${prefixCls}-header`} ref={this.saveRef('header')}>
          <div className={`${prefixCls}-title`} id={this.titleId}>
            {props.title}
          </div>
        </div>
      );
    }

    let closer;
    if (closable) {
      closer = (
        <button onClick={this.close} aria-label="Close" className={`${prefixCls}-close`}>
          <Icon type="close-modal-line" />
        </button>
      );
    }

    const style = { ...props.style, ...dest };
    const transitionName = props.transitionName;
    const dialog = (
      <div
        className={classNames(`${prefixCls}-dialog`, {
          draggable: props.draggable,
        })}
      >
        <div className={`${prefixCls}-content`}>
          {closer}
          {header}
          <div
            className={`${prefixCls}-body`}
            style={props.bodyStyle}
            ref={this.saveRef('body')}
            {...props.bodyProps}
          >
            {props.children}
          </div>
          {footer}
        </div>
        <div
          tabIndex={0}
          ref={this.saveRef('sentinel')}
          style={{ width: 0, height: 0, overflow: 'hidden' }}
        >
          sentinel
        </div>
      </div>
    );
    const dialogElement = (
      <LazyRenderBox
        key="dialog-element"
        role="document"
        ref={this.saveRef('dialog')}
        style={style}
        className={`${prefixCls} ${props.className || ''}`}
        visible={props.visible}
      >
        {props.draggable ? <Draggable>{dialog}</Draggable> : dialog}
      </LazyRenderBox>
    );
    return (
      <Animate
        key="dialog"
        showProp="visible"
        onLeave={this.onAnimateLeave}
        transitionName={transitionName}
        component=""
        visible={props.visible}
        transitionAppear
      >
        {props.visible || !props.destroyOnClose ? dialogElement : null}
      </Animate>
    );
  };

  getZIndexStyle = () => {
    const style: any = {};
    const props = this.props;
    if (props.zIndex !== undefined) {
      style.zIndex = props.zIndex;
    }
    return style;
  };

  getWrapStyle = (): any => {
    return { ...this.getZIndexStyle(), ...this.props.wrapStyle };
  };

  getMaskStyle = () => {
    return { ...this.getZIndexStyle(), ...this.props.maskStyle };
  };

  getMaskElement = () => {
    const props = this.props;
    let maskElement;
    if (props.mask) {
      const maskTransition = props.maskTransitionName;
      maskElement = (
        <LazyRenderBox
          style={this.getMaskStyle()}
          key="mask"
          className={`${props.prefixCls}-mask`}
          hiddenClassName={`${props.prefixCls}-mask-hidden`}
          visible={props.visible}
          {...props.maskProps}
        />
      );
      if (maskTransition) {
        maskElement = (
          <Animate
            key="mask"
            showProp="visible"
            transitionAppear
            component=""
            transitionName={maskTransition}
          >
            {maskElement}
          </Animate>
        );
      }
    }
    return maskElement;
  };

  setScrollbar = () => {
    if (this.bodyIsOverflowing && this.scrollbarWidth !== undefined) {
      document.body.style.paddingRight = `${this.scrollbarWidth}px`;
    }
  };

  addScrollingEffect = () => {
    openCount++;
    if (openCount !== 1) {
      return;
    }
    this.checkScrollbar();
    this.setScrollbar();
    document.body.style.overflow = 'hidden';
    // this.adjustDialog();
  };

  removeScrollingEffect = () => {
    openCount--;
    if (openCount !== 0) {
      return;
    }
    document.body.style.overflow = '';
    this.resetScrollbar();
    // this.resetAdjustments();
  };

  close = (e: any) => {
    const { onClose } = this.props;
    if (onClose) {
      onClose(e);
    }
  };

  checkScrollbar = () => {
    let fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
      // workaround for missing window.innerWidth in IE8
      const documentElementRect = document.documentElement.getBoundingClientRect();
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
    if (this.bodyIsOverflowing) {
      this.scrollbarWidth = getScrollBarSize();
    }
  };

  resetScrollbar = () => {
    document.body.style.paddingRight = '';
  };

  adjustDialog = () => {
    if (this.wrap && this.scrollbarWidth !== undefined) {
      const modalIsOverflowing = this.wrap.scrollHeight > document.documentElement.clientHeight;
      this.wrap.style.paddingLeft = `${
        !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : ''
      }px`;
      this.wrap.style.paddingRight = `${
        this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
      }px`;
    }
  };

  resetAdjustments = () => {
    if (this.wrap) {
      this.wrap.style.paddingLeft = this.wrap.style.paddingLeft = '';
    }
  };

  saveRef = (name: string) => (node: any) => {
    (this as any)[name] = node;
  };

  render() {
    const { props } = this;
    const { prefixCls, maskClosable } = props;
    const style = this.getWrapStyle();
    // clear hide display
    // and only set display after async anim, not here for hide
    if (props.visible) {
      style.display = null;
    }
    return (
      <div>
        {this.getMaskElement()}
        <div
          tabIndex={-1}
          onKeyDown={this.onKeyDown}
          className={`${prefixCls}-wrap ${props.wrapClassName || ''}`}
          ref={this.saveRef('wrap')}
          onClick={maskClosable ? this.onMaskClick : undefined}
          role="dialog"
          aria-labelledby={props.title ? this.titleId : null}
          style={style}
          {...props.wrapProps}
        >
          {this.getDialogElement()}
        </div>
      </div>
    );
  }
}
