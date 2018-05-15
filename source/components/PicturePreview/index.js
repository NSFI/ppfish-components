import React, { Component } from 'react';
import { Carousel, Modal } from 'antd';
import PropTypes from 'prop-types';

import './index.less';

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
        width={870}
        wrapClassName="vertical-center-modal"
        visible={visible}
        footer={null}
        onCancel={this.handleOnClose}
        destroyOnClose={true}
      >
        <div className="picture-preview-modal-content">
          <div className="left-side side">
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
                source.map((each) =>
                  <div key={each.url} className="picture-container">
                    <img src={each.url} width={each.size.split("*")[0]} height={each.size.split("*")[1]}/>
                  </div>
                )
              }
            </Carousel>
          </div>
          <div className="right-side side">
            <i className="iconfont icon-youjiantou1" onClick={() => this.carousel.next()}/>
          </div>
        </div>
      </Modal>
    );
  }
}

export default PicturePreview;
