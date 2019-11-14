"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _omit = _interopRequireDefault(require("omit.js"));

var _index = _interopRequireDefault(require("../Modal/index.js"));

var _index2 = _interopRequireDefault(require("../Icon/index.js"));

require("./style/VideoModal.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VideoModal =
/*#__PURE__*/
function (_Component) {
  _inherits(VideoModal, _Component);

  function VideoModal(props) {
    var _this;

    _classCallCheck(this, VideoModal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VideoModal).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleOnClose", function () {
      _this.props.onCancel();
    });

    return _this;
  }

  _createClass(VideoModal, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          children = _this$props.children,
          closable = _this$props.closable,
          _this$props$wrapClass = _this$props.wrapClassName,
          wrapClassName = _this$props$wrapClass === void 0 ? '' : _this$props$wrapClass,
          maskStyle = _this$props.maskStyle;
      var MODAL_WRAP = "".concat(prefixCls, "-modal-wrap");
      var otherProps = (0, _omit["default"])(this.props, ['prefixCls', 'wrapClassName', 'title', 'footer', 'maskStyle', 'closable']);

      var modalProps = _objectSpread({}, otherProps, {
        wrapClassName: "".concat(wrapClassName, " ").concat(MODAL_WRAP),
        className: 'fishd-modal',
        maskStyle: maskStyle ? maskStyle : {
          backgroundColor: 'rgba(0,0,0,0.2)'
        },
        // 不显示Modal自带的关闭按钮
        closable: false,
        title: null,
        footer: null
      });

      var content = _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-content")
      }, children, _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-header")
      }, closable ? _react["default"].createElement(_index2["default"], {
        type: "picture-close",
        className: "icon-close",
        onClick: this.handleOnClose
      }) : null));

      return _react["default"].createElement(_index["default"], modalProps, _react["default"].createElement("div", {
        className: "".concat(prefixCls, "-inner")
      }, content));
    }
  }]);

  return VideoModal;
}(_react.Component);

_defineProperty(VideoModal, "propTypes", {
  prefixCls: _propTypes["default"].string,
  children: _propTypes["default"].node,
  wrapClassName: _propTypes["default"].string,
  maskStyle: _propTypes["default"].object,
  visible: _propTypes["default"].bool.isRequired,
  draggable: _propTypes["default"].bool,
  mask: _propTypes["default"].bool,
  closable: _propTypes["default"].bool,
  onCancel: _propTypes["default"].func,
  afterClose: _propTypes["default"].func,
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string])
});

_defineProperty(VideoModal, "defaultProps", {
  prefixCls: 'fishd-video-modal',
  visible: false,
  draggable: false,
  closable: true,
  mask: false,
  width: 640
});

var _default = VideoModal;
exports["default"] = _default;