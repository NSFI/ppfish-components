"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("omit.js"));

var _Video = _interopRequireDefault(require("./Video"));

var _VideoModal = _interopRequireDefault(require("./VideoModal"));

var _index = _interopRequireDefault(require("../Icon/index.js"));

require("./style/VideoViewer.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VideoViewer =
/*#__PURE__*/
function (_Component) {
  _inherits(VideoViewer, _Component);

  function VideoViewer(props) {
    var _this;

    _classCallCheck(this, VideoViewer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VideoViewer).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleThumbClick", function (e) {
      if (_this.props.failedMessage !== null) return;

      _this.setState({
        videoModalVisible: true
      }, function () {
        var video = _this.video && _this.video.current;
        var player = video && video.getVideoPlayer();

        if (player && typeof player.play === 'function') {
          player.play();
        }
      });

      _this.props.onThumbClick && _this.props.onThumbClick(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onClose", function () {
      var video = _this.video && _this.video.current;
      var player = video && video.getVideoPlayer();

      if (player && typeof player.pause === 'function') {
        player.pause();
      }

      _this.props.modalProps.afterClose && _this.props.modalProps.afterClose();
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function (e) {
      _this.setState({
        videoModalVisible: false
      });

      _this.props.modalProps.onCancel && _this.props.modalProps.onCancel();
    });

    _this.state = {
      videoModalVisible: false
    };
    _this.video = _react["default"].createRef();
    return _this;
  } // 点击缩略图


  _createClass(VideoViewer, [{
    key: "render",
    value: function render() {
      var _classnames;

      var videoModalVisible = this.state.videoModalVisible;
      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          width = _this$props.width,
          height = _this$props.height,
          poster = _this$props.poster,
          modalProps = _this$props.modalProps,
          videoProps = _this$props.videoProps,
          failedMessage = _this$props.failedMessage;
      var otherModalProps = (0, _omit["default"])(modalProps, ['visible', 'afterClose', 'onCancel']);
      var otherVideoProps = (0, _omit["default"])(videoProps, ['autoPlay']);
      var thumbCls = (0, _classnames2["default"])((_classnames = {}, _defineProperty(_classnames, "".concat(prefixCls, "-thumb"), true), _defineProperty(_classnames, "".concat(prefixCls, "-thumb-disabled"), failedMessage !== null), _classnames));
      return _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-wrap"),
        style: {
          width: width,
          height: height
        }
      }, _react["default"].createElement("div", {
        className: thumbCls,
        onClick: this.handleThumbClick
      }, failedMessage === null ? _react["default"].createElement("div", {
        className: (0, _classnames2["default"])(["".concat(prefixCls, "-thumb-status"), "".concat(prefixCls, "-thumb-big-play-button")])
      }, _react["default"].createElement(_index["default"], {
        type: "play"
      })) : _react["default"].createElement("div", {
        className: (0, _classnames2["default"])(["".concat(prefixCls, "-thumb-status"), "".concat(prefixCls, "-thumb-failed-message")])
      }, _react["default"].createElement("span", null, failedMessage)), _react["default"].createElement(_Video["default"], {
        width: width,
        height: height,
        poster: poster,
        sources: otherVideoProps.sources,
        controls: false
      })), _react["default"].createElement(_VideoModal["default"], _extends({}, otherModalProps, {
        visible: videoModalVisible,
        afterClose: this.onClose,
        onCancel: this.handleCancel
      }), _react["default"].createElement(_Video["default"], _extends({}, otherVideoProps, {
        ref: this.video,
        autoplay: true,
        bigPlayButton: false
      }))));
    }
  }]);

  return VideoViewer;
}(_react.Component);

_defineProperty(VideoViewer, "propTypes", {
  prefixCls: _propTypes["default"].string,
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  poster: _propTypes["default"].string,
  modalProps: _propTypes["default"].object,
  videoProps: _propTypes["default"].object,
  failedMessage: _propTypes["default"].string,
  onThumbClick: _propTypes["default"].func
});

_defineProperty(VideoViewer, "defaultProps", {
  prefixCls: 'fishd-video-viewer',
  poster: null,
  width: 240,
  height: 135,
  failedMessage: null
});

_defineProperty(VideoViewer, "Video", _Video["default"]);

_defineProperty(VideoViewer, "VideoModal", _VideoModal["default"]);

var _default = VideoViewer;
exports["default"] = _default;