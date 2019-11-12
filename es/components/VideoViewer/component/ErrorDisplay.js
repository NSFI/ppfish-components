"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = _interopRequireDefault(require("../../Icon/index.js"));

var _constant = require("../constant");

require("../style/ErrorDisplay.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ErrorDisplay =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ErrorDisplay, _Component);

  function ErrorDisplay(props) {
    var _this;

    _this = _Component.call(this, props) || this; // 获取播放器实例

    _defineProperty(_assertThisInitialized(_this), "getMediaError", function () {
      _this.setState({
        mediaError: _this.player.error()
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleRetry", function () {
      var currentTime = _this.player.currentTime();

      _this.player.error(null);

      _this.player.pause();

      _this.player.load();

      _this.player.currentTime(currentTime);

      _this.player.play();
    });

    _this.player = props.vjsComponent.player_;
    _this.state = {
      // MediaError对象, 包含了音频/视频的错误状态。http://www.w3school.com.cn/tags/av_prop_error.asp
      mediaError: null
    };
    return _this;
  }

  var _proto = ErrorDisplay.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.player.on('error', this.getMediaError);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.player.off('error', this.getMediaError);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        vjsComponent = _this$props.vjsComponent,
        prefixCls = _this$props.prefixCls;
    var mediaError = this.state.mediaError;
    var errorMessage = mediaError !== null ? _constant.MEDIA_ERROR[mediaError.code] : '';
    return _react.default.createElement("div", {
      className: prefixCls
    }, mediaError ? _react.default.createElement("div", {
      className: prefixCls + "-msg"
    }, errorMessage, mediaError.code === 2 ? _react.default.createElement("a", {
      className: prefixCls + "-retry",
      onClick: this.handleRetry
    }, _react.default.createElement(_index.default, {
      type: "picture-rotate"
    }), "\u91CD\u8BD5") : null) : null);
  };

  return ErrorDisplay;
}(_react.Component);

exports.default = ErrorDisplay;

_defineProperty(ErrorDisplay, "propTypes", {
  prefixCls: _propTypes.default.string,
  vjsComponent: _propTypes.default.object
});

_defineProperty(ErrorDisplay, "defaultProps", {
  prefixCls: 'fishd-video-error'
});