"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("omit.js"));

var _Video = _interopRequireDefault(require("./Video"));

var _VideoModal = _interopRequireDefault(require("./VideoModal"));

var _index = _interopRequireDefault(require("../Icon/index.js"));

require("./style/VideoViewer.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VideoViewer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(VideoViewer, _Component);

  function VideoViewer(props) {
    var _this;

    _this = _Component.call(this, props) || this;

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
    _this.video = _react.default.createRef();
    return _this;
  } // 点击缩略图


  var _proto = VideoViewer.prototype;

  _proto.render = function render() {
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
    var otherModalProps = (0, _omit.default)(modalProps, ['visible', 'afterClose', 'onCancel']);
    var otherVideoProps = (0, _omit.default)(videoProps, ['autoPlay']);
    var thumbCls = (0, _classnames2.default)((_classnames = {}, _classnames[prefixCls + "-thumb"] = true, _classnames[prefixCls + "-thumb-disabled"] = failedMessage !== null, _classnames));
    return _react.default.createElement("div", {
      className: prefixCls + "-wrap",
      style: {
        width: width,
        height: height
      }
    }, _react.default.createElement("div", {
      className: thumbCls,
      onClick: this.handleThumbClick
    }, failedMessage === null ? _react.default.createElement("div", {
      className: (0, _classnames2.default)([prefixCls + "-thumb-status", prefixCls + "-thumb-big-play-button"])
    }, _react.default.createElement(_index.default, {
      type: "play"
    })) : _react.default.createElement("div", {
      className: (0, _classnames2.default)([prefixCls + "-thumb-status", prefixCls + "-thumb-failed-message"])
    }, _react.default.createElement("span", null, failedMessage)), _react.default.createElement(_Video.default, {
      width: width,
      height: height,
      poster: poster,
      sources: otherVideoProps.sources,
      controls: false
    })), _react.default.createElement(_VideoModal.default, _extends({}, otherModalProps, {
      visible: videoModalVisible,
      afterClose: this.onClose,
      onCancel: this.handleCancel
    }), _react.default.createElement(_Video.default, _extends({}, otherVideoProps, {
      ref: this.video,
      autoplay: true,
      bigPlayButton: false
    }))));
  };

  return VideoViewer;
}(_react.Component);

_defineProperty(VideoViewer, "propTypes", {
  prefixCls: _propTypes.default.string,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  poster: _propTypes.default.string,
  modalProps: _propTypes.default.object,
  videoProps: _propTypes.default.object,
  failedMessage: _propTypes.default.string,
  onThumbClick: _propTypes.default.func
});

_defineProperty(VideoViewer, "defaultProps", {
  prefixCls: 'fishd-video-viewer',
  poster: null,
  width: 240,
  height: 135,
  failedMessage: null
});

_defineProperty(VideoViewer, "Video", _Video.default);

_defineProperty(VideoViewer, "VideoModal", _VideoModal.default);

var _default = VideoViewer;
exports.default = _default;