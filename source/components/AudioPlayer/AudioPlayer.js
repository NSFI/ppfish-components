import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Slider from '../Slider/index.tsx';
import Icon from '../Icon/index.tsx';
import Popover from '../Popover/index.tsx';

class AudioPlayer extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf(['default', 'small']),
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
    rateOptions: PropTypes.object,
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
    size: 'default',
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
    rateOptions:{
      value: 0,
    },
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
      rateOpen: false,                                  // 是否打开播放速度调节
      allTime: 0,
      currentTime: 0,
      disabled: !this.props.src,                        // 初始src为空时禁用组件
      rate: this.props.rateOptions.value || 1           // 播放速度
    };
    this.audioInstance = null;
  }

  componentDidMount(){
    this.controlAudio('changeRate',this.state.rate);
    if(this.props.autoPlay){
      this.audioInstance.play();
    }
  }

  controlAudio = (type, value) => {
    const audio = this.audioInstance;
    const numberValue = Number(value);
    switch(type) {
      case 'allTime':
        this.setState({
          allTime: audio.duration,
          // 音频总时长为0时禁用组件
          disabled: parseInt(audio.duration) === 0
        });
        this.props.onCanPlay();
        break;
      case 'play':
        if(this.state.disabled) {
          return;
        }
        audio.play();
        this.setState({
          isPlay: true
        });
        break;
      case 'pause':
        if(this.state.disabled) {
          return;
        }
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
      case 'changeRate':
        if(Number.isNaN(numberValue)){
          throw(new Error(`rateOptions props error:
          rateOptions.value or item of rateOptions.range can not convert to number`));
        }
        audio.playbackRate = numberValue;
        this.setState({
          rate: value,
          rateOpen: false
        });
        break;
    }
  }

  millisecondToDate = (time, format=true) => {
    const second = Math.floor(time % 60);
    let minute = Math.floor(time / 60);
    if(!format) { return minute*60 + second; }
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
  // 调节播放速度板状态变化
  onRateVisibleChange = (state) => {
    this.setState({
      rateOpen: state
    });
  };

  render() {
    const { isPlay, isMuted, allTime, currentTime, currentVolume, volumeOpen, rateOpen, disabled, rate } = this.state;
    const {
      prefixCls,
      title,
      src,
      autoPlay,
      className,
      size,
      loop,
      preload,
      controlVolume,
      controlProgress,
      displayTime,
      download,
      rateOptions,
      onCanPlay,
      onLoadedMetadata,
      onCanPlayThrough,
      onAbort,onEnded, onError, onPause, onPlay, onSeeked, ...otherProps
    } = this.props;

    const {value:rateValue = 0, suffix:rateSuffix = 'x', decimal:rateDecimal = 1, range:rateRange = []}=rateOptions;
    const getRateText = (number) => `${Number(number).toFixed(rateDecimal)}${rateSuffix}`;

    const sizeCls = size === 'small' ? 'sm' : '';
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
      <div className={classNames(prefixCls, className, {[`${prefixCls}-${sizeCls}`]: sizeCls})}>
        <div className={classNames(`${prefixCls}-wrap`, {[`${prefixCls}-${sizeCls}-wrap`]: sizeCls})} title={title}>
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

          <div
            className={`box pause-play-box pause-play-box-${disabled ? 'disabled': 'enable'}`}
            onClick={() => this.controlAudio(isPlay ? 'pause' : 'play')}
          >
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
                  max={this.millisecondToDate(allTime, false)}
                  value={currentTime}
                  disabled={disabled}
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

          {rateRange.length ? (
            <Popover
              overlayClassName="change-audio-rate"
              trigger="click"
              placement="top"
              visible={rateOpen}
              onVisibleChange={this.onRateVisibleChange}
              getPopupContainer={node => node.parentNode}
              content={rateRange.map(rateItem => (
                <p
                  className="change-audio-rate-item"
                  key={`rate-${rateItem}`}
                  onClick={() => {
                    this.controlAudio("changeRate", rateItem);
                  }}
                >{getRateText(rateItem)}</p>
              ))}
            >
              {<p className="box rate-box">{getRateText(rate)}</p>}
            </Popover>
          ) : rateValue ? (
            <p className="box rate-box">{getRateText(rateValue)}</p>
          ) : null}

          {
            download ?
              <div className="box download-box">
                <a download target="_blank" rel="noopener noreferrer" href={src}>
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
