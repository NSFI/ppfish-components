import React, { Component } from 'react';
import { Carousel, Modal } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { fullscreen, exitfullscreen } from '../../utils';

import './index.less';

const getWidthAndHeight = (w, h) => {
  const max = 580;
  let rtn = {
    width: w,
    height: h
  };
  if(w > max && h <= max) {
    rtn = {
      width: max,
      height: max * (h / w).toFixed(2)
    };
  }else if(h > max && w <= max) {
    rtn = {
      width: max * (w / h).toFixed(2),
      height: max
    };
  }else if(w > max && h > max) {
    rtn = {
      width: max,
      height: max
    };
  }
  return rtn;
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
    this.carousel = null;
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
      fullscreen(this.carouselWrap);

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
    let carouselWrapClass = classNames({
        'carousel-wrap': true,
        'carousel-wrap-fullscreen': this.state.isFullscreen
    });
    let operateClass = classNames({
        'operate-wrap': true,
        'hide': false
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
        wrapClassName="modal-wrap"
        visible={visible}
        footer={null}
        mask={true}
        destroyOnClose={true}
        closable={false}
        onCancel={this.handleOnClose}
      >
        <div className={carouselWrapClass} ref={node => this.carouselWrap = node}>
          <div className="middle">
            <Carousel
              focusOnSelect={true}
              dots={dots}
              effect={"fade"}
              initialSlide={activeIndex}
              ref={node => this.carousel = node}
            >
              {
                source.map((each, index) => {
                  const imgWidth = parseInt(each.size.split("*")[0]);
                  const imgHeight = parseInt(each.size.split("*")[1]);
                  return (
                    <div key={index} className="picture-container">
                      <div className="img-wrap">
                        <img src={each.url} width={getWidthAndHeight(imgWidth, imgHeight).width} height={getWidthAndHeight(imgWidth, imgHeight).height}/>
                      </div>
                    </div>
                  );
                })
              }
            </Carousel>
          </div>

          <i className="iconfont icon-guanbi" onClick={this.handleOnClose}/>

          <div className="left-side side" style={{display: source.length > 1 ? "flex" : "none"}}>
            <i className="iconfont icon-zuojiantou1" onClick={() => this.carousel.prev()}/>
          </div>

          <div className="right-side side" style={{display: source.length > 1 ? "flex" : "none"}}>
            <i className="iconfont icon-youjiantou1" onClick={() => this.carousel.next()}/>
          </div>

          <div className={operateClass}>
            <i className="iconfont icon-dengbi" onClick={this.handleDengbi}/>
            <i className={fullscreenClass} onClick={this.handleFullscreen}/>
            <i className="iconfont icon-fangda" onClick={this.handleZoomIn}/>
            <i className="iconfont icon-suoxiao" onClick={this.handleZoomOut}/>
            <i className="iconfont icon-xuanzhuan" onClick={this.handleRotate}/>
            <a download href={'each.url'} className="iconfont icon-save"></a>
          </div>
        </div>
      </Modal>
    );
  }
}

export default PicturePreview;
