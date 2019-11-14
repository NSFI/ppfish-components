"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("../Slider/index.js"));

var _index2 = _interopRequireDefault(require("../Icon/index.js"));

var _index3 = _interopRequireDefault(require("../Popover/index.js"));

require("./style/AudioPlayer.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var AudioPlayer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AudioPlayer, _React$Component);

  function AudioPlayer(props) {
    var _this;

    _classCallCheck(this, AudioPlayer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AudioPlayer).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "controlAudio", function (type, value) {
      var audio = _this.audioInstance;

      switch (type) {
        case 'allTime':
          _this.setState({
            allTime: audio.duration,
            // 音频总时长为0时禁用组件
            disabled: parseInt(audio.duration) === 0
          });

          _this.props.onCanPlay();

          break;

        case 'play':
          if (_this.state.disabled) {
            return;
          }

          audio.play();

          _this.setState({
            isPlay: true
          });

          break;

        case 'pause':
          if (_this.state.disabled) {
            return;
          }

          audio.pause();

          _this.setState({
            isPlay: false
          });

          break;

        case 'changeCurrentTime':
          _this.setState({
            currentTime: value
          });

          audio.currentTime = value;

          if (value == audio.duration) {
            _this.setState({
              isPlay: false
            });
          }

          break;

        case 'getCurrentTime':
          _this.setState({
            currentTime: audio.currentTime
          });

          if (audio.currentTime == audio.duration) {
            _this.setState({
              isPlay: false
            });
          }

          break;

        case 'changeVolume':
          audio.volume = value / 100;

          _this.setState({
            currentVolume: value,
            isMuted: !value
          });

          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "millisecondToDate", function (time) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var second = Math.floor(time % 60);
      var minute = Math.floor(time / 60);

      if (!format) {
        return minute * 60 + second;
      }

      var hour;

      if (minute > 60) {
        hour = minute / 60;
        minute = minute % 60;
        return "".concat(Math.floor(hour), ":").concat(Math.floor(minute), ":").concat(Math.floor(second));
      }

      return "".concat(minute, ":").concat(second >= 10 ? second : "0".concat(second));
    });

    _defineProperty(_assertThisInitialized(_this), "getVolumePopupContent", function () {
      var currentVolume = _this.state.currentVolume;
      return _react["default"].createElement("div", {
        className: "change-audio-volume-box"
      }, _react["default"].createElement("div", {
        className: "change-audio-volume-value"
      }, currentVolume, "%"), _react["default"].createElement("div", {
        className: "change-audio-volume-slider"
      }, _react["default"].createElement(_index["default"], {
        vertical: true,
        min: 0,
        max: 100,
        step: 1,
        handle: _react["default"].createElement("div", {
          className: "change-audio-volume-customer-handle"
        }, _react["default"].createElement(_index2["default"], {
          type: "sound-drag"
        })),
        tipFormatter: null,
        defaultValue: currentVolume,
        onChange: function onChange(value) {
          return _this.controlAudio('changeVolume', value);
        }
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "onVolumeVisibleChange", function (state) {
      _this.setState({
        volumeOpen: state
      });
    });

    _this.state = {
      isPlay: _this.props.autoPlay,
      // 是否随即播放
      isMuted: _this.props.muted,
      // 是否静音
      currentVolume: parseInt(_this.props.volume * 100),
      // 当前音量
      volumeOpen: false,
      // 是否打开音量控制
      allTime: 0,
      currentTime: 0,
      disabled: !_this.props.src // 初始src为空时禁用组件

    };
    _this.audioInstance = null;
    return _this;
  }

  _createClass(AudioPlayer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          isPlay = _this$state.isPlay,
          isMuted = _this$state.isMuted,
          allTime = _this$state.allTime,
          currentTime = _this$state.currentTime,
          currentVolume = _this$state.currentVolume,
          volumeOpen = _this$state.volumeOpen,
          disabled = _this$state.disabled;

      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          title = _this$props.title,
          src = _this$props.src,
          className = _this$props.className,
          size = _this$props.size,
          loop = _this$props.loop,
          preload = _this$props.preload,
          controlVolume = _this$props.controlVolume,
          controlProgress = _this$props.controlProgress,
          displayTime = _this$props.displayTime,
          download = _this$props.download,
          onCanPlay = _this$props.onCanPlay,
          onLoadedMetadata = _this$props.onLoadedMetadata,
          onCanPlayThrough = _this$props.onCanPlayThrough,
          onAbort = _this$props.onAbort,
          onEnded = _this$props.onEnded,
          onError = _this$props.onError,
          onPause = _this$props.onPause,
          onPlay = _this$props.onPlay,
          onSeeked = _this$props.onSeeked,
          otherProps = _objectWithoutProperties(_this$props, ["prefixCls", "title", "src", "className", "size", "loop", "preload", "controlVolume", "controlProgress", "displayTime", "download", "onCanPlay", "onLoadedMetadata", "onCanPlayThrough", "onAbort", "onEnded", "onError", "onPause", "onPlay", "onSeeked"]);

      var sizeCls = size === 'small' ? 'sm' : '';
      var pausePlayIcon = !isPlay ? 'play' : 'stop';

      var volumeIcon = function volumeIcon() {
        if (isMuted || currentVolume === 0) {
          return 'sound-mute';
        } else if (currentVolume > 0 && currentVolume <= 50) {
          return 'sound-medium';
        } else {
          return 'sound-loud';
        }
      };

      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(prefixCls, className, _defineProperty({}, "".concat(prefixCls, "-").concat(sizeCls), sizeCls))
      }, _react["default"].createElement("div", {
        className: (0, _classnames["default"])("".concat(prefixCls, "-wrap"), _defineProperty({}, "".concat(prefixCls, "-").concat(sizeCls, "-wrap"), sizeCls)),
        title: title
      }, _react["default"].createElement("div", {
        className: "audio-box"
      }, _react["default"].createElement("audio", _extends({
        ref: function ref(instance) {
          return _this2.audioInstance = instance;
        },
        src: src,
        preload: preload,
        loop: loop,
        volume: currentVolume / 100,
        onCanPlay: function onCanPlay() {
          return _this2.controlAudio('allTime');
        },
        onTimeUpdate: function onTimeUpdate(e) {
          return _this2.controlAudio('getCurrentTime');
        },
        onLoadedMetadata: onLoadedMetadata,
        onCanPlayThrough: onCanPlayThrough,
        onAbort: onAbort,
        onEnded: onEnded,
        onError: onError,
        onPause: onPause,
        onPlay: onPlay,
        onSeeked: onSeeked
      }, otherProps), "\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 audio \u6807\u7B7E\u3002")), _react["default"].createElement("div", {
        className: "box pause-play-box pause-play-box-".concat(disabled ? 'disabled' : 'enable'),
        onClick: function onClick() {
          return _this2.controlAudio(isPlay ? 'pause' : 'play');
        }
      }, _react["default"].createElement(_index2["default"], {
        className: "handle-audio-icon pause-play",
        type: pausePlayIcon
      })), controlProgress ? _react["default"].createElement("div", {
        className: "box step-box"
      }, _react["default"].createElement(_index["default"], {
        step: 1,
        min: 0,
        max: this.millisecondToDate(allTime, false),
        value: currentTime,
        disabled: disabled,
        tipMode: "all",
        tipFormatter: function tipFormatter(value) {
          return _this2.millisecondToDate(value);
        },
        onChange: function onChange(value) {
          return _this2.controlAudio('changeCurrentTime', value);
        }
      })) : null, displayTime ? _react["default"].createElement("div", {
        className: "box time-box"
      }, _react["default"].createElement("span", {
        className: "current"
      }, this.millisecondToDate(currentTime) + ' / ' + this.millisecondToDate(allTime))) : null, controlVolume ? _react["default"].createElement(_index3["default"], {
        overlayClassName: "change-audio-volume",
        trigger: "click",
        placement: "top",
        content: this.getVolumePopupContent(),
        visible: volumeOpen,
        onVisibleChange: this.onVolumeVisibleChange,
        getPopupContainer: function getPopupContainer(node) {
          return node.parentNode;
        }
      }, _react["default"].createElement("div", {
        className: "box volume-box"
      }, _react["default"].createElement(_index2["default"], {
        className: "handle-audio-icon control-volume",
        type: volumeIcon()
      }))) : null, download ? _react["default"].createElement("div", {
        className: "box download-box"
      }, _react["default"].createElement("a", {
        download: true,
        target: "_blank",
        rel: "noopener noreferrer",
        href: src
      }, _react["default"].createElement(_index2["default"], {
        className: "handle-audio-icon download",
        type: "sound-download"
      }))) : null));
    }
  }]);

  return AudioPlayer;
}(_react["default"].Component);

