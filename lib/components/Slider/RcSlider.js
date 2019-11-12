"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _warning = _interopRequireDefault(require("warning"));

var _Track = _interopRequireDefault(require("./common/Track"));

var _createSlider = _interopRequireDefault(require("./common/createSlider"));

var utils = _interopRequireWildcard(require("./utils"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Slider =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Slider, _React$Component);

  Slider.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) return null;
    var prevValue = prevState.value;
    var value = nextProps.value !== undefined ? nextProps.value : prevValue;
    var val = utils.ensureValueInRange(value, nextProps);
    var nextValue = utils.ensureValuePrecision(val, nextProps);
    if (nextValue === prevValue) return null;
    return {
      value: nextValue
    };
  };

  function Slider(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onEnd", function () {
      _this.setState({
        dragging: false
      });

      _this.removeDocumentEvents();

      _this.props.onAfterChange(_this.getValue());
    });

    var defaultValue = props.defaultValue !== undefined ? props.defaultValue : props.min;
    var value = props.value !== undefined ? props.value : defaultValue;
    _this.state = {
      value: _this.trimAlignValue(value),
      dragging: false
    };

    if (process.env.NODE_ENV !== 'production') {
      (0, _warning.default)(!('minimumTrackStyle' in props), 'minimumTrackStyle will be deprecate, please use trackStyle instead.');
      (0, _warning.default)(!('maximumTrackStyle' in props), 'maximumTrackStyle will be deprecate, please use railStyle instead.');
    }

    return _this;
  }

  var _proto = Slider.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props = this.props,
        autoFocus = _this$props.autoFocus,
        disabled = _this$props.disabled;

    if (autoFocus && !disabled) {
      this.focus();
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var prevValue = prevState.value;
    var currentValue = this.state.value;
    var onChange = this.props.onChange;

    if (prevValue !== currentValue) {
      if (onChange && utils.isValueOutOfRange(currentValue, this.props)) {
        onChange(currentValue);
      }
    }
  };

  _proto.onChange = function onChange(state) {
    var props = this.props;
    var isNotControlled = !('value' in props);

    if (isNotControlled) {
      this.setState(state);
    }

    var changedValue = state.value;
    props.onChange(changedValue);
  };

  _proto.onStart = function onStart(position) {
    this.setState({
      dragging: true
    });
    var props = this.props;
    var prevValue = this.getValue();
    props.onBeforeChange(prevValue);
    var value = this.calcValueByPos(position);
    this.startValue = value;
    this.startPosition = position;
    if (value === prevValue) return;
    this.prevMovedHandleIndex = 0;
    this.onChange({
      value: value
    });
  };

  _proto.onMove = function onMove(e, position) {
    utils.pauseEvent(e);
    var oldValue = this.state.value;
    var value = this.calcValueByPos(position);
    if (value === oldValue) return;
    this.onChange({
      value: value
    });
  };

  _proto.onKeyboard = function onKeyboard(e) {
    var valueMutator = utils.getKeyboardValueMutator(e);

    if (valueMutator) {
      utils.pauseEvent(e);
      var state = this.state;
      var oldValue = state.value;
      var mutatedValue = valueMutator(oldValue, this.props);
      var value = this.trimAlignValue(mutatedValue);
      if (value === oldValue) return;
      this.onChange({
        value: value
      });
    }
  };

  _proto.getValue = function getValue() {
    return this.state.value;
  };

  _proto.getLowerBound = function getLowerBound() {
    return this.props.min;
  };

  _proto.getUpperBound = function getUpperBound() {
    return this.state.value;
  };

  _proto.trimAlignValue = function trimAlignValue(v, nextProps) {
    if (nextProps === void 0) {
      nextProps = {};
    }

    var mergedProps = Object.assign({}, this.props, {}, nextProps);
    var val = utils.ensureValueInRange(v, mergedProps);
    return utils.ensureValuePrecision(val, mergedProps);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        vertical = _this$props2.vertical,
        included = _this$props2.included,
        disabled = _this$props2.disabled,
        minimumTrackStyle = _this$props2.minimumTrackStyle,
        trackStyle = _this$props2.trackStyle,
        handleStyle = _this$props2.handleStyle,
        tabIndex = _this$props2.tabIndex,
        min = _this$props2.min,
        max = _this$props2.max,
        handleGenerator = _this$props2.handle;
    var _this$state = this.state,
        value = _this$state.value,
        dragging = _this$state.dragging;
    var offset = this.calcOffset(value);
    var handle = handleGenerator({
      className: prefixCls + "-handle",
      prefixCls: prefixCls,
      vertical: vertical,
      offset: offset,
      value: value,
      dragging: dragging,
      disabled: disabled,
      min: min,
      max: max,
      index: 0,
      tabIndex: tabIndex,
      style: handleStyle[0] || handleStyle,
      ref: function ref(h) {
        return _this2.saveHandle(0, h);
      }
    });

    var _trackStyle = trackStyle[0] || trackStyle;

    var track = _react.default.createElement(_Track.default, {
      className: prefixCls + "-track",
      vertical: vertical,
      included: included,
      offset: 0,
      length: offset,
      style: Object.assign({}, minimumTrackStyle, {}, _trackStyle)
    });

    return {
      tracks: track,
      handles: handle
    };
  };

  return Slider;
}(_react.default.Component);

_defineProperty(Slider, "propTypes", {
  defaultValue: _propTypes.default.number,
  value: _propTypes.default.number,
  disabled: _propTypes.default.bool,
  autoFocus: _propTypes.default.bool,
  tabIndex: _propTypes.default.number
});

(0, _reactLifecyclesCompat.polyfill)(Slider);

var _default = (0, _createSlider.default)(Slider);

exports.default = _default;