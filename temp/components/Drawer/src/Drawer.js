import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {polyfill} from 'react-lifecycles-compat';

import {ContainerRender, getScrollBarSize} from '../../../utils';
import {
  dataToArray,
  transitionEnd,
  trnasitionStr,
  addEventListener,
  removeEventListener,
  transformArguments,
  isNumeric,
} from './utils';
import './Drawer.less';

const IS_REACT_16 = 'createPortal' in ReactDOM;

const currentDrawer = {};
const windowIsUndefined = typeof window === 'undefined';

class Drawer extends React.PureComponent {
  static defaultProps = {
    prefixCls: 'drawer',
    placement: 'left',
    getContainer: 'body',
    level: 'all',
    duration: '.3s',
    ease: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
    onChange: () => {},
    onMaskClick: () => {},
    onHandleClick: () => {},
    onCloseClick: () => {},
    handler: (
      <div className="drawer-handle">
        <i className="drawer-handle-icon"/>
      </div>
    ),
    closed: false,
    firstEnter: false,
    showMask: true,
    maskStyle: {},
    wrapperClassName: '',
    className: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {prevProps = {}} = prevState;
    const newState = {
      prevProps: nextProps,
    };
    if (nextProps.open !== undefined && nextProps.open !== prevProps.open) {
      return {
        ...newState,
        open: nextProps.open
      };
    }

    return newState;
  }

  constructor(props) {
    super(props);
    this.levelDom = [];
    this.contentDom = null;
    this.maskDom = null;
    this.handlerdom = null;
    this.mousePos = null;
    this.firstEnter = props.firstEnter;// 记录首次进入.
    this.timeout = null;
    this.drawerId = Number((Date.now() + Math.random()).toString()
      .replace('.', Math.round(Math.random() * 9))).toString(16);
    const open = props.open !== undefined ? props.open : !!props.defaultOpen;
    currentDrawer[this.drawerId] = open;
    this.state = {
      open,
      prevProps: props
    };
  }

  componentDidMount() {
    if (!windowIsUndefined) {
      let passiveSupported = false;
      window.addEventListener(
        'test',
        null,
        Object.defineProperty({}, 'passive', {
          get: () => {
            passiveSupported = true;
            return null;
          },
        })
      );
      this.passive = passiveSupported ? {passive: false} : false;
    }
    const open = this.getOpen();
    if (this.props.handler || open || this.firstEnter) {
      this.getDefault(this.props);
      if (open) {
        this.isOpenChange = true;
      }
      this.forceUpdate();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.open !== undefined && this.props.open !== prevProps.open) {
      this.isOpenChange = true;
      // 没渲染 dom 时，获取默认数据;
      if (!this.container) {
        this.getDefault(this.props);
      }
    }
    // dom 没渲染时，重走一遍。
    if (!this.firstEnter && this.container) {
      this.forceUpdate();
      this.firstEnter = true;
    }
    if (prevProps.placement !== this.props.placement) {
      // test 的 bug, 有动画过场，删除 dom
      this.contentDom = null;
    }
    if (this.props.level !== prevProps.level) {
      this.getParentAndLevelDom(this.props.level);
    }
  }

  componentWillUnmount() {
    delete currentDrawer[this.drawerId];
    delete this.isOpenChange;
    if (this.container) {
      if (this.state.open) {
        this.setLevelDomTransform(false, true);
      }
      document.body.style.overflow = '';
      // 拦不住。。直接删除；
      if (this.props.getContainer) {
        this.container.parentNode.removeChild(this.container);
      }
    }
    this.firstEnter = false;
    clearTimeout(this.timeout);
    // suppport react15
    // 需要 didmount 后也会渲染，直接 unmount 将不会渲染，加上判断.
    if (this.renderComponent && !IS_REACT_16) {
      this.renderComponent({
        afterClose: this.removeContainer,
        onClose() {
        },
        visible: false,
      });
    }
  }

  onMaskTouchEnd = e => {
    this.props.onMaskClick(e);
    this.onTouchEnd(e, true);
  };

  onIconTouchEnd = e => {
    this.props.onHandleClick(e);
    this.onTouchEnd(e);
  };
  onTouchEnd = (e, close) => {
    if (this.props.open !== undefined) {
      return;
    }
    const open = close || this.state.open;
    this.isOpenChange = true;
    this.setState({
      open: !open,
    });
  };

  handleOnClosed = (e) => {
    this.props.onCloseClick(e);
    this.onTouchEnd(e, true);
  };

