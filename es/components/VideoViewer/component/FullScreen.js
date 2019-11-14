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
import Tooltip from '../../Tooltip/index.js';

var FullScreen =
/*#__PURE__*/
function (_Component) {
  _inherits(FullScreen, _Component);

  function FullScreen(props) {
    var _this;

    _classCallCheck(this, FullScreen);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FullScreen).call(this, props)); // 获取播放器实例

    _defineProperty(_assertThisInitialized(_this), "setFullScreen", function () {
      _this.setState({
        isFullScreen: _this.player.isFullscreen()
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      var isFullScreen = _this.state.isFullScreen;

      if (!isFullScreen) {
        _this.player.requestFullscreen();
      } else {
        _this.player.exitFullscreen();
      }

      _this.setState({
        isFullScreen: !isFullScreen
      });
    });

    _this.player = props.vjsComponent.player_;
    _this.state = {
      isFullScreen: _this.player.isFullscreen()
    };
    return _this;
  }

  _createClass(FullScreen, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.player.on('fullscreenchange', this.setFullScreen);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.player.off('fullscreenchange', this.setFullScreen);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var prefixCls = this.props.prefixCls;
      var isFullScreen = this.state.isFullScreen;
      var title = !isFullScreen ? '全屏' : '取消全屏';
      return React.createElement("div", {
        className: classnames(prefixCls, "fishd-video-js-customer-button"),
        onClick: function onClick() {
          return _this2.handleClick();
        }
      }, React.createElement(Tooltip, {
        title: React.createElement("span", {
          style: {
            wordBreak: 'keep-all'
          }
        }, title),
        getPopupContainer: function getPopupContainer(e) {
          return e.parentNode;
        }
      }, React.createElement("a", null, !isFullScreen ? React.createElement(Icon, {
        type: "video-fullscreen"
      }) : React.createElement(Icon, {
        type: "video-shrink"
      }))));
    }
  }]);

  return FullScreen;
}(Component);

_defineProperty(FullScreen, "propTypes", {
  prefixCls: PropTypes.string,
  vjsComponent: PropTypes.object
});

_defineProperty(FullScreen, "defaultProps", {
  prefixCls: 'fishd-video-viewer-fullscreen'
});

export { FullScreen as default };