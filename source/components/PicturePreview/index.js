import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animate from 'rc-animate';
import {polyfill} from 'react-lifecycles-compat';
import Icon from '../Icon/index.tsx';
import {
  fullscreen,
  exitfullscreen,
  KeyCode,
  getStyle
} from '../../utils';
import './style/index.less';

let conMaxWidth = 1024, conMaxHeight = 768;
const CON_MAX_WIDTH = conMaxWidth > window.innerWidth ? window.innerWidth : conMaxWidth, //容器最大宽度
  CON_MIN_WIDTH = 360, //容器最小宽度
  CON_MAX_HEIGHT = conMaxHeight > window.innerHeight ? window.innerHeight : conMaxHeight, //容器最大高度
  CON_MIN_HEIGHT = 360, //容器最小高度
  MAX_RATIO = 2, //最大的图片显示比例
  MIN_RATIO = 0.1, //最小的图片显示比例
  STEP_RATIO = 0.1, //图片缩放比例步长
  DEFAULT_RATIO = 0.8; //默认的图片显示比例

function num2px(num) {
  return parseInt(num, 10) + 'px';
}

function px2num(str) {
  return Number(str.replace('px', '')) || 0;
}

/**
 * el1元素的区域是否超过el2元素
 * @param  {[type]}  el1 [description]
 * @param  {[type]}  el2 [description]
 * @return {Boolean}     [description]
 */
function isLargger(el1, el2) {
  return el1.clientHeight > el2.clientHeight || el1.clientWidth > el2.clientWidth;
}

const setStyle = (el, css) => {
  for (let key in css) {
    el.style[key] = css[key];
  }
};

const getImageSize = function(image, callback, scope) {
  let newImage;
  if (!image.src) {
    callback.call(scope, 0, 0);
  } else if (image.naturalWidth) {    // 现代浏览器
    callback.call(scope, image.naturalWidth, image.naturalHeight);
  } else {    // 低版本浏览器
    newImage = document.createElement('img');
    newImage.onload = function() {
      callback.call(scope, this.width, this.height);
    };
    newImage.src = image.src;
  }
};

