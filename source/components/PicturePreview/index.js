import React, { Component } from 'react';
import { Carousel, Modal } from 'antd';
import PropTypes from 'prop-types';

import './index.less';

const getWidthAndHeight = (w, h) => {
  const max = 580;
  let rtn = {width: w, height: h};
  if(w > max) {
    rtn = {
      width: max,
      height: max * (h / w).toFixed(2)
    };
  }
  if(h > max) {
    rtn = {
      width: max * (w / h).toFixed(2),
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
      visible: this.props.visible
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
      visible: false
    }, () => {
      this.props.onClose();
    });
  }

  render() {
    const { visible } = this.state;
    const { source, dots, activeIndex } = this.props;

    return (
      <Modal
        title=""
        width={978}
        wrapClassName="vertical-center-modal"
        visible={visible}
        footer={null}
        destroyOnClose={true}
        closable={false}
        onCancel={this.handleOnClose}
      >
        <div className="picture-preview-modal-content">
          <div className="left-side side" style={{display: source.length > 1 ? "flex" : "none"}}>
            <i className="iconfont icon-zuojiantou1" onClick={() => this.carousel.prev()}/>
          </div>
          <div className="middle">
            <Carousel
              focusOnSelect={true}
              dots={dots}
              effect={"fade"}
              initialSlide={activeIndex}
              ref={carousel => this.carousel = carousel}
            >
              {
                source.map((each, index) =>
                  {
                    const imgWidth = parseInt(each.size.split("*")[0]);
                    const imgHeight = parseInt(each.size.split("*")[1]);
                    return (
                      <div key={index} className="picture-container">
                        <div style={{position: "relative", margin: "0 auto"}}>
                          <img src={each.url} width={getWidthAndHeight(imgWidth, imgHeight).width} height={getWidthAndHeight(imgWidth, imgHeight).height}/>
                          <i className="iconfont icon-guanbi" onClick={this.handleOnClose}/>
                        </div>
                      </div>
                    );
                  }
                )
              }
            </Carousel>
          </div>
          <div className="right-side side" style={{display: source.length > 1 ? "flex" : "none"}}>
            <i className="iconfont icon-youjiantou1" onClick={() => this.carousel.next()}/>
          </div>
        </div>
      </Modal>
    );
  }
}

export default PicturePreview;
