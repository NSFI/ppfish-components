"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("../../Icon/index.js"));

var _index2 = _interopRequireDefault(require("../../Popover/index.js"));

var _index3 = _interopRequireDefault(require("../../Slider/index.js"));

require("../style/Volume.less");

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
        return _react["default"].createElement("div", {
          className: "".concat(prefixCls, "-volume-box")
        }, _react["default"].createElement("div", {
          className: "".concat(prefixCls, "-volume-value")
        }, currentVolume, "%"), _react["default"].createElement("div", {
          className: "".concat(prefixCls, "-volume-slider")
        }, _react["default"].createElement(_index3["default"], {
          vertical: true,
          min: 0,
          max: 100,
          step: 1,
          handle: _react["default"].createElement("div", {
            className: "".concat(prefixCls, "-customer-handle")
          }, _react["default"].createElement(_index["default"], {
            type: "sound-drag"
          })),
          tipFormatter: null,
          value: currentVolume,
          onChange: function onChange(value) {
            return _this2.handleChangeVolume(value);
          }
        })));
      };

      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(prefixCls, "fishd-video-js-customer-button")
      }, _react["default"].createElement(_index2["default"], {
        trigger: "hover",
        placement: "top",
        content: getVolumePopupContent(currentVolume),
        visible: volumeOpen,
        onVisibleChange: this.onVolumeVisibleChange,
        getPopupContainer: function getPopupContainer(node) {
          return node.parentNode;
        }
      }, _react["default"].createElement(_index["default"], {
        className: "control-volume",
        type: volumeIcon(),
        onClick: this.handleVolumeClick
      })));
    }
  }]);

  return FullScreen;
}(_react.Component);

exports["default"] = FullScreen;

_defineProperty(FullScreen, "propTypes", {
  prefixCls: _propTypes["default"].string,
  vjsComponent: _propTypes["default"].object
});

_defineProperty(FullScreen, "defaultProps", {
  prefixCls: 'fishd-video-viewer-volume'
});