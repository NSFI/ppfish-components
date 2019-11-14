"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var _classnames = _interopRequireDefault(require("classnames"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var commonPlacements = {
  overflow: {
    adjustX: 1,
    adjustY: 1
  },
  ignoreShake: true
};
var BUILT_IN_PLACEMENTS = {
  leftCenter: _objectSpread({
    points: ['cr', 'cl'],
    offset: [-8, 0]
  }, commonPlacements),
  leftTop: _objectSpread({
    points: ['tr', 'tl'],
    offset: [-8, 0]
  }, commonPlacements),
  leftBottom: _objectSpread({
    points: ['br', 'bl'],
    offset: [-8, 0]
  }, commonPlacements),
  rightCenter: _objectSpread({
    points: ['cl', 'cr'],
    offset: [8, 0]
  }, commonPlacements),
  rightTop: _objectSpread({
    points: ['tl', 'tr'],
    offset: [8, 0]
  }, commonPlacements),
  rightBottom: _objectSpread({
    points: ['bl', 'br'],
    offset: [8, 0]
  }, commonPlacements),
  topCenter: _objectSpread({
    points: ['bc', 'tc'],
    offset: [0, -8]
  }, commonPlacements),
  topRight: _objectSpread({
    points: ['br', 'tr'],
    offset: [0, -8]
  }, commonPlacements),
  topLeft: _objectSpread({
    points: ['bl', 'tl'],
    offset: [0, -8]
  }, commonPlacements),
  bottomCenter: _objectSpread({
    points: ['tc', 'bc'],
    offset: [0, 8]
  }, commonPlacements),
  bottomRight: _objectSpread({
    points: ['tr', 'br'],
    offset: [0, 8]
  }, commonPlacements),
  bottomLeft: _objectSpread({
    points: ['tl', 'bl'],
    offset: [0, 8]
  }, commonPlacements)
};

var SelectTrigger =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SelectTrigger, _React$Component);

  function SelectTrigger(props) {
    var _this;

    _classCallCheck(this, SelectTrigger);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectTrigger).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getDropdownTransitionName", function () {
      var _this$props = _this.props,
          transitionName = _this$props.transitionName,
          animation = _this$props.animation,
          dropdownPrefixCls = _this$props.dropdownPrefixCls;

      if (!transitionName && animation) {
        return "".concat(dropdownPrefixCls, "-").concat(animation);
      }

      return transitionName;
    });

    _defineProperty(_assertThisInitialized(_this), "forcePopupAlign", function () {
      var $trigger = _this.triggerRef.current;

      if ($trigger) {
        $trigger.forcePopupAlign();
      }
    });

    _this.triggerRef = (0, _util.createRef)();
    return _this;
  }

  _createClass(SelectTrigger, [{
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props2 = this.props,
          disabled = _this$props2.disabled,
          isMultiple = _this$props2.isMultiple,
          dropdownPopupAlign = _this$props2.dropdownPopupAlign,
          dropdownMatchSelectWidth = _this$props2.dropdownMatchSelectWidth,
          dropdownClassName = _this$props2.dropdownClassName,
          dropdownStyle = _this$props2.dropdownStyle,
          onDropdownVisibleChange = _this$props2.onDropdownVisibleChange,
          getPopupContainer = _this$props2.getPopupContainer,
          dropdownPrefixCls = _this$props2.dropdownPrefixCls,
          popupElement = _this$props2.popupElement,
          open = _this$props2.open,
          children = _this$props2.children,
          placement = _this$props2.placement; // TODO: [Legacy] Use new action when trigger fixed: https://github.com/react-component/trigger/pull/86
      // When false do nothing with the width
      // ref: https://github.com/ant-design/ant-design/issues/10927

      var stretch;

      if (dropdownMatchSelectWidth !== false) {
        stretch = dropdownMatchSelectWidth ? 'width' : 'minWidth';
      }

      return _react["default"].createElement(_rcTrigger["default"], {
        ref: this.triggerRef,
        action: disabled ? [] : ['click'],
        popupPlacement: placement // forceRender
        ,
        builtinPlacements: BUILT_IN_PLACEMENTS,
        popupAlign: dropdownPopupAlign,
        prefixCls: dropdownPrefixCls,
        popupTransitionName: this.getDropdownTransitionName(),
        onPopupVisibleChange: onDropdownVisibleChange,
        popup: popupElement,
        popupVisible: open,
        getPopupContainer: getPopupContainer,
        stretch: stretch,
        popupClassName: (0, _classnames["default"])(dropdownClassName, (_classNames = {}, _defineProperty(_classNames, "".concat(dropdownPrefixCls, "--multiple"), isMultiple), _defineProperty(_classNames, "".concat(dropdownPrefixCls, "--single"), !isMultiple), _classNames)),
        popupStyle: dropdownStyle // destroyPopupOnHide

      }, children);
    }
  }]);

  return SelectTrigger;
}(_react["default"].Component);

_defineProperty(SelectTrigger, "propTypes", {
  // Pass by outside user props
  disabled: _propTypes["default"].bool,
  dropdownPopupAlign: _propTypes["default"].object,
  placement: _propTypes["default"].string,
  dropdownClassName: _propTypes["default"].string,
  dropdownStyle: _propTypes["default"].object,
  getPopupContainer: _propTypes["default"].func,
  children: _propTypes["default"].node,
  dropdownMatchSelectWidth: _propTypes["default"].bool,
  transitionName: _propTypes["default"].string,
  animation: _propTypes["default"].string,
  // Pass by Select
  isMultiple: _propTypes["default"].bool,
  dropdownPrefixCls: _propTypes["default"].string,
  onDropdownVisibleChange: _propTypes["default"].func,
  popupElement: _propTypes["default"].node,
  open: _propTypes["default"].bool
});

_defineProperty(SelectTrigger, "defaultProps", {
  open: false
});

(0, _reactLifecyclesCompat.polyfill)(SelectTrigger);
var _default = SelectTrigger;
exports["default"] = _default;