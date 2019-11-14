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

var Play =
/*#__PURE__*/
function (_Component) {
  _inherits(Play, _Component);

  function Play(props) {
    var _this;

    _classCallCheck(this, Play);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Play).call(this, props)); // 获取播放器实例

    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      var isPlay = _this.state.isPlay;

      if (!isPlay) {
        _this.player.play();
      } else {
        _this.player.pause();
      }

      _this.setState({
        isPlay: !isPlay
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setPlay", function (isPlay) {
      return function () {
        _this.setState({
          isPlay: isPlay
        });
      };
    });

    _this.player = props.vjsComponent.player_;
    _this.state = {
      isPlay: false
    };
    return _this;
  }

  _createClass(Play, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.player.on('play', this.setPlay(true));
      this.player.on('pause', this.setPlay(false));
      this.player.on('ended', this.setPlay(false));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.player.off('play', this.setPlay(true));
      this.player.off('pause', this.setPlay(false));
      this.player.off('ended', this.setPlay(false));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var prefixCls = this.props.prefixCls;
      var isPlay = this.state.isPlay;
      var pausePlayIcon = !isPlay ? 'play' : 'stop';
      return React.createElement("div", {
        className: classnames(prefixCls, "fishd-video-js-customer-button"),
        onClick: function onClick() {
          return _this2.handleClick();
        }
      }, React.createElement("a", null, React.createElement(Icon, {
        className: "".concat(prefixCls, "-customer-handle"),
        type: pausePlayIcon
      })));
    }
  }]);

  return Play;
}(Component);

_defineProperty(Play, "propTypes", {
  prefixCls: PropTypes.string,
  vjsComponent: PropTypes.object
});

_defineProperty(Play, "defaultProps", {
  prefixCls: 'fishd-video-viewer-play'
});

export { Play as default };