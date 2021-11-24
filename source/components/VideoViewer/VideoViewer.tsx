import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import omit from 'omit.js';
import Video from './Video';
import VideoModal, { VideoModalProps } from './VideoModal';
import Icon from '../Icon';

interface VideoViewerProps {
  prefixCls?: string;
  width?: string | number;
  height?: string | number;
  poster?: string;
  failedMessage?: string;
  onThumbClick?: (e: React.MouseEvent) => void;
  modalProps?: VideoModalProps;
  videoProps?: VideoModalProps;
}

interface VideoViewerState {
  videoModalVisible: boolean;
}

class VideoViewer extends React.Component<VideoViewerProps, VideoViewerState> {
  static propTypes = {
    prefixCls: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    poster: PropTypes.string,
    failedMessage: PropTypes.string,
    modalProps: PropTypes.object,
    videoProps: PropTypes.object,
    onThumbClick: PropTypes.func,
  };

  static defaultProps = {
    prefixCls: 'fishd-video-viewer',
    poster: null,
    width: 240,
    height: 135,
    failedMessage: null,
  };

  video: React.RefObject<any>;

  static Video = Video;

  static VideoModal = VideoModal;

  constructor(props) {
    super(props);
    this.state = {
      videoModalVisible: false,
    };
    this.video = React.createRef<Video>();
  }

  // 点击缩略图
  handleThumbClick = e => {
    if (this.props.failedMessage !== null) return;

    this.setState(
      {
        videoModalVisible: true,
      },
      () => {
        const video = this.video && this.video.current;
        const player = video && video.getVideoPlayer();
        if (player && typeof player.play === 'function') {
          player.play();
        }
      },
    );
    this.props.onThumbClick && this.props.onThumbClick(e);
  };

  // 模态框关闭的回调
  onClose = () => {
    const video = this.video && this.video.current;
    const player = video && video.getVideoPlayer();
    if (player && typeof player.pause === 'function') {
      player.pause();
    }
    this.props.modalProps.afterClose && this.props.modalProps.afterClose();
  };

  // 点击模态框关闭按钮
  handleCancel = e => {
    this.setState({
      videoModalVisible: false,
    });
    this.props.modalProps.onCancel && this.props.modalProps.onCancel();
  };

  render() {
    const { videoModalVisible } = this.state;
    const { prefixCls, width, height, poster, modalProps, videoProps, failedMessage } = this.props;

    const otherModalProps = omit(modalProps, ['visible', 'afterClose', 'onCancel']);

    const otherVideoProps = omit(videoProps, ['autoPlay']);

    const thumbCls = classnames({
      [`${prefixCls}-thumb`]: true,
      [`${prefixCls}-thumb-disabled`]: failedMessage !== null,
    });

    const wrapStyle = { width, height };

    return (
      <div className={`${prefixCls}-wrap`} style={wrapStyle}>
        <div className={thumbCls} onClick={this.handleThumbClick}>
          {failedMessage === null ? (
            <div
              className={classnames([
                `${prefixCls}-thumb-status`,
                `${prefixCls}-thumb-big-play-button`,
              ])}
            >
              <Icon type="play" />
            </div>
          ) : (
            <div
              className={classnames([
                `${prefixCls}-thumb-status`,
                `${prefixCls}-thumb-failed-message`,
              ])}
            >
              <span>{failedMessage}</span>
            </div>
          )}
          <Video
            width={width}
            height={height}
            poster={poster}
            sources={otherVideoProps.sources}
            controls={false}
          />
        </div>
        <VideoModal
          {...otherModalProps}
          visible={videoModalVisible}
          afterClose={this.onClose}
          onCancel={this.handleCancel}
        >
          <Video {...otherVideoProps} ref={this.video} autoplay={true} bigPlayButton={false} />
        </VideoModal>
      </div>
    );
  }
}

export default VideoViewer;
