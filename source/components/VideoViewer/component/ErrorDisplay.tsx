import React, { Component } from 'react';
import type { VideoJsPlayer } from 'video.js';
import Icon from '../../Icon/index';
import { MEDIA_ERROR } from '../constant';
import ConfigConsumer from '../../Config/Consumer';

interface ErrorDisplayProps {
  prefixCls?: string;
  vjsComponent: any;
}

interface ErrorDisplayState {
  mediaError: MediaError;
}

export default class ErrorDisplay extends Component<ErrorDisplayProps, ErrorDisplayState> {
  static defaultProps = {
    prefixCls: 'fishd-video-error',
  };

  public player: VideoJsPlayer;

  constructor(props) {
    super(props);

    // 获取播放器实例
    this.player = props.vjsComponent.player_;

    this.state = {
      // MediaError对象, 包含了音频/视频的错误状态。http://www.w3school.com.cn/tags/av_prop_error.asp
      mediaError: null,
    };
  }

  componentDidMount() {
    this.player.on('error', this.getMediaError);
  }

  componentWillUnmount() {
    this.player.off('error', this.getMediaError);
  }

  getMediaError = () => {
    this.setState({
      mediaError: this.player.error(),
    });
  };

  // 断网重试
  handleRetry = () => {
    const currentTime = this.player.currentTime();
    this.player.error(null);
    this.player.pause();
    this.player.load();
    this.player.currentTime(currentTime);
    this.player.play();
  };

  render() {
    const { vjsComponent, prefixCls } = this.props;
    const { mediaError } = this.state;

    const errorMessage = mediaError !== null ? MEDIA_ERROR[mediaError.code] : '';

    return (
      <ConfigConsumer componentName="VideoViewer">
        {Locale => {
          return (
            <div className={prefixCls}>
              {mediaError ? (
                <div className={`${prefixCls}-msg`}>
                  {errorMessage}
                  {mediaError.code === 2 ? (
                    <a className={`${prefixCls}-retry`} onClick={this.handleRetry}>
                      <Icon type="picture-rotate" />
                      {Locale.retry}
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        }}
      </ConfigConsumer>
    );
  }
}
