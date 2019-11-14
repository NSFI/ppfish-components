"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("../../Icon/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(prefixCls, "fishd-video-js-customer-button"),
        onClick: function onClick() {
          return _this2.handleClick();
        }
      }, _react["default"].createElement("a", null, _react["default"].createElement(_index["default"], {
        className: "".concat(prefixCls, "-customer-handle"),
        type: pausePlayIcon
      })));
    }
  }]);

  return Play;
}(_react.Component);

exports["default"] = Play;

_defineProperty(Play, "propTypes", {
  prefixCls: _propTypes["default"].string,
  vjsComponent: _propTypes["default"].object
});

_defineProperty(Play, "defaultProps", {
  prefixCls: 'fishd-video-viewer-play'
});