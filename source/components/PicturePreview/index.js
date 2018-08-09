import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Carousel from '../Carousel/index.tsx';
import Modal from '../Modal/index.tsx';
import { fullscreen, exitfullscreen, addFullscreenchangeEvent, checkFullscreen } from '../../utils';
import './index.less';

const maxVisualWidth = parseInt(window.innerWidth * 0.8, 10),   // 图片可视区默认宽度
      maxVisualHeight = parseInt(window.innerHeight * 0.8, 10), // 图片可视区默认高度
      ZOOM_FACTOR = 0.1,//图片缩放系数
      MAX_SCALE = 3.0,  //最大的图片显示比例
      MIN_SCALE = 0.1;  //最小的图片显示比例

const setStyle = (el, css) => {
  for (let key in css) {
    el.style[key] = css[key];
  }
};

/**
 * 获取图片的自适应宽高
 * @param  {[Number]} w [图片原始宽度]
 * @param  {[Number]} h [图片原始高度]
 * @param  {[Boolean]} isFullscreen [是否为全屏状态]
 * @return {[Object]}   [返回适应后的宽、高]
 */
const getAdaptiveImg = (w, h, isFullscreen) => {
  let obj = {
    width: w,
    height: h
  };
  let maxW = maxVisualWidth;
  let maxH = maxVisualHeight;

  if (isFullscreen) {
    maxW = window.innerWidth;
    maxH = window.innerHeight;
  }

  if (w <= maxW && h <= maxH) {
    return obj;
  }

  let contRatio = maxW / maxH;
  let imgRatio = w / h;

  if (imgRatio >= contRatio) {
    obj = {
      width: maxW,
      height: parseInt(maxW * (h / w), 10)
    };
  } else {
    obj = {
      width: parseInt(maxH * (w / h), 10),
      height: maxH
    };
  }

  return obj;
};

/**
 * 获取传进来的图片尺寸或计算图片的原始尺寸
 * @param  {Object}   img      [图片对象，格式为{url:'', size: '200*200'}]
 * @param  {Function} callback [获取成功后的回调函数]
 * @param  {[type]}   scope    [回调函数绑定的作用域]
 */
const getImageSize = (img, callback, scope) => {
  let newImage, naturalWidth, naturalHeight;

  if (img.size && img.size.indexOf('*') > -1) {
    let sizeList = img.size.split('*');
    callback.call(scope, sizeList[0] || 0, sizeList[1] || 0);
  } else {
    newImage = document.createElement('img');
    newImage.onload = () => {
      naturalWidth = newImage.naturalWidth || newImage.width;
      naturalHeight = newImage.naturalHeight || newImage.height;
      callback.call(scope, naturalWidth, naturalHeight);
    };
    newImage.src = img.url;
  }
};

class PicturePreview extends Component {

  static propTypes = {
    activeIndex: PropTypes.number,    // 默认打开的图片索引
    className: PropTypes.string,
    children: PropTypes.node,
    controller: PropTypes.bool,       // 是否显示图片控制器
    dots: PropTypes.bool,             // 是否显示面板指示点
    source: PropTypes.array,          // 预览图片数组，格式为[{url:"xxxx",size: "200*200"}]
    visible: PropTypes.bool,          // 是否打开预览
    onClose: PropTypes.func,          // 关闭预览的回调
  };

  static defaultProps = {
    activeIndex: 0,
    controller: false,
    dots: false,
    source: [],
    visible: false,
    onClose: () => {},
  };

  constructor(props) {
    super(props);

    this.hasAddExitfullscreenEvt = false;
    this.direction = 'prev';
    this.selector = '.carousel-wrap .slick-list img';
    this.curSelector = '.carousel-wrap .slick-current img';
    this.imgs = this.props.source || [];

    this.state = {
      activeIndex: this.props.activeIndex,
      visible: this.props.visible,
      isFullscreen: false,
      isDisableDengbi: false,
      isDisableFangda: false,
      isDisableSuoxiao: false
    };
  }

  componentDidMount() {
    this.imgs.length && this.initImgs();
    this.props.controller && this.setCtrlIconStatus(this.props.activeIndex);
  }

