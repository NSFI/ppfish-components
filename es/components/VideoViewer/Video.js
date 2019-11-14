function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import vjsDownLoad from './component/vjsDownLoad';
import vjsFullScreen from './component/vjsFullScreen';
import vjsVolume from './component/vjsVolume';
import vjsPlay from './component/vjsPlay';
import vjsErrorDisplay from './component/vjsErrorDisplay';
import { zh_CN } from './lang/zh-CN';
import KEYCODE from '../../utils/KeyCode';
videojs.addLanguage("zh-CN", zh_CN);
import 'video.js/dist/video-js.css';
import './style/Video.css';

var VideoViewer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VideoViewer, _React$Component);

  function VideoViewer(props) {
    var _this;

    _classCallCheck(this, VideoViewer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VideoViewer).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getVideoPlayer", function () {
      return _this.player;
    });

    _defineProperty(_assertThisInitialized(_this), "handleSpaceKeyDown", function (e) {
      if (e.which === KEYCODE.SPACE) {
        e.preventDefault();

        if (_this.player) {
          if (_this.player.paused()) {
            _this.player.play();
          } else {
            _this.player.pause();
          }
        }
      }
    });

    return _this;
  }

  _createClass(VideoViewer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          download = _this$props.download,
          bigPlayButton = _this$props.bigPlayButton,
          otherProps = _objectWithoutProperties(_this$props, ["download", "bigPlayButton"]);

      var initOptions = {
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
          children: [{
            name: 'progressControl'
          }, {
            name: 'vjsPlay'
          }, {
            name: 'currentTimeDisplay'
          }, {
            name: 'timeDivider'
          }, {
            name: 'durationDisplay'
          }, {
            name: 'vjsFullScreen'
          }, {
            name: download ? 'vjsDownLoad' : ''
          }, {
            name: 'vjsVolume'
          }]
        },
        errorDisplay: {
          children: [{
            name: 'vjsErrorDisplay'
          }]
        }
      };
      var option = Object.assign({}, initOptions, otherProps); // instantiate video.js

      this.player = videojs(this.videoNode, option, function () {
        _this2.player.on('timeupdate', function (e) {
          // 控制焦点
          _this2.videoPlayerRef.focus();
        });
      });
    } // destroy player on unmount

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.player) {
        this.player.dispose();
      }
    }
  }, {
    key: "render",
    // wrap the player in a div with a `data-vjs-player` attribute
    // so videojs won't create additional wrapper in the DOM
    // see https://github.com/videojs/ video.js /pull/3856
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          className = _this$props2.className;
      return React.createElement("div", {
        className: "".concat(prefixCls, "-wrap")
      }, React.createElement("div", {
        "data-vjs-player": true,
        ref: function ref(node) {
          return _this3.videoPlayerRef = node;
        },
        onKeyDown: this.handleSpaceKeyDown
      }, React.createElement("video", {
        ref: function ref(node) {
          return _this3.videoNode = node;
        },
        className: className
      })));
    }
  }]);

  return VideoViewer;
}(React.Component);

_defineProperty(VideoViewer, "propTypes", {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  poster: PropTypes.string,
  sources: PropTypes.array,
  autoplay: PropTypes.bool,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  preload: PropTypes.oneOf(['auto', 'none', 'metadata']),
  controls: PropTypes.bool,
  download: PropTypes.bool,
  bigPlayButton: PropTypes.bool
});

_defineProperty(VideoViewer, "defaultProps", {
  prefixCls: 'fishd-video-js',
  className: 'video-js',
  width: 640,
  // 视频容器的宽度
  height: 360,
  // 视频容器的高度
  poster: '',
  // 播放前显示的视频画面，播放开始之后自动移除。通常传入一个URL
  sources: [],
  // 资源文件
  autoplay: false,
  // 播放器准备好之后，是否自动播放
  loop: false,
  // 视频播放结束后，是否循环播放
  muted: false,
  // 是否静音
  preload: 'auto',
  // 预加载('auto' 自动 ’metadata' 元数据信息 ，比如视频长度，尺寸等 'none'  不预加载任何数据，直到用户开始播放才开始下载)
  controls: true,
  // 是否显示控制条
  download: false,
  // 是否显示下载按钮
  bigPlayButton: true // 是否显示大按钮

});

export { VideoViewer as default };