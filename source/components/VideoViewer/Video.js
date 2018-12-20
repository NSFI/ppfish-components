import React from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import vjsDownLoad from './component/vjsDownLoad';
import vjsFullScreen from './component/vjsFullScreen';
import vjsVolume from './component/vjsVolume';
import vjsPlay from './component/vjsPlay';
import { zh_CN } from './lang/zh-CN';

videojs.addLanguage("zh-CN",zh_CN);

require('!style-loader!css-loader!video.js/dist/video-js.css');
require('!style-loader!css-loader!./style/Video.css');

export default class VideoViewer extends React.Component {

  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    poster: PropTypes.string,
    sources: PropTypes.array,
    autoplay: PropTypes.bool,
    loop: PropTypes.bool,
    muted: PropTypes.bool,
    preload: PropTypes.oneOf(['auto', 'none', 'metadata']),
    controls: PropTypes.bool,
    download: PropTypes.bool,
    bigPlayButton: PropTypes.bool
  }

  static defaultProps = {
    prefixCls: 'fishd-video-js',
    className: 'video-js',
    width: 640,                   // 视频容器的宽度
    height: 360,                  // 视频容器的高度
    poster: '',                   // 播放前显示的视频画面，播放开始之后自动移除。通常传入一个URL
    sources: [],                  // 资源文件
    autoplay: false,              // 播放器准备好之后，是否自动播放
    loop: false,                  // 视频播放结束后，是否循环播放
    muted: false,                 // 是否静音
    preload: 'auto',              // 预加载('auto' 自动 ’metadata' 元数据信息 ，比如视频长度，尺寸等 'none'  不预加载任何数据，直到用户开始播放才开始下载)
    controls: true,               // 是否显示控制条
    download: false,              // 是否显示下载按钮
    bigPlayButton: true           // 是否显示大按钮
  }

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    const {
      className,
      download,
      bigPlayButton,
      ...otherProps
    } = this.props;

    const initOptions = {
      //aspectRatio: '16:9',
      //autoSetup: false,
      //fluid: true,
      //inactivityTimeout: 3000,
      //liveui: true,
      //notSupportedMessage: '',
      //responsive: true,
      loadingSpinner: true,
      bigPlayButton: bigPlayButton,
      controlBar: {
        children: [
          {
            name: 'progressControl'
          },
          {
            name: 'vjsPlay',
          },
          {
            name: 'currentTimeDisplay',

          },
          {
            name: 'timeDivider',
          },
          {
            name: 'durationDisplay'
          },
          {
            name: 'vjsFullScreen'
          },
          {
            name: download ? 'vjsDownLoad' : ''
          },
          {
            name: 'vjsVolume'
          },
        ]
      },
      errorDisplay: true
    };

    const option = Object.assign({}, initOptions, otherProps);

    // instantiate video.js
    this.player = videojs(this.videoNode, option, function onPlayerReady() {
      //console.log('onPlayerReady', this);
    });
  }

  // destroy player on unmount
  componentWillUnmount () {
    if (this.player) {
      this.player.dispose();
    }
  }

  getVideoPlayer = () => {
    return this.player;
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/ video.js /pull/3856
  render () {
    const {
      prefixCls,
      className,
    } = this.props;

    return (
      <div className={`${prefixCls}-wrap`}>
        <div data-vjs-player>
          <video
            ref={node => this.videoNode = node}
            className={className}
          />
        </div>
      </div>
    );
  }
}
