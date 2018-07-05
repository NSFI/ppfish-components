import React from 'react';
import { Slider } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Trigger from 'rc-trigger';
import placements from './placements';

import './index.less';

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
    controllVolume: PropTypes.bool,
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
    prefixCls: 'audio-player',
    className: '',
    title: '',
    src: '',
    loop: false,
    preload: 'metadata',
    autoPlay: false,
    muted: false,
    volume: 1.0,
    controllVolume: true,
    download: true,
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
      isPlay: this.props.autoPlay,                     // 是否随即播放
      isMuted: this.props.muted,                       // 是否静音
      currentVolume: parseInt(this.props.volume * 10), // 当前音量
      allTime: 0,                                      // 总时长
      currentTime: 0,                                  // 当前播放时间
      volumeChangeOpen: false                          // 是否打开音量控制
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
        audio.volume = value / 10;
        this.setState({
          currentVolume: value,
          isMuted: !value
        });
        break;
    }
  }

  millisecondToDate = (time) => {
    const second = Math.floor(time % 60);
    let minite = Math.floor(time / 60);
    // let hour
    // if(minite > 60) {
    //   hour = minite / 60
    //   minite = minite % 60
    //   return `${Math.floor(hour)}:${Math.floor(minite)}:${Math.floor(second)}`
    // }
    return `${minite}:${second >= 10 ? second : `0${second}`}`;
  }

  getChangeVolumeElement = () => {
    const { currentVolume } = this.state;
    return (
      <div className="change-audio-volume-box">
        <Slider
          vertical
          min={0}
          max={10}
          step={1}
          defaultValue={currentVolume}
          tipFormatter={value => value == 0 ? '0.0' : value / 10}
          onChange={(value) => this.controlAudio('changeVolume', value)}
        />
      </div>
    );
  }

  // 调节音量面板状态变化
  onVolumeVisibleChange = (state) => {
    this.setState({
      volumeChangeOpen: state
    });
  }

  render() {
    const { isPlay, isMuted, allTime, currentTime, volume, volumeChangeOpen } = this.state;
    const {
      prefixCls,
      title,
      src,
      className,
      loop,
      preload,
      controllVolume,
      download,
      onCanPlay,
      onLoadedMetadata,
      onCanPlayThrough,
      onAbort,onEnded, onError, onPause, onPlay, onSeeked, ...otherProps } = this.props;

    const wrapClass = [`m-${prefixCls}-wrap`, className];
    const pausePlayClass = classNames({
      'iconfont': true,
      'icon-youjiantou1': !isPlay,
      'icon-guanbi': isPlay
    });
    const volumeClass = classNames({
      'iconfont': true,
      'icon-yingxiaoguanli': !isMuted,
      'icon-guanbi': isMuted
    });

    return (
      <div className={wrapClass.join(' ')} title={title}>
        <div className="audio-box">
          <audio
            ref={instance => this.audioInstance = instance}
            src={src}
            preload={preload}
            loop={loop}
            volume={volume}
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
        <div className="box pause-play-box">
          <i
            className={pausePlayClass}
            onClick={() => this.controlAudio(isPlay ? 'pause' : 'play')}
          />
        </div>
        <div className="box step-box">
          <Slider
            step={1}
            min={0}
            max={allTime}
            value={currentTime}
            tipFormatter={value => this.millisecondToDate(value)}
            onChange={(value) => this.controlAudio('changeCurrentTime', value)}
          />
        </div>
        <div className="box time-box">
          <span className="current">
            {this.millisecondToDate(currentTime)+' / '+this.millisecondToDate(allTime)}
          </span>
        </div>
        {
          controllVolume ?
            <div className="box volume-box">
              <Trigger
                action={['click']}
                prefixCls="change-audio-volume"
                builtinPlacements={placements}
                popupPlacement='topLeft'
                popup={this.getChangeVolumeElement()}
                popupVisible={volumeChangeOpen}
                onPopupVisibleChange={this.onVolumeVisibleChange}
                destroyPopupOnHide
              >
                <i className={volumeClass}/>
              </Trigger>
            </div>
            :
            null
        }
        {
          download ?
            <div className="box download-box">
              <a download="audio" href={src}>
                <i className="iconfont icon-xiajiantou" />
              </a>
            </div>
            :
            null
        }
      </div>
    );
  }
}

export default AudioPlayer;