  onWrapperTransitionEnd = (e) => {
    if (e.target === this.contentWrapper) {
      this.dom.style.transition = '';
      if (!this.state.open && this.getCrrentDrawerSome()) {
        document.body.style.overflowX = '';
        if (this.maskDom) {
          this.maskDom.style.left = '';
          this.maskDom.style.width = '';
        }
      }
    }
  };

  getDefault = props => {
    this.getParentAndLevelDom(props);
    if (props.getContainer || props.parent) {
      this.container = this.defaultGetContainer();
    }
  };

  getCrrentDrawerSome = () => !Object.keys(currentDrawer).some(key => currentDrawer[key]);

  getContainer = () => {
    return this.container;
  };
  getParentAndLevelDom = props => {
    if (windowIsUndefined) {
      return;
    }
    const {level, getContainer} = props;
    this.levelDom = [];
    if (getContainer) {
      if (typeof getContainer === 'string') {
        const dom = document.querySelectorAll(getContainer)[0];
        this.parent = dom;
      }
      if (typeof getContainer === 'function') {
        this.parent = getContainer();
      }
      if (typeof getContainer === 'object' && getContainer instanceof window.HTMLElement) {
        this.parent = getContainer;
      }
    }
    if (!getContainer && this.container) {
      this.parent = this.container.parentNode;
    }
    if (level === 'all') {
      const children = Array.prototype.slice.call(this.parent.children);
      children.forEach(child => {
        if (child.nodeName !== 'SCRIPT' && child.nodeName !== 'STYLE'
          && child.nodeName !== 'LINK' && child !== this.container) {
          this.levelDom.push(child);
        }
      });
    } else if (level) {
      dataToArray(level).forEach(key => {
        document.querySelectorAll(key).forEach(item => {
          this.levelDom.push(item);
        });
      });
    }
  };

