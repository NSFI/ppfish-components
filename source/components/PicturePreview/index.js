import React, { Component } from 'react';
import { Carousel, Modal } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { fullscreen, exitfullscreen, addFullscreenchangeEvent, checkFullscreen } from '../../utils';

import './index.less';

/*
  图片可视区默认宽高
 */
const maxVisualWidth = window.innerWidth * 0.8;
const maxVisualHeight = window.innerHeight * 0.8;

/**
 * 获取图片的自适应宽高
 * @param  {[Number]} w [图片原始宽度]
 * @param  {[Number]} h [图片原始高度]
 * @param  {[Number]} maxW [图片容器最大宽度]
 * @param  {[Number]} maxH [图片容器最大高度]
 * @return {[Object]}   [含自适应后宽高属性的对象]
 */
const getAdaptiveWH = (w, h, maxW, maxH) => {
  let obj = {
    width: w,
    height: h
  };

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

class PicturePreview extends Component {

  static propTypes = {
    visible: PropTypes.bool,          // 是否打开预览
    source: PropTypes.array,          // 预览图片数组，格式为[{url:"xxxx",size: "200*200"}]
    activeIndex: PropTypes.number,    // 默认打开的图片索引
    onClose: PropTypes.func,          // 关闭预览的回调
    dots: PropTypes.bool              // 是否显示面板指示点
  };

  static defaultProps = {
    visible: false,
    source: [{url:'', size: "200*200"}],
    activeIndex: 0,
    onClose: () => {},
    dots: false
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
          // 退出全屏时缩小图片可视区大小
          let cn = _this.imgWrap.className;
          _this.imgWrap.className = cn.replace('img-wrap-size-fullscreen', 'img-wrap-size');

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

      // 退出全屏时缩小图片可视区大小
      let cn = this.imgWrap.className;
      this.imgWrap.className = cn.replace('img-wrap-size-fullscreen', 'img-wrap-size');

      this.setState({
        isFullscreen: false
      });
    } else {
      // 进入全屏
      fullscreen(this.contentWrap);

      // 进入全屏时放大图片可视区大小
      let cn = this.imgWrap.className;
      this.imgWrap.className = cn.replace('img-wrap-size', 'img-wrap-size-fullscreen');

      this.setState({
        isFullscreen: true
      });
    }
  };

  handleZoomIn = () => {

  };

  handleZoomOut = () => {

  };

  handleRotate = () => {

  };

  render() {
    const { visible } = this.state;
    const { source, dots, activeIndex } = this.props;
    let contentWrapClass = classNames({
        'pp-content-wrap': true,
        'pp-content-wrap-fullscreen': this.state.isFullscreen
    });
    let operateClass = classNames({
        'operate-wrap': true,
        'pp-hide': false
    });
    let fullscreenClass = classNames({
        'iconfont': true,
        'icon-fullscreen': !this.state.isFullscreen,
        'icon-fullscreen-exit': this.state.isFullscreen
    });

    return (
      <Modal
        title=""
        width={"100%"}
        wrapClassName="pp-modal-wrap"
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
                  let adaptiveWH = getAdaptiveWH(naturalWidth, naturalHeight, maxVisualWidth, maxVisualHeight);

                  return (
                    <div key={index} className="img-wrap img-wrap-size" ref={node => this.imgWrap = node}>
                      <img src={each.url} width={adaptiveWH.width} height={adaptiveWH.height}/>
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

          <div className={operateClass}>
            <i className="iconfont icon-dengbi" onClick={this.handleDengbi}/>
            <i className={fullscreenClass} onClick={this.handleFullscreen}/>
            <i className="iconfont icon-fangda" onClick={this.handleZoomIn}/>
            <i className="iconfont icon-suoxiao" onClick={this.handleZoomOut}/>
            <i className="iconfont icon-xuanzhuan" onClick={this.handleRotate}/>
            <a download href={'each.url'} className="iconfont icon-save" />
          </div>
        </div>
      </Modal>
    );
  }
}

export default PicturePreview;
