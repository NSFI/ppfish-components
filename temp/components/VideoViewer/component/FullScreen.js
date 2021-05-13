import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../../Icon/index.js';
import Tooltip from '../../Tooltip/index.js';
import ConfigConsumer from '../../Config/Consumer';

export default class FullScreen extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    vjsComponent: PropTypes.object
  };

  static defaultProps = {
    prefixCls: 'fishd-video-viewer-fullscreen'
  }

  constructor(props) {
    super(props);

    // 获取播放器实例
    this.player = props.vjsComponent.player_;

    this.state = {
      isFullScreen: this.player.isFullscreen()
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
      isFullScreen: this.player.isFullscreen()
    });
  }

  handleClick = () => {
    const { isFullScreen } = this.state;

    if (!isFullScreen) {
      this.player.requestFullscreen();

    } else {
      this.player.exitFullscreen();
    }

    this.setState({
      isFullScreen: !isFullScreen
    });
  }

  render() {
    const { prefixCls } = this.props;
    const { isFullScreen } = this.state;

    return (
      <ConfigConsumer componentName="VideoViewer">
        {
          (Locale) => {
            const title = !isFullScreen ? Locale.fullScreen : Locale.cancelFullScreen;
            return (
              <div
                className={classnames(prefixCls, "fishd-video-js-customer-button")}
                onClick={() => this.handleClick()}
              >
                <Tooltip
                  title={<span style={{ wordBreak: 'keep-all' }}>{title}</span>}
                  getPopupContainer={(e) => e.parentNode} >
                  <a>
                    {
                      !isFullScreen ? <Icon type="video-fullscreen" /> : <Icon type="video-shrink" />
                    }
                  </a>
                </Tooltip>
              </div>
            );
          }
        }
      </ConfigConsumer>
    );
  }
}
