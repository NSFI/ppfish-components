function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
import Icon from '../../Icon/index.js';
import Popover from '../../Popover/index.js';
import Slider from '../../Slider/index.js';
import '../style/Volume.less';

var FullScreen =
/*#__PURE__*/
function (_Component) {
  _inherits(FullScreen, _Component);

  function FullScreen(props) {
    var _this;

    _classCallCheck(this, FullScreen);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FullScreen).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleChangeVolume", function (value) {
      _this.setState({
        currentVolume: value,
        lastVolume: value,
        isMuted: !value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onVolumeVisibleChange", function (state) {
      _this.setState({
        volumeOpen: state
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleVolumeClick", function () {
      var _this$state = _this.state,
          isMuted = _this$state.isMuted,
          lastVolume = _this$state.lastVolume;

      _this.setState({
        isMuted: !isMuted,
        currentVolume: isMuted ? lastVolume : 0
      });
    });

    _this.player = props.vjsComponent.player_;
    _this.state = {
      isMuted: false,
      // 是否静音
      currentVolume: parseInt(_this.player.volume() * 100),
      // 当前音量
      lastVolume: parseInt(_this.player.volume() * 100),
      // 记录上一次音量，点击音量时恢复
      volumeOpen: false // 是否打开音量控制

    };
    return _this;
  } // 音量值变化


  _createClass(FullScreen, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var prefixCls = this.props.prefixCls;
      var _this$state2 = this.state,
          isMuted = _this$state2.isMuted,
          currentVolume = _this$state2.currentVolume,
          volumeOpen = _this$state2.volumeOpen; // 设置播放器音量

      this.player.volume(currentVolume / 100);

      var volumeIcon = function volumeIcon() {
        if (isMuted || currentVolume === 0) {
          return 'sound-mute';
        } else if (currentVolume > 0 && currentVolume <= 50) {
          return 'sound-medium';
        } else {
          return 'sound-loud';
        }
      };

      var getVolumePopupContent = function getVolumePopupContent() {
        return React.createElement("div", {
          className: "".concat(prefixCls, "-volume-box")
        }, React.createElement("div", {
          className: "".concat(prefixCls, "-volume-value")
        }, currentVolume, "%"), React.createElement("div", {
          className: "".concat(prefixCls, "-volume-slider")
        }, React.createElement(Slider, {
          vertical: true,
          min: 0,
          max: 100,
          step: 1,
          handle: React.createElement("div", {
            className: "".concat(prefixCls, "-customer-handle")
          }, React.createElement(Icon, {
            type: "sound-drag"
          })),
          tipFormatter: null,
          value: currentVolume,
          onChange: function onChange(value) {
            return _this2.handleChangeVolume(value);
          }
        })));
      };

      return React.createElement("div", {
        className: classnames(prefixCls, "fishd-video-js-customer-button")
      }, React.createElement(Popover, {
        trigger: "hover",
        placement: "top",
        content: getVolumePopupContent(currentVolume),
        visible: volumeOpen,
        onVisibleChange: this.onVolumeVisibleChange,
        getPopupContainer: function getPopupContainer(node) {
          return node.parentNode;
        }
      }, React.createElement(Icon, {
        className: "control-volume",
        type: volumeIcon(),
        onClick: this.handleVolumeClick
      })));
    }
  }]);

  return FullScreen;
}(Component);

_defineProperty(FullScreen, "propTypes", {
  prefixCls: PropTypes.string,
  vjsComponent: PropTypes.object
});

_defineProperty(FullScreen, "defaultProps", {
  prefixCls: 'fishd-video-viewer-volume'
});

export { FullScreen as default };