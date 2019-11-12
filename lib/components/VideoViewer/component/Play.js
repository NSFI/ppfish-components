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

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("../../Icon/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Play =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Play, _Component);

  function Play(props) {
    var _this;

    _this = _Component.call(this, props) || this; // 获取播放器实例

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

  var _proto = Play.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.player.on('play', this.setPlay(true));
    this.player.on('pause', this.setPlay(false));
    this.player.on('ended', this.setPlay(false));
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.player.off('play', this.setPlay(true));
    this.player.off('pause', this.setPlay(false));
    this.player.off('ended', this.setPlay(false));
  };

  _proto.render = function render() {
    var _this2 = this;

    var prefixCls = this.props.prefixCls;
    var isPlay = this.state.isPlay;
    var pausePlayIcon = !isPlay ? 'play' : 'stop';
    return _react.default.createElement("div", {
      className: (0, _classnames.default)(prefixCls, "fishd-video-js-customer-button"),
      onClick: function onClick() {
        return _this2.handleClick();
      }
    }, _react.default.createElement("a", null, _react.default.createElement(_index.default, {
      className: prefixCls + "-customer-handle",
      type: pausePlayIcon
    })));
  };

  return Play;
}(_react.Component);

exports.default = Play;

_defineProperty(Play, "propTypes", {
  prefixCls: _propTypes.default.string,
  vjsComponent: _propTypes.default.object
});

_defineProperty(Play, "defaultProps", {
  prefixCls: 'fishd-video-viewer-play'
});