import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Slider from '../Slider/index.tsx';
import Icon from '../Icon/index.tsx';
import Popover from '../Popover/index.tsx';

import './style/AudioPlayer.less';

class AudioPlayer extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string.isRequired,
    className: PropTypes.string,
    title: PropTypes.string,
    src: PropTypes.string,
    loop: PropTypes.bool,
    preload: PropTypes.string,
    autoPlay: PropTypes.bool,
    muted: PropTypes.bool,
    volume: PropTypes.number,
    controlVolume: PropTypes.bool,
    controlProgress: PropTypes.bool,
    displayTime: PropTypes.bool,
    download: PropTypes.bool,
    onLoadedMetadata: PropTypes.func,
    onCanPlay: PropTypes.func,
    onCanPlayThrough: PropTypes.func,
    onAbort: PropTypes.func,
    onEnded: PropTypes.func,
    onError: PropTypes.func,
    onPause: PropTypes.func,
    onPlay: PropTypes.func,
    onSeeked: PropTypes.func,
  };

  static defaultProps = {
    prefixCls: 'fishd-audio-player',
    className: '',
    title: '',
    src: '',
    loop: false,
    preload: 'metadata',
    autoPlay: false,
    muted: false,
    volume: 1.0,
    controlVolume: true,
    controlProgress: true,
    displayTime: true,
    download: false,
    onLoadedMetadata: () => {},  // 当浏览器已加载音频的元数据时的回调
    onCanPlay: () => {},         // 当浏览器能够开始播放音频时的回调
    onCanPlayThrough: () => {},  // 当浏览器可在不因缓冲而停顿的情况下进行播放时的回调
    onAbort: () => {},           // 当音频的加载已放弃时(如切换到其他资源)的回调
    onEnded: () => {},           // 当目前的播放列表已结束时的回调
    onError: () => {},           // 当在音频加载期间发生错误时的回调
    onPause: () => {},           // 当音频暂停时的回调
    onPlay: () => {},            // 当音频已开始或不再暂停时的回调
    onSeeked: () => {},          // 当用户已移动/跳跃到音频中的新位置时的回调
  };

  constructor(props) {
    super(props);
    this.state = {
      isPlay: this.props.autoPlay,                      // 是否随即播放
      isMuted: this.props.muted,                        // 是否静音
      currentVolume: parseInt(this.props.volume * 100), // 当前音量
      volumeOpen: false,                                // 是否打开音量控制
      allTime: 0,
      currentTime: 0,
    };
    this.audioInstance = null;
  }

  controlAudio = (type, value) => {
    const audio = this.audioInstance;
    switch(type) {
      case 'allTime':
        this.setState({
          allTime: audio.duration
        });
        this.props.onCanPlay();
        break;
      case 'play':
        audio.play();
        this.setState({
          isPlay: true
        });
        break;
      case 'pause':
        audio.pause();
        this.setState({
          isPlay: false
        });
        break;
      case 'changeCurrentTime':
        this.setState({
          currentTime: value
        });
        audio.currentTime = value;
        if(value == audio.duration) {
          this.setState({
            isPlay: false
          });
        }
        break;
      case 'getCurrentTime':
        this.setState({
          currentTime: audio.currentTime
        });
        if(audio.currentTime == audio.duration) {
          this.setState({
            isPlay: false
          });
        }
        break;
      case 'changeVolume':
        audio.volume = value / 100;
        this.setState({
          currentVolume: value,
          isMuted: !value
        });
        break;
    }
  }

  millisecondToDate = (time) => {
    const second = Math.floor(time % 60);
    let minute = Math.floor(time / 60);
    let hour;
    if(minute > 60) {
      hour = minute / 60;
      minute = minute % 60;
      return `${Math.floor(hour)}:${Math.floor(minute)}:${Math.floor(second)}`;
    }
    return `${minute}:${second >= 10 ? second : `0${second}`}`;
  }

  getVolumePopupContent = () => {
    const { currentVolume } = this.state;
    return (
      <div className="change-audio-volume-box">
        <div className="change-audio-volume-value">{currentVolume}%</div>
        <div className="change-audio-volume-slider">
          <Slider
            vertical
            min={0}
            max={100}
            step={1}
            handle={<div className="change-audio-volume-customer-handle"><Icon type="sound-drag"/></div>}
            tipFormatter={null}
            defaultValue={currentVolume}
            onChange={(value) => this.controlAudio('changeVolume', value)}
          />
        </div>
      </div>
    );
  }

  // 调节音量面板状态变化
  onVolumeVisibleChange = (state) => {
    this.setState({
      volumeOpen: state
    });
  }

  render() {
    const { isPlay, isMuted, allTime, currentTime, currentVolume, volumeOpen } = this.state;
    const {
      prefixCls,
      title,
      src,
      className,
      loop,
      preload,
      controlVolume,
      controlProgress,
      displayTime,
      download,
      onCanPlay,
      onLoadedMetadata,
      onCanPlayThrough,
      onAbort,onEnded, onError, onPause, onPlay, onSeeked, ...otherProps } = this.props;

    const wrapClass = classNames(`${prefixCls}-wrap`, className);
    const pausePlayIcon = !isPlay ? 'play' : 'stop';
    const volumeIcon = () => {
      if (isMuted || currentVolume === 0) {
        return 'sound-mute';
      } else if (currentVolume > 0 && currentVolume <= 50) {
        return 'sound-medium';
      } else {
        return 'sound-loud';
      }
    };

    return (
      <div className={prefixCls}>
        <div className={classNames(wrapClass)} title={title}>
          <div className="audio-box">
            <audio
              ref={instance => this.audioInstance = instance}
              src={src}
              preload={preload}
              loop={loop}
              volume={currentVolume / 100}
              onCanPlay={() => this.controlAudio('allTime')}
              onTimeUpdate={(e) => this.controlAudio('getCurrentTime')}
              onLoadedMetadata={onLoadedMetadata}
              onCanPlayThrough={onCanPlayThrough}
              onAbort={onAbort}
              onEnded={onEnded}
              onError={onError}
              onPause={onPause}
              onPlay={onPlay}
              onSeeked={onSeeked}
              {...otherProps}
            >
              您的浏览器不支持 audio 标签。
            </audio>
          </div>

          <div className="box pause-play-box" onClick={() => this.controlAudio(isPlay ? 'pause' : 'play')}>
            <Icon
              className="handle-audio-icon pause-play"
              type={pausePlayIcon}
            />
          </div>

          {
            controlProgress ?
              <div className="box step-box">
                <Slider
                  step={1}
                  min={0}
                  max={allTime}
                  value={currentTime}
                  tipMode="all"
                  tipFormatter={value => this.millisecondToDate(value)}
                  onChange={(value) => this.controlAudio('changeCurrentTime', value)}
                />
              </div>
              :
              null
          }

          {
            displayTime ?
              <div className="box time-box">
                <span className="current">
                  {this.millisecondToDate(currentTime)+' / '+this.millisecondToDate(allTime)}
                </span>
              </div>
              :
              null
          }

          {
            controlVolume ?
              <Popover
                overlayClassName="change-audio-volume"
                trigger="click"
                placement="top"
                content={this.getVolumePopupContent()}
                visible={volumeOpen}
                onVisibleChange={this.onVolumeVisibleChange}
                getPopupContainer={(node)=>node.parentNode}
              >
                <div className="box volume-box">
                  <Icon className="handle-audio-icon control-volume" type={volumeIcon()}/>
                </div>
              </Popover>
              :
              null
          }
          {
            download ?
              <div className="box download-box">
                <a download href={src}>
                  <Icon className="handle-audio-icon download" type="sound-download" />
                </a>
              </div>
              :
              null
          }
        </div>
      </div>
    );
  }
}

export default AudioPlayer;
