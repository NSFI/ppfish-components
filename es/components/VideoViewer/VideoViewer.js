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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import omit from 'omit.js';
import Video from './Video';
import VideoModal from './VideoModal';
import Icon from '../Icon/index.js';
import './style/VideoViewer.less';

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
    _this.video = React.createRef();
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
      var otherModalProps = omit(modalProps, ['visible', 'afterClose', 'onCancel']);
      var otherVideoProps = omit(videoProps, ['autoPlay']);
      var thumbCls = classnames((_classnames = {}, _defineProperty(_classnames, "".concat(prefixCls, "-thumb"), true), _defineProperty(_classnames, "".concat(prefixCls, "-thumb-disabled"), failedMessage !== null), _classnames));
      return React.createElement("div", {
        className: "".concat(prefixCls, "-wrap"),
        style: {
          width: width,
          height: height
        }
      }, React.createElement("div", {
        className: thumbCls,
        onClick: this.handleThumbClick
      }, failedMessage === null ? React.createElement("div", {
        className: classnames(["".concat(prefixCls, "-thumb-status"), "".concat(prefixCls, "-thumb-big-play-button")])
      }, React.createElement(Icon, {
        type: "play"
      })) : React.createElement("div", {
        className: classnames(["".concat(prefixCls, "-thumb-status"), "".concat(prefixCls, "-thumb-failed-message")])
      }, React.createElement("span", null, failedMessage)), React.createElement(Video, {
        width: width,
        height: height,
        poster: poster,
        sources: otherVideoProps.sources,
        controls: false
      })), React.createElement(VideoModal, _extends({}, otherModalProps, {
        visible: videoModalVisible,
        afterClose: this.onClose,
        onCancel: this.handleCancel
      }), React.createElement(Video, _extends({}, otherVideoProps, {
        ref: this.video,
        autoplay: true,
        bigPlayButton: false
      }))));
    }
  }]);

  return VideoViewer;
}(Component);

_defineProperty(VideoViewer, "propTypes", {
  prefixCls: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  poster: PropTypes.string,
  modalProps: PropTypes.object,
  videoProps: PropTypes.object,
  failedMessage: PropTypes.string,
  onThumbClick: PropTypes.func
});

_defineProperty(VideoViewer, "defaultProps", {
  prefixCls: 'fishd-video-viewer',
  poster: null,
  width: 240,
  height: 135,
  failedMessage: null
});

_defineProperty(VideoViewer, "Video", Video);

_defineProperty(VideoViewer, "VideoModal", VideoModal);

export default VideoViewer;