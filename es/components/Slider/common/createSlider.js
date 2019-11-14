function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { addEventListener } from '../../../utils';
import classNames from 'classnames';
import warning from 'warning';
import Steps from './Steps';
import Marks from './Marks';
import Handle from '../RcHandle';
import * as utils from '../utils';
import Tip from "./Tip";

function noop() {}

export default function createSlider(Component) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(ComponentEnhancer, _Component);

    function ComponentEnhancer(props) {
      var _this;

      _classCallCheck(this, ComponentEnhancer);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ComponentEnhancer).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "onMouseDown", function (e) {
        if (e.button !== 0) {
          return;
        }

        var isVertical = _this.props.vertical;
        var position = utils.getMousePosition(isVertical, e);

        if (!utils.isEventFromHandle(e, _this.handlesRefs)) {
          _this.dragOffset = 0;
        } else {
          var handlePosition = utils.getHandleCenterPosition(isVertical, e.target);
          _this.dragOffset = position - handlePosition;
          position = handlePosition;
        }

        _this.removeDocumentEvents();

        _this.onStart(position);

        _this.addDocumentMouseEvents();
      });

      _defineProperty(_assertThisInitialized(_this), "onTouchStart", function (e) {
        if (utils.isNotTouchEvent(e)) return;
        var isVertical = _this.props.vertical;
        var position = utils.getTouchPosition(isVertical, e);

        if (!utils.isEventFromHandle(e, _this.handlesRefs)) {
          _this.dragOffset = 0;
        } else {
          var handlePosition = utils.getHandleCenterPosition(isVertical, e.target);
          _this.dragOffset = position - handlePosition;
          position = handlePosition;
        }

        _this.onStart(position);

        _this.addDocumentTouchEvents();

        utils.pauseEvent(e);
      });

      _defineProperty(_assertThisInitialized(_this), "onFocus", function (e) {
        var _this$props = _this.props,
            onFocus = _this$props.onFocus,
            vertical = _this$props.vertical;

        if (utils.isEventFromHandle(e, _this.handlesRefs)) {
          var handlePosition = utils.getHandleCenterPosition(vertical, e.target);
          _this.dragOffset = 0;

          _this.onStart(handlePosition);

          utils.pauseEvent(e);

          if (onFocus) {
            onFocus(e);
          }
        }
      });

      _defineProperty(_assertThisInitialized(_this), "onBlur", function (e) {
        var onBlur = _this.props.onBlur;

        _this.onEnd(e);

        if (onBlur) {
          onBlur(e);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "onMouseUp", function () {
        if (_this.handlesRefs[_this.prevMovedHandleIndex]) {
          _this.handlesRefs[_this.prevMovedHandleIndex].clickFocus();
        }
      });

      _defineProperty(_assertThisInitialized(_this), "onMouseMoveTooltip", function (e) {
        _this.tipOffset = utils.getMousePosition(_this.props.vertical, e) - _this.getSliderStart();
        _this.tipPercent = _this.calcValueByPos(utils.getMousePosition(_this.props.vertical, e));
        _this.tipVisible = !(_this.tipOffset > _this.getSliderLength() || _this.tipOffset < 0);

        _this.forceUpdate();
      });

      _defineProperty(_assertThisInitialized(_this), "onMouseLeaveTooltip", function () {
        _this.tipVisible = false;

        _this.forceUpdate();
      });

      _defineProperty(_assertThisInitialized(_this), "onMouseEnterTooltip", function () {
        _this.tipVisible = true;

        _this.forceUpdate();
      });

      _defineProperty(_assertThisInitialized(_this), "onMouseMove", function (e) {
        if (!_this.sliderRef) {
          _this.onEnd();

          return;
        }

        var position = utils.getMousePosition(_this.props.vertical, e);

        _this.onMove(e, position - _this.dragOffset);
      });

      _defineProperty(_assertThisInitialized(_this), "onTouchMove", function (e) {
        if (utils.isNotTouchEvent(e) || !_this.sliderRef) {
          _this.onEnd();

          return;
        }

        var position = utils.getTouchPosition(_this.props.vertical, e);

        _this.onMove(e, position - _this.dragOffset);
      });

      _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
        if (_this.sliderRef && utils.isEventFromHandle(e, _this.handlesRefs)) {
          _this.onKeyboard(e);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "saveSlider", function (slider) {
        _this.sliderRef = slider;
      });

      _defineProperty(_assertThisInitialized(_this), "onClickMarkLabel", function (e, value) {
        e.stopPropagation();

        _this.onChange({
          value: value
        });
      });

      if (process.env.NODE_ENV !== 'production') {
        var step = props.step,
            max = props.max,
            min = props.min;
        warning(step && Math.floor(step) === step ? (max - min) % step === 0 : true, 'Slider[max] - Slider[min] (%s) should be a multiple of Slider[step] (%s)', max - min, step);
      }

      _this.handlesRefs = {};
      _this.tipPercent = 0;
      return _this;
    }

    _createClass(ComponentEnhancer, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (_get(_getPrototypeOf(ComponentEnhancer.prototype), "componentWillUnmount", this)) _get(_getPrototypeOf(ComponentEnhancer.prototype), "componentWillUnmount", this).call(this);
        this.removeDocumentEvents();
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        // Snapshot testing cannot handle refs, so be sure to null-check this.
        this.document = this.sliderRef && this.sliderRef.ownerDocument;
      }
    }, {
      key: "addDocumentTouchEvents",
      value: function addDocumentTouchEvents() {
        // just work for Chrome iOS Safari and Android Browser
        this.onTouchMoveListener = addEventListener(this.document, 'touchmove', this.onTouchMove);
        this.onTouchUpListener = addEventListener(this.document, 'touchend', this.onEnd);
      }
    }, {
      key: "addDocumentMouseEvents",
      value: function addDocumentMouseEvents() {
        this.onMouseMoveListener = addEventListener(this.document, 'mousemove', this.onMouseMove);
        this.onMouseUpListener = addEventListener(this.document, 'mouseup', this.onEnd);
      }
    }, {
      key: "removeDocumentEvents",
      value: function removeDocumentEvents() {
        /* eslint-disable no-unused-expressions */
        this.onTouchMoveListener && this.onTouchMoveListener.remove();
        this.onTouchUpListener && this.onTouchUpListener.remove();
        this.onMouseMoveListener && this.onMouseMoveListener.remove();
        this.onMouseUpListener && this.onMouseUpListener.remove();
        /* eslint-enable no-unused-expressions */
      }
    }, {
      key: "focus",
      value: function focus() {
        if (!this.props.disabled) {
          this.handlesRefs[0].focus();
        }
      }
    }, {
      key: "blur",
      value: function blur() {
        if (!this.props.disabled) {
          this.handlesRefs[0].blur();
        }
      }
    }, {
      key: "getSliderStart",
      value: function getSliderStart() {
        var slider = this.sliderRef;
        var rect = slider.getBoundingClientRect();
        return this.props.vertical ? rect.top : rect.left;
      }
    }, {
      key: "getSliderLength",
      value: function getSliderLength() {
        var slider = this.sliderRef;

        if (!slider) {
          return 0;
        }

        var coords = slider.getBoundingClientRect();
        return this.props.vertical ? coords.height : coords.width;
      }
    }, {
      key: "calcValue",
      value: function calcValue(offset) {
        var _this$props2 = this.props,
            vertical = _this$props2.vertical,
            min = _this$props2.min,
            max = _this$props2.max;
        var ratio = Math.abs(Math.max(offset, 0) / this.getSliderLength());
        var value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
        return value;
      }
    }, {
      key: "calcValueByPos",
      value: function calcValueByPos(position) {
        var pixelOffset = position - this.getSliderStart();
        var nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
        return nextValue;
      }
    }, {
      key: "calcOffset",
      value: function calcOffset(value) {
        var _this$props3 = this.props,
            min = _this$props3.min,
            max = _this$props3.max;
        var ratio = (value - min) / (max - min);
        return ratio * 100;
      }
    }, {
      key: "saveHandle",
      value: function saveHandle(index, handle) {
        this.handlesRefs[index] = handle;
      }
    }, {
      key: "render",
      value: function render() {
        var _classNames;

        var _this$props4 = this.props,
            prefixCls = _this$props4.prefixCls,
            className = _this$props4.className,
            marks = _this$props4.marks,
            dots = _this$props4.dots,
            step = _this$props4.step,
            included = _this$props4.included,
            disabled = _this$props4.disabled,
            vertical = _this$props4.vertical,
            min = _this$props4.min,
            max = _this$props4.max,
            children = _this$props4.children,
            maximumTrackStyle = _this$props4.maximumTrackStyle,
            style = _this$props4.style,
            railStyle = _this$props4.railStyle,
            dotStyle = _this$props4.dotStyle,
            activeDotStyle = _this$props4.activeDotStyle,
            tipMode = _this$props4.tipMode,
            tipFormatter = _this$props4.tipFormatter;

        var _get$call = _get(_getPrototypeOf(ComponentEnhancer.prototype), "render", this).call(this),
            tracks = _get$call.tracks,
            handles = _get$call.handles;

        var showTipComponent = !disabled && tipMode === 'all';
        var tipComponentListener = {};

        if (showTipComponent) {
          tipComponentListener = {
            onMouseMove: disabled ? noop : this.onMouseMoveTooltip,
            onMouseLeave: disabled ? noop : this.onMouseLeaveTooltip,
            onMouseEnter: disabled ? noop : this.onMouseEnterTooltip
          };
        }

        var sliderClassName = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-with-marks"), Object.keys(marks).length), _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classNames, "".concat(prefixCls, "-vertical"), vertical), _defineProperty(_classNames, className, className), _classNames));
        return React.createElement("div", _extends({
          ref: this.saveSlider,
          className: sliderClassName
        }, tipComponentListener, {
          onTouchStart: disabled ? noop : this.onTouchStart,
          onMouseDown: disabled ? noop : this.onMouseDown,
          onMouseUp: disabled ? noop : this.onMouseUp,
          onKeyDown: disabled ? noop : this.onKeyDown,
          onFocus: disabled ? noop : this.onFocus,
          onBlur: disabled ? noop : this.onBlur,
          style: style
        }), // 添加滚动条tooltip功能，tipMode="all"
        showTipComponent && React.createElement(Tip, {
          prefixCls: prefixCls,
          title: tipFormatter ? tipFormatter(this.tipPercent) : '',
          position: this.tipOffset,
          visible: this.tipVisible,
          vertical: this.props.vertical
        }), React.createElement("div", {
          className: "".concat(prefixCls, "-rail"),
          style: _objectSpread({}, maximumTrackStyle, {}, railStyle)
        }), tracks, React.createElement(Steps, {
          prefixCls: prefixCls,
          vertical: vertical,
          marks: marks,
          dots: dots,
          step: step,
          included: included,
          lowerBound: this.getLowerBound(),
          upperBound: this.getUpperBound(),
          max: max,
          min: min,
          dotStyle: dotStyle,
          activeDotStyle: activeDotStyle
        }), handles, React.createElement(Marks, {
          className: "".concat(prefixCls, "-mark"),
          onClickLabel: disabled ? noop : this.onClickMarkLabel,
          vertical: vertical,
          marks: marks,
          included: included,
          lowerBound: this.getLowerBound(),
          upperBound: this.getUpperBound(),
          max: max,
          min: min
        }), children);
      }
    }]);

    return ComponentEnhancer;
  }(Component), _defineProperty(_class, "displayName", "ComponentEnhancer(".concat(Component.displayName, ")")), _defineProperty(_class, "propTypes", _objectSpread({}, Component.propTypes, {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    marks: PropTypes.object,
    included: PropTypes.bool,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    onBeforeChange: PropTypes.func,
    onChange: PropTypes.func,
    onAfterChange: PropTypes.func,
    handle: PropTypes.func,
    dots: PropTypes.bool,
    vertical: PropTypes.bool,
    style: PropTypes.object,
    minimumTrackStyle: PropTypes.object,
    // just for compatibility, will be deperecate
    maximumTrackStyle: PropTypes.object,
    // just for compatibility, will be deperecate
    handleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
    trackStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
    railStyle: PropTypes.object,
    dotStyle: PropTypes.object,
    activeDotStyle: PropTypes.object,
    autoFocus: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  })), _defineProperty(_class, "defaultProps", _objectSpread({}, Component.defaultProps, {
    prefixCls: 'rc-slider',
    className: '',
    min: 0,
    max: 100,
    step: 1,
    marks: {},
    handle: function handle(_ref) {
      var index = _ref.index,
          restProps = _objectWithoutProperties(_ref, ["index"]);

      delete restProps.dragging;
      return React.createElement(Handle, _extends({}, restProps, {
        key: index
      }));
    },
    onBeforeChange: noop,
    onChange: noop,
    onAfterChange: noop,
    included: true,
    disabled: false,
    dots: false,
    vertical: false,
    trackStyle: [{}],
    handleStyle: [{}],
    railStyle: {},
    dotStyle: {},
    activeDotStyle: {}
  })), _temp;
}