_defineProperty(AudioPlayer, "propTypes", {
  prefixCls: _propTypes["default"].string.isRequired,
  className: _propTypes["default"].string,
  size: _propTypes["default"].oneOf(['default', 'small']),
  title: _propTypes["default"].string,
  src: _propTypes["default"].string,
  loop: _propTypes["default"].bool,
  preload: _propTypes["default"].string,
  autoPlay: _propTypes["default"].bool,
  muted: _propTypes["default"].bool,
  volume: _propTypes["default"].number,
  controlVolume: _propTypes["default"].bool,
  controlProgress: _propTypes["default"].bool,
  displayTime: _propTypes["default"].bool,
  download: _propTypes["default"].bool,
  onLoadedMetadata: _propTypes["default"].func,
  onCanPlay: _propTypes["default"].func,
  onCanPlayThrough: _propTypes["default"].func,
  onAbort: _propTypes["default"].func,
  onEnded: _propTypes["default"].func,
  onError: _propTypes["default"].func,
  onPause: _propTypes["default"].func,
  onPlay: _propTypes["default"].func,
  onSeeked: _propTypes["default"].func
});

_defineProperty(AudioPlayer, "defaultProps", {
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
  download: false,
  onLoadedMetadata: function onLoadedMetadata() {},
  // 当浏览器已加载音频的元数据时的回调
  onCanPlay: function onCanPlay() {},
  // 当浏览器能够开始播放音频时的回调
  onCanPlayThrough: function onCanPlayThrough() {},
  // 当浏览器可在不因缓冲而停顿的情况下进行播放时的回调
  onAbort: function onAbort() {},
  // 当音频的加载已放弃时(如切换到其他资源)的回调
  onEnded: function onEnded() {},
  // 当目前的播放列表已结束时的回调
  onError: function onError() {},
  // 当在音频加载期间发生错误时的回调
  onPause: function onPause() {},
  // 当音频暂停时的回调
  onPlay: function onPlay() {},
  // 当音频已开始或不再暂停时的回调
  onSeeked: function onSeeked() {} // 当用户已移动/跳跃到音频中的新位置时的回调

});

var _default = AudioPlayer;
exports["default"] = _default;