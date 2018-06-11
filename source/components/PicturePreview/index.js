import React, { Component } from 'react';
import { Carousel, Modal } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { fullscreen, exitfullscreen, addFullscreenchangeEvent, checkFullscreen } from '../../utils';

import './index.less';

/*
  图片可视区默认宽高
 */
const maxVisualWidth = parseInt(window.innerWidth * 0.8, 10);
const maxVisualHeight = parseInt(window.innerHeight * 0.8, 10);

/**
 * 获取图片的自适应宽高
 * @param  {[Number]} w [图片原始宽度]
 * @param  {[Number]} h [图片原始高度]
 * @param  {[Boolean]} isFullscreen [是否为全屏状态]
 * @return {[Object]}   [包含自适应后宽高属性的对象]
 */
const getAdaptiveWH = (w, h, isFullscreen) => {
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
  for (var key in css) {
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
    this.state = {
      visible: this.props.visible,
      isFullscreen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if ( this.state.visible != nextProps.visible ) {
      this.setState({
        visible: nextProps.visible
      });
    }
  }

  componentDidUpdate() {
    let _this = this;

    if (this.contentWrap != undefined && this.hasAddExitfullscreenEvt == false) {
      // 处理通过按“Esc”键退出全屏的情况
      addFullscreenchangeEvent(this.contentWrap, (e) => {
        if (!checkFullscreen() && _this.state.isFullscreen == true) {
          _this.setState({
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

  handleDengbi = () => {

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

  handleZoom = (selector, isZoomIn) => {
    let scale = 0.1,
        img = document.querySelector(selector),
        ratio = img.dataset.ratio,
        zWidth = parseInt(img.width + img.height * scale * ratio, 10),
        zHeight = parseInt(img.height + img.height * scale, 10);

    if (!isZoomIn) {
      zWidth = parseInt(img.width - img.height * scale * ratio, 10);
      zHeight = parseInt(img.height - img.height * scale, 10);
    }

    setStyle(img, {
      'width': zWidth + 'px',
      'height': zHeight + 'px'
    });
  };

  handleRotate = (selector) => {
    let img = document.querySelector(selector),
        oldVal = parseInt(img.dataset.rotate, 10) || 0,
        newVal = oldVal + 90,
        transform = 'rotate(' + newVal + 'deg)';

    img.dataset.rotate = newVal;

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

  render() {
    const { visible, isFullscreen } = this.state;
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
              ref={node => this.carousel = node}
            >
              {
                source.map((each, index) => {
                  // TODO: 计算图片的原始尺寸
                  const naturalWidth = parseInt(each.size.split("*")[0]);
                  const naturalHeight = parseInt(each.size.split("*")[1]);
                  const imgRatio = naturalWidth / naturalHeight;
                  let adaptiveWH = getAdaptiveWH(naturalWidth, naturalHeight, isFullscreen);

                  return (
                    <div key={index} className={imgWrapClass}>
                      <img src={each.url} data-ratio={imgRatio} width={adaptiveWH.width} height={adaptiveWH.height}/>
                    </div>
                  );
                })
              }
            </Carousel>
          </div>

          <i className="iconfont icon-guanbi" onClick={this.handleOnClose}/>

          <div className="btn-left btn" style={{display: source.length > 1 ? "flex" : "none"}}>
            <i className="iconfont icon-zuojiantou1" onClick={() => this.carousel.prev()}/>
          </div>

          <div className="btn-right btn" style={{display: source.length > 1 ? "flex" : "none"}}>
            <i className="iconfont icon-youjiantou1" onClick={() => this.carousel.next()}/>
          </div>

          <div className={ctrlClass}>
            <i className="iconfont icon-dengbi" onClick={this.handleDengbi}/>
            <i className={fullscreenClass} onClick={this.handleFullscreen}/>
            <i className="iconfont icon-fangda" onClick={this.handleZoom.bind(this, '.carousel-wrap .slick-current img', true)}/>
            <i className="iconfont icon-suoxiao" onClick={this.handleZoom.bind(this, '.carousel-wrap .slick-current img', false)}/>
            <i className="iconfont icon-xuanzhuan" onClick={this.handleRotate.bind(this, '.carousel-wrap .slick-current img')}/>
            <i className="iconfont icon-save" onClick={this.handleSave.bind(this, '.carousel-wrap .slick-current img', null)}/>
          </div>
        </div>
      </Modal>
    );
  }
}

export default PicturePreview;
