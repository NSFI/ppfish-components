import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../../Icon/index.tsx';
import Popover from '../../Popover/index.tsx';
import Slider from '../../Slider/index.tsx';

export default class FullScreen extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    vjsComponent: PropTypes.object
  };

  static defaultProps = {
    prefixCls: 'fishd-video-viewer-volume'
  }

  constructor(props) {
    super(props);

    this.player = props.vjsComponent.player_;

    this.state = {
      isMuted: false,                                        // 是否静音
      currentVolume: parseInt(this.player.volume() * 100),   // 当前音量
      lastVolume: parseInt(this.player.volume() * 100),      // 记录上一次音量，点击音量时恢复
      volumeOpen: false,                                     // 是否打开音量控制
    };
  }

  // 音量值变化
  handleChangeVolume = (value) => {
    this.setState({
      currentVolume: value,
      lastVolume: value,
      isMuted: !value
    });
  }

  // 音量面板状态变化
  onVolumeVisibleChange = (state) => {
    this.setState({
      volumeOpen: state
    });
  }

  // 点击音量
  handleVolumeClick = () => {
    const { isMuted, lastVolume } = this.state;
    this.setState({
      isMuted: !isMuted,
      currentVolume: isMuted ? lastVolume : 0
    });
  }

  render() {
    const { prefixCls } = this.props;
    const { isMuted, currentVolume, volumeOpen } = this.state;

    // 设置播放器音量
    this.player.volume(currentVolume / 100);

    const volumeIcon = () => {
      if (isMuted || currentVolume === 0) {
        return 'sound-mute';
      } else if (currentVolume > 0 && currentVolume <= 50) {
        return 'sound-medium';
      } else {
        return 'sound-loud';
      }
    };
    const getVolumePopupContent = () => {
      return (
        <div className={`${prefixCls}-volume-box`}>
          <div className={`${prefixCls}-volume-value`}>{currentVolume}%</div>
          <div className={`${prefixCls}-volume-slider`}>
            <Slider
              vertical
              min={0}
              max={100}
              step={1}
              handle={<div className={`${prefixCls}-customer-handle`}><Icon type="sound-drag"/></div>}
              tipFormatter={null}
              value={currentVolume}
              onChange={(value) => this.handleChangeVolume(value)}
            />
          </div>
        </div>
      );
    };

    return (
      <div className={classnames(prefixCls, "fishd-video-js-customer-button")}>
        <Popover
          trigger="hover"
          placement="top"
          content={getVolumePopupContent(currentVolume)}
          visible={volumeOpen}
          onVisibleChange={this.onVolumeVisibleChange}
          getPopupContainer={(node)=>node.parentNode}
        >
          <Icon className="control-volume" type={volumeIcon()} onClick={this.handleVolumeClick}/>
        </Popover>
      </div>
    );
  }
}
