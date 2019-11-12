"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var _classnames = _interopRequireDefault(require("classnames"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var commonPlacements = {
  overflow: {
    adjustX: 1,
    adjustY: 1
  },
  ignoreShake: true
};
var BUILT_IN_PLACEMENTS = {
  leftCenter: Object.assign({
    points: ['cr', 'cl'],
    offset: [-8, 0]
  }, commonPlacements),
  leftTop: Object.assign({
    points: ['tr', 'tl'],
    offset: [-8, 0]
  }, commonPlacements),
  leftBottom: Object.assign({
    points: ['br', 'bl'],
    offset: [-8, 0]
  }, commonPlacements),
  rightCenter: Object.assign({
    points: ['cl', 'cr'],
    offset: [8, 0]
  }, commonPlacements),
  rightTop: Object.assign({
    points: ['tl', 'tr'],
    offset: [8, 0]
  }, commonPlacements),
  rightBottom: Object.assign({
    points: ['bl', 'br'],
    offset: [8, 0]
  }, commonPlacements),
  topCenter: Object.assign({
    points: ['bc', 'tc'],
    offset: [0, -8]
  }, commonPlacements),
  topRight: Object.assign({
    points: ['br', 'tr'],
    offset: [0, -8]
  }, commonPlacements),
  topLeft: Object.assign({
    points: ['bl', 'tl'],
    offset: [0, -8]
  }, commonPlacements),
  bottomCenter: Object.assign({
    points: ['tc', 'bc'],
    offset: [0, 8]
  }, commonPlacements),
  bottomRight: Object.assign({
    points: ['tr', 'br'],
    offset: [0, 8]
  }, commonPlacements),
  bottomLeft: Object.assign({
    points: ['tl', 'bl'],
    offset: [0, 8]
  }, commonPlacements)
};

var SelectTrigger =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SelectTrigger, _React$Component);

  function SelectTrigger(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "getDropdownTransitionName", function () {
      var _this$props = _this.props,
          transitionName = _this$props.transitionName,
          animation = _this$props.animation,
          dropdownPrefixCls = _this$props.dropdownPrefixCls;

      if (!transitionName && animation) {
        return dropdownPrefixCls + "-" + animation;
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

  var _proto = SelectTrigger.prototype;

  _proto.render = function render() {
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

    return _react.default.createElement(_rcTrigger.default, {
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
      popupClassName: (0, _classnames.default)(dropdownClassName, (_classNames = {}, _classNames[dropdownPrefixCls + "--multiple"] = isMultiple, _classNames[dropdownPrefixCls + "--single"] = !isMultiple, _classNames)),
      popupStyle: dropdownStyle // destroyPopupOnHide

    }, children);
  };

  return SelectTrigger;
}(_react.default.Component);

_defineProperty(SelectTrigger, "propTypes", {
  // Pass by outside user props
  disabled: _propTypes.default.bool,
  dropdownPopupAlign: _propTypes.default.object,
  placement: _propTypes.default.string,
  dropdownClassName: _propTypes.default.string,
  dropdownStyle: _propTypes.default.object,
  getPopupContainer: _propTypes.default.func,
  children: _propTypes.default.node,
  dropdownMatchSelectWidth: _propTypes.default.bool,
  transitionName: _propTypes.default.string,
  animation: _propTypes.default.string,
  // Pass by Select
  isMultiple: _propTypes.default.bool,
  dropdownPrefixCls: _propTypes.default.string,
  onDropdownVisibleChange: _propTypes.default.func,
  popupElement: _propTypes.default.node,
  open: _propTypes.default.bool
});

_defineProperty(SelectTrigger, "defaultProps", {
  open: false
});

(0, _reactLifecyclesCompat.polyfill)(SelectTrigger);
var _default = SelectTrigger;
exports.default = _default;