  componentWillReceiveProps(nextProps) {
    const { activeIndex, visible, controller } = nextProps;

    if (this.state.visible != visible) {
      this.setState({
        visible: visible
      });
    }

    if (this.state.activeIndex != activeIndex) {
      this.setState({
        activeIndex: activeIndex
      }, () => {
        controller && this.setCtrlIconStatus(nextProps.activeIndex);
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.state) === JSON.stringify(nextState)) {
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    if (this.props.controller && this.contentWrap != undefined && this.hasAddExitfullscreenEvt == false) {
      // 处理通过按“Esc”键退出全屏的情况
      addFullscreenchangeEvent(this.contentWrap, (e) => {
        if (!checkFullscreen() && this.state.isFullscreen == true) {
          this.setState({
            isFullscreen: false
          });
        }
      });

      this.hasAddExitfullscreenEvt = true;
    }
  }

  handleOnClose = () => {
    this.setState({
      visible: false,
      isFullscreen: false
    }, () => {
      this.props.onClose();
    });
  };

  handleFullscreen = () => {
    if (this.state.isFullscreen) {
      // 退出全屏
      exitfullscreen();

      this.setState({
        isFullscreen: false
      });
    } else {
      // 进入全屏
      fullscreen(this.contentWrap);

      this.setState({
        isFullscreen: true
      });
    }
  };

  handleZoom = (index, type) => {
    let img = document.querySelectorAll(this.selector)[index],
        imgInfo = this.imgs[index],
        curScale = imgInfo.scale,
        zWidth = imgInfo.naturalWidth,
        zHeight = imgInfo.naturalHeight;

    if (type == 'in') {
      curScale = Number((curScale + ZOOM_FACTOR).toFixed(1));
      if (curScale >= MAX_SCALE) {
        curScale = MAX_SCALE;
        this.setState({
          isDisableFangda: true
        });
      }
      zWidth = parseInt(imgInfo.adaptiveWidth * curScale, 10);
      zHeight = parseInt(imgInfo.adaptiveHeight * curScale, 10);

      this.setState({
        isDisableDengbi: false,
        isDisableSuoxiao: false
      });
    } else if (type == 'out') {
      curScale = Number((curScale - ZOOM_FACTOR).toFixed(1));
      if (curScale <= MIN_SCALE) {
        curScale = MIN_SCALE;
        this.setState({
          isDisableSuoxiao: true
        });
      }
      zWidth = parseInt(imgInfo.adaptiveWidth * curScale, 10);
      zHeight = parseInt(imgInfo.adaptiveHeight * curScale, 10);

      this.setState({
        isDisableDengbi: false,
        isDisableFangda: false
      });
    } else if (type == '1:1') {
      curScale = Number((imgInfo.naturalWidth / imgInfo.adaptiveWidth).toFixed(1));
      zWidth = imgInfo.naturalWidth,
      zHeight = imgInfo.naturalHeight;
      this.setState({
        isDisableDengbi: true,
        isDisableFangda: false,
        isDisableSuoxiao: false
      });
    } else if (type == 'reset') {
      curScale = 1;
      zWidth = imgInfo.adaptiveWidth;
      zHeight = imgInfo.adaptiveHeight;
    }

    imgInfo.scale = curScale;

    setStyle(img, {
      'width': zWidth + 'px',
      'height': zHeight + 'px'
    });
  };

  handleRotate = (index, isReset) => {
    let img = document.querySelectorAll(this.selector)[index],
        imgInfo = this.imgs[index],
        oldVal = imgInfo.rotate || 0,
        newVal = isReset ? 0 : (oldVal + 90),
        transform = 'rotate(' + newVal + 'deg)';

    imgInfo.rotate = newVal;

    setStyle(img, {
      '-webkit-transform': transform,
      '-ms-transform': transform,
      'transform': transform
    });
  };

  handleSave = (selector) => {
    let img = document.querySelector(selector);

    // for IE10+
    if (window.navigator.msSaveBlob) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', img.src , true);
      xhr.responseType = 'blob';
      xhr.onreadystatechange = function () {
        if (xhr.readyState == xhr.DONE) {
          window.navigator.msSaveBlob(xhr.response);
        }
      };
      xhr.send();
    } else {
      let a = document.createElement('a'),
        event = new MouseEvent('click');

      a.download = '';
      a.href = img.src;
      a.dispatchEvent(event);
    }
  };

  initImgs = () => {
    this.props.source.map((item, index) => {
      // 计算图片的原始尺寸
      getImageSize(item, (naturalWidth, naturalHeight) => {
        let aImg = getAdaptiveImg(naturalWidth, naturalHeight, this.state.isFullscreen);

        this.imgs[index].naturalWidth = naturalWidth;
        this.imgs[index].naturalHeight = naturalHeight;
        this.imgs[index].adaptiveWidth = aImg.width;
        this.imgs[index].adaptiveHeight = aImg.height;
        this.imgs[index].scale = 1.0;
        this.imgs[index].rotate = 0;
      });
    });
  };

  /**
   * 重置上一张图片的缩放和旋转状态
   * @return {[type]} [description]
   */
  resetImg = (index) => {
    this.handleZoom(index, 'reset');
    this.handleRotate(index, true);
  };

  setCtrlIconStatus = (index) => {
    let activeImg = this.imgs[index],
        isDisableDengbi = false;

    if (activeImg && activeImg.naturalWidth == activeImg.adaptiveWidth && activeImg.naturalHeight == activeImg.adaptiveHeight) {
      isDisableDengbi = true;
    } else {
      isDisableDengbi = false;
    }

    this.setState({
      isDisableDengbi: isDisableDengbi,
      isDisableFangda: false,
      isDisableSuoxiao: false
    });
  };

  afterCarouselChange = (curIndex) => {
    this.setState({
      activeIndex: curIndex
    }, () => {
      if (this.props.controller) {
        // 计算上一张图片的index
        let oldIndex = 0,
            totalNum = this.props.source.length;

        if (this.direction == 'prev') {
          if (curIndex == totalNum - 1) {
            oldIndex = 0;
          } else {
            oldIndex = curIndex + 1;
          }
        } else if (this.direction == 'next') {
          if (curIndex == 0) {
            oldIndex = totalNum - 1;
          } else {
            oldIndex = curIndex - 1;
          }
        }

        this.resetImg(oldIndex);
        this.setCtrlIconStatus(curIndex);
      }
    });
  };

  handleCarouselPrev = () => {
    this.direction = 'prev';
    this.carousel.prev();
  };

  handleCarouselNext = () => {
    this.direction = 'next';
    this.carousel.next();
  };

  handleMouseDown = (e) => {
    // debugger;
    // TODO: 拖放功能
    // console.log('mousedown: ', e);
    e.preventDefault();
  };

  render() {
    const { visible, isFullscreen, isDisableDengbi, isDisableFangda, isDisableSuoxiao } = this.state;
    const { className, children, source, dots, activeIndex } = this.props;
    const controller = false; // 未提供视觉 icon，暂时关闭 controller 功能

    let contentWrapClass = classNames({
        'fishd-picturepreview-content-wrap': true,
        'fishd-picturepreview-content-wrap-fullscreen': isFullscreen
    });
    let ctrlClass = classNames({
        'ctrl-wrap': true,
        'hide': !controller
    });
    let fullscreenClass = classNames({
        'fishdicon': true,
        'fishdicon-fullscreen': !isFullscreen,
        'fishdicon-fullscreen-exit': isFullscreen
    });
    let imgWrapClass = classNames({
        'img-wrap': true,
        'img-wrap-size': !isFullscreen,
        'img-wrap-size-fullscreen': isFullscreen
    });
    let dengbiClass = classNames({
        'fishdicon': true,
        'fishdicon-dengbi': true,
        'fishdicon-disable': isDisableDengbi
    });
    let fangdaClass = classNames({
        'fishdicon': true,
        'fishdicon-fangda': true,
        'fishdicon-disable': isDisableFangda
    });
    let suoxiaoClass = classNames({
        'fishdicon': true,
        'fishdicon-suoxiao': true,
        'fishdicon-disable': isDisableSuoxiao
    });
    let isHideBtn = !(source.length > 1 || (!!children && children.length > 1));
    let leftBtnClass = classNames({
        'fishdicon': true,
        'btn-left': true,
        'fishdicon-left': true,
        'hide': isHideBtn
    });
    let rightBtnClass = classNames({
        'fishdicon': true,
        'btn-right': true,
        'fishdicon-right': true,
        'hide': isHideBtn
    });

    return (
      <Modal
        title={null}
        width={"100%"}
        wrapClassName={className ? className + " fishd-picturepreview-modal-wrap" : "fishd-picturepreview-modal-wrap"}
        visible={visible}
        footer={null}
        destroyOnClose={true}
        closable={false}
        onCancel={this.handleOnClose}
      >
        <div className={contentWrapClass} ref={node => this.contentWrap = node}>
          <div className="carousel-wrap">
            <Carousel
              dots={dots}
              effect={"fade"}
              initialSlide={activeIndex}
              afterChange={this.afterCarouselChange}
              ref={node => this.carousel = node}
            >
              {
                this.imgs.length ? this.imgs.map((item, index) => {
                  let aImg = getAdaptiveImg(item.naturalWidth, item.naturalHeight, isFullscreen);

                  item.adaptiveWidth = aImg.width;
                  item.adaptiveHeight = aImg.height;

                  if (controller) {
                    return (
                      <div key={index} className={imgWrapClass}>
                        <img src={item.url} width={aImg.width || 0} height={aImg.height || 0} onMouseDown={this.handleMouseDown}/>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className={imgWrapClass}>
                        <img src={item.url} width={aImg.width || 0} height={aImg.height || 0}/>
                      </div>
                    );
                  }
                }) :
                this.props.children
              }
            </Carousel>
          </div>

          <i className="fishdicon fishdicon-close-modal-line" onClick={this.handleOnClose}/>
          <i className={leftBtnClass} onClick={this.handleCarouselPrev}/>
          <i className={rightBtnClass} onClick={this.handleCarouselNext}/>

          <div className={ctrlClass}>
            <i className={dengbiClass} onClick={this.handleZoom.bind(this, this.state.activeIndex, '1:1')}/>
            <i className={fullscreenClass} onClick={this.handleFullscreen}/>
            <i className={fangdaClass} onClick={this.handleZoom.bind(this, this.state.activeIndex, 'in')}/>
            <i className={suoxiaoClass} onClick={this.handleZoom.bind(this, this.state.activeIndex, 'out')}/>
            <i className="fishdicon fishdicon-xuanzhuan" onClick={this.handleRotate.bind(this, this.state.activeIndex, false)}/>
            <i className="fishdicon fishdicon-save" onClick={this.handleSave.bind(this, this.curSelector)}/>
          </div>
        </div>
      </Modal>
    );
  }
}

export default PicturePreview;
