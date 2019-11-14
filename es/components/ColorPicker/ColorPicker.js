function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import { KeyCode } from "../../utils";
import ColorPickerPanel from './Panel';
import placements from './placements';
import Color from './helpers/color';
import QuickPanel from './QuickPanel';

function refFn(field, component) {
  this[field] = component;
}

function prevent(e) {
  e.preventDefault();
}

function noop() {}

var ColorPicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ColorPicker, _React$Component);

  _createClass(ColorPicker, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var newState = {};

      if ('color' in nextProps) {
        newState.color = nextProps.color;
      }

      if ('alpha' in nextProps && nextProps.alpha !== undefined && nextProps.alpha !== null) {
        newState.alpha = nextProps.alpha;
      }

      return newState;
    }
  }]);

  function ColorPicker(props) {
    var _this;

    _classCallCheck(this, ColorPicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ColorPicker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (colors) {
      _this.setState(_objectSpread({}, colors), function () {
        _this.props.onChange(_this.state);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      _this.setVisible(false);
    });

    _defineProperty(_assertThisInitialized(_this), "onVisibleChangeFromTrigger", function (visible) {
      _this.setVisible(visible);
    });

    _defineProperty(_assertThisInitialized(_this), "onPanelMount", function (panelDOMRef) {
      if (_this.state.visible) {
        setTimeout(function () {
          panelDOMRef.focus();
        }, 0);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setVisible", function (visible, callback) {
      if (_this.state.visible !== visible) {
        _this.setState({
          visible: visible
        }, function () {
          if (typeof callback === 'function') callback();
          var _this$props = _this.props,
              onVisibleChange = _this$props.onVisibleChange,
              enableHistory = _this$props.enableHistory,
              maxHistory = _this$props.maxHistory;
          onVisibleChange(_this.state.visible); //关闭时记录历史记录

          if (!_this.state.visible && enableHistory) {
            var _this$state = _this.state,
                color = _this$state.color,
                alpha = _this$state.alpha,
                colorHistory = _this$state.colorHistory;
            if (colorHistory.length && color === colorHistory[0].color && alpha === colorHistory[0].alpha) return;

            _this.setState({
              colorHistory: colorHistory.length >= maxHistory ? [{
                color: color,
                alpha: alpha
              }].concat(_toConsumableArray(colorHistory.slice(0, -1))) : [{
                color: color,
                alpha: alpha
              }].concat(_toConsumableArray(colorHistory))
            });
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getRootDOMNode", function () {
      return findDOMNode(_assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "getTriggerDOMNode", function () {
      return findDOMNode(_this.triggerInstance);
    });

    _defineProperty(_assertThisInitialized(_this), "getPickerElement", function () {
      if (_this.props.quickMode) {
        return React.createElement(QuickPanel, {
          __useInComponent: true,
          onMount: _this.onPanelMount,
          defaultColor: _this.state.color,
          color: _this.state.color,
          onChange: _this.onChange,
          onVisibleChange: _this.setVisible,
          onBlur: _this.onBlur,
          colorMap: _this.props.colorMap,
          className: _this.props.className,
          userSelectColor: false,
          esc: _this.props.esc
        });
      }

      return React.createElement(ColorPickerPanel, {
        onMount: _this.onPanelMount,
        defaultColor: _this.state.color,
        alpha: _this.state.alpha,
        enableAlpha: _this.props.enableAlpha,
        prefixCls: "".concat(_this.props.prefixCls, "-panel"),
        onChange: _this.onChange,
        onBlur: _this.onBlur,
        mode: _this.props.mode,
        className: _this.props.className,
        colorHistory: _this.state.colorHistory,
        enableHistory: _this.props.enableHistory,
        maxHistory: _this.props.maxHistory
      });
    });

    _defineProperty(_assertThisInitialized(_this), "focus", function () {
      if (!_this.state.visible) {
        findDOMNode(_assertThisInitialized(_this)).focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (e) {
      var keyCode = e.keyCode;

      if (keyCode === KeyCode.ESC && _this.props.esc || keyCode === KeyCode.ENTER) {
        _this.setVisible(false);
      }
    });

    var _alpha = typeof props.alpha === 'undefined' ? props.defaultAlpha : Math.min(props.alpha, props.defaultAlpha);

    _this.state = {
      color: props.color || props.defaultColor,
      alpha: _alpha,
      visible: false,
      colorHistory: []
    };
    _this.saveTriggerRef = refFn.bind(_assertThisInitialized(_this), 'triggerInstance');
    return _this;
  }

  _createClass(ColorPicker, [{
    key: "render",
    value: function render() {
      var _classNames;

      var props = this.props;
      var state = this.state;
      var classes = ["".concat(props.prefixCls, "-wrap"), props.className];

      if (state.visible) {
        classes.push("".concat(props.prefixCls, "-open"));
      }

      var children = props.children;

      var _RGB = _slicedToArray(new Color(this.state.color).RGB, 3),
          r = _RGB[0],
          g = _RGB[1],
          b = _RGB[2];

      var RGBA = [r, g, b];
      RGBA.push(this.state.alpha / 100);

      if (children) {
        children = React.cloneElement(children, {
          ref: this.saveTriggerRef,
          unselectable: 'unselectable',
          style: _objectSpread({}, props.style, {
            backgroundColor: "rgba(".concat(RGBA.join(','), ")")
          }),
          onMouseDown: prevent
        });
      }

      var prefixCls = props.prefixCls,
          popupStyle = props.popupStyle,
          getPopupContainer = props.getPopupContainer,
          align = props.align,
          animation = props.animation,
          disabled = props.disabled,
          transitionName = props.transitionName,
          quickMode = props.quickMode;
      var arrowCls = classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-arrow"), true), _defineProperty(_classNames, 'quick', quickMode), _classNames));
      return React.createElement("div", {
        className: classes.join(' ')
      }, React.createElement(Trigger, {
        popup: React.createElement("div", {
          className: "".concat(prefixCls, "-content"),
          onKeyDown: this.handleKeyDown
        }, React.createElement("div", {
          className: arrowCls
        }), React.createElement("div", {
          className: "".concat(prefixCls, "-inner")
        }, this.getPickerElement())),
        popupAlign: align,
        builtinPlacements: placements,
        popupPlacement: 'topCenter',
        action: disabled ? [] : ['click'],
        destroyPopupOnHide: true,
        getPopupContainer: getPopupContainer,
        popupStyle: popupStyle,
        popupAnimation: animation,
        popupTransitionName: transitionName,
        popupVisible: state.visible,
        onPopupVisibleChange: this.onVisibleChangeFromTrigger,
        prefixCls: prefixCls
      }, children));
    }
  }]);

  return ColorPicker;
}(React.Component);

_defineProperty(ColorPicker, "propTypes", {
  alpha: PropTypes.number,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  colorMap: PropTypes.array,
  defaultAlpha: PropTypes.number,
  defaultColor: PropTypes.string,
  disabled: PropTypes.bool,
  enableAlpha: PropTypes.bool,
  enableHistory: PropTypes.bool,
  maxHistory: PropTypes.number,
  mode: PropTypes.oneOf(['RGB', 'HSL', 'HSB']),
  onChange: PropTypes.func,
  onVisibleChange: PropTypes.func,
  prefixCls: PropTypes.string.isRequired,
  quickMode: PropTypes.bool,
  style: PropTypes.object,
  popupStyle: PropTypes.object,
  esc: PropTypes.bool
});

_defineProperty(ColorPicker, "defaultProps", {
  children: React.createElement("span", {
    className: "fishd-color-picker-trigger"
  }),
  className: '',
  colorMap: ['#33bbff', '#337eff', '#8a73ff', '#bb67e6', '#f290b6', '#f24957', '#cc613d', '#faa702', '#ffe500', '#aacc00', '#26bf40', '#3dd9af'],
  defaultAlpha: 100,
  defaultColor: '#33bbff',
  disabled: false,
  enableAlpha: false,
  enableHistory: true,
  maxHistory: 8,
  onChange: noop,
  onVisibleChange: noop,
  prefixCls: 'fishd-color-picker',
  quickMode: false,
  style: {},
  popupStyle: {},
  esc: true
});

polyfill(ColorPicker);
export default ColorPicker;