  setLevelDomTransform = (open, openTransition, placementName, value) => {
    const {placement, levelMove, duration, ease, onChange, getContainer} = this.props;
    if (!windowIsUndefined) {
      this.levelDom.forEach(dom => {
        if (this.isOpenChange || openTransition) {
          /* eslint no-param-reassign: "error" */
          dom.style.transition = `transform ${duration} ${ease}`;
          addEventListener(dom, transitionEnd, this.trnasitionEnd);
          let levelValue = open ? value : 0;
          if (levelMove) {
            const $levelMove = transformArguments(levelMove, {target: dom, open});
            levelValue = open ? $levelMove[0] : $levelMove[1] || 0;
          }
          const $value = typeof levelValue === 'number' ? `${levelValue}px` : levelValue;
          const placementPos = placement === 'left' || placement === 'top' ? $value : `-${$value}`;
          dom.style.transform = levelValue ? `${placementName}(${placementPos})` : '';
          dom.style.msTransform = levelValue ? `${placementName}(${placementPos})` : '';
        }
      });
      // 处理 body 滚动
      if (getContainer === 'body') {
        const eventArray = ['touchstart'];
        const domArray = [document.body, this.maskDom, this.handlerdom, this.contentDom];
        const right = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) &&
        window.innerWidth > document.body.offsetWidth
          ? getScrollBarSize(1) : 0;
        let widthTransition = `width ${duration} ${ease}`;
        const trannsformTransition = `transform ${duration} ${ease}`;
        if (open && document.body.style.overflow !== 'hidden') {
          document.body.style.overflow = 'hidden';
          if (right) {
            document.body.style.position = 'relative';
            document.body.style.width = `calc(100% - ${right}px)`;
            this.dom.style.transition = 'none';
            switch (placement) {
              case 'right':
                this.dom.style.transform = `translateX(-${right}px)`;
                this.dom.style.msTransform = `translateX(-${right}px)`;
                break;
              case 'top':
              case 'bottom':
                this.dom.style.width = `calc(100% - ${right}px)`;
                this.dom.style.transform = 'translateZ(0)';
                break;
              default:
                break;
            }
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              this.dom.style.transition = `${trannsformTransition},${widthTransition}`;
              this.dom.style.width = '';
              this.dom.style.transform = '';
              this.dom.style.msTransform = '';
            });
          }
          // 手机禁滚
          domArray.forEach((item, i) => {
            if (!item) {
              return;
            }
            addEventListener(
              item,
              eventArray[i] || 'touchmove',
              i ? this.removeMoveHandler : this.removeStartHandler,
              this.passive
            );
          });
        } else if (this.getCrrentDrawerSome()) {
          document.body.style.overflow = '';
          if ((this.isOpenChange || openTransition) && right) {
            document.body.style.position = '';
            document.body.style.width = '';
            if (trnasitionStr) {
              document.body.style.overflowX = 'hidden';
            }
            this.dom.style.transition = 'none';
            let heightTransition;
            switch (placement) {
              case 'right': {
                this.dom.style.transform = `translateX(${right}px)`;
                this.dom.style.msTransform = `translateX(${right}px)`;
                this.dom.style.width = '100%';
                widthTransition = `width 0s ${ease} ${duration}`;
                if (this.maskDom) {
                  this.maskDom.style.left = `-${right}px`;
                  this.maskDom.style.width = `calc(100% + ${right}px)`;
                }
                break;
              }
              case 'top':
              case 'bottom': {
                this.dom.style.width = `calc(100% + ${right}px)`;
                this.dom.style.height = '100%';
                this.dom.style.transform = 'translateZ(0)';
                heightTransition = `height 0s ${ease} ${duration}`;
                break;
              }
              default:
                break;
            }
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              this.dom.style.transition = `${trannsformTransition},${
                heightTransition ? `${heightTransition},` : ''}${widthTransition}`;
              this.dom.style.transform = '';
              this.dom.style.msTransform = '';
              this.dom.style.width = '';
              this.dom.style.height = '';
            });
          }
          domArray.forEach((item, i) => {
            if (!item) {
              return;
            }
            removeEventListener(
              item,
              eventArray[i] || 'touchmove',
              i ? this.removeMoveHandler : this.removeStartHandler,
              this.passive
            );
          });
        }
      }
    }
    if (onChange && this.isOpenChange && this.firstEnter) {
      onChange(open);
      this.isOpenChange = false;
    }
  };

  getChildToRender = open => {
    const {
      className,
      prefixCls,
      style,
      placement,
      children,
      handler,
      showMask,
      maskStyle,
      width,
      height,
      closed
    } = this.props;
    const wrapperClassname = classnames(prefixCls, {
      [`${prefixCls}-${placement}`]: true,
      [`${prefixCls}-open`]: open,
      [className]: !!className,
    });
    const isOpenChange = this.isOpenChange;
    const isHorizontal = placement === 'left' || placement === 'right';
    const placementName = `translate${isHorizontal ? 'X' : 'Y'}`;
    // 百分比与像素动画不同步，第一次打用后全用像素动画。
    // const defaultValue = !this.contentDom || !level ? '100%' : `${value}px`;
    const placementPos =
      placement === 'left' || placement === 'top' ? '-100%' : '100%';
    const transform = open ? '' : `${placementName}(${placementPos})`;
    if (isOpenChange === undefined || isOpenChange) {
      const contentValue = this.contentDom ? this.contentDom.getBoundingClientRect()[
        isHorizontal ? 'width' : 'height'
        ] : 0;
      const value = (isHorizontal ? width : height) || contentValue;
      this.setLevelDomTransform(open, false, placementName, value);
    }
    const handlerCildren = handler && React.cloneElement(handler, {
      onClick: (e) => {
        if (handler.props.onClick) {
          handler.props.onClick();
        }
        this.onIconTouchEnd(e);
      },
      ref: (c) => {
        this.handlerdom = c;
      }
    });
    const closedElement = () => {
      return (
        <div className="drawer-close">
          <i className="drawer-close-icon"/>
        </div>
      );
    };
    const closedChildren = closed && this.state.open && React.cloneElement(closedElement(), {
      onClick: (e) => {
        this.handleOnClosed(e);
      }
    });
    // 当没有遮罩时，抽屉下面的内容需要可点击
    const noMaskWidth = () => {
      if (!showMask && open) {
        return {width: "0%"};
      }
      return {};
    };
    return (
      <div
        className={wrapperClassname}
        style={Object.assign({}, style, noMaskWidth())}
        ref={c => {
          this.dom = c;
        }}
        onTransitionEnd={this.onWrapperTransitionEnd}
      >
        {showMask && (
          <div
            className={`${prefixCls}-mask`}
            onClick={this.onMaskTouchEnd}
            style={maskStyle}
            ref={c => {
              this.maskDom = c;
            }}
          />
        )}
        <div
          className={`${prefixCls}-content-wrapper`}
          style={{
            transform,
            msTransform: transform,
            width: isNumeric(width) ? `${width}px` : width,
            height: isNumeric(height) ? `${height}px` : height,
          }}
          ref={c => {
            this.contentWrapper = c;
          }}
        >
          <div
            className={`${prefixCls}-content`}
            ref={c => {
              this.contentDom = c;
            }}
            onTouchStart={open ? this.removeStartHandler : null} // 跑用例用
            onTouchMove={open ? this.removeMoveHandler : null} // 跑用例用
          >
            {children}
          </div>
          {handlerCildren}
          {closedChildren}
        </div>
      </div>
    );
  };

  getOpen = () => (
    this.props.open !== undefined ? this.props.open : this.state.open
  );

  getTouchParentScroll = (root, currentTarget, differX, differY) => {
    /**
     * 增加 rect。
     * 当父级 dom 的 overflow 未开启滚动时，scrollLeft 或 scrollTop 为 0, 而 scrollWidth 增加了，
     * 父级是跟随子级的 rect, 直到父级设定了滚动.
     */
    const rect = currentTarget.getBoundingClientRect();
    if (!currentTarget) {
      return false;
    } else if (
      (((currentTarget.scrollTop + currentTarget.offsetHeight + currentTarget.offsetTop
        >= currentTarget.scrollHeight + rect.top &&
        differY < 0) ||
        (currentTarget.scrollTop <= 0 && differY > 0)) &&
        Math.max(Math.abs(differX), Math.abs(differY)) === Math.abs(differY)) ||
      (((currentTarget.scrollLeft + currentTarget.offsetWidth + currentTarget.offsetLeft
        >= currentTarget.scrollWidth + rect.left &&
        differX < 0) ||
        (currentTarget.scrollLeft <= 0 && differX > 0)) &&
        Math.max(Math.abs(differX), Math.abs(differY)) === Math.abs(differX))
    ) {
      return root === currentTarget ||
        this.getTouchParentScroll(root, currentTarget.parentNode, differX, differY);
    }
    return false;
  };

  removeStartHandler = e => {
    if (e.touches.length > 1) {
      return;
    }
    this.startPos = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  removeMoveHandler = e => {
    if (e.changedTouches.length > 1) {
      return;
    }
    const currentTarget = e.currentTarget;
    const differX = e.changedTouches[0].clientX - this.startPos.x;
    const differY = e.changedTouches[0].clientY - this.startPos.y;
    if (
      currentTarget === this.maskDom ||
      currentTarget === this.handlerdom ||
      currentTarget === this.contentDom &&
      this.getTouchParentScroll(currentTarget, e.target, differX, differY)
    ) {
      e.preventDefault();
    }
  };

  trnasitionEnd = e => {
    removeEventListener(e.target, transitionEnd, this.trnasitionEnd);
    e.target.style.transition = '';
  };

  defaultGetContainer = () => {
    if (windowIsUndefined) {
      return null;
    }
    const container = document.createElement('div');
    this.parent.appendChild(container);
    if (this.props.wrapperClassName) {
      container.className = this.props.wrapperClassName;
    }
    return container;
  };

  render() {
    const {getContainer, wrapperClassName} = this.props;
    const open = this.getOpen();
    currentDrawer[this.drawerId] = open ? this.container : open;
    const children = this.getChildToRender(this.firstEnter ? open : false);
    if (!getContainer) {
      return (
        <div
          className={wrapperClassName}
          ref={c => {
            this.container = c;
          }}
        >
          {children}
        </div>
      );
    }
    if (!this.container || !open && !this.firstEnter) {
      return null;
    }
    // suppport react15
    if (!IS_REACT_16) {
      return (
        <ContainerRender
          parent={this}
          visible
          autoMount
          autoDestroy={false}
          getComponent={() => children}
          getContainer={this.getContainer}
        >
          {({renderComponent, removeContainer}) => {
            this.renderComponent = renderComponent;
            this.removeContainer = removeContainer;
            return null;
          }}
        </ContainerRender>
      );
    }
    return ReactDOM.createPortal(children, this.container);
  }
}

Drawer.propTypes = {
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultOpen: PropTypes.bool,
  firstEnter: PropTypes.bool,
  open: PropTypes.bool,
  prefixCls: PropTypes.string,
  placement: PropTypes.string,
  level: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  levelMove: PropTypes.oneOfType([PropTypes.number, PropTypes.func, PropTypes.array]),
  ease: PropTypes.string,
  duration: PropTypes.string,
  getContainer: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object, PropTypes.bool]),
  handler: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  onChange: PropTypes.func,
  onMaskClick: PropTypes.func,
  onHandleClick: PropTypes.func,
  onCloseClick: PropTypes.func,
  showMask: PropTypes.bool,
  maskStyle: PropTypes.object,
  closed: PropTypes.bool
};

polyfill(Drawer);

export default Drawer;
