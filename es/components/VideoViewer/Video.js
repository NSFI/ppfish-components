"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _video = _interopRequireDefault(require("video.js"));

var _vjsDownLoad = _interopRequireDefault(require("./component/vjsDownLoad"));

var _vjsFullScreen = _interopRequireDefault(require("./component/vjsFullScreen"));

var _vjsVolume = _interopRequireDefault(require("./component/vjsVolume"));

var _vjsPlay = _interopRequireDefault(require("./component/vjsPlay"));

var _vjsErrorDisplay = _interopRequireDefault(require("./component/vjsErrorDisplay"));

var _zhCN = require("./lang/zh-CN");

var _KeyCode = _interopRequireDefault(require("../../utils/KeyCode"));

require("video.js/dist/video-js.css");

require("./style/Video.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_video.default.addLanguage("zh-CN", _zhCN.zh_CN);

var VideoViewer =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(VideoViewer, _React$Component);

  function VideoViewer(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "getVideoPlayer", function () {
      return _this.player;
    });

    _defineProperty(_assertThisInitialized(_this), "handleSpaceKeyDown", function (e) {
      if (e.which === _KeyCode.default.SPACE) {
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

  var _proto = VideoViewer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _this$props = this.props,
        download = _this$props.download,
        bigPlayButton = _this$props.bigPlayButton,
        otherProps = _objectWithoutPropertiesLoose(_this$props, ["download", "bigPlayButton"]);

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

    this.player = (0, _video.default)(this.videoNode, option, function () {
      _this2.player.on('timeupdate', function (e) {
        // 控制焦点
        _this2.videoPlayerRef.focus();
      });
    });
  } // destroy player on unmount
  ;

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  };

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/ video.js /pull/3856
  _proto.render = function render() {
    var _this3 = this;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        className = _this$props2.className;
    return _react.default.createElement("div", {
      className: prefixCls + "-wrap"
    }, _react.default.createElement("div", {
      "data-vjs-player": true,
      ref: function ref(node) {
        return _this3.videoPlayerRef = node;
      },
      onKeyDown: this.handleSpaceKeyDown
    }, _react.default.createElement("video", {
      ref: function ref(node) {
        return _this3.videoNode = node;
      },
      className: className
    })));
  };

  return VideoViewer;
}(_react.default.Component);

exports.default = VideoViewer;

_defineProperty(VideoViewer, "propTypes", {
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  poster: _propTypes.default.string,
  sources: _propTypes.default.array,
  autoplay: _propTypes.default.bool,
  loop: _propTypes.default.bool,
  muted: _propTypes.default.bool,
  preload: _propTypes.default.oneOf(['auto', 'none', 'metadata']),
  controls: _propTypes.default.bool,
  download: _propTypes.default.bool,
  bigPlayButton: _propTypes.default.bool
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