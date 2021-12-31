import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from '../../Icon/index';
import type { VideoJsPlayer } from 'video.js';

interface PlayProps {
  prefixCls?: string;
  vjsComponent: any;
}

interface PlayState {
  isPlay: boolean;
}

export default class Play extends Component<PlayProps, PlayState> {
  static defaultProps = {
    prefixCls: 'fishd-video-viewer-play',
  };

  public player: VideoJsPlayer;

  constructor(props) {
    super(props);

    // 获取播放器实例
    this.player = props.vjsComponent.player_;

    this.state = {
      isPlay: false,
    };
  }

  componentDidMount() {
    this.player.on('play', this.setPlay(true));
    this.player.on('pause', this.setPlay(false));
    this.player.on('ended', this.setPlay(false));
  }

  componentWillUnmount() {
    this.player.off('play', this.setPlay(true));
    this.player.off('pause', this.setPlay(false));
    this.player.off('ended', this.setPlay(false));
  }

  handleClick = () => {
    const { isPlay } = this.state;

    if (!isPlay) {
      this.player.play();
    } else {
      this.player.pause();
    }

    this.setState({
      isPlay: !isPlay,
    });
  };

  setPlay = isPlay => {
    return () => {
      this.setState({
        isPlay: isPlay,
      });
    };
  };

  render() {
    const { prefixCls } = this.props;
    const { isPlay } = this.state;

    const pausePlayIcon = !isPlay ? 'play' : 'stop';

    return (
      <div
        className={classnames(prefixCls, 'fishd-video-js-customer-button')}
        onClick={() => this.handleClick()}
      >
        <a>
          <Icon className={`${prefixCls}-customer-handle`} type={pausePlayIcon} />
        </a>
      </div>
    );
  }
}
