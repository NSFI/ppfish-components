"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.assign");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var _rcPlacements = require("./rcPlacements");

var _RcContent = _interopRequireDefault(require("./RcContent"));

require("./style/index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RcTooltip =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RcTooltip, _Component);

  function RcTooltip() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "getPopupElement", function () {
      var _this$props = _this.props,
          arrowContent = _this$props.arrowContent,
          overlay = _this$props.overlay,
          prefixCls = _this$props.prefixCls,
          id = _this$props.id;
      return [_react.default.createElement("div", {
        className: prefixCls + "-arrow",
        key: "arrow"
      }, arrowContent), _react.default.createElement(_RcContent.default, {
        key: "content",
        trigger: _this.trigger,
        prefixCls: prefixCls,
        id: id,
        overlay: overlay
      })];
    });

    _defineProperty(_assertThisInitialized(_this), "saveTrigger", function (node) {
      _this.trigger = node;
    });

    return _this;
  }

  var _proto = RcTooltip.prototype;

  _proto.getPopupDomNode = function getPopupDomNode() {
    return this.trigger.getPopupDomNode();
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        overlayClassName = _this$props2.overlayClassName,
        trigger = _this$props2.trigger,
        mouseEnterDelay = _this$props2.mouseEnterDelay,
        mouseLeaveDelay = _this$props2.mouseLeaveDelay,
        overlayStyle = _this$props2.overlayStyle,
        prefixCls = _this$props2.prefixCls,
        children = _this$props2.children,
        onVisibleChange = _this$props2.onVisibleChange,
        afterVisibleChange = _this$props2.afterVisibleChange,
        transitionName = _this$props2.transitionName,
        animation = _this$props2.animation,
        placement = _this$props2.placement,
        align = _this$props2.align,
        destroyTooltipOnHide = _this$props2.destroyTooltipOnHide,
        defaultVisible = _this$props2.defaultVisible,
        getTooltipContainer = _this$props2.getTooltipContainer,
        restProps = _objectWithoutPropertiesLoose(_this$props2, ["overlayClassName", "trigger", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle", "prefixCls", "children", "onVisibleChange", "afterVisibleChange", "transitionName", "animation", "placement", "align", "destroyTooltipOnHide", "defaultVisible", "getTooltipContainer"]);

    var extraProps = Object.assign({}, restProps);

    if ('visible' in this.props) {
      extraProps.popupVisible = this.props.visible;
    }

    return _react.default.createElement(_rcTrigger.default, _extends({
      popupClassName: overlayClassName,
      ref: this.saveTrigger,
      prefixCls: prefixCls,
      popup: this.getPopupElement,
      action: trigger,
      builtinPlacements: _rcPlacements.rcPlacements,
      popupPlacement: placement,
      popupAlign: align,
      getPopupContainer: getTooltipContainer,
      onPopupVisibleChange: onVisibleChange,
      afterPopupVisibleChange: afterVisibleChange,
      popupTransitionName: transitionName,
      popupAnimation: animation,
      defaultPopupVisible: defaultVisible,
      destroyPopupOnHide: destroyTooltipOnHide,
      mouseLeaveDelay: mouseLeaveDelay,
      popupStyle: overlayStyle,
      mouseEnterDelay: mouseEnterDelay
    }, extraProps), children);
  };

  return RcTooltip;
}(_react.Component);

_defineProperty(RcTooltip, "propTypes", {
  trigger: _propTypes.default.any,
  children: _propTypes.default.any,
  defaultVisible: _propTypes.default.bool,
  visible: _propTypes.default.bool,
  placement: _propTypes.default.string,
  transitionName: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  animation: _propTypes.default.any,
  onVisibleChange: _propTypes.default.func,
  afterVisibleChange: _propTypes.default.func,
  overlay: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]).isRequired,
  overlayStyle: _propTypes.default.object,
  overlayClassName: _propTypes.default.string,
  prefixCls: _propTypes.default.string,
  mouseEnterDelay: _propTypes.default.number,
  mouseLeaveDelay: _propTypes.default.number,
  getTooltipContainer: _propTypes.default.func,
  destroyTooltipOnHide: _propTypes.default.bool,
  align: _propTypes.default.object,
  arrowContent: _propTypes.default.any,
  id: _propTypes.default.string
});

_defineProperty(RcTooltip, "defaultProps", {
  prefixCls: 'fishd-tooltip',
  mouseEnterDelay: 0,
  destroyTooltipOnHide: false,
  mouseLeaveDelay: 0.1,
  align: {},
  placement: 'right',
  trigger: ['hover'],
  arrowContent: null
});

var _default = RcTooltip;
exports.default = _default;