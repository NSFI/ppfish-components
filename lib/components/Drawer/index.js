"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _src = _interopRequireDefault(require("./src"));

require("./style/index.less");

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

var Drawer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Drawer, _React$Component);

  function Drawer(props) {
    var _this;

    _classCallCheck(this, Drawer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Drawer).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleMaskClick", function (e) {
      _this.props.onMaskClick(e);
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (status) {
      _this.props.onChange(status);
    });

    _defineProperty(_assertThisInitialized(_this), "handleHandleClick", function (e) {
      _this.props.onHandleClick(e);
    });

    _defineProperty(_assertThisInitialized(_this), "handleCloseClick", function (e) {
      _this.props.onCloseClick(e);
    });

    return _this;
  }

  _createClass(Drawer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          className = _this$props.className,
          wrapperClassName = _this$props.wrapperClassName,
          width = _this$props.width,
          height = _this$props.height,
          visible = _this$props.visible,
          placement = _this$props.placement,
          getContainer = _this$props.getContainer,
          style = _this$props.style,
          mask = _this$props.mask,
          maskStyle = _this$props.maskStyle,
          handler = _this$props.handler,
          level = _this$props.level,
          ease = _this$props.ease,
          duration = _this$props.duration,
          closed = _this$props.closed;
      return React.createElement(_src["default"], {
        className: className,
        wrapperClassName: wrapperClassName,
        width: width,
        height: height,
        open: visible,
        closed: closed,
        placement: placement,
        getContainer: getContainer,
        showMask: mask,
        level: level,
        ease: ease,
        duration: duration,
        maskStyle: maskStyle,
        style: style,
        handler: handler,
        onMaskClick: this.handleMaskClick,
        onHandleClick: this.handleHandleClick,
        onChange: this.handleChange,
        onCloseClick: this.handleCloseClick
      }, this.props.children);
    }
  }]);

  return Drawer;
}(React.Component);

exports["default"] = Drawer;

_defineProperty(Drawer, "propTypes", {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  visible: PropTypes.bool,
  closed: PropTypes.bool,
  placement: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),
  getContainer: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func, PropTypes.bool]),
  style: PropTypes.object,
  mask: PropTypes.bool,
  maskStyle: PropTypes.object,
  children: PropTypes.node,
  handler: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  level: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  ease: PropTypes.string,
  duration: PropTypes.string,
  onChange: PropTypes.func,
  onMaskClick: PropTypes.func,
  onHandleClick: PropTypes.func,
  onCloseClick: PropTypes.func
});

_defineProperty(Drawer, "defaultProps", {
  prefixCls: 'fishd-drawer',
  placement: 'right',
  onChange: function onChange() {},
  onMaskClick: function onMaskClick() {},
  onHandleClick: function onHandleClick() {}
});