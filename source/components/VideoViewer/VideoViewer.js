import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'
import omit from 'omit.js';
import Video from './Video';
import VideoModal from  './VideoModal';
import Icon from '../Icon/index.tsx';

import './style/VideoViewer.less';

class VideoViewer extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    poster: PropTypes.string,
    modalOption: PropTypes.object,
    videoOption: PropTypes.object,
    failedMessage: PropTypes.string
  }

  static defaultProps = {
    prefixCls: 'fishd-video-viewer',
    poster: null,
    width: 240,
    height: 135,
    failedMessage: null
  }

  static Video = Video;

  static VideoModal = VideoModal;

  constructor(props) {
    super(props);
    this.state = {
      videoModalVisible: false
    };
    this.video = React.createRef();
  }

  // 点击缩略图
  handleThumbClick = () => {

    if(this.props.failedMessage !== null) return;

    this.setState({
      videoModalVisible: true
    }, () => {
      const video = this.video && this.video.current;
      const player = video && video.getVideoPlayer();
      if (player && typeof player.play === 'function') {
        player.play();
      }
    });
  }

  // 模态框关闭的回调
  onClose = () => {
    const video = this.video && this.video.current;
    const player = video && video.getVideoPlayer();
    if (player && typeof player.pause === 'function') {
      player.pause();
    }
    this.props.modalOption.afterClose && this.props.modalOption.afterClose();
  };

  // 点击模态框关闭按钮
  handleCancel = (e) => {
    this.setState({
      videoModalVisible: false
    });
    this.props.modalOption.onCancel && this.props.modalOption.onCancel();
  };

  render() {
    const { videoModalVisible } = this.state;
    const {
      prefixCls,
      width,
      height,
      poster,
      modalOption,
      videoOption,
      failedMessage
    } = this.props;

    const otherModalProps = omit(modalOption, [
      'visible',
      'afterClose',
      'onCancel'
    ]);

    const otherVideoProps = omit(videoOption, [
      'autoPlay'
    ]);

    const thumbCls = classnames({
      [`${prefixCls}-thumb`]: true,
      [`${prefixCls}-thumb-disabled`]: failedMessage !== null
    });

    return (
      <div className={`${prefixCls}-wrap`} style={{width:width, height:height}}>
        <div
          className={thumbCls}
          style={{backgroundImage:`url(${poster})`}}
          onClick={this.handleThumbClick}
        >
          {
            failedMessage === null ?
              <div className={classnames([`${prefixCls}-thumb-status`, `${prefixCls}-thumb-big-play-button`])}>
                <Icon type="play"/>
              </div>
              :
              <div className={classnames([`${prefixCls}-thumb-status`, `${prefixCls}-thumb-failed-message`])}>
                <span>{failedMessage}</span>
              </div>
          }
        </div>
        <VideoModal
          {...otherModalProps}
          visible={videoModalVisible}
          afterClose={this.onClose}
          onCancel={this.handleCancel}
        >
          <Video
            {...otherVideoProps}
            ref={this.video}
            autoPlay={true}
          />
        </VideoModal>
      </div>
    );
  }
}

export default VideoViewer;
