import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.less';

class AudioPlayer extends React.Component {
  static propTypes = {

  };

  static defaultProps = {
    id: '',
    title: '',
    src: '',
    className: '',
    loop: false,
    preload: 'metadata',
    autoPlay: false,
    muted: false,
    volume: 1.0,
    controllVolume: true,
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
      isPlay: this.props.autoPlay,
      isMuted: this.props.muted,
      volume: this.props.volume,
      allTime: 0,
      currentTime: 0
    };
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

  controlAudio = (type, value) => {
    const { id, onCanPlay } = this.props;
    const audio = document.getElementById(`audio${id}`);
    switch(type) {
      case 'allTime':
        this.setState({
          allTime: audio.duration
        });
        onCanPlay();
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
      case 'muted':
        this.setState({
          isMuted: !audio.muted
        });
        audio.muted = !audio.muted;
        break;
      case 'changeCurrentTime':
        let currentTimeValue = value.target.value;
        this.setState({
          currentTime: currentTimeValue
        });
        audio.currentTime = currentTimeValue;
        if(currentTimeValue == audio.duration) {
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
          volume: value,
          isMuted: !value
        });
        break;
    }
  }

  render() {
    const { isPlay, isMuted, allTime, currentTime, volume} = this.state;
    const { id, title, src, className, loop, preload, controllVolume, onCanPlay, onLoadedMetadata, onCanPlayThrough, onAbort,onEnded, onError, onPause, onPlay, onSeeked, ...otherProps} = this.props;

    let pausePlayClass = classNames({
      'iconfont': true,
      'icon-youjiantou1': !isPlay,
      'icon-guanbi': isPlay
    });
    let volumeClass = classNames({
      'iconfont': true,
      'icon-yingxiaoguanli': !isMuted,
      'icon-guanbi': isMuted
    })
    return (
      <div className="m-audio-player-container">
        <div className="audio-box">
          <audio
            id={`audio${id}`}
            title={title}
            src={src}
            className={`audio-player ${className}`}
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
        <div className="box time-box">
          <span className="current">
            {this.millisecondToDate(currentTime)+'/'+this.millisecondToDate(allTime)}
          </span>
        </div>
        <div className="box step-box">
          <input
            type="range"
            className="time"
            step="0.01"
            max={allTime}
            value={currentTime}
            onChange={(value) => this.controlAudio('changeCurrentTime', value)}
          />
        </div>
        {
          controllVolume ?
            <div className="box volume-box">
              <i
                className={volumeClass}
                onClick={() => this.controlAudio('muted')}
              />
            </div>
            :
            null
        }
      </div>
    );
  }
}

export default AudioPlayer;
