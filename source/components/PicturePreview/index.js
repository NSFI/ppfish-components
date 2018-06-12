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
      MAX_SCALE = 5,    //最大的图片显示比例
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

function setStyle(el, css) {
  for (let key in css) {
    el.style[key] = css[key];
  }
}

class PicturePreview extends Component {

  static propTypes = {
    visible: PropTypes.bool,          // 是否打开预览
    source: PropTypes.array,          // 预览图片数组，格式为[{url:"xxxx",size: "200*200"}]
    activeIndex: PropTypes.number,    // 默认打开的图片索引
    onClose: PropTypes.func,          // 关闭预览的回调
    dots: PropTypes.bool,             // 是否显示面板指示点
    controller: PropTypes.bool        // 是否显示图片控制器
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
    this.prevIndex = 0;
    this.selector = '.carousel-wrap .slick-list img';
    this.imgs = this.props.source;

    this.state = {
      visible: this.props.visible,
      isFullscreen: false,
      activeIndex: this.props.activeIndex,
      isDisableDengbi: false,
      isDisableFangda: false,
      isDisableSuoxiao: false
    };
  }

  componentDidMount() {
    this.initImgs();
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
        this.setDengbiStatus();
      });
    }
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
      if (curScale > MAX_SCALE) {
        curScale = MAX_SCALE;
        // TODO：禁用放大按钮点击
      }
      zWidth = parseInt(imgInfo.adaptiveWidth * curScale, 10);
      zHeight = parseInt(imgInfo.adaptiveHeight * curScale, 10);
    } else if (type == 'out') {
      curScale = Number((curScale - ZOOM_FACTOR).toFixed(1));
      if (curScale < MIN_SCALE) {
        curScale = MIN_SCALE;
        // TODO：禁用缩小按钮点击
      }
      zWidth = parseInt(imgInfo.adaptiveWidth * curScale, 10);
      zHeight = parseInt(imgInfo.adaptiveHeight * curScale, 10);
    } else if (type == '1:1') {
      curScale = 1;
      zWidth = imgInfo.naturalWidth,
      zHeight = imgInfo.naturalHeight;
      this.setState({
        isDisableDengbi: true
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

  handleSave = (selector, name) => {
    let img = document.querySelector(selector),
        a = document.createElement('a'),
        event = new MouseEvent('click');

    a.download = name || '';
    a.href = img.src;
    a.dispatchEvent(event);
  };

  initImgs = () => {
    this.props.source.map((item, index) => {
      // TODO: 计算图片的原始尺寸
      const naturalWidth = parseInt(item.size.split("*")[0]);
      const naturalHeight = parseInt(item.size.split("*")[1]);
      let aImg = getAdaptiveImg(naturalWidth, naturalHeight, this.state.isFullscreen);

      this.imgs[index].naturalWidth = naturalWidth;
      this.imgs[index].naturalHeight = naturalHeight;
      this.imgs[index].adaptiveWidth = aImg.width;
      this.imgs[index].adaptiveHeight = aImg.height;
      this.imgs[index].scale = 1.0;
      this.imgs[index].rotate = 0;
    });
  };

  /**
   * 还原对上一张图片进行的操作
   * @return {[type]} [description]
   */
  resetImg = () => {
    let index = this.prevIndex;

    this.handleZoom(index, 'reset');
    this.handleRotate(index, true);
  };

  setDengbiStatus = () => {
    let activeImg = this.imgs[this.state.activeIndex];
    if (activeImg.naturalWidth == activeImg.adaptiveWidth && activeImg.naturalHeight == activeImg.adaptiveHeight) {
      this.setState({
        isDisableDengbi: true
      });
    } else {
      this.setState({
        isDisableDengbi: false
      });
    }
  };

  handleCarouselPrev = () => {
    let curIndex = this.state.activeIndex,
        totalNum = this.props.source.length;

    this.prevIndex = curIndex;

    if (curIndex == 0) {
      curIndex = totalNum - 1;
    } else {
      curIndex -= 1;
    }

    this.setState({
      activeIndex: curIndex,
    }, () => {
      this.carousel.prev();
      this.setDengbiStatus();
    });
  };

  handleCarouselNext = () => {
    let curIndex = this.state.activeIndex,
        totalNum = this.props.source.length;

    this.prevIndex = curIndex;

    if (curIndex == totalNum - 1) {
      curIndex = 0;
    } else {
      curIndex += 1;
    }

    this.setState({
      activeIndex: curIndex,
    }, () => {
      this.carousel.next();
      this.setDengbiStatus();
    });
  };

  render() {
    let _this = this;
    const { visible, isFullscreen, isDisableDengbi, isDisableFangda, isDisableSuoxiao } = this.state;
    const { source, dots, activeIndex, controller } = this.props;
    let contentWrapClass = classNames({
        'm-picture-preview-content-wrap': true,
        'm-picture-preview-content-wrap-fullscreen': isFullscreen
    });
    let ctrlClass = classNames({
        'ctrl-wrap': true,
        'm-picture-preview-hide': controller
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
              afterChange={this.resetImg}
              ref={node => this.carousel = node}
            >
              {
                source.map((item, index) => {
                  let imgInfo = this.imgs[index];
                  let aImg = getAdaptiveImg(imgInfo.naturalWidth, imgInfo.naturalHeight, isFullscreen);

                  imgInfo.adaptiveWidth = aImg.width;
                  imgInfo.adaptiveHeight = aImg.height;

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
            <i className="iconfont icon-fangda" onClick={this.handleZoom.bind(this, this.state.activeIndex, 'in')}/>
            <i className="iconfont icon-suoxiao" onClick={this.handleZoom.bind(this, this.state.activeIndex, 'out')}/>
            <i className="iconfont icon-xuanzhuan" onClick={this.handleRotate.bind(this, this.state.activeIndex, false)}/>
            <i className="iconfont icon-save" onClick={this.handleSave.bind(this, '.carousel-wrap .slick-current img', null)}/>
          </div>
        </div>
      </Modal>
    );
  }
}

export default PicturePreview;
