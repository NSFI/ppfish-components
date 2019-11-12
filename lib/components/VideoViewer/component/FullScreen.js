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

var _index2 = _interopRequireDefault(require("../../Tooltip/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FullScreen =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FullScreen, _Component);

  function FullScreen(props) {
    var _this;

    _this = _Component.call(this, props) || this; // 获取播放器实例

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

  var _proto = FullScreen.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.player.on('fullscreenchange', this.setFullScreen);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.player.off('fullscreenchange', this.setFullScreen);
  };

  _proto.render = function render() {
    var _this2 = this;

    var prefixCls = this.props.prefixCls;
    var isFullScreen = this.state.isFullScreen;
    var title = !isFullScreen ? '全屏' : '取消全屏';
    return _react.default.createElement("div", {
      className: (0, _classnames.default)(prefixCls, "fishd-video-js-customer-button"),
      onClick: function onClick() {
        return _this2.handleClick();
      }
    }, _react.default.createElement(_index2.default, {
      title: _react.default.createElement("span", {
        style: {
          wordBreak: 'keep-all'
        }
      }, title),
      getPopupContainer: function getPopupContainer(e) {
        return e.parentNode;
      }
    }, _react.default.createElement("a", null, !isFullScreen ? _react.default.createElement(_index.default, {
      type: "video-fullscreen"
    }) : _react.default.createElement(_index.default, {
      type: "video-shrink"
    }))));
  };

  return FullScreen;
}(_react.Component);

exports.default = FullScreen;

_defineProperty(FullScreen, "propTypes", {
  prefixCls: _propTypes.default.string,
  vjsComponent: _propTypes.default.object
});

_defineProperty(FullScreen, "defaultProps", {
  prefixCls: 'fishd-video-viewer-fullscreen'
});