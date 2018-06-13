import React, { Component } from 'react';
import { Carousel, Modal } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { fullscreen, exitfullscreen, addFullscreenchangeEvent, checkFullscreen } from '../../utils';

import './index.less';

/*
  常量定义
 */
const maxVisualWidth = parseInt(window.innerWidth * 0.8, 10),   // 图片可视区默认宽度
      maxVisualHeight = parseInt(window.innerHeight * 0.8, 10), // 图片可视区默认高度
      ZOOM_FACTOR = 0.1,//图片缩放系数
      MAX_SCALE = 3.0,  //最大的图片显示比例
      MIN_SCALE = 0.1;  //最小的图片显示比例

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

const setStyle = (el, css) => {
  for (let key in css) {
    el.style[key] = css[key];
  }
};

/**
 * 获取图片的原始尺寸
 * @param  {[type]}   url      [图片的url]
 * @param  {Function} callback [获取成功后的回调函数]
 * @param  {[type]}   scope    [回调函数绑定的作用域]
 */
const getImageSize = (url, callback, scope) => {
  let newImage, naturalWidth, naturalHeight;

  newImage = document.createElement('img');
  newImage.onload = () => {
    naturalWidth = newImage.naturalWidth || newImage.width;
    naturalHeight = newImage.naturalHeight || newImage.height;
    callback.call(scope, naturalWidth, naturalHeight);
  };
  newImage.src = url;
};

class PicturePreview extends Component {

  static propTypes = {
    visible: PropTypes.bool,          // 是否打开预览
    source: PropTypes.array,          // 预览图片数组，格式为[{url:"xxxx",size: "200*200"}]
    activeIndex: PropTypes.number,    // 默认打开的图片索引
    onClose: PropTypes.func,          // 关闭预览的回调
    dots: PropTypes.bool,             // 是否显示面板指示点
    controller: PropTypes.bool,        // 是否显示图片控制器
  };

  static defaultProps = {
    visible: false,
    source: [{url:'', size: "200*200"}],
    activeIndex: 0,
    onClose: () => {},
    dots: false,
    controller: false
  };

  constructor(props) {
    super(props);

    this.hasAddExitfullscreenEvt = false;
    this.direction = 'prev';
    this.selector = '.carousel-wrap .slick-list img';
    this.imgs = this.props.source;

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
    this.initImgs();
    this.setIconStatus(this.props.activeIndex);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.visible != nextProps.visible) {
      this.setState({
        visible: nextProps.visible
      });
    }

    if (this.state.activeIndex != nextProps.activeIndex) {
      this.setState({
        activeIndex: nextProps.activeIndex
      }, () => {
        this.setIconStatus(nextProps.activeIndex);
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
    if (this.contentWrap != undefined && this.hasAddExitfullscreenEvt == false) {
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
      getImageSize(item.url, (naturalWidth, naturalHeight) => {
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

  setIconStatus = (index) => {
    let activeImg = this.imgs[index],
        isDisableDengbi = false;

    if (activeImg.naturalWidth == activeImg.adaptiveWidth && activeImg.naturalHeight == activeImg.adaptiveHeight) {
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
      this.setIconStatus(curIndex);
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

  render() {
    const { visible, isFullscreen, isDisableDengbi, isDisableFangda, isDisableSuoxiao } = this.state;
    const { source, dots, activeIndex, controller } = this.props;
    let contentWrapClass = classNames({
        'm-picture-preview-content-wrap': true,
        'm-picture-preview-content-wrap-fullscreen': isFullscreen
    });
    let ctrlClass = classNames({
        'ctrl-wrap': true,
        'm-picture-preview-hide': !controller
    });
    let fullscreenClass = classNames({
        'iconfont': true,
        'icon-fullscreen': !isFullscreen,
        'icon-fullscreen-exit': isFullscreen
    });
    let imgWrapClass = classNames({
        'img-wrap': true,
        'img-wrap-size': !isFullscreen,
        'img-wrap-size-fullscreen': isFullscreen
    });
    let dengbiClass = classNames({
        'iconfont': true,
        'icon-dengbi': true,
        'icon-disable': isDisableDengbi
    });
    let fangdaClass = classNames({
        'iconfont': true,
        'icon-fangda': true,
        'icon-disable': isDisableFangda
    });
    let suoxiaoClass = classNames({
        'iconfont': true,
        'icon-suoxiao': true,
        'icon-disable': isDisableSuoxiao
    });

    // console.log('rendering...');

    return (
      <Modal
        title=""
        width={"100%"}
        wrapClassName="m-picture-preview-modal-wrap"
        visible={visible}
        footer={null}
        mask={true}
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
                this.imgs.map((item, index) => {
                  let aImg = getAdaptiveImg(item.naturalWidth, item.naturalHeight, isFullscreen);

                  item.adaptiveWidth = aImg.width;
                  item.adaptiveHeight = aImg.height;

                  return (
                    <div key={index} className={imgWrapClass}>
                      <img src={item.url} width={aImg.width} height={aImg.height}/>
                    </div>
                  );
                })
              }
            </Carousel>
          </div>

          <i className="iconfont icon-guanbi" onClick={this.handleOnClose}/>

          <div className="btn-left btn" style={{display: source.length > 1 ? "flex" : "none"}}>
            <i className="iconfont icon-zuojiantou1" onClick={this.handleCarouselPrev}/>
          </div>

          <div className="btn-right btn" style={{display: source.length > 1 ? "flex" : "none"}}>
            <i className="iconfont icon-youjiantou1" onClick={this.handleCarouselNext}/>
          </div>

          <div className={ctrlClass}>
            <i className={dengbiClass} onClick={this.handleZoom.bind(this, this.state.activeIndex, '1:1')}/>
            <i className={fullscreenClass} onClick={this.handleFullscreen}/>
            <i className={fangdaClass} onClick={this.handleZoom.bind(this, this.state.activeIndex, 'in')}/>
            <i className={suoxiaoClass} onClick={this.handleZoom.bind(this, this.state.activeIndex, 'out')}/>
            <i className="iconfont icon-xuanzhuan" onClick={this.handleRotate.bind(this, this.state.activeIndex, false)}/>
            <i className="iconfont icon-save" onClick={this.handleSave.bind(this, '.carousel-wrap .slick-current img')}/>
          </div>
        </div>
      </Modal>
    );
  }
}

export default PicturePreview;
