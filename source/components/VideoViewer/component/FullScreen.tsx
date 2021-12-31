import React, { Component } from 'react';
import classnames from 'classnames';
import type { VideoJsPlayer } from 'video.js';
import Icon from '../../Icon/index';
import Tooltip from '../../Tooltip/index';
import ConfigConsumer from '../../Config/Consumer';

interface FullScreenProps {
  prefixCls?: string;
  vjsComponent: any;
}

interface FullScreenState {
  isFullScreen: boolean;
}

export default class FullScreen extends Component<FullScreenProps, FullScreenState> {
  static defaultProps = {
    prefixCls: 'fishd-video-viewer-fullscreen',
  };

  public player: VideoJsPlayer;

  constructor(props) {
    super(props);

    // 获取播放器实例
    this.player = props.vjsComponent.player_;

    this.state = {
      isFullScreen: this.player.isFullscreen(),
    };
  }

  componentDidMount() {
    this.player.on('fullscreenchange', this.setFullScreen);
  }

  componentWillUnmount() {
    this.player.off('fullscreenchange', this.setFullScreen);
  }

  setFullScreen = () => {
    this.setState({
      isFullScreen: this.player.isFullscreen(),
    });
  };

  handleClick = () => {
    const { isFullScreen } = this.state;

    if (!isFullScreen) {
      this.player.requestFullscreen();
    } else {
      this.player.exitFullscreen();
    }

    this.setState({
      isFullScreen: !isFullScreen,
    });
  };

  render() {
    const { prefixCls } = this.props;
    const { isFullScreen } = this.state;

    return (
      <ConfigConsumer componentName="VideoViewer">
        {Locale => {
          const title = !isFullScreen ? Locale.fullScreen : Locale.cancelFullScreen;
          return (
            <div
              className={classnames(prefixCls, 'fishd-video-js-customer-button')}
              onClick={() => this.handleClick()}
            >
              <Tooltip
                title={<span style={{ wordBreak: 'keep-all' }}>{title}</span>}
                getPopupContainer={e => e.parentElement}
              >
                <a>
                  {!isFullScreen ? <Icon type="video-fullscreen" /> : <Icon type="video-shrink" />}
                </a>
              </Tooltip>
            </div>
          );
        }}
      </ConfigConsumer>
    );
  }
}
