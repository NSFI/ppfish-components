"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = createSlider;

require("core-js/modules/es6.object.assign");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../../utils");

var _classnames = _interopRequireDefault(require("classnames"));

var _warning = _interopRequireDefault(require("warning"));

var _Steps = _interopRequireDefault(require("./Steps"));

var _Marks = _interopRequireDefault(require("./Marks"));

var _RcHandle = _interopRequireDefault(require("../RcHandle"));

var utils = _interopRequireWildcard(require("../utils"));

var _Tip = _interopRequireDefault(require("./Tip"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function noop() {}

function createSlider(Component) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(ComponentEnhancer, _Component);

    function ComponentEnhancer(props) {
      var _this;

      _this = _Component.call(this, props) || this;

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
        (0, _warning.default)(step && Math.floor(step) === step ? (max - min) % step === 0 : true, 'Slider[max] - Slider[min] (%s) should be a multiple of Slider[step] (%s)', max - min, step);
      }

      _this.handlesRefs = {};
      _this.tipPercent = 0;
      return _this;
    }

    var _proto = ComponentEnhancer.prototype;

    _proto.componentWillUnmount = function componentWillUnmount() {
      if (_Component.prototype.componentWillUnmount) _Component.prototype.componentWillUnmount.call(this);
      this.removeDocumentEvents();
    };

    _proto.componentDidMount = function componentDidMount() {
      // Snapshot testing cannot handle refs, so be sure to null-check this.
      this.document = this.sliderRef && this.sliderRef.ownerDocument;
    };

    _proto.addDocumentTouchEvents = function addDocumentTouchEvents() {
      // just work for Chrome iOS Safari and Android Browser
      this.onTouchMoveListener = (0, _utils.addEventListener)(this.document, 'touchmove', this.onTouchMove);
      this.onTouchUpListener = (0, _utils.addEventListener)(this.document, 'touchend', this.onEnd);
    };

    _proto.addDocumentMouseEvents = function addDocumentMouseEvents() {
      this.onMouseMoveListener = (0, _utils.addEventListener)(this.document, 'mousemove', this.onMouseMove);
      this.onMouseUpListener = (0, _utils.addEventListener)(this.document, 'mouseup', this.onEnd);
    };

    _proto.removeDocumentEvents = function removeDocumentEvents() {
      /* eslint-disable no-unused-expressions */
      this.onTouchMoveListener && this.onTouchMoveListener.remove();
      this.onTouchUpListener && this.onTouchUpListener.remove();
      this.onMouseMoveListener && this.onMouseMoveListener.remove();
      this.onMouseUpListener && this.onMouseUpListener.remove();
      /* eslint-enable no-unused-expressions */
    };

    _proto.focus = function focus() {
      if (!this.props.disabled) {
        this.handlesRefs[0].focus();
      }
    };

    _proto.blur = function blur() {
      if (!this.props.disabled) {
        this.handlesRefs[0].blur();
      }
    };

    _proto.getSliderStart = function getSliderStart() {
      var slider = this.sliderRef;
      var rect = slider.getBoundingClientRect();
      return this.props.vertical ? rect.top : rect.left;
    };

    _proto.getSliderLength = function getSliderLength() {
      var slider = this.sliderRef;

      if (!slider) {
        return 0;
      }

      var coords = slider.getBoundingClientRect();
      return this.props.vertical ? coords.height : coords.width;
    };

    _proto.calcValue = function calcValue(offset) {
      var _this$props2 = this.props,
          vertical = _this$props2.vertical,
          min = _this$props2.min,
          max = _this$props2.max;
      var ratio = Math.abs(Math.max(offset, 0) / this.getSliderLength());
      var value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
      return value;
    };

    _proto.calcValueByPos = function calcValueByPos(position) {
      var pixelOffset = position - this.getSliderStart();
      var nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
      return nextValue;
    };

    _proto.calcOffset = function calcOffset(value) {
      var _this$props3 = this.props,
          min = _this$props3.min,
          max = _this$props3.max;
      var ratio = (value - min) / (max - min);
      return ratio * 100;
    };

    _proto.saveHandle = function saveHandle(index, handle) {
      this.handlesRefs[index] = handle;
    };

    _proto.render = function render() {
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

      var _Component$prototype$ = _Component.prototype.render.call(this),
          tracks = _Component$prototype$.tracks,
          handles = _Component$prototype$.handles;

      var showTipComponent = !disabled && tipMode === 'all';
      var tipComponentListener = {};

      if (showTipComponent) {
        tipComponentListener = {
          onMouseMove: disabled ? noop : this.onMouseMoveTooltip,
          onMouseLeave: disabled ? noop : this.onMouseLeaveTooltip,
          onMouseEnter: disabled ? noop : this.onMouseEnterTooltip
        };
      }

      var sliderClassName = (0, _classnames.default)(prefixCls, (_classNames = {}, _classNames[prefixCls + "-with-marks"] = Object.keys(marks).length, _classNames[prefixCls + "-disabled"] = disabled, _classNames[prefixCls + "-vertical"] = vertical, _classNames[className] = className, _classNames));
      return _react.default.createElement("div", _extends({
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
      showTipComponent && _react.default.createElement(_Tip.default, {
        prefixCls: prefixCls,
        title: tipFormatter ? tipFormatter(this.tipPercent) : '',
        position: this.tipOffset,
        visible: this.tipVisible,
        vertical: this.props.vertical
      }), _react.default.createElement("div", {
        className: prefixCls + "-rail",
        style: Object.assign({}, maximumTrackStyle, {}, railStyle)
      }), tracks, _react.default.createElement(_Steps.default, {
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
      }), handles, _react.default.createElement(_Marks.default, {
        className: prefixCls + "-mark",
        onClickLabel: disabled ? noop : this.onClickMarkLabel,
        vertical: vertical,
        marks: marks,
        included: included,
        lowerBound: this.getLowerBound(),
        upperBound: this.getUpperBound(),
        max: max,
        min: min
      }), children);
    };

    return ComponentEnhancer;
  }(Component), _defineProperty(_class, "displayName", "ComponentEnhancer(" + Component.displayName + ")"), _defineProperty(_class, "propTypes", Object.assign({}, Component.propTypes, {
    min: _propTypes.default.number,
    max: _propTypes.default.number,
    step: _propTypes.default.number,
    marks: _propTypes.default.object,
    included: _propTypes.default.bool,
    className: _propTypes.default.string,
    prefixCls: _propTypes.default.string,
    disabled: _propTypes.default.bool,
    children: _propTypes.default.node,
    onBeforeChange: _propTypes.default.func,
    onChange: _propTypes.default.func,
    onAfterChange: _propTypes.default.func,
    handle: _propTypes.default.func,
    dots: _propTypes.default.bool,
    vertical: _propTypes.default.bool,
    style: _propTypes.default.object,
    minimumTrackStyle: _propTypes.default.object,
    // just for compatibility, will be deperecate
    maximumTrackStyle: _propTypes.default.object,
    // just for compatibility, will be deperecate
    handleStyle: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.arrayOf(_propTypes.default.object)]),
    trackStyle: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.arrayOf(_propTypes.default.object)]),
    railStyle: _propTypes.default.object,
    dotStyle: _propTypes.default.object,
    activeDotStyle: _propTypes.default.object,
    autoFocus: _propTypes.default.bool,
    onFocus: _propTypes.default.func,
    onBlur: _propTypes.default.func
  })), _defineProperty(_class, "defaultProps", Object.assign({}, Component.defaultProps, {
    prefixCls: 'rc-slider',
    className: '',
    min: 0,
    max: 100,
    step: 1,
    marks: {},
    handle: function handle(_ref) {
      var index = _ref.index,
          restProps = _objectWithoutPropertiesLoose(_ref, ["index"]);

      delete restProps.dragging;
      return _react.default.createElement(_RcHandle.default, _extends({}, restProps, {
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