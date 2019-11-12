"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _src = _interopRequireDefault(require("./src"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Drawer =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Drawer, _React$Component);

  function Drawer(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

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

  var _proto = Drawer.prototype;

  _proto.render = function render() {
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
    return React.createElement(_src.default, {
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
  };

  return Drawer;
}(React.Component);

exports.default = Drawer;

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