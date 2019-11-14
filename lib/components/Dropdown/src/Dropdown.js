"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var _placements = _interopRequireDefault(require("./placements"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Dropdown =
/*#__PURE__*/
function (_Component) {
  _inherits(Dropdown, _Component);

  _createClass(Dropdown, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      if ('visible' in nextProps) {
        return {
          visible: nextProps.visible
        };
      }

      return null;
    }
  }]);

  function Dropdown(_props) {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "onClick", function (e) {
      var props = _this.props;
      var overlayProps = props.overlay.props; // do no call onVisibleChange, if you need click to hide, use onClick and control visible

      if (!('visible' in props)) {
        _this.setState({
          visible: false
        });
      }

      if (props.onOverlayClick) {
        props.onOverlayClick(e);
      }

      if (overlayProps.onClick) {
        overlayProps.onClick(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onVisibleChange", function (visible) {
      var props = _this.props;

      if (!('visible' in props)) {
        _this.setState({
          visible: visible
        });
      }

      props.onVisibleChange(visible);
    });

    _defineProperty(_assertThisInitialized(_this), "getMinOverlayWidthMatchTrigger", function () {
      var _this$props = _this.props,
          minOverlayWidthMatchTrigger = _this$props.minOverlayWidthMatchTrigger,
          alignPoint = _this$props.alignPoint;

      if ('minOverlayWidthMatchTrigger' in _this.props) {
        return minOverlayWidthMatchTrigger;
      }

      return !alignPoint;
    });

    _defineProperty(_assertThisInitialized(_this), "afterVisibleChange", function (visible) {
      if (visible && _this.getMinOverlayWidthMatchTrigger()) {
        var overlayNode = _this.getPopupDomNode();

        var rootNode = _reactDom["default"].findDOMNode(_assertThisInitialized(_this));

        if (rootNode && overlayNode && rootNode.offsetWidth > overlayNode.offsetWidth) {
          overlayNode.style.minWidth = "".concat(rootNode.offsetWidth, "px");

          if (_this.trigger && _this.trigger._component && _this.trigger._component.alignInstance) {
            _this.trigger._component.alignInstance.forceAlign();
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveTrigger", function (node) {
      _this.trigger = node;
    });

    if ('visible' in _props) {
      _this.state = {
        visible: _props.visible
      };
    } else {
      _this.state = {
        visible: _props.defaultVisible
      };
    }

    return _this;
  }

  _createClass(Dropdown, [{
    key: "getMenuElement",
    value: function getMenuElement() {
      var _this$props2 = this.props,
          overlay = _this$props2.overlay,
          prefixCls = _this$props2.prefixCls;
      var extraOverlayProps = {
        prefixCls: "".concat(prefixCls, "-menu"),
        onClick: this.onClick
      };

      if (typeof overlay.type === 'string') {
        delete extraOverlayProps.prefixCls;
      }

      return _react["default"].cloneElement(overlay, extraOverlayProps);
    }
  }, {
    key: "getPopupDomNode",
    value: function getPopupDomNode() {
      return this.trigger.getPopupDomNode();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          children = _this$props3.children,
          transitionName = _this$props3.transitionName,
          animation = _this$props3.animation,
          align = _this$props3.align,
          placement = _this$props3.placement,
          getPopupContainer = _this$props3.getPopupContainer,
          showAction = _this$props3.showAction,
          hideAction = _this$props3.hideAction,
          overlayClassName = _this$props3.overlayClassName,
          overlayStyle = _this$props3.overlayStyle,
          trigger = _this$props3.trigger,
          otherProps = _objectWithoutProperties(_this$props3, ["prefixCls", "children", "transitionName", "animation", "align", "placement", "getPopupContainer", "showAction", "hideAction", "overlayClassName", "overlayStyle", "trigger"]);

      var triggerHideAction = hideAction;

      if (!triggerHideAction && trigger.indexOf('contextMenu') !== -1) {
        triggerHideAction = ['click'];
      }

      return _react["default"].createElement(_rcTrigger["default"], _extends({}, otherProps, {
        prefixCls: prefixCls,
        ref: this.saveTrigger,
        popupClassName: overlayClassName,
        popupStyle: overlayStyle,
        builtinPlacements: _placements["default"],
        action: trigger,
        showAction: showAction,
        hideAction: triggerHideAction || [],
        popupPlacement: placement,
        popupAlign: align,
        popupTransitionName: transitionName,
        popupAnimation: animation,
        popupVisible: this.state.visible,
        afterPopupVisibleChange: this.afterVisibleChange,
        popup: this.getMenuElement(),
        onPopupVisibleChange: this.onVisibleChange,
        getPopupContainer: getPopupContainer
      }), children);
    }
  }]);

  return Dropdown;
}(_react.Component);

_defineProperty(Dropdown, "propTypes", {
  minOverlayWidthMatchTrigger: _propTypes["default"].bool,
  onVisibleChange: _propTypes["default"].func,
  onOverlayClick: _propTypes["default"].func,
  prefixCls: _propTypes["default"].string,
  children: _propTypes["default"].node,
  transitionName: _propTypes["default"].string,
  overlayClassName: _propTypes["default"].string,
  animation: _propTypes["default"].string,
  align: _propTypes["default"].object,
  overlayStyle: _propTypes["default"].object,
  placement: _propTypes["default"].string,
  overlay: _propTypes["default"].node,
  trigger: _propTypes["default"].array,
  alignPoint: _propTypes["default"].bool,
  showAction: _propTypes["default"].array,
  hideAction: _propTypes["default"].array,
  getPopupContainer: _propTypes["default"].func,
  visible: _propTypes["default"].bool,
  defaultVisible: _propTypes["default"].bool
});

_defineProperty(Dropdown, "defaultProps", {
  prefixCls: 'rc-dropdown',
  trigger: ['hover'],
  showAction: [],
  overlayClassName: '',
  overlayStyle: {},
  defaultVisible: false,
  onVisibleChange: function onVisibleChange() {},
  placement: 'bottomLeft'
});

(0, _reactLifecyclesCompat.polyfill)(Dropdown);
var _default = Dropdown;
exports["default"] = _default;