class PicturePreview extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    toolbar: PropTypes.bool,
    source: PropTypes.array,
    draggable: PropTypes.bool,
    esc: PropTypes.bool,
    mask: PropTypes.bool,
    progress: PropTypes.bool,
    visible: PropTypes.bool,
    activeIndex: PropTypes.number,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    prefixCls: 'fishd-picturepreview',
    toolbar: false,
    source: [], // [{name: '', src: ''}]
    draggable: false,
    esc: true,
    mask: true,
    progress: false,
    visible: false,
    activeIndex: 0,
    onClose: () => {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      current, imgs,
      lastActiveIndex,
      lastVisible
    } = prevState;
    const {
      activeIndex,
      visible,
      source,
      children
    } = nextProps;
    let newState = {};

    if (visible !== lastVisible) {
      newState['show'] = newState['lastVisible'] = visible;
    }

    if (visible) {
      if (activeIndex !== lastActiveIndex) {
        newState['current'] = newState['lastActiveIndex'] = activeIndex;
      } else {
        newState['current'] = current;
      }

      if (source && source.length) {
        let sourceStr = JSON.stringify(source);
        if (sourceStr !== JSON.stringify(imgs)) {
          newState['imgs'] = JSON.parse(sourceStr);
        }
      } else if (children) {
        let imgList = [];

        imgList = React.Children.map(children, (child) => {
          let img = {};

          if (child.type === 'img') {
            img.name = child.props.name || child.props.alt;
            img.src = child.props.src;
          }

          return img;
        }).filter((item) => item);

        newState['imgs'] = imgList;
      }
    }

    return newState;
  }

  constructor(props) {
    super(props);

    if ('keyboard' in this.props) {
      throw new Error(`API 'keyboard' is deprecated. Use 'esc' instead.`);
    }

    this.imgEl = null;
    this.downloadImgUrl = null;
    this.moving = ''; //'img'表示正在移动图片 'con'表示正在移动容器 ''表示没有移动
    this.state = {
      lastActiveIndex: props.activeIndex || 0,  // 初始展示的图片的index
      current: props.activeIndex || 0,          // 当前浏览的图片的index
      lastVisible: props.visible || false,      // 初始显示/隐藏状态
      show: props.visible || false,
      imgs: props.source || [],
      container: {
        style: null,
        isFull: false //是否全屏
      },
      image: {
        el: null,
        ratio: 0 //图片的缩放比例
      },
      shown: false, //标记是否显示过，第一次显示时居中显示
    };

    this.bodyDefaultOverflow = document.body.style.overflow;
  }

  componentDidMount() {
    const { draggable, toolbar, mask } = this.props;

    document.body.appendChild(mask ? this.$root : this.$el);
    this.setContainerStyle();

    if (toolbar && this.$el) {
      // 监听全屏事件
      this.$el.addEventListener("fullscreenchange", this.handleFullChange);
      this.$el.addEventListener("mozfullscreenchange", this.handleFullChange);
      this.$el.addEventListener("webkitfullscreenchange", this.handleFullChange);
    }

    if (draggable) {
      // 监听拖动事件
      document.addEventListener("mousemove", this.handleMouseMove);
      document.addEventListener("mouseup", this.handleMouseUp);
    }

    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let { current } = this.state;

    if (snapshot) {
      document.body.style.overflow = snapshot;
    }

    if (prevState.current != current) {
      this.setContainerStyle();
    }
  }

  componentWillUnmount() {
    const { draggable, mask } = this.props;
    let el = mask ? this.$root : this.$el;

    if (el && el.parentNode === document.body) {
      document.body.removeChild(el);
    }

    if (draggable) {
      document.removeEventListener("mousemove", this.handleMouseMove);
      document.removeEventListener("mouseup", this.handleMouseUp);
    }

    document.removeEventListener("keydown", this.handleKeyDown);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    let { mask, visible } = this.props;

    // 从隐藏状态到展示状态时重新设置容器的样式
    if (visible && !prevProps.visible) {
      this.setContainerStyle();
    }

    if (mask) {
      return visible ? 'hidden' : this.bodyDefaultOverflow;
    }

    return null;
  }

  /**
   * 切换图片时，根据图片大小确定容器的尺寸及位置
   */
  setContainerStyle = () => {
    if (!this.imgEl) return;

    getImageSize(this.imgEl, (naturalWidth, naturalHeight) => {
      let width, height, imgRatio;

      if (naturalWidth == 0 || naturalHeight == 0) {
        width = CON_MIN_WIDTH;
        height = CON_MIN_HEIGHT;
        imgRatio = 0;
      } else {
        //计算容器的宽度
        width = naturalWidth * DEFAULT_RATIO; //默认0.8倍显示图片
        if (width > CON_MAX_WIDTH) {
          width = CON_MAX_WIDTH;
        } else if (width < CON_MIN_WIDTH) {
          width = CON_MIN_WIDTH;
        }

        //计算图片的缩放比例
        imgRatio = (naturalWidth && (width / naturalWidth)) || 0;

        //计算容器的高度
        height = naturalHeight * imgRatio;
        if (height > CON_MAX_HEIGHT) {
          height = CON_MAX_HEIGHT;
        } else if (height < CON_MIN_HEIGHT) {
          height = CON_MIN_HEIGHT;
        }
      }

      let css = '';
      if (!this.state.shown) {
        css = {
          width: num2px(width),
          height: num2px(height),
          left: num2px((window.innerWidth - width) / 2),
          top: num2px((window.innerHeight - height) / 2)
        };

        if (!this.props.mask) {
          css.left = num2px((window.innerWidth - width) / 2 + window.pageXOffset);
          css.top = num2px((window.innerHeight - height) / 2 + window.pageYOffset);
        }

        this.setState({
          container: {
            style: css,
            isFull: this.state.container.isFull
          }
        });
      } else if (!this.state.container.isFull) {
        let oriTop = px2num(getStyle(this.$el, 'top')),
          oriLeft = px2num(getStyle(this.$el, 'left')),
          oriWidth = px2num(getStyle(this.$el, 'width')),
          oriHeight = px2num(getStyle(this.$el, 'height'));
        css = {
          width: num2px(width),
          height: num2px(height),
          left: num2px(oriLeft + (oriWidth - width) / 2),
          top: num2px(oriTop + (oriHeight - height) / 2)
        };

        this.setState({
          container: {
            style: css,
            isFull: this.state.container.isFull
          }
        });
      }

      this.setState({
        image: Object.assign({}, this.state.image, {
          naturalWidth: naturalWidth,
          naturalHeight: naturalHeight,
          ratio: imgRatio
        })
      }, () => {
        //待视图更新后再缩放，需要用到con的尺寸
        this.handleZoom(imgRatio);
      });
    });
  };

  isFullEnabled = () => {
    return (
      document.fullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.msFullscreenEnabled
    );
  };

  isOne2One = () => {
    return Math.round(this.state.image.ratio * 100) === 100;
  };

  handleClose = () => {
    const { onClose, mask } = this.props;

    this.state.container.isFull && exitfullscreen();
    this.setState({
      show: false,
      shown: false,
    }, () => {
      if (mask) {
        document.body.style.overflow = this.bodyDefaultOverflow;
      }

      if (onClose && typeof onClose == "function") {
        onClose();
      }
    });
  };

  handlePrev = () => {
    let { current, imgs } = this.state;
    this.setState({
      current: current <= 0 ? (imgs.length - 1) : (current - 1),
      shown: true
    }, () => {
      this.setContainerStyle();
    });
  };

  handleNext = () => {
    let { current, imgs } = this.state;
    this.setState({
      current: current >= (imgs.length - 1) ? 0 : (current + 1),
      shown: true
    }, () => {
      this.setContainerStyle();
    });
  };

  handleZoom = (ratio) => {
    let image = {};

    //已经是1:1的情况下，不处理
    if (ratio === 1 && this.isOne2One()) return;

    //缩放比例限定范围在0.1和5之间
    ratio = Math.min(ratio, MAX_RATIO);
    ratio = Math.max(ratio, MIN_RATIO);

    image.ratio = ratio;

    let width = this.state.image.naturalWidth * ratio,
      height = this.state.image.naturalHeight * ratio;

    image.marginL = (this.$el.clientWidth - width) / 2;
    image.marginT = (this.$el.clientHeight - height) / 2;

    this.setState({
      image: Object.assign({}, this.state.image, image)
    }, () => {
      setStyle(this.imgEl, {
        'margin-left': num2px(image.marginL),
        'margin-top': num2px(image.marginT),
        width: num2px(width),
        height: num2px(height)
      });
    });
  };

  handleSwitchFull = () => {
    if (!this.isFullEnabled()) return;

    this.state.container.isFull ? exitfullscreen() : fullscreen(this.$el);
  };

  handleRotate = () => {
    if (!this.imgEl) return;

    let old = this.imgEl.rotateValue || 0,
      rotate = old + 90,
      transform = 'rotate(' + rotate + 'deg)';

    this.imgEl.rotateValue = rotate;

    setStyle(this.imgEl, {
      '-webkit-ransform': transform,
      '-ms-transform': transform,
      'transform': transform
    });
  };

  handleSave = () => {
    if (!(this.imgEl && this.imgEl.src)) return;

    let getBlobImage = (img) => {
      let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        });
      });
    };

    let img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      let promise = getBlobImage(img);
      promise.then((blob) => {
        let dLink = document.createElement('a');
        dLink.download = this.imgEl.alt || '';
        this.downloadImgUrl = window.URL.createObjectURL(blob);
        dLink.href = this.downloadImgUrl;
        dLink.onclick = () => {
          window.requestAnimationFrame(() => {
            window.URL.revokeObjectURL(this.downloadImgUrl);
            this.downloadImgUrl = null;
          });
        };
        dLink.click();
      });
    };
    // 在URL后添加随机数以避免浏览器缓存，使crossOrigin生效
    img.src = this.imgEl.src + '?' + +new Date();
  };

  handleFullChange = (e) => {
    let con = this.state.container;

    if (con.isFull) {
      //从全屏退出到非全屏时，认为是没有显示过，让图片居中显示
      this.setState({
        shown: false
      }, () => {
        this.setContainerStyle();
        this.setState({
          shown: true
        });
      });
    } else {
      con.style = {
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
      };
      //等视图更新后，再缩放，要用到con的尺寸
      this.setState({
        container: con
      }, () => this.handleZoom(this.state.image.ratio));
    }

    this.setState({
      container: {
        style: this.state.container.style,
        isFull: !con.isFull
      }
    });
  };

  handleMouseDown = (e) => {
    if (!this.state.show) return;
    e.preventDefault();

    let con = {},
      image = {},
      tar = e.target;

    if (tar === this.imgEl && (this.state.container.isFull || isLargger(this.imgEl, this.$el))) {
      //点击在图片上，并且是全屏模式或者图片比容器大，此时移动图片
      image.startX = e.pageX;
      image.startY = e.pageY;
      image.marginL = px2num(getStyle(this.imgEl, 'margin-left'));
      image.marginT = px2num(getStyle(this.imgEl, 'margin-top'));

      this.moving = 'img';
      this.setState({
        image: Object.assign({}, this.state.image, image)
      });
    } else if (!this.state.container.isFull) {
      //非全屏模式下，移动容器
      let elPos = this.$el.getBoundingClientRect();

      if (this.props.mask) {
        con.rect = {
          left: elPos.left,
          top: elPos.top,
        };
      } else {
        con.rect = {
          left: elPos.left + window.pageXOffset,
          top: elPos.top + window.pageYOffset,
        };
      }

      con.startX = e.pageX;
      con.startY = e.pageY;

      this.moving = 'con';
      this.setState({
        container: Object.assign({}, this.state.container, con)
      });
    }
  };

  handleMouseMove = (e) => {
    if (!this.moving || !this.state.show) return;
    e.preventDefault();

    let con = this.state.container,
      image = this.state.image,
      conStyle = { ...con.style };

    if (this.moving === 'img') {
      setStyle(this.imgEl, {
        'margin-left': num2px(e.pageX - image.startX + image.marginL),
        'margin-top': num2px(e.pageY - image.startY + image.marginT)
      });
    } else if (this.moving === 'con') {
      conStyle.left = num2px(e.pageX - con.startX + con.rect.left);
      conStyle.top = num2px(e.pageY - con.startY + con.rect.top);

      this.setState({
        container: Object.assign({}, this.state.container, { style: conStyle })
      });
    }
  };

  handleMouseUp = (e) => {
    if (!this.state.show) return;
    e.preventDefault();
    this.moving = '';
  };

  handleWheel = (e) => {
    if (!this.state.show) return;
    e.preventDefault();

    let { deltaY, wheelDelta, detail } = e,
      delta = 1;

    if (deltaY) {
      delta = deltaY > 0 ? -1 : 1;
    } else if (wheelDelta) {
      delta = wheelDelta / 120;
    } else if (detail) {
      delta = detail > 0 ? -1 : 1;
    }

    this.handleZoom(this.state.image.ratio + (delta > 0 ? STEP_RATIO : -STEP_RATIO));
  };

  handleKeyDown = (e) => {
    if (!this.state.show) return;
    e.preventDefault();
    const { esc } = this.props;

    if (esc && !this.state.container.isFull && e.keyCode === KeyCode.ESC) {
      this.handleClose();
    } else if (e.keyCode === KeyCode.LEFT) {
      this.handlePrev();
    } else if (e.keyCode === KeyCode.RIGHT) {
      this.handleNext();
    }
  };

  render() {
    const { show, current, imgs, image, container } = this.state;
    const { className, style, prefixCls, source, children, toolbar, draggable, mask, progress } = this.props;
    let isFullscreen = container.isFull;
    let ctnerClass = classNames(prefixCls, {
      [className]: className,
      'draggable': draggable,
      [`${prefixCls}-hide`]: !show
    });
    let closeBtnClass = classNames({
      'close': !isFullscreen,
      'close-fullscreen': isFullscreen
    });
    let isHide = !(source.length > 1 || (!!children && children.length > 1));
    let leftBtnClass = classNames('prev', {
      [`${prefixCls}-hide`]: isHide
    });
    let rightBtnClass = classNames('next', {
      [`${prefixCls}-hide`]: isHide
    });
    let toolbarClass = classNames('toolbar', {
      [`${prefixCls}-hide`]: !toolbar
    });
    let one2oneClass = classNames('icon', {
      'icon-disabled': image.ratio == 1
    });
    let zoomInClass = classNames('icon', {
      'icon-disabled': image.ratio >= MAX_RATIO
    });
    let zoomOutClass = classNames('icon', {
      'icon-disabled': image.ratio <= MIN_RATIO
    });
    let screenStatus = isFullscreen ? 'picture-shrink' : 'picture-fullscreen';
    let rootClass = classNames({
      [`${prefixCls}-root`]: mask,
      [`${prefixCls}-hide`]: !show
    });
    let maskClass = classNames(`${prefixCls}-mask`, {
      [`${prefixCls}-hide`]: !mask
    });
    let progressClass = classNames('toolbarTitle', {
      [`${prefixCls}-hide`]: !progress
    });

    const renderCtner = (
      <div
        data-show={show}
        className={ctnerClass}
        style={{...container.style, ...style}}
        ref={node => this.$el = node}
        onDragStart={(e) => {e.preventDefault();}}
        onMouseDown={draggable ? this.handleMouseDown : null}
        onWheel={this.handleWheel}
      >
        <div className="canvas">
          {
            imgs.map((item, index) => {
              if (current === index) {
                return (
                  <img key={'pic_'+index}
                    className="img"
                    src={item.src ? item.src : null}
                    alt={item.name ? item.name : null}
                    active="true"
                    ref={node => this.imgEl = node}
                  />
                );
              } else {
                return (
                  <img key={'pic_'+index}
                    className="img"
                    src={item.src ? item.src : null}
                    alt={item.name ? item.name : null}
                  />
                );
              }
            })
          }
        </div>
        <Icon type="picture-close" className={closeBtnClass} onClick={this.handleClose}/>
        <Icon type="arrow-line-Bold" className={leftBtnClass} onClick={this.handlePrev}/>
        <Icon type="arrow-line-Bold" className={rightBtnClass} onClick={this.handleNext}/>
        <div className={toolbarClass} style={isFullscreen ? {bottom: '20px'} : null}>
          <div className={progressClass}>{current+1}/{imgs.length}</div>
          <div className="toolbarCon">
            <Icon type="picture-equal" className={one2oneClass} onClick={this.handleZoom.bind(this, 1)}/>
            <Icon type={screenStatus} className="icon" onClick={this.handleSwitchFull}/>
            <Icon
              type="picture-enlarge"
              className={zoomInClass}
              onClick={this.handleZoom.bind(this, image.ratio + STEP_RATIO)}
            />
            <Icon
              type="picture-micrify"
              className={zoomOutClass}
              onClick={this.handleZoom.bind(this, image.ratio - STEP_RATIO)}
            />
            <Icon type="picture-rotate" className="icon" onClick={this.handleRotate}/>
            <Icon type="picture-download" className="icon" onClick={this.handleSave}/>
          </div>
        </div>
      </div>
    );

    const renderMaskCtner = (
      <div
        key={`${prefixCls}-root`}
        data-show={show}
        className={rootClass}
        ref={node => this.$root = node}
      >
        <div className={maskClass} />
        { renderCtner }
      </div>
    );

    return (
      <Animate
        component=""
        showProp="data-show"
        transitionName="zoom"
        transitionAppear={true}
      >
        { mask ? renderMaskCtner : renderCtner }
      </Animate>
    );
  }
}
polyfill(PicturePreview);
export default PicturePreview;
